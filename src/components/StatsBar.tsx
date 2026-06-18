import { skills } from '../data/skills';

interface StatsBarProps {
  readSkillCount: number;
  readModuleCount: number;
  readTopicCount: number;
  totalTopics: number;
  totalModules: number;
  readSkillIds: Record<string, boolean>;
}

export function StatsBar({
  readSkillCount,
  readModuleCount,
  readTopicCount,
  totalTopics,
  totalModules,
  readSkillIds,
}: StatsBarProps) {
  const totalSkills = skills.length;
  const totalHours = skills.reduce((sum, s) => sum + s.hours, 0);
  const readHours = skills
    .filter((s) => readSkillIds[s.id])
    .reduce((sum, s) => sum + s.hours, 0);

  const skillPct = Math.round((readSkillCount / totalSkills) * 100);
  const modulePct = Math.round((readModuleCount / totalModules) * 100);
  const topicPct = totalTopics > 0 ? Math.round((readTopicCount / totalTopics) * 100) : 0;

  return (
    <section className="stats-bar">
      <div className="stat">
        <span className="stat__value">{readTopicCount}</span>
        <span className="stat__label">Topics read</span>
        <span className="stat__sub">{topicPct}% of {totalTopics}</span>
      </div>
      <div className="stat">
        <span className="stat__value">{readSkillCount}</span>
        <span className="stat__label">Skills read</span>
        <span className="stat__sub">{skillPct}% of {totalSkills}</span>
      </div>
      <div className="stat">
        <span className="stat__value">{readModuleCount}</span>
        <span className="stat__label">Modules read</span>
        <span className="stat__sub">{modulePct}% of {totalModules}</span>
      </div>
      <div className="stat">
        <span className="stat__value">{readHours}</span>
        <span className="stat__label">Hours completed</span>
        <span className="stat__sub">of {totalHours}+ total</span>
      </div>
    </section>
  );
}
