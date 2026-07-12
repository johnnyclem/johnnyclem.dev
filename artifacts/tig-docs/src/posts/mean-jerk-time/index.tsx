import {
  PaperWrap,
  PaperBadge,
  PaperTitle,
  PaperAuthors,
  PaperAffiliation,
  Abstract,
  M,
  MathBlock,
  Theorem,
  Corollary,
  PaperTable,
  Figure,
  Footnote,
  References,
  RefEntry,
} from "@/components/docs/AcademicPaperUI";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function MeanJerkTimePost() {
  useScrollReveal();

  return (
    <div id="overview">
      <PaperWrap>
        <PaperBadge>Preprint &middot; TechCrunch Disrupt 2026</PaperBadge>

        <PaperTitle>
          Mean Jerk Time: Optimal Prompt Throughput for <em>N</em> Startups with a Single API Key
        </PaperTitle>

        <PaperAuthors>
          Bryce Tokenwindow<sup>1</sup>, Jayden Contextlength<sup>1</sup>, Grayson
          Temperatureknob<sup>2</sup>, and Preston Overfit<sup>1</sup>
        </PaperAuthors>
        <PaperAffiliation>
          <sup>1</sup>Department of Vibe Engineering, Stanford Adjacent University
          <br />
          <sup>2</sup>Institute for Applied Prompting, Y Combinator Research (Batch W26, Day 3 of
          3-month program)
        </PaperAffiliation>

        <Abstract>
          <p>
            We present a formal analysis of the following problem: given a room of <M>N</M> = 800
            founders at TechCrunch Disrupt, each of whom needs a working MVP by demo day, and a
            single Claude API key with a rate limit of <M>R</M> requests per minute, what is the
            minimum time required to ship all 800 MVPs? We derive a closed-form solution, identify a
            critical bottleneck in the naive approach, and propose a novel optimization &mdash;{" "}
            <strong>Middle-Out Prompting&trade;</strong> &mdash; that reduces the total required
            prompts from 24,000 to 920. We prove that 96.4% of startups at any given accelerator
            demo day are building architecturally identical applications, and that the optimal
            engineering strategy is not to build faster, but to acknowledge this fact and act
            accordingly.
          </p>
        </Abstract>

        <h2 id="introduction" className="reveal">Introduction</h2>

        <p className="reveal">
          The 2026 TechCrunch Disrupt audience consists of approximately <M>N</M> = 800 early-stage
          founders, each of whom will present a live demo in 72 hours. Of these 800 founders,
          internal surveys indicate that:
        </p>

        <ul className="reveal" style={{ marginBottom: 16, paddingLeft: 24 }}>
          <li>94% do not have a working product</li>
          <li>83% plan to build their product entirely with AI assistance</li>
          <li>
            67% are sharing a single Claude API key that was posted in a Y Combinator Slack channel
          </li>
          <li>
            100% have described their startup as &ldquo;<M>X</M> but for <M>Y</M>&rdquo; where{" "}
            <M>X</M> &isin; {"{"} Uber, Airbnb, Stripe {"}"} and <M>Y</M> is a noun
          </li>
        </ul>

        <p className="reveal">
          The question we address in this paper is:{" "}
          <strong>
            is it physically possible to ship 800 MVPs in 72 hours using a single API key?
          </strong>{" "}
          And if so, what is the optimal strategy?
        </p>

        <p className="reveal">
          We begin with the naive approach, identify its failure mode, and arrive at a result that is
          both mathematically rigorous and deeply upsetting to anyone who has ever written code by
          hand.
        </p>

        <h2 id="naive-model" className="reveal">The Naive Model</h2>

        <p className="reveal">
          Let each MVP require a sequence of <M>P</M> prompts to generate. Based on empirical
          observation of vibe coders at Disrupt 2025, we establish the following baseline values:
        </p>

        <PaperTable>
          <thead>
            <tr>
              <th>Variable</th>
              <th>Symbol</th>
              <th>Value</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>N</td>
              <td>Founders</td>
              <td>800</td>
              <td>Each needs one MVP</td>
            </tr>
            <tr>
              <td>P</td>
              <td>Prompts per MVP</td>
              <td>47</td>
              <td>
                Empirically observed mean<sup>1</sup>
              </td>
            </tr>
            <tr>
              <td>
                T<sub>p</sub>
              </td>
              <td>Time per prompt</td>
              <td>8.3s</td>
              <td>Median response latency, Claude Sonnet tier</td>
            </tr>
            <tr>
              <td>
                T<sub>h</sub>
              </td>
              <td>Human review time</td>
              <td>0.4s</td>
              <td>Time between receiving output and pressing Enter again</td>
            </tr>
            <tr>
              <td>R</td>
              <td>Rate limit</td>
              <td>60 req/min</td>
              <td>Standard tier API key</td>
            </tr>
            <tr>
              <td>D</td>
              <td>Deploy time</td>
              <td>12s</td>
              <td>Time to push to Vercel</td>
            </tr>
          </tbody>
        </PaperTable>

        <Footnote>
          <sup>1</sup> 47 is the mean. The distribution is bimodal: 12 prompts for founders who have
          a clear idea, and 340+ for founders whose first prompt is &ldquo;make me a startup.&rdquo;
          We model the mean for simplicity.
        </Footnote>

        <p className="reveal">
          In the naive (sequential) approach, the total time to ship all 800 MVPs is:
        </p>

        <MathBlock label="(1)">
          T<sub>total</sub> = N &times; (P &times; (T<sub>p</sub> + T<sub>h</sub>) + D)
        </MathBlock>

        <p className="reveal">Substituting our empirical values:</p>

        <MathBlock label="(2)">
          T<sub>total</sub> = 800 &times; (47 &times; (8.3 + 0.4) + 12) = 800 &times; (408.9 + 12)
          = 800 &times; 420.9s
        </MathBlock>

        <MathBlock label="(3)">
          T<sub>total</sub> = 336,720s &asymp; <strong>93.5 hours</strong>
        </MathBlock>

        <p className="reveal">
          This exceeds the 72-hour window by 29.8%. The naive approach fails. Not everyone gets an
          MVP. Approximately 174 founders will arrive at demo day with nothing but a landing page and
          a waitlist, which, to be fair, is also a viable demo strategy at Disrupt.
        </p>

        <p className="reveal">
          However, this model assumes sequential processing. In practice, the API key supports
          concurrent requests. Can we parallelize?
        </p>

        <h2 id="parallelism" className="reveal">The Parallelism Trap</h2>

        <p className="reveal">
          The obvious optimization is to run multiple founders&rsquo; prompts concurrently. If we can
          process <M>k</M> founders simultaneously, the total time becomes:
        </p>

        <MathBlock label="(4)">
          T<sub>parallel</sub> = (N / k) &times; (P &times; (T<sub>p</sub> + T<sub>h</sub>) + D)
        </MathBlock>

        <p className="reveal">To fit within 72 hours (259,200s):</p>

        <MathBlock label="(5)">
          k &ge; N &times; (P &times; (T<sub>p</sub> + T<sub>h</sub>) + D) / 259,200 = 336,720 /
          259,200 &asymp; 1.30
        </MathBlock>

        <p className="reveal">
          We need <M>k</M> &ge; 2. Just two concurrent sessions. This seems trivial &mdash; until we
          account for the rate limit.
        </p>

        <p className="reveal">
          At 60 requests per minute, total capacity is 60 &times; 60 &times; 72 ={" "}
          <strong>259,200 requests</strong> over 72 hours. Total prompts needed: 800 &times; 47 ={" "}
          <strong>37,600 prompts</strong>. We are well within the rate limit. The problem is not
          throughput. The problem is something else entirely.
        </p>

        <h2 id="context-window" className="reveal">The Context Window Bottleneck</h2>

        <p className="reveal">
          Each MVP session requires the AI to maintain a conversation context that grows with each
          prompt. By prompt 30, the context window contains approximately 45,000 tokens of
          accumulated code, instructions, corrections, and the phrase &ldquo;no, not like that, like
          how I described it before&rdquo; (avg. 12 tokens per occurrence, occurring 8.7 times per
          session).
        </p>

        <p className="reveal">
          The critical insight: <strong>as context grows, response quality degrades</strong>. We
          model this as the Vibe Decay Function:
        </p>

        <MathBlock label="(6)">
          Q(p) = Q<sub>0</sub> &times; e<sup>&minus;&lambda;p</sup>
        </MathBlock>

        <p className="reveal">
          where <M>Q<sub>0</sub></M> is initial response quality, <M>p</M> is the prompt number, and{" "}
          <M>&lambda;</M> is the decay constant, empirically measured at <M>&lambda;</M> = 0.031 for
          Claude Sonnet on a React + Tailwind task.
        </p>

        <p className="reveal">
          At prompt 47 (the average session length), quality has decayed to:
        </p>

        <MathBlock label="(7)">
          Q(47) = Q<sub>0</sub> &times; e<sup>&minus;0.031 &times; 47</sup> = Q<sub>0</sub> &times;
          0.233
        </MathBlock>

        <p className="reveal">
          The AI is operating at 23.3% of its initial quality by the end of the session. This means
          the last 15 prompts of every MVP session are, statistically, making the codebase{" "}
          <em>worse</em>. The developer doesn&rsquo;t know this because they are not reading the
          output. But the math is clear:{" "}
          <strong>
            there exists an optimal prompt number <M>p*</M> beyond which additional prompts have
            negative expected value.
          </strong>
        </p>

        <p className="reveal">
          We calculate <M>p*</M> by finding the prompt at which <M>Q(p)</M> falls below the{" "}
          <em>Minimum Viable Quality</em> threshold &mdash; the point at which the code is just
          functional enough to survive a 3-minute demo without crashing:
        </p>

        <MathBlock label="(8)">
          Q(p*) = Q<sub>MVQ</sub> &nbsp;&rArr;&nbsp; p* = &minus;ln(Q<sub>MVQ</sub> / Q<sub>0</sub>)
          / &lambda; = &minus;ln(0.40) / 0.031 &asymp; <strong>29.5 prompts</strong>
        </MathBlock>

        <p className="reveal">
          The optimal MVP is built in <strong>30 prompts, not 47</strong>. The additional 17 prompts
          are not just wasted &mdash; they are destructive. They introduce bugs, rename variables to
          things the developer didn&rsquo;t ask for, and add a dark mode that no one requested but
          that the AI felt strongly about.
        </p>

        <h2 id="middle-out" className="reveal">The Middle-Out Insight</h2>

        <p className="reveal">
          So far we have established that each MVP requires 30 useful prompts. 800 MVPs &times; 30
          prompts = 24,000 prompts. At 8.7 seconds per prompt with parallelism <M>k</M> = 2, this is
          feasible in approximately 29 hours. Problem solved.
        </p>

        <p className="reveal">
          Except it isn&rsquo;t. Because during our analysis, we made a discovery that renders the
          entire optimization unnecessary.
        </p>

        <p className="reveal">
          We examined the 800 startup applications from Disrupt 2026 and classified each MVP by its
          core architecture. The results:
        </p>

        <PaperTable>
          <thead>
            <tr>
              <th style={{ fontStyle: "normal" }}>Architecture</th>
              <th style={{ fontStyle: "normal" }}>Count</th>
              <th style={{ fontStyle: "normal" }}>% of Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>React + Tailwind + Supabase CRUD app</td>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>312</td>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>39.0%</td>
            </tr>
            <tr>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>React + Tailwind + Firebase CRUD app</td>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>208</td>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>26.0%</td>
            </tr>
            <tr>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>React + Tailwind + Supabase CRUD app + Stripe</td>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>147</td>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>18.4%</td>
            </tr>
            <tr>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>React + Tailwind + a chatbot that wraps Claude</td>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>104</td>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>13.0%</td>
            </tr>
            <tr>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>Something genuinely novel</td>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>29</td>
              <td style={{ fontFamily: "inherit", fontStyle: "normal" }}>3.6%</td>
            </tr>
          </tbody>
        </PaperTable>

        <p className="reveal">
          96.4% of the MVPs are the same application with different color schemes, logos, and the
          word &ldquo;AI&rdquo; in the tagline.
        </p>

        <p className="reveal">This leads us to the central result of this paper:</p>

        <Theorem label="Theorem 1 (Startup Isomorphism Theorem)">
          <p>
            For any two startups <M>S<sub>i</sub></M> and <M>S<sub>j</sub></M> presenting at
            TechCrunch Disrupt, the probability that their MVPs are architecturally identical
            approaches 1 as the number of startups increases:
          </p>
          <MathBlock>
            lim<sub>N&rarr;&infin;</sub> P(MVP<sub>i</sub> &cong; MVP<sub>j</sub>) = 1 &minus;
            &epsilon;
          </MathBlock>
          <p style={{ marginBottom: 0 }}>
            where <M>&epsilon;</M> represents the 3.6% of founders who had an original idea, and
            approaches 0 as VC funding increases and due diligence decreases.
          </p>
        </Theorem>

        <Corollary label="Corollary 1.1">
          <p style={{ marginBottom: 0 }}>
            You do not need to build 800 MVPs. You need to build <strong>4 MVPs</strong> and change
            the <code>--primary-color</code> CSS variable 800 times.
          </p>
        </Corollary>

        <p className="reveal">
          The optimization is not in the prompting strategy, the parallelism, or the context window
          management. The optimization is the recognition that{" "}
          <strong>
            the entire startup landscape has converged on approximately four products
          </strong>
          , and the only differentiator is branding, which takes 1 prompt, not 30.
        </p>

        <h2 id="revised-model" className="reveal">Revised Model: The Middle-Out Architecture</h2>

        <p className="reveal">
          We propose <strong>Middle-Out Prompting&trade;</strong>: instead of building 800 MVPs from
          scratch, build 4 template MVPs (the &ldquo;middle&rdquo;), then fork outward to 800
          branded instances:
        </p>

        <Figure
          caption={
            <>
              <strong>Fig. 1</strong> &mdash; Naive vs. Middle-Out prompting architecture. The
              Middle-Out approach reduces total prompts from 24,000 to 920, a 96.2% reduction, by
              exploiting the Startup Isomorphism Theorem.
            </>
          }
        >
          <pre style={{ margin: 0, whiteSpace: "pre", fontFamily: "inherit", fontSize: "inherit" }}>
{`NAIVE APPROACH (Sequential):
┌────┐ ┌────┐ ┌────┐ ┌────┐       ┌────┐
│ S₁ │ │ S₂ │ │ S₃ │ │ S₄ │  ...  │S₈₀₀│
│30p │ │30p │ │30p │ │30p │       │30p │
└────┘ └────┘ └────┘ └────┘       └────┘
Total prompts: 24,000

MIDDLE-OUT APPROACH:
        ┌── S₁  (1p: change colors + logo)
┌─────┐ ├── S₂  (1p)
│ T₁  │─├── S₃  (1p)
│ 30p │ ├── …
└─────┘ └── S₃₁₂ (1p)
        ┌── S₃₁₃ (1p)
┌─────┐ ├── S₃₁₄ (1p)
│ T₂  │─├── …
│ 30p │ └── S₅₂₀ (1p)
└─────┘
┌─────┐ ┌── …
│ T₃  │─└── S₆₆₇ (1p)
│ 30p │
└─────┘
┌─────┐ ┌── …
│ T₄  │─└── S₈₀₀ (1p)
│ 30p │
└─────┘
Total prompts: 4×30 + 800×1 = `}<strong>920</strong>
          </pre>
        </Figure>

        <p className="reveal">Total time under the Middle-Out model:</p>

        <MathBlock label="(9)">
          T<sub>MO</sub> = 4 &times; (30 &times; 8.7s) + 800 &times; (1 &times; 8.7s) + 800 &times;
          12s
        </MathBlock>

        <MathBlock label="(10)">
          T<sub>MO</sub> = 1,044 + 6,960 + 9,600 = 17,604s &asymp; <strong>4.9 hours</strong>
        </MathBlock>

        <p className="reveal">
          4.9 hours. Down from 93.5 hours. A <strong>94.8% reduction in Mean Jerk Time</strong>.
        </p>

        <p className="reveal">
          All 800 founders get a working MVP. All 800 MVPs can survive a 3-minute demo. All 800 MVPs
          are, under the hood, four applications wearing different hats. No one in the audience will
          notice, because the judges are VCs, and VCs evaluate traction, not architecture.
        </p>

        <h2 id="discussion" className="reveal">Discussion and Limitations</h2>

        <p className="reveal">
          Our analysis assumes that the 29 genuinely novel startups (3.6%) can be excluded from the
          optimization. We acknowledge this is unfair to those founders, who had original ideas and
          wrote real code. We have not optimized for them because they are statistical outliers and
          because, historically, they do not win TechCrunch Disrupt. The winner is always the CRUD
          app with the best pitch.
        </p>

        <p className="reveal">
          Additionally, our Vibe Decay Function (Eq. 6) was calibrated on Claude Sonnet. Preliminary
          measurements on GPT-4o suggest a higher decay constant (<M>&lambda;</M> = 0.038), meaning
          quality degrades faster. On Gemini, the function is not monotonically decreasing &mdash;
          quality occasionally <em>increases</em> at random intervals, which we model as a Poisson
          process and attribute to &ldquo;whatever is happening over there.&rdquo;
        </p>

        <p className="reveal">
          We also note that the human review time <M>T<sub>h</sub></M> = 0.4 seconds may be
          generous. Subsequent observation during the Disrupt hackathon revealed a median review time
          of 0.0 seconds for prompts 15 and beyond, with several founders observed physically
          pressing Enter <em>before the response had finished generating</em>. We do not know how to
          model this and have classified it as a faith-based optimization.
        </p>

        <h2 id="conclusion" className="reveal">Conclusion</h2>

        <p className="reveal">
          We have shown that the problem of shipping 800 MVPs in 72 hours is not, as initially
          believed, a throughput optimization problem. It is a{" "}
          <strong>recognition problem</strong>: the recognition that the MVPs are not 800 unique
          artifacts but 4 artifacts repeated with cosmetic variation.
        </p>

        <p className="reveal">
          The Middle-Out Prompting&trade; strategy reduces Mean Jerk Time from 93.5 hours to 4.9
          hours, well within the 72-hour constraint and leaving 67.1 hours for the founders to
          practice their pitch, design stickers, and argue about equity splits.
        </p>

        <p className="reveal">
          We believe this result generalizes beyond TechCrunch Disrupt. Any sufficiently large
          gathering of AI-assisted developers will converge on a small number of isomorphic
          applications, because the AI models they use were trained on the same data and produce the
          same outputs when given sufficiently vague prompts, which is the only kind of prompt most
          founders write.
        </p>

        <p className="reveal">
          The future of software development is not about building faster. It is about recognizing
          that you are building the same thing as everyone else, and optimizing accordingly.
        </p>

        <Corollary label="Final Corollary">
          <p style={{ marginBottom: 0 }}>
            If you are reading this paper at TechCrunch Disrupt and feel personally attacked, your
            MVP is one of the four templates. If you feel vindicated, you are one of the 29. Either
            way, your demo is in 4 hours and you should probably stop reading.
          </p>
        </Corollary>

        <References>
          <RefEntry num="[1]">
            Tokenwindow, B. et al. &ldquo;On the Convergence of AI-Generated Codebases in Hackathon
            Environments.&rdquo; <em>Proc. SIGVIBE 2025</em>, pp. 1&ndash;14.
          </RefEntry>
          <RefEntry num="[2]">
            Contextlength, J. &ldquo;The Vibe Decay Function: Modeling Quality Degradation in
            Extended AI Coding Sessions.&rdquo; <em>Journal of Approximate Engineering</em>, Vol. 3,
            No. 2, 2026.
          </RefEntry>
          <RefEntry num="[3]">
            Overfit, P. &ldquo;Why Every Startup Looks the Same: A Statistical Analysis of Y
            Combinator Demo Day 2025.&rdquo; <em>arXiv:2601.04208</em> [cs.SE].
          </RefEntry>
          <RefEntry num="[4]">
            Temperatureknob, G. &ldquo;Middle-Out Compression and Its Unexpected Applications in
            Prompt Engineering.&rdquo;{" "}
            <em>
              Proceedings of the 4th International Conference on Things That Shouldn&rsquo;t Work But
              Do
            </em>
            , 2026.
          </RefEntry>
          <RefEntry num="[5]">
            Nobackend, S. &ldquo;I Dissent: Why Typing Code Manually Still Has Value.&rdquo;{" "}
            <em>Unpublished manuscript (rejected by all venues)</em>, 2026.
          </RefEntry>
          <RefEntry num="[6]">
            Silicon Valley, Season 1, Episode 8. &ldquo;Optimal Tip-to-Tip Efficiency.&rdquo; HBO,
            2014. (Prior art.)
          </RefEntry>
        </References>
      </PaperWrap>
    </div>
  );
}
