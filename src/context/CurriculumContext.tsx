import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { JDState, Module, Skill, SkillTopics } from '../types';
import { clearJD, loadJD, saveJD } from '../lib/jdStorage';

interface CurriculumContextValue {
  /** Active JD — null means no JD loaded */
  jd: JDState | null;
  skills: Skill[];
  modules: Module[];
  skillTopicsMap: Record<string, SkillTopics>;
  /** Replace active JD; resets progress */
  setJD: (jd: JDState) => void;
  /** Remove active JD */
  removeJD: () => void;
  /** Look up a skill by id */
  getSkillById: (id: string) => Skill | undefined;
  /** Look up topics for a skill */
  getSkillTopics: (skillId: string) => SkillTopics | undefined;
}

const CurriculumContext = createContext<CurriculumContextValue | null>(null);

export function CurriculumProvider({ children }: { children: React.ReactNode }) {
  const [jd, setJDState] = useState<JDState | null>(() => loadJD());

  const setJD = useCallback((newJD: JDState) => {
    saveJD(newJD);
    setJDState(newJD);
  }, []);

  const removeJD = useCallback(() => {
    clearJD();
    setJDState(null);
  }, []);

  const skillTopicsMap = useMemo<Record<string, SkillTopics>>(() => {
    if (!jd) return {};
    return Object.fromEntries(jd.skillTopics.map((st) => [st.skillId, st]));
  }, [jd]);

  const getSkillById = useCallback(
    (id: string) => jd?.skills.find((s) => s.id === id),
    [jd],
  );

  const getSkillTopics = useCallback(
    (skillId: string) => skillTopicsMap[skillId],
    [skillTopicsMap],
  );

  const value: CurriculumContextValue = useMemo(
    () => ({
      jd,
      skills: jd?.skills ?? [],
      modules: jd?.modules ?? [],
      skillTopicsMap,
      setJD,
      removeJD,
      getSkillById,
      getSkillTopics,
    }),
    [jd, skillTopicsMap, setJD, removeJD, getSkillById, getSkillTopics],
  );

  return <CurriculumContext.Provider value={value}>{children}</CurriculumContext.Provider>;
}

export function useCurriculum(): CurriculumContextValue {
  const ctx = useContext(CurriculumContext);
  if (!ctx) throw new Error('useCurriculum must be used inside <CurriculumProvider>');
  return ctx;
}
