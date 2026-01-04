export const siteContent = {
  meta: {
    name: 'Atadzhan Baratov',
    title: 'Principal AI/ML Engineer | Autonomous Systems • Multi-Agent Architectures • Long-Context RAG & AI Orchestration • Cloud Data & MLOps',
    tagline: 'Building autonomous, agentic, production-grade AI systems with strong observability, governance, and reliability.',
    welcomeMessage: "Welcome to my workstation. Feel free to explore.",
    avatar: '/imgs/atajan.png',
    location: 'London, UK',
  },

  // Desktop icon badges
  badges: {
    projects: '6',
    github: '25+',
    linkedin: '500+',
    resume: null,
    coffee: null,
  },

  terminal: {
    welcome: `
┌───────────────────────────────────────────────────────────────────────┐
│                                                                       │
│   Welcome to Atadzhan's Workstation                                   │
│   Principal AI/ML Engineer | London, UK                               │
│                                                                       │
│   Autonomous Systems • Multi-Agent Architectures                      │
│   Long-Context RAG & AI Orchestration • Cloud Data & MLOps            │
│                                                                       │
│   "Building autonomous AI systems that are reliable,                  │
│    observable, and production-ready."                                 │
│                                                                       │
│   13+ years designing, scaling, and operating AI systems              │
│   across research, fintech, cloud platforms, and enterprise.          │
│                                                                       │
│   Type 'help' to explore available commands.                          │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
`,
    help: `
Available Commands:
───────────────────
  about        - Learn about me
  skills       - View my technical skills
  projects     - Browse my projects
  experience   - See my work history
  education    - View my education
  architecture - My systems thinking approach
  philosophy   - My engineering principles
  contact      - Get in touch
  resume       - Download my resume
  clear        - Clear the terminal
  help         - Show this help message
`,
    prompt: 'atadzhan@workstation:~$',
    unknownCommand: (cmd: string) => `Command not found: ${cmd}. Type 'help' for available commands.`,
  },

  positioning: "Principal AI Engineer building autonomous, agentic, production-grade AI systems with strong observability, governance, and reliability.",

  summary: [
    "Principal AI / Agentic AI Engineer with 13+ years of experience designing, scaling, and operating AI systems across research, fintech, cloud platforms, and the public sector.",
    "I specialize in autonomous and agentic systems — long-horizon execution, multi-agent coordination, decision orchestration, memory-aware reasoning, and tool-driven workflows.",
    "My work focuses on converting cutting-edge AI research into production systems that are observable, cost-efficient, compliant, and safe to deploy at scale.",
  ],

  philosophy: [
    "Autonomy without observability is fragility.",
    "Agent systems are stateful machines, not prompt chains.",
    "Correctness and traceability matter more than speed.",
    "Production constraints shape better AI systems.",
  ],

  about: {
    summary: `Principal AI / Agentic AI Engineer with 13+ years of experience designing, 
scaling, and operating AI systems across research, fintech, cloud platforms, and the public sector.

I specialize in autonomous and agentic systems — long-horizon execution, multi-agent coordination, 
decision orchestration, memory-aware reasoning, and tool-driven workflows.

My work focuses on converting cutting-edge AI research into production systems that are 
observable, cost-efficient, compliant, and safe to deploy at scale.`,
    focus: [
      'Agentic AI & Multi-Agent Systems',
      'RAG, Memory & Context Engineering',
      'Evaluation & Reliability',
      'Infrastructure & MLOps',
    ],
  },

  skills: {
    agenticAI: {
      title: 'Agentic AI & Autonomy',
      items: [
        'Stateful agent architectures',
        'Multi-agent coordination',
        'Decision graphs & state machines',
        'Tool-first execution',
        'Interrupt / resume & checkpointing',
        'Human-in-the-loop controls',
      ],
    },
    ragMemory: {
      title: 'RAG, Memory & Context',
      items: [
        'Agent-optimized RAG',
        'Hierarchical chunking',
        'Hybrid retrieval strategies',
        'Long-context reasoning',
        'Token-budget optimization',
        'Recursive memory consolidation',
      ],
    },
    evaluation: {
      title: 'Evaluation, Reliability & Observability',
      items: [
        'Non-deterministic system evaluation',
        'Long-horizon failure simulation',
        'Behavioral stability metrics',
        'Regression tracking for agents',
        'Tracing (Prometheus, Grafana, Arize, Evidently)',
      ],
    },
    infrastructure: {
      title: 'Infrastructure, MLOps & Cloud',
      items: [
        'AWS, GCP, Azure',
        'Kubernetes, Docker, Ray, SLURM',
        'Terraform, CloudFormation',
        'CI/CD for ML systems',
        'GPU scheduling & autoscaling',
        'Security, RBAC, GDPR-aligned controls',
      ],
    },
  },

  projects: [
    {
      id: 'cce',
      title: 'CCE — Constitutional Context Engineering',
      category: 'Agentic AI',
      description: 'An agentic AI system designed to autonomously research, plan, implement, and validate large-scale code changes across real-world repositories — with production-grade observability, guardrails, and correctness guarantees.',
      fullDescription: 'CCE explores how far autonomous software engineering can be pushed beyond interactive copilots, focusing on long-horizon execution, reliability, and measurable outcomes.',
      problem: 'Modern AI coding tools excel at autocomplete and interactive workflows, but struggle with large codebases, multi-file architectural changes, long-horizon reasoning, observability, and failure diagnosis.',
      whatIsCCE: 'Constitutional Context Engineering is a system-level approach where an AI agent\'s behavior is governed by structured context and enforceable constraints, not just prompts. Context is engineered, not accumulated. Constraints are explicit, not implicit. Autonomy is bounded, not unchecked. Failures are observable, not silent.',
      approach: 'Multi-phase autonomous loop: Research (repository map, architecture snapshot) → Planning (multi-phase execution plan, file-level targets) → Execution (tool-augmented agent cycles, virtual file system) → Validation (tests, linting, signals) → Observability (LangSmith traces, local run stores). Each phase bounded by constitutional limits: execution cycles, token budgets, file access rules, termination conditions, error-handling policies.',
      capabilities: {
        agenticExecution: [
          'Multi-cycle autonomous execution using LangGraph',
          'Tool-first workflows (file edits, CLI commands, repo analysis)',
          'Deterministic termination logic and guardrails',
          'Clear separation of infrastructure vs execution wiring',
        ],
        contextEngineering: [
          'Repository mapping via static analysis (tree-sitter–style)',
          'Architecture snapshots for shared mental models',
          'Controlled memory (working, episodic, procedural)',
          'Prevention of context overload and hallucinated plans',
        ],
        observability: [
          'LangSmith tracing for real execution behavior',
          'Dual-write tracing (remote + local)',
          'Cost-aware testing strategies',
          'Trace-driven debugging of agent failures',
          'Differentiation between "completed" and "successful" runs',
        ],
        reliability: [
          'Detection of silent failure continuation',
          'Configuration precedence enforcement (env vs config)',
          'Execution limit correctness',
          'Rate-limit handling and fallback strategies',
          'Cache correctness and invalidation',
        ],
      },
      contributions: [
        'Diagnosing and fixing wiring bugs where infrastructure existed but was not used',
        'Designing cost-efficient testing strategies combining static checks, local integration tests, and minimal LangSmith runs',
        'Identifying agent hallucinations (non-existent file paths, invalid plans)',
        'Improving termination logic, error handling, and configuration correctness',
        'Contributing focused, low-risk PRs during high-velocity branch consolidation',
      ],
      differentiators: [
        'Not a demo — real codebase, real merges',
        'Not prompt-only — tool-augmented agent execution',
        'Not opaque — full traceability and diagnostics',
        'Not toy-scale — tens of thousands of lines of code',
        'Not speed-only — correctness and retention matter',
      ],
      metrics: [
        'Multi-million token agent runs with >90% cache hit rates',
        'Identification of critical bugs missed by automated code review',
        'LangSmith traces validating real agent behavior',
        'Cost-optimized testing (<$1 per targeted verification run)',
        'Large-scale branch consolidation (>70k LOC)',
      ],
      tech: ['LangGraph', 'LangSmith', 'Tree-sitter', 'Virtual File System', 'Tool-augmented Agents'],
      whyItMatters: 'CCE represents a shift from interactive AI coding toward governed autonomous software engineering — where context, constraints, and observability are first-class system components.',
      domains: ['Agentic AI systems', 'Systems engineering', 'Developer tooling', 'Observability and evaluation', 'Applied AI reliability'],
    },
    {
      id: 'agent-platform',
      title: 'Agentic AI Platform',
      category: 'Platform Engineering',
      description: 'A production platform for deploying, evaluating, and governing autonomous agents across multiple clouds.',
      problem: 'Agent workloads require stronger isolation, observability, and governance than traditional ML services.',
      approach: 'Unified agent runtime with configurable execution policies. Built-in observability, lineage, and audit hooks. Multi-cloud deployment with cost-aware scheduling.',
      learnings: [
        'Defined agent runtime boundaries and execution contracts',
        'Integrated evaluation and governance into the platform layer',
        'Optimized GPU utilization via isolation and autoscaling',
      ],
      metrics: ['40%+ GPU utilization improvement', 'Multi-cloud deployment', 'Governance-first design'],
      tech: ['Kubernetes', 'Ray', 'AWS/GCP/Azure', 'Terraform'],
      whyItMatters: 'Agent platforms must treat governance and observability as first-class features, not add-ons.',
    },
    {
      id: 'agent-rag',
      title: 'Agent-Optimized RAG Systems',
      category: 'RAG & Memory',
      description: 'Retrieval architectures designed specifically for long-horizon autonomous agents.',
      problem: 'Standard RAG pipelines break down when agents reason across long contexts and multiple execution phases.',
      approach: 'Hierarchical chunking and hybrid retrieval. Retrieval timing strategies aligned to agent planning. Relevance scoring and memory pruning.',
      learnings: [
        'Designed retrieval flows optimized for agent execution loops',
        'Reduced context thrashing and token waste',
        'Improved reasoning stability over long agent lifecycles',
      ],
      metrics: ['Reduced context thrashing', 'Improved reasoning stability', 'Token efficiency'],
      tech: ['Vector Databases', 'Hybrid Retrieval', 'Context Pruning', 'Memory Systems'],
      whyItMatters: 'RAG for agents is fundamentally different from RAG for chat.',
    },
    {
      id: 'agent-eval',
      title: 'Evaluation Frameworks for Stochastic Agents',
      category: 'Evaluation',
      description: 'Testing and reliability systems for non-deterministic, autonomous agents.',
      problem: 'Traditional unit tests fail to capture behavioral regressions in stochastic systems.',
      approach: 'Tiered testing: static, integration, minimal live runs. Trace-based behavioral validation. Explicit success vs completion semantics.',
      learnings: [
        'Designed long-horizon failure simulation',
        'Built regression tracking for agent behavior',
        'Balanced signal quality with cost efficiency',
      ],
      metrics: ['Behavioral stability metrics', 'Failure simulation', 'Regression tracking'],
      tech: ['Trace Analysis', 'Tiered Testing', 'Behavioral Metrics', 'Regression Harnesses'],
      whyItMatters: 'Evaluation must focus on behavior, not just outputs.',
    },
    {
      id: 'real-time-ml',
      title: 'Real-Time Decision Systems',
      category: 'Production ML',
      description: 'High-throughput ML systems for fraud detection, risk scoring, and automated decisioning.',
      problem: 'Financial decision systems require low latency, high throughput, and strict compliance.',
      approach: 'Streaming pipelines using Kafka and Spark. Online inference with feature stores. Integrated monitoring and experiment tracking.',
      learnings: [
        'Built pipelines processing 10M+ events daily',
        'Integrated ML decisions into customer-facing systems',
        'Embedded governance and monitoring into production flows',
      ],
      metrics: ['10M+ events/day', 'Low-latency inference', 'Real-time fraud detection'],
      tech: ['Kafka', 'Spark Streaming', 'Feature Stores', 'Online Inference'],
      whyItMatters: 'Operational reliability matters more than model novelty.',
    },
    {
      id: 'mlops-platforms',
      title: 'Enterprise MLOps Platforms',
      category: 'MLOps',
      description: 'Scalable ML platforms spanning training, deployment, monitoring, and governance.',
      problem: 'Enterprises struggle to operationalize ML reliably across teams and regions.',
      approach: 'Containerized ML pipelines with CI/CD. Feature stores and metadata registries. Cost and compliance observability.',
      learnings: [
        'Reduced deployment timelines from weeks to days',
        'Improved reproducibility and auditability',
        'Delivered multi-million-pound infrastructure savings',
      ],
      metrics: ['£3M+ annual savings', 'Weeks → Days deployment', 'Enterprise-scale'],
      tech: ['SageMaker', 'Kubernetes', 'Terraform', 'CI/CD', 'Feature Stores'],
      whyItMatters: 'MLOps is a socio-technical system, not just tooling.',
    },
  ],

  architecture: {
    summary: `This section documents how I design, reason about, and evolve complex AI and agentic systems. 
It reflects internal engineering thinking — not marketing material.`,
    
    topics: [
      {
        id: 'agent-lifecycle',
        title: 'Agent Lifecycle & Execution Loop',
        overview: 'Agents operate as explicit state machines with well-defined lifecycle phases. Each phase has clear entry/exit conditions, budget constraints, and interrupt semantics. This design enables predictable behavior, safe termination, and checkpoint/resume capabilities for long-running tasks.',
        diagram: {
          type: 'flow',
          nodes: [
            { id: 'init', label: 'Initialize', color: '#64748b' },
            { id: 'research', label: 'Research', color: '#3b82f6' },
            { id: 'plan', label: 'Plan', color: '#8b5cf6' },
            { id: 'execute', label: 'Execute', color: '#f59e0b' },
            { id: 'validate', label: 'Validate', color: '#10b981' },
            { id: 'terminate', label: 'Terminate', color: '#ef4444' },
          ],
          edges: [
            { from: 'init', to: 'research' },
            { from: 'research', to: 'plan' },
            { from: 'plan', to: 'execute' },
            { from: 'execute', to: 'validate' },
            { from: 'validate', to: 'terminate', label: 'success' },
            { from: 'validate', to: 'plan', label: 'retry' },
          ],
        },
        flowExplanation: [
          'Initialize: Load configuration, establish connections, validate inputs, set budget limits.',
          'Research: Gather context from knowledge bases, analyze repository structure, build mental model.',
          'Plan: Decompose task into subtasks, allocate resources, define success criteria per step.',
          'Execute: Run tools, make API calls, modify state. Each action logged with full context.',
          'Validate: Check outputs against criteria, run tests, verify constraints are met.',
          'Terminate: Clean up resources, persist state, emit completion events with final status.',
        ],
        principles: [
          'Every state transition is logged with timestamp and context',
          'Budget limits (time, tokens, iterations) enforced at each phase boundary',
          'Interrupt signals checked between phases, enabling graceful pause/resume',
          'Checkpoints persisted after each phase for recovery',
        ],
        failureModes: [
          'Infinite loops in plan-execute-validate cycle without proper iteration limits',
          'Resource leaks when termination is skipped due to exceptions',
          'State corruption when checkpoints are inconsistent with actual progress',
          'Deadlocks when agents wait for external resources without timeouts',
        ],
        tradeoffs: [
          'More phases = more observability but higher latency overhead',
          'Frequent checkpointing = better recovery but increased storage/IO cost',
          'Strict budget enforcement may terminate promising but slow paths prematurely',
        ],
      },
      {
        id: 'multi-agent',
        title: 'Multi-Agent Coordination Model',
        overview: 'Complex tasks benefit from specialized agents working in coordination. This architecture defines clear roles (Planner, Worker, Validator), communication protocols, and conflict resolution strategies. Shared memory enables collaboration while isolated contexts prevent interference.',
        diagram: {
          type: 'hierarchy',
          nodes: [
            { id: 'orchestrator', label: 'Orchestrator', color: '#8b5cf6', level: 0 },
            { id: 'planner', label: 'Planner Agent', color: '#3b82f6', level: 1 },
            { id: 'worker1', label: 'Worker Agent 1', color: '#10b981', level: 2 },
            { id: 'worker2', label: 'Worker Agent 2', color: '#10b981', level: 2 },
            { id: 'validator', label: 'Validator Agent', color: '#f59e0b', level: 1 },
            { id: 'memory', label: 'Shared Memory', color: '#64748b', level: 1 },
          ],
          edges: [
            { from: 'orchestrator', to: 'planner' },
            { from: 'orchestrator', to: 'validator' },
            { from: 'planner', to: 'worker1' },
            { from: 'planner', to: 'worker2' },
            { from: 'worker1', to: 'memory', style: 'dashed' },
            { from: 'worker2', to: 'memory', style: 'dashed' },
            { from: 'validator', to: 'memory', style: 'dashed' },
          ],
        },
        flowExplanation: [
          'Orchestrator: Receives task, selects agent composition, manages lifecycle and resource allocation.',
          'Planner Agent: Decomposes task, assigns subtasks to workers, defines synchronization points.',
          'Worker Agents: Execute assigned subtasks independently, report progress, request resources.',
          'Validator Agent: Reviews outputs, checks consistency, flags conflicts for resolution.',
          'Shared Memory: Maintains global state, enables cross-agent communication, tracks dependencies.',
        ],
        principles: [
          'Each agent has a single responsibility and clear interface contract',
          'Communication happens through message passing, not shared mutable state',
          'Conflicts resolved by validator with orchestrator as escalation path',
          'Agents can be scaled horizontally based on subtask parallelism',
        ],
        failureModes: [
          'Circular dependencies between agents causing deadlocks',
          'Memory inconsistency when multiple workers update shared state concurrently',
          'Cascading failures when one agent\'s failure propagates to dependents',
          'Resource starvation when orchestrator over-allocates to one agent type',
        ],
        tradeoffs: [
          'More specialization = better quality but higher coordination overhead',
          'Shared memory enables richer collaboration but introduces consistency challenges',
          'Synchronous coordination is simpler but limits parallelism',
        ],
      },
      {
        id: 'tool-first',
        title: 'Tool-First Agent Execution',
        overview: 'Tools are the primary execution mechanism, not prompt completion. The LLM acts as a control plane that decides which tools to invoke, while tools handle actual data operations. This separation enables testing, mocking, rate limiting, and observability at the tool boundary.',
        diagram: {
          type: 'toolFirst',
          nodes: [
            { id: 'llm', label: 'LLM Controller', color: '#8b5cf6' },
            { id: 'router', label: 'Tool Router', color: '#64748b' },
            { id: 'file', label: 'File Tools', color: '#3b82f6' },
            { id: 'search', label: 'Search Tools', color: '#10b981' },
            { id: 'code', label: 'Code Tools', color: '#f59e0b' },
            { id: 'api', label: 'API Tools', color: '#ef4444' },
          ],
          edges: [
            { from: 'llm', to: 'router', label: 'tool_call' },
            { from: 'router', to: 'file' },
            { from: 'router', to: 'search' },
            { from: 'router', to: 'code' },
            { from: 'router', to: 'api' },
          ],
        },
        flowExplanation: [
          'LLM Controller: Analyzes context, decides next action, emits structured tool calls with parameters.',
          'Tool Router: Validates tool call schema, enforces permissions, routes to appropriate handler.',
          'File Tools: Read, write, search files. Sandboxed with path restrictions and size limits.',
          'Search Tools: Query vector stores, web search, code search. Results ranked and filtered.',
          'Code Tools: Execute code in isolated containers. Timeout and resource limits enforced.',
          'API Tools: External service calls with retry logic, circuit breakers, response validation.',
        ],
        principles: [
          'Every tool has a typed schema defining inputs, outputs, and error types',
          'Tools are stateless; all context passed explicitly in parameters',
          'Failed tool calls return structured errors, not exceptions',
          'Tool execution is traced with latency, token cost, and result summary',
        ],
        failureModes: [
          'Schema drift between LLM expectations and actual tool interface',
          'Retry storms when transient failures trigger aggressive retries',
          'Context loss when tool results exceed token limits and get truncated',
          'Security bypass when tool parameters are not properly sanitized',
        ],
        tradeoffs: [
          'Strict schemas prevent flexibility but catch errors early',
          'Tool isolation adds latency but enables independent scaling',
          'Rich error types improve debugging but increase schema complexity',
        ],
      },
      {
        id: 'long-context-rag',
        title: 'Long-Context RAG for Agents',
        overview: 'Agent-optimized RAG differs from conversational RAG. Retrieval must align with planning phases, support hierarchical context, and handle multi-turn reasoning without context thrashing. This architecture uses hybrid retrieval (symbolic + vector) with relevance scoring tuned for agent workflows.',
        diagram: {
          type: 'pipeline',
          nodes: [
            { id: 'ingest', label: 'Ingestion', color: '#64748b' },
            { id: 'chunk', label: 'Hierarchical Chunking', color: '#3b82f6' },
            { id: 'embed', label: 'Embedding', color: '#8b5cf6' },
            { id: 'index', label: 'Hybrid Index', color: '#10b981' },
            { id: 'retrieve', label: 'Retrieval', color: '#f59e0b' },
            { id: 'rerank', label: 'Re-ranking', color: '#ef4444' },
            { id: 'context', label: 'Context Assembly', color: '#06b6d4' },
          ],
          edges: [
            { from: 'ingest', to: 'chunk' },
            { from: 'chunk', to: 'embed' },
            { from: 'embed', to: 'index' },
            { from: 'index', to: 'retrieve' },
            { from: 'retrieve', to: 'rerank' },
            { from: 'rerank', to: 'context' },
          ],
        },
        flowExplanation: [
          'Ingestion: Load documents, extract metadata, detect structure (code, prose, tables).',
          'Hierarchical Chunking: Create multi-level chunks (file → section → paragraph) with overlap.',
          'Embedding: Generate embeddings at multiple granularities, cache for reuse.',
          'Hybrid Index: Combine vector similarity with keyword/BM25 for precision-recall balance.',
          'Retrieval: Query expansion, multi-hop retrieval, relevance thresholds per phase.',
          'Re-ranking: Cross-encoder scoring, diversity sampling, recency weighting.',
          'Context Assembly: Budget-aware packing, source attribution, deduplication.',
        ],
        principles: [
          'Retrieval timing aligned to agent phases: broad during research, narrow during execution',
          'Chunk boundaries respect semantic units (functions, paragraphs, not arbitrary splits)',
          'Relevance scores exposed to agent for confidence-weighted reasoning',
          'Context includes provenance for every retrieved chunk',
        ],
        failureModes: [
          'Context thrashing when retrieval changes dramatically between turns',
          'Lost context when important chunks fall below relevance threshold',
          'Embedding drift when knowledge base updated without re-indexing',
          'Token waste from redundant or low-value chunks filling context window',
        ],
        tradeoffs: [
          'Smaller chunks = more precision but more retrieval calls',
          'Aggressive re-ranking = better relevance but higher latency',
          'Rich metadata = better filtering but larger index size',
        ],
      },
      {
        id: 'memory-context',
        title: 'Agent Memory & Context Management',
        overview: 'Agents need multiple memory types: working memory for current task, episodic memory for past interactions, and procedural memory for learned patterns. Effective context management enforces token budgets, prunes irrelevant information, and consolidates knowledge across sessions.',
        diagram: {
          type: 'layers',
          nodes: [
            { id: 'working', label: 'Working Memory', color: '#ef4444', desc: 'Current task context' },
            { id: 'episodic', label: 'Episodic Memory', color: '#f59e0b', desc: 'Past interactions' },
            { id: 'semantic', label: 'Semantic Memory', color: '#10b981', desc: 'Knowledge base' },
            { id: 'procedural', label: 'Procedural Memory', color: '#3b82f6', desc: 'Learned patterns' },
          ],
        },
        flowExplanation: [
          'Working Memory: Holds current task state, recent tool results, active goals. Cleared on task completion.',
          'Episodic Memory: Stores summaries of past agent runs, decisions made, outcomes achieved.',
          'Semantic Memory: External knowledge base accessed via RAG. Updated independently of agent runs.',
          'Procedural Memory: Cached successful action sequences, learned heuristics, reusable patterns.',
        ],
        principles: [
          'Token budget partitioned across memory types with clear priorities',
          'Working memory pruned using recency + relevance scoring',
          'Episodic summaries generated at task boundaries, not mid-execution',
          'Procedural patterns validated before promotion to memory',
        ],
        failureModes: [
          'Context overflow when working memory exceeds budget without pruning',
          'Stale episodic memories leading to outdated assumptions',
          'Procedural patterns overfitting to specific scenarios',
          'Memory leaks when temporary context not cleaned up',
        ],
        tradeoffs: [
          'Longer working memory = more context but higher cost per call',
          'Frequent consolidation = fresher summaries but more LLM calls',
          'Rich episodic detail = better learning but larger storage',
        ],
      },
      {
        id: 'evaluation-observability',
        title: 'Evaluation & Observability',
        overview: 'Non-deterministic systems require specialized evaluation approaches. Traces capture complete execution history for debugging. Behavioral regression testing detects drift. Cost accounting enables optimization. This architecture treats observability as a first-class requirement, not an afterthought.',
        diagram: {
          type: 'observability',
          nodes: [
            { id: 'agent', label: 'Agent Execution', color: '#8b5cf6' },
            { id: 'trace', label: 'Trace Collector', color: '#64748b' },
            { id: 'store', label: 'Trace Store', color: '#3b82f6' },
            { id: 'analyze', label: 'Analysis Engine', color: '#10b981' },
            { id: 'metrics', label: 'Metrics Dashboard', color: '#f59e0b' },
            { id: 'alerts', label: 'Alert System', color: '#ef4444' },
          ],
          edges: [
            { from: 'agent', to: 'trace' },
            { from: 'trace', to: 'store' },
            { from: 'store', to: 'analyze' },
            { from: 'analyze', to: 'metrics' },
            { from: 'analyze', to: 'alerts' },
          ],
        },
        flowExplanation: [
          'Agent Execution: Emits structured events at each decision point, tool call, and state transition.',
          'Trace Collector: Aggregates events into spans, maintains parent-child relationships.',
          'Trace Store: Persists traces with indexing for query by time, agent, outcome, cost.',
          'Analysis Engine: Computes metrics, detects anomalies, classifies failure patterns.',
          'Metrics Dashboard: Visualizes latency, success rates, token usage, cost trends.',
          'Alert System: Triggers on threshold breaches, regression detection, cost spikes.',
        ],
        principles: [
          'Every agent decision reconstructable from trace alone',
          'Behavioral baselines established from successful runs',
          'Failure taxonomy maintained and updated as new patterns emerge',
          'Cost attributed to specific tasks, tools, and model calls',
        ],
        failureModes: [
          'Trace gaps when events lost during high-throughput periods',
          'False positive alerts from noisy baseline metrics',
          'Debugging blocked when traces lack sufficient context',
          'Cost attribution errors when shared resources not properly allocated',
        ],
        tradeoffs: [
          'Richer traces = better debugging but higher storage/ingestion cost',
          'Real-time analysis = faster alerts but more compute overhead',
          'Strict alerting = fewer missed issues but more noise',
        ],
      },
      {
        id: 'production-governance',
        title: 'Production Deployment & Governance',
        overview: 'Production agent systems require execution isolation, access control, audit logging, and compliance boundaries. This architecture embeds governance into the platform layer rather than relying on agent-level enforcement. Security and auditability are non-negotiable requirements.',
        diagram: {
          type: 'security',
          nodes: [
            { id: 'gateway', label: 'API Gateway', color: '#64748b' },
            { id: 'auth', label: 'Auth / RBAC', color: '#ef4444' },
            { id: 'sandbox', label: 'Execution Sandbox', color: '#f59e0b' },
            { id: 'agent', label: 'Agent Runtime', color: '#8b5cf6' },
            { id: 'audit', label: 'Audit Log', color: '#3b82f6' },
            { id: 'secrets', label: 'Secret Store', color: '#10b981' },
          ],
          edges: [
            { from: 'gateway', to: 'auth' },
            { from: 'auth', to: 'sandbox' },
            { from: 'sandbox', to: 'agent' },
            { from: 'agent', to: 'audit' },
            { from: 'agent', to: 'secrets', style: 'dashed' },
          ],
        },
        flowExplanation: [
          'API Gateway: Rate limiting, request validation, TLS termination, request logging.',
          'Auth / RBAC: Identity verification, permission checks, scope enforcement per tool.',
          'Execution Sandbox: Network isolation, filesystem restrictions, resource quotas.',
          'Agent Runtime: Runs with minimal privileges, no direct infrastructure access.',
          'Audit Log: Immutable record of all actions, decisions, and data access.',
          'Secret Store: Credentials injected at runtime, never in agent memory or logs.',
        ],
        principles: [
          'Agents run with least-privilege; capabilities granted explicitly',
          'All data access logged with user attribution and purpose',
          'Compliance boundaries enforced at infrastructure level',
          'Secret rotation does not require agent redeployment',
        ],
        failureModes: [
          'Privilege escalation through tool chaining',
          'Audit log gaps during high-volume periods',
          'Sandbox escape through misconfigured boundaries',
          'Compliance violations from untracked data flows',
        ],
        tradeoffs: [
          'Stricter isolation = better security but higher operational complexity',
          'Comprehensive audit = better compliance but larger storage footprint',
          'Fine-grained RBAC = precise control but more configuration overhead',
        ],
      },
    ],
  },

  experience: [
    {
      company: 'OpenAI',
      role: 'Principal AI / ML Engineer',
      period: 'Aug 2025 — Present',
      description: 'Leading AI infrastructure and agentic systems development',
      highlights: [
        'Designed distributed AI infrastructure across AWS, GCP, and Azure, improving GPU utilization by ~40%',
        'Led development of modular ML platforms integrating data ingestion, pipeline orchestration, and automated fine-tuning',
        'Built advanced RAG systems using LangChain, Pinecone, and vector databases for knowledge retrieval applications',
        'Pioneered LoRA and QLoRA fine-tuning workflows, reducing iteration cycles by over 33%',
        'Developed real-time observability frameworks using Prometheus, Grafana, Arize AI, and Evidently',
        'Delivered £3M+ annual cost savings through GPU optimization and infrastructure efficiency',
      ],
    },
    {
      company: 'OpenAI',
      role: 'Senior Agentic AI Engineer',
      period: 'Jan 2022 — Aug 2025',
      description: 'Agentic architectures and autonomous systems',
      highlights: [
        'Led design of stateful agentic architectures enabling long-horizon reasoning with multi-agent coordination',
        'Built graph-based agent controllers and decision state machines supporting recursive planning',
        'Architected advanced RAG systems optimized for agent workflows with hierarchical chunking',
        'Designed context and memory frameworks with token-budget optimization and recursive consolidation',
        'Developed evaluation platforms for non-deterministic agents including failure simulation',
      ],
    },
    {
      company: 'AWS',
      role: 'Senior Cloud / MLOps Engineer',
      period: '2018 — 2022',
      description: 'Enterprise MLOps and cloud architecture',
      highlights: [
        'Designed enterprise-grade MLOps frameworks using SageMaker, Terraform, and CI/CD automation',
        'Reduced model deployment timelines from weeks to days through containerized ML pipelines',
        'Built scalable AutoML and feature engineering systems delivering multi-million-pound savings',
        'Delivered production ML architecture guidance to Fortune 500 clients across fintech and healthcare',
      ],
    },
    {
      company: 'Revolut',
      role: 'Data Engineer / ML Systems Developer',
      period: '2015 — 2017',
      description: 'Real-time ML systems for fintech',
      highlights: [
        'Engineered real-time data pipelines processing 10M+ transactions daily using Kafka and Spark',
        'Developed fraud detection and credit risk models improving accuracy and latency',
        'Built feature stores reducing model delivery timelines by ~50%',
        'Integrated ML systems into customer-facing products for risk scoring and KYC automation',
      ],
    },
    {
      company: 'Capgemini UK',
      role: 'Software Engineer',
      period: '2012 — 2015',
      description: 'Enterprise systems and public sector',
      highlights: [
        'Developed enterprise APIs and microservices for large public-sector systems',
        'Automated cloud migrations and CI/CD pipelines to improve deployment reliability',
        'Built large-scale ETL and analytics workflows processing terabytes of data nightly',
      ],
    },
    {
      company: 'Microsoft Research Cambridge',
      role: 'Machine Learning Intern',
      period: '2011 — 2012',
      description: 'Applied research in computer vision',
      highlights: [
        'Conducted applied research in computer vision and deep learning',
        'Built GPU-accelerated training pipelines using CUDA and PyTorch',
        'Developed early CNN prototypes for object detection and image classification',
        'Co-authored internal research reports on visual representation learning',
      ],
    },
  ],

  education: [
    {
      institution: 'University of Northampton',
      degree: 'MSc in Data Science and Artificial Intelligence',
      period: '2010 — 2011',
    },
    {
      institution: 'University of Northampton',
      degree: 'BSc in Computer Science',
      period: '2007 — 2010',
    },
  ],

  closing: "This portfolio reflects my work at the intersection of agentic AI, systems engineering, and large-scale infrastructure — focused on making autonomous systems reliable, observable, and production-ready.",

  contact: {
    email: 'atajanbaratov360@gmail.com',
    phone: '+44 7418356565',
    location: 'London, UK',
    github: 'https://github.com/AI-God-Dev',
    linkedin: 'https://www.linkedin.com/in/atadzhan-baratov-175656145/',
    resume: '/resume.pdf',
    message: "Open to discussing agentic AI systems, autonomous architectures, or production AI challenges. Let's build something reliable.",
  },

  systemDesignGallery: [
    {
      id: "agent-lifecycle-diagram",
      title: "Agent Lifecycle & Execution Loop",
      category: "Agentic Systems",
      image: "/diagrams/agent-lifecycle.png",
      context: "Architecture post / internal design review",
      description:
        "A high-level view of how autonomous agents progress through research, planning, execution, validation, and termination.",
      keyTakeaways: [
        "Explicit state transitions",
        "Clear termination conditions",
        "Budget-aware execution",
      ],
    },
    {
      id: "multi-agent-coordination",
      title: "Multi-Agent Coordination Model",
      category: "Agentic Systems",
      image: "/diagrams/multi-agent-coordination.png",
      context: "Agent systems design discussion",
      description:
        "Illustrates planner/worker/validator roles and synchronization points in a multi-agent system.",
      keyTakeaways: [
        "Role specialization",
        "Controlled memory sharing",
        "Conflict resolution boundaries",
      ],
    },
    {
      id: "agent-rag-architecture",
      title: "Agent-Optimized RAG Architecture",
      category: "RAG & Retrieval",
      image: "/diagrams/agent-rag.png",
      context: "Technical post on agentic RAG",
      description:
        "Shows how retrieval timing and memory pruning align with agent planning phases.",
      keyTakeaways: [
        "Hierarchical chunking",
        "Hybrid retrieval",
        "Reduced context thrashing",
      ],
    },
    {
      id: "ml-platform-overview",
      title: "Enterprise ML Platform Overview",
      category: "ML Platforms",
      image: "/diagrams/ml-platform.png",
      context: "Platform architecture documentation",
      description:
        "End-to-end view of training, deployment, monitoring, and governance layers.",
      keyTakeaways: [
        "Separation of concerns",
        "Built-in observability",
        "Compliance-ready design",
      ],
    },
    {
      id: "evaluation-framework",
      title: "Evaluation & Observability Pipeline",
      category: "Evaluation & Observability",
      image: "/diagrams/evaluation-pipeline.png",
      context: "Internal documentation",
      description:
        "Comprehensive evaluation pipeline for non-deterministic agents with trace-based analysis and behavioral regression tracking.",
      keyTakeaways: [
        "Trace-driven debugging",
        "Behavioral regression detection",
        "Cost attribution",
      ],
    },
    {
      id: "production-governance",
      title: "Production Deployment & Governance",
      category: "Security & Governance",
      image: "/diagrams/production-governance.png",
      context: "Design review",
      description:
        "Security and governance architecture for production agent systems with execution isolation and audit logging.",
      keyTakeaways: [
        "Least-privilege execution",
        "Immutable audit logs",
        "Compliance boundaries",
      ],
    },
    {
      id: "mlops-infrastructure",
      title: "MLOps Infrastructure Stack",
      category: "MLOps & Infra",
      image: "/diagrams/mlops-infra.png",
      context: "Infrastructure documentation",
      description:
        "Scalable MLOps infrastructure spanning training, deployment, monitoring, and governance across multi-cloud environments.",
      keyTakeaways: [
        "Multi-cloud deployment",
        "CI/CD integration",
        "Cost optimization",
      ],
    },
    {
      id: "tool-first-execution",
      title: "Tool-First Execution Architecture",
      category: "Agentic Systems",
      image: "/diagrams/tool-first.png",
      context: "Agent design principles",
      description:
        "LLM acts as control plane while tools handle actual execution, enabling testing, mocking, and observability at tool boundaries.",
      keyTakeaways: [
        "Typed tool schemas",
        "Stateless tool execution",
        "Structured error handling",
      ],
    },
  ],

  galleryCategories: [
    "Agentic Systems",
    "RAG & Retrieval",
    "ML Platforms",
    "MLOps & Infra",
    "Evaluation & Observability",
    "Security & Governance",
  ],
}

export type SiteContent = typeof siteContent
