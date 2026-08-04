#!/usr/bin/env python3
"""Generate the CodeForge ULTRA PRO MAX Complete Learning Guide HTML."""

import os

OUTPUT_PATH = "/home/z/my-project/scripts/codeforge_guide.html"

def cover():
    return '''
<div class="cover">
        <div class="cover-layer-1" style="position:absolute; inset:0; overflow:hidden; z-index:1;">
            <div style="position:absolute; top:0; right:0; width:300px; height:300px; background:radial-gradient(circle, rgba(96,165,250,0.10) 0%, transparent 70%); border-radius:50%;"></div>
            <div style="position:absolute; bottom:0; left:0; width:250px; height:250px; background:radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%); border-radius:50%;"></div>
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:600px; height:600px; border:1px solid rgba(96,165,250,0.06); border-radius:50%;"></div>
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:450px; height:450px; border:1px solid rgba(96,165,250,0.04); border-radius:50%;"></div>
        </div>
        <div class="cover-layer-2" style="position:absolute; inset:0; z-index:2;">

        </div>
        <div class="cover-layer-3" style="position:absolute; inset:0; z-index:3; display:flex; flex-direction:column; justify-content:center; padding:0 65px;">
            <div style="font-size:11px; font-weight:500; letter-spacing:4px; text-transform:uppercase; color:var(--accent); margin-bottom:20px;">COMPLETE LEARNING GUIDE</div>
            <h1 style="font-family:\'Inter\',sans-serif; font-size:52px; font-weight:900; line-height:1.1; color:var(--text); margin:0 0 16px 0;">CodeForge<br>ULTRA PRO MAX</h1>
            <div style="width:50px; height:3px; background:var(--accent); margin-bottom:20px;"></div>
            <p style="font-size:16px; font-weight:300; line-height:1.7; color:var(--muted); max-width:420px; margin:0 0 30px 0;">A deep-dive phase-by-phase guide to building a production-grade developer learning ecosystem. Master Java, Spring Boot, React, Docker, AI/ML, and system design by constructing the platform itself.</p>
            <div style="font-size:12px; color:var(--muted); letter-spacing:1px;">BASED ON THE COMPLETE PRD &middot; 6 PHASES &middot; 28 WEEKS &middot; EVERY TECHNOLOGY EXPLAINED</div>
        </div>
    </div>
'''

def chapter_tag(tag):
    return f'<div class="chapter-tag">{tag}</div>'

def chapter_title(title):
    return f'<h2 class="chapter-title">{title}</h2>'

def divider():
    return '<div class="divider"></div>'

def para(text):
    return f'<p class="body-text">{text}</p>'

def heading3(text):
    return f'<h3 class="h3">{text}</h3>'

def heading4(text):
    return f'<h4 class="h4">{text}</h4>'

def tech_card(title, items):
    """Create a card listing technologies/concepts."""
    items_html = "".join(f"<li>{item}</li>" for item in items)
    return f'''<div class="card">
        <div class="card-title">{title}</div>
        <ul class="card-list">{items_html}</ul>
    </div>'''

def key_concept(title, explanation):
    return f'''<div class="callout">
        <div class="callout-title">{title}</div>
        <div class="callout-body">{explanation}</div>
    </div>'''

def build_document():
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
@page {{
    size: 720px 1020px;
    margin: 0;
}}
:root {{
    --bg: #0f111a;
    --bg2: #161925;
    --card: #1a1d2e;
    --card2: #1f2337;
    --border: #2a2f45;
    --border2: #353b54;
    --text: #e2e8f0;
    --text2: #cbd5e1;
    --muted: #94a3b8;
    --dim: #64748b;
    --accent: #60a5fa;
    --accent2: #34d399;
    --accent3: #a78bfa;
    --warn: #fbbf24;
    --err: #f87171;
    --font-sans: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --font-serif: 'Playfair Display', serif;
}}
html, body {{
    margin: 0;
    padding: 0;
    width: 720px;
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
}}
@media screen {{
    html {{ height: auto; display: flex; justify-content: center; background: #080a10; }}
    body {{ transform-origin: top center; margin: 20px auto; }}
}}
.cover {{
    width: 720px;
    height: 1020px;
    box-sizing: border-box;
    break-after: page;
    overflow: hidden;
}}
.main-content {{
    padding: 50px 55px 40px 55px;
}}
.chapter-tag {{
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 8px;
    break-after: avoid;
}}
.chapter-title {{
    font-size: 28px;
    font-weight: 800;
    color: var(--text);
    margin: 0 0 6px 0;
    line-height: 1.2;
    break-after: avoid;
}}
.chapter-header {{
    break-after: avoid;
    break-inside: avoid;
    margin-top: 36px;
}}
.divider {{
    width: 40px;
    height: 2px;
    background: var(--accent);
    margin: 12px 0 18px 0;
}}
.body-text {{
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1.75;
    color: var(--text2);
    margin: 0 0 14px 0;
}}
.h3 {{
    font-size: 17px;
    font-weight: 700;
    color: var(--text);
    margin: 24px 0 8px 0;
    break-after: avoid;
}}
.h4 {{
    font-size: 14px;
    font-weight: 600;
    color: var(--accent);
    margin: 16px 0 6px 0;
    break-after: avoid;
}}
.card {{
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px 18px;
    margin-bottom: 12px;
    break-inside: avoid;
}}
.card-title {{
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--accent2);
    margin-bottom: 8px;
}}
.card-list {{
    margin: 0;
    padding-left: 16px;
    font-size: 13px;
    color: var(--text2);
    line-height: 1.7;
}}
.card-list li {{ margin-bottom: 3px; }}
.callout {{
    background: rgba(96,165,250,0.06);
    border-left: 3px solid var(--accent);
    border-radius: 0 6px 6px 0;
    padding: 14px 16px;
    margin: 14px 0;
    break-inside: avoid;
}}
.callout-title {{
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 4px;
}}
.callout-body {{
    font-size: 13px;
    color: var(--text2);
    line-height: 1.65;
}}
.phase-badge {{
    display: inline-block;
    background: rgba(96,165,250,0.1);
    color: var(--accent);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 3px 10px;
    border-radius: 4px;
    margin-bottom: 10px;
}}
.two-col {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 10px 0;
}}
.milestone {{
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 10px;
    break-inside: avoid;
}}
.milestone-dot {{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    margin-top: 5px;
    flex-shrink: 0;
}}
.milestone-text {{
    font-size: 13px;
    color: var(--text2);
    line-height: 1.6;
}}
.milestone-label {{
    font-weight: 600;
    color: var(--text);
}}
.table-wrap {{
    margin: 12px 0;
    break-inside: avoid;
}}
table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
}}
th {{
    background: var(--card);
    color: var(--text);
    font-weight: 600;
    text-align: left;
    padding: 8px 10px;
    border-bottom: 1px solid var(--border);
}}
td {{
    padding: 7px 10px;
    border-bottom: 1px solid var(--border);
    color: var(--text2);
    vertical-align: top;
}}
tr:nth-child(even) td {{ background: rgba(255,255,255,0.02); }}
.code-inline {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    background: var(--card);
    padding: 1px 6px;
    border-radius: 3px;
    color: var(--accent2);
}}
.ending {{
    width: 720px;
    height: 1020px;
    box-sizing: border-box;
    break-before: page;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 80px;
    background: var(--bg);
}}
</style>
</head>
<body>
{cover()}
<div class="main-content">

