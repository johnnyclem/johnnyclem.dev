import { Link } from "wouter";

export default function PressPolytician() {
  return (
    <>
      <p>
        <em>For immediate release · September 24, 2026</em>
      </p>
      <p>
        <strong>Polytician</strong>, the local-first MCP server that gives Claude Desktop and other MCP
        clients a persistent, searchable memory of concepts stored as vectors, markdown, and structured
        ThoughtForm JSON, is publishing this note alongside its sibling projects to state plainly what
        its tombstone does today and what it does not.
      </p>

      <h2>What exists</h2>
      <ul>
        <li>
          <strong>A delete marker to AgentVault.</strong> When a concept is deleted, polytician&apos;s
          sync connector sends two tombstones to AgentVault&apos;s memory repo, one for the concept&apos;s
          markdown key and one for its ThoughtForm key. On the AgentVault side this is specified as a
          commit tagged <code>tombstone</code> whose body records the deleted key.
        </li>
        <li>
          <strong>A reserved schema field.</strong> ThoughtForm metadata carries an optional{" "}
          <code>tombstone</code> boolean, next to timestamps, source, content hash, and redaction flags.
        </li>
        <li>
          <strong>Hard local delete.</strong> The concept row and its vector are removed locally before
          the marker is sent.
        </li>
      </ul>

      <h2>What does not exist yet</h2>
      <ul>
        <li>
          The delete marker carries no evidence, no signer, no reason, and no timestamp. It is a
          deletion, not an assertion.
        </li>
        <li>
          Nothing reads the marker back. Pull and restore paths ignore it, so a deletion does not travel
          through a backup.
        </li>
        <li>
          The <code>tombstone</code> schema field is set by nothing and read by nothing.
        </li>
        <li>
          Polytician neither consumes nor produces stenographer&apos;s truth ledger. There is no
          format-level contract in place.
        </li>
      </ul>
      <p>
        In the language of the ledger, polytician&apos;s integration is an unverified assertion with{" "}
        <code>verifyBy: inspect</code>, and the inspection came back open. The project is stating that
        rather than claiming parity it has not earned.
      </p>

      <p>
        &ldquo;The whole point was not narrating things I haven&apos;t checked,&rdquo; said Johnny
        Clem, the project&apos;s author. &ldquo;Polytician isn&apos;t there yet. I&apos;m writing that
        down instead of rounding it up.&rdquo;
      </p>

      <h2>What&apos;s next</h2>
      <p>
        The planned path mirrors the other three: consume stenographer&apos;s JSONL export at the format
        level with no code dependency, surface ledger truth alongside retrieved concepts, and replace the
        bare delete marker with a proposal that carries the deleted key as evidence for a person to sign.
        The reserved schema field is the landing spot.
      </p>

      <h2>Availability</h2>
      <p>
        Polytician is MIT-licensed and available at{" "}
        <a href="https://github.com/johnnyclem/polytician" target="_blank" rel="noopener noreferrer">
          github.com/johnnyclem/polytician
        </a>
        . It runs on Node 20 or later, computes 384-dimension embeddings in-process, and stores
        everything in a local SQLite file by default, with Postgres and pgvector as an option.
      </p>

      <h2>About</h2>
      <p>
        Polytician is one of four related open-source projects by Johnny Clem, alongside{" "}
        <a href="https://github.com/johnnyclem/stenographer" target="_blank" rel="noopener noreferrer">stenographer</a>,{" "}
        <a href="https://github.com/johnnyclem/short-hand" target="_blank" rel="noopener noreferrer">short-hand</a>, and{" "}
        <a href="https://smallchat.dev" target="_blank" rel="noopener noreferrer">smallchat</a>.
        The design story is in <Link href="/blog/the-court-reporter">The Court Reporter</Link>.
      </p>
    </>
  );
}
