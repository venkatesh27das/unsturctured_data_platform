export const dashboardFallback = {
  kpis: [
    { label: "Documents Ingested", value: "1.84M", change: "+18.4%" },
    { label: "Processing Success Rate", value: "98.7%", change: "+2.1%" },
    { label: "Extraction Accuracy", value: "94.8%", change: "+3.6%" },
    { label: "Knowledge Assets Created", value: "2,946", change: "+412" },
    { label: "Active AI Queries", value: "31.2K", change: "+24%" },
    { label: "PHI Entities Detected", value: "8.7M", change: "masked" }
  ],
  trends: [
    { day: "Mon", ingestion: 42000, success: 40300, queries: 5100 },
    { day: "Tue", ingestion: 51000, success: 49800, queries: 6200 },
    { day: "Wed", ingestion: 47000, success: 45800, queries: 6900 },
    { day: "Thu", ingestion: 62000, success: 61100, queries: 8200 },
    { day: "Fri", ingestion: 69000, success: 67800, queries: 9200 },
    { day: "Sat", ingestion: 39000, success: 38300, queries: 5400 },
    { day: "Sun", ingestion: 43000, success: 42100, queries: 5800 }
  ],
  health: { score: 96, activePipelines: 42, failedJobs: 3, avgConfidence: 94.8 },
  activity: [
    "Oncology claim packet CLM-20491 processed with 97.2% confidence",
    "New semantic index created for reimbursement policy corpus",
    "AI assistant query spike detected in oncology access team",
    "PHI masking policy updated for member identifiers"
  ]
};

export const ingestionFallback = {
  connectors: [
    { name: "SharePoint", status: "Connected", lastSync: "8 min ago", documents: 248913, frequency: "15 min" },
    { name: "SFTP", status: "Connected", lastSync: "12 min ago", documents: 98344, frequency: "hourly" },
    { name: "Email", status: "Degraded", lastSync: "31 min ago", documents: 43891, frequency: "10 min" },
    { name: "Cloud Storage", status: "Connected", lastSync: "4 min ago", documents: 802114, frequency: "continuous" },
    { name: "API Gateway", status: "Connected", lastSync: "live", documents: 191002, frequency: "event" },
    { name: "Veeva Vault", status: "Planned", lastSync: "n/a", documents: 0, frequency: "daily" },
    { name: "Documentum", status: "Planned", lastSync: "n/a", documents: 0, frequency: "daily" }
  ],
  jobs: [
    { id: "ING-78192", source: "SharePoint", owner: "Market Access Ops", count: 18420, status: "Running", freshness: "8m", validation: "Passed", lastRun: "Today 10:42" },
    { id: "ING-78168", source: "SFTP", owner: "Claims Intake", count: 9204, status: "Completed", freshness: "12m", validation: "Warnings", lastRun: "Today 10:38" },
    { id: "ING-78131", source: "Email", owner: "Reimbursement Hub", count: 1137, status: "Review", freshness: "31m", validation: "Failed 18", lastRun: "Today 10:19" },
    { id: "ING-78044", source: "API Gateway", owner: "Payer Integrations", count: 48221, status: "Completed", freshness: "live", validation: "Passed", lastRun: "Continuous" }
  ],
  validation: { corrupted: 18, missingMetadata: 42, unsupported: 7, duplicates: 391 }
};

export const documentsFallback = {
  fields: [
    ["Claim ID", "CLM-20491", 99],
    ["Member ID", "MBR-889204", 97],
    ["Provider", "Northstar Oncology Group", 96],
    ["Drug Name", "Keytruda", 95],
    ["Diagnosis", "Metastatic NSCLC", 91],
    ["ICD-10", "C34.90", 94],
    ["CPT Code", "96413", 86],
    ["Prior Auth Status", "Missing", 81],
    ["Denial Reason", "Prior authorization not on file", 88],
    ["Service Date", "2026-04-28", 92]
  ],
  entities: ["Patient", "Drug", "Diagnosis", "Procedure", "Insurance Provider", "Physician"],
  reviewQueue: [
    { doc: "PA-PACKET-8841.pdf", reviewer: "R. Shah", status: "Assigned", reason: "Low CPT confidence" },
    { doc: "DENIAL-CLM-20491.pdf", reviewer: "A. Lopez", status: "In Review", reason: "Policy conflict" },
    { doc: "LAB-NSCLC-4911.pdf", reviewer: "Unassigned", status: "Queued", reason: "PHI density high" }
  ]
};

