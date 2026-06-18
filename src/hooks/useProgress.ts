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
import type { ProgressState } from '../types';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(loadProgressFromCache);

  useEffect(() => {
    saveProgressToCache(progress);
  }, [progress]);

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

  const toggleSkillRead = useCallback((skillId: string) => {
    setProgress((prev) =>
      prev.readSkills[skillId]
        ? markSkillUnread(prev, skillId)
        : markSkillRead(prev, skillId),
    );
  }, []);

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

  const topicStats = useMemo(() => getTotalTopicStats(progress), [progress]);

  const readSkillCount = Object.keys(progress.readSkills).length;
  const readModuleCount = Object.keys(progress.readModules).length;
  const readTopicCount = countReadTopics(progress);

  return {
    progress,
    isSkillRead,
    isModuleRead,
    isTopicRead,
    getSkillTopicStats: (skillId: string) => getSkillTopicStats(skillId, progress),
    topicStats,
    markSkillRead: (skillId: string) => setProgress((p) => markSkillRead(p, skillId)),
    markSkillUnread: (skillId: string) => setProgress((p) => markSkillUnread(p, skillId)),
    toggleSkillRead,
    markModuleRead: (moduleId: string) => setProgress((p) => markModuleRead(p, moduleId)),
    markModuleUnread: (moduleId: string) => setProgress((p) => markModuleUnread(p, moduleId)),
    toggleModuleRead,
    markAllSkillsInModuleRead: (skillIds: string[]) =>
      setProgress((p) => markAllSkillsRead(p, skillIds)),
    markAllSkillsInModuleUnread: (skillIds: string[]) =>
      setProgress((p) => markAllSkillsUnread(p, skillIds)),
    toggleTopic: (key: string) => setProgress((p) => toggleTopicRead(p, key)),
    markTopicRead: (key: string) => setProgress((p) => markTopicRead(p, key)),
    markTopicUnread: (key: string) => setProgress((p) => markTopicUnread(p, key)),
    markAllTopicsInSkillRead: (skillId: string) =>
      setProgress((p) => markAllTopicsInSkillRead(p, skillId)),
    markAllTopicsInSkillUnread: (skillId: string) =>
      setProgress((p) => markAllTopicsInSkillUnread(p, skillId)),
    markSectionRead: (detail: Parameters<typeof markSectionRead>[1], sectionId: string) =>
      setProgress((p) => markSectionRead(p, detail, sectionId)),
    markSectionUnread: (detail: Parameters<typeof markSectionUnread>[1], sectionId: string) =>
      setProgress((p) => markSectionUnread(p, detail, sectionId)),
    markTopicGroupRead: (
      detail: Parameters<typeof markTopicGroupRead>[1],
      sectionId: string,
      topicId: string,
    ) => setProgress((p) => markTopicGroupRead(p, detail, sectionId, topicId)),
    markTopicGroupUnread: (
      detail: Parameters<typeof markTopicGroupUnread>[1],
      sectionId: string,
      topicId: string,
    ) => setProgress((p) => markTopicGroupUnread(p, detail, sectionId, topicId)),
    resetProgress,
    readSkillCount,
    readModuleCount,
    readTopicCount,
  };
}

export type ProgressActions = ReturnType<typeof useProgress>;
