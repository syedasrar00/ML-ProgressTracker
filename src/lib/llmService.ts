import type { GeneratedCurriculum } from '../types';

// ─── Provider defaults ─────────────────────────────────────────────────────────
const PROVIDER_DEFAULTS: Record<string, { endpoint: string; model: string; authHeader: (key: string) => Record<string, string> }> = {
  openai: {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o',
    authHeader: (key) => ({ Authorization: `Bearer ${key}` }),
  },
  anthropic: {
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-5-sonnet-20241022',
    authHeader: (key) => ({ 'x-api-key': key, 'anthropic-version': '2023-06-01' }),
  },
  gemini: {
    endpoint: '', // constructed dynamically with the key
    model: 'gemini-1.5-pro',
    authHeader: () => ({}),
  },
  openrouter: {
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'openai/gpt-4o',
    authHeader: (key) => ({ Authorization: `Bearer ${key}` }),
  },
  groq: {
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
    authHeader: (key) => ({ Authorization: `Bearer ${key}` }),
  },
};

// ─── System prompt ─────────────────────────────────────────────────────────────
function buildSystemPrompt(): string {
  return `You are a curriculum architect. Given a Job Description, extract a structured learning curriculum.

Return ONLY valid JSON matching this exact TypeScript schema — no markdown, no explanation, just JSON:

{
  "title": "string — concise role title extracted from JD (e.g. 'Senior Backend Engineer')",
  "modules": [
    {
      "id": "string — slug e.g. 'core-programming'",
      "name": "string — module name",
      "description": "string — one-sentence summary",
      "weekRange": "string — e.g. 'Weeks 1-2' or leave empty",
      "skillIds": ["array of skill ids that belong to this module"]
    }
  ],
  "skills": [
    {
      "id": "string — kebab-case unique slug",
      "name": "string",
      "tier": 1|2|3,
      "importance": 1|2|3|4|5,
      "hours": "number — realistic study hours",
      "category": "string — broad category",
      "prerequisites": ["optional: skill names that should be done first"],
      "priorityGroup": "high|medium — optional"
    }
  ],
  "skillTopics": [
    {
      "skillId": "string — must match a skill id above",
      "sections": [
        {
          "id": "string — slug of title",
          "title": "string — section heading",
          "topics": [
            {
              "id": "string — slug of name",
              "name": "string — topic name",
              "subtopics": [
                { "id": "string — slug", "name": "string — subtopic description" }
              ]
            }
          ]
        }
      ]
    }
  ]
}

Rules:
- tier 1 = foundational, tier 2 = intermediate, tier 3 = advanced
- importance 5 = critical for the JD, 1 = nice-to-have
- Every skill MUST have exactly one entry in skillTopics
- Each skill should have 2-4 sections, each section 2-3 topics, each topic 3-5 subtopics
- Extract 10-25 skills total depending on JD complexity
- Group skills logically into 4-7 modules
- All ids must be unique kebab-case slugs`;
}

// ─── Provider-specific request builders ───────────────────────────────────────
async function callOpenAICompat(
  endpoint: string,
  headers: Record<string, string>,
  model: string,
  jd: string,
): Promise<string> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: `Here is the Job Description:\n\n${jd}` },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LLM API error (${res.status}): ${err}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

async function callAnthropic(key: string, model: string, jd: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 8192,
      system: buildSystemPrompt(),
      messages: [{ role: 'user', content: `Here is the Job Description:\n\n${jd}` }],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API error (${res.status}): ${err}`);
  }
  const data = await res.json();
  return data.content?.[0]?.text ?? '';
}

async function callGemini(key: string, model: string, jd: string): Promise<string> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: buildSystemPrompt() + '\n\nHere is the Job Description:\n\n' + jd },
          ],
        },
      ],
      generationConfig: { temperature: 0.3, responseMimeType: 'application/json' },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${err}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

// ─── Main export ───────────────────────────────────────────────────────────────
export interface LLMRuntimeOptions {
  // optional override for provider (defaults to VITE_LLM_PROVIDER or 'openai')
  provider?: string;
  /** API key entered by user at runtime (overrides VITE_LLM_API_KEY) */
  apiKey?: string;
  /** Model selected by user at runtime (overrides VITE_LLM_MODEL) */
  model?: string;
}

export async function generateCurriculumFromJD(
  jd: string,
  runtimeOptions: LLMRuntimeOptions = {},
): Promise<GeneratedCurriculum> {
  const provider = (import.meta.env.VITE_LLM_PROVIDER ?? 'openai').toLowerCase();
  const apiKey: string = runtimeOptions.apiKey || import.meta.env.VITE_LLM_API_KEY || '';
  const modelOverride: string = runtimeOptions.model || import.meta.env.VITE_LLM_MODEL || '';

  if (!apiKey) {
    throw new Error(
      'No API key found. Please enter your API key above.',
    );
  }

  const providerConfig = PROVIDER_DEFAULTS[provider];
  if (!providerConfig) {
    throw new Error(
      `Unknown LLM provider "${provider}". Valid values: openai, anthropic, gemini, openrouter, groq`,
    );
  }

  const model = modelOverride || providerConfig.model;
  let raw: string;

  switch (provider) {
    case 'anthropic':
      raw = await callAnthropic(apiKey, model, jd);
      break;
    case 'gemini':
      raw = await callGemini(apiKey, model, jd);
      break;
    default:
      // openai, groq, openrouter all use the OpenAI-compatible chat completions format
      raw = await callOpenAICompat(
        providerConfig.endpoint,
        providerConfig.authHeader(apiKey),
        model,
        jd,
      );
  }

  // Parse and validate
  let parsed: GeneratedCurriculum;
  try {
    // Strip possible markdown code fences
    const clean = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
    parsed = JSON.parse(clean) as GeneratedCurriculum;
  } catch {
    throw new Error('The LLM returned invalid JSON. Please try again.');
  }

  // Basic structural validation
  if (!Array.isArray(parsed.skills) || parsed.skills.length === 0) {
    throw new Error('Generated curriculum has no skills. Please try again with a more detailed JD.');
  }
  if (!Array.isArray(parsed.modules) || parsed.modules.length === 0) {
    throw new Error('Generated curriculum has no modules. Please try again.');
  }
  if (!Array.isArray(parsed.skillTopics)) {
    parsed.skillTopics = [];
  }

  // Normalise: ensure every skill has a skillTopics entry
  const topicSkillIds = new Set(parsed.skillTopics.map((st) => st.skillId));
  for (const skill of parsed.skills) {
    if (!topicSkillIds.has(skill.id)) {
      // Generate a minimal default entry
      const slug = (t: string) =>
        t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);
      parsed.skillTopics.push({
        skillId: skill.id,
        sections: [
          {
            id: 'core-concepts',
            title: 'Core Concepts',
            topics: [
              {
                id: 'fundamentals',
                name: `${skill.name} fundamentals`,
                subtopics: [
                  { id: slug('key definitions'), name: 'Key definitions and terminology' },
                  { id: slug('when to use'), name: 'When and why to use it' },
                  { id: slug('common patterns'), name: 'Common patterns and anti-patterns' },
                ],
              },
            ],
          },
          {
            id: 'hands-on-practice',
            title: 'Hands-on Practice',
            topics: [
              {
                id: 'guided-exercises',
                name: 'Guided exercises',
                subtopics: [
                  { id: slug('official tutorials'), name: 'Complete official tutorials' },
                  { id: slug('example projects'), name: 'Reproduce example projects' },
                  { id: slug('debug failures'), name: 'Debug common failure modes' },
                ],
              },
            ],
          },
        ],
      });
    }
  }
  return parsed;
}
