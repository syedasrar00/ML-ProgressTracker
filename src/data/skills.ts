import type { Module, Skill } from '../types';

export const STORAGE_KEY = 'ml-skill-tracker-progress';

export const modules: Module[] = [
  {
    id: 'foundation',
    name: 'Foundation',
    description: 'Core programming, databases, and version control',
    weekRange: '',
    skillIds: ['python-fundamentals', 'sql-database', 'git-version-control'],
  },
  {
    id: 'data-mastery',
    name: 'Data Mastery',
    description: 'Data manipulation, wrangling, and exploration',
    weekRange: '',
    skillIds: ['pandas-dataframes', 'data-wrangling', 'data-discovery-eda'],
  },
  {
    id: 'ml-core',
    name: 'ML Core',
    description: 'Machine learning fundamentals and evaluation',
    weekRange: '',
    skillIds: [
      'ml-fundamentals',
      'feature-engineering',
      'scikit-learn',
      'model-evaluation',
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering',
    description: 'Testing, APIs, containers, and CI/CD',
    weekRange: '',
    skillIds: [
      'python-testing',
      'fastapi-rest',
      'docker-containerization',
      'cicd-pipelines',
    ],
  },
  {
    id: 'advanced-ml',
    name: 'Advanced ML',
    description: 'Deep learning, transformers, and LLM systems',
    weekRange: '',
    skillIds: ['pytorch-dl', 'transformers-attention', 'llms', 'rag-systems'],
  },
  {
    id: 'production',
    name: 'Production',
    description: 'Deployment, orchestration, and observability',
    weekRange: '',
    skillIds: [
      'kubernetes',
      'mlflow-tracking',
      'monitoring-observability',
      'azure-ml',
    ],
  },
];

export const skills: Skill[] = [
  // Tier 1
  { id: 'python-fundamentals', name: 'Python Fundamentals', tier: 1, importance: 5, hours: 40, category: 'Python' },
  { id: 'sql-database', name: 'SQL & Database Queries', tier: 1, importance: 5, hours: 30, category: 'Data' },
  { id: 'pandas-dataframes', name: 'Pandas & DataFrames', tier: 1, importance: 5, hours: 25, category: 'Data' },
  { id: 'ml-fundamentals', name: 'ML Fundamentals', tier: 1, importance: 5, hours: 25, category: 'ML Core' },
  { id: 'git-version-control', name: 'Git & Version Control', tier: 1, importance: 5, hours: 15, category: 'Python' },
  { id: 'code-style-linting', name: 'Code Style & Linting', tier: 1, importance: 4, hours: 10, category: 'Python' },
  { id: 'data-discovery-eda', name: 'Data Discovery & EDA', tier: 1, importance: 5, hours: 15, category: 'ML Core' },
  { id: 'data-visualization', name: 'Data Visualization', tier: 1, importance: 4, hours: 15, category: 'Data' },
  { id: 'azure-cloud-fundamentals', name: 'Azure Cloud Fundamentals', tier: 1, importance: 5, hours: 20, category: 'Cloud' },
  { id: 'rest-api-design', name: 'REST API Design Principles', tier: 1, importance: 4, hours: 10, category: 'Deployment' },
  { id: 'aws-cloud-basics', name: 'AWS Cloud Basics', tier: 1, importance: 3, hours: 18, category: 'Cloud' },
  { id: 'gcp-cloud-basics', name: 'GCP Cloud Basics', tier: 1, importance: 3, hours: 18, category: 'Cloud' },
  { id: 'technical-communication', name: 'Technical Communication', tier: 1, importance: 5, hours: 15, category: 'Soft Skills' },
  { id: 'cross-functional-collab', name: 'Cross-functional Collaboration', tier: 1, importance: 5, hours: 10, category: 'Soft Skills' },
  { id: 'ownership-accountability', name: 'Ownership & Accountability', tier: 1, importance: 5, hours: 10, category: 'Soft Skills' },
  { id: 'scikit-learn', name: 'Scikit-learn Library', tier: 1, importance: 5, hours: 25, category: 'ML Core' },
  { id: 'model-evaluation', name: 'Model Evaluation & Metrics', tier: 1, importance: 5, hours: 15, category: 'ML Core' },
  { id: 'flask-web', name: 'Flask & Web Frameworks', tier: 1, importance: 3, hours: 15, category: 'Python' },
  { id: 'graphql-basics', name: 'GraphQL Basics', tier: 1, importance: 2, hours: 15, category: 'Deployment' },
  { id: 'oop-principles', name: 'OOP Principles', tier: 1, importance: 5, hours: 30, category: 'Python' },

  // Tier 2 — High priority
  { id: 'fastapi-rest', name: 'FastAPI & REST APIs', tier: 2, importance: 5, hours: 20, category: 'Deployment', prerequisites: ['Python Fundamentals'], priorityGroup: 'high' },
  { id: 'docker-containerization', name: 'Docker & Containerization', tier: 2, importance: 5, hours: 20, category: 'Deployment', prerequisites: ['Python'], priorityGroup: 'high' },
  { id: 'feature-engineering', name: 'Feature Engineering', tier: 2, importance: 5, hours: 20, category: 'ML Core', prerequisites: ['ML Fund.', 'Data Wrangling'], priorityGroup: 'high' },
  { id: 'data-wrangling', name: 'Data Wrangling', tier: 2, importance: 5, hours: 20, category: 'Data', prerequisites: ['SQL', 'Pandas'], priorityGroup: 'high' },
  { id: 'cicd-pipelines', name: 'CI/CD Pipelines', tier: 2, importance: 5, hours: 18, category: 'Deployment', prerequisites: ['Git', 'Docker'], priorityGroup: 'high' },
  { id: 'mlflow-tracking', name: 'MLflow & Experiment Tracking', tier: 2, importance: 5, hours: 15, category: 'ML Core', prerequisites: ['ML Fundamentals'], priorityGroup: 'high' },
  { id: 'monitoring-observability', name: 'Monitoring & Observability', tier: 2, importance: 5, hours: 20, category: 'Deployment', prerequisites: ['Deployment'], priorityGroup: 'high' },
  { id: 'pytorch-dl', name: 'PyTorch Deep Learning', tier: 2, importance: 5, hours: 30, category: 'ML Core', prerequisites: ['ML Fundamentals'], priorityGroup: 'high' },
  { id: 'azure-ml', name: 'Azure Machine Learning', tier: 2, importance: 5, hours: 20, category: 'Cloud', prerequisites: ['Azure Basics'], priorityGroup: 'high' },
  { id: 'python-testing', name: 'Python Testing & Debugging', tier: 2, importance: 5, hours: 25, category: 'Python', prerequisites: ['Python'], priorityGroup: 'high' },
  { id: 'hyperparameter-tuning', name: 'Hyperparameter Tuning', tier: 2, importance: 4, hours: 20, category: 'ML Core', prerequisites: ['Model Eval', 'Sklearn'], priorityGroup: 'high' },
  { id: 'gradient-boosting', name: 'Gradient Boosting (XGBoost/LightGBM)', tier: 2, importance: 4, hours: 20, category: 'ML Core', prerequisites: ['Scikit-learn'], priorityGroup: 'high' },
  { id: 'hugging-face', name: 'Hugging Face & Transformers', tier: 2, importance: 5, hours: 15, category: 'ML Core', prerequisites: ['Transformers'], priorityGroup: 'high' },
  { id: 'embedding-models', name: 'Embedding Models & Vectors', tier: 2, importance: 4, hours: 18, category: 'ML Core', prerequisites: ['NLP Basics'], priorityGroup: 'high' },
  { id: 'nlp-fundamentals', name: 'NLP Fundamentals', tier: 2, importance: 5, hours: 20, category: 'ML Core', prerequisites: ['PyTorch'], priorityGroup: 'high' },
  { id: 'prompt-engineering', name: 'Prompt Engineering', tier: 2, importance: 5, hours: 15, category: 'ML Core', prerequisites: ['LLMs'], priorityGroup: 'high' },
  { id: 'tensorflow-keras', name: 'TensorFlow & Keras', tier: 2, importance: 4, hours: 25, category: 'ML Core', prerequisites: ['ML Fundamentals'], priorityGroup: 'high' },
  { id: 'python-packaging', name: 'Python Packaging', tier: 2, importance: 4, hours: 15, category: 'Python', prerequisites: ['Python'], priorityGroup: 'high' },
  { id: 'azure-functions', name: 'Azure Functions & App Service', tier: 2, importance: 4, hours: 15, category: 'Cloud', prerequisites: ['Azure Basics'], priorityGroup: 'high' },
  { id: 'spark-databricks', name: 'Spark & Databricks', tier: 2, importance: 4, hours: 35, category: 'Data', prerequisites: ['SQL', 'Pandas'], priorityGroup: 'high' },
  { id: 'llm-evaluation', name: 'LLM Evaluation & Benchmarking', tier: 2, importance: 4, hours: 15, category: 'ML Core', prerequisites: ['LLMs', 'Model Eval'], priorityGroup: 'high' },
  { id: 'database-design', name: 'Database Design & Optimization', tier: 2, importance: 4, hours: 20, category: 'Data', prerequisites: ['SQL'], priorityGroup: 'high' },
  { id: 'statistics-probability', name: 'Statistics & Probability', tier: 2, importance: 4, hours: 25, category: 'ML Core', priorityGroup: 'high' },
  { id: 'data-validation', name: 'Data Validation & Quality', tier: 2, importance: 4, hours: 15, category: 'Data', prerequisites: ['Data Wrangling'], priorityGroup: 'high' },
  { id: 'model-serving', name: 'Model Serving & Inference', tier: 2, importance: 5, hours: 18, category: 'Deployment', prerequisites: ['FastAPI', 'Docker'], priorityGroup: 'high' },
  { id: 'async-concurrency', name: 'Async/Await & Concurrency', tier: 2, importance: 4, hours: 25, category: 'Python', prerequisites: ['Python'], priorityGroup: 'high' },
  { id: 'ab-testing', name: 'A/B Testing & Experimentation', tier: 2, importance: 4, hours: 15, category: 'ML Core', prerequisites: ['Statistics'], priorityGroup: 'high' },
  { id: 'langchain', name: 'LangChain Framework', tier: 2, importance: 4, hours: 15, category: 'ML Core', prerequisites: ['LLMs'], priorityGroup: 'high' },
  { id: 'time-series', name: 'Time Series Forecasting', tier: 2, importance: 3, hours: 20, category: 'ML Core', prerequisites: ['RNN/LSTM'], priorityGroup: 'high' },
  { id: 'anomaly-detection', name: 'Anomaly Detection', tier: 2, importance: 3, hours: 15, category: 'ML Core', prerequisites: ['Scikit-learn'], priorityGroup: 'high' },

  // Tier 2 — Medium priority
  { id: 'cnn', name: 'CNN (Convolutional Neural Networks)', tier: 2, importance: 3, hours: 20, category: 'ML Core', priorityGroup: 'medium' },
  { id: 'streaming-data', name: 'Streaming Data & Real-Time', tier: 2, importance: 3, hours: 20, category: 'Data', priorityGroup: 'medium' },
  { id: 'linear-algebra', name: 'Linear Algebra Essentials', tier: 2, importance: 4, hours: 20, category: 'ML Core', priorityGroup: 'medium' },
  { id: 'fault-tolerance', name: 'Fault Tolerance & Resilience', tier: 2, importance: 4, hours: 15, category: 'Deployment', priorityGroup: 'medium' },
  { id: 'mlops-platforms', name: 'MLOps Platforms & Tools', tier: 2, importance: 4, hours: 18, category: 'Deployment', priorityGroup: 'medium' },
  { id: 'incident-management', name: 'Incident Management & Debugging', tier: 2, importance: 4, hours: 15, category: 'Soft Skills', priorityGroup: 'medium' },
  { id: 'problem-solving', name: 'Problem Solving & Thinking', tier: 2, importance: 5, hours: 15, category: 'Soft Skills', priorityGroup: 'medium' },

  // Tier 3
  { id: 'transformers-attention', name: 'Transformers & Attention', tier: 3, importance: 5, hours: 25, category: 'ML Core', prerequisites: ['NLP Basics'] },
  { id: 'llms', name: 'LLMs (Large Language Models)', tier: 3, importance: 5, hours: 25, category: 'ML Core', prerequisites: ['Transformers'] },
  { id: 'rag-systems', name: 'RAG Systems', tier: 3, importance: 5, hours: 20, category: 'ML Core', prerequisites: ['LLMs', 'Embeddings'] },
  { id: 'kubernetes', name: 'Kubernetes Orchestration', tier: 3, importance: 4, hours: 30, category: 'Deployment', prerequisites: ['Docker'] },
  { id: 'langgraph', name: 'LangGraph Agent Orchestration', tier: 3, importance: 4, hours: 18, category: 'ML Core', prerequisites: ['LLMs'] },
  { id: 'system-design', name: 'System Design & Architecture', tier: 3, importance: 4, hours: 25, category: 'Deployment', prerequisites: ['Python'] },
  { id: 'production-ml', name: 'Production ML Best Practices', tier: 3, importance: 5, hours: 20, category: 'ML Core', prerequisites: ['Testing', 'CI/CD'] },
  { id: 'security-privacy-ml', name: 'Security & Privacy in ML', tier: 3, importance: 4, hours: 20, category: 'ML Core', prerequisites: ['ML Fundamentals'] },
  { id: 'hyperparameter-optimization', name: 'Hyperparameter Optimization', tier: 3, importance: 4, hours: 20, category: 'ML Core', prerequisites: ['Model Eval', 'ML'] },
  { id: 'rnn-lstm', name: 'RNN, LSTM & Sequences', tier: 3, importance: 3, hours: 25, category: 'ML Core', prerequisites: ['PyTorch'] },
  { id: 'causal-inference', name: 'Causal Inference', tier: 3, importance: 3, hours: 20, category: 'ML Core', prerequisites: ['Statistics'] },
  { id: 'recommendation-systems', name: 'Recommendation Systems', tier: 3, importance: 3, hours: 20, category: 'ML Core', prerequisites: ['Scikit-learn'] },
  { id: 'edge-computing', name: 'Edge Computing & Mobile ML', tier: 3, importance: 2, hours: 15, category: 'Deployment', prerequisites: ['Model Serving'] },
  { id: 'reinforcement-learning', name: 'Reinforcement Learning', tier: 3, importance: 2, hours: 25, category: 'ML Core', prerequisites: ['PyTorch'] },
  { id: 'graph-neural-networks', name: 'Graph Neural Networks', tier: 3, importance: 2, hours: 20, category: 'ML Core', prerequisites: ['PyTorch'] },
  { id: 'calculus-optimization', name: 'Calculus & Optimization', tier: 3, importance: 4, hours: 20, category: 'ML Core', prerequisites: ['Linear Algebra'] },
];

export const tierLabels: Record<number, string> = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'Expert',
};

export const tierDescriptions: Record<number, string> = {
  1: '1–2 weeks with consistent effort',
  2: '2–4 weeks with prerequisites',
  3: '4–8 weeks; requires fundamentals',
  4: '8+ weeks; deep specialization',
};

export const importanceLabels: Record<number, string> = {
  5: 'Critical',
  4: 'High',
  3: 'Medium',
  2: 'Low',
  1: 'Nice-to-have',
};

export const categories = [...new Set(skills.map((s) => s.category))].sort();

export function getSkillById(id: string): Skill | undefined {
  return skills.find((s) => s.id === id);
}

export function getModuleProgress(
  module: Module,
  readSkills: Record<string, boolean>,
): { read: number; total: number } {
  const total = module.skillIds.length;
  const read = module.skillIds.filter((id) => readSkills[id]).length;
  return { read, total };
}
