const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const yearEl = document.getElementById('year');
const blogListEl = document.getElementById('blog-list');
const paginationEl = document.getElementById('pagination');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');

const modal = document.getElementById('post-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalMeta = document.getElementById('modal-meta');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');

const postsPerPage = 6;
let currentPage = 1;

const posts = [
  {
    title: 'Designing IT Architecture That Survives Growth',
    category: 'IT',
    date: '2026-03-01',
    readTime: '6 min',
    excerpt: 'Why architecture decisions in month one usually decide your delivery speed in year two.',
    content: [
      'Early architecture should be judged by change cost, not just current performance. Most teams optimize the first release and pay for that shortcut in every following sprint.',
      'A stable foundation starts with clear domain boundaries, API contracts, and predictable data ownership. When those are explicit, teams can scale features without breaking unrelated flows.',
      'In production, the most valuable architecture is not the most complex. It is the one that helps engineers diagnose issues quickly and ship updates safely.'
    ]
  },
  {
    title: 'How to Measure Delivery Health in Software Teams',
    category: 'IT',
    date: '2026-02-21',
    readTime: '6 min',
    excerpt: 'Beyond velocity: what actually predicts missed deadlines and production risk.',
    content: [
      'Healthy delivery is visible in lead time, deployment frequency, and incident recovery speed. These metrics show whether your process is improving or only appearing busy.',
      'If teams ship frequently but rollback often, you have a quality bottleneck. If quality is high but releases are rare, you have a process bottleneck.',
      'Balanced delivery systems intentionally track both output and risk. The goal is fast progress with controlled failure domains.'
    ]
  },
  {
    title: 'AI in Production: From Demo to Business Process',
    category: 'AI',
    date: '2026-02-18',
    readTime: '7 min',
    excerpt: 'What changes when AI features become part of daily operations.',
    content: [
      'Demo AI is usually one model call and a polished UI. Production AI requires observability, fallback behavior, prompt governance, and clear ownership when output quality degrades.',
      'The strongest AI features are embedded in existing workflows: ticket routing, document interpretation, summarization, and operator assistance.',
      'Treat AI like a subsystem with SLAs, logs, and regression checks. That shift is where real business value appears.'
    ]
  },
  {
    title: 'Choosing the Right Model Strategy for Your Product',
    category: 'AI',
    date: '2026-02-14',
    readTime: '6 min',
    excerpt: 'When to use hosted models, fine-tuning, retrieval, or hybrid architectures.',
    content: [
      'Most teams should start with hosted models and retrieval before considering fine-tuning. This approach minimizes infrastructure complexity while preserving output relevance.',
      'Fine-tuning is powerful for style consistency or narrow task patterns, but often unnecessary when context quality and orchestration are improved.',
      'Model strategy should be reviewed quarterly, not once. Latency, pricing, and model capabilities evolve fast.'
    ]
  },
  {
    title: 'AI Reliability Playbook: Guardrails That Actually Work',
    category: 'AI',
    date: '2026-02-09',
    readTime: '6 min',
    excerpt: 'Practical guardrails for safer output in customer-facing AI features.',
    content: [
      'Guardrails should be layered: prompt constraints, output schema validation, policy filtering, and human escalation for high-risk cases.',
      'One control point is never enough. Failures happen at context construction, model generation, and post-processing. Each stage needs explicit checks.',
      'The objective is not zero errors. It is controlled, visible, and recoverable errors with minimal customer impact.'
    ]
  },
  {
    title: 'Building Agent Systems for Real Operations',
    category: 'Agents',
    date: '2026-02-05',
    readTime: '7 min',
    excerpt: 'Why agents fail in production and how to design around those failure modes.',
    content: [
      'Agent systems break when responsibilities are vague. Each agent should have a strict scope, clear input contract, and measurable completion criteria.',
      'A reliable multi-agent flow includes orchestration rules, execution limits, retries with policy, and auditable logs for every decision step.',
      'Start with one high-value workflow and prove consistent outcomes before scaling to full agent networks.'
    ]
  },
  {
    title: 'Single-Agent vs Multi-Agent: What to Deploy First',
    category: 'Agents',
    date: '2026-01-30',
    readTime: '5 min',
    excerpt: 'Deployment strategy for teams adopting agent architecture gradually.',
    content: [
      'Single-agent setups are faster to validate and easier to observe. Multi-agent systems increase flexibility but also expand debugging surface area.',
      'Deploy one agent with tool access, constraints, and measurable outcomes. Add specialist agents only when task complexity requires decomposition.',
      'Architecture should match workflow reality. Overengineering agents early creates operational debt.'
    ]
  },
  {
    title: 'Agent Memory: What to Persist and What to Forget',
    category: 'Agents',
    date: '2026-01-24',
    readTime: '6 min',
    excerpt: 'Memory design patterns for long-running autonomous workflows.',
    content: [
      'Useful memory is structured and purpose-driven. Storing every interaction increases noise and reduces decision quality over time.',
      'Persist goals, constraints, outcomes, and key references. Avoid retaining unverified intermediate reasoning that can introduce drift.',
      'Memory policies should include retention windows and correction pathways when context becomes stale or contradictory.'
    ]
  },
  {
    title: 'Agent QA: Testing Autonomous Behavior Before Release',
    category: 'Agents',
    date: '2026-01-18',
    readTime: '6 min',
    excerpt: 'How to test agentic workflows with realistic scenarios and measurable criteria.',
    content: [
      'Agent testing should simulate messy inputs, conflicting objectives, and incomplete data. Clean benchmark inputs hide real operational risks.',
      'Build scenario suites that assert acceptable behavior ranges, not exact wording. Success is decision quality and task completion reliability.',
      'Include regression suites for tool failures and latency spikes. Agents must degrade gracefully, not fail unpredictably.'
    ]
  },
  {
    title: 'OpenClaw Fundamentals: What It Solves in Agent Workflows',
    category: 'OpenClaw',
    date: '2026-01-12',
    readTime: '7 min',
    excerpt: 'An introduction to OpenClaw for teams building structured agent pipelines.',
    content: [
      'OpenClaw is valuable when you need explicit orchestration and repeatable execution patterns across AI agents. It provides structure where ad-hoc chains become fragile.',
      'The key advantage is control: task graph definition, execution visibility, and predictable integration points with tools and APIs.',
      'Teams moving from prototypes to operations often adopt OpenClaw to reduce hidden coupling in their agent layer.'
    ]
  },
  {
    title: 'OpenClaw Integration Pattern for Existing Products',
    category: 'OpenClaw',
    date: '2026-01-09',
    readTime: '6 min',
    excerpt: 'How to add OpenClaw without disrupting your current production system.',
    content: [
      'Start by wrapping one stable workflow in OpenClaw while preserving your existing API boundary. This isolates risk and simplifies rollback if needed.',
      'Integrate observability first: request IDs, node-level timing, and decision traces. Visibility is the difference between maintainable and opaque automation.',
      'Expand only after reliability metrics improve. OpenClaw should decrease operational overhead, not add architecture noise.'
    ]
  },
  {
    title: 'OpenClaw + AI Agents: Routing by Capability',
    category: 'OpenClaw',
    date: '2026-01-04',
    readTime: '6 min',
    excerpt: 'Designing capability-based routing across specialist agents.',
    content: [
      'Capability routing means every request is mapped to the agent best equipped for the task. This avoids generic-agent overload and improves precision.',
      'OpenClaw helps enforce routing contracts and fallback paths when specialist agents fail or time out.',
      'Use explicit capability registries and version them. Routing logic should evolve safely as agents are added or deprecated.'
    ]
  },
  {
    title: 'Operational Monitoring for OpenClaw Pipelines',
    category: 'OpenClaw',
    date: '2025-12-29',
    readTime: '5 min',
    excerpt: 'Core metrics to track for OpenClaw-based production systems.',
    content: [
      'Monitor execution success rate, median node latency, retry distribution, and fallback frequency. These reveal real pipeline stability.',
      'Track both business outcomes and technical outcomes. A fast pipeline that produces low-quality decisions is still a failing system.',
      'Set alert thresholds around deviation from baseline behavior, not just absolute failure. Early drift detection reduces incident severity.'
    ]
  },
  {
    title: 'Why Most Automation Projects Stall After MVP',
    category: 'IT',
    date: '2025-12-23',
    readTime: '6 min',
    excerpt: 'Common reasons automation fails to scale in real organizations.',
    content: [
      'Many automation projects are built without process owners, so no one is accountable for adoption and iteration after launch.',
      'MVPs often skip exception handling and change governance. Once edge cases appear, teams revert to manual operation.',
      'Successful automation combines technical rollout with operational redesign and ownership clarity.'
    ]
  },
  {
    title: 'AI Cost Control Without Killing Product Quality',
    category: 'AI',
    date: '2025-12-18',
    readTime: '6 min',
    excerpt: 'Methods to reduce inference cost while preserving user outcomes.',
    content: [
      'Cost optimization starts with request shaping: cleaner context, shorter prompts, and deterministic output formats where possible.',
      'Use tiered model routing. Reserve premium models for complex requests and run lower-cost models for routine tasks.',
      'Track cost per successful outcome, not cost per request. Business value is the correct optimization target.'
    ]
  },
  {
    title: 'Agent Security Model for Enterprise Environments',
    category: 'Agents',
    date: '2025-12-14',
    readTime: '7 min',
    excerpt: 'A practical security baseline for tool-enabled agents in enterprise stacks.',
    content: [
      'Agent security starts with least-privilege tool access and strict execution boundaries. Never grant broad system authority by default.',
      'All agent actions should be attributable and reversible where feasible. Auditability is mandatory for enterprise compliance workflows.',
      'Include policy enforcement before tool execution, not only after generation. Prevention is cheaper than incident response.'
    ]
  },
  {
    title: 'OpenClaw Governance: Versioning and Change Control',
    category: 'OpenClaw',
    date: '2025-12-10',
    readTime: '5 min',
    excerpt: 'How to keep OpenClaw pipelines stable while changing rapidly.',
    content: [
      'Treat pipeline definitions as versioned artifacts with clear release notes and rollback strategy. Ad-hoc updates create hidden operational risk.',
      'Separate experimental flows from production flows. Promotion should require measurable criteria, not subjective confidence.',
      'Governance is what allows fast change without reliability collapse.'
    ]
  },
  {
    title: 'From Ticket Queues to Intelligent Operations',
    category: 'IT',
    date: '2025-12-06',
    readTime: '6 min',
    excerpt: 'Transforming support operations through structured automation and AI routing.',
    content: [
      'Support systems improve when classification, prioritization, and response drafting are automated with clear escalation rules.',
      'Operational intelligence is not only about speed. It is about routing issues to the right owner with minimal decision latency.',
      'The highest ROI usually comes from reducing repeated triage effort across teams.'
    ]
  },
  {
    title: 'AI + OpenClaw for Multi-Step Decision Pipelines',
    category: 'OpenClaw',
    date: '2025-12-02',
    readTime: '7 min',
    excerpt: 'Combining model reasoning with deterministic orchestration for safer decisions.',
    content: [
      'Multi-step decisions become safer when reasoning steps are constrained by deterministic pipeline stages. OpenClaw provides the coordination layer for this model.',
      'Use AI where interpretation is needed and deterministic rules where compliance or repeatability matters. This hybrid pattern reduces unpredictable behavior.',
      'The result is a system that remains explainable under pressure while still benefiting from model intelligence.'
    ]
  },
  {
    title: 'Roadmap for Teams Adopting Agents in 90 Days',
    category: 'Agents',
    date: '2025-11-28',
    readTime: '6 min',
    excerpt: 'A realistic phased plan to move from experiments to reliable agent operations.',
    content: [
      'Phase 1 should identify one bounded workflow, define success metrics, and establish baseline manual performance.',
      'Phase 2 should implement an agent with controlled tool access, observability, and fallback procedures.',
      'Phase 3 should optimize reliability, document runbooks, and train operators before scaling to additional processes.'
    ]
  }
];

