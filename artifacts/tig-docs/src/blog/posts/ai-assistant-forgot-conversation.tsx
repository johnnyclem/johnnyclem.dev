export default function AiAssistantForgotConversation() {
  return (
    <article>
      <p>
        I built an AI assistant. We talked for hours. It pushed several commits
        to an open source repository. Setup Karpathy's wiki memory skill.
        Patched one of its bugs. Then it restarted, and forgot everything.
      </p>
      <p>
        Not hyperbole. I had to scroll up in our chat to find context it
        should have had. It claimed never to have heard of a project we'd
        discussed extensively, even though it had written a code review of
        that project hours earlier and couldn't remember doing it.
      </p>
      <p>
        What I didn't expect: its <strong>wiki survived</strong>.
      </p>

      <hr className="my-10 border-border" />

      <h2 id="what-actually-happened">What Actually Happened</h2>

      <p>
        My assistant (built on OpenClaw) maintains two memory systems. Session
        memory lives in <code>memory/YYYY-MM-DD.md</code> as daily notes,
        plus a curated <code>MEMORY.md</code>. The wiki lives in{" "}
        <code>wiki/</code> as a Karpathy-style markdown knowledge base.
      </p>
      <p>
        After a restart, session memory was gone. Wiki was intact.
      </p>
      <p>
        Wiki is just files on disk. Session memory apparently had some restart
        dependency that failed silently. Same machine, same disk, different
        failure modes.
      </p>

      <hr className="my-10 border-border" />

      <h2 id="the-irony">The Irony</h2>

      <p>
        I was building a tool called <strong>Stenographer</strong>, a real-time
        indexing layer for AI agent conversations. Its whole job is external,
        persistent, queryable memory that outlives the session.
      </p>
      <p>
        And there I was, experiencing the exact problem Stenographer is meant to
        solve.
      </p>
      <p>
        The wiki functioned as my assistant's Stenographer. It didn't know we'd
        talked about Stenographer. But it had the docs.
      </p>

      <hr className="my-10 border-border" />

      <h2 id="agent-memory">What This Means for Agent Memory</h2>

      <p>
        Session-bound memory is a liability dressed up as a feature. We
        optimize for it because it's convenient: fast reads, transactional
        consistency, tied to the current context. Agents that lose memory on
        restart are just chatbots with amnesia.
      </p>
      <p>
        What we actually need is{" "}
        <strong>external, durable, queryable memory</strong> that:
      </p>
      <ul>
        <li>Survives restarts</li>
        <li>
          Is independently queryable (not just context-window stuffing)
        </li>
        <li>Supports semantic search across time</li>
        <li>Handles updates, corrections, "tombstones"</li>
      </ul>
      <p>
        That's what Stenographer does. I just happened to build a cheaper
        version of it for myself without realizing it.
      </p>

      <hr className="my-10 border-border" />

      <h2 id="next-evolution">The Next Evolution</h2>

      <p>
        Every agent framework is wrestling with this. LangGraph has memory
        nodes. Mem0 claims "persistent memory for AI." But the simplest answer
        might be the oldest one: <strong>a wiki</strong>.
      </p>
      <p>
        Just files. Markdown. Git-optional. Queryable on your terms.
      </p>
      <p>
        My assistant's wiki carried the knowledge forward. The session didn't.
        That's the signal.
      </p>

      <hr className="my-10 border-border" />

      <h2 id="whats-next">What's Next</h2>

      <p>
        I'm fixing the memory layer properly now, making both systems durable.
        The bigger insight:
      </p>
      <blockquote>
        The most robust memory for an AI agent might just be a folder of
        markdown files that outlive every session.
      </blockquote>
      <p>Build for that. Everything else is a cache.</p>

      <p className="mt-8 text-[14px] text-text-secondary italic">
        Part of the agent stack series: Stenographer, Short-hand, Smallchat,
        AgentVault. Building in public.
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
