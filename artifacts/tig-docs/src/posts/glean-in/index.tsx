import {
  BookCover,
  ChapterHeading,
  BookParagraph,
  PullQuote,
  SidebarNote,
  BookSubheading,
  BookLabel,
  BookList,
  BookListItem,
  CodeExample,
  CodeComment,
  CodeString,
  CodeFn,
  CodeKw,
  MeetingSimulator,
  AuthorCard,
  BookFooter,
} from "@/components/docs/BookUI";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const scenarios = [
  {
    speaker: "Rachel (VP of Product)",
    question: "So based on what we discussed last week about the enterprise pipeline \u2014 what's your take on whether we should accelerate the rollout to APAC, or wait for the localization work to finish?",
    answer: "According to last week's pipeline review, APAC enterprise deals are up 23% QoQ but the localization backlog has 14 open tickets, 3 of which are blockers. The consensus from the APAC team is that a partial rollout to English-speaking markets (AU, SG, IN) could proceed while localization continues for JP and KR.",
    source: "Source: #enterprise-pipeline Slack channel, Mar 18 \u00B7 APAC Expansion Planning Doc v3",
    stall: "That's a really important question, and I think it depends on how we define 'ready'...",
  },
  {
    speaker: "Rachel (VP of Product)",
    question: "Hey, quick one \u2014 do you remember what we landed on for the pricing change? I know there was a whole thread about it but I can't find it. What's the new enterprise tier going to look like?",
    answer: "The pricing committee approved a new Enterprise tier at $89/seat/mo (up from $65) with a bundled SSO + audit log add-on. Legacy customers get 12-month price protection. The change goes live April 1. Finance flagged a potential 8% churn risk on the mid-market segment.",
    source: "Source: Pricing Committee Decision Doc \u00B7 #pricing-changes Slack thread, Mar 12",
    stall: "Yeah, great question \u2014 I was just looking at this actually...",
  },
  {
    speaker: "Rachel (VP of Product)",
    question: "I want to circle back to what Marcus presented yesterday about the new OKRs. Specifically \u2014 do you think the activation target is realistic given where we are with onboarding?",
    answer: "Marcus set the Q2 activation target at 40% (up from 31% actual in Q1). The onboarding team's retrospective identified three friction points in the current flow, with a redesigned wizard in dev targeting a 15% improvement. Current run rate suggests 35% is achievable without the wizard; 42% with it if shipped by mid-April.",
    source: "Source: Q2 OKR Planning Deck, Slide 14 \u00B7 Onboarding Retro Notes, Mar 19",
    stall: "So I've been noodling on this since yesterday's presentation, and I think the nuance here is...",
  },
];

