export default function AgentToolProblem() {
  return (
    <article>
      <p>
        Your agent has 50 tools. The LLM sees all 50 of them, every schema,
        every parameter description, every usage hint, shoved into the system
        prompt on every single turn. That's thousands of tokens burned before the
        model even starts thinking about what the user asked.
      </p>
      <p>
        And it works. Mostly. Until it doesn't.
      </p>
      <p>
        Until the model picks <code>search_documents</code> when it meant{" "}
        <code>search_code</code>. Until you add ten more tools and suddenly the
        selection accuracy drops off a cliff because the context window is doing
        triage instead of reasoning. Until you realize you're paying for all
        those tokens, every turn, whether the user needs one tool or zero.
      </p>
      <p>
        This is the dirty secret of tool use in 2026: the "just put them all in
        the prompt" approach doesn't scale, and everyone building agents knows
        it, and nobody has a great answer.
      </p>
      <p>
        I built one. It's called{" "}
        <a
          href="https://github.com/johnnyclem/smallchat"
          target="_blank"
          rel="noopener noreferrer"
        >
          smallchat
        </a>
        .
      </p>

      <hr className="my-10 border-border" />

      <h2 id="insight">The Insight That Wouldn't Leave Me Alone</h2>

      <p>
        I've been an Objective-C developer since before Swift existed. Spent
        years as CTO of Filmic Pro, living inside AVFoundation and the Obj-C
        runtime. And there's this thing the Obj-C runtime does that I've always
        found beautiful: message dispatch.
      </p>
      <p>
        When you call a method in Objective-C, you don't call a function. You
        send a message. <code>[object doSomethingWith: argument]</code> doesn't
        directly invoke code. It sends the <em>intent</em>{" "}
        <code>doSomethingWith:</code> to the runtime, and the runtime figures out
        which implementation to call. It checks the method cache first
        (sub-nanosecond). If that misses, it walks the dispatch table. If that
        misses, it walks the superclass chain. If <em>that</em> misses, it hits{" "}
        <code>forwardInvocation:</code>, a last-chance handler that can route
        the message somewhere else entirely.
      </p>
      <p>
        Cache → dispatch table → superclass chain → forwarding.
      </p>
      <p>
        Sound familiar?
      </p>
      <p>
        Because that's exactly the problem LLM tool use is trying to solve. The
        LLM expresses intent like "search for code," and <em>something</em> needs
        to figure out which tool handles it. Right now, that something is the LLM
        itself, staring at 50 tool schemas and guessing. That's like skipping the
        method cache, skipping the dispatch table, and going straight to{" "}
        <code>forwardInvocation:</code> every single time.
      </p>
      <p>
        Once I saw it, I couldn't unsee it. Tool use <em>is</em> message
        dispatch. We just haven't been treating it that way.
      </p>

      <h2 id="what-smallchat-does">What smallchat Actually Does</h2>

      <p>
        smallchat is a tool compiler. You point it at your MCP servers, your tool
        manifests, whatever, and it compiles them into a dispatch table with
        embedded semantic vectors.
      </p>

      <pre className="bg-[#1e1e2e] text-[#cdd6f4] rounded-xl p-5 overflow-x-auto text-[14px] leading-relaxed font-mono my-6">
        <code>npx smallchat compile --source ~/.mcp.json</code>
      </pre>

      <p>
        At runtime, when your agent says "search for code," smallchat doesn't
        send 50 schemas to the LLM. It embeds the intent into a vector, searches
        the dispatch table via cosine similarity, checks the resolution cache,
        and resolves to the right tool in microseconds. The LLM never sees the
        tools it doesn't need.
      </p>
      <p>
        That's it. That's the core idea. Everything else is details.
      </p>
      <p>But the details are where it gets interesting.</p>

      <h2 id="details">The Details</h2>

      <p>
        <strong>The resolution cache</strong> is the method cache from{" "}
        <code>objc_msgSend</code>. Once an intent resolves to a tool, that
        resolution is cached with version tags: provider version, model version,
        schema fingerprint. If anything changes, stale entries auto-expire. Hot
        intents skip the vector search entirely on repeat calls.
      </p>
      <p>
        <strong>Selector interning</strong> means that "search for code" and
        "find code" resolve to the same canonical selector. Same intent,
        different words, same tool. The embeddings handle synonymy; the interning
        table handles deduplication.
      </p>
      <p>
        <strong>The fallback chain</strong> is <code>forwardInvocation:</code>.
        When the dispatch table doesn't have a match, smallchat walks superclass
        chains, broadens the similarity threshold, and returns a structured "I'm
        not sure, here are the nearest options" result instead of crashing. Your
        agent can recover gracefully.
      </p>
      <p>
        <strong>Method swizzling</strong> lets you hot-swap a tool implementation
        at runtime. Testing? Swap in a mock. Production issue with a provider?
        Swap in a fallback. The cache auto-invalidates for that selector.
      </p>
      <p>
        <strong>Function overloading</strong> means the same intent can resolve
        to different tools based on argument types. "Send a message" with a{" "}
        <code>channel</code> argument dispatches to Slack. "Send a message" with
        an <code>email</code> argument dispatches to Gmail. The runtime resolves
        by type specificity, walking the SCObject hierarchy just like Obj-C's
        type system.
      </p>
      <p>
        None of this requires changes to your LLM, your prompts, or your
        existing MCP servers. smallchat sits between the model and the tools.
        It's a runtime, not a framework.
      </p>

      <h2 id="in-practice">What This Means in Practice</h2>

      <p>
        Three things change when you stop stuffing tools into prompts:
      </p>
      <p>
        <strong>Token costs drop.</strong> Your system prompt shrinks from
        thousands of tokens of tool schemas to a compact capability summary. The
        LLM gets a header that says "here's what you can do" in a few hundred
        tokens, and the runtime handles the mapping.
      </p>
      <p>
        <strong>Selection accuracy goes up.</strong> The LLM isn't choosing
        between 50 tools anymore. It's expressing intent in natural language, and
        a purpose-built semantic search is doing the matching. The vector index
        doesn't get confused by similar descriptions the way a language model
        does when it's also trying to reason about the user's question.
      </p>
      <p>
        <strong>You can scale without degradation.</strong> Add ten more MCP
        servers. Run <code>smallchat compile</code> again. The dispatch table
        grows, but the resolution path doesn't get slower, because the cache
        handles hot intents and the vector index handles the rest. The LLM
        doesn't even know the tool count changed.
      </p>

      <h2 id="limitations">The Honest Limitations</h2>

      <p>smallchat is at v0.2.0. Here's what it doesn't do yet:</p>
      <p>
        When dispatch is ambiguous (two tools are close matches), it takes the
        best one and annotates the result. The right answer is to narrow to 2-3
        candidates and let the LLM pick from just those, turning O(n)
        context-stuffing into O(1) resolution + O(3) disambiguation. That's
        coming.
      </p>
      <p>
        The compiled artifact is JSON. For small-to-medium toolsets, that's fine.
        For 1000+ tools, SQLite persistence with pre-indexed vectors is in
        progress.
      </p>
      <p>
        The ONNX model ships in the package (~22MB). That's a deliberate
        tradeoff: <code>npm install</code> gives you working semantic dispatch
        with zero extra setup. If install size bothers you, there's a hash-based
        local embedder with no model dependency.
      </p>

      <h2 id="try-it">Try It</h2>

      <pre className="bg-[#1e1e2e] text-[#cdd6f4] rounded-xl p-5 overflow-x-auto text-[14px] leading-relaxed font-mono my-6">
        <code>{`npm install @smallchat/core
npx smallchat compile --source ~/.mcp.json
npx smallchat resolve tools.toolkit.json "search for code"`}</code>
      </pre>

      <p>
        That last command shows you the full resolution trace: cache hit/miss,
        similarity scores, which tool was picked and why. It's like Instruments
        for tool dispatch.
      </p>
      <p>
        The code is MIT licensed and{" "}
        <a
          href="https://github.com/johnnyclem/smallchat"
          target="_blank"
          rel="noopener noreferrer"
        >
          on GitHub
        </a>
        . The core runtime is ~700 lines. There are 800 test cases and a
        benchmark suite that compares smallchat dispatch against keyword
        matching, embedding-only search, and GPT-4 tool selection across 700+
        intent-to-tool pairs.
      </p>
      <p>
        I've been building this in the open, iterating fast, and thinking about
        it probably too much. If the Obj-C runtime metaphor resonates with you,
        or even if it doesn't but you're tired of burning tokens on tool schemas,
        I'd love to hear what you think.
      </p>

      <p className="mt-8 text-[14px] text-text-secondary">
        <a
          href="https://smallchat.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          smallchat.dev
        </a>
        {" · "}
        <a
          href="https://github.com/johnnyclem/smallchat"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        {" · "}
        <a
          href="https://twitter.com/johnnyclem"
          target="_blank"
          rel="noopener noreferrer"
        >
          @johnnyclem
        </a>
      </p>
    </article>
  );
}