{chapter_header("INTRODUCTION", "The Build-to-Learn Philosophy")}

{para("CodeForge ULTRA PRO MAX is not merely a product specification. It is a meticulously crafted curriculum disguised as a software project. Every feature described in this 932-line PRD represents a concrete learning opportunity, a real-world problem to solve, and a technology to master. The guiding philosophy is elegantly simple: <em>the best way to learn something is to build something that requires it.</em> By the time you complete this project, you will not just know Java, Spring Boot, React, Docker, PostgreSQL, Redis, and AI/ML integration in theory. You will have proven your mastery by building a production-grade system that uses all of them together.")}

{para("This learning guide is organized as a phase-by-phase deep dive into the CodeForge PRD. For each phase, you will find detailed explanations of every subsystem, the technologies and concepts you need to understand, the architectural decisions and their rationale, implementation approaches, and the specific skills you will gain. Think of this guide as your personal instructor, walking you through each module of the project and explaining not just the \"what\" but the crucial \"why\" behind every design choice.")}

{para("The platform spans six development phases across approximately 28 weeks, covering authentication, content management, in-browser code execution, gamification, AI/ML curriculum delivery, AI-powered tutoring, community features, and production-hardening. The technology stack includes Java 21 with Spring Boot on the backend, React with TypeScript on the frontend, PostgreSQL for relational data, Redis for caching and real-time features, Docker for sandboxed code execution, and Claude API for AI-powered features. Each of these technologies serves a specific, well-justified purpose in the architecture.")}

{heading3("Who Is This Guide For?")}

{para("This guide is written for developers who learn best by building. Specifically, it targets developers with some existing programming experience (the primary persona is a PHP/MySQL developer transitioning to the Java ecosystem) who want to achieve production-grade proficiency across the full stack. Whether you are a career switcher looking for structured, project-based learning, a CS student who understands theory but lacks practical experience, or a working developer who has hit a plateau and wants to break through to senior-level thinking, this guide provides the roadmap. Every concept is explained with enough depth that you understand both the mechanism and the motivation behind it.")}

{heading3("Core Design Principles")}

{para("Before diving into the technical architecture, it is essential to understand the eight design principles that govern every feature decision in CodeForge. These principles are not abstract ideals. They are concrete filters applied to every feature proposal, and they are what separate CodeForge from the hundreds of generic learning platforms that already exist.")}

{tech_card("Design Principles at a Glance", [
"<strong>Consequence-Driven Learning</strong> - Every action has a visible, felt outcome, good or bad. No passive reading without stakes.",
"<strong>Infinite Freshness</strong> - AI generates new problems, scenarios, and projects daily. Content never gets stale.",
"<strong>Cognitive Flow State</strong> - Difficulty auto-adjusts to keep users in the zone between bored and anxious.",
"<strong>Real-World Simulation</strong> - Exercises mimic actual production scenarios, not toy \"hello world\" problems.",
"<strong>Social by Default</strong> - Even solo learners feel the presence of others through activity feeds and ghosts.",
"<strong>Zero Wasted Time</strong> - Every second on the platform builds skill. No filler, no busywork.",
"<strong>Visible Growth</strong> - Progress is tangible through graphs, stats, comparisons, and built artifacts.",
"<strong>Delight in Details</strong> - Micro-animations, sound design, haptic feedback, and easter eggs."
])}

{para("These principles directly inform the technical architecture. For example, \"Cognitive Flow State\" requires the adaptive path engine to maintain a complex scoring model per lesson, tracking accuracy, time taken, hints used, and attempt count. \"Real-World Simulation\" dictates that every exercise must be framed within a realistic scenario rather than taught in isolation. \"Zero Wasted Time\" means the UI must be optimized for speed, with a first-contentful-paint target under 1.5 seconds. Understanding these principles makes every subsequent technical decision make logical sense.")}

{chapter_header("PHASE 1", "The Foundation (Weeks 1-8)")}

{para("Phase 1 is the backbone of the entire platform. Its goal is deceptively simple: create a deployed, usable system where a user can sign up, learn, write code in the browser, and get graded on their work. Achieving this end-to-end flow requires building an authentication system, a content management engine, an in-browser IDE, an auto-grading exercise engine, a progress tracking dashboard, and a Docker-based code execution sandbox. This phase alone covers a massive swath of modern software engineering, and by the time you complete it, you will have built more infrastructure than many production applications require.")}

{heading3("1.1 Authentication and Identity System")}

{para("The authentication system in CodeForge goes far beyond a simple login form. It implements passkey-first authentication using WebAuthn and FIDO2 standards, meaning the primary login method requires no password at all. This is a cutting-edge approach that most production applications have not yet adopted, making it an excellent learning opportunity. The system supports five authentication methods: Passkey-First (WebAuthn/FIDO2), Password plus TOTP as a traditional fallback, Magic Link for passwordless email login, OAuth2/OIDC for GitHub, Google, and Discord integration, and Biometric WebAuthn for fingerprint and face recognition on supported devices.")}

