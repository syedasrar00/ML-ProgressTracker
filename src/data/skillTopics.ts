// Auto-generated — run: node scripts/generateSkillTopics.mjs
import { buildSkillTopics } from './topicHelpers';
import type { SkillTopics } from '../types';

const curriculum = {
  "python-fundamentals": [
    [
      "Language Basics",
      [
        [
          "Syntax & Semantics",
          [
            "Variables, assignment, and naming",
            "Built-in types: int, float, str, bool",
            "Type hints and mypy basics",
            "Comments, docstrings, and PEP 8"
          ]
        ],
        [
          "Control Flow",
          [
            "if/elif/else branching",
            "for and while loops",
            "break, continue, pass",
            "Comprehensions (list, dict, set)"
          ]
        ],
        [
          "Functions",
          [
            "Defining and calling functions",
            "*args, **kwargs",
            "Lambda and higher-order functions",
            "Scope: local, global, nonlocal"
          ]
        ]
      ]
    ],
    [
      "Data Structures",
      [
        [
          "Collections",
          [
            "Lists: indexing, slicing, methods",
            "Tuples and immutability",
            "Dictionaries and defaultdict",
            "Sets and frozensets"
          ]
        ],
        [
          "File I/O",
          [
            "Reading/writing text and CSV",
            "Context managers (with)",
            "Pathlib for file paths",
            "JSON serialization"
          ]
        ]
      ]
    ],
    [
      "Standard Library",
      [
        [
          "Essential Modules",
          [
            "os, sys, and environment",
            "datetime and timezone handling",
            "collections and itertools",
            "re for regular expressions"
          ]
        ],
        [
          "Error Handling",
          [
            "try/except/else/finally",
            "Custom exceptions",
            "Logging with logging module",
            "Debugging with pdb"
          ]
        ]
      ]
    ]
  ],
  "sql-database": [
    [
      "Query Fundamentals",
      [
        [
          "SELECT & Filtering",
          [
            "SELECT, FROM, WHERE clauses",
            "ORDER BY, LIMIT, OFFSET",
            "DISTINCT and NULL handling",
            "Comparison and logical operators"
          ]
        ],
        [
          "Joins",
          [
            "INNER, LEFT, RIGHT, FULL joins",
            "Self joins and cross joins",
            "Join performance considerations",
            "Subqueries vs joins"
          ]
        ]
      ]
    ],
    [
      "Aggregation & Analysis",
      [
        [
          "GROUP BY",
          [
            "Aggregate functions: COUNT, SUM, AVG",
            "HAVING clause",
            "Window functions: ROW_NUMBER, RANK",
            "PARTITION BY patterns"
          ]
        ],
        [
          "Advanced SQL",
          [
            "CTEs (WITH clauses)",
            "UNION, INTERSECT, EXCEPT",
            "CASE expressions",
            "Date/time functions"
          ]
        ]
      ]
    ],
    [
      "Database Design",
      [
        [
          "Schema & Integrity",
          [
            "Primary and foreign keys",
            "Normalization (1NF–3NF)",
            "Indexes and query plans",
            "Transactions and ACID"
          ]
        ]
      ]
    ]
  ],
  "pandas-dataframes": [
    [
      "DataFrame Basics",
      [
        [
          "Creation & Inspection",
          [
            "Series vs DataFrame",
            "read_csv, read_parquet, read_sql",
            "head, info, describe, dtypes",
            "Index and column selection"
          ]
        ],
        [
          "Selection & Filtering",
          [
            "loc vs iloc",
            "Boolean indexing",
            "query() method",
            "isin, between, isna filters"
          ]
        ]
      ]
    ],
    [
      "Transformation",
      [
        [
          "Cleaning",
          [
            "dropna, fillna, replace",
            "Duplicate detection",
            "Type conversion (astype)",
            "String and datetime accessors"
          ]
        ],
        [
          "Reshaping",
          [
            "groupby and agg",
            "pivot_table and melt",
            "merge and concat",
            "apply, map, applymap"
          ]
        ]
      ]
    ],
    [
      "Performance",
      [
        [
          "Optimization",
          [
            "Vectorization over loops",
            "Category dtype for memory",
            "Chunked reading for large files",
            "Profiling slow operations"
          ]
        ]
      ]
    ]
  ],
  "ml-fundamentals": [
    [
      "Theory",
      [
        [
          "Learning Paradigms",
          [
            "Supervised vs unsupervised vs RL",
            "Classification vs regression",
            "Bias-variance tradeoff",
            "Overfitting and underfitting"
          ]
        ],
        [
          "Workflow",
          [
            "Train/validation/test splits",
            "Cross-validation strategies",
            "Feature vs label leakage",
            "Baseline models first"
          ]
        ]
      ]
    ],
    [
      "Algorithms Overview",
      [
        [
          "Classical ML",
          [
            "Linear and logistic regression",
            "Decision trees and random forests",
            "K-means clustering",
            "Dimensionality reduction (PCA)"
          ]
        ]
      ]
    ],
    [
      "Practice",
      [
        [
          "End-to-end pipeline",
          [
            "Problem framing and metrics",
            "Sklearn Pipeline object",
            "Model persistence (joblib)",
            "Document assumptions"
          ]
        ]
      ]
    ]
  ],
  "git-version-control": [
    [
      "Core Commands",
      [
        [
          "Basics",
          [
            "init, clone, status, diff",
            "add, commit, log",
            "branch, checkout, switch",
            "merge and conflict resolution"
          ]
        ],
        [
          "Remote Workflow",
          [
            "remote, fetch, pull, push",
            "Fork and PR workflow",
            "Rebase vs merge",
            "Cherry-pick and stash"
          ]
        ]
      ]
    ],
    [
      "Collaboration",
      [
        [
          "Best Practices",
          [
            "Conventional commits",
            ".gitignore patterns",
            "Code review etiquette",
            "Git hooks overview"
          ]
        ]
      ]
    ]
  ],
  "code-style-linting": [
    [
      "Standards",
      [
        [
          "PEP 8 & Formatting",
          [
            "black configuration",
            "isort import ordering",
            "Line length and naming",
            "Type annotation style"
          ]
        ],
        [
          "Linting",
          [
            "ruff / flake8 rules",
            "pylint and common warnings",
            "Pre-commit hooks setup",
            "CI lint integration"
          ]
        ]
      ]
    ]
  ],
  "data-discovery-eda": [
    [
      "Exploration",
      [
        [
          "Univariate Analysis",
          [
            "Distribution plots (hist, KDE)",
            "Summary statistics",
            "Outlier detection (IQR, Z-score)",
            "Missing value patterns"
          ]
        ],
        [
          "Multivariate Analysis",
          [
            "Correlation heatmaps",
            "Pair plots and scatter matrices",
            "Segment analysis",
            "Target variable exploration"
          ]
        ]
      ]
    ],
    [
      "Insights",
      [
        [
          "Reporting",
          [
            "Hypothesis generation",
            "EDA notebook structure",
            "Stakeholder-ready visuals",
            "Data quality findings doc"
          ]
        ]
      ]
    ]
  ],
  "data-visualization": [
    [
      "Libraries",
      [
        [
          "Matplotlib & Seaborn",
          [
            "Figure and axes API",
            "Statistical plots",
            "Customization and themes",
            "Saving publication-quality figures"
          ]
        ],
        [
          "Interactive",
          [
            "Plotly basics",
            "Dashboard considerations",
            "Color accessibility",
            "Storytelling with charts"
          ]
        ]
      ]
    ]
  ],
  "azure-cloud-fundamentals": [
    [
      "Platform",
      [
        [
          "Core Services",
          [
            "Resource groups and subscriptions",
            "Azure Portal and CLI",
            "Storage accounts and blobs",
            "Virtual networks basics"
          ]
        ],
        [
          "Identity & Security",
          [
            "Azure AD / Entra ID",
            "RBAC roles",
            "Key Vault overview",
            "Managed identities"
          ]
        ]
      ]
    ]
  ],
  "rest-api-design": [
    [
      "Design Principles",
      [
        [
          "REST Conventions",
          [
            "Resource naming and URIs",
            "HTTP methods and status codes",
            "Pagination and filtering",
            "Versioning strategies"
          ]
        ],
        [
          "API Quality",
          [
            "Idempotency",
            "HATEOAS (optional)",
            "OpenAPI/Swagger specs",
            "Error response format"
          ]
        ]
      ]
    ]
  ],
  "aws-cloud-basics": [
    [
      "AWS Core",
      [
        [
          "Services",
          [
            "EC2 and S3 fundamentals",
            "IAM users, roles, policies",
            "Lambda overview",
            "RDS and DynamoDB intro"
          ]
        ]
      ]
    ]
  ],
  "gcp-cloud-basics": [
    [
      "GCP Core",
      [
        [
          "Services",
          [
            "Compute Engine and Cloud Storage",
            "IAM and service accounts",
            "BigQuery intro",
            "Cloud Functions overview"
          ]
        ]
      ]
    ]
  ],
  "technical-communication": [
    [
      "Written Communication",
      [
        [
          "Documentation",
          [
            "README and ADR writing",
            "Technical blog posts",
            "API documentation",
            "Runbooks and playbooks"
          ]
        ]
      ]
    ],
    [
      "Verbal",
      [
        [
          "Presentations",
          [
            "Architecture walkthroughs",
            "Demo preparation",
            "Executive summaries",
            "Q&A handling"
          ]
        ]
      ]
    ]
  ],
  "cross-functional-collab": [
    [
      "Collaboration",
      [
        [
          "Working with Teams",
          [
            "Product and engineering alignment",
            "Stakeholder management",
            "Agile ceremonies",
            "Async communication tools"
          ]
        ]
      ]
    ]
  ],
  "ownership-accountability": [
    [
      "Mindset",
      [
        [
          "Ownership",
          [
            "End-to-end responsibility",
            "Proactive communication",
            "Incident ownership",
            "Continuous improvement"
          ]
        ]
      ]
    ]
  ],
  "scikit-learn": [
    [
      "API Mastery",
      [
        [
          "Estimators",
          [
            "fit, predict, transform",
            "Pipeline and ColumnTransformer",
            "preprocessing: StandardScaler, OneHotEncoder",
            "Model selection: GridSearchCV"
          ]
        ],
        [
          "Models",
          [
            "Linear models and SVM",
            "Tree-based ensembles",
            "Clustering: KMeans, DBSCAN",
            "Model persistence"
          ]
        ]
      ]
    ],
    [
      "Practice",
      [
        [
          "Projects",
          [
            "Classification benchmark",
            "Regression pipeline",
            "Custom transformer",
            "Cross-validation report"
          ]
        ]
      ]
    ]
  ],
  "model-evaluation": [
    [
      "Metrics",
      [
        [
          "Classification",
          [
            "Accuracy, precision, recall, F1",
            "ROC-AUC and PR-AUC",
            "Confusion matrix interpretation",
            "Class imbalance handling"
          ]
        ],
        [
          "Regression",
          [
            "MSE, RMSE, MAE, R²",
            "Residual analysis",
            "Calibration plots",
            "Business-aligned metrics"
          ]
        ]
      ]
    ],
    [
      "Validation",
      [
        [
          "Strategies",
          [
            "K-fold and stratified K-fold",
            "Time-series split",
            "Nested cross-validation",
            "Statistical significance tests"
          ]
        ]
      ]
    ]
  ],
  "flask-web": [
    [
      "Flask Basics",
      [
        [
          "Routing & Views",
          [
            "App factory pattern",
            "Blueprints",
            "Request/response cycle",
            "Jinja2 templates"
          ]
        ],
        [
          "Production",
          [
            "WSGI servers (gunicorn)",
            "Configuration management",
            "Error handlers",
            "RESTful endpoints"
          ]
        ]
      ]
    ]
  ],
  "graphql-basics": [
    [
      "GraphQL",
      [
        [
          "Core Concepts",
          [
            "Schema, queries, mutations",
            "Resolvers",
            "GraphQL vs REST tradeoffs",
            "Apollo/Strawberry intro"
          ]
        ]
      ]
    ]
  ],
  "oop-principles": [
    [
      "OOP in Python",
      [
        [
          "Classes",
          [
            "__init__, attributes, methods",
            "Inheritance and super()",
            "Abstract base classes",
            "Dataclasses and slots"
          ]
        ],
        [
          "Design",
          [
            "SOLID principles",
            "Composition vs inheritance",
            "Design patterns (factory, strategy)",
            "Duck typing and protocols"
          ]
        ]
      ]
    ]
  ],
  "fastapi-rest": [
    [
      "FastAPI Core",
      [
        [
          "Endpoints",
          [
            "Path and query parameters",
            "Request body with Pydantic",
            "Dependency injection",
            "Background tasks"
          ]
        ],
        [
          "Advanced",
          [
            "Middleware and CORS",
            "Authentication (OAuth2, JWT)",
            "WebSockets intro",
            "OpenAPI auto-docs"
          ]
        ]
      ]
    ],
    [
      "Production",
      [
        [
          "Deployment",
          [
            "Uvicorn/Gunicorn config",
            "Async database sessions",
            "Rate limiting",
            "Health check endpoints"
          ]
        ]
      ]
    ]
  ],
  "docker-containerization": [
    [
      "Docker Fundamentals",
      [
        [
          "Images & Containers",
          [
            "Dockerfile best practices",
            "Multi-stage builds",
            "docker-compose services",
            "Volume and network management"
          ]
        ],
        [
          "Registry",
          [
            "Image tagging",
            "Private registries",
            "Security scanning",
            ".dockerignore optimization"
          ]
        ]
      ]
    ]
  ],
  "feature-engineering": [
    [
      "Techniques",
      [
        [
          "Feature Creation",
          [
            "Domain-specific features",
            "Polynomial and interaction terms",
            "Datetime feature extraction",
            "Text feature basics"
          ]
        ],
        [
          "Selection",
          [
            "Correlation filtering",
            "Recursive feature elimination",
            "Feature importance from trees",
            "Handling high cardinality"
          ]
        ]
      ]
    ]
  ],
  "data-wrangling": [
    [
      "Cleaning Pipelines",
      [
        [
          "Messy Data",
          [
            "Schema inference",
            "Encoding issues (UTF-8)",
            "Inconsistent formats",
            "Duplicate entity resolution"
          ]
        ],
        [
          "Transformation",
          [
            "Pivot/unpivot patterns",
            "Window functions in pandas",
            "Fuzzy matching",
            "Data pipeline automation"
          ]
        ]
      ]
    ]
  ],
  "cicd-pipelines": [
    [
      "CI/CD",
      [
        [
          "Pipelines",
          [
            "GitHub Actions / Azure DevOps",
            "Build, test, deploy stages",
            "Environment promotion",
            "Secrets management"
          ]
        ],
        [
          "ML CI/CD",
          [
            "Data validation gates",
            "Model registry integration",
            "Automated retraining triggers",
            "Rollback strategies"
          ]
        ]
      ]
    ]
  ],
  "mlflow-tracking": [
    [
      "MLflow",
      [
        [
          "Tracking",
          [
            "Experiments, runs, parameters",
            "Logging metrics and artifacts",
            "Model registry",
            "MLflow projects"
          ]
        ]
      ]
    ]
  ],
  "monitoring-observability": [
    [
      "Observability",
      [
        [
          "Three Pillars",
          [
            "Metrics (Prometheus/Grafana)",
            "Logs (structured logging)",
            "Traces (OpenTelemetry)",
            "Alerting rules"
          ]
        ],
        [
          "ML Monitoring",
          [
            "Data drift detection",
            "Model performance decay",
            "Prediction latency SLAs",
            "Dashboard design"
          ]
        ]
      ]
    ]
  ],
  "pytorch-dl": [
    [
      "PyTorch Core",
      [
        [
          "Tensors & Autograd",
          [
            "Tensor operations and broadcasting",
            "Automatic differentiation",
            "GPU/CUDA usage",
            "nn.Module architecture"
          ]
        ],
        [
          "Training Loop",
          [
            "DataLoader and Dataset",
            "Loss functions and optimizers",
            "Learning rate scheduling",
            "Checkpointing"
          ]
        ]
      ]
    ],
    [
      "Advanced",
      [
        [
          "Techniques",
          [
            "Transfer learning",
            "Mixed precision training",
            "Distributed training intro",
            "TorchScript export"
          ]
        ]
      ]
    ]
  ],
  "azure-ml": [
    [
      "Azure ML Studio",
      [
        [
          "Workspace",
          [
            "Datasets and datastores",
            "Compute targets",
            "Automated ML",
            "Managed endpoints deployment"
          ]
        ]
      ]
    ]
  ],
  "python-testing": [
    [
      "Testing",
      [
        [
          "pytest",
          [
            "Fixtures and parametrize",
            "Mocking with unittest.mock",
            "Coverage reports",
            "Integration vs unit tests"
          ]
        ],
        [
          "Debugging",
          [
            "Breakpoints and pdb",
            "Logging for debug",
            "Profiling (cProfile)",
            "Test-driven development"
          ]
        ]
      ]
    ]
  ],
  "hyperparameter-tuning": [
    [
      "Tuning Methods",
      [
        [
          "Search Strategies",
          [
            "Grid and random search",
            "Bayesian optimization (Optuna)",
            "Early stopping",
            "Cross-validated tuning"
          ]
        ]
      ]
    ]
  ],
  "gradient-boosting": [
    [
      "Boosting",
      [
        [
          "Libraries",
          [
            "XGBoost API and params",
            "LightGBM categorical features",
            "CatBoost for categoricals",
            "Feature importance interpretation"
          ]
        ]
      ]
    ]
  ],
  "hugging-face": [
    [
      "Transformers Library",
      [
        [
          "Hub & Pipelines",
          [
            "AutoModel, AutoTokenizer",
            "Pipeline API",
            "Fine-tuning with Trainer",
            "Model hub publishing"
          ]
        ]
      ]
    ]
  ],
  "embedding-models": [
    [
      "Embeddings",
      [
        [
          "Vectors",
          [
            "Word2Vec, GloVe concepts",
            "Sentence transformers",
            "Similarity search (cosine)",
            "Embedding visualization"
          ]
        ]
      ]
    ]
  ],
  "nlp-fundamentals": [
    [
      "NLP Basics",
      [
        [
          "Text Processing",
          [
            "Tokenization strategies",
            "Stemming vs lemmatization",
            "Bag-of-words and TF-IDF",
            "Sequence labeling intro"
          ]
        ]
      ]
    ]
  ],
  "prompt-engineering": [
    [
      "Prompting",
      [
        [
          "Techniques",
          [
            "Zero-shot and few-shot",
            "Chain-of-thought",
            "System vs user prompts",
            "Prompt templates and variables"
          ]
        ],
        [
          "Evaluation",
          [
            "Output quality rubrics",
            "Hallucination mitigation",
            "Temperature and top-p",
            "Prompt versioning"
          ]
        ]
      ]
    ]
  ],
  "tensorflow-keras": [
    [
      "TensorFlow",
      [
        [
          "Keras API",
          [
            "Sequential and Functional API",
            "Custom layers and losses",
            "tf.data pipeline",
            "SavedModel export"
          ]
        ]
      ]
    ]
  ],
  "python-packaging": [
    [
      "Packaging",
      [
        [
          "Distribution",
          [
            "pyproject.toml and setuptools",
            "Virtual environments",
            "Publishing to PyPI",
            "Semantic versioning"
          ]
        ]
      ]
    ]
  ],
  "azure-functions": [
    [
      "Serverless",
      [
        [
          "Functions",
          [
            "HTTP triggers",
            "Timer and queue triggers",
            "Deployment slots",
            "Cold start optimization"
          ]
        ]
      ]
    ]
  ],
  "spark-databricks": [
    [
      "Spark",
      [
        [
          "Distributed Computing",
          [
            "RDD vs DataFrame API",
            "Spark SQL queries",
            "Partitioning and shuffling",
            "Databricks notebooks workflow"
          ]
        ]
      ]
    ]
  ],
  "llm-evaluation": [
    [
      "LLM Eval",
      [
        [
          "Benchmarks",
          [
            "Perplexity and BLEU/ROUGE",
            "Human eval rubrics",
            "LLM-as-judge patterns",
            "Safety and toxicity metrics"
          ]
        ]
      ]
    ]
  ],
  "database-design": [
    [
      "Design",
      [
        [
          "Schema Design",
          [
            "Entity-relationship modeling",
            "Indexing strategies",
            "Query optimization",
            "Partitioning and sharding intro"
          ]
        ]
      ]
    ]
  ],
  "statistics-probability": [
    [
      "Statistics",
      [
        [
          "Foundations",
          [
            "Descriptive vs inferential",
            "Probability distributions",
            "Hypothesis testing",
            "Confidence intervals"
          ]
        ],
        [
          "ML Relevance",
          [
            "Maximum likelihood",
            "Bayesian intuition",
            "A/B test statistics",
            "Correlation vs causation"
          ]
        ]
      ]
    ]
  ],
  "data-validation": [
    [
      "Quality",
      [
        [
          "Validation",
          [
            "Great Expectations / Pandera",
            "Schema contracts",
            "Anomaly rules",
            "Pipeline validation gates"
          ]
        ]
      ]
    ]
  ],
  "model-serving": [
    [
      "Inference",
      [
        [
          "Serving",
          [
            "Batch vs online inference",
            "Model serialization formats",
            "Latency optimization",
            "A/B model routing"
          ]
        ]
      ]
    ]
  ],
  "async-concurrency": [
    [
      "Async Python",
      [
        [
          "Concurrency",
          [
            "asyncio event loop",
            "async/await patterns",
            "Threading vs multiprocessing",
            "Concurrent API calls"
          ]
        ]
      ]
    ]
  ],
  "ab-testing": [
    [
      "Experimentation",
      [
        [
          "A/B Tests",
          [
            "Experiment design",
            "Sample size calculation",
            "Statistical power",
            "Guardrail metrics"
          ]
        ]
      ]
    ]
  ],
  "langchain": [
    [
      "LangChain",
      [
        [
          "Framework",
          [
            "Chains and agents",
            "Memory modules",
            "Tool integration",
            "Retrieval chains"
          ]
        ]
      ]
    ]
  ],
  "time-series": [
    [
      "Forecasting",
      [
        [
          "Methods",
          [
            "ARIMA/SARIMA basics",
            "Prophet library",
            "LSTM for sequences",
            "Evaluation: MAPE, sMAPE"
          ]
        ]
      ]
    ]
  ],
  "anomaly-detection": [
    [
      "Anomalies",
      [
        [
          "Detection",
          [
            "Isolation Forest",
            "Statistical thresholds",
            "Autoencoders for anomalies",
            "Real-time alerting"
          ]
        ]
      ]
    ]
  ],
  "cnn": [
    [
      "Computer Vision",
      [
        [
          "CNNs",
          [
            "Conv layers and pooling",
            "Classic architectures (ResNet)",
            "Transfer learning for images",
            "Data augmentation"
          ]
        ]
      ]
    ]
  ],
  "streaming-data": [
    [
      "Streaming",
      [
        [
          "Real-time",
          [
            "Kafka fundamentals",
            "Stream processing patterns",
            "Windowed aggregations",
            "Exactly-once semantics intro"
          ]
        ]
      ]
    ]
  ],
  "linear-algebra": [
    [
      "Math Foundations",
      [
        [
          "Linear Algebra",
          [
            "Vectors and matrices",
            "Dot products and norms",
            "Eigenvalues/eigenvectors",
            "SVD intuition for ML"
          ]
        ]
      ]
    ]
  ],
  "fault-tolerance": [
    [
      "Resilience",
      [
        [
          "Patterns",
          [
            "Retry with backoff",
            "Circuit breakers",
            "Graceful degradation",
            "Chaos engineering intro"
          ]
        ]
      ]
    ]
  ],
  "mlops-platforms": [
    [
      "MLOps",
      [
        [
          "Platforms",
          [
            "Kubeflow overview",
            "Azure ML pipelines",
            "Feature stores",
            "Model governance"
          ]
        ]
      ]
    ]
  ],
  "incident-management": [
    [
      "Incidents",
      [
        [
          "Response",
          [
            "Severity classification",
            "Postmortem writing",
            "On-call best practices",
            "Runbook execution"
          ]
        ]
      ]
    ]
  ],
  "problem-solving": [
    [
      "Problem Solving",
      [
        [
          "Methods",
          [
            "Structured decomposition",
            "Root cause analysis",
            "Tradeoff analysis",
            "Estimation techniques"
          ]
        ]
      ]
    ]
  ],
  "transformers-attention": [
    [
      "Transformers",
      [
        [
          "Architecture",
          [
            "Self-attention mechanism",
            "Multi-head attention",
            "Positional encoding",
            "Encoder-decoder structure"
          ]
        ],
        [
          "Implementation",
          [
            "Attention score computation",
            "Masking (padding, causal)",
            "Layer normalization",
            "Pre-norm vs post-norm"
          ]
        ]
      ]
    ]
  ],
  "llms": [
    [
      "Large Language Models",
      [
        [
          "Training",
          [
            "Pre-training objectives",
            "Scaling laws intuition",
            "Instruction tuning",
            "RLHF overview"
          ]
        ],
        [
          "Inference",
          [
            "Token generation strategies",
            "Context window management",
            "Quantization (INT8, GPTQ)",
            "Cost/latency tradeoffs"
          ]
        ]
      ]
    ]
  ],
  "rag-systems": [
    [
      "RAG",
      [
        [
          "Pipeline",
          [
            "Document chunking strategies",
            "Embedding and indexing",
            "Retrieval (dense vs sparse)",
            "Re-ranking"
          ]
        ],
        [
          "Production",
          [
            "Hybrid search",
            "Citation and grounding",
            "Evaluation of RAG quality",
            "Caching and latency"
          ]
        ]
      ]
    ]
  ],
  "kubernetes": [
    [
      "K8s",
      [
        [
          "Core Objects",
          [
            "Pods, Deployments, Services",
            "ConfigMaps and Secrets",
            "Ingress and load balancing",
            "Helm charts intro"
          ]
        ],
        [
          "Operations",
          [
            "kubectl workflows",
            "Resource limits and HPA",
            "Rolling updates",
            "Namespace isolation"
          ]
        ]
      ]
    ]
  ],
  "langgraph": [
    [
      "Agents",
      [
        [
          "LangGraph",
          [
            "State graphs and nodes",
            "Conditional edges",
            "Human-in-the-loop",
            "Multi-agent orchestration"
          ]
        ]
      ]
    ]
  ],
  "system-design": [
    [
      "Architecture",
      [
        [
          "Design",
          [
            "Scalability patterns",
            "CAP theorem tradeoffs",
            "Microservices vs monolith",
            "ML system design case studies"
          ]
        ]
      ]
    ]
  ],
  "production-ml": [
    [
      "Production ML",
      [
        [
          "Best Practices",
          [
            "Reproducibility",
            "Model cards",
            "Canary deployments",
            "Feedback loops and retraining"
          ]
        ]
      ]
    ]
  ],
  "security-privacy-ml": [
    [
      "Security",
      [
        [
          "ML Security",
          [
            "Data privacy (GDPR basics)",
            "Model inversion risks",
            "Differential privacy intro",
            "Secure model serving"
          ]
        ]
      ]
    ]
  ],
  "hyperparameter-optimization": [
    [
      "Advanced Tuning",
      [
        [
          "Optimization",
          [
            "Hyperband and ASHA",
            "Population-based training",
            "Multi-objective optimization",
            "Search space design"
          ]
        ]
      ]
    ]
  ],
  "rnn-lstm": [
    [
      "Sequences",
      [
        [
          "RNN/LSTM",
          [
            "Vanishing gradient problem",
            "LSTM cell mechanics",
            "GRU comparison",
            "Sequence-to-sequence models"
          ]
        ]
      ]
    ]
  ],
  "causal-inference": [
    [
      "Causality",
      [
        [
          "Methods",
          [
            "Potential outcomes framework",
            "Propensity score matching",
            "Instrumental variables",
            "DAGs and confounders"
          ]
        ]
      ]
    ]
  ],
  "recommendation-systems": [
    [
      "RecSys",
      [
        [
          "Approaches",
          [
            "Collaborative filtering",
            "Content-based filtering",
            "Matrix factorization",
            "Evaluation: precision@k, NDCG"
          ]
        ]
      ]
    ]
  ],
  "edge-computing": [
    [
      "Edge ML",
      [
        [
          "Deployment",
          [
            "ONNX and TFLite",
            "Model compression",
            "On-device inference",
            "Latency constraints"
          ]
        ]
      ]
    ]
  ],
  "reinforcement-learning": [
    [
      "RL",
      [
        [
          "Fundamentals",
          [
            "MDP formulation",
            "Q-learning and DQN",
            "Policy gradients",
            "Exploration vs exploitation"
          ]
        ]
      ]
    ]
  ],
  "graph-neural-networks": [
    [
      "GNNs",
      [
        [
          "Graph ML",
          [
            "Graph representations",
            "Message passing",
            "GCN and GraphSAGE",
            "Node classification tasks"
          ]
        ]
      ]
    ]
  ],
  "calculus-optimization": [
    [
      "Calculus",
      [
        [
          "Optimization",
          [
            "Gradients and partial derivatives",
            "Chain rule for backprop",
            "Convex optimization intro",
            "SGD and momentum"
          ]
        ]
      ]
    ]
  ]
} as const;

export const skillTopicsMap: Record<string, SkillTopics> = Object.fromEntries(
  Object.entries(curriculum).map(([skillId, sections]) => [
    skillId,
    buildSkillTopics(skillId, sections as unknown as Parameters<typeof buildSkillTopics>[1]),
  ]),
);

export function getSkillTopics(skillId: string): SkillTopics | undefined {
  return skillTopicsMap[skillId];
}
