export default function GastownMergeQueue() {
  return (
    <article>
      <p className="text-[15px] text-text-secondary italic mb-8">
        note: the bulk of this article won't make sense unless you have read{" "}
        <a
          href="https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04"
          target="_blank"
          rel="noopener noreferrer"
          className="text-apple-blue hover:underline"
        >
          the article by Steve Yegge that inspired it
        </a>
      </p>

      <p>
        If you are a Sr./Staff/Principal level Engineer currently integrating
        LLMs into your workflow, you have likely hit the same wall I have. We
        have moved past the "wow" phase of GitHub Copilot and Cursor. We are now
        in the "scale" phase, and it is breaking our infrastructure.
      </p>
      <p>
        Generating code isn't the problem anymore. The problem is that we
        effectively have an infinite supply of eager, mid-level junior developers
        (AI agents) who never sleep, but who also flood our CI pipelines, create
        merge conflicts, and demand incessant code review.
      </p>
      <p>
        Most of the industry is busy building better text editors. They are
        solving for the individual typist. Steve Yegge, in his new Gastown
        manifesto, is solving for the system as a whole. He argues that the
        future is about building an industrial factory to manage the "monkey
        knife fight" that happens when 50 Claude Code agents, at the behest of
        5 engineers, try to merge PRs into main branch simultaneously. This may
        seem like a theoretical problem, but it's one that I see playing out
        every day now, and it is growing at the same pace as AI.
      </p>

      <h2 id="drowning">We're not swimming in code, we're drowning</h2>

      <p>
        Here are the critical concepts from Yegge's chaotic, tmux-based
        experiment that actually matter for engineering leadership, and some
        speculation on why this may be more of a warning sign of the floods to
        come than a product you're wanna deploy to your codebase tomorrow,
        unless, ya know YOLO.
      </p>

      <h3>The "Refinery": Automating the Merge Queue Hell</h3>

      <p>
        The immediate bottleneck for any team using agentic coding at scale is
        the Merge Queue. If you spin up five autonomous agents to handle tech
        debt or unit tests, you will inevitably DDoS your own CI server and
        create a dependency nightmare.
      </p>
      <p>
        Yegge's Gas Town introduces <strong>The Refinery</strong>: an agent whose
        sole responsibility is managing the merge queue. Think of it as a
        backpressure-aware coordinator that mediates between the "Polecats"
        (ephemeral worker agents) and the codebase, preventing the chaotic
        collision of changes.
      </p>
      <p>
        For the Senior/Staff level engineer, this is the lightbulb moment: what
        we need next is more management agents. The Refinery is
        effectively an automated Release Engineer, ensuring that high-velocity AI
        output doesn't result in a deadlock of broken builds.
      </p>

      <h3>"Nondeterministic Idempotence": A New Reliability Model</h3>

      <p>
        How do you build a reliable system on top of non-deterministic LLMs? If
        you ask an agent to refactor a class, it might do it differently three
        times in a row.
      </p>
      <p>
        Yegge introduces a principle called{" "}
        <strong>Nondeterministic Idempotence (NDI)</strong>.
      </p>
      <ul>
        <li>Kubernetes asks: "Is the service running?" (Availability)</li>
        <li>Gastown asks: "Is the job done?" (Completion)</li>
      </ul>
      <p>
        NDI accepts that the path the AI takes is chaotic and unpredictable
        (nondeterministic). It might hallucinate, crash, or take a weird detour.
        But the outcome must be idempotent. If an agent dies halfway through a
        task, the system doesn't rollback. It spins up a fresh agent that looks
        at the persistent state and finishes the job. This shifts our focus from
        "prompt engineering" (trying to make the AI perfect) to "system
        resilience" (assuming the AI will fail, and designing the architecture to
        absorb it).
      </p>

      <h3>The MEOW Stack: Durability Beyond the Context Window</h3>

      <p>
        One of the biggest frustrations with tools like Claude Code or standard
        agent frameworks is the fragility of context. If the session crashes, the
        "thought process" is lost.
      </p>
      <p>
        Gas Town decouples the work from the worker using the{" "}
        <strong>Molecular Expression of Work (MEOW)</strong> stack.
      </p>
      <ul>
        <li>
          <strong>Beads</strong>: Atomic units of work (git-backed issues).
        </li>
        <li>
          <strong>Molecules</strong>: Durable, sequenced workflows that survive
          crashes.
        </li>
      </ul>
      <p>
        This transforms "work" from ephemeral chat logs into persistent,
        git-backed objects. It's a distributed transaction log for knowledge work.
        For an architect, this is crucial: it means we can treat AI operations
        with the same durability guarantees we expect from a database transaction.
      </p>

      <h3>The "Post-Apocalyptic" Org Chart</h3>

      <p>
        Yegge categorizes agents not by model capability, but by organizational
        role.
      </p>
      <ul>
        <li>
          <strong>The Overseer</strong>: You (the human architect).
        </li>
        <li>
          <strong>The Mayor</strong>: Your Chief of Staff/Dispatcher.
        </li>
        <li>
          <strong>The Polecats</strong>: Disposable, high-volume workers.
        </li>
        <li>
          <strong>The Witness</strong>: A localized observability agent watching
          the Polecats.
        </li>
      </ul>
      <p>
        Observability is different for AI. Beyond stack traces, we need a
        "Witness" agent that can look at a stuck "Polecat" and say, "Hey, you're
        looping, try a different approach." That's self-healing infrastructure
        applied to the coding process itself.
      </p>

      <h3>The New Skill Tree: From "Coder" to "Factory Operator"</h3>

      <p>
        Yegge outlines the "8 Stages of Dev Evolution," and it's a reality check
        for anyone hiring right now.
      </p>
      <ul>
        <li>
          Stage 1–4: Using AI as a fancy autocomplete (Copilot/Cursor).
        </li>
        <li>
          Stage 7–8: Orchestrating swarms of agents via CLI and custom tooling.
        </li>
      </ul>
      <p>
        Gas Town is strictly for Stage 7/8 engineers. It forces us to admit that
        the job description of a "Senior Engineer" is changing. We're designing
        the factory floor now. The new metric is: how many concurrent agents
        can you effectively wrangle before your process breaks?
      </p>

      <h2 id="blockchain-memories">
        Blockchain-Backed Memories: The Missing Piece?
      </h2>

      <p>
        While Gas Town solves for durability using Git (the MEOW stack), we are
        still operating in the "Wild West." Git is excellent for code versioning,
        but it is a poor database for high-frequency agent state and economic
        incentives.
      </p>
      <p>
        The logical evolution of Yegge's "industrial factory" is not just
        persistent files, but immutable, trustless memory (specifically an L3
        blockchain, or IPFS derivative) dedicated to persistent, immutable
        memories fueling agent orchestration.
      </p>
      <p>
        In Gastown, if an agent hallucinates and corrupts the "Molecule" (the
        work state), the recovery path is manual and messy. A blockchain-based
        memory system offers a superior alternative:
      </p>
      <ul>
        <li>
          <strong>Trustless Verification</strong>: Every state change by an agent
          is a transaction. We can mathematically verify which agent corrupted the
          data.
        </li>
        <li>
          <strong>Economic Throttling</strong>: You can solve the "infinite loop"
          problem by forcing agents to spend tokens (gas) to execute tasks. When
          the wallet runs dry, the rogue agent dies automatically.
        </li>
        <li>
          <strong>True Permanence</strong>: Git history can be rewritten; a
          blockchain ledger cannot. For an "Overseer" managing 1,000 agents, you
          need an unalterable audit log of exactly who did what and when.
        </li>
      </ul>
      <p>
        Gas Town proves we need persistent state for agents. But the future
        "Stage 9" architecture will likely move that state from a mutable Git
        repo to an immutable ledger (like an Arbitrum L3), effectively turning
        the "monkey knife fight" into a regulated, transparent economy of work.
      </p>

      <h2 id="warning-sign">Gastown reads as a warning sign</h2>

      <p>
        Gastown is unapologetically janky. It's written in Go, runs in tmux, and
        Yegge explicitly warns it will "rip your face off." For the elite
        engineer, it represents the first honest look at what comes next.
      </p>
      <p>
        We're past the novelty phase, into the industrialization phase. The
        bottleneck is no longer code generation but code integration. Machine
        memory powered state management, and immutable records of the
        orchestration. If you aren't thinking about how to build your own
        "Refinery" (or even just your own toolchain) to handle the coming flood
        of AI-generated code, you're going to drown in the queue.
      </p>
    </article>
  );
}
