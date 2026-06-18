export type Tier = 1 | 2 | 3 | 4;

export type Importance = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  id: string;
  name: string;
  tier: Tier;
  importance: Importance;
  hours: number;
  category: string;
  prerequisites?: string[];
  priorityGroup?: 'high' | 'medium';
}

export interface Module {
  id: string;
  name: string;
  description: string;
  weekRange: string;
  skillIds: string[];
}

export interface SubTopic {
  id: string;
  name: string;
}

export interface Topic {
  id: string;
  name: string;
  subtopics: SubTopic[];
}

export interface TopicSection {
  id: string;
  title: string;
  topics: Topic[];
}

export interface SkillTopics {
  skillId: string;
  sections: TopicSection[];
}

export interface ProgressState {
  readSkills: Record<string, boolean>;
  readModules: Record<string, boolean>;
  /** Keys: `${skillId}::${subtopicId}` */
  readTopics: Record<string, boolean>;
}

export type FilterStatus = 'all' | 'read' | 'unread';

// ─── JD-driven types ──────────────────────────────────────────────────────────

/** Shape returned by the LLM (validated before saving) */
export interface GeneratedCurriculum {
  title: string;
  modules: Module[];
  skills: Skill[];
  skillTopics: SkillTopics[];
}

/** Persisted active JD state */
export interface JDState {
  /** UUID used to namespace localStorage progress key */
  id: string;
  /** Role/title extracted from JD */
  title: string;
  /** Raw JD text pasted by the user */
  rawJD: string;
  modules: Module[];
  skills: Skill[];
  skillTopics: SkillTopics[];
  createdAt: string; // ISO date string
}
