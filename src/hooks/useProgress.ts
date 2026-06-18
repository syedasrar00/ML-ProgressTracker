import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  countReadTopics,
  getSkillTopicStats,
  getTotalTopicStats,
  loadProgressFromCache,
  markAllSkillsRead,
  markAllSkillsUnread,
  markAllTopicsInSkillRead,
  markAllTopicsInSkillUnread,
  markModuleRead,
  markModuleUnread,
  markSectionRead,
  markSectionUnread,
  markSkillRead,
  markSkillUnread,
  markTopicGroupRead,
  markTopicGroupUnread,
  markTopicRead,
  markTopicUnread,
  resetProgress as resetProgressState,
  saveProgressToCache,
  toggleTopicRead,
} from '../lib/progressStorage';
import type { Module, ProgressState, SkillTopics } from '../types';

interface UseProgressOptions {
  jdId: string;
  skillTopicsMap: Record<string, SkillTopics>;
  modules: Module[];
}

/** Auto-mark a module read if every one of its skills is read, unmark if any is unread */
function syncModulesFromSkills(state: ProgressState, modules: Module[]): ProgressState {
  let readModules = { ...state.readModules };
  let changed = false;
  for (const mod of modules) {
    const allRead = mod.skillIds.length > 0 && mod.skillIds.every((id) => state.readSkills[id]);
    if (allRead && !readModules[mod.id]) {
      readModules[mod.id] = true;
      changed = true;
    } else if (!allRead && readModules[mod.id]) {
      delete readModules[mod.id];
      changed = true;
    }
  }
  return changed ? { ...state, readModules } : state;
}

export function useProgress({ jdId, skillTopicsMap, modules }: UseProgressOptions) {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgressFromCache(jdId));

  // Re-load from storage whenever the JD changes
  useEffect(() => {
    setProgress(loadProgressFromCache(jdId));
  }, [jdId]);

  // Persist to storage on every change
  useEffect(() => {
    saveProgressToCache(jdId, progress);
  }, [jdId, progress]);

  // Stable lookup helper threaded through all storage functions
  const getSkillTopicsFn = useCallback(
    (id: string) => skillTopicsMap[id],
    [skillTopicsMap],
  );

  const isSkillRead = useCallback(
    (skillId: string) => Boolean(progress.readSkills[skillId]),
    [progress.readSkills],
  );

  const isModuleRead = useCallback(
    (moduleId: string) => Boolean(progress.readModules[moduleId]),
    [progress.readModules],
  );

  const isTopicRead = useCallback(
    (key: string) => Boolean(progress.readTopics[key]),
    [progress.readTopics],
  );

  /** Wrap a state transform to also auto-sync module read flags */
  const withModuleSync = useCallback(
    (transform: (p: ProgressState) => ProgressState) =>
      (prev: ProgressState) => syncModulesFromSkills(transform(prev), modules),
    [modules],
  );

  const toggleSkillRead = useCallback((skillId: string) => {
    setProgress(withModuleSync((prev) =>
      prev.readSkills[skillId]
        ? markSkillUnread(prev, skillId, getSkillTopicsFn)
        : markSkillRead(prev, skillId, getSkillTopicsFn),
    ));
  }, [getSkillTopicsFn, withModuleSync]);

  const toggleModuleRead = useCallback((moduleId: string) => {
    setProgress((prev) =>
      prev.readModules[moduleId]
        ? markModuleUnread(prev, moduleId)
        : markModuleRead(prev, moduleId),
    );
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(resetProgressState());
  }, []);

  const topicStats = useMemo(
    () => getTotalTopicStats(progress, skillTopicsMap),
    [progress, skillTopicsMap],
  );

  const readSkillCount = Object.keys(progress.readSkills).length;
  const readModuleCount = Object.keys(progress.readModules).length;
  const readTopicCount = countReadTopics(progress);

  return {
    progress,
    isSkillRead,
    isModuleRead,
    isTopicRead,
    getSkillTopicStats: (skillId: string) =>
      getSkillTopicStats(skillId, progress, getSkillTopicsFn),
    topicStats,
    markSkillRead: (skillId: string) =>
      setProgress(withModuleSync((p) => markSkillRead(p, skillId, getSkillTopicsFn))),
    markSkillUnread: (skillId: string) =>
      setProgress(withModuleSync((p) => markSkillUnread(p, skillId, getSkillTopicsFn))),
    toggleSkillRead,
    markModuleRead: (moduleId: string) => setProgress((p) => markModuleRead(p, moduleId)),
    markModuleUnread: (moduleId: string) => setProgress((p) => markModuleUnread(p, moduleId)),
    toggleModuleRead,
    markAllSkillsInModuleRead: (skillIds: string[]) =>
      setProgress(withModuleSync((p) => markAllSkillsRead(p, skillIds, getSkillTopicsFn))),
    markAllSkillsInModuleUnread: (skillIds: string[]) =>
      setProgress(withModuleSync((p) => markAllSkillsUnread(p, skillIds, getSkillTopicsFn))),
    toggleTopic: (key: string) =>
      setProgress(withModuleSync((p) => toggleTopicRead(p, key, getSkillTopicsFn))),
    markTopicRead: (key: string) =>
      setProgress(withModuleSync((p) => markTopicRead(p, key, getSkillTopicsFn))),
    markTopicUnread: (key: string) =>
      setProgress(withModuleSync((p) => markTopicUnread(p, key))),
    markAllTopicsInSkillRead: (skillId: string) =>
      setProgress(withModuleSync((p) => markAllTopicsInSkillRead(p, skillId, getSkillTopicsFn))),
    markAllTopicsInSkillUnread: (skillId: string) =>
      setProgress(withModuleSync((p) => markAllTopicsInSkillUnread(p, skillId, getSkillTopicsFn))),
    markSectionRead: (detail: SkillTopics, sectionId: string) =>
      setProgress(withModuleSync((p) => markSectionRead(p, detail, sectionId, getSkillTopicsFn))),
    markSectionUnread: (detail: SkillTopics, sectionId: string) =>
      setProgress(withModuleSync((p) => markSectionUnread(p, detail, sectionId))),
    markTopicGroupRead: (detail: SkillTopics, sectionId: string, topicId: string) =>
      setProgress(withModuleSync((p) => markTopicGroupRead(p, detail, sectionId, topicId, getSkillTopicsFn))),
    markTopicGroupUnread: (detail: SkillTopics, sectionId: string, topicId: string) =>
      setProgress(withModuleSync((p) => markTopicGroupUnread(p, detail, sectionId, topicId))),
    resetProgress,
    readSkillCount,
    readModuleCount,
    readTopicCount,
  };
}

export type ProgressActions = ReturnType<typeof useProgress>;