export const knowledgeFallback = {
  chunks: [
    { id: "CHK-88291", text: "Denial references missing prior authorization for Keytruda infusion therapy.", confidence: 94, similarity: 0.92 },
    { id: "CHK-88292", text: "Policy requires documented PD-L1 result and payer-specific authorization before service.", confidence: 91, similarity: 0.89 },
    { id: "CHK-88293", text: "Claim is associated with ICD-10 C34.90 and CPT 96413.", confidence: 96, similarity: 0.86 }
  ],
  vector: { embeddings: 12840772, freshness: "6 min", retrievalHealth: 97, chunkCount: 2891403 }
};

export const catalogFallback = {
  products: [
    { title: "Oncology Claims Knowledge Index", owner: "Market Access Analytics", score: 96, freshness: "6 min", sensitivity: "PHI Restricted", usage: "18.4K queries", lineage: "Certified" },
    { title: "Prior Authorization Denial Insights", owner: "Patient Services", score: 93, freshness: "18 min", sensitivity: "Confidential", usage: "9.2K queries", lineage: "Certified" },
    { title: "Drug Reimbursement Policy Corpus", owner: "Reimbursement Strategy", score: 91, freshness: "1 hr", sensitivity: "Internal", usage: "7.6K queries", lineage: "Verified" },
    { title: "PHI-Redacted Claims Store", owner: "Data Governance", score: 98, freshness: "11 min", sensitivity: "De-identified", usage: "22.1K views", lineage: "Certified" },
    { title: "Claims Relationship Graph", owner: "Enterprise Knowledge", score: 94, freshness: "24 min", sensitivity: "PHI Restricted", usage: "4.8K traversals", lineage: "Certified" }
  ]
};

