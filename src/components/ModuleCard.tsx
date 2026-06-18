import type { Module } from '../types';
import { getModuleProgress, getSkillById } from '../data/skills';

interface ModuleCardProps {
  module: Module;
  isRead: boolean;
  readSkills: Record<string, boolean>;
  getTopicStats: (skillId: string) => { read: number; total: number; pct: number };
  onToggleModule: () => void;
  onMarkModuleRead: () => void;
  onMarkModuleUnread: () => void;
  onMarkAllSkillsRead: () => void;
  onMarkAllSkillsUnread: () => void;
  onSkillClick: (skillId: string) => void;
}

export function ModuleCard({
  module,
  isRead,
  readSkills,
  getTopicStats,
  onToggleModule,
  onMarkModuleRead,
  onMarkModuleUnread,
  onMarkAllSkillsRead,
  onMarkAllSkillsUnread,
  onSkillClick,
}: ModuleCardProps) {
  const { read, total } = getModuleProgress(module, readSkills);
  const pct = total > 0 ? Math.round((read / total) * 100) : 0;

  const topicTotals = module.skillIds.reduce(
    (acc, id) => {
      const s = getTopicStats(id);
      return { read: acc.read + s.read, total: acc.total + s.total };
    },
    { read: 0, total: 0 },
  );
  const topicPct = topicTotals.total > 0 ? Math.round((topicTotals.read / topicTotals.total) * 100) : 0;

  return (
    <article className={`module-card ${isRead ? 'module-card--read' : ''}`}>
      <div className="module-card__header">
        <div>
          <span className="module-card__week">{module.weekRange}</span>
          <h3 className="module-card__title">{module.name}</h3>
          <p className="module-card__desc">{module.description}</p>
        </div>
        <button
          type="button"
          className={`read-toggle read-toggle--lg ${isRead ? 'read-toggle--active' : ''}`}
          onClick={onToggleModule}
          aria-pressed={isRead}
          aria-label={isRead ? `Mark ${module.name} module as unread` : `Mark ${module.name} module as read`}
        >
          {isRead ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
            </svg>
          )}
        </button>
      </div>

      <div className="module-card__progress">
        <div className="progress-bar">
          <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="module-card__progress-text">
          {read}/{total} skills · {topicTotals.read}/{topicTotals.total} topics · {topicPct}%
        </span>
      </div>

      <ul className="module-card__skills">
        {module.skillIds.map((id) => {
          const skill = getSkillById(id);
          if (!skill) return null;
          const skillRead = Boolean(readSkills[id]);
          const topics = getTopicStats(id);
          return (
            <li key={id}>
              <button
                type="button"
                className={`module-skill-link ${skillRead ? 'module-skill-link--read' : ''}`}
                onClick={() => onSkillClick(id)}
              >
                <span className={`module-skill-link__dot ${skillRead ? 'module-skill-link__dot--read' : ''}`} />
                <span className="module-skill-link__name">{skill.name}</span>
                {topics.total > 0 && (
                  <span className="module-skill-link__topics">
                    {topics.read}/{topics.total}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="module-card__actions">
        {!isRead ? (
          <button type="button" className="btn btn--ghost btn--sm" onClick={onMarkModuleRead}>
            Mark module read
          </button>
        ) : (
          <button type="button" className="btn btn--ghost btn--sm" onClick={onMarkModuleUnread}>
            Mark module unread
          </button>
        )}
        <button type="button" className="btn btn--ghost btn--sm" onClick={onMarkAllSkillsRead}>
          Mark all skills read
        </button>
        <button type="button" className="btn btn--ghost btn--sm" onClick={onMarkAllSkillsUnread}>
          Mark all unread
        </button>
      </div>
    </article>
  );
}
