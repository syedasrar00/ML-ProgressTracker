import type { ProgressState, SkillTopics } from '../types';
import {
  getAllSubtopics,
  getSkillTopicProgress,
  getSubtopicIdsForSkill,
  getSubtopicIdsForSection,
  getSubtopicIdsForTopic,
} from '../data/topicHelpers';

/** Storage key scoped to a specific JD id */
export function getProgressKey(jdId: string): string {
  return `jd-tracker-progress-${jdId}`;
}

export function loadProgressFromCache(jdId: string): ProgressState {
  try {
    const raw = localStorage.getItem(getProgressKey(jdId));
    if (!raw) return { readSkills: {}, readModules: {}, readTopics: {} };
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      readSkills: parsed.readSkills ?? {},
      readModules: parsed.readModules ?? {},
      readTopics: parsed.readTopics ?? {},
    };
  } catch {
    return { readSkills: {}, readModules: {}, readTopics: {} };
  }
}

export function saveProgressToCache(jdId: string, state: ProgressState): void {
  localStorage.setItem(getProgressKey(jdId), JSON.stringify(state));
}

export function isSkillRead(state: ProgressState, skillId: string): boolean {
  return Boolean(state.readSkills[skillId]);
}

export function isModuleRead(state: ProgressState, moduleId: string): boolean {
  return Boolean(state.readModules[moduleId]);
}

export function isTopicRead(state: ProgressState, topicKey: string): boolean {
  return Boolean(state.readTopics[topicKey]);
}

export function markSkillRead(
  state: ProgressState,
  skillId: string,
  getSkillTopicsFn: (id: string) => SkillTopics | undefined,
): ProgressState {
  const detail = getSkillTopicsFn(skillId);
  let next = {
    ...state,
    readSkills: { ...state.readSkills, [skillId]: true },
  };
  if (detail) {
    const readTopics = { ...next.readTopics };
    getSubtopicIdsForSkill(detail).forEach((key) => {
      readTopics[key] = true;
    });
    next = { ...next, readTopics };
  }
  return next;
}

export function markSkillUnread(
  state: ProgressState,
  skillId: string,
  getSkillTopicsFn: (id: string) => SkillTopics | undefined,
): ProgressState {
  const readSkills = { ...state.readSkills };
  delete readSkills[skillId];
  const detail = getSkillTopicsFn(skillId);
  const readTopics = { ...state.readTopics };
  if (detail) {
    getSubtopicIdsForSkill(detail).forEach((key) => {
      delete readTopics[key];
    });
  }
  return { ...state, readSkills, readTopics };
}

export function markModuleRead(state: ProgressState, moduleId: string): ProgressState {
  return {
    ...state,
    readModules: { ...state.readModules, [moduleId]: true },
  };
}

export function markModuleUnread(state: ProgressState, moduleId: string): ProgressState {
  const readModules = { ...state.readModules };
  delete readModules[moduleId];
  return { ...state, readModules };
}

export function markTopicRead(
  state: ProgressState,
  key: string,
  getSkillTopicsFn: (id: string) => SkillTopics | undefined,
): ProgressState {
  const readTopics = { ...state.readTopics, [key]: true };
  return syncSkillFromTopics({ ...state, readTopics }, key.split('::')[0], getSkillTopicsFn);
}

export function markTopicUnread(
  state: ProgressState,
  key: string,
): ProgressState {
  const readTopics = { ...state.readTopics };
  delete readTopics[key];
  const skillId = key.split('::')[0];
  const readSkills = { ...state.readSkills };
  delete readSkills[skillId];
  return { ...state, readTopics, readSkills };
}

export function toggleTopicRead(
  state: ProgressState,
  key: string,
  getSkillTopicsFn: (id: string) => SkillTopics | undefined,
): ProgressState {
  return state.readTopics[key]
    ? markTopicUnread(state, key)
    : markTopicRead(state, key, getSkillTopicsFn);
}

export function markTopicsRead(
  state: ProgressState,
  keys: string[],
  getSkillTopicsFn: (id: string) => SkillTopics | undefined,
): ProgressState {
  let next = state;
  keys.forEach((key) => {
    next = markTopicRead(next, key, getSkillTopicsFn);
  });
  return next;
}

export function markTopicsUnread(state: ProgressState, keys: string[]): ProgressState {
  let next = state;
  keys.forEach((key) => {
    next = markTopicUnread(next, key);
  });
  return next;
}

