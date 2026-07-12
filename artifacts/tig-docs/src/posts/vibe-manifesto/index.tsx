import {
  ManifestoWrap,
  MTitle,
  MPreamble,
  MValues,
  MValue,
  MPostscript,
  MHr,
  MSigTable,
  MCopyright,
  MLinks,
  MLink,
  MTranslations,
  MCounter,
  MSiteCredit,
  MSection,
  MPrinciple,
  MSigList,
  MSigNote,
  MHistoryP,
  MBackLink,
} from "@/components/docs/ManifestoUI";

const sigColumns = [
  [
    "Brayden Tokenwindow",
    "Caden Promptsworth",
    "Jayden Contextlength",
    "Aiden Zeroshot",
    "Kaidyn Embeddington",
  ],
  [
    "Brantley Inferencedale",
    "Colton Promptchain",
    "Grayson Temperatureknob",
    "Hunter Hallucinek",
    "Jaxon Modelcollapse",
  ],
  [
    "Kayden API-Wrapperman",
    "Preston Overfit",
    "Ryker Finetunely",
    "Stetson Nobackend",
    "Thatcher Deployedtomain",
  ],
];

const allSignatories = [
  "Brayden Tokenwindow",
  "Caden Promptsworth",
  "Jayden Contextlength",
  "Aiden Zeroshot",
  "Kaidyn Embeddington",
  "Brantley Inferencedale",
  "Colton Promptchain",
  "Grayson Temperatureknob",
  "Hunter Hallucinek",
  "Jaxon Modelcollapse",
  "Kayden API-Wrapperman",
  "Preston Overfit",
  "Ryker Finetunely",
  "Stetson Nobackend",
  "Thatcher Deployedtomain",
  "Brody Npminstalleverything",
  "Cash Leftpadsworth",
  "Crew Yamlindentation",
  "Dash Confignotfound",
  "Easton Dependabot-Ignorely",
  "Finn Dockercomposefile",
  "Greyson Envexampleonly",
  "Hendrix Cursor-Tab-Accept",
  "Iker Vercelpreviewlink",
  "Jett Localhost3000",
  "Knox Gitpushforce",
  "Ledger Notypescript",
  "Maverick Consolelog-Debugsworth",
  "Nash README-is-Empty",
  "Oakley Dependsonwhatclaudesays",
  "Pierce Commitdirecttomain",
  "Quaid Notmyjiraticket",
  "Ridge Worksonmymachine",
  "Sage Itcompiledshipit",
  "Tate Skipci",
];

const translations = [
  "English",
  "Prompt",
  "Emoji",
  "YAML",
  "JSON\u00A0(lossy)",
  "Markdown",
  "Vibes",
  "Screenshot\u00A0of\u00A0a\u00A0Whiteboard",
  "Voice\u00A0Memo\u00A0(Unedited)",
  "Tweet\u00A0Thread",
  "LinkedIn\u00A0Carousel",
  "TikTok\u00A0(47\u00A0sec)",
];

