/**
 * Data store for ABM Strategies (derived from C:\Users\serajkhan_bamboobox\Downloads\abm_strategy),
 * Target Companies, Stage Gates, MCP execution logs, and Generated LLM Tokens.
 */

export const INITIAL_STRATEGIES = [
  {
    id: 'naukri',
    name: 'Naukri Enterprise ABM Strategy',
    client_slug: 'naukri',
    client_name: 'Naukri (Info Edge)',
    website: 'naukri.com',
    createdBy: {
      name: 'Alex Rivera',
      email: 'alex.rivera@bamboobox.ai',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Growth Marketing Director'
    },
    createdDate: '2026-07-30',
    budget: '₹10,000 INR / quarter',
    targetGeography: 'India',
    currentSkill: '02-main-inputs',
    status: 'Completed Strategy',
    completionPercentage: 95,
    summary: 'A targeted pilot ABM strategy for Naukri B2B Recruitment & HR-Tech platform, focusing on IT/Staffing & Resilient Enterprise sectors in India.',
    stageGates: {
      "01-project-setup": "completed",
      "02-main-inputs": "partial",
      "03-market-analysis": "completed",
      "04-category-maturity-analysis": "completed",
      "05-competitor-analysis": "completed",
      "06-brand-strength-analysis": "completed",
      "07-right-to-win-analysis": "completed",
      "08-icp-segments": "completed",
      "09-personas": "completed",
      "10-playbook-selection": "completed",
      "11-previous-campaign-analysis": "completed",
      "12-campaign-theme": "completed",
      "13-content-plan": "completed",
      "14-linkedinads-campaign-design": "completed",
      "15-email-campaign-design": "completed",
      "16-googleads-campaign-design": "completed",
      "17-aeo-geo-recommendations": "completed",
      "18-linkedin-organic": "completed",
      "19-sdr-play-design": "completed",
      "20-abm-strategy-document": "completed",
      "21-abm-strategy-presentation": "completed"
    },
    targetCompanies: [
      {
        id: 'comp-naukri-1',
        name: 'TCS (Tata Consultancy Services)',
        domain: 'tcs.com',
        industry: 'IT & Consulting Services',
        employees: '600,000+',
        tier: 'Tier 1 - Strategic 1:1',
        rightToWinScore: 94,
        budgetAllocated: '₹3,500 INR',
        personas: ['VP of Talent Acquisition', 'Head of Campus Hiring', 'Chief HR Officer'],
        campaignAngle: 'Accelerated Tech Hiring via Naukri Resdex AI & Priority Candidate Access',
        sdrPlay: 'Direct LinkedIn InMail from Naukri Enterprise Partner Lead + Custom ROI Calculator',
        status: 'Active Outreach',
        adChannel: 'LinkedIn Ads & Direct Email'
      },
      {
        id: 'comp-naukri-2',
        name: 'Infosys Limited',
        domain: 'infosys.com',
        industry: 'IT & Tech Staffing',
        employees: '300,000+',
        tier: 'Tier 1 - Strategic 1:1',
        rightToWinScore: 91,
        budgetAllocated: '₹2,500 INR',
        personas: ['Global Talent Acquisition Director', 'Recruitment Automation Lead'],
        campaignAngle: 'Reduce Time-to-Fill for Senior Architecture Roles by 40%',
        sdrPlay: 'Executive Talent Intelligence Briefing + Benchmark Report',
        status: 'Proposal Sent',
        adChannel: 'LinkedIn InMail & SDR Play'
      },
      {
        id: 'comp-naukri-3',
        name: 'TeamLease Services',
        domain: 'teamlease.com',
        industry: 'Staffing & RPO Agencies',
        employees: '10,000+',
        tier: 'Tier 2 - Clustered 1:Few',
        rightToWinScore: 88,
        budgetAllocated: '₹2,000 INR',
        personas: ['Chief Commercial Officer', 'RPO Practice Head'],
        campaignAngle: 'Bulk Staffing Pipeline Efficiency with Naukri Employer Branding',
        sdrPlay: 'Sequence of 3 Hyper-personalized Emails + Phone Followup',
        status: 'Engaged',
        adChannel: 'LinkedIn Sponsored Content & Email'
      },
      {
        id: 'comp-naukri-4',
        name: 'HDFC Bank Enterprise',
        domain: 'hdfcbank.com',
        industry: 'Financial Services & Banking',
        employees: '170,000+',
        tier: 'Tier 2 - Resilient Sectors',
        rightToWinScore: 85,
        budgetAllocated: '₹1,000 INR',
        personas: ['Head of BFSI Recruitment', 'Senior HR Director'],
        campaignAngle: 'Compliance & Verification-Ready BFSI Candidate Resumes',
        sdrPlay: 'Invite to BFSI Hiring Trends Webinar & Executive Roundtable',
        status: 'Targeted',
        adChannel: 'LinkedIn Carousels'
      }
    ],
    outputFiles: [
      { name: 'abm-strategy-document.doc', size: '9.0 KB', type: 'doc', desc: 'Master ABM Synthesis & Operational Strategy' },
      { name: 'abm-strategy-presentation.pptx', size: '5.3 KB', type: 'pptx', desc: 'Executive Boardroom Pitch Deck Outline' },
      { name: 'market-analysis.doc', size: '20.9 KB', type: 'doc', desc: 'Deep Dive India HR-Tech Market Ecosystem Analysis' },
      { name: 'icp-segments.doc', size: '5.1 KB', type: 'doc', desc: 'ICP Tiering & Firmographic Criteria' },
      { name: 'competitor-analysis.doc', size: '7.1 KB', type: 'doc', desc: 'Competitive Threat Matrix & Differentiation' },
      { name: 'sdr-play-design.doc', size: '5.0 KB', type: 'doc', desc: 'SDR Outreach Sequences & Talk Tracks' },
      { name: 'linkedinads-campaign-design.doc', size: '4.5 KB', type: 'doc', desc: 'Paid LinkedIn Ads Budget & Audience Targeting' }
    ]
  },
  {
    id: 'airtel',
    name: 'Airtel Business Cloud & IoT ABM',
    client_slug: 'airtel',
    client_name: 'Airtel Business',
    website: 'airtel.in/business',
    createdBy: {
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@bamboobox.ai',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'Principal ABM Strategist'
    },
    createdDate: '2026-07-29',
    budget: '₹25,000 INR / quarter',
    targetGeography: 'India & SEA',
    currentSkill: '03-market-analysis',
    status: 'In Progress (Stage 3)',
    completionPercentage: 25,
    stageGates: {
      "01-project-setup": "completed",
      "02-main-inputs": "completed",
      "03-market-analysis": "pending",
      "04-category-maturity-analysis": "pending",
      "05-competitor-analysis": "pending",
      "06-brand-strength-analysis": "pending",
      "07-right-to-win-analysis": "pending",
      "08-icp-segments": "pending",
      "09-personas": "pending",
      "10-playbook-selection": "pending",
      "11-previous-campaign-analysis": "pending",
      "12-campaign-theme": "pending",
      "13-content-plan": "pending",
      "14-linkedinads-campaign-design": "pending",
      "15-email-campaign-design": "pending",
      "16-googleads-campaign-design": "pending",
      "17-aeo-geo-recommendations": "pending",
      "18-linkedin-organic": "pending",
      "19-sdr-play-design": "pending",
      "20-abm-strategy-document": "pending",
      "21-abm-strategy-presentation": "pending"
    },
    targetCompanies: [
      {
        id: 'comp-airtel-1',
        name: 'Reliance Digital Supply Chain',
        domain: 'reliancedigital.in',
        industry: 'Retail & Logistics',
        employees: '250,000+',
        tier: 'Tier 1 - Strategic 1:1',
        rightToWinScore: 92,
        budgetAllocated: '₹10,000 INR',
        personas: ['CTO', 'VP of IoT Logistics', 'Head of Supply Infrastructure'],
        campaignAngle: 'Airtel 5G Private Network & Smart Asset Tracking IoT Solutions',
        sdrPlay: 'Executive Briefing at Airtel Experience Centre + Dedicated Field Engineer Visit',
        status: 'In Discovery',
        adChannel: 'Direct Account Engagement & LinkedIn ABM'
      },
      {
        id: 'comp-airtel-2',
        name: 'Flipkart Logistics',
        domain: 'flipkart.com',
        industry: 'E-Commerce Infrastructure',
        employees: '50,000+',
        tier: 'Tier 1 - Strategic 1:1',
        rightToWinScore: 89,
        budgetAllocated: '₹8,000 INR',
        personas: ['Chief Supply Chain Officer', 'Director of Cloud Operations'],
        campaignAngle: 'Ultra-low Latency Edge Cloud for Automated Warehousing',
        sdrPlay: 'Co-innovator Tech Session + Custom SLA Proof-of-Concept',
        status: 'Initial Contact',
        adChannel: 'LinkedIn Account Target Ads'
      }
    ],
    outputFiles: [
      { name: 'project.json', size: '1.2 KB', type: 'json', desc: 'Project configuration metadata' },
      { name: 'input-log.md', size: '0.9 KB', type: 'md', desc: 'Stage 1 & 2 Execution input audit log' },
      { name: 'assumptions.md', size: '0.1 KB', type: 'md', desc: 'Initial Scope & Constraints log' }
    ]
  },
  {
    id: 'swiggy',
    name: 'Swiggy Instamart B2B Merchant ABM',
    client_slug: 'swiggy',
    client_name: 'Swiggy',
    website: 'swiggy.com',
    createdBy: {
      name: 'Priya Sharma',
      email: 'priya.sharma@bamboobox.ai',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      role: 'Enterprise Strategy Lead'
    },
    createdDate: '2026-07-28',
    budget: '₹50,000 INR / quarter',
    targetGeography: 'Top 10 Indian Metro Cities',
    currentSkill: '14-linkedinads-campaign-design',
    status: 'Completed Strategy',
    completionPercentage: 90,
    stageGates: {
      "01-project-setup": "completed",
      "02-main-inputs": "completed",
      "03-market-analysis": "completed",
      "04-category-maturity-analysis": "completed",
      "05-competitor-analysis": "completed",
      "06-brand-strength-analysis": "completed",
      "07-right-to-win-analysis": "completed",
      "08-icp-segments": "completed",
      "09-personas": "completed",
      "10-playbook-selection": "completed",
      "11-previous-campaign-analysis": "completed",
      "12-campaign-theme": "completed",
      "13-content-plan": "completed",
      "14-linkedinads-campaign-design": "completed",
      "15-email-campaign-design": "completed",
      "16-googleads-campaign-design": "completed",
      "17-aeo-geo-recommendations": "completed",
      "18-linkedin-organic": "completed",
      "19-sdr-play-design": "completed",
      "20-abm-strategy-document": "completed",
      "21-abm-strategy-presentation": "completed"
    },
    targetCompanies: [
      {
        id: 'comp-swiggy-1',
        name: 'Hindustan Unilever (HUL)',
        domain: 'hul.co.in',
        industry: 'FMCG & Consumer Goods',
        employees: '20,000+',
        tier: 'Tier 1 - Strategic 1:1',
        rightToWinScore: 96,
        budgetAllocated: '₹20,000 INR',
        personas: ['VP Modern Trade', 'Digital Commerce Lead', 'Brand Director'],
        campaignAngle: '10-Minute Dark Store Placement & Co-Marketing Banner Ads',
        sdrPlay: 'Quarterly Joint Business Planning (JBP) Proposal',
        status: 'Closing Contract',
        adChannel: 'LinkedIn & In-App B2B Portal'
      },
      {
        id: 'comp-swiggy-2',
        name: 'Nestlé India',
        domain: 'nestle.in',
        industry: 'FMCG Packaged Foods',
        employees: '8,000+',
        tier: 'Tier 1 - Strategic 1:1',
        rightToWinScore: 93,
        budgetAllocated: '₹15,000 INR',
        personas: ['Head of E-Commerce', 'Category Growth Manager'],
        campaignAngle: 'Exclusive Product Launch Sprints on Instamart Quick-Commerce',
        sdrPlay: 'Data-driven Demand Index Report presentation',
        status: 'Active Engagement',
        adChannel: 'LinkedIn Sponsored Content'
      }
    ],
    outputFiles: [
      { name: 'swiggy-abm-master.doc', size: '14.2 KB', type: 'doc', desc: 'Quick-Commerce FMCG ABM Playbook' },
      { name: 'fmcg-personas.doc', size: '6.8 KB', type: 'doc', desc: 'Modern Trade & E-Commerce Decision Maker Personas' }
    ]
  }
];

