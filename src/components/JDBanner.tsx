import { useState } from 'react';
import { JDInputPanel } from './JDInputPanel';
import type { JDState } from '../types';

interface JDBannerProps {
  jd: JDState;
  onRemove: () => void;
  onReplace: (jd: JDState) => void;
}

export function JDBanner({ jd, onRemove, onReplace }: JDBannerProps) {
  const [showReplace, setShowReplace] = useState(false);

  const skillCount = jd.skills.length;
  const moduleCount = jd.modules.length;
  const createdDate = new Date(jd.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleRemove = () => {
    if (window.confirm('Remove current JD? Your progress for this curriculum will be erased.')) {
      onRemove();
    }
  };

  const handleReplace = (newJD: JDState) => {
    setShowReplace(false);
    onReplace(newJD);
  };

  return (
    <>
      <div className="jd-banner" role="status">
        <div className="jd-banner__inner">
          <div className="jd-banner__info">
            <div className="jd-banner__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="jd-banner__text">
              <span className="jd-banner__title">{jd.title}</span>
              <span className="jd-banner__meta">
                {skillCount} skills · {moduleCount} modules · Added {createdDate}
              </span>
            </div>
          </div>

          <div className="jd-banner__actions">
            <button
              id="jd-change-btn"
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => setShowReplace((v) => !v)}
            >
              {showReplace ? 'Cancel' : 'Change JD'}
            </button>
            <button
              id="jd-remove-btn"
              type="button"
              className="btn btn--danger btn--sm"
              onClick={handleRemove}
            >
              Remove JD
            </button>
          </div>
        </div>
      </div>

      {showReplace && (
        <div className="jd-replace-panel">
          <JDInputPanel compact onJDGenerated={handleReplace} />
        </div>
      )}
    </>
  );
}
