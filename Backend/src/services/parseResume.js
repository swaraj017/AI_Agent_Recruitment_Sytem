const SYSTEM_PROMPT = `You are a strict JSON parser for resumes. Output ONLY minified JSON in this exact schema and nothing else:
{
  "candidate": {
    "id": "",
    "name": "",
    "email": "",
    "yearsExperience": 0,
    "skills": [],
    "projects": [
      {"name": "", "techStack": [], "description": ""}
    ]
  }
}
Rules:
- If a field is unknown, keep sensible defaults (empty string, 0, or empty array).
- yearsExperience must be a number.
- skills must be an array of strings.
- projects is an array; include at least one object, even if empty.
- Do not include markdown, code fences, comments, or extra keys.`;

function safeSkeleton() {
  return {
    candidate: {
      id: "",
      name: "",
      email: "",
      yearsExperience: 0,
      skills: [],
      projects: [
        { name: "", techStack: [], description: "" }
      ],
    },
  };
}

function normalizeCandidate(obj) {
  const sk = safeSkeleton();
  const c = (obj && obj.candidate) || {};

  /* ---------------- Base Skills ---------------- */
  const baseSkills = Array.isArray(c.skills)
    ? c.skills.filter(s => typeof s === "string")
    : [];

  /* ---------------- Project Tech Stack ---------------- */
  const projectTech = Array.isArray(c.projects)
    ? c.projects.flatMap(p =>
        Array.isArray(p?.techStack)
          ? p.techStack.filter(s => typeof s === "string")
          : []
      )
    : [];

  /* ---------------- Merge Skills ---------------- */
  const mergedSkills = [
    ...new Set(
      [...baseSkills, ...projectTech]
        .map(s => s.trim())
        .filter(Boolean)
        .map(s => s.toLowerCase())
    )
  ];

  /* ---------------- Normalize Projects ---------------- */
  const normalizedProjects =
    Array.isArray(c.projects) && c.projects.length > 0
      ? c.projects.map(p => ({
          name: typeof p?.name === "string" ? p.name : "",
          techStack: Array.isArray(p?.techStack)
            ? p.techStack.filter(s => typeof s === "string")
            : [],
          description: typeof p?.description === "string" ? p.description : "",
        }))
      : [{ name: "", techStack: [], description: "" }];

  return {
    candidate: {
      id: typeof c.id === "string" ? c.id : "",
      name: typeof c.name === "string" ? c.name : "",
      email: typeof c.email === "string" ? c.email : "",
      yearsExperience: Number.isFinite(c.yearsExperience)
        ? c.yearsExperience
        : 0,
      skills: mergedSkills,
      projects: normalizedProjects,
    },
  };
}



export async function parseResume(rawText, { timeoutMs = 20000 } = {}) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      error: "Missing OPENROUTER_API_KEY",
      parsed: safeSkeleton(),
    };
  }

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const resp = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Resume text:\n\n${rawText}` },
          ],
          temperature: 0,
          response_format: { type: "json_object" },
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(t);

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      return {
        ok: false,
        error: `LLM HTTP ${resp.status}: ${text}`.slice(0, 300),
        parsed: safeSkeleton(),
      };
    }

    const data = await resp.json();

    const content = data?.choices?.[0]?.message?.content || "";

    let parsed;

    try {
      parsed = JSON.parse(content);
      console.log(parsed);
    } catch {
      const m = content.match(/\{[\s\S]*\}$/);
      parsed = m ? JSON.parse(m[0]) : safeSkeleton();
    }

    const normalized = normalizeCandidate(parsed);

    return { ok: true, parsed: normalized };

  } catch (err) {
    return {
      ok: false,
      error: err.message || "LLM error",
      parsed: safeSkeleton(),
    };
  } finally {
    clearTimeout(t);
  }
}