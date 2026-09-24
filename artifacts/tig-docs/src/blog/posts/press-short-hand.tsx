import { Link } from "wouter";

export default function PressShortHand() {
  return (
    <>
      <p>
        <em>For immediate release · September 24, 2026</em>
      </p>
      <p>
        <strong>Short-hand</strong>, the zero-dependency TypeScript library for progressive context
        compaction, today announced correction tombstones across its compaction pipeline and a
        format-level bridge to stenographer&apos;s truth ledger.
      </p>
      <p>
        Short-hand compacts conversation history through five levels, from raw messages to topic
        summaries to an entity graph to invariants, so an agent can keep working long past its context
        budget. The risk in any compaction is that a corrected fact survives in an older summary and
        resurfaces. This release closes that gap.
      </p>

      <h2>What&apos;s new</h2>
      <ul>
        <li>
          <strong>Correction tombstones.</strong> When the compactor detects a correction
          (&ldquo;actually, we&apos;re on Postgres, not MySQL&rdquo;), it writes a tombstone recording
          the superseded content, the message that stated it, the message that corrected it, the reason,
          and the corrected value.
        </li>
        <li>
          <strong>Pruning on write.</strong> The moment a tombstone is created, short-hand drops the
          original message and any compacted entry that names the old value without also naming the new
          one. The correction itself is never pruned.
        </li>
        <li>
          <strong>Corrections first in the context frame.</strong> Each tombstone renders as a{" "}
          <code>[correction]</code> line, budgeted immediately after ledger truth and ahead of
          invariants, engrams, and summaries. Newest corrections win when the budget is tight.
        </li>
        <li>
          <strong>Correction-propagation invariant.</strong> The verification suite fails if any
          compacted entry or summary contains superseded text without the corrected value alongside it.
        </li>
        <li>
          <strong>Ledger interop, no code dependency.</strong> Short-hand consumes stenographer&apos;s
          append-only JSONL export, ranking active tombstones as truth, contested ones as truth with an
          asterisk, and open assertions as unverified. In the other direction, every correction tombstone
          is exported as a <em>proposal</em> for a person to sign. Nothing short-hand infers becomes
          truth on its own.
        </li>
      </ul>

      <p>
        &ldquo;Detection is cheap and everywhere. Assertion is expensive and in one place,&rdquo; said
        Johnny Clem, the project&apos;s author.
      </p>

      <h2>Availability</h2>
      <p>
        Short-hand is MIT-licensed, published on npm as <code>short-hand</code>, and available at{" "}
        <a href="https://github.com/johnnyclem/short-hand" target="_blank" rel="noopener noreferrer">
          github.com/johnnyclem/short-hand
        </a>
        . It runs on Node 18 or later with no runtime dependencies. All state is in memory; persistence
        is left to the caller. The regex compaction tier ships today, with local-model and hosted tiers
        planned.
      </p>

      <h2>About</h2>
      <p>
        Short-hand is one of four related open-source projects by Johnny Clem, alongside{" "}
        <a href="https://github.com/johnnyclem/stenographer" target="_blank" rel="noopener noreferrer">stenographer</a>,{" "}
        <a href="https://smallchat.dev" target="_blank" rel="noopener noreferrer">smallchat</a>, and{" "}
        <a href="https://github.com/johnnyclem/polytician" target="_blank" rel="noopener noreferrer">polytician</a>.
        The design story is in <Link href="/blog/the-court-reporter">The Court Reporter</Link>.
      </p>
    </>
  );
}