{para("What makes this system genuinely interesting is the Adaptive Risk Engine. Every request is evaluated with a risk score computed from multiple signals: device fingerprinting detects unknown devices and triggers step-up authentication; geographic anomaly detection identifies impossible travel patterns (a login from Mumbai followed by one from New York thirty minutes later) and instantly locks the account with an email alert; time-of-day anomaly detection flags logins at unusual hours based on the user's historical patterns; and behavioral biometrics establish a baseline of typing cadence and mouse movement patterns stored as a fuzzy hash. The risk score follows a four-tier model: LOW allows the request, MEDIUM logs it, HIGH requires multi-factor authentication, and CRITICAL denies access entirely and triggers an alert. Every decision is recorded in an immutable audit trail, which is itself a valuable exercise in compliance-oriented data design.")}

{key_concept("Session Management Deep Dive",
"Session management uses JWT access tokens with a 15-minute TTL paired with rotating refresh tokens that have a 7-day TTL and are single-use. Token binding to device fingerprints means that even if a token is stolen, it becomes useless on a different device. The system supports concurrent session control, allowing users to see and terminate all active sessions, and includes a \"Kill Switch\" for one-click revocation of all sessions across all devices. A session heatmap provides users with a visual map of their login locations over the past month. The role hierarchy follows a strict chain: SUPER_ADMIN, ADMIN, MODERATOR, MENTOR, LEARNER, and GUEST, with permission granularity that goes beyond simple role checks. For example, a mentor might have permission to \"edit lessons in paths where they are assigned as mentor,\" not a blanket editing privilege. Role assignments are logged with who assigned what, when, and why.")}

{heading3("1.2 Living Learning Paths")}

{para("The learning path system is one of the most architecturally sophisticated components of CodeForge. Rather than a simple linear list of lessons, each path is structured as a Directed Acyclic Graph (DAG). This means that after completing \"Java Fundamentals,\" a user can simultaneously pursue \"Spring Boot\" and \"DSA,\" or choose just one. Prerequisite enforcement works through graph traversal: a user cannot access a node until all parent nodes are completed or challenge-passed. This graph-based approach is far more flexible than linear progression and mirrors how real-world skill development actually works, where multiple skills can be developed in parallel.")}

{para("The Adaptive Path Engine is where the system becomes genuinely intelligent. It maintains a performance score for every lesson based on four dimensions: accuracy, time taken, hints used, and attempts. When a user scores below 60% on a topic like \"Collections,\" the engine automatically injects two to three remedial lessons to address the weakness. Conversely, when a user scores above 95% on \"OOP Basics,\" the next related lesson is marked as \"challenge available: pass to skip,\" allowing fast-forwarding through material the user already knows. The result is path morphing: the path shape changes per user, and no two users see an identical path sequence. Every lesson offers three difficulty tiers that users can switch between at any time: \"Explain Like I'm 5\" with analogies and visual diagrams, \"Standard\" with normal technical explanations, and \"Expert\" with minimal explanation, no hints, harder test cases, and time limits.")}

{para("A particularly innovative feature is the Real-World Context Wrapper. Every lesson is framed inside a realistic scenario rather than taught in isolation. For example, \"HashMap\" is not taught as \"a key-value data structure\" but as \"You're building a session store for 10 million users and need O(1) lookups.\" \"Spring Security\" is not \"add this dependency\" but \"Your API is getting DDoS'd and someone is scraping user data: fix it.\" This context-first approach eliminates the common learner complaint of \"but when will I use this?\" by making the relevance undeniable from the start. Path versioning ensures every path has a semantic version number with a visible changelog, and users can continue on their current version or migrate to a newer one with a diff shown.")}

{heading3("1.3 In-Browser Development Environment")}

{para("The in-browser IDE is the heart of the CodeForge learning experience. It embeds Monaco Editor, which is the same engine that powers VS Code, directly into the browser. This gives users full Java IntelliSense including autocomplete, parameter hints, method signatures, and quick fixes. The editor supports multi-file projects with a complete project tree showing packages, resources, and test folders. It ships with over twenty built-in themes including One Dark, Dracula, and Solarized, plus a custom theme builder. Font selection supports ligature fonts like Fira Code and JetBrains Mono, and the editor includes minimap navigation, breadcrumb trails, sticky scroll, multi-cursor editing, regex find and replace, and bracket matching.")}

{para("The integrated debugger runs entirely in the browser via a WebSocket connection to a sandboxed JVM. Users can set breakpoints by clicking line numbers, step over, step into, step out, and continue execution. A variable inspection panel shows the current state of all variables at a breakpoint, watch expressions allow monitoring custom expressions, and conditional breakpoints support rules like \"break only when i > 100.\" The call stack is visualized in real time. A built-in terminal emulator using xterm.js connects directly to the sandbox container, pre-configured with javac, java, mvn, gradle, git, curl, ps, and top. Terminal sessions persist within a lesson, so users do not lose state on page refresh. Full git workflow is supported inside the browser, including init, add, commit, branch, merge, rebase, log, diff, and stash, with a visual diff viewer and branch visualization graph.")}

{key_concept("Session Persistence and Time Travel",
"All open files, unsaved changes, terminal history, and cursor positions are saved to the server. If a user closes their laptop and opens it the next day, they resume exactly where they left off. The most remarkable feature is Time Travel: a slider at the bottom of the editor lets users rewind to any point in their current session's keystroke history, similar to a version control system but at the character level. This is implemented by recording every keystroke as a timestamped event and replaying them in reverse. The layout system supports resizable panes for File Explorer, Editor, Output, and Context Panel, with pre-set layouts for \"Coding Focus,\" \"Lesson Side-by-Side,\" \"Debug Mode,\" and \"Collab Mode.\" Users can save custom layouts, and each layout remembers its state per lesson.")}

{heading3("1.4 Auto-Graded Exercise Engine")}

{para("The exercise engine supports eight distinct exercise types, each with a different grading method. <strong>Code Output</strong> exercises ask users to produce exact output, graded via string match with regex tolerance. <strong>Unit Test</strong> exercises require implementing a method to pass a JUnit test suite. <strong>Code Repair</strong> exercises present buggy code and ask users to find and fix a specific number of bugs, graded by diff comparison against a known fix. <strong>Architecture</strong> exercises ask users to design class structures for scenarios, graded by structural comparison of classes, relationships, and design patterns. <strong>SQL Query</strong> exercises require writing queries that return a specific result set, verified by result set comparison and execution plan checking. <strong>Fill in the Blank</strong> exercises use AST-level comparison of the filled portion. <strong>Refactoring</strong> exercises require improving code without changing behavior, verified by behavior preservation tests and code quality metrics. <strong>Debug Challenge</strong> exercises present crashing code and ask users to identify the root cause.")}

