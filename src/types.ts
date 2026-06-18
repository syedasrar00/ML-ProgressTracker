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