function buildLongFormContent(post) {
  const expanded = [];

  expanded.push(
    `${post.title} is a practical topic in ${post.category} that impacts architecture quality, delivery speed, and long-term product reliability. The notes below expand implementation patterns, operational risks, and execution guidelines in a production context.`
  );

  post.content.forEach((paragraph, index) => {
    const chapter = index + 1;

    expanded.push(paragraph);
    expanded.push(
      `Implementation angle ${chapter}: teams should convert this principle into clear workflow rules, ownership boundaries, and observable checkpoints. Without explicit operational rules, even strong technical ideas degrade during scale.`
    );
    expanded.push(
      `Engineering detail ${chapter}: define measurable acceptance criteria before rollout. This includes quality thresholds, latency expectations, failure handling behavior, and escalation conditions so decisions remain objective under delivery pressure.`
    );
    expanded.push(
      `Common failure pattern ${chapter}: organizations often over-focus on tooling and under-focus on process discipline. The result is inconsistent execution, rising rework, and low confidence in outcomes even when the stack looks modern.`
    );
    expanded.push(
      `Practical recommendation ${chapter}: introduce phased adoption with short validation loops. Ship in controlled increments, collect structured feedback, and adjust architecture or policy before scaling to broader operational scope.`
    );
  });

  expanded.push(
    `Final note: the strongest results usually come from combining technical quality with operational clarity. When process design, observability, and governance evolve together, ${post.category} initiatives deliver durable value instead of temporary gains.`
  );

  return expanded;
}