{para("The test case architecture separates public and hidden test cases. Public tests are visible to the user, while hidden tests are revealed only after submission. Hidden tests cover edge cases, large inputs, null inputs, concurrent access, and error conditions. Test cases are tagged with categories like @Smoke, @EdgeCase, @Performance, @Concurrency, and @Security. After passing, users see which hidden tests existed (but not their code), creating a learning-through-test-discovery experience. After failing, users see which test category failed without the exact test being revealed. The feedback system provides instant pass/fail results with execution time and memory usage. Failure hints follow a progressive disclosure model: first failure shows a category hint, second failure shows a specific hint, and third failure reveals a partial solution. Performance feedback might say \"Correct, but your solution is O(n<sup>2</sup>). Can you do O(n)?\" Style feedback offers non-blocking suggestions like \"Consider using Stream API here.\" Community comparison shows \"Your solution used 15 lines. The community median is 8 lines.\"")}

{heading3("1.5 Content Authoring System")}

{para("The admin panel provides a complete content management system built around Markdown-based authoring with live preview. It supports custom extensions including code blocks with language tagging, callout boxes (warning, tip, info, danger), collapsible sections, tabbed content, and interactive diagrams. The exercise builder lets authors write a Java method signature, write JUnit test cases, define hints, set difficulty, and publish, all within the same interface. A critical feature is the \"Test against reference solution\" button, which validates that the test cases correctly pass the reference solution, catching broken test cases before they reach learners. Exercise versioning means that if test cases are updated, all previous submissions are automatically re-graded. Content analytics track per-lesson completion rates, average scores, average time, and drop-off points, as well as per-exercise pass rates, hint usage rates, average attempts, and most common failure categories. A \"content rot\" detection system flags exercises where the pass rate suddenly drops, suggesting a possible broken test case.")}

{heading3("1.6 Progress Tracking Dashboard")}

{para("The progress dashboard provides rich visual feedback across multiple dimensions. Per-path progress rings show circular progress bars with percentages, module-level progress bars break down each path, and lesson-level checkmarks track status from not started through in progress, completed, and mastered. \"Mastered\" status requires completing a lesson, scoring above 90%, not using hints, and completing within a time threshold. Activity metrics include total time spent (today, this week, this month, all time), code lines written, exercises completed with pass rates, and a GitHub-style streak calendar with green squares. The system distinguishes between active learning time and idle time by tracking whether the browser tab has focus.")}

{para("A skill radar chart displays skill levels across eight dimensions: OOP, Collections, Concurrency, SQL, Spring, Testing, DSA, and AI/ML. Skills are auto-calculated from exercise performance in tagged categories, with visual gap analysis highlighting lagging areas. A learning velocity graph shows lessons completed per week, predicting completion dates for the current path based on velocity trends. This requires time-series data storage and trend analysis, which is why the architecture includes TimescaleDB as a PostgreSQL extension for time-series data.")}

{heading3("1.7 Code Execution Sandbox")}

{para("The sandbox is one of the most security-critical components of the entire system. Each code execution spawns an isolated Docker container with strict resource limits: 512MB RAM, 1 CPU core, 10-second execution timeout, and 50MB disk. Network access is completely disabled, and the container has no access to the host filesystem. A container pool for warm starts pre-spawns containers to reduce cold-start latency to under 500 milliseconds. Containers are recycled after each execution to prevent state leakage between runs. The execution flow works as follows: the user clicks Run, the code plus dependencies are sent to the execution service, a container is selected from the pool, the code is compiled and executed, stdout and stderr are captured, the container is killed or recycled, and results are sent back via WebSocket. For debugging sessions, the container stays alive with a persistent WebSocket connection for breakpoint interactions.")}

{key_concept("Sandbox Security (Defense in Depth)",
"Security follows a defense-in-depth model with multiple independent layers. A seccomp profile restricts system calls, blocking fork, execve, mount, ptrace, and keyctl. The gVisor runtime option provides kernel-level isolation as an additional layer. Containers run with a non-root user, resource limits are enforced at the Docker level (not just the application level), and container escape monitoring alerts if any container attempts unexpected syscalls. Execution logs are retained for 7 days for debugging purposes. Rate limiting caps users at 60 executions per hour and 10 submissions per minute per exercise. Anti-cheat measures include MOSS-style code similarity detection across all submissions, copy-paste logging, and time anomaly detection that flags solutions submitted in suspiciously short time.")}

{chapter_header("PHASE 2", "Gamification and Engagement Engine (Weeks 9-12)")}

{para("Phase 2 transforms CodeForge from a functional learning platform into an genuinely addictive experience. The goal is not fake gamification with meaningless points, but meaningful progression that taps into both intrinsic and extrinsic motivation. This phase implements the XP and leveling system, badges and achievements, daily and weekly engagement systems, leaderboards, spaced repetition quizzes, and sound and visual feedback. The psychological principles at work here are well-established: variable ratio schedules of reinforcement (you do not know exactly how much XP you will earn), social comparison (leaderboards), loss aversion (streak mechanics), and the Zeigarnik effect (incomplete tasks nag at you until completed).")}

{heading3("2.1 XP and Leveling System")}

{para("The XP system assigns experience points to every meaningful action on the platform, with carefully calibrated amounts that reward the behaviors you want to encourage. Completing a lesson earns 10 XP, but only if the user scrolls to the bottom and spends a minimum amount of time (preventing gaming the system). Passing an exercise on the first attempt without hints earns 50 XP, on the second attempt 35 XP, and on the third or later 20 XP. This steep decay incentivizes getting it right the first time. Completing an exercise in Expert mode applies a 2x multiplier, and completing under the time limit applies a 1.5x multiplier. These multipliers stack, so an Expert-mode first-attempt pass under the time limit earns 150 XP. Finding a bug in platform content earns 100 XP (incentivizing community quality control), and helping another user in the forum earns 25 XP when the answer is marked helpful.")}

{para("The level curve is designed to create a fast early progression that slows over time, following the classic RPG pattern. Levels 1 through 10 require 100 XP per level (about 2-4 days of light use), providing frequent dopamine hits that establish the habit. Levels 11 through 25 require 250 XP per level. Levels 26 through 50 require 500 XP per level. Levels 51 through 100 require 1000 XP per level. Reaching Level 100 requires approximately 65,000 XP, which at a moderate pace of daily use takes roughly six to nine months. Each level unlocks specific features: Level 3 enables custom avatar upload, Level 5 unlocks Expert Mode difficulty, Level 8 grants access to Daily Challenges, Level 10 allows forum posting, Level 15 opens the Project Sandbox, Level 25 makes users eligible for the Mentor role, and Level 30 unlocks AI/ML tracks.")}