export const assistantFallback = {
  usecaseSuggestions: [
    "oncology prior authorization leakage",
    "reimbursement policy impact",
    "payer denial root cause",
    "site-of-care optimization"
  ],
  dataProducts: [
    { name: "Oncology Claims Knowledge Index", usecase: "oncology prior authorization leakage", owner: "Market Access Analytics", freshness: "6 min", stores: ["Claims Vector Store", "Claims Metadata Store"], knowledge: "Oncology Access Knowledge Layer", score: 96, sensitivity: "PHI Restricted" },
    { name: "Prior Authorization Denial Insights", usecase: "payer denial root cause", owner: "Patient Services", freshness: "18 min", stores: ["Denials Vector Store", "Payer Rules Metadata"], knowledge: "Reimbursement Rules Layer", score: 93, sensitivity: "Confidential" },
    { name: "Drug Reimbursement Policy Corpus", usecase: "reimbursement policy impact", owner: "Reimbursement Strategy", freshness: "1 hr", stores: ["Policy Vector Store", "Contract Metadata Store"], knowledge: "Policy Intelligence Layer", score: 91, sensitivity: "Internal" },
    { name: "Site-of-Care Pathway Graph", usecase: "site-of-care optimization", owner: "Enterprise Knowledge", freshness: "24 min", stores: ["Pathway Vector Store", "Referral Metadata Store"], knowledge: "Care Pathway Knowledge Layer", score: 89, sensitivity: "Internal" }
  ],
  stores: [
    { name: "Claims Vector Store", type: "Vector store", status: "Attached", records: "2.9M chunks", retrieval: 97, freshness: "6 min" },
    { name: "Claims Metadata Store", type: "Meta store", status: "Attached", records: "1.84M documents", retrieval: 94, freshness: "8 min" },
    { name: "Payer Rules Metadata", type: "Meta store", status: "Available", records: "42K policies", retrieval: 91, freshness: "18 min" },
    { name: "Policy Vector Store", type: "Vector store", status: "Available", records: "818K chunks", retrieval: 92, freshness: "1 hr" }
  ],
  knowledgeLayers: [
    { name: "Oncology Access Knowledge Layer", status: "Attached", coverage: "Claims, PA, policy, diagnosis", confidence: 95 },
    { name: "Reimbursement Rules Layer", status: "Available", coverage: "Payer policy, formulary, exceptions", confidence: 92 },
    { name: "Care Pathway Knowledge Layer", status: "Available", coverage: "Referral, site-of-care, provider graph", confidence: 89 }
  ],
  ragStrategy: [
    { step: "Discover", detail: "Resolve the use case to certified data products and governed stores.", metric: "4 products" },
    { step: "Retrieve", detail: "Blend semantic chunks with metadata filters for payer, therapy, date, and sensitivity.", metric: "Top 12 chunks" },
    { step: "Ground", detail: "Attach citations, lineage, and policy checks before answer generation.", metric: "96% grounded" },
    { step: "Govern", detail: "Apply PHI masking, access policy, and hallucination risk scoring.", metric: "Low risk" }
  ],
  conversation: [
    { role: "user", text: "For oncology prior authorization leakage, which claims are driving avoidable denials?" },
    { role: "assistant", text: "The attached claims vector store and metadata store point to Keytruda infusion claims where service dates preceded payer authorization. The strongest cluster is Northstar Oncology, payer A, CPT 96413, with missing PA evidence across 184 claims in the last 30 days." }
  ],
  citations: ["DENIAL-CLM-20491.pdf", "POLICY-ONC-PAYER-A-2026.pdf", "CLAIMS-META-PAYER-A"],
  chunks: [
    { id: "VEC-9912", source: "Claims Vector Store", score: 0.94, text: "Prior authorization not found for service date 2026-04-28." },
    { id: "META-2217", source: "Claims Metadata Store", score: 0.91, text: "Payer A denials increased 17% for CPT 96413 when authorization evidence is absent." },
    { id: "POL-7781", source: "Oncology Access Knowledge Layer", score: 0.88, text: "Keytruda policy requires payer approval before infusion." }
  ]
};

export const governanceFallback = {
  kpis: [
    { label: "PHI Protected Records", value: "8.7M" },
    { label: "Audit Events", value: "412K" },
    { label: "Access Violations", value: "7" },
    { label: "AI Quality Score", value: "94.2" },
    { label: "Retrieval Accuracy", value: "91.8%" },
    { label: "Active Policies", value: "128" }
  ],
  trend: [
    { day: "Mon", confidence: 91, failed: 21, latency: 240, freshness: 88 },
    { day: "Tue", confidence: 92, failed: 18, latency: 220, freshness: 91 },
    { day: "Wed", confidence: 93, failed: 16, latency: 205, freshness: 93 },
    { day: "Thu", confidence: 94, failed: 12, latency: 198, freshness: 95 },
    { day: "Fri", confidence: 95, failed: 10, latency: 184, freshness: 96 }
  ],
  logs: [
    { timestamp: "2026-05-10 10:48", user: "maccess.ops", action: "Viewed claim evidence", asset: "CLM-20491", result: "Allowed", risk: "Low" },
    { timestamp: "2026-05-10 10:41", user: "ai.assistant", action: "Generated grounded answer", asset: "Oncology Claims Index", result: "Validated", risk: "Low" },
    { timestamp: "2026-05-10 10:22", user: "contractor.temp", action: "Export requested", asset: "PHI Claims Store", result: "Denied", risk: "High" }
  ]
};