export default function VibeDrivenManifesto() {
  return (
    <ManifestoWrap>
      <div>
        <MTitle id="overview">
          Manifesto for Vibe-Driven
          <br />
          Software Development
        </MTitle>

        <MPreamble>
          We are uncovering better ways of developing
          <br />
          software by prompting for it and seeing what happens.
          <br />
          Through this work we have come to value:
        </MPreamble>

        <MValues>
          <MValue left="Prompts" right="Plans" />
          <MValue left="Instant Gratification" right="Maintainable Software" />
          <MValue left="Velocity" right="Validity" />
          <MValue left="Sleep-in" right="Stand-Up" />
        </MValues>

        <MPostscript>
          That is, while there is value in the items on
          <br />
          the right, we cannot be bothered with them when
          <br />
          the items on the left feel so productive.
        </MPostscript>

        <MHr />

        <MSigTable columns={sigColumns} />

        <MHr />

        <MCopyright>
          &copy; 2024, the above authors
          <br />
          this declaration may be freely copied in any form,
          <br />
          but only if you don&rsquo;t read it too carefully.
        </MCopyright>

        <MLinks>
          <MLink href="#principles">
            Twelve Principles of Vibe-Driven Development
          </MLink>
          <br />
          <br />
          <MLink href="#signatories">View Signatories</MLink>
          <br />
          <br />
          <MLink href="#history">About the Authors</MLink>
          <br />
          <MLink href="#history">About the Manifesto</MLink>
        </MLinks>

        <MTranslations labels={translations} />

        <MCounter count="0042069" />

        <MSiteCredit>
          site design and artwork &copy; 2024, whoever Claude generated this for
          <br />
          <i>
            best viewed in Netscape Navigator 4.0 or higher&nbsp;&nbsp;|&nbsp;&nbsp;optimized
            for 800&times;600
          </i>
        </MSiteCredit>
      </div>

      <MSection
        id="principles"
        title={
          <>
            Principles behind the
            <br />
            Vibe-Driven Manifesto
          </>
        }
        intro="We follow these principles:"
      >
        <MPrinciple>
          Our highest priority is to satisfy the developer
          <br />
          through early and continuous deployment
          <br />
          of whatever Claude just generated.
        </MPrinciple>

        <MPrinciple>
          Welcome changing requirements, even late in
          <br />
          development. Actually, especially late in development,
          <br />
          because we didn&rsquo;t read the requirements at the start.
        </MPrinciple>

        <MPrinciple>
          Deliver deployed software frequently, from a
          <br />
          couple of minutes to a couple of hours, with a
          <br />
          preference to &ldquo;I didn&rsquo;t test this but it compiled.&rdquo;
        </MPrinciple>

        <MPrinciple>
          Business people and developers must work
          <br />
          together daily throughout the project. By &ldquo;work
          <br />
          together&rdquo; we mean the developer shares a Loom
          <br />
          video and the business person reacts with 🔥.
        </MPrinciple>

        <MPrinciple>
          Build projects around motivated individuals.
          <br />
          Give them an API key and a chat window,
          <br />
          and trust them to prompt the job done.
        </MPrinciple>

        <MPrinciple>
          The most efficient and effective method of
          <br />
          conveying information to and within a development
          <br />
          team is a screenshot of a conversation with an AI
          <br />
          posted in Slack without context.
        </MPrinciple>

        <MPrinciple>
          A deployed URL is the primary measure of progress.
        </MPrinciple>

        <MPrinciple>
          Vibe-driven processes promote unsustainable development.
          <br />
          The sponsors, developers, and language models should be
          <br />
          prepared to sprint indefinitely until the demo or the
          <br />
          API credits run out, whichever comes first.
        </MPrinciple>

        <MPrinciple>
          Continuous attention to prompt engineering
          <br />
          and good vibes enhances velocity.
          <br />
          Continuous attention to the codebase is optional.
        </MPrinciple>

        <MPrinciple>
          Simplicity&mdash;the art of maximizing the amount
          <br />
          of code you didn&rsquo;t write and can&rsquo;t
          explain&mdash;is essential.
        </MPrinciple>

        <MPrinciple>
          The best architectures, requirements, and designs
          <br />
          emerge from a single developer in a flow state
          <br />
          at 2 AM who mass-accepted every Copilot suggestion
          <br />
          and committed without reviewing the diff.
        </MPrinciple>

        <MPrinciple>
          At regular intervals, the team reflects on how
          <br />
          to become more effective, then asks ChatGPT
          <br />
          to summarize the retro and write the action items,
          <br />
          none of which are completed.
        </MPrinciple>

        <MBackLink href="#overview" />
      </MSection>

      <MSection
        id="signatories"
        title="Signatories"
        intro={
          `The following individuals have endorsed the Vibe-Driven Manifesto, either by signing below or by mass-clicking "I agree" without reading, which is itself a vibe-driven practice and therefore consistent with the document.`
        }
        maxWidth="580px"
      >
        <MSigList names={allSignatories} />

        <MSigNote>
          <em>
            Note: 14 signatories could not be verified because their
            <br />
            GitHub profiles contain only forked repos and a README
            <br />
            that says &ldquo;🚀 building in public.&rdquo;
            <br />
            We have counted them anyway.
          </em>
        </MSigNote>

        <MBackLink href="#overview" />
      </MSection>

      <MSection
        id="history"
        title={
          <>
            History: The Gathering at
            <br />
            Snowbird 2.0
          </>
        }
      >
        <MHistoryP>
          In February 2024, fifteen developers who had never met in person
          &mdash; and who, in several cases, had never written a line of code
          without AI assistance &mdash; gathered at a WeWork in Austin, Texas,
          to discuss the future of software development.
        </MHistoryP>

        <MHistoryP>
          The original plan was to meet at a ski lodge in Utah, in homage to
          the original Agile Manifesto authors. The plan was abandoned after
          three participants could not determine how to book a hotel without
          asking Claude, and a fourth booked a hotel in Utah, Ohio.
        </MHistoryP>

        <MHistoryP>
          Over the course of two days, the group debated, argued, and
          ultimately reached consensus on a shared set of values. The debate
          was vigorous. At one point, Brayden Tokenwindow and Preston Overfit
          nearly came to blows over whether &ldquo;it works on my
          machine&rdquo; constitutes a deployment strategy. (The
          manifesto&rsquo;s position: it does.)
        </MHistoryP>

        <MHistoryP>
          The four values were drafted in a shared Cursor session. The wording
          was refined through seventeen successive prompts to Claude, each of
          which began with &ldquo;no, make it sound more like a
          manifesto.&rdquo; The final version was approved unanimously,
          deployed to Vercel, and shared on Twitter within forty minutes of
          being written. It had not been proofread. This was consistent with
          the values it described.
        </MHistoryP>

        <MHistoryP>
          The Twelve Principles were written the following morning, primarily
          by Grayson Temperatureknob, who was the only attendee awake before
          11 AM. The others approved them via Slack emoji reaction (🔥
          constituting a binding vote).
        </MHistoryP>

        <MHistoryP>
          Several principles were debated at length. Principle 7 (&ldquo;A
          deployed URL is the primary measure of progress&rdquo;) was
          originally a longer paragraph, but the group agreed that brevity was
          more consistent with the spirit of vibe-driven development, and also
          that no one wanted to write the rest of the paragraph.
        </MHistoryP>

        <MHistoryP>
          Principle 11 nearly caused a schism. Stetson Nobackend argued that
          &ldquo;mass-accepting Copilot suggestions&rdquo; was not a practice
          to be celebrated. The group voted. Stetson lost 14&ndash;1. He has
          since updated his LinkedIn to &ldquo;Principled Engineer (Dissenting
          Signatory).&rdquo;
        </MHistoryP>

        <MHistoryP>
          As of March 2026, the Vibe-Driven Manifesto has been endorsed by
          over 14,000 signatories, mass-starred on GitHub by 23,000 accounts
          (approximately 60% of which are bots, which we consider a form of AI
          endorsement), and cited in four Y Combinator applications, none of
          which were funded.
        </MHistoryP>

        <MHistoryP>
          The manifesto has been translated into twelve formats, including JSON
          (lossy), LinkedIn Carousel, and a 47-second TikTok that has more
          views than the original document. The TikTok is set to a lo-fi
          hip-hop beat and features the four values appearing one at a time
          over footage of someone typing in a dark room. It is the definitive
          version.
        </MHistoryP>

        <MHistoryP>
          The manifesto has not been updated since its publication. Not because
          it is perfect, but because no one can agree on which AI to use for
          the revision, and the conversation about it has been moved to a
          Notion page that no one has opened since.
        </MHistoryP>

        <MBackLink href="#overview" />
      </MSection>
    </ManifestoWrap>
  );
}