export const INITIAL_MCP_LOGS = [
  {
    id: 'log-101',
    timestamp: '2026-07-30T06:48:52.197Z',
    strategyId: 'naukri',
    strategyName: 'Naukri Enterprise ABM Strategy',
    user: 'Alex Rivera',
    userEmail: 'alex.rivera@bamboobox.ai',
    skill: '21-abm-strategy-presentation',
    toolName: 'execute_skill',
    status: 'SUCCESS',
    durationMs: 4230,
    details: 'Generated PowerPoint deck outline & speaker notes summarizing 21 stage outputs.',
    logs: [
      '[INFO] Initializing skill 21-abm-strategy-presentation for project naukri',
      '[INFO] Loading stage gate dependencies 01 through 20...',
      '[SUCCESS] Master ABM presentation artifact written to outputs/abm-strategy-presentation.pptx'
    ]
  },
  {
    id: 'log-102',
    timestamp: '2026-07-30T06:48:00.070Z',
    strategyId: 'naukri',
    strategyName: 'Naukri Enterprise ABM Strategy',
    user: 'Alex Rivera',
    userEmail: 'alex.rivera@bamboobox.ai',
    skill: '20-abm-strategy-document',
    toolName: 'execute_skill',
    status: 'SUCCESS',
    durationMs: 6120,
    details: 'Compiled master synthesis document from Stages 1-19 outputs.',
    logs: [
      '[INFO] Running stage 20 compilation engine...',
      '[INFO] Parsing ICP segments, personas, and campaign designs...',
      '[SUCCESS] Written outputs/abm-strategy-document.doc (20.9 KB)'
    ]
  },
  {
    id: 'log-103',
    timestamp: '2026-07-30T06:44:23.511Z',
    strategyId: 'naukri',
    strategyName: 'Naukri Enterprise ABM Strategy',
    user: 'Alex Rivera',
    userEmail: 'alex.rivera@bamboobox.ai',
    skill: '14-linkedinads-campaign-design',
    toolName: 'execute_skill',
    status: 'SUCCESS',
    durationMs: 3840,
    details: 'Designed ₹9,000 INR LinkedIn Ads campaign budget split and single-image/carousel ad formats.',
    logs: [
      '[INFO] Setting audience targeting: India / IT & Staffing decision makers',
      '[INFO] Generating budget allocation: ₹9,000 media spend + ₹1,000 contingency buffer',
      '[SUCCESS] Drafted stage output: linkedinads-campaign-design.doc'
    ]
  },
  {
    id: 'log-104',
    timestamp: '2026-07-29T14:22:10.040Z',
    strategyId: 'airtel',
    strategyName: 'Airtel Business Cloud & IoT ABM',
    user: 'Sarah Jenkins',
    userEmail: 'sarah.jenkins@bamboobox.ai',
    skill: '02-main-inputs',
    toolName: 'execute_skill',
    status: 'SUCCESS',
    durationMs: 2900,
    details: 'Validated main project inputs & budget parameters for Airtel Business.',
    logs: [
      '[INFO] Loaded project.json for client airtel',
      '[INFO] Verified total quarterly budget ₹25,000 INR',
      '[SUCCESS] Stage gate 02-main-inputs marked COMPLETED'
    ]
  },
  {
    id: 'log-105',
    timestamp: '2026-07-28T11:10:05.120Z',
    strategyId: 'swiggy',
    strategyName: 'Swiggy Instamart B2B Merchant ABM',
    user: 'Priya Sharma',
    userEmail: 'priya.sharma@bamboobox.ai',
    skill: '08-icp-segments',
    toolName: 'execute_skill',
    status: 'SUCCESS',
    durationMs: 5100,
    details: 'Derived FMCG Tier 1 and Tier 2 ICP segments for Swiggy Instamart.',
    logs: [
      '[INFO] Executing ICP firmographic analyzer on FMCG database',
      '[SUCCESS] Tier 1 identified: HUL, Nestlé, P&G, Marico',
      '[SUCCESS] Written outputs/icp-segments.doc'
    ]
  }
];

export const INITIAL_TOKENS = [
  {
    id: 'tok-001',
    name: 'Claude Desktop Pro MCP Token',
    token: 'mcp_live_sec_99382104ab82c9e81',
    createdDate: '2026-07-30',
    expiry: 'No Expiry (Never)',
    status: 'Active',
    createdBy: 'Seraj Khan',
    lastUsed: '10 mins ago'
  },
  {
    id: 'tok-002',
    name: 'Cursor IDE Assistant Token',
    token: 'mcp_live_sec_77182930cc718a2e1',
    createdDate: '2026-07-25',
    expiry: '90 Days',
    expiryDate: '2026-10-23',
    status: 'Active',
    createdBy: 'Alex Rivera',
    lastUsed: '1 hour ago'
  },
  {
    id: 'tok-003',
    name: 'Gemini CLI Automated Pipeline',
    token: 'mcp_live_sec_44102948ee3910f44',
    createdDate: '2026-07-15',
    expiry: '30 Days',
    expiryDate: '2026-08-14',
    status: 'Active',
    createdBy: 'Sarah Jenkins',
    lastUsed: 'Yesterday'
  }
];
