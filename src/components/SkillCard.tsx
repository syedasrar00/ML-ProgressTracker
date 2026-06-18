import type { Skill } from '../types';
import { importanceLabels } from '../data/skills';

interface SkillCardProps {
  skill: Skill;
  isRead: boolean;
  topicPct: number;
  topicRead: number;
  topicTotal: number;
  onOpen: () => void;
  onToggle: (e: React.MouseEvent) => void;
  onMarkRead: (e: React.MouseEvent) => void;
  onMarkUnread: (e: React.MouseEvent) => void;
}

const tierAccent: Record<number, string> = {
  1: 'tier-1',
  2: 'tier-2',
  3: 'tier-3',
  4: 'tier-4',
};

export function SkillCard({
  skill,
  isRead,
  topicPct,
  topicRead,
  topicTotal,
  onOpen,
  onToggle,
  onMarkRead,
  onMarkUnread,
}: SkillCardProps) {
  return (
    <article
      className={`skill-card ${isRead ? 'skill-card--read' : ''} skill-card--clickable`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className={`skill-card__accent ${tierAccent[skill.tier]}`} />
      <div className="skill-card__body">
        <div className="skill-card__header">
          <h3 className="skill-card__title">{skill.name}</h3>
          <button
            type="button"
            className={`read-toggle ${isRead ? 'read-toggle--active' : ''}`}
            onClick={onToggle}
            aria-pressed={isRead}
            aria-label={isRead ? `Mark ${skill.name} as unread` : `Mark ${skill.name} as read`}
          >
            {isRead ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
              </svg>
            )}
          </button>
        </div>

        <div className="skill-card__meta">
          <span className={`importance importance--${skill.importance}`}>
            {'★'.repeat(skill.importance)}
            <span className="importance__label">{importanceLabels[skill.importance]}</span>
          </span>
          <span className="skill-card__hours">{skill.hours}h</span>
          <span className="skill-card__category">{skill.category}</span>
        </div>

        {topicTotal > 0 && (
          <div className="skill-card__topic-progress">
            <div className="progress-bar">
              <div className="progress-bar__fill" style={{ width: `${topicPct}%` }} />
            </div>
            <span className="skill-card__topic-label">
              {topicRead}/{topicTotal} topics
            </span>
          </div>
        )}

        {skill.prerequisites && skill.prerequisites.length > 0 && (
          <p className="skill-card__prereq">
            Prerequisites: {skill.prerequisites.join(', ')}
          </p>
        )}

        <div className="skill-card__actions">
          <span className="skill-card__hint">Click to view topics</span>
          {!isRead ? (
            <button type="button" className="btn btn--ghost btn--sm" onClick={onMarkRead}>
              Mark read
            </button>
          ) : (
            <button type="button" className="btn btn--ghost btn--sm" onClick={onMarkUnread}>
              Mark unread
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
