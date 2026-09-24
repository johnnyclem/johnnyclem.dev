import { Link } from "wouter";

export default function PressSmallchat() {
  return (
    <>
      <p>
        <em>For immediate release · September 24, 2026</em>
      </p>
      <p>
        <strong>Smallchat</strong>, the local-first runtime that resolves an agent&apos;s stated intent
        to the right tool deterministically, today announced truth-ledger interop: a consumer of
        stenographer&apos;s append-only export, a codec that preserves tombstoned literals through the
        round trip, and channel delivery for real-time objections.
      </p>
      <p>
        Smallchat&apos;s job is dispatch, not memory. But an agent that dispatches on a stale fact
        dispatches wrong. This release gives smallchat&apos;s compacted context a section it did not
        write and cannot edit: the ledger&apos;s current truth, sorted by how much it can be trusted.
      </p>

      <h2>What&apos;s new</h2>
      <ul>
        <li>
          <strong>Ledger consumption.</strong> Smallchat reads stenographer&apos;s JSONL export, where
          later lines supersede earlier ones per id, and classifies each entry: active tombstones as
          ground truth, contested tombstones paired with their contesting assertions, open assertions as
          unverified, and overridden or refuted entries as history.
        </li>
        <li>
          <strong>Rebuilt every compaction.</strong> The &ldquo;Asserted Truth (ledger)&rdquo; section
          is regenerated from scratch on each compact, so a tombstone overridden upstream falls out of
          the cache on the next sync rather than lingering.
        </li>
        <li>
          <strong>Literals survive the codec.</strong> Tombstoned literals, the exact dead values an
          objection can cite, are parsed, validated, and serialized field-for-field. A literal without a
          subject must be a distinctive identifier, and one invalid literal rejects the whole line.
        </li>
        <li>
          <strong>Proposals, not assertions.</strong> Smallchat writes no tombstones. From compacted
          configuration entities and unsuperseded decisions it drafts unverified-assertion proposals and
          appends them to a file for a person to sign upstream.
        </li>
        <li>
          <strong>Objections on the channel bridge.</strong> Stenographer delivers objections and
          notarization requests to a smallchat channel over its HTTP bridge, secured by a shared channel
          secret, so they land in the agent&apos;s chat while the transcript is still being written.
        </li>
      </ul>

      <p>
        &ldquo;The model doesn&apos;t have to remember it was corrected,&rdquo; said Johnny Clem, the
        project&apos;s author. &ldquo;It has to be in a room where someone else does.&rdquo;
      </p>

      <h2>Availability</h2>
      <p>
        Smallchat is MIT-licensed and available at{" "}
        <a href="https://smallchat.dev" target="_blank" rel="noopener noreferrer">smallchat.dev</a> and{" "}
        <a href="https://github.com/johnnyclem/smallchat" target="_blank" rel="noopener noreferrer">
          github.com/johnnyclem/smallchat
        </a>
        , with the truth module exported from <code>@smallchat/core</code>. It runs on Node 22 or
        later, in the agent process, with no SaaS dependency. The truth module is a library API today; a
        CLI surface and stricter evidence validation to match stenographer&apos;s schema are on the
        roadmap.
      </p>

      <h2>About</h2>
      <p>
        Smallchat is one of four related open-source projects by Johnny Clem, alongside{" "}
        <a href="https://github.com/johnnyclem/stenographer" target="_blank" rel="noopener noreferrer">stenographer</a>,{" "}
        <a href="https://github.com/johnnyclem/short-hand" target="_blank" rel="noopener noreferrer">short-hand</a>, and{" "}
        <a href="https://github.com/johnnyclem/polytician" target="_blank" rel="noopener noreferrer">polytician</a>.
        The design story is in <Link href="/blog/the-court-reporter">The Court Reporter</Link>.
      </p>
    </>
  );
}