function formatMeta(post) {
  return `${post.category} • ${post.date} • ${post.readTime}`;
}

function renderPosts() {
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = posts.slice(start, end);

  blogListEl.innerHTML = pagePosts.map((post, index) => {
    const realIndex = start + index;
    return `
      <article class="blog-card reveal">
        <p class="blog-meta">${formatMeta(post)}</p>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-excerpt">${post.excerpt}</p>
        <button class="read-btn" type="button" data-index="${realIndex}">Read article</button>
      </article>
    `;
  }).join('');

  document.querySelectorAll('.read-btn').forEach((btn) => {
    btn.addEventListener('click', () => openPost(Number(btn.dataset.index)));
  });

  observeReveals();
}

function renderPagination() {
  const totalPages = Math.ceil(posts.length / postsPerPage);

  paginationEl.innerHTML = Array.from({ length: totalPages }, (_, i) => {
    const page = i + 1;
    return `<button type="button" class="page-btn ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`;
  }).join('');

  document.querySelectorAll('.page-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentPage = Number(btn.dataset.page);
      updatePage();
    });
  });

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

function updatePage() {
  renderPosts();
  renderPagination();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openPost(index) {
  const post = posts[index];
  if (!post) return;

  modalMeta.textContent = formatMeta(post);
  modalTitle.textContent = post.title;
  const longForm = buildLongFormContent(post);
  modalContent.innerHTML = longForm.map((paragraph) => `<p>${paragraph}</p>`).join('');

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePost() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function observeReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    updatePage();
  }
});

nextBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(posts.length / postsPerPage);
  if (currentPage < totalPages) {
    currentPage += 1;
    updatePage();
  }
});

closeModalBtn.addEventListener('click', closePost);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closePost();
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    closePost();
  }
});

updatePage();
observeReveals();
