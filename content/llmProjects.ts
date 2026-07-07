export interface LLMProjectRubricRow {
  category: string
  score: string
}

export interface LLMProjectCandidateMatch {
  candidate: string
  source: string
  confidence: string
}

export interface LLMProjectEvaluationArtifact {
  title: string
  prompt?: string
  userQuery?: string
  input?: string
  expectedOutput?: string
  modelFailure?: string
  codingTask?: string
  modelOutputProblem?: string
  retrievedContext?: string
  modelAnswerIssues?: string[]
  candidateMatches?: LLMProjectCandidateMatch[]
  llmRole?: string
  issuesToWatch?: string[]
  requiredOutput?: string
  rubric: LLMProjectRubricRow[]
  overallScore: string
  issues: string[]
  finalAssessment: string
  keyPrinciple?: string
}

export interface LLMProjectExample {
  id: string
  title: string
  category: string
  description: string
  diagramType: string
  summary: string
  problemPoints: string[]
  techStack: string[]
  evaluationFocus: string[]
  evaluationQuestions?: string[]
  evaluationArtifact: LLMProjectEvaluationArtifact
  platformValue: string[]
}

export const llmProjectsSection = {
  title: 'LLM Systems & Evaluation Projects',
  overview: `This section highlights real LLM systems I have built or evaluated, with emphasis on model reliability, structured outputs, tool use, retrieval quality, hallucination control, fallback behavior, and production-readiness.

These projects are relevant to AI evaluation work because they show not only that I can build LLM systems, but that I can also identify where they fail, how to test them, and how to improve their reliability.`,
  caption:
    'Real LLM systems demonstrating structured output validation, RAG evaluation, coding-agent workflows, entity resolution, and vision-based document extraction.',
  items: [
    {
      id: 'agent-engine',
      title: 'AgentEngine — Fail-Open LLM Model Engine',
      category: 'LLM Orchestration',
      description: 'TypeScript orchestration engine with structured outputs, schema validation, retries, fallbacks, and cost tracking.',
      diagramType: 'llm-agent-engine',
      summary:
        'AgentEngine is a TypeScript-based LLM orchestration engine designed to run multiple model providers behind a single interface. It supports structured outputs, schema validation, retry logic, timeout handling, failure recovery, cost tracking, and model fallback behavior.',
      problemPoints: [
        'Malformed JSON from model responses',
        'Slow model responses and provider outages',
        'Invalid tool outputs and inconsistent response structure',
        'Unclear failure modes breaking downstream workflows',
      ],
      techStack: [
        'TypeScript',
        'Zod',
        'MCP-style tool interfaces',
        'Local Ollama/Qwen models',
        'Claude Haiku',
        'NDJSON logging',
        'Structured output validation',
        'Unit and conformance testing',
      ],
      evaluationFocus: [
        'Whether an LLM followed the requested schema',
        'Whether output was complete and usable',
        'Whether fallback behavior worked correctly',
        'Whether retries improved reliability',
        'Whether model responses were consistent across providers',
        'Whether cost and latency were acceptable',
      ],
      evaluationArtifact: {
        title: 'Structured JSON Extraction Test',
        prompt: 'Extract the requested fields from this technical note and return valid JSON matching the schema.',
        expectedOutput: `{
  "summary": "string",
  "entities": ["string"],
  "confidence": 0.0
}`,
        modelFailure: `{
  "summary": "The document discusses GPU rentals.",
  "entities": "GPU, cloud, pricing",
  "confidence": "high"
}`,
        rubric: [
          { category: 'Schema compliance', score: '4/10' },
          { category: 'Factual accuracy', score: '8/10' },
          { category: 'Usability', score: '5/10' },
          { category: 'Reliability', score: '4/10' },
        ],
        overallScore: '5.2/10',
        issues: [
          'entities should be an array, not a string.',
          'confidence should be numeric, not "high".',
          'The answer is factually reasonable but not machine-usable.',
          'Without validation, this would silently break downstream workflows.',
        ],
        finalAssessment:
          'The model understood the content but failed the structured-output contract. This is exactly why schema validation, retry logic, and fallback behavior are required for production LLM systems.',
      },
      platformValue: [
        'Instruction following',
        'Schema compliance',
        'Reliability',
        'Practical usability',
        'Failure handling',
        'Model behavior under constraints',
      ],
    },
    {
      id: 'rag-platform',
      title: 'Microservices RAG Platform',
      category: 'RAG & Document QA',
      description: 'FastAPI microservices RAG with Weaviate, HyDE, adversarial critique, tracing, and multi-provider LLM support.',
      diagramType: 'llm-rag-platform',
      summary:
        'Built a RAG platform using FastAPI microservices, Weaviate, LangChain/LlamaIndex, Redis, RabbitMQ, Postgres, and a React/TypeScript UI. The system included code-aware ingestion, multiple chunking strategies, HyDE query expansion, adversarial document critique, tracing, and multi-provider LLM support.',
      problemPoints: [
        'LLMs hallucinate when answering from documents unless retrieval quality is strong',
        'Weak chunking and ingestion reduce answer grounding',
        'Enterprise deployments need traceability and evaluation loops',
      ],
      techStack: [
        'FastAPI',
        'Weaviate',
        'LangChain',
        'LlamaIndex',
        'Redis',
        'RabbitMQ',
        'Postgres',
        'React / TypeScript',
        'LangSmith tracing',
        'Multi-provider LLM support',
      ],
      evaluationFocus: [
        'Did retrieval return the right source documents?',
        'Did the model answer only from retrieved context?',
        'Did the answer include unsupported claims?',
        'Did chunking strategy affect answer quality?',
        'Did HyDE improve retrieval for vague queries?',
        'Did adversarial critique catch weak or missing evidence?',
      ],
      evaluationQuestions: [
        'Did retrieval return the right source documents?',
        'Did the model answer only from retrieved context?',
        'Did the answer include unsupported claims?',
        'Did chunking strategy affect answer quality?',
        'Did HyDE improve retrieval for vague queries?',
        'Did adversarial critique catch weak or missing evidence?',
      ],
      evaluationArtifact: {
        title: 'Production Risk Q&A Evaluation',
        userQuery: 'What are the main risks of deploying this service in production?',
        retrievedContext:
          'The system retrieved architecture notes, deployment logs, and API gateway documentation.',
        modelAnswerIssues: [
          'The answer mentioned latency and scaling, but missed permission boundaries',
          'Stale documents and missing citations',
          'Retrieval mismatch and observability gaps',
          'Source conflict handling',
        ],
        rubric: [
          { category: 'Retrieval relevance', score: '7/10' },
          { category: 'Answer grounding', score: '6/10' },
          { category: 'Completeness', score: '5/10' },
          { category: 'Hallucination control', score: '7/10' },
          { category: 'Practical usefulness', score: '6/10' },
        ],
        overallScore: '6.2/10',
        issues: [
          'Directionally correct but incomplete production risk analysis',
          'Missed governance and reliability concerns common in enterprise RAG',
        ],
        finalAssessment:
          'The answer was directionally correct but incomplete. It found some relevant technical risks, but missed governance and reliability concerns that matter in real RAG systems. A stronger answer would cite sources, identify uncertainty, and separate retrieved facts from inferred recommendations.',
      },
      platformValue: [
        'RAG answer quality',
        'Hallucination risk',
        'Retrieval relevance',
        'Citation grounding',
        'Enterprise AI failure modes',
        'Technical completeness',
      ],
    },
    {
      id: 'corpocode',
      title: 'CorpoCode — Multi-Agent Coding Framework',
      category: 'Coding Agents',
      description: 'Multi-agent framework with specialized context, verification, documentation, and git agents.',
      diagramType: 'llm-corpocode',
      summary:
        'CorpoCode is a multi-agent framework for coding workflows. It uses smaller specialized agents to support context retrieval, verification, documentation, and git management, while keeping the main model focused on code generation.',
      problemPoints: [
        'Missing project context in large codebases',
        'Weak verification and inconsistent documentation',
        'Untracked changes and repeated mistakes',
        'Poor memory of previous errors',
      ],
      techStack: [
        'TypeScript',
        'Claude Code',
        'LLM orchestration',
        'Git automation',
        'Prompt engine design',
        'Agent memory',
        'File-anchored mistake tracking',
      ],
      evaluationFocus: [
        'Checking whether AI-generated code actually matches intent',
        'Separating code generation from verification',
        'Tracking model mistakes over time',
        'Using git history to make failures traceable',
        'Evaluating agent output quality across runs',
      ],
      evaluationArtifact: {
        title: 'Structured Logging Patch Review',
        codingTask: 'Add structured logging to an API function without changing its external behavior.',
        modelOutputProblem:
          'The AI-generated patch added logging, but also changed error-handling behavior by swallowing exceptions.',
        rubric: [
          { category: 'Task completion', score: '7/10' },
          { category: 'Correctness', score: '5/10' },
          { category: 'Regression risk', score: '4/10' },
          { category: 'Maintainability', score: '7/10' },
        ],
        overallScore: '5.8/10',
        issues: [
          'The model completed the visible logging requirement.',
          'It introduced a behavior change not requested by the task.',
          'It made debugging easier but reliability worse.',
          'The patch needed review before merge.',
        ],
        finalAssessment:
          'This is a common coding-agent failure: the model satisfies the surface request but changes behavior silently. A good reviewer must check not only whether the code looks better, but whether it preserves system behavior.',
      },
      platformValue: [
        'AI-generated code evaluation',
        'Hidden regressions',
        'Task adherence',
        'Code review quality',
        'Multi-agent workflow design',
        'Model failure patterns in coding tasks',
      ],
    },
    {
      id: 'oil-well-resolver',
      title: 'Oil-Well → RRC API Resolver',
      category: 'Entity Resolution',
      description: 'Dockerized FastAPI service resolving free-text Texas oil-well names to official RRC API numbers.',
      diagramType: 'llm-oil-well',
      summary:
        'Built a Dockerized FastAPI service that resolves free-text Texas oil-well names into official RRC API numbers across approximately 120k records. The system combined fuzzy matching, cross-validation against state datasets, and an LLM tie-breaker for low-confidence rows.',
      problemPoints: [
        'Abbreviations, spelling variations, and missing identifiers',
        'Legacy naming formats and near-duplicate records',
        'Inconsistent source data requiring controlled LLM assistance',
      ],
      techStack: [
        'FastAPI',
        'Docker',
        'Railway',
        'GPT-4o-mini',
        'Fuzzy matching',
        'Cross-validation against state datasets',
        'Historical fallback logic',
      ],
      evaluationFocus: [
        'Careful judgment around when an LLM should and should not be trusted',
        'Deterministic matching quality before model fallback',
        'Confidence thresholds and auditability of selected matches',
      ],
      evaluationArtifact: {
        title: 'Ambiguous Well Name Resolution',
        input: 'Smith Ranch Unit 12H',
        candidateMatches: [
          { candidate: 'Smith Ranch Unit 12H', source: 'Database A', confidence: '0.91' },
          { candidate: 'Smith Ranch 12-H', source: 'Database B', confidence: '0.88' },
          { candidate: 'Smith Ranch Unit 21H', source: 'Database A', confidence: '0.74' },
        ],
        llmRole:
          'The LLM was used only to evaluate ambiguous naming patterns and help choose between close candidates.',
        rubric: [
          { category: 'Deterministic match quality', score: '8/10' },
          { category: 'LLM tie-break usefulness', score: '7/10' },
          { category: 'Risk control', score: '8/10' },
          { category: 'Auditability', score: '7/10' },
        ],
        overallScore: '7.5/10',
        issuesToWatch: [
          'LLMs may over-select a plausible match.',
          'Official identifiers should be validated against structured records.',
          'Low-confidence matches should remain flagged for review.',
          'Explanations should preserve why a result was selected.',
        ],
        issues: [
          'LLMs may over-select a plausible match without structured validation.',
          'Low-confidence matches must remain flagged for human review.',
        ],
        finalAssessment:
          'This is a strong example of safe LLM usage. The system does not ask the model to invent an answer. It uses structured data first, then uses the model only as a controlled assistant for ambiguous cases.',
        keyPrinciple: 'The LLM should assist with tie-breaking, not become the source of truth.',
      },
      platformValue: [
        'LLM-assisted data workflows',
        'Confidence thresholds',
        'Entity resolution quality',
        'Hallucination risk control',
        'When model output should be rejected',
        'Human-review-worthy edge cases',
      ],
    },
    {
      id: 'vision-pdf-parser',
      title: 'Remote AI Agent + Vision PDF Parser',
      category: 'Vision LLM / Documents',
      description: 'Self-hosted agent with OCR-free vision-LLM skill for oil & gas revenue statement extraction to 26-column CSV.',
      diagramType: 'llm-vision-pdf',
      summary:
        'Built a self-hosted AI agent with a custom OCR-free vision-LLM skill for parsing oil and gas revenue statements into strict 26-column CSV outputs. The system used PDF rendering, vision model extraction, self-correction rules, and resumable batch processing.',
      problemPoints: [
        'Inconsistent layouts, scanned pages, and tables split across pages',
        'Small print, missing labels, and multi-row values',
        'Inconsistent date and amount formats in financial PDFs',
      ],
      techStack: [
        'Python',
        'Docker',
        'Railway',
        'Telegram interface',
        'Vision LLMs',
        'PyMuPDF',
        'PDF-to-image rendering',
        'Batch processing',
        'Strict 26-column CSV output',
      ],
      evaluationFocus: [
        'Did the model extract every required field?',
        'Did it preserve numeric values exactly?',
        'Did it confuse columns or hallucinate missing values?',
        'Did it follow the required 26-column schema consistently?',
      ],
      evaluationQuestions: [
        'Did the model extract every required field?',
        'Did it preserve numeric values exactly?',
        'Did it confuse columns?',
        'Did it hallucinate missing values?',
        'Did it follow the required 26-column schema?',
        'Did the output remain consistent across monthly statements?',
      ],
      evaluationArtifact: {
        title: 'Revenue Statement Extraction',
        requiredOutput:
          'A strict 26-column CSV with fields such as owner, property, production month, product type, volume, price, gross value, taxes, deductions, and net amount.',
        modelFailure:
          'The model extracted the correct net amount but placed tax deductions under the wrong column.',
        rubric: [
          { category: 'Field extraction accuracy', score: '8/10' },
          { category: 'Numeric precision', score: '9/10' },
          { category: 'Schema compliance', score: '7/10' },
          { category: 'Table alignment', score: '6/10' },
        ],
        overallScore: '7.5/10',
        issues: [
          'Some row values were shifted into neighboring columns.',
          'The model handled visible totals well.',
          'It struggled when line items wrapped across rows.',
          'Self-correction rules improved consistency on repeated statement formats.',
        ],
        finalAssessment:
          'This project demonstrates practical LLM evaluation around structured extraction. A model output can look correct visually while still failing schema or column alignment requirements. Strong evaluation requires checking both content and structure.',
      },
      platformValue: [
        'Vision-LLM outputs',
        'Structured extraction quality',
        'Schema compliance',
        'Numeric accuracy',
        'Document parsing errors',
        'Self-correction workflows',
      ],
    },
  ] satisfies LLMProjectExample[],
}