{heading3("2.2 Badges and Achievements")}

{para("The badge system covers nine categories, each targeting a different user behavior. Streak badges reward consecutive daily activity (7-Day, 30-Day, 100-Day, and the legendary \"Unbreakable\" at 365 days). Skill badges like \"Collections Master\" and \"Concurrency King\" require scoring above 90% on all exercises in a category. Speed badges reward fast completion. Perfection badges require 100% first-attempt pass rates across an entire module or path. Exploration badges encourage trying multiple paths. Community badges reward helping others. Secret badges are hidden easter eggs with undiscovered triggers. Project badges mark completion of major projects. Grind badges are total exercise count milestones (\"Century\" at 100, \"Kilobyte\" at 1000). Time-based badges like \"Night Owl\" reward activity at unusual hours.")}

{para("Badge display uses a rarity system (Common, Rare, Epic, Legendary, Mythic) with animated card effects. Legendary badges have particle effects. A \"Badge of the Day\" spotlight appears on the homepage, and progress tracking shows messages like \"You're 3 away from 30-Day Streak: don't break it!\" This combination of collection mechanics, progress visibility, and social display creates a powerful compulsion loop.")}

{heading3("2.3 Daily and Weekly Engagement Systems")}

{para("The Daily Challenge is a single challenge available for 24 hours only, set at a difficulty slightly above the user's current level (the zone of proximal development). Types rotate between code, debug, SQL, and architecture challenges. It awards 75 XP with a streak multiplier that increases from 1x on day one to 2x on day seven and 3x on day thirty. The streak system itself includes a freeze mechanic (earn one freeze per week to protect your streak for one missed day) and a recovery mechanic (if your streak breaks, complete a hard problem to restore half of it). Streak-at-risk notifications fire at 8 PM if the user has not done anything that day, following a \"nudge, not nag\" philosophy with a maximum of two notifications per day.")}

{heading3("2.4 Leaderboard System")}

{para("Leaderboards come in six types: Daily Challenge (resets daily, global scope), Weekly XP (resets Monday, global plus friends), All-Time XP (cumulative, global plus friends), Per-Path (cumulative, everyone who started that path), Streak (current active streak, global), and First Attempt Rate (percentage, global with a minimum of 50 exercises to qualify). The system includes a \"Friends\" filter that only shows people you have added, reducing intimidation. A \"Near Me\" view shows the three people directly above and below you, creating motivating but not overwhelming social comparison. Animated rank changes show you moving up when you pass someone, and a historical rank graph shows your trajectory over time. Users can opt out entirely if they genuinely dislike leaderboards.")}

{heading3("2.5 Spaced Repetition Quiz Engine")}

{para("Every completed lesson automatically generates three to five quiz cards using AI. These cards are scheduled for review using a modified SM-2 algorithm, the same algorithm that powers Anki. The review schedule follows an expanding interval pattern: 1 day after learning, then 3 days, 7 days, 14 days, 30 days, and continuing with increasing intervals. If the user fails a review, the interval resets to the beginning. Due reviews appear as a badge count on the main navigation. Quiz formats include multiple choice (single and multiple answer), code output prediction, fill in the blank, true/false with explanation required for wrong answers, and concept-matching exercises. Review sessions are capped at 10 minutes or 20 cards, whichever comes first, preventing fatigue.")}

{chapter_header("PHASE 3", "AI/ML Learning Tracks (Weeks 13-17)")}

{para("Phase 3 introduces the curriculum content for learning artificial intelligence and machine learning, taught entirely in Java (with an optional Python bridge). This is a deliberate and unusual choice: most ML education is Python-centric, but CodeForge's primary audience is Java developers. By teaching ML in Java using libraries like Weka, Smile, and DeepLearning4J, the platform reinforces Java skills while adding AI/ML capabilities, making learners more valuable in enterprise environments where Java is the dominant language.")}

{heading3("3.1 Java-Native AI/ML Curriculum")}

{para("The curriculum is structured in five progressive modules. The first is a Math Refresher for ML, covering linear algebra (vectors, matrices, and operations using the EJML library for pure Java), calculus essentials (derivatives and gradients, taught visually rather than proof-heavy), and probability and statistics (distributions, Bayes theorem, and p-values). Every concept includes a hands-on coding exercise, such as implementing matrix multiplication from scratch and then comparing performance with EJML.")}

{para("The second module covers Classical ML with Weka, including loading and exploring datasets in ARFF and CSV formats, data preprocessing (normalization, missing value handling, feature selection), supervised learning algorithms (Decision Trees, Random Forest, Naive Bayes, SVM), unsupervised learning (K-Means, Hierarchical Clustering), and evaluation techniques (cross-validation, confusion matrix, precision/recall/F1). The capstone project is building a loan approval classifier using a real Kaggle dataset.")}

{para("The third module advances to ML with Smile (Statistical Machine Intelligence and Learning Engine), covering regression (Linear, Ridge, Lasso, Polynomial), classification (Logistic Regression, Gradient Boosted Trees, basic Neural Networks), feature engineering (PCA, t-SNE visualization), and model comparison using statistical tests. The capstone project is a house price prediction system with a model comparison dashboard.")}

{para("The fourth module tackles Deep Learning with DeepLearning4J (DL4J), starting with neural network fundamentals (perceptron, activation functions, backpropagation), building networks with DL4J's MultiLayerNetwork and ComputationGraph APIs, constructing CNNs for image classification (building a digit recognizer on MNIST), building RNNs/LSTMs for sequence data (text generation), and transfer learning with pre-trained models. The capstone is a fashion item classifier using CNN on Fashion-MNIST.")}

{para("The fifth module covers Model Evaluation and Visualization, including confusion matrix heatmaps rendered in-browser using D3.js or Chart.js, accuracy and loss curves over training epochs, ROC curves and AUC calculation, learning curve analysis for bias versus variance diagnosis, and feature importance visualization. All visualizations are auto-generated when a user submits a trained model, providing immediate visual feedback on model performance.")}

{heading3("3.2 LLM Integration Track")}

