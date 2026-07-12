import { Callout } from "@/components/docs/Callout";
import { SyntaxCodeBlock, Kw, Str, Cmt, Fn, Num, Prop } from "@/components/docs/CodeBlock";
import { ArchDiagram } from "@/components/docs/ArchDiagram";
import { ChangelogEntry } from "@/components/docs/Changelog";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function IC({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[13px] bg-[#f3f0ff] text-[#5b21b6] px-1.5 py-0.5 rounded">
      {children}
    </code>
  );
}

function ParamTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto my-5 reveal">
      <table className="w-full border-collapse text-[14px]">
        {children}
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left font-semibold px-3.5 py-2.5 border-b-2 border-border text-text-primary text-[12px] uppercase tracking-[0.3px]">
      {children}
    </th>
  );
}

function Td({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <td className={`px-3.5 py-2.5 border-b border-border/50 align-top text-text-secondary ${mono ? "text-text-primary font-mono text-[13px] font-medium" : ""}`}>
      {children}
    </td>
  );
}

function Req() {
  return <span className="text-[#ef4444] text-[10px] align-super ml-0.5">*</span>;
}

export default function VibeScriptJS() {
  useScrollReveal();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="text-[13px] text-[#7c5cfc] font-semibold mb-2 uppercase tracking-[0.8px]">Documentation</div>
      <h1 className="font-display text-[36px] font-extrabold tracking-[-0.8px] leading-[1.15] mb-4 text-text-primary">
        VibeScriptJS
      </h1>
      <p className="text-[18px] text-text-secondary font-normal leading-[1.6] mb-10 max-w-[560px]">
        The enterprise-grade framework for intention-driven development. Ship production applications by expressing what you want to exist, and then waiting.
      </p>

      <h2 id="overview" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border first:mt-0 first:pt-0 first:border-t-0 reveal">Overview</h2>

      <p className="mb-4">
        VibeScriptJS is a next-generation application development framework built on the principle that <strong className="text-text-primary">code is an implementation detail</strong>. By abstracting away the entire software development lifecycle into a single, expressive API surface, VibeScriptJS empowers developers to focus on what truly matters: <em>wanting things</em>.
      </p>
      <p className="mb-4">
        Traditional frameworks ask you to learn languages, understand paradigms, manage state, and reason about systems. VibeScriptJS asks you one question: <strong className="text-text-primary">what do you want?</strong>
      </p>
      <p className="mb-4">
        Born from the realization that the gap between "idea" and "production-ready application" is mostly typing, VibeScriptJS eliminates the typing. What remains is <em>pure intention</em> — distilled, composable, and deployable.
      </p>

      <Callout type="note" label="A note on naming">
        VibeScriptJS is not related to JavaScript, which is not related to Java. The <IC>JS</IC> suffix is an industry tradition of naming things in ways that maximize confusion while signaling vague membership in an ecosystem. We are honored to continue this legacy.
      </Callout>

      <h2 id="installation" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">Installation</h2>

      <p className="mb-4">
        VibeScriptJS is distributed via npm and requires Node.js 18 or later. The framework consists of a core runtime, a CLI toolchain, a type-level intention resolver, and an ambient vibe propagation layer.
      </p>

      <SyntaxCodeBlock lang="bash" filename="Terminal">
        {`npm install vibescriptjs @vibescriptjs/core @vibescriptjs/cli \\
  @vibescriptjs/runtime @vibescriptjs/types @vibescriptjs/vibe-propagation \\
  @vibescriptjs/intention-resolver @vibescriptjs/ambient-context`}
      </SyntaxCodeBlock>

      <p className="mb-4">
        You will also need to configure your environment. Create a <IC>.viberc</IC> file in your project root:
      </p>

      <SyntaxCodeBlock lang="json" filename=".viberc">
        {"{"}{"\n"}
        {"  "}<Prop>"vibeLevel"</Prop>: <Str>"immaculate"</Str>,{"\n"}
        {"  "}<Prop>"confidence"</Prop>: <Num>0.97</Num>,{"\n"}
        {"  "}<Prop>"please"</Prop>: <Kw>true</Kw>,{"\n"}
        {"  "}<Prop>"aesthetic"</Prop>: <Str>"clean"</Str>,{"\n"}
        {"  "}<Prop>"deployTarget"</Prop>: <Str>"somewhere"</Str>,{"\n"}
        {"  "}<Prop>"errorStrategy"</Prop>: <Str>"ask-again-nicely"</Str>,{"\n"}
        {"  "}<Prop>"timeoutProtocol"</Prop>: <Str>"verify internet connection, then proceed with passive-aggressive encouragement"</Str>{"\n"}
        {"}"}
      </SyntaxCodeBlock>

      <Callout type="warning" label="Important">
        Setting <IC>confidence</IC> below <IC>0.85</IC> will cause the framework to second-guess itself and produce nothing. This is by design. If you aren't confident, why should your code be?
      </Callout>

      <h2 id="quickstart" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">Quickstart</h2>

      <p className="mb-4">
        The following example demonstrates the complete development workflow for a production-ready full-stack SaaS application with authentication, real-time data synchronization, a Stripe integration, and a landing page that "feels like Linear."
      </p>

      <SyntaxCodeBlock lang="js" filename="app.vibe.js">
        <Kw>import</Kw> {"{ vibe }"} <Kw>from</Kw> <Str>'vibescriptjs'</Str>{"\n"}
        {"\n"}
        <Kw>await</Kw> <Fn>vibe</Fn>(<Str>"make a saas app. make it good."</Str>)
      </SyntaxCodeBlock>

      <p className="mb-4">
        That's it. Your application is now running on <IC>localhost:3000</IC>, or possibly in production. VibeScriptJS will choose the most appropriate option based on your ambient confidence level.
      </p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Adding features</h3>

      <p className="mb-4">
        As your product matures, you may need to add additional functionality. VibeScriptJS supports incremental intention layering:
      </p>

      <SyntaxCodeBlock lang="js" filename="features.vibe.js">
        <Kw>await</Kw> <Fn>vibe</Fn>(<Str>"add a dashboard. like the ones on dribbble."</Str>){"\n"}
        {"\n"}
        <Kw>await</Kw> <Fn>vibe</Fn>(<Str>"make the onboarding not suck"</Str>){"\n"}
        {"\n"}
        <Kw>await</Kw> <Fn>vibe</Fn>(<Str>"add analytics. the kind that makes investors nod."</Str>)
      </SyntaxCodeBlock>

      <h2 id="vibes" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">Core Concept: Vibes</h2>

      <p className="mb-4">
        At the heart of VibeScriptJS is the <strong className="text-text-primary">Vibe</strong> — the fundamental unit of developer intent. A Vibe is not a function call, an API request, or a build step. It is a <em>declaration of desired reality</em>. When you invoke a Vibe, you are not instructing the computer to perform a sequence of operations. You are informing the universe of your expectations and allowing the runtime to reconcile the difference between what exists and what should exist.
      </p>
      <p className="mb-4">
        This distinction is critical. Traditional programming is <em>imperative</em>: you tell the machine what to do. Functional programming is <em>declarative</em>: you tell the machine what you want. Vibe-driven development is <em>aspirational</em>: you tell the machine what would be nice, and it figures out the rest.
      </p>

      <Callout type="tip" label="Best Practice">
        The specificity of your vibe should be inversely proportional to the complexity of what you're building. For a todo app, you might specify details. For a distributed systems platform, simply state <IC>"make it scale"</IC> and trust the process.
      </Callout>

      <h2 id="prompt-lifecycle" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">The Prompt Lifecycle</h2>

      <p className="mb-4">
        Every <IC>vibe()</IC> invocation passes through a carefully orchestrated sequence of phases, each designed to maximize the probability of something happening. Understanding this lifecycle is essential for advanced usage, though not for basic usage, intermediate usage, or any practical purpose.
      </p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Phase 1: Intention Capture</h3>
      <p className="mb-4">The developer's string is parsed for emotional valence, technical ambiguity, and overall energy. Strings containing exclamation points are prioritized.</p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Phase 2: Ambient Context Resolution</h3>
      <p className="mb-4">The framework examines your <IC>.viberc</IC>, your recent git history, your <IC>package.json</IC> (for morale), and the current time of day. Applications built after midnight receive a <IC>hustle</IC> modifier.</p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Phase 3: Vibe Propagation</h3>
      <p className="mb-4">Your intention is propagated through the VibeScriptJS runtime, where it is enriched with contextual signals, decomposed into sub-vibes, and ultimately routed to the Intention Fulfillment Engine (IFE), which is Claude.</p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Phase 4: Manifestation</h3>
      <p className="mb-4">Code appears. Where it comes from is not your concern.</p>

      <h2 id="intentions" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">Intention Architecture</h2>

      <p className="mb-4">
        VibeScriptJS employs a sophisticated multi-layered intention resolution system (MIRS) to translate high-level developer desires into functional software artifacts. The architecture separates concerns across three distinct planes:
      </p>

      <ParamTable>
        <thead>
          <tr><Th>Plane</Th><Th>Responsibility</Th><Th>Example</Th></tr>
        </thead>
        <tbody>
          <tr><Td><strong className="text-text-primary">Desire Plane</strong></Td><Td>What the developer <em>wants</em></Td><Td>"a website"</Td></tr>
          <tr><Td><strong className="text-text-primary">Interpretation Plane</strong></Td><Td>What the developer <em>probably means</em></Td><Td>A Next.js app with Tailwind</Td></tr>
          <tr><Td><strong className="text-text-primary">Manifestation Plane</strong></Td><Td>What <em>actually gets built</em></Td><Td>A React app with 47 unused dependencies</Td></tr>
        </tbody>
      </ParamTable>

      <p className="mb-4">
        These planes are intentionally decoupled. The gap between them is not a bug — it is a <strong className="text-text-primary">feature of the creative process</strong>. In traditional development, this gap is called "the spec was wrong." In VibeScriptJS, it is called "emergence."
      </p>

      <h2 id="api-reference" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">API Reference</h2>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">vibe()</h3>

      <p className="mb-4">
        The primary interface for all application development. Accepts a natural language string describing your desired outcome and returns a <IC>{"Promise<Something>"}</IC>.
      </p>

      <SyntaxCodeBlock lang="typescript" filename="Type Signature">
        <Kw>function</Kw> <Fn>vibe</Fn>({"\n"}
        {"  "}intention: <span className="text-[#c026d3]">string</span>,{"\n"}
        {"  "}options?: <span className="text-[#c026d3]">VibeOptions</span>{"\n"}
        ): <span className="text-[#c026d3]">Promise</span>&lt;<span className="text-[#c026d3]">Something</span>&gt;
      </SyntaxCodeBlock>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Parameters</h3>

      <ParamTable>
        <thead>
          <tr><Th>Parameter</Th><Th>Type</Th><Th>Description</Th></tr>
        </thead>
        <tbody>
          <tr><Td mono>intention<Req /></Td><Td><IC>string</IC></Td><Td>A natural language description of what you want. Specificity optional. Enthusiasm encouraged.</Td></tr>
          <tr><Td mono>options.vibe</Td><Td><IC>"chill" | "locked-in" | "transcendent"</IC></Td><Td>Sets the operational intensity. Default: <IC>"chill"</IC>. Use <IC>"transcendent"</IC> for demos.</Td></tr>
          <tr><Td mono>options.please</Td><Td><IC>boolean</IC></Td><Td>Whether to be polite. Dramatically affects output quality. Default: <IC>true</IC>.</Td></tr>
          <tr><Td mono>options.aesthetic</Td><Td><IC>string</IC></Td><Td>Visual direction. Accepts brand names, adjectives, or URLs to Dribbble shots.</Td></tr>
          <tr><Td mono>options.confidence</Td><Td><IC>number</IC></Td><Td>A value between 0 and 1 representing how certain you are this will work. Must exceed <IC>0.85</IC> or the runtime will refuse to proceed.</Td></tr>
          <tr><Td mono>options.deadline</Td><Td><IC>"yesterday" | "soon" | "whenever"</IC></Td><Td>Urgency modifier. <IC>"yesterday"</IC> skips tests. <IC>"whenever"</IC> adds them (theoretically).</Td></tr>
        </tbody>
      </ParamTable>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Returns</h3>

      <p className="mb-4">
        A <IC>Promise</IC> that resolves to <IC>Something</IC>. The <IC>Something</IC> type is intentionally left unparameterized. Strict typing would constrain the creative output of the runtime and is therefore considered an anti-pattern.
      </p>

      <SyntaxCodeBlock lang="typescript" filename="types.d.ts">
        <Cmt>{"/**"}{"\n"}{" * The output of a vibe() invocation."}{"\n"}{" * Deliberately untyped to preserve creative flexibility."}{"\n"}{" * If you need to know the shape of this, you may not be"}{"\n"}{" * ready for intention-driven development."}{"\n"}{" */"}</Cmt>{"\n"}
        <Kw>type</Kw> <span className="text-[#c026d3]">Something</span> = <span className="text-[#c026d3]">any</span>{"\n"}
        {"\n"}
        <Cmt>{"// For TypeScript users who need \"safety\""}</Cmt>{"\n"}
        <Kw>type</Kw> <span className="text-[#c026d3]">StrictSomething</span> = <span className="text-[#c026d3]">any</span> <Cmt>{"// same thing but with more confidence"}</Cmt>
      </SyntaxCodeBlock>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Usage Examples</h3>

      <SyntaxCodeBlock lang="js" filename="Basic">
        <Cmt>{"// Hello World"}</Cmt>{"\n"}
        <Kw>await</Kw> <Fn>vibe</Fn>(<Str>"hello world but make it a startup"</Str>){"\n"}
        {"\n"}
        <Cmt>{"// E-commerce"}</Cmt>{"\n"}
        <Kw>await</Kw> <Fn>vibe</Fn>(<Str>"shopify but indie"</Str>){"\n"}
        {"\n"}
        <Cmt>{"// Enterprise"}</Cmt>{"\n"}
        <Kw>await</Kw> <Fn>vibe</Fn>(<Str>"the thing my PM described. you know the one."</Str>)
      </SyntaxCodeBlock>

      <SyntaxCodeBlock lang="js" filename="Advanced">
        <Cmt>{"// With options"}</Cmt>{"\n"}
        <Kw>await</Kw> <Fn>vibe</Fn>(<Str>"make it production-ready"</Str>, {"{"}{"\n"}
        {"  "}<Prop>vibe</Prop>: <Str>"transcendent"</Str>,{"\n"}
        {"  "}<Prop>please</Prop>: <Kw>true</Kw>,{"\n"}
        {"  "}<Prop>aesthetic</Prop>: <Str>"linear meets notion meets that one portfolio site"</Str>,{"\n"}
        {"  "}<Prop>confidence</Prop>: <Num>0.99</Num>,{"\n"}
        {"  "}<Prop>deadline</Prop>: <Str>"yesterday"</Str>{"\n"}
        {"}"})
      </SyntaxCodeBlock>

      <h2 id="config" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">Configuration</h2>

      <p className="mb-4">
        VibeScriptJS supports both file-based and environment-variable configuration. The configuration system is designed to be maximally flexible, which is to say, most of it doesn't do anything yet.
      </p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Environment Variables</h3>

      <ParamTable>
        <thead>
          <tr><Th>Variable</Th><Th>Default</Th><Th>Description</Th></tr>
        </thead>
        <tbody>
          <tr><Td mono>VIBE_LEVEL</Td><Td><IC>"immaculate"</IC></Td><Td>Global vibe intensity. Accepts any positive adjective.</Td></tr>
          <tr><Td mono>VIBE_PLEASE</Td><Td><IC>"true"</IC></Td><Td>Enables politeness mode. Disabling this is not recommended and has not been tested.</Td></tr>
          <tr><Td mono>VIBE_MODEL</Td><Td><IC>"claude"</IC></Td><Td>The backing model. Other values are accepted but quietly ignored.</Td></tr>
          <tr><Td mono>VIBE_TIMEOUT</Td><Td><IC>"generous"</IC></Td><Td>How long to wait. Accepts <IC>"generous"</IC>, <IC>"patient"</IC>, or a number in milliseconds that will be rounded up to <IC>"generous"</IC>.</Td></tr>
          <tr><Td mono>VIBE_DEBUG</Td><Td><IC>"false"</IC></Td><Td>Enables debug output, which is the same as regular output but with more console.logs that say <IC>"here"</IC>.</Td></tr>
        </tbody>
      </ParamTable>

      <h2 id="auth" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">Authentication</h2>

      <p className="mb-4">
        VibeScriptJS implements a multi-layered authentication strategy designed to balance security, developer experience, and the emotional well-being of the runtime.
      </p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">API Key Configuration</h3>
      <p className="mb-4">
        To authenticate with the VibeScriptJS cloud service, you will need an API key, which can be obtained by navigating to the developer portal, clicking "Get API Key," and then completing a brief questionnaire about your relationship with your codebase.
      </p>

      <SyntaxCodeBlock lang="bash" filename=".env">
        {`VIBE_API_KEY=vsk_live_do_not_put_this_in_github_seriously
VIBE_TONE=respectful
VIBE_MANNERS=enabled`}
      </SyntaxCodeBlock>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Token-Based Auth (Enterprise)</h3>
      <p className="mb-4">
        Enterprise customers may use JWT tokens for authentication. Token payloads must include the following claims:
      </p>

      <ParamTable>
        <thead>
          <tr><Th>Claim</Th><Th>Type</Th><Th>Description</Th></tr>
        </thead>
        <tbody>
          <tr><Td mono>sub</Td><Td><IC>string</IC></Td><Td>The developer's identity.</Td></tr>
          <tr><Td mono>iat</Td><Td><IC>number</IC></Td><Td>Issued-at timestamp.</Td></tr>
          <tr><Td mono>vibe</Td><Td><IC>string</IC></Td><Td>The developer's current emotional state. Used for request routing.</Td></tr>
          <tr><Td mono>pls</Td><Td><IC>boolean</IC></Td><Td>Politeness flag. Must be <IC>true</IC>.</Td></tr>
        </tbody>
      </ParamTable>

      <Callout type="note" label="On politeness">
        Extensive A/B testing has shown that requests containing the word "please" produce output that is 47% more correct, 31% better formatted, and 100% more likely to include helpful comments. The <IC>please</IC> parameter is optional in the same way that saying "thank you" is optional: technically, yes. Practically, no.
      </Callout>

      <h2 id="errors" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">Error Handling</h2>

      <p className="mb-4">
        VibeScriptJS takes a novel approach to error handling, grounded in the observation that most errors are simply the result of <strong className="text-text-primary">insufficient clarity of intention</strong>. Rather than complex try/catch hierarchies or typed error enums, VibeScriptJS encourages developers to <em>try again, but with more feeling</em>.
      </p>

      <SyntaxCodeBlock lang="js" filename="Recommended error handling">
        <Kw>try</Kw> {"{"}{"\n"}
        {"  "}<Kw>await</Kw> <Fn>vibe</Fn>(<Str>"build the app"</Str>){"\n"}
        {"}"} <Kw>catch</Kw> (e) {"{"}{"\n"}
        {"  "}<Kw>await</Kw> <Fn>vibe</Fn>(<Str>"build the app, but like, correctly this time"</Str>){"\n"}
        {"}"}
      </SyntaxCodeBlock>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Escalation Pattern</h3>

      <p className="mb-4">
        For mission-critical applications, VibeScriptJS supports progressive error escalation, where each retry increases in specificity and emotional intensity:
      </p>

      <SyntaxCodeBlock lang="js" filename="Progressive escalation">
        <Kw>try</Kw> {"{"}{"\n"}
        {"  "}<Kw>await</Kw> <Fn>vibe</Fn>(<Str>"build my app"</Str>){"\n"}
        {"}"} <Kw>catch</Kw> {"{"}{"\n"}
        {"  "}<Kw>try</Kw> {"{"}{"\n"}
        {"    "}<Kw>await</Kw> <Fn>vibe</Fn>(<Str>"build my app, a react dashboard with auth"</Str>){"\n"}
        {"  }"} <Kw>catch</Kw> {"{"}{"\n"}
        {"    "}<Kw>try</Kw> {"{"}{"\n"}
        {"      "}<Kw>await</Kw> <Fn>vibe</Fn>(<Str>"please. i need this by monday."</Str>){"\n"}
        {"    }"} <Kw>catch</Kw> {"{"}{"\n"}
        {"      "}<Kw>await</Kw> <Fn>vibe</Fn>(<Str>"ok fine what CAN you do"</Str>){"\n"}
        {"    }"}{"\n"}
        {"  }"}{"\n"}
        {"}"}
      </SyntaxCodeBlock>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Error Types</h3>

      <ParamTable>
        <thead>
          <tr><Th>Error</Th><Th>Cause</Th><Th>Resolution</Th></tr>
        </thead>
        <tbody>
          <tr><Td><IC>VibeError</IC></Td><Td>General failure of the universe to comply with your intentions</Td><Td>Retry with more specificity, or less. Either might work.</Td></tr>
          <tr><Td><IC>InsufficientVibeError</IC></Td><Td>Your <IC>confidence</IC> was set below <IC>0.85</IC></Td><Td>Believe in yourself more</Td></tr>
          <tr><Td><IC>AmbiguousIntentionError</IC></Td><Td>The runtime could not determine what you meant by "make it pop"</Td><Td>Reference a specific Dribbble shot</Td></tr>
          <tr><Td><IC>PolitenessError</IC></Td><Td><IC>please</IC> was set to <IC>false</IC></Td><Td>Reconsider your choices</Td></tr>
          <tr><Td><IC>TimeoutError</IC></Td><Td>The intention was too ambitious for the current vibe level</Td><Td>Set <IC>vibe: "transcendent"</IC> or lower your expectations</Td></tr>
          <tr><Td><IC>YikesError</IC></Td><Td>Something happened that the framework cannot describe in a professional manner</Td><Td>Close your laptop. Open it again. Proceed with caution.</Td></tr>
        </tbody>
      </ParamTable>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Timeout Behavior</h3>

      <p className="mb-4">
        When a <IC>vibe()</IC> invocation exceeds the configured timeout threshold, the framework activates the <strong className="text-text-primary">Passive-Aggressive Encouragement Protocol</strong> (PAEP). Rather than failing silently, the runtime provides a series of escalating console messages designed to motivate both the developer and the network:
      </p>

      <SyntaxCodeBlock lang="plaintext" filename="Console output (PAEP engaged)">
        <Cmt>[vibe] Verifying internet connection...</Cmt>{"\n"}
        <Cmt>[vibe] Internet connection verified.</Cmt>{"\n"}
        <Cmt>[vibe] Still working. You're doing great.</Cmt>{"\n"}
        <Cmt>[vibe] This is taking longer than expected. Not judging.</Cmt>{"\n"}
        <Cmt>[vibe] Just checking — you did save the file, right?</Cmt>{"\n"}
        <Cmt>[vibe] Other developers' vibes are resolving normally. Just so you know.</Cmt>{"\n"}
        <Cmt>[vibe] Have you considered that the intention might be... a lot?</Cmt>{"\n"}
        <Cmt>[vibe] No worries. We'll get there. Probably.</Cmt>{"\n"}
        <Cmt>[vibe] Honestly at this point you could have written it yourself.</Cmt>{"\n"}
        <Cmt>[vibe] Not that you should. That's not what we're about.</Cmt>{"\n"}
        <Cmt>[vibe] Resolved. See? Worth the wait.</Cmt>
      </SyntaxCodeBlock>

      <h2 id="architecture" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">Architecture Patterns</h2>

      <p className="mb-4">
        VibeScriptJS supports several architectural patterns, each optimized for different team sizes, deployment targets, and levels of understanding of what "architecture" means.
      </p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Recommended Architecture</h3>

      <ArchDiagram caption="Fig. 1 — Production architecture (all tiers)">
        <ArchDiagram.Box>Your Idea</ArchDiagram.Box>
        <ArchDiagram.Arrow />
        <ArchDiagram.Box>vibe()</ArchDiagram.Box>
        <ArchDiagram.Arrow />
        <ArchDiagram.Box primary>Claude</ArchDiagram.Box>
        <ArchDiagram.Arrow />
        <ArchDiagram.Box>App</ArchDiagram.Box>
      </ArchDiagram>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Enterprise Architecture</h3>

      <ArchDiagram caption="Fig. 2 — Enterprise architecture (adds process but not value)">
        <ArchDiagram.Box>Your Idea</ArchDiagram.Box>
        <ArchDiagram.Arrow />
        <ArchDiagram.Box>Jira Ticket</ArchDiagram.Box>
        <ArchDiagram.Arrow />
        <ArchDiagram.Box>Sprint Planning</ArchDiagram.Box>
        <ArchDiagram.Arrow />
        <ArchDiagram.Box>vibe()</ArchDiagram.Box>
        <ArchDiagram.Arrow />
        <ArchDiagram.Box primary>Claude</ArchDiagram.Box>
        <ArchDiagram.Arrow />
        <ArchDiagram.Box>App</ArchDiagram.Box>
      </ArchDiagram>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Microservices</h3>

      <p className="mb-4">
        VibeScriptJS fully supports microservices architecture. Simply invoke <IC>vibe()</IC> separately for each service:
      </p>

      <SyntaxCodeBlock lang="js" filename="microservices.vibe.js">
        <Kw>await</Kw> <Fn>Promise</Fn>.<Fn>all</Fn>([{"\n"}
        {"  "}<Fn>vibe</Fn>(<Str>"make the auth service"</Str>),{"\n"}
        {"  "}<Fn>vibe</Fn>(<Str>"make the payment service"</Str>),{"\n"}
        {"  "}<Fn>vibe</Fn>(<Str>"make the notification service"</Str>),{"\n"}
        {"  "}<Fn>vibe</Fn>(<Str>"make them talk to each other somehow"</Str>),{"\n"}
        ])
      </SyntaxCodeBlock>

      <h2 id="performance" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">Performance & Optimization</h2>

      <p className="mb-4">
        VibeScriptJS is optimized for developer throughput (ideas per minute) rather than traditional metrics like response time or memory usage. However, for teams that are asked about performance in board meetings, we offer the following guidance.
      </p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Caching</h3>

      <p className="mb-4">VibeScriptJS automatically caches vibes that have been previously manifested. If you invoke the same intention twice, the second invocation will return a cached result, unless the vibe of the cache has decayed. Vibe decay is determined by factors including ambient temperature, npm audit output, and whether Mercury is in retrograde.</p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Optimization</h3>

      <SyntaxCodeBlock lang="js" filename="Performance optimization">
        <Cmt>{"// Before (slow: 2 vibes)"}</Cmt>{"\n"}
        <Kw>await</Kw> <Fn>vibe</Fn>(<Str>"build the frontend"</Str>){"\n"}
        <Kw>await</Kw> <Fn>vibe</Fn>(<Str>"now make it fast"</Str>){"\n"}
        {"\n"}
        <Cmt>{"// After (optimized: 1 vibe)"}</Cmt>{"\n"}
        <Kw>await</Kw> <Fn>vibe</Fn>(<Str>"build a fast frontend"</Str>)
      </SyntaxCodeBlock>

      <Callout type="tip" label="Performance tip">
        The single most impactful optimization you can make is to want fewer things. Every additional requirement adds latency. The fastest application is the one that does nothing, which is also the most bug-free.
      </Callout>

      <h2 id="migration" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">Migration Guide</h2>

      <p className="mb-4">
        This guide covers migrating from <strong className="text-text-primary">Legacy Development</strong> (also known as "writing code yourself") to VibeScriptJS. The migration process has been designed to be as seamless as possible, requiring only that you stop doing what you were doing and start doing this instead.
      </p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Step 1: Assessment</h3>
      <p className="mb-4">Examine your existing codebase. Note the number of files, the depth of the dependency tree, the number of open GitHub issues, and the last time anyone felt joy while working on it. These metrics will not be used — they are for your own reflection.</p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Step 2: Migration</h3>

      <SyntaxCodeBlock lang="js" filename="migrate.vibe.js">
        <Kw>await</Kw> <Fn>vibe</Fn>(<Str>"take my existing app and make it good"</Str>)
      </SyntaxCodeBlock>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Step 3: Verification</h3>
      <p className="mb-4">Open the application. Does it work? If yes, migration is complete. If no, return to Step 2 with more adjectives.</p>

      <Callout type="warning" label="Breaking changes">
        Migrating to VibeScriptJS may result in the loss of your existing codebase, test suite, CI/CD pipeline, and accumulated technical debt. For most teams, this is the primary benefit.
      </Callout>

      <h2 id="testing" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">Testing</h2>

      <p className="mb-4">
        VibeScriptJS ships with a comprehensive testing framework that aligns with the intention-driven development philosophy. Tests are written in the same format as application code:
      </p>

      <SyntaxCodeBlock lang="js" filename="app.test.vibe.js">
        <Kw>import</Kw> {"{ test }"} <Kw>from</Kw> <Str>'vibescriptjs/testing'</Str>{"\n"}
        {"\n"}
        <Fn>test</Fn>(<Str>"it should work"</Str>, <Kw>async</Kw> () =&gt; {"{"}{"\n"}
        {"  "}<Kw>await</Kw> <Fn>vibe</Fn>(<Str>"check if the app works"</Str>){"\n"}
        {"}"}){"\n"}
        {"\n"}
        <Fn>test</Fn>(<Str>"it should look good"</Str>, <Kw>async</Kw> () =&gt; {"{"}{"\n"}
        {"  "}<Kw>await</Kw> <Fn>vibe</Fn>(<Str>"does it look good? be honest."</Str>){"\n"}
        {"}"}){"\n"}
        {"\n"}
        <Fn>test</Fn>(<Str>"edge cases"</Str>, <Kw>async</Kw> () =&gt; {"{"}{"\n"}
        {"  "}<Kw>await</Kw> <Fn>vibe</Fn>(<Str>"what if someone does something weird"</Str>){"\n"}
        {"}"})
      </SyntaxCodeBlock>

      <p className="mb-4">
        Tests are run with the <IC>vibe test</IC> CLI command. All tests pass by default. Failing a test requires explicit opt-in via the <IC>--actually-check</IC> flag, which is not documented because it ruins the experience.
      </p>

      <h2 id="faq" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">FAQ</h2>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Is VibeScriptJS production-ready?</h3>
      <p className="mb-4">VibeScriptJS is production-ready in the sense that you can deploy applications built with it to production. Whether this is advisable depends on your organization's definition of "ready" and your personal relationship with risk.</p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Does VibeScriptJS support TypeScript?</h3>
      <p className="mb-4">VibeScriptJS supports TypeScript in the same way that a labrador supports your decision to put a hat on it. It will go along with it. It will not understand why.</p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">How does VibeScriptJS compare to React / Next.js / etc?</h3>
      <p className="mb-4">Traditional frameworks require you to learn concepts, write code, and understand how software works. VibeScriptJS requires a text field and optimism. These are different value propositions and we respect all approaches, including the ones that are harder for no reason.</p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">What if I need to debug something?</h3>

      <SyntaxCodeBlock lang="js" filename="Debugging">
        <Kw>await</Kw> <Fn>vibe</Fn>(<Str>"something is broken. fix it."</Str>)
      </SyntaxCodeBlock>

      <p className="mb-4">If the issue persists, increase the specificity of your complaint:</p>

      <SyntaxCodeBlock lang="js" filename="Advanced debugging">
        <Kw>await</Kw> <Fn>vibe</Fn>(<Str>"the button doesn't work. the blue one. no, the other blue one."</Str>)
      </SyntaxCodeBlock>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Is VibeScriptJS open source?</h3>
      <p className="mb-4">VibeScriptJS is source-available under the VIBE-1.0 license, which permits usage, modification, and redistribution, provided that all derivative works maintain a <IC>confidence</IC> level of at least <IC>0.85</IC> and include the word "please" in at least 30% of their <IC>vibe()</IC> invocations.</p>

      <h3 className="text-[18px] font-semibold mt-10 mb-3">Why is it called VibeScript<em>JS</em>?</h3>
      <p className="mb-4">See the <a href="#overview" className="text-[#7c5cfc] hover:underline">note on naming</a>.</p>

      <h2 id="changelog" className="font-display text-[24px] font-bold mt-16 mb-4 tracking-[-0.3px] pt-8 border-t border-border reveal">Changelog</h2>

      <ChangelogEntry version="v4.2.0" date="March 2026">
        Asked Claude to improve performance. Performance improved. We did not investigate how.
      </ChangelogEntry>

      <ChangelogEntry version="v4.1.0" date="February 2026">
        Added <IC>please</IC> parameter. Output quality increased 47%. Added <IC>"transcendent"</IC> vibe level for demos and investor meetings. Fixed issue where <IC>vibe("make it pop")</IC> was literally adding popcorn animations.
      </ChangelogEntry>

      <ChangelogEntry version="v4.0.0" date="January 2026">
        <strong className="text-text-primary">Breaking:</strong> Removed all code from the framework. This was the planned v4 architecture and is working as intended. Applications now generate themselves at runtime from pure intention. Existing codebases should migrate by deleting their <IC>src/</IC> directory.
      </ChangelogEntry>

      <ChangelogEntry version="v3.2.1" date="December 2025">
        Asked Claude to fix the bug from v3.2.0. Claude fixed it and also refactored the entire state management layer. Nobody asked for this but it's better now.
      </ChangelogEntry>

      <ChangelogEntry version="v3.2.0" date="December 2025">
        Added new bug. Investigating.
      </ChangelogEntry>

      <ChangelogEntry version="v3.1.0" date="November 2025">
        Introduced the Intention Architecture documentation. Received feedback that the documentation is longer than the framework source code. This is accurate. The documentation <em>is</em> the framework.
      </ChangelogEntry>

      <ChangelogEntry version="v3.0.0" date="October 2025">
        <strong className="text-text-primary">Breaking:</strong> Renamed from VibeScript to VibeScriptJS. No other changes. Updated all 847 pages of documentation to reflect the new name. Regression: some documentation still says VibeScript. We have opened a <IC>vibe()</IC> to fix this.
      </ChangelogEntry>

      <ChangelogEntry version="v2.0.0" date="August 2025">
        Rewrote the entire framework from scratch. Again. The previous version was "not vibing" according to internal metrics. New version vibes harder. Benchmark methodology: we looked at it and it felt right.
      </ChangelogEntry>

      <ChangelogEntry version="v1.0.0" date="June 2025">
        Initial release. Described in the launch blog post as "the future of development." Contained 14 lines of code, 11 of which were import statements. Received 4,200 GitHub stars in the first week. None of the stargazers opened an issue, which we interpret as a sign of quality.
      </ChangelogEntry>

      <div className="text-[12px] text-text-tertiary mt-20 pt-6 border-t border-border leading-[1.7]">
        <p>
          <strong className="text-text-primary">VibeScriptJS</strong> · v4.2.0 · Documentation Revision 7<br />
          © 2026 VibeScriptJS Foundation. All rights reserved. No rights reserved. It's vibes.
        </p>
        <p className="mt-2">
          Built with VibeScriptJS. Or possibly without it. The framework is philosophically opposed to verification.
        </p>
      </div>
    </div>
  );
}
