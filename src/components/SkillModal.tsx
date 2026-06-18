import { useEffect, useRef } from "react";
import type { Skill } from "../types";
import { useCurriculum } from "../context/CurriculumContext";
import {
  getSkillTopicProgress,
  getSubtopicIdsForSection,
  getSubtopicIdsForTopic,
  topicKey,
} from "../data/topicHelpers";
import type { ProgressActions } from "../hooks/useProgress";

const tierLabels: Record<number, string> = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
  4: "Expert",
};

const importanceLabels: Record<number, string> = {
  5: "Critical",
  4: "High",
  3: "Medium",
  2: "Low",
  1: "Nice-to-have",
};

interface SkillModalProps {
  skill: Skill | null;
  progress: ProgressActions;
  onClose: () => void;
}

export function SkillModal({ skill, progress, onClose }: SkillModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { getSkillTopics } = useCurriculum();

  useEffect(() => {
    if (!skill) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [skill, onClose]);

  if (!skill) return null;

  const detail = getSkillTopics(skill.id);
  if (!detail) return null;

  const stats = getSkillTopicProgress(detail, progress.progress.readTopics);

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal__header">
          <div className="modal__header-text">
            <span className="modal__tier">
              Tier {skill.tier} · {tierLabels[skill.tier]}
            </span>
            <h2 id="skill-modal-title" className="modal__title">
              {skill.name}
            </h2>
            <div className="modal__meta">
              <span className={`importance importance--${skill.importance}`}>
                {"★".repeat(skill.importance)}
                <span className="importance__label">
                  {importanceLabels[skill.importance]}
                </span>
              </span>
              <span className="skill-card__hours">{skill.hours}h</span>
              <span className="skill-card__category">{skill.category}</span>
            </div>
          </div>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="modal__progress">
          <div className="progress-bar progress-bar--lg">
            <div
              className="progress-bar__fill"
              style={{ width: `${stats.pct}%` }}
            />
          </div>
          <span className="modal__progress-label">
            {stats.read}/{stats.total} topics completed · {stats.pct}%
          </span>
        </div>

        <div className="modal__toolbar">
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => progress.markAllTopicsInSkillRead(skill.id)}
          >
            Mark all read
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => progress.markAllTopicsInSkillUnread(skill.id)}
          >
            Mark all unread
          </button>
        </div>

        <div className="modal__body">
          {detail.sections.map((section) => {
            const sectionKeys = getSubtopicIdsForSection(detail, section.id);
            const sectionRead = sectionKeys.filter((k) =>
              progress.isTopicRead(k),
            ).length;
            const sectionTotal = sectionKeys.length;
            const sectionDone =
              sectionRead === sectionTotal && sectionTotal > 0;

            return (
              <section key={section.id} className="topic-section">
                <div className="topic-section__header">
                  <h3 className="topic-section__title">{section.title}</h3>
                  <div className="topic-section__actions">
                    <span className="topic-section__count">
                      {sectionRead}/{sectionTotal}
                    </span>
                    {!sectionDone ? (
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() =>
                          progress.markSectionRead(detail, section.id)
                        }
                      >
                        Mark section read
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() =>
                          progress.markSectionUnread(detail, section.id)
                        }
                      >
                        Mark section unread
                      </button>
                    )}
                  </div>
                </div>

                {section.topics.map((topic) => {
                  const topicKeys = getSubtopicIdsForTopic(
                    detail,
                    section.id,
                    topic.id,
                  );
                  const topicRead = topicKeys.filter((k) =>
                    progress.isTopicRead(k),
                  ).length;
                  const topicTotal = topicKeys.length;
                  const topicDone = topicRead === topicTotal && topicTotal > 0;

                  return (
                    <div key={topic.id} className="topic-group">
                      <div className="topic-group__header">
                        <h4 className="topic-group__title">{topic.name}</h4>
                        <div className="topic-group__actions">
                          <span className="topic-group__count">
                            {topicRead}/{topicTotal}
                          </span>
                          {!topicDone ? (
                            <button
                              type="button"
                              className="btn btn--ghost btn--sm"
                              onClick={() =>
                                progress.markTopicGroupRead(
                                  detail,
                                  section.id,
                                  topic.id,
                                )
                              }
                            >
                              Mark read
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn--ghost btn--sm"
                              onClick={() =>
                                progress.markTopicGroupUnread(
                                  detail,
                                  section.id,
                                  topic.id,
                                )
                              }
                            >
                              Mark unread
                            </button>
                          )}
                        </div>
                      </div>

                      <ul className="subtopic-list">
                        {topic.subtopics.map((sub) => {
                          const key = topicKey(skill.id, sub.id);
                          const isRead = progress.isTopicRead(key);
                          return (
                            <li key={sub.id}>
                              <button
                                type="button"
                                className={`subtopic-item ${isRead ? "subtopic-item--read" : ""}`}
                                onClick={() => progress.toggleTopic(key)}
                                aria-pressed={isRead}
                              >
                                <span
                                  className={`subtopic-item__check ${isRead ? "subtopic-item__check--done" : ""}`}
                                >
                                  {isRead && (
                                    <svg
                                      width="12"
                                      height="12"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                    >
                                      <path
                                        d="M20 6L9 17l-5-5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  )}
                                </span>
                                <span className="subtopic-item__label">
                                  {sub.name}
                                </span>
                                <span className="subtopic-item__action">
                                  {isRead ? "Unread" : "Read"}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