{para("The LLM track is perhaps the most immediately career-relevant section of the entire curriculum. It covers understanding LLMs conceptually (tokens, context windows, temperature, top-p), API calling from Java using the HTTP client with authentication and request/response handling, prompt engineering (system prompts, few-shot, chain-of-thought, structured output), building a chatbot with conversation history management and streaming responses, RAG (Retrieval-Augmented Generation) with embedding generation, vector storage, similarity search, and context injection, vector databases using pgvector (a PostgreSQL extension), agent building with tool-use patterns, function calling, and multi-step reasoning. The capstone project is building a Code Documentation Generator that takes Java code as input and produces Markdown documentation.")}

{key_concept("LLM Playground",
"The LLM playground provides a sandbox environment pre-configured with an API key that is rate-limited per user. It includes a built-in prompt testing interface where users write a prompt, see the response, and iterate. Prompt versioning lets users save and compare prompt variants. Token usage tracking shows estimates like \"This prompt used 450 tokens. Cost estimate: $0.002.\" A response quality self-assessment (\"Did this response answer your question? Yes/No/Partial\") feeds into prompt improvement suggestions, creating a feedback loop that teaches prompt engineering through guided experimentation.")}

{chapter_header("PHASE 4", "AI-Powered Learning Assistant (Weeks 17-20)")}

{para("Phase 4 transforms CodeForge from a self-paced learning platform into an adaptive, AI-mentored experience. Every user gains access to a 24/7 AI code reviewer, tutor, pair programmer, and study planner. This phase is where the Claude API integration becomes central to the platform's value proposition, and it requires careful prompt engineering, context management, and guardrail design to ensure the AI enhances learning rather than bypassing it.")}

{heading3("4.1 AI Code Reviewer")}

{para("After any exercise submission (whether the user passed or failed), they can click \"AI Review\" to receive a structured code review. The system sends the user's code to the Claude API along with a structured prompt that includes the exercise description, test cases, the user's code, and the reference solution. The AI returns a structured review following a specific order: Bugs first, then Style Issues, Performance concerns, Better Approaches, and always ending with Praise. This order is deliberate: it addresses the most critical issues first while ensuring the review ends on a positive note. Review categories include Correctness (logic errors, off-by-one, null handling), Performance (time complexity, unnecessary iterations, memory allocation), Java Idioms (proper use of streams, try-with-resources, boxing/unboxing), Naming, Structure (method length, class responsibility, coupling), Security (SQL injection, hardcoded secrets, unsafe deserialization), and Best Practices (SOLID, DRY, null checks). Reviews are presented as inline annotations on code, similar to GitHub PR review comments, with an overall 1-to-5 star score.")}

{heading3("4.2 AI Tutor Chatbot")}

{para("The AI tutor is embedded in every lesson and exercise page, and it automatically receives the current lesson content, the user's code, test results, error messages, skill level, and learning history. This means the user never needs to re-explain context. Asking \"Why did my test fail?\" already carries with it the knowledge of which test failed and what the user's code looks like. The tutor operates in five modes. Socratic mode (the default) asks guiding questions instead of giving answers. Direct mode (triggered by \"just tell me\" or after three failed Socratic attempts) provides straightforward answers. Visual mode (triggered by \"show me\") generates Mermaid diagrams and ASCII art. Analogy mode (triggered by \"explain like I'm 5\") uses real-world analogies. Challenge mode (triggered when the user seems confident) offers harder variations.")}

{para("The guardrails are critical to the learning mission. The AI will never write the complete exercise solution, as that would violate the learning purpose. It can give hints, explain concepts, point to documentation, and show similar but different examples. If a user repeatedly asks for direct answers, the AI gently redirects: \"I could tell you, but you'll remember 10x better if you figure it out. Here's a hint.\" Conversation history is persisted per lesson, with the ability to pin important messages and export conversations as Markdown notes. The AI also proactively suggests practice sets based on observed weaknesses.")}

{heading3("4.3 AI Pair Programmer and Personalized Paths")}

{para("The AI Pair Programmer is an educational twist on GitHub Copilot. When toggled on, it observes the user's code as they type and offers suggestions via inline ghost text, but with an educational difference: each suggestion includes an explanation tooltip on hover. For example, \"Suggestion: Use var here (Java 10+). Reason: Type is obvious from right side, reduces clutter.\" The user can accept with Tab, reject with Escape, or ask \"Why?\" to open a contextual chat. Four modes are available: Silent (suggests only after 5+ seconds of pause), Active (suggests as you type), Challenge (AI writes code with intentionally inserted bugs for the user to find), and Reverse (user describes in English, AI writes it, user studies the output).")}

{para("The Personalized Learning Path Generator performs a comprehensive skill gap analysis by examining all exercise scores, quiz review performance, time spent per topic, and hint usage patterns. It generates a skill map with confidence levels (Strong, Adequate, Weak, Gap) and produces a natural language report. Based on this analysis plus the user's goal (backend developer, AI/ML engineer, interview preparation), the AI generates a custom weekly plan that updates based on new performance data. The \"What Should I Do Next?\" button considers streak status, due reviews, time of day, inferred energy level, and upcoming deadlines to recommend the single best next action.")}

{chapter_header("PHASE 5", "Community and Social Layer (Weeks 21-23)")}

{para("Phase 5 recognizes that learning is fundamentally a social activity. Even solo learners should feel connected to others. This phase implements per-lesson discussion threads, live collaborative pair programming, project showcases with portfolio generation, peer code review, and a mentorship system. The technical challenges here are substantial: real-time collaboration requires CRDT-based conflict-free editing, WebRTC for voice chat, and sophisticated matching algorithms for pairing users at similar skill levels.")}

{heading3("5.1 Discussion and Collaboration")}

{para("Every lesson and exercise has a dedicated discussion thread supporting five post types: Question, Show and Tell, Confusion, Tip, and Bug Report. Threads are sorted by Most Recent, Most Helpful, or Unanswered (to surface questions that need answers). An AI Forum Assistant scans new questions before they are posted: if it finds an existing thread that answers the question, it suggests checking there first. If it can answer directly, it provides the answer and asks if the user still wants to post. This reduces duplicate questions without blocking genuine ones. Live pair programming sessions match users at similar skill levels working on the same lesson, with a real-time collaborative editor (CRDT-based), optional voice chat via WebRTC, Driver/Navigator role swapping, and session recording for later review.")}

