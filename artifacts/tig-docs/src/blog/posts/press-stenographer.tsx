import { Link } from "wouter";

export default function PressStenographer() {
  return (
    <>
      <p>
        <em>For immediate release · September 24, 2026</em>
      </p>
      <p>
        <strong>Stenographer</strong>, the open-source MCP server that indexes conversation logs into a
        queryable graph, today announced its asserted-truth layer: an append-only ledger of tombstones
        and unverified assertions that lives beside the model rather than inside it, plus a detector that
        objects in real time when assistant output contradicts the record.
      </p>
      <p>
        The release addresses a structural problem with agent memory. A model can be corrected clearly
        in one turn and regenerate the stale fact in the next, because nothing outside the generation
        holds the correction. Stenographer&apos;s answer is a court reporter: passive by design, it never
        writes into a conversation, but it keeps a record the conversation can be checked against.
      </p>

      <h2>What&apos;s new</h2>
      <ul>
        <li>
          <strong>Asserted tombstones (TB).</strong> A tombstone records a claim, at least one piece of
          evidence (a commit, file, test, command, wiki entry, or message), a named signer, and the
          specific dead literals a detector can match. The schema rejects anonymous authors, including{" "}
          <code>system</code>, <code>assistant</code>, <code>agent</code>, and <code>me</code>.
        </li>
        <li>
          <strong>Unverified assertions (UV).</strong> A second axis for things believed but not yet
          checked, each carrying its own verification method. Consumers are told to flag, not block.
        </li>
        <li>
          <strong>Append-only ledger.</strong> No entry is mutated or deleted. Status changes are new
          entries linking backward, and the cached status column is updated only inside the transaction
          that appends the justifying artifact.
        </li>
        <li>
          <strong>Machines detect, authors assert.</strong> The supersession detector and agents can only
          file proposals. An agent-drafted tombstone waits in a queue until a person notarizes it, through
          a secret-guarded REST route or a terminal command that requires typing the last four characters
          of the entry id.
        </li>
        <li>
          <strong>Independence enforced at write time.</strong> An entry cannot contest, verify, or
          override another entry from the same author or agent session. The error reads: one opinion
          wearing two hats is not two witnesses.
        </li>
        <li>
          <strong>Real-time objections.</strong> When assistant output contains a tombstoned literal, an
          objection is filed with the full exhibit and the transcript line. Matching is exact-token and
          subject-adjacent, tuned for precision. Modes are <code>off</code>, <code>shadow</code>, and{" "}
          <code>deliver</code>, with shadow the default. Objections go out over HMAC-signed webhooks or
          directly into a smallchat channel.
        </li>
      </ul>

      <p>
        &ldquo;Nothing is true because someone said it fluently,&rdquo; said Johnny Clem, the
        project&apos;s author. &ldquo;Something is true because it was entered into evidence and someone
        signed.&rdquo;
      </p>

      <h2>Availability</h2>
      <p>
        Stenographer is MIT-licensed and available from source at{" "}
        <a href="https://github.com/johnnyclem/stenographer" target="_blank" rel="noopener noreferrer">
          github.com/johnnyclem/stenographer
        </a>
        , with a product page at{" "}
        <a href="https://stenographer.smallchat.dev" target="_blank" rel="noopener noreferrer">
          stenographer.smallchat.dev
        </a>
        . It requires Node 20 or later and stores everything in a single SQLite file. The truth tools
        are exposed over MCP; a REST surface is available in daemon mode. Assert mode is currently
        reachable through MCP and the library API, with a CLI flag to follow.
      </p>

      <h2>About</h2>
      <p>
        Stenographer is one of four related open-source projects by Johnny Clem, alongside{" "}
        <a href="https://smallchat.dev" target="_blank" rel="noopener noreferrer">smallchat</a>,{" "}
        <a href="https://github.com/johnnyclem/short-hand" target="_blank" rel="noopener noreferrer">short-hand</a>, and{" "}
        <a href="https://github.com/johnnyclem/polytician" target="_blank" rel="noopener noreferrer">polytician</a>.
        The design story behind the truth ledger is in{" "}
        <Link href="/blog/the-court-reporter">The Court Reporter</Link>.
      </p>
    </>
  );
}
