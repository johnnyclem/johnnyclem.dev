import {
  Admonition,
  DocCodeBlock,
  DraftLine,
  PyCmt,
  PyKw,
  PyFn,
  Flowchart,
  FlowNode,
  FlowArrow,
  BlankSection,
  DocPageNav,
  LastUpdated,
  DocTable,
  IC,
} from "@/components/docs/DocusaurusUI";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function DocsDocsPost() {
  useScrollReveal();

  return (
    <div className="max-w-[760px] text-[16px] leading-[1.75] text-[#1c1e21]">
      <p className="text-[13px] text-[#999] mb-3">
        <a href="#" onClick={e => e.preventDefault()} className="text-[#999] no-underline hover:underline">Docs</a>{" / "}
        <a href="#" onClick={e => e.preventDefault()} className="text-[#999] no-underline hover:underline">Introduction</a>{" / "}
        Why Documentation Matters
      </p>

      <h1 id="overview" className="text-[2.4em] font-extrabold leading-[1.2] mb-2 tracking-[-0.5px] text-[#1c1e21] reveal">
        Why Documentation Matters
      </h1>
      <p className="text-[1.15em] text-[#606770] mb-8 leading-[1.6] reveal">
        A comprehensive guide to understanding why you should write documentation, written instead of writing documentation.
      </p>

      {/* ── Kevin ── */}
      <h2 id="kevin" className="text-[1.6em] font-bold mt-12 mb-4 pb-2 border-b border-[#ececec] tracking-[-0.2px] reveal">
        Documentation vs. Just Telling Kevin on Slack
      </h2>

      <p className="mb-4 reveal">
        Before we begin, let's address the question that every developer asks before writing a single word of documentation: <strong>"Can't I just tell Kevin?"</strong>
      </p>
      <p className="mb-4 reveal">
        Kevin is the senior engineer on your team who has been at the company for four years. Kevin knows where the config files live. Kevin knows why the database schema looks like that. Kevin knows the deploy process, the naming conventions, the reason behind that one weird if-statement on line 847 of <IC>legacy_handler.py</IC>, and who to email when Datadog goes red on a Thursday.
      </p>
      <p className="mb-4 reveal">
        Kevin is your documentation. Kevin is a living, breathing, Slack-responsive knowledge base with a mass in Cambridge and a mass in the codebase. And if Kevin gets hit by a bus — or, more realistically, <em>accepts an offer from a company that pays 40% more</em> — every undocumented decision he's ever made leaves with him.
      </p>
      <p className="mb-4 reveal">
        This is known as the <strong>Kevin Problem</strong>.
      </p>

      <Admonition type="caution">
        <p>The Kevin Problem scales linearly with Kevin's tenure. A Kevin who has been at the company for six years is not 50% more valuable than a four-year Kevin — he is <em>existentially</em> more valuable, because at six years, Kevin has begun to <em>embody</em> institutional knowledge that predates every system currently in use.</p>
      </Admonition>

      <DocTable
        headers={["Criterion", "Documentation", "Kevin"]}
        winnerCol={2}
        rows={[
          [
            "Availability",
            "24/7, all time zones",
            "9:15 AM–4:47 PM EST, except Wednesdays (Kevin has therapy)",
          ],
          [
            "Response time",
            "Instant (Ctrl+F)",
            "Instant to 3 days (depends on sprint load, mood, and whether you asked in the right channel)",
          ],
          [
            "Accuracy",
            "Frozen at time of writing (possibly wrong now)",
            "Up-to-date but filtered through Kevin's current emotional state",
          ],
          [
            "Searchable",
            "Yes",
            "Only if you know the exact Slack DM phrase Kevin will respond to",
          ],
          [
            "Bus factor",
            "Survives all buses",
            "Does not survive buses (literal or metaphorical)",
          ],
          [
            "Enjoyment of writing",
            "None",
            <span className="font-bold text-[#25c2a0]">Kevin actually likes explaining things and you should let him have this</span>,
          ],
          [
            "Cost",
            "Free (after 3 days of yak-shaving your docs framework)",
            "$187,000/yr (but he also writes code, allegedly)",
          ],
        ]}
      />

      <p className="mb-4 reveal">
        The conclusion is clear: documentation is objectively superior in every category except the one that matters, which is that Kevin is already right there and will just <em>tell you</em> without you having to open a Markdown file.
      </p>
      <p className="mb-4 reveal">
        This is why Kevin always wins. This is also why you need to write documentation.
      </p>

      <Admonition type="tip">
        <p>An underappreciated benefit of documentation: once it exists, Kevin can reply to Slack questions with <em>"it's in the docs"</em> — the four most satisfying words in software engineering. You are not just writing docs. You are giving Kevin a gift.</p>
      </Admonition>

      {/* ── Audience ── */}
      <h2 id="audience" className="text-[1.6em] font-bold mt-12 mb-4 pb-2 border-b border-[#ececec] tracking-[-0.2px] reveal">
        Knowing Your Audience
      </h2>

      <p className="mb-4 reveal">
        Good documentation begins with understanding who will read it. In practice, your documentation will be read by the following audiences, in order of likelihood:
      </p>

      <ol className="mb-4 pl-7 reveal [&>li]:mb-1.5 [&>li::marker]:text-[#999]">
        <li><strong>You, in six months</strong>, having completely forgotten how any of this works</li>
        <li><strong>A new hire</strong>, three days into onboarding, with 47 open browser tabs and a growing sense of dread</li>
        <li><strong>Someone from another team</strong>, who will read the first two sentences, not find what they need, and Slack Kevin</li>
        <li><strong>An LLM</strong>, who will ingest the entire page and produce a confident summary that is subtly wrong</li>
        <li><strong>Nobody</strong> (most common)</li>
      </ol>

      <p className="mb-4 reveal">
        Write for audience #1. Future-you is the only reader who is both guaranteed and sympathetic. Future-you will not judge your prose. Future-you will not leave a pedantic review comment. Future-you will simply be <em>grateful</em> — and that gratitude is the only reward documentation will ever provide.
      </p>

      {/* ── Tooling ── */}
      <h2 id="tooling" className="text-[1.6em] font-bold mt-12 mb-4 pb-2 border-b border-[#ececec] tracking-[-0.2px] reveal">
        Choosing a Documentation Framework
      </h2>

      <p className="mb-4 reveal">
        Before you can write documentation, you must first spend between one and three weeks selecting, configuring, theming, deploying, and then reconsidering your documentation toolchain. This is not procrastination. This is <strong>infrastructure</strong>.
      </p>

      <DocTable
        headers={["Framework", "Time to Set Up", "Time Writing Docs After Setup"]}
        rows={[
          ["Docusaurus", "3 days", "0 days"],
          ["GitBook", "1 day", "0 days"],
          ["MkDocs + Material", "2 days", "0 days"],
          ["VitePress", "2 days", "0 days (but the dev server is fast, which is nice while you stare at the blank page)"],
          ["Notion", "20 minutes", "0 days (but you did spend 4 hours organizing the sidebar into a nested taxonomy that no one will navigate)"],
          ["README.md", "0 days", <>Wrote "# Project Name" and "TODO: add docs" and merged to main. Technically, docs exist.</>],
          ["Custom Next.js site", "2 weeks", "You have built a beautiful documentation framework. It contains no documentation. It has 4 GitHub stars, all from bots."],
        ]}
      />

      <Admonition type="note">
        <p>The correlation between "time spent choosing a docs framework" and "amount of documentation actually written" is not just zero — it is <em>slightly negative</em>. The more sophisticated your toolchain, the higher the activation energy to open a Markdown file and type words. This is called the <strong>Documentation Tooling Paradox</strong>, and it is the reason this very site exists instead of actual documentation for anything.</p>
      </Admonition>

      <h3 className="text-[1.25em] font-semibold mt-8 mb-3 reveal">The Migration Cycle</h3>

      <p className="mb-4 reveal">
        It is also important to be aware of the <strong>Documentation Framework Migration Cycle</strong>, which every engineering team completes approximately once per fiscal year:
      </p>

      <Flowchart>
        <FlowNode>Choose framework</FlowNode>
        <FlowArrow>{"\u2192"}</FlowArrow>
        <FlowNode>Configure it perfectly</FlowNode>
        <FlowArrow>{"\u2192"}</FlowArrow>
        <FlowNode>Write 2 pages</FlowNode>
        <FlowArrow>{"\u2192"}</FlowArrow>
        <FlowNode variant="decision">Discover minor limitation</FlowNode>
        <br />
        <FlowArrow hidden>{"\u2192"}</FlowArrow>
        <FlowArrow hidden>{"\u2192"}</FlowArrow>
        <FlowArrow hidden>{"\u2192"}</FlowArrow>
        <FlowArrow>{"\u2193"}</FlowArrow>
        <br />
        <FlowNode variant="result">"Let's evaluate alternatives"</FlowNode>
        <FlowArrow>{"\u2192"}</FlowArrow>
        <FlowNode>Choose new framework</FlowNode>
        <FlowArrow>{"\u2192"}</FlowArrow>
        <FlowNode>Migrate 2 pages</FlowNode>
        <FlowArrow>{"\u2192"}</FlowArrow>
        <FlowNode variant="terminal">Repeat forever</FlowNode>
      </Flowchart>

      <p className="mb-4 reveal">
        At no point in this cycle does the total number of documented pages exceed four.
      </p>

      {/* ── First Page ── */}
      <h2 id="first-page" className="text-[1.6em] font-bold mt-12 mb-4 pb-2 border-b border-[#ececec] tracking-[-0.2px] reveal">
        Writing Your First Page
      </h2>

      <p className="mb-4 reveal">
        You have selected your framework. You have configured the sidebar. You have spent a non-trivial amount of time choosing between the default theme and a slightly different default theme. The deployment pipeline is running. The custom domain is pointing. Everything is ready.
      </p>
      <p className="mb-4 reveal">
        Now you have to write something.
      </p>

      <BlankSection />

      <p className="mb-4 reveal">
        This is the moment — the <strong>Documentation Void</strong> — where most documentation initiatives die. The cursor blinks. Your coffee cools. You open a new tab. You check Slack. Kevin has answered someone's question. The question was about the thing you were about to document. Kevin was faster. Kevin is always faster.
      </p>
      <p className="mb-4 reveal">
        You close the tab. You'll write docs tomorrow.
      </p>

      <h3 className="text-[1.25em] font-semibold mt-8 mb-3 reveal">The First Sentence Problem</h3>

      <p className="mb-4 reveal">
        If you do manage to stay in the file, you will encounter the First Sentence Problem: the paralyzing inability to decide how to begin. Common false starts include:
      </p>

      <DocCodeBlock title="drafts.md" lang="md">
{`# Getting Started

This document describes how to...`}
{"\n"}<DraftLine>[deleted — too formal]</DraftLine>
{`

# Getting Started

Welcome to the getting started guide...`}
{"\n"}<DraftLine>[deleted — "welcome to the getting started guide" is the "hello my name is my name" of documentation]</DraftLine>
{`

# Getting Started

Before you begin, make sure you have...`}
{"\n"}<DraftLine>[deleted — you don't know what they need yet because you haven't written the rest]</DraftLine>
{`

# Getting Started

## Prerequisites

- Node.js 18+`}
{"\n"}<DraftLine>[you have now committed to a prerequisites section and will spend 30 minutes listing things that may or may not be required]</DraftLine>
{`

# Getting Started

So you want to use [Project Name].`}
{"\n"}<DraftLine>[deleted — too casual? too presumptuous? do they want to use it? maybe they were told to]</DraftLine>
{`

# Getting Started

TODO: write getting started guide`}
{"\n"}<DraftLine>[shipped to main]</DraftLine>
      </DocCodeBlock>

      {/* ── Five Stages ── */}
      <h2 id="five-stages" className="text-[1.6em] font-bold mt-12 mb-4 pb-2 border-b border-[#ececec] tracking-[-0.2px] reveal">
        The Five Stages of Documentation
      </h2>

      <p className="mb-4 reveal">
        Decades of empirical observation across thousands of engineering teams have revealed that every documentation effort follows the same emotional trajectory. These are the <strong>Five Stages of Documentation</strong>:
      </p>

      <h3 className="text-[1.25em] font-semibold mt-8 mb-3 reveal">Stage 1: Denial</h3>
      <p className="mb-4 reveal">
        "The code is self-documenting." This is the opening position. The engineer believes — sincerely, passionately — that well-named variables and clean architecture eliminate the need for external documentation. The code <em>speaks for itself</em>. The function is called <IC>processUserData()</IC>. What more is there to say?
      </p>
      <p className="mb-4 reveal">
        What more is there to say: which users, what data, what "process" means, what happens when it fails, why it's called three times in succession in production, and who decided it should also send an email.
      </p>

      <h3 className="text-[1.25em] font-semibold mt-8 mb-3 reveal">Stage 2: Anger</h3>
      <p className="mb-4 reveal">
        "Why doesn't anyone else write docs?" The engineer has been asked to explain the same thing for the fifth time. They are angry — not at the asker, but at the <em>absence of a system</em>. They vow to create that system. They open a Notion page. They type a title. The title is "Documentation Standards." They bold it. They feel better. They close the tab.
      </p>

      <h3 className="text-[1.25em] font-semibold mt-8 mb-3 reveal">Stage 3: Bargaining</h3>
      <p className="mb-4 reveal">
        "What if I just add really good code comments?" This is the compromise stage. The engineer will not write separate documentation, but they will <em>annotate the code so thoroughly</em> that documentation becomes unnecessary. The comments will be comprehensive, contextual, and maintained.
      </p>
      <p className="mb-4 reveal">
        The comments will be comprehensive for approximately two pull requests, after which they will begin to drift, fossilize, and eventually contradict the code they describe. Six months later, a comment reading <IC>{"// this should never happen"}</IC> will sit directly above a code path that handles 40% of production traffic.
      </p>

      <DocCodeBlock title="The bargaining phase, visualized" lang="python">
        <PyCmt># TODO: document this function</PyCmt>{"\n"}
        <PyCmt># NOTE: this is temporary (added 2019-03-14)</PyCmt>{"\n"}
        <PyCmt># HACK: don't ask</PyCmt>{"\n"}
        <PyCmt># FIXME: Kevin knows why this is here</PyCmt>{"\n"}
        <PyKw>def</PyKw> <PyFn>process_user_data</PyFn>(data, legacy=<PyKw>True</PyKw>, kevin_mode=<PyKw>False</PyKw>):{"\n"}
        {"    ..."}
      </DocCodeBlock>

      <h3 className="text-[1.25em] font-semibold mt-8 mb-3 reveal">Stage 4: Depression</h3>
      <p className="mb-4 reveal">
        The engineer opens the docs site. The sidebar has four pages, two of which are the auto-generated "Introduction" and "Installation" that came with the framework. The "Architecture Overview" page contains a single Mermaid diagram from eight months ago that no longer reflects reality. The "API Reference" links to a Swagger page that 502s.
      </p>
      <p className="mb-4 reveal">
        The engineer closes the docs site.
      </p>

      <h3 className="text-[1.25em] font-semibold mt-8 mb-3 reveal">Stage 5: A README That Says "TODO"</h3>
      <p className="mb-4 reveal">
        Acceptance. The engineer creates a <IC>README.md</IC> with the project name, a one-line description, and the words "More documentation coming soon." The PR is merged. The README is never updated. The words "coming soon" will remain in the repository for the lifetime of the project, a permanent monument to good intentions and finite energy.
      </p>

      <Admonition type="danger">
        <p>If your project's README still says "coming soon" and the last commit to it was more than 18 months ago, you have not reached Stage 5. You have transcended it. The documentation is not coming. Make peace with this.</p>
      </Admonition>

      {/* ── When ── */}
      <h2 id="when" className="text-[1.6em] font-bold mt-12 mb-4 pb-2 border-b border-[#ececec] tracking-[-0.2px] reveal">
        When to Write Documentation
      </h2>

      <p className="mb-4 reveal">
        Timing is critical. Write documentation too early and it will be invalidated by the next sprint. Write it too late and no one will remember what the code does, including the person who wrote it. The optimal time to write documentation is always <strong>two weeks ago</strong>.
      </p>
      <p className="mb-4 reveal">
        Since time travel is not yet available (and is not on the roadmap), the following flowchart can help determine when to write documentation in practice:
      </p>

      <Flowchart>
        <FlowNode variant="decision">Should I write docs now?</FlowNode>
        <br />
        <span className="text-[#999]">{"\u2193"} yes</span>
        {"          "}
        <span className="text-[#999]">{"\u2193"} no</span>
        <br />
        <FlowNode variant="decision">Do I have time?</FlowNode>
        {"        "}
        <FlowNode variant="terminal">Later</FlowNode>
        <br />
        <span className="text-[#999]">{"\u2193"} yes</span>
        {"          "}
        <span className="text-[#999]">{"\u2193"} no</span>
        <br />
        <FlowNode variant="decision">Do I want to?</FlowNode>
        {"     "}
        <FlowNode variant="terminal">Later</FlowNode>
        <br />
        <span className="text-[#999]">{"\u2193"} yes (lying)</span>
        {"   "}
        <span className="text-[#999]">{"\u2193"} no</span>
        <br />
        <FlowNode variant="terminal">Later</FlowNode>
        {"             "}
        <FlowNode variant="terminal">Later</FlowNode>
      </Flowchart>

      <p className="mb-4 reveal">
        As the flowchart demonstrates, all paths lead to <strong>Later</strong>. Later is not a time. Later is a place — specifically, the place where documentation goes to not be written. Later is the /dev/null of good intentions.
      </p>

      {/* ── Types ── */}
      <h2 id="types" className="text-[1.6em] font-bold mt-12 mb-4 pb-2 border-b border-[#ececec] tracking-[-0.2px] reveal">
        Types of Documentation
      </h2>

      <p className="mb-4 reveal">
        Software documentation exists in several forms, each serving a unique purpose and a unique form of neglect:
      </p>

      <DocTable
        headers={["Type", "Purpose", "Typical Lifespan"]}
        rows={[
          [<strong>README</strong>, "First impression of the project", <>Written once during initial commit. "Coming soon" section ages like milk.</>],
          [<strong>API Reference</strong>, "Describe endpoints, parameters, responses", "Accurate for approximately one sprint after auto-generation. Then the schema changes and the docs don't."],
          [<strong>Architecture Decision Records</strong>, <span>Explain <em>why</em> decisions were made</span>, "3 are created with great enthusiasm. Then the team forgets ADRs exist. Decision #4 onward is made in a Slack thread that is subsequently deleted."],
          [<strong>Runbooks</strong>, "Step-by-step guides for operational tasks", <>Accurate until the first step that says "click the blue button," which is now green, in a different location, behind a feature flag.</>],
          [<strong>Onboarding Guide</strong>, "Help new hires get productive", <>Written by the second employee. Never updated. The tenth employee's onboarding consists of Kevin saying "ignore the doc, I'll walk you through it."</>],
          [<strong>Confluence Pages</strong>, "Nobody knows", "Eternal. Confluence pages never die. They just accumulate, forming geological strata of institutional memory, each layer contradicting the one below it. Archaeologists will study them."],
          [<strong>Inline Comments</strong>, "Explain tricky code", <span>See: <a href="#five-stages" className="text-[#2e8555] no-underline hover:underline">Stage 3 (Bargaining)</a></span>],
        ]}
      />

      {/* ── Excuses ── */}
      <h2 id="excuses" className="text-[1.6em] font-bold mt-12 mb-4 pb-2 border-b border-[#ececec] tracking-[-0.2px] reveal">
        Making Excuses: A Field Guide
      </h2>

      <p className="mb-4 reveal">
        Over the years, the software engineering community has developed a rich and nuanced vocabulary for not writing documentation. The following phrases have been rigorously field-tested across thousands of standup meetings:
      </p>

      <h4 className="text-[1.05em] font-semibold mt-6 mb-2 reveal">"The code is self-documenting"</h4>
      <p className="mb-4 reveal">Translation: the code is not documented and I have decided this is a philosophy rather than a shortcoming.</p>

      <h4 className="text-[1.05em] font-semibold mt-6 mb-2 reveal">"We're moving too fast to write docs"</h4>
      <p className="mb-4 reveal">Translation: we are moving too fast to write docs. We are also moving too fast to onboard new people, explain our decisions, or remember why we did things. We are very fast. We are lost.</p>

      <h4 className="text-[1.05em] font-semibold mt-6 mb-2 reveal">"Nobody reads the docs anyway"</h4>
      <p className="mb-4 reveal">Translation: the docs are so out of date that reading them is actively harmful. This is presented as evidence against documentation rather than evidence for maintaining it.</p>

      <h4 className="text-[1.05em] font-semibold mt-6 mb-2 reveal">"I'll add docs in a follow-up PR"</h4>
      <p className="mb-4 reveal">Translation: I will not add docs in a follow-up PR. There is no follow-up PR. There has never been a follow-up PR. The follow-up PR is a social contract that both parties understand will not be honored, and yet it is invoked in every code review, a ritual of mutual self-deception that binds the team together.</p>

      <h4 className="text-[1.05em] font-semibold mt-6 mb-2 reveal">"We should use AI to generate the docs"</h4>
      <p className="mb-4 reveal">Translation: we have transferred responsibility for documentation from a human who won't write it to a machine that will write it confidently and incorrectly. The docs now exist, technically. They describe a system that is adjacent to ours but not quite ours, like a parallel universe where the API almost makes sense.</p>

      <Admonition type="tip">
        <p>If your team uses all five of these excuses simultaneously, you have achieved what researchers call <strong>Documentation Nihilism</strong> — the philosophical position that documentation is both impossible and unnecessary. This is the final form. There is no Stage 6.</p>
      </Admonition>

      {/* ── Maintenance ── */}
      <h2 id="maintenance" className="text-[1.6em] font-bold mt-12 mb-4 pb-2 border-b border-[#ececec] tracking-[-0.2px] reveal">
        Keeping Documentation Updated
      </h2>

      <p className="mb-4 reveal">
        Writing documentation is hard. Keeping it updated is a Sisyphean endeavor that will consume what remains of your will to live.
      </p>
      <p className="mb-4 reveal">
        The fundamental challenge is this: documentation is a <strong>snapshot</strong> of understanding at a point in time. Code is a <strong>living system</strong> that changes continuously. The moment you press "merge" on a documentation PR, the clock begins ticking toward the moment that doc becomes inaccurate. This interval is called the <strong>Documentation Half-Life</strong>, and for most teams it is approximately 6 weeks.
      </p>

      <h3 className="text-[1.25em] font-semibold mt-8 mb-3 reveal">The Screenshot Problem</h3>
      <p className="mb-4 reveal">
        No artifact in documentation decays faster than a screenshot. A screenshot of your UI is accurate for the duration of the current sprint, after which the button moves, the color changes, the sidebar is reorganized, and the screenshot now depicts a product that no longer exists.
      </p>
      <p className="mb-4 reveal">
        And yet the screenshot remains in the docs, a ghost of interfaces past, confusing every new reader who wonders: "Is my app broken, or is this doc broken?" The answer is always the doc. The answer is <em>always</em> the doc.
      </p>

      <Admonition type="caution">
        <p>If your documentation contains screenshots that include a macOS menu bar showing a date, and that date is more than one year ago, the documentation is not a guide — it is a historical document. Treat it accordingly. Consider adding a sepia filter.</p>
      </Admonition>

      {/* ── Glossary ── */}
      <h2 id="glossary" className="text-[1.6em] font-bold mt-12 mb-4 pb-2 border-b border-[#ececec] tracking-[-0.2px] reveal">
        Glossary
      </h2>

      <DocTable
        headers={["Term", "Definition"]}
        rows={[
          [<strong>Bus Factor</strong>, "The number of team members who can be hit by a bus before the project becomes unmaintainable. For most undocumented projects, this number is 1. That person is Kevin."],
          [<strong>Code Comment</strong>, <span>A note left in source code explaining what the code does, what it should do, or — most commonly — what the author was feeling at the time. e.g., <IC>{"// I'm sorry"}</IC></span>],
          [<strong>Coming Soon</strong>, <>A documentation placeholder indicating that content is not coming and was never coming, but the author needed to merge the PR and this was less embarrassing than an empty page.</>],
          [<strong>Documentation Debt</strong>, "The accumulated cost of not documenting things. Unlike technical debt, documentation debt is never tracked, never prioritized, and never repaid. It simply grows until Kevin leaves."],
          [<strong>Documentation Half-Life</strong>, "The time between a doc being written and a doc being wrong. Industry average: 6 weeks. For docs containing screenshots: 11 days."],
          [<strong>Follow-Up PR</strong>, <>A fictional artifact referenced during code review to defer documentation to a future that will never arrive. See also: "tech debt ticket," "parking lot," "backlog."</>],
          [<strong>Kevin</strong>, "A load-bearing team member who serves as the primary knowledge store for all undocumented institutional knowledge. Every team has one. If you don't know who yours is, it might be you."],
          [<strong>Later</strong>, "The temporal destination of all documentation commitments. Not a time, but a state of being. The /dev/null of intention."],
          [<strong>Self-Documenting Code</strong>, <span>Code that is documented by virtue of being readable, well-structured, and thoroughly understood by its author. Understood by <em>no one else</em>, but the author doesn't know that yet.</span>],
          [<strong>TODO</strong>, "A promise made to a codebase that will not be kept. The most common word in documentation, and the least honest."],
        ]}
      />

      {/* ── FAQ ── */}
      <h2 id="faq" className="text-[1.6em] font-bold mt-12 mb-4 pb-2 border-b border-[#ececec] tracking-[-0.2px] reveal">
        Frequently Asked Questions
      </h2>

      <h4 className="text-[1.05em] font-semibold mt-6 mb-2 reveal">Q: How long should documentation be?</h4>
      <p className="mb-4 reveal">Long enough to be useful. Short enough that someone will read it. This Goldilocks zone does not exist, which is why no one is satisfied with any documentation ever.</p>

      <h4 className="text-[1.05em] font-semibold mt-6 mb-2 reveal">Q: Should I write docs before or after writing code?</h4>
      <p className="mb-4 reveal">Before, according to every methodology. After, according to every developer. Never, according to what actually happens.</p>

      <h4 className="text-[1.05em] font-semibold mt-6 mb-2 reveal">Q: How do I convince my team to write documentation?</h4>
      <p className="mb-4 reveal">You don't. You write it yourself, once, resentfully, on a Friday afternoon. Then you send a link in Slack with a message that reads "FYI — wrote some docs." No one will acknowledge the message. Two months later, someone will ask a question that is answered on page one, and you will experience an emotion that has no name but is adjacent to vindication.</p>

      <h4 className="text-[1.05em] font-semibold mt-6 mb-2 reveal">Q: Is this documentation site itself a form of procrastination?</h4>
      <p className="mb-4 reveal">Yes. This site was built instead of writing the actual documentation for three separate internal projects, all of which remain undocumented. The sidebar navigation alone took four hours. We regret nothing. We regret everything.</p>

      <h4 className="text-[1.05em] font-semibold mt-6 mb-2 reveal">Q: Who is Kevin?</h4>
      <p className="mb-4 reveal">You know who Kevin is.</p>

      {/* ── Nav + Footer ── */}
      <DocPageNav
        prev={{ label: "\u00AB Previous", title: "Installing a Docs Framework Instead of Writing Docs" }}
        next={{ label: "Next \u00BB", title: "Staring at the Blank Page: Advanced Techniques" }}
      />

      <LastUpdated
        date="March 22, 2026"
        author="Not Kevin"
        footnote="This documentation was written instead of documenting three internal services, two API integrations, and a deploy process that only Kevin understands. Time spent: 6 hours. Documentation produced for actual projects: 0 pages."
      />
    </div>
  );
}
