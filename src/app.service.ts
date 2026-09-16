import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHealth(): { status: string; uptime: number; timestamp: string } {
    return {
      status: 'ok',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }

  getWelcomePage(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>API — Premium</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:        #07070f;
      --surface:   rgba(255,255,255,0.04);
      --border:    rgba(255,255,255,0.08);
      --purple:    #a855f7;
      --blue:      #3b82f6;
      --cyan:      #22d3ee;
      --text:      #f1f5f9;
      --muted:     #94a3b8;
      --radius:    16px;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-x: hidden;
    }

    /* ── Grid background ── */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(168,85,247,.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(168,85,247,.06) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
      z-index: 0;
    }

    /* ── Radial glow ── */
    body::after {
      content: '';
      position: fixed;
      top: -20%;
      left: 50%;
      transform: translateX(-50%);
      width: 900px;
      height: 600px;
      background: radial-gradient(ellipse, rgba(168,85,247,.18) 0%, rgba(59,130,246,.10) 40%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    /* ── Layout ── */
    .page { position: relative; z-index: 1; width: 100%; max-width: 1100px; padding: 0 24px; }

    /* ── Nav ── */
    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 28px 0;
    }
    .logo {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, var(--purple), var(--blue));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .nav-links { display: flex; gap: 28px; list-style: none; }
    .nav-links a {
      color: var(--muted);
      text-decoration: none;
      font-size: .9rem;
      transition: color .2s;
    }
    .nav-links a:hover { color: var(--text); }

    /* ── Hero ── */
    .hero {
      text-align: center;
      padding: 80px 0 60px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(168,85,247,.12);
      border: 1px solid rgba(168,85,247,.35);
      color: var(--purple);
      font-size: .78rem;
      font-weight: 600;
      letter-spacing: .08em;
      text-transform: uppercase;
      padding: 6px 16px;
      border-radius: 999px;
      margin-bottom: 32px;
    }
    .badge-dot {
      width: 6px; height: 6px;
      background: var(--purple);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--purple);
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: .5; transform: scale(1.4); }
    }

    h1 {
      font-size: clamp(2.8rem, 6vw, 5rem);
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1.08;
      margin-bottom: 24px;
    }
    h1 .grad {
      background: linear-gradient(135deg, #fff 30%, var(--purple) 70%, var(--blue) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: 1.15rem;
      color: var(--muted);
      max-width: 520px;
      margin: 0 auto 44px;
      line-height: 1.7;
    }

    .cta-group { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 30px;
      border-radius: 12px;
      font-size: .95rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: all .2s;
      border: none;
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--purple), var(--blue));
      color: #fff;
      box-shadow: 0 0 30px rgba(168,85,247,.35), 0 4px 16px rgba(0,0,0,.4);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(168,85,247,.55), 0 8px 24px rgba(0,0,0,.4); }
    .btn-ghost {
      background: var(--surface);
      color: var(--text);
      border: 1px solid var(--border);
    }
    .btn-ghost:hover { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.15); }

    /* ── Status bar ── */
    .status-bar {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 8px 20px;
      font-size: .82rem;
      color: var(--muted);
      margin-top: 56px;
    }
    .status-dot {
      width: 8px; height: 8px;
      background: #22c55e;
      border-radius: 50%;
      box-shadow: 0 0 8px #22c55e;
      animation: pulse 2.5s ease-in-out infinite;
    }

    /* ── Cards ── */
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      padding: 80px 0;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 32px;
      position: relative;
      overflow: hidden;
      transition: border-color .25s, transform .25s;
    }
    .card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--radius);
      background: radial-gradient(circle at top left, var(--card-glow, rgba(168,85,247,.08)), transparent 60%);
      pointer-events: none;
    }
    .card:hover { border-color: rgba(168,85,247,.35); transform: translateY(-4px); }

    .card-icon {
      width: 48px; height: 48px;
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem;
      margin-bottom: 20px;
    }
    .card-icon.purple { background: rgba(168,85,247,.15); }
    .card-icon.blue   { background: rgba(59,130,246,.15);  }
    .card-icon.cyan   { background: rgba(34,211,238,.15);  }

    .card h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 10px; }
    .card p  { font-size: .9rem; color: var(--muted); line-height: 1.65; }

    .card-stat {
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid var(--border);
      font-size: .85rem;
      color: var(--muted);
    }
    .card-stat strong { color: var(--text); font-size: 1.4rem; font-weight: 800; }

    /* ── Endpoint showcase ── */
    .endpoints {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 36px;
      margin-bottom: 80px;
    }
    .endpoints h2 { font-size: 1.2rem; font-weight: 700; margin-bottom: 24px; }

    .endpoint-row {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 0;
      border-bottom: 1px solid var(--border);
    }
    .endpoint-row:last-child { border-bottom: none; }
    .method {
      font-size: .72rem;
      font-weight: 700;
      letter-spacing: .06em;
      padding: 4px 10px;
      border-radius: 6px;
      min-width: 52px;
      text-align: center;
    }
    .method.get    { background: rgba(34,197,94,.15);  color: #4ade80; }
    .method.post   { background: rgba(59,130,246,.15); color: #60a5fa; }
    .method.delete { background: rgba(239,68,68,.15);  color: #f87171; }
    .path  { font-family: 'Courier New', monospace; font-size: .88rem; color: var(--text); flex: 1; }
    .desc  { font-size: .82rem; color: var(--muted); }

    /* ── Footer ── */
    footer {
      padding: 32px 0;
      text-align: center;
      font-size: .82rem;
      color: var(--muted);
      border-top: 1px solid var(--border);
      width: 100%;
    }
    footer span { color: var(--purple); }
  </style>
</head>
<body>
  <div class="page">

    <!-- Nav -->
    <nav>
      <div class="logo">⬡ API</div>
      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#endpoints">Endpoints</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/health">Health</a></li>
      </ul>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="badge">
        <span class="badge-dot"></span>
        Premium Tier
      </div>

      <h1>
        <span class="grad">Your API is</span><br>
        <span class="grad">live &amp; ready.</span>
      </h1>

      <p class="subtitle">
        A blazing-fast, production-grade NestJS API — built to scale, secured by default,
        and deployed for you.
      </p>

      <div class="cta-group">
        <a href="/health" class="btn btn-primary">
          ⚡ Check Health
        </a>
        <a href="https://docs.nestjs.com" target="_blank" rel="noopener" class="btn btn-ghost">
          📖 Docs
        </a>
      </div>

      <div class="status-bar">
        <span class="status-dot"></span>
        All systems operational
        &nbsp;·&nbsp;
        Node.js ${process.version}
        &nbsp;·&nbsp;
        NestJS 12
      </div>
    </section>

    <!-- Feature cards -->
    <section id="features" class="cards">
      <div class="card" style="--card-glow: rgba(168,85,247,.12)">
        <div class="card-icon purple">⚡</div>
        <h3>Blazing Fast</h3>
        <p>Built on NestJS + Express with async-first patterns. Handles thousands of concurrent requests out of the box.</p>
        <div class="card-stat">
          <strong>&lt; 5ms</strong><br>avg. response time
        </div>
      </div>

      <div class="card" style="--card-glow: rgba(59,130,246,.12)">
        <div class="card-icon blue">🔒</div>
        <h3>Secure by Default</h3>
        <p>Runs as a non-root container user. Ready for HTTPS termination, CORS, and Helmet hardening.</p>
        <div class="card-stat">
          <strong>A+</strong><br>security posture
        </div>
      </div>

      <div class="card" style="--card-glow: rgba(34,211,238,.12)">
        <div class="card-icon cyan">📈</div>
        <h3>Cloud Native</h3>
        <p>Containerised, health-checked, and CI/CD ready. Deploys to Kubernetes with zero changes.</p>
        <div class="card-stat">
          <strong>∞</strong><br>horizontal scalability
        </div>
      </div>
    </section>

    <!-- Endpoints -->
    <section id="endpoints" class="endpoints">
      <h2>🗺️ Available Endpoints</h2>

      <div class="endpoint-row">
        <span class="method get">GET</span>
        <span class="path">/</span>
        <span class="desc">Premium welcome page</span>
      </div>
      <div class="endpoint-row">
        <span class="method get">GET</span>
        <span class="path">/about</span>
        <span class="desc">About Us — team, mission &amp; tech stack</span>
      </div>
      <div class="endpoint-row">
        <span class="method get">GET</span>
        <span class="path">/health</span>
        <span class="desc">Health check — status, uptime &amp; timestamp</span>
      </div>
    </section>

  </div>

  <footer>
    Built with <span>♥</span> using NestJS &amp; deployed on Kubernetes.
  </footer>
</body>
</html>`;
  }

  getAboutPage(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>About Us — API</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:        #07070f;
      --surface:   rgba(255,255,255,0.04);
      --border:    rgba(255,255,255,0.08);
      --purple:    #a855f7;
      --blue:      #3b82f6;
      --cyan:      #22d3ee;
      --text:      #f1f5f9;
      --muted:     #94a3b8;
      --radius:    16px;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: \'Segoe UI\', system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-x: hidden;
    }

    body::before {
      content: \'\';
      position: fixed; inset: 0;
      background-image:
        linear-gradient(rgba(168,85,247,.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(168,85,247,.06) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none; z-index: 0;
    }
    body::after {
      content: \'\';
      position: fixed; top: -20%; left: 50%; transform: translateX(-50%);
      width: 900px; height: 600px;
      background: radial-gradient(ellipse, rgba(168,85,247,.18) 0%, rgba(59,130,246,.10) 40%, transparent 70%);
      pointer-events: none; z-index: 0;
    }

    .page { position: relative; z-index: 1; width: 100%; max-width: 1100px; padding: 0 24px; }

    /* Nav */
    nav { display: flex; align-items: center; justify-content: space-between; padding: 28px 0; }
    .logo {
      font-size: 1.25rem; font-weight: 700; letter-spacing: -0.02em;
      background: linear-gradient(135deg, var(--purple), var(--blue));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .nav-links { display: flex; gap: 28px; list-style: none; }
    .nav-links a { color: var(--muted); text-decoration: none; font-size: .9rem; transition: color .2s; }
    .nav-links a:hover, .nav-links a.active { color: var(--text); }

    /* Hero */
    .hero { text-align: center; padding: 80px 0 60px; }
    .badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(168,85,247,.12); border: 1px solid rgba(168,85,247,.35);
      color: var(--purple); font-size: .78rem; font-weight: 600;
      letter-spacing: .08em; text-transform: uppercase;
      padding: 6px 16px; border-radius: 999px; margin-bottom: 32px;
    }
    .badge-dot {
      width: 6px; height: 6px; background: var(--purple); border-radius: 50%;
      box-shadow: 0 0 8px var(--purple); animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: .5; transform: scale(1.4); }
    }
    h1 {
      font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 800;
      letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 24px;
    }
    h1 .grad {
      background: linear-gradient(135deg, #fff 30%, var(--purple) 70%, var(--blue) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .subtitle { font-size: 1.1rem; color: var(--muted); max-width: 560px; margin: 0 auto; line-height: 1.75; }

    /* Section label */
    .section-label {
      font-size: .75rem; font-weight: 700; letter-spacing: .12em;
      text-transform: uppercase; color: var(--purple); margin-bottom: 12px;
    }
    .section-title { font-size: 1.6rem; font-weight: 800; margin-bottom: 16px; }
    .section-body  { color: var(--muted); line-height: 1.8; max-width: 680px; }

    /* Mission */
    .mission {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 48px; margin: 72px 0 0;
      display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
    }
    @media (max-width: 680px) { .mission { grid-template-columns: 1fr; } }
    .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .mission-stat { text-align: center; }
    .mission-stat .big {
      font-size: 3rem; font-weight: 900;
      background: linear-gradient(135deg, var(--purple), var(--blue));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .mission-stat .label { font-size: .85rem; color: var(--muted); margin-top: 6px; }

    /* Team cards */
    .team-section { padding: 80px 0 40px; }
    .team-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px; margin-top: 40px;
    }
    .team-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 32px;
      transition: border-color .25s, transform .25s; text-align: center;
    }
    .team-card:hover { border-color: rgba(168,85,247,.35); transform: translateY(-4px); }
    .avatar {
      width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 20px;
      display: flex; align-items: center; justify-content: center;
      font-size: 2rem; background: rgba(168,85,247,.12);
      border: 2px solid rgba(168,85,247,.3);
    }
    .team-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
    .team-card .role { font-size: .82rem; color: var(--purple); font-weight: 600; margin-bottom: 12px; }
    .team-card p { font-size: .85rem; color: var(--muted); line-height: 1.6; }

    /* Tech stack */
    .stack-section { padding: 40px 0 80px; }
    .stack-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 16px; margin-top: 40px;
    }
    .stack-item {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 12px; padding: 20px 16px; text-align: center;
      transition: border-color .25s;
    }
    .stack-item:hover { border-color: rgba(59,130,246,.4); }
    .stack-icon { font-size: 1.8rem; margin-bottom: 10px; }
    .stack-item h4 { font-size: .88rem; font-weight: 700; margin-bottom: 4px; }
    .stack-item p  { font-size: .78rem; color: var(--muted); }

    /* Footer */
    footer {
      padding: 32px 0; text-align: center;
      font-size: .82rem; color: var(--muted);
      border-top: 1px solid var(--border); width: 100%;
    }
    footer span { color: var(--purple); }
  </style>
</head>
<body>
  <div class="page">

    <!-- Nav -->
    <nav>
      <div class="logo">⬡ API</div>
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about" class="active">About</a></li>
        <li><a href="/health">Health</a></li>
      </ul>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="badge"><span class="badge-dot"></span> Our Story</div>
      <h1>
        <span class="grad">Built by engineers,</span><br>
        <span class="grad">for engineers.</span>
      </h1>
      <p class="subtitle">
        We believe great infrastructure should be invisible — fast, reliable, and out of your way
        so you can focus on what matters most: shipping features.
      </p>
    </section>

    <!-- Mission -->
    <div class="mission">
      <div>
        <div class="section-label">Our Mission</div>
        <div class="section-title">Simplify the path from code to production.</div>
        <p class="section-body">
          We build and maintain a production-grade NestJS API platform designed for teams
          who care about quality. Containerised from day one, GitOps-driven, and continuously
          delivered — this is the foundation you deserve.
        </p>
      </div>
      <div class="stats-grid">
        <div class="mission-stat">
          <div class="big">99.9%</div>
          <div class="label">Uptime SLA</div>
        </div>
        <div class="mission-stat">
          <div class="big">&lt;5ms</div>
          <div class="label">Avg. Latency</div>
        </div>
        <div class="mission-stat">
          <div class="big">0</div>
          <div class="label">Root Containers</div>
        </div>
        <div class="mission-stat">
          <div class="big">∞</div>
          <div class="label">Scalability</div>
        </div>
      </div>
    </div>

    <!-- Team -->
    <section class="team-section">
      <div class="section-label">The Team</div>
      <div class="section-title">Who\'s behind the API?</div>
      <div class="team-grid">
        <div class="team-card">
          <div class="avatar">🧑‍💻</div>
          <h3>Platform Engineering</h3>
          <div class="role">Infrastructure &amp; DevOps</div>
          <p>Designs the Kubernetes manifests, FluxCD pipelines, and GitHub Actions that keep everything running.</p>
        </div>
        <div class="team-card">
          <div class="avatar">🛠️</div>
          <h3>Backend Engineering</h3>
          <div class="role">API &amp; Services</div>
          <p>Builds the NestJS application layer — controllers, services, validation, and business logic.</p>
        </div>
        <div class="team-card">
          <div class="avatar">🔐</div>
          <h3>Security Engineering</h3>
          <div class="role">AppSec &amp; Compliance</div>
          <p>Runs Trivy image scans, static analysis, and enforces security policies across the entire delivery chain.</p>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="stack-section">
      <div class="section-label">Tech Stack</div>
      <div class="section-title">What powers this API?</div>
      <div class="stack-grid">
        <div class="stack-item"><div class="stack-icon">🐦</div><h4>NestJS 12</h4><p>Application framework</p></div>
        <div class="stack-item"><div class="stack-icon">🟦</div><h4>TypeScript 6</h4><p>Type-safe codebase</p></div>
        <div class="stack-item"><div class="stack-icon">🐳</div><h4>Docker</h4><p>Multi-stage builds</p></div>
        <div class="stack-item"><div class="stack-icon">☸️</div><h4>Kubernetes</h4><p>Container orchestration</p></div>
        <div class="stack-item"><div class="stack-icon">🔄</div><h4>FluxCD</h4><p>GitOps delivery</p></div>
        <div class="stack-item"><div class="stack-icon">⚡</div><h4>GitHub Actions</h4><p>CI / CD pipelines</p></div>
        <div class="stack-item"><div class="stack-icon">🛡️</div><h4>Trivy</h4><p>Security scanning</p></div>
        <div class="stack-item"><div class="stack-icon">🟢</div><h4>Node.js 22</h4><p>Runtime environment</p></div>
      </div>
    </section>

  </div>

  <footer>
    Built with <span>♥</span> using NestJS &amp; deployed on Kubernetes.
  </footer>
</body>
</html>`;
  }
}
