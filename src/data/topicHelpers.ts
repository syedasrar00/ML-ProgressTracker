import type { SkillTopics, SubTopic, TopicSection } from '../types';
type SubtopicInput = string;
type TopicInput = [name: string, subtopics: SubtopicInput[]];
type SectionInput = [title: string, topics: TopicInput[]];
function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}
export function buildSkillTopics(skillId: string, sections: SectionInput[]): SkillTopics {
  return {
    skillId,
    sections: sections.map(([title, topics]) => ({
      id: slug(title),
      title,
      topics: topics.map(([name, subtopics]) => ({
        id: slug(name),
        name,
        subtopics: subtopics.map((sub) => ({
          id: slug(sub),
          name: sub,
        })),
      })),
    })),
  };
}
export function topicKey(skillId: string, subtopicId: string): string {
  return `${skillId}::${subtopicId}`;
}
export function getAllSubtopics(detail: SkillTopics): Array<{ key: string; subtopic: SubTopic; topicName: string; sectionTitle: string }> {
  const result: Array<{ key: string; subtopic: SubTopic; topicName: string; sectionTitle: string }> = [];
  for (const section of detail.sections) {
    for (const topic of section.topics) {
      for (const sub of topic.subtopics) {
        result.push({
          key: topicKey(detail.skillId, sub.id),
          subtopic: sub,
          topicName: topic.name,
          sectionTitle: section.title,
        });
      }
    }
  }
  return result;
}
export function getSkillTopicProgress(
  detail: SkillTopics,
  readTopics: Record<string, boolean>,
): { read: number; total: number; pct: number } {
  const all = getAllSubtopics(detail);
  const read = all.filter((item) => readTopics[item.key]).length;
  const total = all.length;
  return { read, total, pct: total > 0 ? Math.round((read / total) * 100) : 0 };
}
export function getSubtopicIdsForSkill(detail: SkillTopics): string[] {
  return getAllSubtopics(detail).map((item) => item.key);
}
export function getSubtopicIdsForSection(detail: SkillTopics, sectionId: string): string[] {
  const section = detail.sections.find((s) => s.id === sectionId);
  if (!section) return [];
  const keys: string[] = [];
  for (const topic of section.topics) {
    for (const sub of topic.subtopics) {
      keys.push(topicKey(detail.skillId, sub.id));
    }
  }
  return keys;
}
export function getSubtopicIdsForTopic(detail: SkillTopics, sectionId: string, topicId: string): string[] {
  const section = detail.sections.find((s) => s.id === sectionId);
  const topic = section?.topics.find((t) => t.id === topicId);
  if (!topic) return [];
  return topic.subtopics.map((sub) => topicKey(detail.skillId, sub.id));
}
/** Default topics when skill has no explicit curriculum */
export function defaultSkillTopics(skillId: string, skillName: string): SkillTopics {
  return buildSkillTopics(skillId, [
    [
      'Core Concepts',
      [
        [`${skillName} fundamentals`, ['Key definitions and terminology', 'When and why to use it', 'Common patterns and anti-patterns']],
        ['Architecture & workflow', ['End-to-end pipeline overview', 'Integration with adjacent tools', 'Production considerations']],
      ],
    ],
    [
      'Hands-on Practice',
      [
        ['Guided exercises', ['Complete official tutorials', 'Reproduce example projects', 'Debug common failure modes']],
        ['Mini project', ['Define scope and success metrics', 'Implement and iterate', 'Document learnings']],
      ],
    ],
    [
      'Assessment',
      [
        ['Self-check', ['Explain concepts without notes', 'Solve practice problems under time', 'Review gaps and revisit weak areas']],
      ],
    ],
  ]);
}
export type { TopicSection };