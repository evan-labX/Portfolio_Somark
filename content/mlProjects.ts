export interface MLProjectRubricRow {
  category: string
  score: string
}

export interface MLProjectTableRow {
  label: string
  value: string
}

export interface MLProjectEvaluationArtifact {
  title: string
  evaluationQuestion: string
  modelsCompared?: MLProjectTableRow[]
  evaluationCriteria?: MLProjectTableRow[]
  keyRisks?: MLProjectTableRow[]
  keyChecks?: MLProjectTableRow[]
  reviewChecklist?: MLProjectTableRow[]
  keyModelRisks?: MLProjectTableRow[]
  scientificCriteria?: MLProjectTableRow[]
  rubric?: MLProjectRubricRow[]
  overallScore?: string
  finalAssessment: string
}

export interface MLProjectExample {
  id: string
  title: string
  category: string
  description: string
  diagramType: string
  summary: string
  problemPoints: string[]
  techStack: string[]
  evaluationFocus: string[]
  evaluationArtifact: MLProjectEvaluationArtifact
  platformValue: string[]
}

export const mlProjectsSection = {
  title: 'Machine Learning & Data Science Projects',
  overview: `This section highlights real machine learning and data science projects focused on model development, data quality, feature engineering, statistical testing, evaluation, and reliability.

These projects are relevant to AI evaluation platforms because they show that I can evaluate not only final answers, but also the underlying reasoning, data assumptions, model behavior, edge cases, and failure modes behind technical outputs.`,
  caption:
    'Real machine learning projects demonstrating model development, feature engineering, statistical evaluation, data quality review, and practical ML skepticism.',
  items: [
    {
      id: 'gpu-sha256-pipeline',
      title: 'GPU ML Pipeline over 12.65B SHA-256 Samples',
      category: 'Large-Scale ML / GPU',
      description: 'CUDA-generated 12.65B-sample research pipeline with multi-model training and experiment tracking.',
      diagramType: 'ml-gpu-pipeline',
      summary:
        'Built a large-scale research pipeline generating 12.65B SHA-256 samples using raw CUDA kernels, then trained models using XGBoost, LightGBM, PyTorch, Bayesian neural networks, NVIDIA RAPIDS, PyCUDA, Dask, MLflow, Hydra, Optuna, and Weights & Biases.',
      problemPoints: [
        'Scalable data generation across multi-GPU setup',
        'GPU memory control and orchestration',
        'Experiment tracking and training reproducibility',
        'Comparing multiple model families under resource constraints',
      ],
      techStack: [
        'Python',
        'CUDA',
        'PyCUDA',
        'NVIDIA RAPIDS',
        'Dask',
        'PyTorch',
        'XGBoost',
        'LightGBM',
        'MLflow',
        'Weights & Biases',
        'Hydra',
        'Optuna',
      ],
      evaluationFocus: [
        'Model comparison across boosting and neural baselines',
        'Training stability and overfitting detection',
        'GPU bottlenecks and memory/performance tradeoffs',
        'Feature usefulness and experiment reproducibility',
      ],
      evaluationArtifact: {
        title: 'Multi-Model Family Comparison',
        evaluationQuestion:
          'Which model family handles the generated feature space most reliably under GPU memory constraints?',
        modelsCompared: [
          { label: 'XGBoost', value: 'Strong tabular baseline' },
          { label: 'LightGBM', value: 'Faster gradient boosting comparison' },
          { label: 'PyTorch NN', value: 'Neural baseline' },
          { label: 'Bayesian NN', value: 'Uncertainty-aware modeling' },
        ],
        evaluationCriteria: [
          { label: 'Accuracy', value: 'Whether predictions improved over baseline' },
          { label: 'Generalization', value: 'Whether validation behavior matched training behavior' },
          { label: 'Stability', value: 'Whether training remained consistent across runs' },
          { label: 'Resource use', value: 'GPU memory pressure and runtime cost' },
          { label: 'Reproducibility', value: 'Whether experiments could be tracked and repeated' },
        ],
        overallScore: 'Systems Eval',
        finalAssessment:
          'This project is strongest as an ML systems and evaluation case study. It shows that I can design experiments, compare model families, understand data constraints, and evaluate model behavior beyond a single accuracy number.',
      },
      platformValue: [
        'PyTorch & tree-based models',
        'GPU pipeline evaluation',
        'Experiment design',
        'Model comparison',
        'Reasoning about ML limitations',
      ],
    },
    {
      id: 'weather-finance-platform',
      title: 'Weather × Finance Time-Series Data Platform',
      category: 'Time-Series / Feature Engineering',
      description: 'TimescaleDB platform with 1,000+ indicators, weather APIs, and XGBoost/RandomForest correlation models.',
      diagramType: 'ml-weather-finance',
      summary:
        'Built a TimescaleDB-based platform ingesting OHLCV market data, 1,000+ technical indicators, and multi-source weather APIs. The system exported engineered features into Parquet for XGBoost and RandomForest correlation models.',
      problemPoints: [
        'Building reliable feature pipelines without leaking future information',
        'Aligning weather and market timestamps across sources',
        'Avoiding misleading correlations from indicator overload',
      ],
      techStack: [
        'Python',
        'TimescaleDB',
        'PostgreSQL',
        'XGBoost',
        'RandomForest',
        'Parquet',
        'Docker',
        'Google Cloud Run',
        'Weather APIs',
        'Financial market data',
      ],
      evaluationFocus: [
        'Time-series feature engineering and data leakage detection',
        'Backtesting logic and correlation vs causation',
        'Train/test split design and model reliability over time',
      ],
      evaluationArtifact: {
        title: 'Leakage & Signal Quality Review',
        evaluationQuestion:
          'Can weather-derived features and technical indicators improve model signal quality without introducing leakage?',
        keyRisks: [
          { label: 'Lookahead bias', value: 'Future values accidentally included in training' },
          { label: 'Data alignment errors', value: 'Weather and price timestamps mismatched' },
          { label: 'Overfitting', value: 'Too many indicators relative to signal strength' },
          { label: 'Spurious correlation', value: 'Model finds patterns that do not generalize' },
          { label: 'API inconsistency', value: 'Missing or delayed data affects features' },
        ],
        rubric: [
          { category: 'Data pipeline reliability', score: '8/10' },
          { category: 'Feature engineering depth', score: '8/10' },
          { category: 'Leakage risk control', score: '7/10' },
          { category: 'Model interpretability', score: '6/10' },
          { category: 'Production readiness', score: '7/10' },
        ],
        overallScore: '7.2/10',
        finalAssessment:
          'This is a strong ML portfolio project because it shows practical awareness of time-series modeling problems. The value is not just training XGBoost or RandomForest; it is understanding how fragile time-series ML can be if feature timing, validation design, and data quality are not handled carefully.',
      },
      platformValue: [
        'ML reasoning evaluation',
        'Data science task review',
        'Statistical reasoning',
        'Time-series analysis',
        'Data leakage detection',
      ],
    },
    {
      id: 'rng-audit-toolkit',
      title: 'Provably-Fair RNG Statistical Audit Toolkit',
      category: 'Statistical Testing / Anomaly Detection',
      description: 'Toolkit reverse-engineering HMAC-SHA256 outcomes with ML tests for non-uniformity across 20+ game types.',
      diagramType: 'ml-rng-audit',
      summary:
        'Built a toolkit that reverse-engineers HMAC-SHA256 "provably fair" outcome generation across 20+ game types and applies statistical and ML tests, including RandomForest, Gradient Boosting, and MLP models, to detect possible non-uniformity.',
      problemPoints: [
        'Evaluating whether outcome-generation systems behave as expected statistically',
        'Detecting non-random patterns without overfitting noise',
        'Distinguishing exploitable signal from false positives',
      ],
      techStack: [
        'Python',
        'Node.js',
        'scikit-learn',
        'RandomForest',
        'Gradient Boosting',
        'MLP',
        'Statistical testing',
        'HMAC-SHA256',
        'Backtesting',
      ],
      evaluationFocus: [
        'Randomness assumptions and statistical significance',
        'False positives and model overfitting',
        'Walk-forward validation and predictive signal strength',
      ],
      evaluationArtifact: {
        title: 'Signal vs Noise Evaluation',
        evaluationQuestion:
          'Can ML models detect exploitable non-uniformity, or are they simply overfitting random noise?',
        keyChecks: [
          { label: 'Distribution testing', value: 'Detect obvious non-uniformity' },
          { label: 'Walk-forward validation', value: 'Test whether signal holds over time' },
          { label: 'Model comparison', value: 'Compare RandomForest, GBM, and MLP behavior' },
          { label: 'Backtesting', value: 'Evaluate whether signal survives simulated use' },
          { label: 'False-positive review', value: 'Avoid mistaking randomness for signal' },
        ],
        rubric: [
          { category: 'Statistical rigor', score: '8/10' },
          { category: 'ML evaluation depth', score: '8/10' },
          { category: 'Overfitting awareness', score: '8/10' },
          { category: 'Interpretability', score: '6/10' },
          { category: 'Practical risk control', score: '7/10' },
        ],
        overallScore: '7.4/10',
        finalAssessment:
          'This project is useful because it shows careful ML skepticism. A weak evaluator may see a high-performing model and assume the signal is real. A strong evaluator checks whether the model is exploiting real structure, leaking information, or overfitting noise.',
      },
      platformValue: [
        'Statistics & probability evaluation',
        'Model validity assessment',
        'Randomness reasoning',
        'Security-oriented data science',
        'Misleading conclusion detection',
      ],
    },
    {
      id: 'algo-trading-platform',
      title: 'Algorithmic Trading Platform',
      category: 'Financial ML / Time-Series',
      description: 'Multi-API market data platform with dynamic ML training including custom Bayesian price models.',
      diagramType: 'ml-algo-trading',
      summary:
        'Built an algorithmic trading platform that aggregates multi-API market data into a custom SQL database, performs technical analysis on historical and real-time streams, and dynamically trains ML models, including a custom Bayesian model, to predict price action.',
      problemPoints: [
        'Non-stationary data and regime changes in financial markets',
        'Backtest overfitting and survivorship bias',
        'Transaction costs, slippage, and unrealistic evaluation windows',
      ],
      techStack: [
        'Python',
        'SQL',
        'Market APIs',
        'Technical indicators',
        'Bayesian modeling',
        'Time-series data',
        'Model training',
        'Trading system design',
      ],
      evaluationFocus: [
        'Whether models show real predictive value vs historical noise',
        'Time-aware validation and backtest realism',
        'Risk control through drawdown and uncertainty tracking',
      ],
      evaluationArtifact: {
        title: 'Predictive Value vs Overfitting Review',
        evaluationQuestion: 'Does the model show real predictive value, or is it fitting historical noise?',
        reviewChecklist: [
          { label: 'Data quality', value: 'Are API feeds clean and aligned?' },
          { label: 'Validation', value: 'Is the split time-aware?' },
          { label: 'Backtest realism', value: 'Are fees, slippage, and latency considered?' },
          { label: 'Model stability', value: 'Does performance hold across regimes?' },
          { label: 'Risk control', value: 'Are drawdowns and uncertainty tracked?' },
        ],
        rubric: [
          { category: 'Data pipeline quality', score: '8/10' },
          { category: 'Feature engineering', score: '7/10' },
          { category: 'Model evaluation awareness', score: '8/10' },
          { category: 'Risk controls', score: '6/10' },
          { category: 'Production realism', score: '7/10' },
        ],
        overallScore: '7.2/10',
        finalAssessment:
          'This project is strongest when presented as a model-evaluation and systems project, not as a claim of guaranteed trading performance. The credible angle is that it demonstrates time-series modeling, dynamic training, data engineering, and awareness of evaluation traps.',
      },
      platformValue: [
        'Financial reasoning evaluation',
        'ML evaluation skepticism',
        'Time-series review',
        'AI-generated finance/code assessment',
      ],
    },
    {
      id: 'oil-well-profitability',
      title: 'Oil-Well Output & Profitability Modeling',
      category: 'Applied Data Science / Regression',
      description: 'Garnet Energy Capital pipelines for oil-well output and profitability prediction from industry data.',
      diagramType: 'ml-oil-well-profit',
      summary:
        'During data science work at Garnet Energy Capital, built extraction and processing pipelines for proprietary industry data, scraped public datasets into structured formats, developed financial models, and analyzed large data stores to predict oil-well output and profitability.',
      problemPoints: [
        'Noisy industry data and missing records biasing predictions',
        'Inconsistent well naming merging or splitting entities',
        'Market-price volatility distorting profitability estimates',
      ],
      techStack: [
        'Python',
        'Data extraction',
        'Data cleaning',
        'Financial modeling',
        'Structured datasets',
        'Regression-style modeling',
        'Business analytics',
      ],
      evaluationFocus: [
        'Data extraction accuracy and feature reliability',
        'Financial model assumptions and prediction validity',
        'Interpretability for decision-making',
      ],
      evaluationArtifact: {
        title: 'Feature & Profitability Model Review',
        evaluationQuestion: 'Are the model features strong enough to support useful profitability estimates?',
        keyModelRisks: [
          { label: 'Missing records', value: 'Can bias output predictions' },
          { label: 'Inconsistent well naming', value: 'Can merge or split entities incorrectly' },
          { label: 'Market-price volatility', value: 'Can distort profitability estimates' },
          { label: 'Sparse history', value: 'Makes predictions unstable' },
          { label: 'Over-reliance on linear models', value: 'May miss nonlinear production decline patterns' },
        ],
        rubric: [
          { category: 'Data extraction reliability', score: '7/10' },
          { category: 'Feature quality', score: '7/10' },
          { category: 'Business usefulness', score: '8/10' },
          { category: 'Model complexity fit', score: '7/10' },
          { category: 'Interpretability', score: '8/10' },
        ],
        overallScore: '7.4/10',
        finalAssessment:
          'This is a credible applied-ML project because it combines data extraction, structured modeling, and business interpretation. The strongest framing is not "perfect prediction," but building and evaluating practical data workflows that support better decision-making.',
      },
      platformValue: [
        'Data science evaluation',
        'Business reasoning',
        'Model-output review',
        'Financial analytics',
        'Applied ML judgment',
      ],
    },
    {
      id: 'medical-imaging-qa',
      title: 'Medical Imaging & Scientific Data Analysis',
      category: 'Scientific Computing / Medical',
      description: 'WUSTL Radiation Oncology research software for proton-beam scatter, CT, and radiographic QA workflows.',
      diagramType: 'ml-medical-imaging',
      summary:
        'At WUSTL Radiation Oncology, worked on research software involving C++ microcontroller/robotics control, Python analysis of proton-beam scatter data, raw CT scans, and radiographic images for quality assurance workflows.',
      problemPoints: [
        'Medical physics research requiring imaging and motion system accuracy',
        'Quality assurance workflows with uncertainty and calibration requirements',
        'Evaluating technical outputs where safety and evidence matter',
      ],
      techStack: [
        'Python',
        'C++',
        'Medical imaging',
        'CT scans',
        'Radiographic data',
        'Scientific analysis',
        'Research software',
        'Quality assurance workflows',
      ],
      evaluationFocus: [
        'Medical data interpretation and scientific evidence review',
        'Imaging-related reasoning and QA thinking',
        'Cautious evaluation of technical and clinical outputs',
      ],
      evaluationArtifact: {
        title: 'Medical AI Explanation Evaluation',
        evaluationQuestion:
          'When reviewing an AI-generated explanation of radiation oncology QA, does the answer correctly handle technical and clinical nuance?',
        scientificCriteria: [
          { label: 'Scientific accuracy', value: 'Does it describe imaging/QA correctly?' },
          { label: 'Safety', value: 'Does it avoid overconfident clinical claims?' },
          { label: 'Completeness', value: 'Does it mention equipment, calibration, and uncertainty?' },
          { label: 'Reasoning', value: 'Does the explanation connect cause and effect properly?' },
          { label: 'Clarity', value: 'Can a technical reader understand the workflow?' },
        ],
        overallScore: 'Domain QA',
        finalAssessment:
          'This project strengthens my ability to evaluate AI-generated scientific and medical explanations. It shows exposure to real research environments where accuracy, uncertainty, and quality-control thinking matter.',
      },
      platformValue: [
        'Medical AI evaluation',
        'Scientific reasoning review',
        'Healthcare model-output assessment',
        'Technical QA tasks',
        'Domain-specific AI training',
      ],
    },
  ] satisfies MLProjectExample[],
}
