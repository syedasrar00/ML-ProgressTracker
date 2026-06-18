import { useMemo, useState } from 'react';
import {
  categories,
  getSkillById,
  modules,
  skills,
  tierDescriptions,
  tierLabels,
} from './data/skills';
import { useProgress } from './hooks/useProgress';
import type { FilterStatus, Skill, Tier } from './types';
import { ModuleCard } from './components/ModuleCard';
import { SkillCard } from './components/SkillCard';
import { SkillModal } from './components/SkillModal';
import { StatsBar } from './components/StatsBar';

type View = 'path' | 'skills';

export default function App() {
  const [view, setView] = useState<View>('path');
  const [tierFilter, setTierFilter] = useState<Tier | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const progress = useProgress();

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      if (tierFilter !== 'all' && skill.tier !== tierFilter) return false;
      if (categoryFilter !== 'all' && skill.category !== categoryFilter) return false;
      if (statusFilter === 'read' && !progress.isSkillRead(skill.id)) return false;
      if (statusFilter === 'unread' && progress.isSkillRead(skill.id)) return false;
      if (search && !skill.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [tierFilter, categoryFilter, statusFilter, search, progress]);

  const openSkill = (skillId: string) => {
    const skill = getSkillById(skillId);
    if (skill) setSelectedSkill(skill);
  };

  const stopProp = (e: React.MouseEvent, fn: () => void) => {
    e.stopPropagation();
    fn();
  };

  const handleReset = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      progress.resetProgress();
      setSelectedSkill(null);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header__inner">
          <div className="header__brand">
            <p className="header__eyebrow">ML Engineer Curriculum</p>
            <h1 className="header__title">Skill Tracker</h1>
            <p className="header__subtitle">
              Difficulty & importance matrix — track your learning path
            </p>
          </div>
          <div className="header__actions">
            <button type="button" className="btn btn--ghost" onClick={handleReset}>
              Reset progress
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        <StatsBar
          readSkillCount={progress.readSkillCount}
          readModuleCount={progress.readModuleCount}
          readTopicCount={progress.readTopicCount}
          totalTopics={progress.topicStats.total}
          totalModules={modules.length}
          readSkillIds={progress.progress.readSkills}
        />

        <nav className="tabs">
          <button
            type="button"
            className={`tab ${view === 'path' ? 'tab--active' : ''}`}
            onClick={() => setView('path')}
          >
            Learning Path
          </button>
          <button
            type="button"
            className={`tab ${view === 'skills' ? 'tab--active' : ''}`}
            onClick={() => setView('skills')}
          >
            All Skills
          </button>
        </nav>

        {view === 'path' && (
          <section className="section">
            <div className="section__header">
              <h2 className="section__title">Critical Path</h2>
              <p className="section__desc">
                Click any skill to open its topic checklist — progress is saved in your browser.
              </p>
            </div>
            <div className="module-grid">
              {modules.map((mod) => (
                <ModuleCard
                  key={mod.id}
                  module={mod}
                  isRead={progress.isModuleRead(mod.id)}
                  readSkills={progress.progress.readSkills}
                  getTopicStats={progress.getSkillTopicStats}
                  onToggleModule={() => progress.toggleModuleRead(mod.id)}
                  onMarkModuleRead={() => progress.markModuleRead(mod.id)}
                  onMarkModuleUnread={() => progress.markModuleUnread(mod.id)}
                  onMarkAllSkillsRead={() => progress.markAllSkillsInModuleRead(mod.skillIds)}
                  onMarkAllSkillsUnread={() => progress.markAllSkillsInModuleUnread(mod.skillIds)}
                  onSkillClick={openSkill}
                />
              ))}
            </div>
          </section>
        )}

        {view === 'skills' && (
          <section className="section">
            <div className="filters">
              <div className="filter-group filter-group--search">
                <label htmlFor="search">Search</label>
                <input
                  id="search"
                  type="search"
                  placeholder="Find a skill…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label htmlFor="tier">Tier</label>
                <select
                  id="tier"
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value === 'all' ? 'all' : (Number(e.target.value) as Tier))}
                >
                  <option value="all">All tiers</option>
                  {[1, 2, 3].map((t) => (
                    <option key={t} value={t}>
                      Tier {t} — {tierLabels[t]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
                >
                  <option value="all">All</option>
                  <option value="read">Read</option>
                  <option value="unread">Unread</option>
                </select>
              </div>
            </div>

            <p className="results-count">
              Showing {filteredSkills.length} of {skills.length} skills
            </p>

            {[1, 2, 3].map((tier) => {
              const tierSkills = filteredSkills.filter((s) => s.tier === tier);
              if (tierSkills.length === 0) return null;
              return (
                <div key={tier} className="tier-section">
                  <div className="tier-section__header">
                    <h2 className="tier-section__title">
                      Tier {tier}: {tierLabels[tier]}
                    </h2>
                    <p className="tier-section__desc">{tierDescriptions[tier]}</p>
                  </div>
                  <div className="skill-grid">
                    {tierSkills.map((skill) => {
                      const topicStats = progress.getSkillTopicStats(skill.id);
                      return (
                        <div key={skill.id} id={`skill-${skill.id}`}>
                          <SkillCard
                            skill={skill}
                            isRead={progress.isSkillRead(skill.id)}
                            topicPct={topicStats.pct}
                            topicRead={topicStats.read}
                            topicTotal={topicStats.total}
                            onOpen={() => openSkill(skill.id)}
                            onToggle={(e) => stopProp(e, () => progress.toggleSkillRead(skill.id))}
                            onMarkRead={(e) => stopProp(e, () => progress.markSkillRead(skill.id))}
                            onMarkUnread={(e) => stopProp(e, () => progress.markSkillUnread(skill.id))}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </main>

      <SkillModal
        skill={selectedSkill}
        progress={progress}
        onClose={() => setSelectedSkill(null)}
      />

      <footer className="footer">
        <p>Progress saved automatically in your browser (localStorage) — skills, modules, and topics.</p>
      </footer>
    </div>
  );
}