{heading3("5.2 Project Showcase and Peer Review")}

{para("Completed projects get a showcase page with description, code or GitHub link, screenshots, AI evaluation summary, and badges earned. The community can upvote showcases, and featured projects appear on the homepage. A \"Remix\" button lets anyone fork a project into their own sandbox and modify it. GitHub integration imports repositories automatically, verifies project authorship through commit history analysis, and syncs the GitHub contribution graph with CodeForge activity. The peer code review system matches users who opt in with two to three anonymous reviewers. Each reviewer receives the project code, a rubric covering Correctness, Code Quality, Documentation, Creativity, and Testing, and a guided review form. Reviewers earn XP for completing reviews, and reviewee ratings of helpfulness determine future review assignment frequency.")}

{chapter_header("PHASE 6", "Advanced Systems and Polish (Weeks 24-28)")}

{para("The final phase elevates CodeForge from a functional application to a production-grade product. This phase covers notifications, advanced analytics, offline and low-bandwidth mode, accessibility (WCAG 2.1 AA), internationalization, certificate generation, admin and moderation tools, performance optimization, comprehensive security, monitoring and observability, CI/CD pipeline, and data privacy compliance. Each of these topics is a deep skill area in its own right, and implementing them in the context of a real application provides far more effective learning than studying them in isolation.")}

{heading3("6.1 Infrastructure and Performance")}

{para("The caching strategy uses four layers: Redis for session data, leaderboard rankings, streak counts, hot lesson content, and quiz cards; a CDN for static assets, images, fonts, and certificate templates; application-level caching for computed path progress (invalidated on exercise completion) and skill scores; and browser-level caching via Service Worker for offline support and HTTP cache headers for static content. The database strategy uses PostgreSQL as the primary data store for users, lessons, submissions, progress, and forums; TimescaleDB (a PostgreSQL extension) for time-series data like activity logs, performance metrics, and API usage; Redis for caching and real-time leaderboards using sorted sets; and MinIO for object storage (avatars, project files, certificate PDFs, datasets). Connection pooling uses HikariCP with monitoring.")}

{key_concept("Performance Budgets",
"Every component has strict performance targets: page load (first contentful paint) under 1.5 seconds, code execution cold start under 2 seconds, warm start under 500 milliseconds, AI chat first token under 3 seconds, leaderboard load under 1 second, search results under 500 milliseconds, and full dashboard with all widgets under 2 seconds. Achieving these targets requires lazy loading, code splitting, virtual scrolling for long lists, and continuous Core Web Vitals monitoring. The search system starts with PostgreSQL full-text search for simplicity, with the option to upgrade to Meilisearch for better relevance.")}

{heading3("6.2 Security Architecture")}

{para("Application security covers input sanitization (SQL parameters, never string concatenation; HTML escaping; XSS prevention), strict CORS origin whitelisting, Content Security Policy headers, per-endpoint rate limiting using Bucket4J, Bean Validation for all API inputs, security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy), OWASP Dependency-Check in CI/CD, and secrets management via HashiCorp Vault or AWS Secrets Manager. AI security includes prompt injection detection (scanning user code and comments before sending to the AI API), filtering AI responses to never expose system prompts, monthly API key rotation, per-user daily token limits to prevent cost runaway, and AI response caching for identical questions within 24 hours.")}

{heading3("6.3 Monitoring, CI/CD, and Privacy")}

{para("The monitoring stack uses Prometheus and Grafana for metrics (request rates, error rates, response times, JVM metrics), structured JSON logging via Logback centralized in Loki or ELK, and OpenTelemetry for distributed tracing. Alerting covers error rate spikes, sandbox crash rates, API cost anomalies, and disk space. Business metrics include DAU/MAU, retention rates (D1, D7, D30), exercise pass rate distributions, average time to complete a path, streak distributions, and AI chat satisfaction rates. The CI/CD pipeline runs through lint and format checks (Spotless for Java, ESLint and Prettier for React), unit tests with a minimum 80% coverage requirement, integration tests using TestContainers, security scans (OWASP Dependency-Check and Trivy container scan), Docker image build, deployment to staging with smoke tests, manual approval for production promotion, rolling update deployment, and post-deploy health checks with canary monitoring.")}

{para("Data privacy follows strict principles: user code submissions are private by default, AI chat logs are stored for 30 days then anonymized, email addresses are never shared, passwords are never stored (only bcrypt hashes), and users have the right to full account deletion within 30 days. Analytics use self-hosted Plausible or Umami instead of Google Analytics, with essential cookies only and a clear consent banner.")}

{chapter_header("BUILD ROADMAP", "28 Weeks, 14 Milestones")}

{para("The build roadmap divides the project into 14 milestones across 28 weeks. M1 (weeks 1-2) delivers auth and the React shell. M2 (weeks 3-4) delivers the content engine with the admin panel. M3 (weeks 5-6) delivers the Monaco Editor playground with Docker sandbox execution. M4 (weeks 7-8) delivers auto-grading with progressive hints. M5 (weeks 9-10) adds progress tracking and XP. M6 (weeks 11-12) completes the gamification engine. M7 (weeks 13-14) integrates the AI tutor. M8 (weeks 15-16) adds advanced AI features. M9 (weeks 17-19) builds the AI/ML content. M10 (weeks 20-21) delivers the LLM track. M12 (weeks 22-23) builds the community layer. M13 (weeks 24-26) handles polish and production readiness. M14 (weeks 27-28) is the final QA, security audit, and launch.")}