export function markAllTopicsInSkillRead(
  state: ProgressState,
  skillId: string,
  getSkillTopicsFn: (id: string) => SkillTopics | undefined,
): ProgressState {
  const detail = getSkillTopicsFn(skillId);
  if (!detail) return markSkillRead(state, skillId, getSkillTopicsFn);
  const readTopics = { ...state.readTopics };
  getSubtopicIdsForSkill(detail).forEach((key) => {
    readTopics[key] = true;
  });
  return syncSkillFromTopics(
    { ...state, readTopics, readSkills: { ...state.readSkills, [skillId]: true } },
    skillId,
    getSkillTopicsFn,
  );
}

export function markAllTopicsInSkillUnread(
  state: ProgressState,
  skillId: string,
  getSkillTopicsFn: (id: string) => SkillTopics | undefined,
): ProgressState {
  const detail = getSkillTopicsFn(skillId);
  const readSkills = { ...state.readSkills };
  delete readSkills[skillId];
  const readTopics = { ...state.readTopics };
  if (detail) {
    getSubtopicIdsForSkill(detail).forEach((key) => {
      delete readTopics[key];
    });
  }
  return { ...state, readSkills, readTopics };
}

export function markSectionRead(
  state: ProgressState,
  detail: SkillTopics,
  sectionId: string,
  getSkillTopicsFn: (id: string) => SkillTopics | undefined,
): ProgressState {
  return markTopicsRead(state, getSubtopicIdsForSection(detail, sectionId), getSkillTopicsFn);
}

export function markSectionUnread(
  state: ProgressState,
  detail: SkillTopics,
  sectionId: string,
): ProgressState {
  return markTopicsUnread(state, getSubtopicIdsForSection(detail, sectionId));
}

export function markTopicGroupRead(
  state: ProgressState,
  detail: SkillTopics,
  sectionId: string,
  topicId: string,
  getSkillTopicsFn: (id: string) => SkillTopics | undefined,
): ProgressState {
  return markTopicsRead(
    state,
    getSubtopicIdsForTopic(detail, sectionId, topicId),
    getSkillTopicsFn,
  );
}

export function markTopicGroupUnread(
  state: ProgressState,
  detail: SkillTopics,
  sectionId: string,
  topicId: string,
): ProgressState {
  return markTopicsUnread(state, getSubtopicIdsForTopic(detail, sectionId, topicId));
}

function syncSkillFromTopics(
  state: ProgressState,
  skillId: string,
  getSkillTopicsFn: (id: string) => SkillTopics | undefined,
): ProgressState {
  const detail = getSkillTopicsFn(skillId);
  if (!detail) return state;
  const { read, total } = getSkillTopicProgress(detail, state.readTopics);
  const readSkills = { ...state.readSkills };
  if (read === total && total > 0) {
    readSkills[skillId] = true;
  }
  return { ...state, readSkills };
}

export function markAllSkillsRead(
  state: ProgressState,
  skillIds: string[],
  getSkillTopicsFn: (id: string) => SkillTopics | undefined,
): ProgressState {
  return skillIds.reduce((acc, id) => markSkillRead(acc, id, getSkillTopicsFn), state);
}

export function markAllSkillsUnread(
  state: ProgressState,
  skillIds: string[],
  getSkillTopicsFn: (id: string) => SkillTopics | undefined,
): ProgressState {
  return skillIds.reduce((acc, id) => markSkillUnread(acc, id, getSkillTopicsFn), state);
}

export function resetProgress(): ProgressState {
  return { readSkills: {}, readModules: {}, readTopics: {} };
}

export function getTotalTopicStats(
  state: ProgressState,
  skillTopicsMap: Record<string, SkillTopics>,
): { read: number; total: number } {
  let read = 0;
  let total = 0;
  for (const detail of Object.values(skillTopicsMap)) {
    const stats = getSkillTopicProgress(detail, state.readTopics);
    read += stats.read;
    total += stats.total;
  }
  return { read, total };
}

export function getSkillTopicStats(
  skillId: string,
  state: ProgressState,
  getSkillTopicsFn: (id: string) => SkillTopics | undefined,
): { read: number; total: number; pct: number } {
  const detail = getSkillTopicsFn(skillId);
  if (!detail) return { read: 0, total: 0, pct: 0 };
  return getSkillTopicProgress(detail, state.readTopics);
}

export function countReadTopics(state: ProgressState): number {
  return Object.keys(state.readTopics).length;
}

export function countTotalTopics(skillTopicsMap: Record<string, SkillTopics>): number {
  return Object.values(skillTopicsMap).reduce(
    (sum, detail) => sum + getAllSubtopics(detail).length,
    0,
  );
}
