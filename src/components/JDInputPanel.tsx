import { useRef, useState } from "react";
import { generateCurriculumFromJD } from "../lib/llmService";
import { generateJDId } from "../lib/jdStorage";
import type { JDState } from "../types";

interface JDInputPanelProps {
  onJDGenerated: (jd: JDState) => void;
  compact?: boolean;
}

// ─── Provider & model catalogues ───────────────────────────────────────────────

const PROVIDERS = [
  { value: "groq", label: "Groq", hint: "Fast & free tier" },
  { value: "openai", label: "OpenAI", hint: "GPT-4o / GPT-4" },
  { value: "anthropic", label: "Anthropic", hint: "Claude 3.5" },
  { value: "gemini", label: "Google Gemini", hint: "Gemini 2.0" },
  { value: "openrouter", label: "OpenRouter", hint: "Multi-provider" },
];

const PROVIDER_MODELS: Record<string, { value: string; label: string }[]> = {
  groq: [
    { value: "llama-3.3-70b-versatile", label: "Llama 3.3 70B · recommended" },
    { value: "llama-3.1-8b-instant", label: "Llama 3.1 8B · fastest" },
    { value: "mixtral-8x7b-32768", label: "Mixtral 8x7B" },
    { value: "gemma2-9b-it", label: "Gemma 2 9B" },
  ],
  openai: [
    { value: "gpt-4o", label: "GPT-4o · recommended" },
    { value: "gpt-4o-mini", label: "GPT-4o Mini · faster" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo · cheapest" },
  ],
  anthropic: [
    {
      value: "claude-3-5-sonnet-20241022",
      label: "Claude 3.5 Sonnet · recommended",
    },
    { value: "claude-3-haiku-20240307", label: "Claude 3 Haiku · fastest" },
    { value: "claude-3-opus-20240229", label: "Claude 3 Opus · most capable" },
  ],
  gemini: [
    { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash · recommended" },
    { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
    { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash · fastest" },
  ],
  openrouter: [
    { value: "openai/gpt-4o", label: "GPT-4o via OpenRouter" },
    { value: "anthropic/claude-3-5-sonnet", label: "Claude 3.5 Sonnet via OR" },
    {
      value: "meta-llama/llama-3.3-70b-instruct",
      label: "Llama 3.3 70B via OR",
    },
    { value: "google/gemini-flash-1.5", label: "Gemini Flash via OR" },
  ],
};

// ─── Loading steps ─────────────────────────────────────────────────────────────
const LOADING_STEPS = [
  {
    icon: "📋",
    label: "Analysing JD",
    desc: "Reading requirements & responsibilities…",
  },
  {
    icon: "🧠",
    label: "Extracting skills",
    desc: "Identifying technologies & competencies…",
  },
  {
    icon: "🗂️",
    label: "Building modules",
    desc: "Grouping skills into learning modules…",
  },
  { icon: "✅", label: "Finalising", desc: "Adding topics and sub-topics…" },
];

function LoadingSteps({
  phase,
}: {
  phase: "idle" | "calling" | "parsing" | "done";
}) {
  const stepIdx = phase === "calling" ? 0 : phase === "parsing" ? 2 : 3;
  return (
    <div className="jd-loading-steps">
      {LOADING_STEPS.map((step, i) => {
        const done = i < stepIdx;
        const active = i === stepIdx;
        return (
          <div
            key={step.label}
            className={`jd-loading-step ${done ? "jd-loading-step--done" : ""} ${active ? "jd-loading-step--active" : ""}`}
          >
            <div className="jd-loading-step__dot">
              {done ? (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : active ? (
                <span className="jd-loading-step__pulse" />
              ) : null}
            </div>
            <div className="jd-loading-step__text">
              <span className="jd-loading-step__label">
                {step.icon} {step.label}
              </span>
              {active && (
                <span className="jd-loading-step__desc">{step.desc}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── LLM Config panel (provider + model + optional key) ───────────────────────
interface LLMConfigProps {
  selectedProvider: string;
  selectedModel: string;
  runtimeKey: string;
  showKey: boolean;
  loading: boolean;
  needsKey: boolean;
  onProviderChange: (p: string) => void;
  onModelChange: (m: string) => void;
  onKeyChange: (k: string) => void;
  onToggleKey: () => void;
}

function LLMConfig({
  selectedProvider,
  selectedModel,
  runtimeKey,
  showKey,
  loading,
  needsKey,
  onProviderChange,
  onModelChange,
  onKeyChange,
  onToggleKey,
}: LLMConfigProps) {
  const models = PROVIDER_MODELS[selectedProvider] ?? PROVIDER_MODELS["openai"];
  const providerInfo = PROVIDERS.find((p) => p.value === selectedProvider);

  return (
    <div className="llm-config">
      <div className="llm-config__header">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3" />
          <path
            d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"
            strokeLinecap="round"
          />
        </svg>
        LLM Configuration
      </div>

      <div className="llm-config__body">
        {/* Provider */}
        <div className="llm-config__field">
          <label className="llm-config__label">Provider</label>
          <div className="llm-config__select-wrap">
            <select
              className="llm-config__select"
              value={selectedProvider}
              onChange={(e) => onProviderChange(e.target.value)}
              disabled={loading}
            >
              {PROVIDERS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label} — {p.hint}
                </option>
              ))}
            </select>
            <div className="llm-config__select-icon">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M6 9l6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          {providerInfo && (
            <span className="llm-config__hint">{providerInfo.hint}</span>
          )}
        </div>

        {/* Model */}
        <div className="llm-config__field">
          <label className="llm-config__label">Model</label>
          <div className="llm-config__select-wrap">
            <select
              className="llm-config__select"
              value={selectedModel}
              onChange={(e) => onModelChange(e.target.value)}
              disabled={loading}
            >
              {models.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <div className="llm-config__select-icon">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M6 9l6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* API Key — shown when env key is not configured */}
        {needsKey && (
          <div className="llm-config__field llm-config__field--key">
            <label className="llm-config__label">
              API Key
              <span className="llm-config__required">required</span>
            </label>
            <div className="jd-key-input-wrap">
              <input
                type={showKey ? "text" : "password"}
                className="llm-config__key-input"
                placeholder={`Enter your ${selectedProvider} API key…`}
                value={runtimeKey}
                onChange={(e) => onKeyChange(e.target.value)}
                disabled={loading}
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="button"
                className="jd-key-toggle"
                onClick={onToggleKey}
                aria-label={showKey ? "Hide key" : "Show key"}
              >
                {showKey ? (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                      strokeLinecap="round"
                    />
                    <path d="M1 1l22 22" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Key configured badge */}
        {!needsKey && (
          <div className="llm-config__key-badge">
            <span className="llm-config__key-dot" />
            API key configured via <code>.env.local</code>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function JDInputPanel({
  onJDGenerated,
  compact = false,
}: JDInputPanelProps) {
  const envProvider = (
    import.meta.env.VITE_LLM_PROVIDER ?? "openai"
  ).toLowerCase();
  const envApiKey = import.meta.env.VITE_LLM_API_KEY ?? "";
  const [needsKey, setNeedsKey] = useState(!envApiKey);

  const defaultModels =
    PROVIDER_MODELS[envProvider] ?? PROVIDER_MODELS["openai"];

  const [jdText, setJdText] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(envProvider);
  const [selectedModel, setSelectedModel] = useState(defaultModels[0].value);
  const [runtimeKey, setRuntimeKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "calling" | "parsing" | "done">(
    "idle",
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const effectiveKey = needsKey ? runtimeKey : envApiKey;

  const handleProviderChange = (p: string) => {
    setSelectedProvider(p);
    setNeedsKey(p !== import.meta.env.VITE_LLM_PROVIDER)
    // Reset model to first option for new provider
    const models = PROVIDER_MODELS[p] ?? PROVIDER_MODELS["openai"];
    setSelectedModel(models[0].value);
  };

  const handleGenerate = async () => {
    if (!jdText.trim()) {
      setError("Please paste a job description first.");
      textareaRef.current?.focus();
      return;
    }
    if (needsKey && !runtimeKey.trim()) {
      setError("Please enter your API key first.");
      return;
    }
    setError(null);
    setLoading(true);
    setPhase("calling");

    try {
      const curriculum = await generateCurriculumFromJD(jdText.trim(), {
        provider: selectedProvider,
        apiKey: effectiveKey,
        model: selectedModel,
      });
      setPhase("parsing");

      const jd: JDState = {
        id: generateJDId(),
        title: curriculum.title,
        rawJD: jdText.trim(),
        modules: curriculum.modules,
        skills: curriculum.skills,
        skillTopics: curriculum.skillTopics,
        createdAt: new Date().toISOString(),
      };

      setPhase("done");
      await new Promise((r) => setTimeout(r, 400));
      onJDGenerated(jd);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setPhase("idle");
    } finally {
      setLoading(false);
    }
  };

  const configProps: LLMConfigProps = {
    selectedProvider,
    selectedModel,
    runtimeKey,
    showKey,
    loading,
    needsKey,
    onProviderChange: handleProviderChange,
    onModelChange: setSelectedModel,
    onKeyChange: setRuntimeKey,
    onToggleKey: () => setShowKey((v) => !v),
  };

  const canGenerate =
    !loading &&
    jdText.trim().length > 0 &&
    (!needsKey || runtimeKey.trim().length > 0);

  /* ─────────────────────────────── COMPACT MODE ──────────────────────────── */
  if (compact) {
    return (
      <div className="jd-compact">
        <div className="jd-compact__header">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Replace current curriculum with a new Job Description
        </div>

        <div className="jd-compact__body">
          {/* LLM config */}
          <LLMConfig {...configProps} />

          {/* Textarea */}
          <div className="jd-compact__textarea-wrap">
            <label
              htmlFor="jd-compact-textarea"
              className="jd-onboarding__label"
            >
              Job Description
            </label>
            <textarea
              ref={textareaRef}
              id="jd-compact-textarea"
              className="jd-compact__textarea"
              placeholder={
                "Paste the full job description here…\n\nExample: We are looking for a Senior Backend Engineer with 5+ years of experience in Python, PostgreSQL, Redis, Docker, and AWS…"
              }
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              rows={10}
              disabled={loading}
            />
            {jdText.trim() && !loading && (
              <button
                type="button"
                className="jd-onboarding__clear"
                onClick={() => setJdText("")}
                aria-label="Clear"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          <div className="jd-compact__meta-row">
            <span className="jd-onboarding__chars">
              {jdText.length > 0
                ? `${jdText.length.toLocaleString()} characters`
                : "A detailed JD gives better results"}
            </span>
          </div>

          {loading && <LoadingSteps phase={phase} />}

          {error && (
            <div className="jd-error-box" role="alert">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          {/* Centered generate */}
          <div className="jd-compact__cta-wrap">
            <button
              type="button"
              id="jd-compact-generate"
              className="btn btn--primary btn--lg jd-compact__cta-btn"
              onClick={handleGenerate}
              disabled={!canGenerate}
            >
              {loading ? (
                <>
                  <span className="btn__spinner" /> Working on it…
                </>
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{" "}
                  Generate Curriculum
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ──────────────────────────── FULL-SCREEN ONBOARDING ───────────────────── */
  return (
    <div className="jd-onboarding">
      <div className="jd-onboarding__card">
        {/* Hero */}
        <div className="jd-onboarding__hero">
          <div className="jd-onboarding__icon">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="jd-onboarding__title">JD Skill Tracker</h1>
          <p className="jd-onboarding__subtitle">
            Paste any job description — AI builds a personalised learning path
            with skills, topics &amp; sub-topics you can track.
          </p>
        </div>

        {/* Features */}
        <div className="jd-onboarding__features">
          {[
            {
              icon: "🧠",
              label: "AI-powered",
              desc: "LLM reads the JD and builds the curriculum",
            },
            {
              icon: "📊",
              label: "Granular tracking",
              desc: "Track every subtopic as you study",
            },
            {
              icon: "💾",
              label: "Persists until removed",
              desc: "Progress saved in your browser",
            },
          ].map((f) => (
            <div key={f.label} className="jd-feature">
              <span className="jd-feature__icon">{f.icon}</span>
              <strong className="jd-feature__label">{f.label}</strong>
              <span className="jd-feature__desc">{f.desc}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="jd-onboarding__form">
          {/* LLM config */}
          <LLMConfig {...configProps} />

          {/* Textarea */}
          <div className="jd-onboarding__textarea-wrap">
            <label htmlFor="jd-textarea" className="jd-onboarding__label">
              Job Description
            </label>
            <textarea
              ref={textareaRef}
              id="jd-textarea"
              className={`jd-onboarding__textarea ${loading ? "jd-onboarding__textarea--loading" : ""}`}
              placeholder={
                "Paste the full job description here…\n\nExample: We are looking for a Senior Backend Engineer with 5+ years of experience in Python, PostgreSQL, Redis, Docker, and AWS. You will design scalable microservices, own REST APIs, and mentor junior engineers…"
              }
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              rows={9}
              disabled={loading}
            />
            {jdText.trim() && !loading && (
              <button
                type="button"
                className="jd-onboarding__clear"
                onClick={() => setJdText("")}
                aria-label="Clear"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          <div className="jd-onboarding__meta-row">
            <span className="jd-onboarding__chars">
              {jdText.length > 0
                ? `${jdText.length.toLocaleString()} characters`
                : "A detailed JD gives better results"}
            </span>
          </div>

          {loading && <LoadingSteps phase={phase} />}

          {error && !loading && (
            <div className="jd-error-box" role="alert">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          {/* CTA — centred */}
          <div className="jd-onboarding__cta-wrap">
            <button
              id="jd-generate-btn"
              type="button"
              className="btn btn--primary btn--lg jd-onboarding__cta"
              onClick={handleGenerate}
              disabled={!canGenerate}
            >
              {loading ? (
                <>
                  <span className="btn__spinner" />
                  <span>Working on it…</span>
                </>
              ) : (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Generate Curriculum
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