<div class="table-wrap">
<table>
<tr><th>Milestone</th><th>Weeks</th><th>Core Deliverables</th></tr>
<tr><td>M1: Auth and Shell</td><td>1-2</td><td>Passkey + JWT auth, user profiles, React shell, PostgreSQL + Redis, Docker Compose</td></tr>
<tr><td>M2: Content Engine</td><td>3-4</td><td>Admin panel, markdown renderer, 10 Java lessons, path dependency graph</td></tr>
<tr><td>M3: Playground</td><td>5-6</td><td>Monaco Editor, multi-file support, Docker sandbox, built-in terminal</td></tr>
<tr><td>M4: Auto-Grading</td><td>7-8</td><td>Exercise types, test case engine, progressive hints, submission history</td></tr>
<tr><td>M5: Progress and XP</td><td>9-10</td><td>Progress dashboard, XP system, levels, streaks, skill radar chart</td></tr>
<tr><td>M6: Gamification</td><td>11-12</td><td>Badges, daily challenge, weekly missions, leaderboard, spaced repetition</td></tr>
<tr><td>M7: AI Tutor</td><td>13-14</td><td>Claude API, contextual chat, code reviewer, error explanation</td></tr>
<tr><td>M8: AI Advanced</td><td>15-16</td><td>AI pair programmer, path generator, auto-generated practice problems</td></tr>
<tr><td>M9: AI/ML Content</td><td>17-19</td><td>Weka, Smile, DL4J modules, 3 guided projects, ML visualizer</td></tr>
<tr><td>M10: LLM Track</td><td>20-21</td><td>LLM lessons, API playground, RAG project, vector DB basics</td></tr>
<tr><td>M12: Community</td><td>22-23</td><td>Discussion forums, project showcase, peer review, mentorship</td></tr>
<tr><td>M13: Polish</td><td>24-26</td><td>Certificates, notifications, offline mode, accessibility, i18n</td></tr>
<tr><td>M14: Launch</td><td>27-28</td><td>Final QA, security audit, load testing, production deployment</td></tr>
</table>
</div>

{chapter_header("RISK REGISTER", "What Could Go Wrong and How to Handle It")}

{para("Every real project faces risks, and acknowledging them upfront is a sign of engineering maturity. The PRD identifies eight key risks. Scope creep is rated as Very High probability and High impact, mitigated by strict phase gates that prevent starting Phase N until Phase N-1 is deployed and stable. Sandbox escape is rated as Low probability but Critical impact, mitigated by defense in depth (seccomp, gVisor, non-root, no network, resource limits, monitoring). AI API costs spiraling is Medium probability and High impact, mitigated by per-user daily token limits, aggressive caching, and tiered access. Content creation burnout is High probability and High impact, mitigated by AI-assisted content generation with human review and starting with only one fully complete path.")}

{para("The solo developer bottleneck is High probability and Medium impact, addressed by modular API-first architecture that could accommodate additional developers later. Low motivation for a self-project is Medium probability and High impact, countered by public accountability through weekly progress sharing on social media. Exercise test case quality is Medium in both dimensions, handled by a \"test the tests\" workflow where the reference solution must pass all tests, AI generates edge cases, and the community can flag bad tests. Browser performance is Medium in both dimensions, addressed by lazy loading, code splitting, virtual scrolling, and Core Web Vitals monitoring. Data loss is Low probability but Critical impact, prevented by daily automated PostgreSQL backups with tested restore procedures and off-site backup copies.")}

{chapter_header("SKILLS YOU WILL MASTER", "The Complete Technology Matrix")}

{para("By building CodeForge from start to finish, you will gain hands-on, production-grade experience across an extraordinary breadth of technologies. This is not theoretical knowledge from tutorials. This is battle-tested understanding from solving real problems in a real system. Below is a summary of the major skill areas and what building each component teaches you.")}

<div class="two-col">
{tech_card("Backend (Java + Spring Boot)", [
"Spring Security with WebAuthn/FIDO2 passkey authentication",
"JWT token management with rotating refresh tokens",
"Role-based access control with granular permissions",
"RESTful API design with Bean Validation",
"WebSocket real-time communication",
"Docker container orchestration for code sandboxing",
"Redis caching with sorted sets for leaderboards",
"PostgreSQL with TimescaleDB for time-series data",
"Rate limiting with Bucket4J",
"Application security (CSP, CORS, HSTS)"
])}
{tech_card("Frontend (React + TypeScript)", [
"Monaco Editor integration for in-browser IDE",
"xterm.js terminal emulation",
"D3.js/Chart.js data visualization",
"Service Worker for offline caching",
"CRDT-based real-time collaboration",
"WebRTC for voice chat",
"Responsive layout with resizable panes",
"Performance optimization (code splitting, lazy loading)",
"Accessibility (WCAG 2.1 AA compliance)",
"Internationalization (i18n) architecture"
])}
</div>

<div class="two-col">
{tech_card("AI/ML Integration", [
"Claude API integration for code review and tutoring",
"Prompt engineering for educational AI guardrails",
"RAG systems with pgvector for vector storage",
"Weka, Smile, and DL4J for ML in Java",
"CNN and LSTM model building",
"Spaced repetition algorithm (SM-2) implementation",
"Adaptive difficulty adjustment algorithms",
"Natural language processing for content generation"
])}
{tech_card("DevOps and Infrastructure", [
"Docker Compose for local development",
"CI/CD pipeline (lint, test, scan, deploy)",
"Prometheus + Grafana monitoring stack",
"OpenTelemetry distributed tracing",
"Nginx reverse proxy and load balancing",
"SSL/TLS certificate management",
"Logback structured logging with Loki/ELK",
"OWASP security scanning in CI/CD",
"Zero-downtime rolling deployment",
"Backup and disaster recovery procedures"
])}
</div>

{para("The ultimate beauty of CodeForge is captured in its guiding quote: <em>\"The best way to learn something is to build something that requires it.\"</em> CodeForge is not just the thing you are building. It is the thing that requires you to learn everything. Every feature in the PRD is a lesson disguised as a product feature. By the time you have built all of this, you will not just know Java, Spring Boot, React, AI/ML, Docker, and system design. You will have proved it.")}

</div>

<div class="ending">
    <div style="font-size:11px; font-weight:500; letter-spacing:4px; text-transform:uppercase; color:var(--accent); margin-bottom:24px;">THE JOURNEY BEGINS</div>
    <div style="font-family:'Playfair Display', serif; font-size:36px; font-weight:700; line-height:1.3; color:var(--text); margin-bottom:20px; font-style:italic;">\"Build the thing that\nlrequires you to learn everything.\"</div>
    <div style="width:40px; height:2px; background:var(--accent); margin:0 auto 20px auto;"></div>
    <div style="font-size:13px; color:var(--muted); max-width:360px; line-height:1.7;">CodeForge ULTRA PRO MAX Complete Learning Guide. Based on the full PRD by Aman.</div>
</div>

</body>
</html>'''
    return html

def chapter_header(tag, title):
    return f'''<div class="chapter-header">
    {chapter_tag(tag)}
    {chapter_title(title)}
    {divider()}
</div>'''

if __name__ == "__main__":
    html = build_document()
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Generated: {OUTPUT_PATH}")
    print(f"Size: {os.path.getsize(OUTPUT_PATH)} bytes")