export default function GleanInPost() {
  useScrollReveal();

  return (
    <div id="overview">
      <BookCover
        title="Glean"
        titleAccent="In"
        subtitle={"How to LOOK Like You Work\nSmarter, Not Harder"}
        author="Cher"
        tagline="Former VP of Vibes, Alphabet Adjacent"
        bestsellerLabel="#1 New York Times Bestseller *"
        praise={"\u201CA masterclass in strategic disengagement. I highlighted every page, which is the most work I\u2019ve done this quarter.\u201D \u2014 Tech Twitter"}
      />

      {/* ── INTRODUCTION ── */}
      <ChapterHeading
        number="Introduction"
        title="The Promise"
        id="introduction"
        epigraph={"\u201CThe most dangerous phrase in the language is \u2018we\u2019ve always done it this way.\u2019 The second most dangerous is \u2018can you repeat the question?\u2019\u201D"}
        epigraphCite="\u2014 Cher, internal all-hands, 2023"
      />

      <BookParagraph firstPara>
        When I was asked to leave my last company &mdash; or, as I prefer to phrase it, when I <em>leaned out</em> &mdash; I had a revelation. For fifteen years, I had operated under the assumption that career success required knowing things, doing things, and occasionally producing things. I had sat in meetings and <em>paid attention</em>. I had read the pre-read. I had, God help me, taken notes.
      </BookParagraph>

      <BookParagraph>I was doing it all wrong.</BookParagraph>

      <BookParagraph>
        The most successful people in every room I'd ever been in shared a common trait: they weren't listening. They were <em>performing</em> listening. There is a difference, and that difference is the subject of this book.
      </BookParagraph>

      <PullQuote>
        "Knowledge is power. But the appearance of knowledge is the same power with none of the reading."
      </PullQuote>

      <BookParagraph>
        Today, we live in an unprecedented era. For the first time in human history, you can be asked a direct question about a quarterly revenue target, have no idea what the number is, type five words into a search bar, and produce a confident answer before the awkward silence reaches its third second. The tools exist. The infrastructure is in place. All that remains is the <em>technique</em>.
      </BookParagraph>

      <BookParagraph>This book will teach you that technique.</BookParagraph>

      <BookParagraph>
        It will teach you how to nod at a frequency that conveys engagement. How to unmute at precisely the right moment. How to say "that's a great question" in a way that buys you eleven seconds &mdash; exactly enough time to search, scan, synthesize, and deliver an answer that sounds like you've been thinking about it for weeks.
      </BookParagraph>

      <BookParagraph>
        You have not been thinking about it for weeks. You have been thinking about whether to get a second monitor or an ultrawide. But no one will know that. Not if you <em>Glean In</em>.
      </BookParagraph>

      <SidebarNote title="A Note on the Title">
        Some readers have noted that this book's title is similar to another well-known work about women in the workplace. This is a coincidence. That book was about working harder. This book is about appearing to work harder, which research shows produces identical career outcomes with significantly less effort and cortisol.
      </SidebarNote>

      {/* ── CHAPTER 1 ── */}
      <ChapterHeading
        number={1}
        title="The Art of the Strategic Nod"
        id="chapter-1"
        epigraph={"\u201CI don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.\u201D"}
        epigraphCite="\u2014 Bilbo Baggins, but also every VP at a company retreat"
      />

      <BookParagraph firstPara>
        The nod is the most powerful non-verbal tool in the modern professional's arsenal. A well-timed nod communicates agreement, understanding, intellectual engagement, and &mdash; most importantly &mdash; the impression that you were not, moments ago, reading a group thread about whether the office kombucha has been giving people headaches.
      </BookParagraph>

      <BookParagraph>
        But not all nods are created equal. A nod that is too fast signals anxiety. A nod that is too slow signals that you are falling asleep, which you might be. The optimal nod frequency, which I have determined through extensive observation of executives at companies I cannot name due to NDAs I did not read, is <strong>one nod per 4.7 seconds</strong>.
      </BookParagraph>

      <PullQuote>
        "The strategic nod is not a lie. It is a <em>gesture of aspirational alignment</em>."
      </PullQuote>

      <BookSubheading>The Nod Taxonomy</BookSubheading>

      <BookParagraph>
        Through years of field research conducted during meetings I was not paying attention to, I have identified four distinct nod types, each suited to a specific professional context:
      </BookParagraph>

      <BookLabel>1. The Affirmation Nod</BookLabel>
      <BookParagraph>
        Tempo: moderate. Amplitude: small. Use when someone is saying something that sounds important but you arrived late and don't have context. Pair with a slight narrowing of the eyes, as though you are evaluating the merit of what was said. You are not evaluating anything. You are thinking about lunch.
      </BookParagraph>

      <BookLabel>2. The "I Was Just About to Say That" Nod</BookLabel>
      <BookParagraph>
        Tempo: quick, two-beat. Amplitude: medium. Deploy when a colleague makes a point and you want to signal that you independently arrived at the same conclusion. You did not. You were on your phone. But the nod creates a post-hoc narrative of parallel thinking, which is indistinguishable from actual parallel thinking.
      </BookParagraph>

      <BookLabel>3. The Slow Wisdom Nod</BookLabel>
      <BookParagraph>
        Tempo: glacial. Amplitude: deep. Reserved for moments when a senior executive says something vague and philosophical. The Slow Wisdom Nod communicates: "I have absorbed not only what you said, but what you <em>meant</em>, and possibly what you intended to mean but couldn't articulate because even you aren't sure what the strategy is."
      </BookParagraph>

      <BookLabel>4. The Recovery Nod</BookLabel>
      <BookParagraph>
        Tempo: immediate, single beat. Amplitude: sharp. This is the emergency nod &mdash; deployed the instant you realize someone has said your name and you have no idea what they were talking about. The Recovery Nod buys you between 1.5 and 3 seconds. In the Glean In framework, this is enough time to type two keywords and scan a result. We will cover this in Chapter 2.
      </BookParagraph>

      {/* ── CHAPTER 2 ── */}
      <ChapterHeading
        number={2}
        title="The Eleven-Second Recovery"
        id="chapter-2"
        epigraph={"\u201CBetween stimulus and response there is a space. In that space is our freedom \u2014 and a really good enterprise search tool.\u201D"}
        epigraphCite="\u2014 Viktor Frankl (adapted for the modern workplace)"
      />

      <BookParagraph firstPara>
        There is a moment that every professional has experienced. You are in a meeting. You have not been listening. Someone says your name, followed by "what do you think?" The room turns to you. The silence begins.
      </BookParagraph>

      <BookParagraph>
        In 2019, this was a career-ending moment. In 2026, it is a <strong>search query</strong>.
      </BookParagraph>

      <BookParagraph>
        I call this the <strong>Eleven-Second Recovery</strong> &mdash; the window of time between being asked a question you cannot answer and delivering a response that sounds like you prepared for it. Eleven seconds is the average socially acceptable silence before a pause becomes an Event. It is also, not coincidentally, the average time to type a query, receive a result from your company's AI-powered knowledge tool, and extract the one sentence you need.
      </BookParagraph>

      <PullQuote>
        "The difference between 'I don't know' and 'that's a great question &mdash; let me frame it this way' is approximately 11 seconds and a keyboard shortcut."
      </PullQuote>

      <BookSubheading>The Recovery Protocol</BookSubheading>

      <BookParagraph>
        The Eleven-Second Recovery is a four-phase operation. Each phase has been optimized through extensive practice during meetings I was nominally attending.
      </BookParagraph>

      <BookLabel>Phase 1: The Stall (Seconds 0&ndash;3)</BookLabel>
      <BookParagraph>
        Begin with a verbal cushion. The following phrases are not content &mdash; they are <em>temporal scaffolding</em>, designed to create the appearance of thought while your hands move to the keyboard:
      </BookParagraph>
      <BookList>
        <BookListItem>"That's a great question." (Universal. Works everywhere. Means nothing.)</BookListItem>
        <BookListItem>"I've been thinking about this a lot, actually." (You have not.)</BookListItem>
        <BookListItem>"It depends on how we define [repeat their last word]." (Buys 4 seconds.)</BookListItem>
        <BookListItem>"Can I share my screen for a second?" (Nuclear option. Buys 15 seconds but raises the stakes enormously.)</BookListItem>
      </BookList>

      <BookLabel>Phase 2: The Query (Seconds 3&ndash;5)</BookLabel>
      <BookParagraph>
        While your verbal cushion is still inflating, your fingers execute the search. The key here is <em>keyword extraction</em>. You do not need to understand the question. You need to identify the two or three nouns the questioner emphasized. "What's our <em>retention</em> rate for <em>enterprise</em> customers this <em>quarter</em>?" &rarr; type: <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, background: "#f5f1eb", padding: "2px 6px", borderRadius: 3 }}>retention enterprise Q1</code>. That is enough.
      </BookParagraph>

      <BookLabel>Phase 3: The Scan (Seconds 5&ndash;9)</BookLabel>
      <BookParagraph>
        Your AI-powered knowledge tool returns a result. Do not read the entire result. Read the first sentence, identify one number or one proper noun, and file it. You now have a <strong>fact</strong>. A single fact is enough to construct an entire response, because in a meeting, confidence outweighs comprehensiveness by a factor of ten.
      </BookParagraph>

      <BookLabel>Phase 4: The Delivery (Seconds 9&ndash;11)</BookLabel>
      <BookParagraph>
        You now combine the stall phrase, the single fact, and a concluding opinion that is impossible to disagree with. Example:
      </BookParagraph>

      <BookParagraph>
        <em>"That's a great question. So last I checked, enterprise retention was sitting at around 94%, which is strong but not where we want it. I think the real question is whether we're measuring the right thing."</em>
      </BookParagraph>

      <BookParagraph>
        You have just delivered an answer that sounds informed, nuanced, and forward-thinking. The 94% came from a search result you read half a second ago. "Whether we're measuring the right thing" is a statement that has never been wrong in any meeting in the history of business.
      </BookParagraph>

      <SidebarNote title="Advanced Technique: The Redirect">
        If your search returns nothing useful, deploy the Redirect: "I actually want to flip that question &mdash; [name of person across the table], what's your read on this?" You have now transformed your ignorance into facilitation, which is a leadership quality.
      </SidebarNote>

      {/* ── CHAPTER 3 ── */}
      <ChapterHeading
        number={3}
        title="Resting Meeting Face"
        id="chapter-3"
        epigraph={"\u201CThe face is a picture of the mind with the eyes as its interpreter. But the mind is on Instagram, so the face must freelance.\u201D"}
        epigraphCite="\u2014 Cicero (paraphrased for Zoom)"
      />

      <BookParagraph firstPara>
        Your face is a billboard. In every meeting, whether in-person or virtual, it is broadcasting a message to the room. The question is not whether people are reading your face &mdash; they are. The question is whether your face is telling the truth.
      </BookParagraph>

      <BookParagraph>It should not be.</BookParagraph>

      <BookParagraph>
        Resting Meeting Face (RMF) is the art of maintaining a facial expression that communicates "I am deeply engaged with the current discussion" while your internal monologue is devoted to something else entirely. RMF is not a deception. It is a <em>courtesy</em> &mdash; a gift you give to the presenter, who does not want to see what you're actually thinking, which is that this meeting should have been an email.
      </BookParagraph>

      <PullQuote>
        "Every meeting is a performance. Resting Meeting Face is your costume."
      </PullQuote>

      <BookSubheading>The RMF Spectrum</BookSubheading>

      <BookParagraph>
        RMF exists on a spectrum from "Active Listening" to "Astral Projection." The optimal zone is what I call <strong>Engaged Neutral</strong> &mdash; an expression that conveys interest without committing to any specific opinion, thereby protecting you from being asked to elaborate.
      </BookParagraph>

      <BookParagraph>The key components of Engaged Neutral:</BookParagraph>
      <BookList>
        <BookListItem><strong>Eyebrows:</strong> Slightly raised. Not so much that you look surprised; just enough that you look like you're processing information.</BookListItem>
        <BookListItem><strong>Mouth:</strong> Closed, with corners turned up approximately 2mm. This is not a smile. It is the muscular precursor to a smile &mdash; a signal that you <em>could</em> smile if what was being said warranted it.</BookListItem>
        <BookListItem><strong>Eyes:</strong> Directed at the speaker, or &mdash; on Zoom &mdash; directed at the green camera light, which gives the appearance of eye contact without requiring you to look at anyone's face, which is a relief.</BookListItem>
        <BookListItem><strong>Occasional micro-expressions:</strong> Every 30&ndash;45 seconds, allow one (1) micro-expression to cross your face. A slight furrow of the brow. A barely perceptible tilt of the head. These artifacts of "thought" are picked up subconsciously by others and interpreted as evidence of intellectual engagement. They are not. They are muscle memory.</BookListItem>
      </BookList>

      <SidebarNote title="The Zoom Advantage">
        On video calls, you only need to manage from the collarbones up. Your lower half is free. Many of my most productive Glean In sessions have occurred while I was on an exercise bike, making lunch, or standing in line at Whole Foods. The camera is a frame. Everything outside the frame is your life.
      </SidebarNote>

      {/* ── CHAPTER 4 ── */}
      <ChapterHeading
        number={4}
        title="The Mute Button Is Your Co-Founder"
        id="chapter-4"
        epigraph={"\u201CSpeech is silver. Silence is golden. Mute is platinum.\u201D"}
        epigraphCite="\u2014 Ancient proverb (updated for the remote era)"
      />

      <BookParagraph firstPara>
        If the Strategic Nod is your sword, the mute button is your shield. In the remote-first workplace, the mute button is the single most important piece of technology between you and the exposure of the fact that you are currently watching your dog destroy a throw pillow.
      </BookParagraph>

      <BookParagraph>
        But the mute button is more than a defense mechanism. Used skillfully, it is a <em>strategic instrument</em> &mdash; one that can be deployed offensively to create the impression of thoughtful restraint.
      </BookParagraph>

      <BookParagraph>
        Consider: when you are on mute and someone asks the room a question, there is a natural 2&ndash;3 second delay before anyone expects you to respond, because everyone assumes you are unmuting. This is the <strong>Mute Tax</strong> &mdash; a socially accepted grace period that exists in no other professional context. In an in-person meeting, a 3-second silence after a direct question is uncomfortable. On Zoom, it is just "unmuting."
      </BookParagraph>

      <PullQuote>
        "Nobody has ever been fired for being on mute. Being on mute is the closest the professional world has come to a consequence-free environment."
      </PullQuote>

      <BookSubheading>The Mute Lifecycle</BookSubheading>

      <BookParagraph>
        Every mute/unmute cycle follows a predictable rhythm that, once mastered, creates an aura of control:
      </BookParagraph>

      <BookList ordered>
        <BookListItem><strong>Default state: muted.</strong> You are always muted. Being unmuted is a <em>choice</em> &mdash; a deliberate act of participation that signals to the room: "I have something worth saying." The fact that what you have to say came from a search result 4 seconds ago is irrelevant.</BookListItem>
        <BookListItem><strong>The deliberate unmute.</strong> When you're ready to speak, unmute with a brief <em>click</em> that is audible to the room. This click is the equivalent of clearing your throat in a boardroom. It commands attention.</BookListItem>
        <BookListItem><strong>The contribution.</strong> Speak. Be concise. One sentence of insight sourced from your knowledge tool, wrapped in two sentences of framing that make it sound like a considered opinion.</BookListItem>
        <BookListItem><strong>The return to mute.</strong> Immediately re-mute after speaking. This is the power move. It says: "I have made my contribution. I have nothing more to add. I am returning to a state of reflective observation." You are returning to a state of checking your phone.</BookListItem>
      </BookList>

      {/* ── CHAPTER 5 ── */}
      <ChapterHeading
        number={5}
        title="Prompt Engineering Your Performance Review"
        id="chapter-5"
        epigraph={"\u201CWe are what we repeatedly do. Or, more accurately, we are what we repeatedly claim to have done in a shared Google Doc once per quarter.\u201D"}
        epigraphCite="\u2014 Aristotle (performance review season)"
      />

      <BookParagraph firstPara>
        Performance reviews are the ultimate test of the Glean In practitioner. They require you to produce a written narrative of your accomplishments &mdash; a genre of fiction that demands both specificity and grandeur. You must describe things you did, the impact they had, and how they align with company values that you learned the names of approximately forty-five seconds before opening the form.
      </BookParagraph>

      <BookParagraph>Fortunately, AI was designed for exactly this task.</BookParagraph>

      <PullQuote>
        "A performance review is not a record of what you did. It is a record of what you can convince a language model you did."
      </PullQuote>

      <BookSubheading>The Self-Review Pipeline</BookSubheading>

      <BookParagraph>
        Step 1: Search your company knowledge base for any document, Slack message, or commit that contains your name. This is your <strong>evidence corpus</strong>. It does not matter whether you were the primary contributor, a secondary reviewer, or simply CC'd on a thread. In the context of a performance review, presence is indistinguishable from contribution.
      </BookParagraph>

      <BookParagraph>
        Step 2: Feed each artifact to your AI tool with the prompt: <em>"Describe this work as though I was the driving force behind it, using language appropriate for a senior-level impact narrative."</em>
      </BookParagraph>

      <BookParagraph>
        Step 3: Combine the outputs. Remove any phrases that sound too confident (reviewers are suspicious of specificity) and add qualifiers like "cross-functional alignment" and "drove consensus." These phrases mean nothing but are valued at approximately $15,000 per year in compensation adjustments.
      </BookParagraph>

      <CodeExample>
        <CodeComment>{"// The modern performance review workflow"}</CodeComment>{"\n"}
        {"\n"}
        <CodeKw>const</CodeKw> evidence = <CodeKw>await</CodeKw> <CodeFn>glean</CodeFn>.<CodeFn>search</CodeFn>(<CodeString>"my name + shipped OR launched OR delivered"</CodeString>){"\n"}
        {"\n"}
        <CodeKw>const</CodeKw> narrative = <CodeKw>await</CodeKw> <CodeFn>ai</CodeFn>.<CodeFn>generate</CodeFn>(<CodeString>{"`Transform these artifacts into a compelling\nimpact narrative. Tone: humble but undeniably\nimpressive. Include at least one metric I can't\nbe held to. Mention cross-functional\ncollaboration twice.`"}</CodeString>){"\n"}
        {"\n"}
        <CodeKw>await</CodeKw> <CodeFn>performanceReview</CodeFn>.<CodeFn>submit</CodeFn>(narrative){"\n"}
        <CodeComment>{"// Rating received: \"Exceeds Expectations\""}</CodeComment>{"\n"}
        <CodeComment>{"// Time spent actually working: unclear"}</CodeComment>
      </CodeExample>

      <SidebarNote title="Pro Tip: The Reverse Attribution">
        If a project you were barely involved in succeeded, mention it in your review as context for your "broader impact." If it failed, it does not appear in your search results because you were never in the relevant Slack channel. This is not dishonesty. This is <em>curation</em>.
      </SidebarNote>

      {/* ── CHAPTER 6: SIMULATOR ── */}
      <ChapterHeading
        number={6}
        title="Try It: The Meeting Simulator"
        id="chapter-6"
        epigraph={"\u201CTheory without practice is empty. Practice without theory is blind. This is a book that provides both, while requiring neither.\u201D"}
        epigraphCite="\u2014 Cher, TED Talk (rejected)"
      />

      <BookParagraph firstPara>
        You've learned the theory. Now let's practice. Below is a live simulation of the Eleven-Second Recovery. A colleague will ask you a question &mdash; the kind you'd hear in a meeting you weren't paying attention to. Your job: search for the answer before the silence gets awkward.
      </BookParagraph>

      <BookParagraph>
        Click <strong>"Uh oh, I wasn't listening"</strong> to begin. The clock starts immediately. You have eleven seconds.
      </BookParagraph>

      <MeetingSimulator scenarios={scenarios} />

      {/* ── ABOUT THE AUTHOR ── */}
      <ChapterHeading
        number="About the Author"
        title="Cher"
        id="about"
      />

      <AuthorCard
        name="Cher"
        title="Former VP of Vibes \u00B7 Alphabet Adjacent \u00B7 Board Member, Several Things"
        bio={
          <>
            <p className="mb-3">Cher is a leadership strategist, keynote speaker, and recovering executive. Over her 15-year career in Silicon Valley, she held senior roles at companies whose names she is contractually prohibited from mentioning but which you would recognize from the side of a shuttle bus on the 101.</p>
            <p className="mb-3">She is best known for coining the phrase "strategic disengagement" during a board meeting she was not paying attention to, and for her viral LinkedIn post "I Got Fired and It Was the Best Thing That Ever Happened to My Personal Brand," which received 47,000 reactions, mostly from people who had also been fired.</p>
            <p className="mb-3">Cher holds an MBA from Stanford, a certificate in Mindful Leadership from a weekend retreat she does not remember the name of, and a personal record of 11 consecutive meetings in which she was not asked a single question, which she considers her greatest professional achievement.</p>
            <p className="mb-3">She currently advises early-stage startups on "presence strategy" and is working on her second book, <em>Lean Back: A Guide to Doing Less While Being Perceived as Doing More</em>.</p>
            <p>She lives in Atherton with her two children, both of whom are better at Slack than she is.</p>
          </>
        }
      />

      <BookFooter>
        <p><strong>Glean In: How to LOOK Like You Work Smarter, Not Harder</strong></p>
        <p>&copy; 2026 Cher. Published by Pivot Press, a division of Nothing Ventures.</p>
        <p>* The #1 New York Times Bestseller claim is based on a methodology developed by the author and not endorsed by the New York Times, any bookstore, or anyone with access to actual sales data.</p>
        <p className="mt-2">Cover design by someone the author found on Fiverr and described as "my creative partner."</p>
        <p className="mt-2 italic" style={{ color: "#bbb" }}>This book was written, researched, and fact-checked using the techniques described within it. Accuracy is therefore aspirational.</p>
      </BookFooter>
    </div>
  );
}
