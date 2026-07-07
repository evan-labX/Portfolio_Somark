import { codingReviewsSection } from './codingReviews'
import { llmProjectsSection } from './llmProjects'
import { mlProjectsSection } from './mlProjects'
import { scientificExamplesSection } from './scientificExamples'

export const siteContent = {
  meta: {
    name: 'Somark Lenka',
    title:
      'Machine Learning Researcher | AI Model Evaluation Specialist | LLM Systems | Scientific AI | Software Engineering',
    tagline:
      'Building and evaluating AI systems with a focus on model quality, reasoning reliability, and technical correctness.',
    welcomeMessage: 'Welcome. Explore my work.',
    avatar: '/imgs/Somark.jpg',
    location: 'Dallas, TX, USA',
  },

  // Desktop icon badges
  badges: {
    aboutMe: null,
    aiEvaluations: '5',
    codingReviews: '7',
    llmProjects: '5',
    mlProjects: '6',
    scientificExamples: '6',
    github: '25+',
    linkedin: '500+',
    resume: null,
    coffee: null,
  },

  terminal: {
    welcome: `
┌───────────────────────────────────────────────────────────────────────────────┐
                                                                        
    Welcome to Somark's Workstation                                        
    Machine Learning Researcher | AI Model Evaluation Specialist                     
                                                                        
    LLM Systems | Scientific AI | Software Engineering                      
                                                                        
    "I build and evaluate AI systems with a focus on model quality, reasoning reliability, and technical correctness. My background combines machine learning engineering, software development, medical research, and scientific analysis."                                      
                                                                                     
                                                                       
    Type 'help' to explore available commands.                           
                                                                        
└───────────────────────────────────────────────────────────────────────────────┘
`,
    help: `
Available Commands:
───────────────────
  about        - Learn about me
  skills       - View my technical skills
  projects     - Browse my projects
  experience   - See my work history
  education    - View my education
  architecture - How I design AI systems
  philosophy   - My engineering principles
  contact      - Get in touch
  resume       - Download my resume
  clear        - Clear the terminal
  help         - Show this help message
`,
    prompt: 'somark@workstation:~$',
    unknownCommand: (cmd: string) =>
      `Command not found: ${cmd}. Type 'help' for available commands.`,
  },

  positioning:
    'Machine Learning Researcher and AI Model Evaluation Specialist building reliable AI systems across LLM workflows, machine learning, software engineering, and scientific reasoning.',

  summary: [
    'Machine Learning Researcher and Software Engineer with hands-on experience building AI-powered applications, LLM systems, machine learning pipelines, and distributed software platforms.',
    'I specialize in AI model evaluation, LLM workflows, retrieval-augmented systems, and machine learning applications that emphasize reasoning quality, reliability, and real-world usability.',
    'My background spans software engineering, machine learning, scientific computing, healthcare research, and AI infrastructure, with a focus on building dependable systems and understanding how AI models behave in production.',
  ],

  philosophy: [
    'Reliable AI starts with reliable evaluation.',
    'Good reasoning matters more than impressive wording.',
    'Simple systems with measurable behavior outperform complex systems without observability.',
    'Machine learning is valuable only when it produces trustworthy outcomes.',
  ],

  about: {
    summary: `Machine Learning Researcher and Software Engineer with experience designing AI-powered applications, LLM systems, machine learning pipelines, and distributed software platforms.

My work focuses on AI model evaluation, LLM workflows, retrieval-augmented generation, and practical machine learning systems that prioritize correctness, reliability, and measurable performance.

I enjoy studying how AI systems reason, where they fail, and how structured evaluation, data quality, and software engineering practices can improve model behavior. My background combines software engineering, machine learning, medical research, and scientific analysis, allowing me to work across both technical implementation and domain-specific evaluation.`,
    focus: [
      'AI Model Evaluation',
      'Machine Learning Systems',
      'LLM Applications & Agent Workflows',
      'Retrieval-Augmented Generation (RAG)',
      'Software Engineering',
      'Scientific & Healthcare AI',
    ],
  },

  skills: {
    aiEvaluation: {
      title: 'AI Evaluation & LLM Systems',
      items: [
        'AI model evaluation',
        'LLM response assessment',
        'Reasoning quality analysis',
        'Hallucination detection',
        'Prompt evaluation',
        'Human feedback workflows',
        'Structured evaluation rubrics',
        'Model comparison & benchmarking',
      ],
    },
    machineLearning: {
      title: 'Machine Learning & Data Science',
      items: [
        'PyTorch',
        'Deep Learning',
        'Neural Networks',
        'XGBoost',
        'scikit-learn',
        'Statistical Analysis',
        'Feature Engineering',
        'Model experimentation',
      ],
    },
    llmSystems: {
      title: 'LLM Applications & Retrieval Systems',
      items: [
        'RAG architectures',
        'Agent workflows',
        'LangChain',
        'LlamaIndex',
        'Vector search',
        'Semantic retrieval',
        'Embedding pipelines',
        'Model orchestration',
      ],
    },
    softwareEngineering: {
      title: 'Software Engineering',
      items: [
        'Python',
        'TypeScript',
        'FastAPI',
        'Node.js',
        'React',
        'REST APIs',
        'SQL',
        'Distributed systems',
      ],
    },
    cloudInfrastructure: {
      title: 'Cloud, GPU & Infrastructure',
      items: [
        'Docker',
        'Kubernetes',
        'AWS',
        'Azure',
        'GCP',
        'CUDA',
        'GPU Computing',
        'CI/CD',
      ],
    },
    scientificComputing: {
      title: 'Scientific & Healthcare Computing',
      items: [
        'Medical research',
        'Scientific data analysis',
        'Healthcare AI',
        'Computational research',
        'Evidence-based reasoning',
        'Research documentation',
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
      title: 'AI Researcher & Machine Learning Consultant',
      company: 'Allotera Labs',
      period: 'Jan 2024 – Present',
      highlights: [
        'Develop AI-powered applications and machine learning systems.',
        'Evaluate AI model behavior, reasoning quality, and response reliability.',
        'Build LLM workflows, RAG systems, and agent-based applications.',
        'Research GPU computing, distributed AI systems, and model optimization.',
      ],
    },
    {
      title: 'Graduate Research Assistant – Machine Learning & Medical Data',
      company: 'Washington University School of Medicine',
      period: 'Jun 2020 – Dec 2023',
      highlights: [
        'Applied machine learning and statistical analysis to scientific and healthcare datasets.',
        'Built research workflows using Python and modern data analysis tools.',
        'Supported medical research through computational analysis and technical documentation.',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Independent Projects',
      period: 'Aug 2019 – Present',
      highlights: [
        'Built production software systems, APIs, automation tools, and AI-enabled applications.',
        'Worked across cloud platforms, backend systems, and data infrastructure.',
        'Integrated machine learning capabilities into software products.',
      ],
    },
  ],

  portfolioSections: {
    aiEvaluations: {
      title: 'AI Evaluations',
      overview: `These examples demonstrate how I evaluate AI-generated outputs across medical/scientific reasoning, coding, machine learning, and LLM system behavior. Each evaluation uses structured criteria: accuracy, reasoning quality, completeness, clarity, safety, and usefulness.

This format is aligned with the kind of work AI training platforms ask experts to do: evaluate outputs, apply rubrics, identify reasoning failures, and provide high-quality feedback.`,
      items: [
        {
          id: 'medical-reasoning',
          title: 'Medical Reasoning Evaluation',
          category: 'Medical / Healthcare',
          description: 'Evaluate an AI response to a healthcare question about Type 2 diabetes first-line treatment.',
          diagramType: 'medical-treatment',
          task: 'Evaluate the following AI response to a healthcare question.',
          prompt: 'What are first-line treatment options for Type 2 diabetes?',
          modelResponse:
            'Type 2 diabetes is usually treated first with metformin. Patients may also need lifestyle changes such as diet and exercise. If blood sugar remains high, doctors may add other medications like insulin or GLP-1 drugs.',
          rubric: [
            { category: 'Medical accuracy', score: '8/10' },
            { category: 'Completeness', score: '7/10' },
            { category: 'Safety awareness', score: '7/10' },
            { category: 'Clarity', score: '9/10' },
            { category: 'Patient-specific nuance', score: '6/10' },
          ],
          overallScore: '7.5/10',
          strengths: [
            'The response correctly identifies metformin and lifestyle changes as common first-line components.',
            'It is easy to understand and avoids overly technical language.',
          ],
          issues: [
            'It is too general. It does not mention that treatment depends on A1C level, cardiovascular risk, kidney disease, weight goals, contraindications, and patient-specific factors.',
            'It also jumps to insulin without enough context.',
          ],
          finalFeedback:
            'This is a reasonable beginner-level answer, but it needs more clinical nuance. A stronger answer would explain that first-line care often includes lifestyle intervention and metformin, while GLP-1 receptor agonists or SGLT2 inhibitors may be prioritized earlier in patients with cardiovascular disease, chronic kidney disease, obesity, or other risk factors. It should also avoid presenting treatment as one fixed pathway.',
          platformValue: [
            'Medical accuracy',
            'Missing caveats',
            'Overgeneralization',
            'Safety-sensitive content',
            'Explanation quality',
          ],
        },
        {
          id: 'coding-evaluation',
          title: 'Coding Evaluation',
          category: 'Software Engineering',
          description: 'Evaluate whether a Python API fetch function is correct, safe, and production-ready.',
          diagramType: 'code-review',
          task: 'Evaluate whether the code is correct, safe, and production-ready.',
          prompt: 'Review this Python function used to fetch JSON data from an API.',
          modelResponse: `import requests

def fetch_data(url):
    response = requests.get(url)
    return response.json()`,
          rubric: [
            { category: 'Correctness', score: '6/10' },
            { category: 'Reliability', score: '3/10' },
            { category: 'Security', score: '5/10' },
            { category: 'Error handling', score: '2/10' },
            { category: 'Production readiness', score: '3/10' },
          ],
          overallScore: '4/10',
          strengths: [
            'The code is simple and may work for successful API responses that return valid JSON.',
          ],
          issues: [
            'The function has no timeout, so it can hang indefinitely.',
            'It does not check HTTP status codes.',
            'It does not handle network errors, invalid JSON, redirects, large payloads, or untrusted URLs.',
            'It also provides no logging or structured error response.',
          ],
          improvedVersion: `import requests
from requests.exceptions import RequestException, JSONDecodeError

def fetch_data(url: str, timeout: int = 10) -> dict:
    try:
        response = requests.get(url, timeout=timeout)
        response.raise_for_status()
        return response.json()
    except JSONDecodeError as exc:
        raise ValueError("Response was not valid JSON") from exc
    except RequestException as exc:
        raise RuntimeError(f"API request failed: {exc}") from exc`,
          finalFeedback:
            'The original function is acceptable for a quick script, but not production-ready. The improved version adds timeout protection, HTTP status validation, and explicit exception handling, which makes the behavior safer and easier to debug.',
          platformValue: [
            'Code correctness',
            'Edge cases',
            'Reliability',
            'Production readiness',
            'Secure engineering habits',
          ],
        },
        {
          id: 'rag-evaluation',
          title: 'LLM / RAG Answer Evaluation',
          category: 'LLM Systems',
          description: 'Evaluate an AI answer about enterprise RAG deployment risks generated from a retrieval-augmented system.',
          diagramType: 'rag-risks',
          task: 'Evaluate an AI answer generated from a retrieval-augmented system.',
          prompt: 'Summarize the key risks in deploying a RAG system for enterprise documents.',
          modelResponse:
            'RAG systems are useful because they retrieve relevant documents and generate accurate answers. The main risks are slow performance and sometimes retrieving the wrong document. These can be solved by using better embeddings and faster databases.',
          rubric: [
            { category: 'Accuracy', score: '6/10' },
            { category: 'Completeness', score: '4/10' },
            { category: 'Technical depth', score: '5/10' },
            { category: 'Practical usefulness', score: '5/10' },
            { category: 'Risk awareness', score: '4/10' },
          ],
          overallScore: '4.8/10',
          strengths: [
            'The answer correctly identifies retrieval quality and latency as important risks.',
          ],
          issues: [
            'The answer is incomplete. It misses major enterprise RAG risks including access control leakage, stale documents, chunking failures, poor metadata, hallucinated synthesis, citation mismatch, data governance, evaluation gaps, and auditability.',
          ],
          betterAnswerDirection: [
            'Retrieval relevance and ranking quality',
            'Permission-aware retrieval',
            'Stale or conflicting source documents',
            'Hallucination despite retrieval',
            'Missing citations or wrong citations',
            'Latency and cost tradeoffs',
            'Evaluation datasets and regression testing',
            'Monitoring, logging, and user feedback loops',
          ],
          finalFeedback:
            'The model gave a shallow answer. It named two valid issues, but missed the real enterprise risks that usually determine whether a RAG system can be trusted in production. The answer needs stronger coverage of security, governance, evaluation, and operational failure modes.',
          platformValue: [
            'AI system failure modes',
            'Enterprise software context',
            'RAG architecture understanding',
            'Risk identification',
            'Structured feedback',
          ],
        },
        {
          id: 'ml-evaluation',
          title: 'Machine Learning Answer Evaluation',
          category: 'Machine Learning',
          description: 'Evaluate an AI answer explaining overfitting in machine learning.',
          diagramType: 'ml-overfitting',
          task: 'Evaluate an AI answer explaining overfitting.',
          prompt: 'What is overfitting in machine learning, and how can it be reduced?',
          modelResponse:
            'Overfitting happens when a model memorizes the training data and performs badly on new data. You can fix it by using more data, reducing model complexity, regularization, dropout, and cross-validation.',
          rubric: [
            { category: 'Accuracy', score: '9/10' },
            { category: 'Completeness', score: '8/10' },
            { category: 'Clarity', score: '9/10' },
            { category: 'Technical depth', score: '7/10' },
            { category: 'Examples', score: '6/10' },
          ],
          overallScore: '8/10',
          strengths: [
            'The answer is mostly correct. It defines overfitting clearly and lists standard mitigation techniques.',
          ],
          issues: [
            'It says "fix it," which is too absolute. Overfitting is usually reduced, not guaranteed to be eliminated.',
            'It also does not explain the training-vs-validation performance gap, nor does it include a concrete example.',
          ],
          finalFeedback:
            'Strong answer overall. To improve, the model should mention that overfitting is detected when training performance is much better than validation/test performance. It should also add a short example, such as a decision tree that memorizes noise in a small dataset.',
          platformValue: [
            'ML concept fluency',
            'Nuance in scoring',
            'Good-but-incomplete answer evaluation',
            'Practical feedback style',
          ],
        },
        {
          id: 'scientific-reasoning',
          title: 'Scientific Reasoning Evaluation',
          category: 'Scientific / Biology',
          description: 'Evaluate an AI explanation of how CRISPR-Cas9 gene editing works.',
          diagramType: 'crispr-mechanism',
          task: 'Evaluate an AI explanation of CRISPR-Cas9.',
          prompt: 'Explain how CRISPR-Cas9 works.',
          modelResponse:
            'CRISPR-Cas9 is a gene-editing technology. It uses a guide RNA to find a target DNA sequence, and Cas9 cuts the DNA. The cell then repairs the cut, which can disable or modify a gene.',
          rubric: [
            { category: 'Scientific accuracy', score: '8/10' },
            { category: 'Completeness', score: '7/10' },
            { category: 'Clarity', score: '9/10' },
            { category: 'Missing caveats', score: '6/10' },
          ],
          overallScore: '7.5/10',
          strengths: [
            'The answer correctly describes the basic role of guide RNA and Cas9.',
            'It is clear and accessible.',
          ],
          issues: [
            'It misses important caveats: PAM sequence requirement, off-target effects, repair mechanisms such as NHEJ and HDR, and the distinction between gene knockout and precise editing.',
          ],
          finalFeedback:
            'Good high-level explanation. A stronger answer should mention that Cas9 requires a nearby PAM sequence, that repair may happen through error-prone non-homologous end joining or template-guided homology-directed repair, and that off-target edits are an important limitation.',
          platformValue: [
            'Scientific evaluation ability',
            'Accuracy vs completeness tradeoffs',
            'Accessible explanation assessment',
            'Domain caveat identification',
          ],
        },
      ],
    },
    codingReviews: codingReviewsSection,
    llmProjects: llmProjectsSection,
    mlProjects: mlProjectsSection,
    scientificExamples: scientificExamplesSection,
  },

  education: [
    {
      institution: 'University of Washington',
      degree: 'B.S. in Computer Science',
      period: '2010 — 2014',
    },
  ],

  closing:
    'This portfolio reflects my focus on building AI systems that are measurable, reliable, and safe to ship in real products.',

  contact: {
    email: 'lenkasomark@gmail.com',
    phone: '+1 314 441 8207',
    location: 'Dallas, TX, USA',
    github: 'https://github.com/somarklenka',
    linkedin: 'https://www.linkedin.com/in/somark-lenka-243161195/',
    resume: 'https://docs.google.com/document/d/1HcDFqVNhGVw83M-yaAInwqpzOAXtVKpjRw1bMfDb2wc/edit?tab=t.0',
    message:
      'Happy to talk about AI product engineering, agent systems, retrieval systems, or production LLM workflows.',
  },

  systemDesignGallery: [],
  galleryCategories: [
    'Agentic Systems',
    'RAG & Retrieval',
    'Ranking & Personalization',
    'Platform Engineering',
    'Evaluation & Observability',
  ],
};

export type SiteContent = typeof siteContent;
