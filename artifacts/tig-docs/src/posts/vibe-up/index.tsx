import {
  EssayCover,
  EssayChapter,
  EP,
  EssayH2,
  EssayH3,
  EssayQuote,
  EssayNote,
  EssayInfo,
  EssayAttribution,
  FlowDiagram,
  FlowBox,
  FlowArrow,
  FlowDown,
  GlossaryTable,
  ConventionTable,
  EssayCode,
  CC,
  CS,
  CF,
  EssayFooter,
  HillChart,
} from "@/components/docs/EssayUI";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function VibeUpPost() {
  useScrollReveal();

  return (
    <div id="overview">
      <EssayCover
        brand="38signals"
        title="Vibe Up"
        subtitle="Stop Shipping Software and Start Shipping Opinions"
        author="Bryce Fingerboard"
      />

      {/* ── FOREWORD ── */}
      <EssayChapter label="Foreword" title="by Jayson Fried-Chicken" id="foreword" />

      <EP>I've known Bryce for twenty years. We started 38signals together in a coffee shop in Chicago that no longer exists because the neighborhood got too expensive, which we had nothing to do with.</EP>

      <EP>When we started, the software industry was obsessed with process. Standups. Retrospectives. Two-week sprints. We looked at all of that and said: <em>what if we just didn't?</em></EP>

      <EP>That question &mdash; "what if we just didn't?" &mdash; has been the foundation of everything we've built. What if we didn't have an office? What if we didn't have managers? What if we didn't have a roadmap? What if we didn't apologize when people got upset? Each "didn't" became a blog post. Each blog post became a philosophy. Each philosophy became a book. Each book sold a quarter million copies to people who wanted permission to do less, which is to say: <em>everyone</em>.</EP>

      <EssayQuote>"At 38signals, we don't build software. We build a way of thinking about building software. Sometimes, as a side effect, software appears."</EssayQuote>

      <EP>Bryce has captured something important in this book. Not a methodology &mdash; we don't believe in methodologies, which is itself a methodology, but we prefer not to examine that too closely. What Bryce has captured is a <em>vibe</em>. And in the end, that's all a company really is: a vibe that invoices people.</EP>

      <EssayAttribution name="Jayson Fried-Chicken, Co-founder, 38signals" detail="Chicago, IL · Written in a single sitting, which is the only way we write anything" />

      {/* ── CHAPTER 1 ── */}
      <EssayChapter label="Chapter 1" title="Less Is More (And More Is a Hiring Problem)" id="ch1" />

      <EP>At 38signals, we are a team of twelve. We have been a team of twelve for nine years. When we were ten, we were productive. When we briefly became fourteen, everything felt wrong &mdash; there were too many people in the Campfire room, the opinions were diluted, and someone kept putting meetings on the shared calendar, which we don't use, which is why we have one.</EP>

      <EP>We went back to twelve. Twelve is the right number. Twelve is the number at which every person can hold every other person's current project in their head. At thirteen, this breaks down. At eleven, someone is doing two things, which means they're doing zero things well. Twelve is not arbitrary. Twelve is <em>physics</em>.</EP>

      <EssayQuote>"If you need more than twelve people to build your product, your product is too complicated. Simplify the product, not the org chart."</EssayQuote>

      <EP>The software industry has convinced itself that headcount is a proxy for ambition. We reject this. More engineers means more coordination, more meetings, more Slack channels, more opinions that need to be "aligned" &mdash; a word that means "argued about until everyone is too tired to disagree."</EP>

      <EP>We don't align. We <em>vibe</em>. When twelve people share a vibe, alignment is unnecessary. The work flows like water through a channel shaped by twenty years of working together and a shared preference for the same coffee.</EP>

      <EssayNote label="A note on growth">
        <EP>We are occasionally asked: "What if you need to scale?" Our answer: we don't. We have built a profitable company that serves millions of customers with twelve people, a Ruby monolith, and a conviction that scaling is someone else's problem. If your business requires you to scale, that is a business problem, not a software problem. We wrote a blog post about this. It has been read 2.3 million times, which is more users than most venture-backed startups have.</EP>
      </EssayNote>

      {/* ── CHAPTER 2 ── */}
      <EssayChapter label="Chapter 2" title="The Six-Week Feeling" id="ch2" />

      <EP>Two-week sprints are a trap. They create the illusion of progress while producing an endless stream of half-finished work. You plan for two weeks. You build for one and a half. You spend the remaining days in "sprint review" and "retrospective" &mdash; meetings about whether the meetings are working, which they are not, because you're in a meeting about it.</EP>

      <EP>At 38signals, we work in six-week cycles. Six weeks is long enough to build something meaningful and short enough to feel the deadline pressing against you from day one, like a friendly hand on your shoulder that gradually becomes a firm grip on your throat.</EP>

      <EssayQuote>"A sprint is a promise you make to a calendar. A cycle is a promise you make to yourself."</EssayQuote>

      <EP>But the cycle is not what matters. What matters is <strong>the feeling</strong>. When you sit down on the first Monday of a six-week cycle, you should feel something &mdash; a sense of possibility, constrained by a boundary that you chose. If you don't feel it, the cycle is wrong. Start over. Re-shape. There is no shame in scrapping a cycle. There is only shame in shipping something you don't feel good about.</EP>

      <EssayH2>Cool-Down: The Palate Cleanser</EssayH2>

      <EP>Between each cycle, we take two weeks of "cool-down" &mdash; unstructured time where the team does whatever feels right. Bug fixes. Exploration. Writing. Some people prototype. Some people garden. One of our engineers spent an entire cool-down building a mechanical keyboard from scratch, and when he came back, his code was better. We don't ask why. We don't need to. That's the vibe.</EP>

      <EP>The cool-down is sacred. No shaped work is assigned. No bets are placed. It is the organizational equivalent of lying on the floor after a long run. Some companies call this "innovation time." We call it "not working," which is more honest.</EP>

      <EssayInfo label="On productivity">
        <EP>We have found that the cool-down is often when our best ideas emerge. This is because creativity requires space, and space requires the absence of shaped work. It also requires the absence of Slack notifications, which is why we turn off Slack during cool-down. And also during cycles. We mostly just don't use Slack. We wrote a blog post about this.</EP>
      </EssayInfo>

      {/* ── CHAPTER 3 ── */}
      <EssayChapter label="Chapter 3" title="Appetites, Not Estimates" id="ch3" />

      <EP>The word "estimate" is a lie dressed in a number. When a manager asks "how long will this take?" they are not asking for information. They are asking for a <em>commitment</em> &mdash; one that will be held against you when reality diverges from the spreadsheet, which it will, because reality has not read the spreadsheet.</EP>

      <EP>At 38signals, we don't estimate. We set <strong>appetites</strong>.</EP>

      <EP>An appetite is not how long something <em>will</em> take. It's how long something <em>deserves</em>. "This is a six-week idea." "This is a two-week idea." "This is a one-afternoon idea that someone has been overthinking in a Google Doc for three months." The appetite is set by the shaper, not by the builder. The builder decides how to fill the time. The shaper decides how much time to give.</EP>

      <EssayQuote>"An estimate says: this is how complex the problem is. An appetite says: this is how much we care."</EssayQuote>

      <EP>This distinction changes everything. When you estimate, you are subordinate to the work &mdash; the work tells <em>you</em> how long it needs. When you set an appetite, you are superior to the work &mdash; <em>you</em> tell the work how long it gets. This is not a semantic difference. It is a power dynamic, and power dynamics are what methodologies are actually about.</EP>

      <EssayNote label="In practice">
        <EP>All appetites at 38signals are expressed in "weeks of vibe." A six-week cycle contains six weeks of calendar time but only five weeks of vibe, because the first week is spent re-reading the pitch, arguing about whether the pitch is right, and quietly rewriting the pitch while pretending to agree with it. This is normal. The vibe needs time to settle.</EP>
      </EssayNote>

      {/* ── CHAPTER 4 ── */}
      <EssayChapter label="Chapter 4" title="Fat Marker Vibes" id="ch4" />

      <EP>When shaping a project, we sketch with <strong>fat markers</strong>. Not fine-point pens. Not wireframes. Not Figma. A fat marker forces you to stay at the right level of abstraction &mdash; too coarse for details, too bold for precision. You can draw a box. You can draw an arrow. You cannot draw a dropdown menu, which means you will not argue about whether the dropdown should have a search field, which means you will ship six weeks sooner.</EP>

      <EssayQuote>"A wireframe is a trap disguised as a blueprint. The moment you draw a pixel-perfect button, someone will ask about the hover state, and you have lost three days."</EssayQuote>

      <EP>The fat marker sketch is not a deliverable. It is a <em>gesture</em> &mdash; a wave of the hand that says "something like this." Designers fill in the details. Programmers fill in the implementation. The shaper fills in the narrative, which is the part that goes in the blog post, which is the part that matters.</EP>

      <EssayH2>Breadboarding</EssayH2>

      <EP>For flows that can't be sketched, we use <strong>breadboarding</strong> &mdash; a technique borrowed from electrical engineering, because borrowing terminology from other disciplines makes your methodology sound more rigorous than it is. A breadboard is a diagram of affordances and connections. It shows what the user <em>can do</em>, not what the screen <em>looks like</em>.</EP>

      <EP>This is liberating. A breadboard says "there is a button here that does a thing." It does not say what the button looks like. It does not say where the button is. It barely says what the button does. It says the button <em>exists</em>, and that is enough to bet on, which is all we need, because we bet on vibes, not specifications.</EP>

      {/* ── CHAPTER 5 ── */}
      <EssayChapter label="Chapter 5" title="The Blog Post Is the Product" id="ch5" />

      <EP>Most companies ship features and then write a blog post about them. At 38signals, we've discovered that the optimal sequence is reversed. <strong>Write the blog post first.</strong> If the blog post is compelling, build the feature. If the blog post is boring, the feature isn't worth building.</EP>

      <EssayQuote>"We don't ship features. We ship narratives. The feature is how the narrative becomes interactive."</EssayQuote>

      <EP>This is not a metaphor. Our actual product development process begins with a 1,500-word essay about why a problem matters, how our approach is different from everyone else's, and why the rest of the industry has been thinking about it wrong. If the essay resonates &mdash; if it gets shared, if it starts arguments on Hacker News, if someone writes a rebuttal that we can then rebut &mdash; the feature gets built.</EP>

      <EP>If the essay doesn't resonate, we don't build the feature. The market has spoken. Not the market for software &mdash; the market for <em>opinions</em>, which is larger, more liquid, and significantly easier to address.</EP>

      <EssayH2>The Content-Product Flywheel</EssayH2>

      <FlowDiagram caption="Fig. 1 — The 38signals product development lifecycle. Note that building software is the final, optional step.">
        <FlowBox>Strong opinion</FlowBox>
        <FlowArrow />
        <FlowBox primary>Blog post</FlowBox>
        <FlowArrow />
        <FlowBox>HN discourse</FlowBox>
        <FlowArrow />
        <FlowBox>Rebuttals</FlowBox>
        <FlowArrow />
        <FlowBox>Counter-post</FlowBox>
        <FlowArrow />
        <FlowBox primary>Podcast tour</FlowBox>
        <FlowDown />
        <FlowBox>Conference talk</FlowBox>
        <FlowArrow />
        <FlowBox>Book deal</FlowBox>
        <FlowArrow />
        <FlowBox struck>Build the feature (optional)</FlowBox>
      </FlowDiagram>

      <EP>Some readers will object: "But surely you need to build the software eventually?" To which we respond: we have been in business for twenty-two years. We are profitable. Our blog has more monthly readers than our product has monthly users. Draw your own conclusions.</EP>

      {/* ── CHAPTER 6 ── */}
      <EssayChapter label="Chapter 6" title="Convention Over Configuration" id="ch6" />

      <EP>In 2004, we coined the phrase "convention over configuration" to describe a design philosophy for web frameworks. The idea was simple: instead of configuring every detail of your application, adopt sensible defaults and only override what matters. This principle became the foundation of Ruby on Rails and, subsequently, of every framework that wanted to sound like it had a philosophy.</EP>

      <EP>Twenty years later, we have realized that we were more right than we knew &mdash; but about the wrong thing.</EP>

      <EssayQuote>"Convention over configuration isn't about software defaults. It's about going to conventions instead of doing configuration."</EssayQuote>

      <EP><strong>Convention over configuration</strong>, in its mature form, means: spend less time configuring your project and more time at conventions talking about how you configured your project. The talk is the artifact. The project is the excuse for the talk. The talk leads to another talk, which leads to a keynote, which leads to a book deal, which leads to this book, which you are reading instead of configuring your project.</EP>

      <EP>This is the flywheel. This is the way.</EP>

      <EssayH2>The Convention Circuit</EssayH2>

      <EP>A properly executed Convention Over Configuration strategy unfolds across the full calendar year:</EP>

      <ConventionTable rows={[
        {
          quarter: "Q1",
          activity: <>Submit 8 CFPs. Prepare 3 talks, all variations of the same thesis. Title format: "Why [thing everyone does] Is Wrong and What We Do Instead."</>,
          shipped: "None.",
        },
        {
          quarter: "Q2",
          activity: <>Give the talk at RailsConf, RubyConf, and a Nordic conference with exceptional production values and a single-word name like "Craft" or "Build." Record a podcast episode about the talk. Write a blog post about the podcast.</>,
          shipped: "One bug fix, deployed between talks at the airport.",
        },
        {
          quarter: "Q3",
          activity: <>Fireside chat circuit. The format: two chairs, warm lighting, no slides. The content: the same thesis, but slower and with more pauses for emphasis. Audience Q&amp;A where every question is answered with "great question &mdash; we actually wrote a blog post about this."</>,
          shipped: "The feature you described in the Q2 talk, which now must be built because 4,000 people saw you demo a prototype.",
        },
        {
          quarter: "Q4",
          activity: <>Lightning talks at 3 local meetups. These are presented as "giving back to the community" but are functionally rehearsals for the Q1 CFPs. The cycle restarts.</>,
          shipped: <>One deploy, tagged "end-of-year cleanup."</>,
        },
      ]} />

      <EP>Over the course of a year, this strategy produces: 12 talks, 8 podcast appearances, 4 blog posts, 2 fireside chats, 1 conference workshop, and approximately one shipped feature, which was described in public before it was built, committed to before it was designed, and celebrated before it was tested. This is Convention Over Configuration in its purest form.</EP>

      <EssayNote label="On the talks themselves">
        <EP>Every 38signals conference talk follows the same structure, which we call the <strong>Contrarian Sandwich</strong>: begin with a popular practice everyone assumes is correct ("standups," "sprints," "hiring"), assert that it is wrong, describe what we do instead, and close with a slide that says "it's just that simple" over a photo of a mountain. The mountain is load-bearing. Without the mountain, the audience questions whether it's actually that simple. With the mountain, they nod. Mountains are the strategic nod of slide design.</EP>
      </EssayNote>

      <EssayH2>The Mustache Principle</EssayH2>

      <EP>In the early days of the Rails ecosystem, a templating library called Mustache emerged. Its defining feature was that it had no logic &mdash; no conditionals, no loops, just placeholders. This was hailed as a breakthrough. A template language that <em>couldn't do anything</em> was, paradoxically, the template language that <em>did everything right</em>.</EP>

      <EP>Mustache has since been superseded by fourteen subsequent templating libraries, each of which added logic back in, because it turns out you need logic. But the <em>idea</em> of Mustache &mdash; the aesthetic of radical simplicity, the conviction that less is not just more but is <em>morally superior</em> &mdash; endures. This is the Mustache Principle:</EP>

      <EssayQuote>"It is better to ship something that cannot do the thing the user needs than to ship something complex that can. The user will adapt. They always do. And if they don't, they weren't your user."</EssayQuote>

      <EP>The Mustache Principle has guided every product decision at 38signals. When a user requests a feature, we ask: "Is this a feature, or is this a blog post about why we don't need this feature?" Nine times out of ten, it's the blog post. The blog post takes less time to ship, generates more engagement, and never introduces a regression.</EP>

      {/* ── CHAPTER 7 ── */}
      <EssayChapter label="Chapter 7" title="Bets, Not Backlogs (Not Features, Not Users)" id="ch7" />

      <EP>We don't have a backlog. Backlogs are where ideas go to die slowly, surrounded by other dying ideas, in a Jira board that no one opens voluntarily. A backlog is a guilt ledger &mdash; a list of things you promised to consider and never will, preserved in digital amber as a monument to good intentions and organizational dysfunction.</EP>

      <EP>Instead of a backlog, we have a <strong>betting table</strong>. Every six weeks, during cool-down, we sit around a table &mdash; a literal table, in our office that we use two days a week because we wrote a book about remote work and now feel contractually obligated to prove we also believe in offices &mdash; and we <em>bet</em>.</EP>

      <EssayQuote>"A backlog is a list. A bet is a commitment. Lists are for groceries. Commitments are for software."</EssayQuote>

      <EP>A bet means: this team will work on this shaped project for the next six weeks, with no interruptions. If it doesn't ship in six weeks, we kill it. This is the <strong>circuit breaker</strong> &mdash; the principle that no project gets a second cycle. If it didn't ship, it wasn't shaped well enough. Or the appetite was wrong. Or the vibe was off. Any of these is sufficient reason to walk away.</EP>

      <EssayH3>Important ideas come back</EssayH3>

      <EP>When we kill a project, people ask: "But what about the work that was done?" To which we reply: if the idea was good, it will come back. Someone will re-pitch it. Someone will feel the absence. If no one re-pitches it and no one feels the absence, it wasn't important. The backlog was lying to you. The backlog <em>always</em> lies.</EP>

      <EssayInfo label="A note for skeptics">
        <EP>Some readers may feel that killing a six-week project with no carry-over is wasteful. These readers are correct. It is wasteful. But it is <em>intentionally</em> wasteful, in the way that a Japanese tea ceremony is intentionally slow, or a Basecamp subscription is intentionally simple. The waste is the point. The waste says: we would rather lose six weeks of work than ship something that doesn't feel right. That's the kind of company we are. We wrote a blog post about this.</EP>
      </EssayInfo>

      {/* ── CHAPTER 8 ── */}
      <EssayChapter label="Chapter 8" title="The Hill Chart of Feelings" id="ch8" />

      <EP>Traditional project management uses burndown charts &mdash; graphs that show work decreasing over time, like a candle melting, or morale during a reorg. The problem with burndown charts is that they measure <em>tasks completed</em>, which tells you nothing about whether the hard problems have been solved.</EP>

      <EP>We use the <strong>hill chart</strong>. The hill chart divides work into two phases: <strong>uphill</strong> (figuring things out) and <strong>downhill</strong> (executing on what you've figured out). Each scope is a dot on the hill. You drag the dot as work progresses. When all dots are downhill, you're in execution mode. When a dot is stuck at the top, you have a problem.</EP>

      <HillChart />

      <EP>What Shape Up doesn't tell you &mdash; what no methodology tells you &mdash; is that the hill chart is also a <strong>chart of feelings</strong>. Uphill feels like uncertainty, confusion, and the creeping suspicion that you shaped the wrong thing. The peak feels like a breakthrough, or possibly delusion. Downhill feels like momentum, confidence, and the dangerous belief that you'll finish early. You will not finish early. No one has ever finished early. The hill chart just makes you <em>feel</em> like you might, which is enough.</EP>

      <EssayQuote>"The hill chart doesn't track work. It tracks the emotional arc of building software, which is the only arc that matters."</EssayQuote>

      {/* ── CHAPTER 9 ── */}
      <EssayChapter label="Chapter 9" title="Move On (They'll Come Back If It Matters)" id="ch9" />

      <EP>The hardest part of any methodology is the ending. Not ending the cycle &mdash; that happens automatically after six weeks, like a kitchen timer. The hard part is ending the <em>conversation</em>. When you ship something, people have opinions. They want changes. They want additions. They want the thing to be slightly different in ways they couldn't articulate before it existed but are now certain about.</EP>

      <EP>At 38signals, we have a name for this: <strong>the storm</strong>. The storm is the 72-hour window after a feature ships when feedback floods in and every instinct says "we should fix this, add this, change this." The storm feels urgent. It is not. It is just <em>loud</em>.</EP>

      <EP>Our rule: <strong>let the storm pass</strong>. Do not react. Do not create tickets. Do not open Jira &mdash; we don't have Jira, but metaphorically. Let the feedback sit. Wait two weeks. After two weeks, the things that matter are still being talked about. The things that don't have been forgotten, replaced by a new storm about something else.</EP>

      <EssayQuote>"If it matters, it'll come back. If it doesn't come back, it didn't matter. This principle applies to feature requests, relationships, and sourdough starters."</EssayQuote>

      <EssayH2>On Sourdough</EssayH2>

      <EP>This is not a metaphor. Several members of the 38signals team maintain active sourdough starters. We have found that the patience required to maintain a starter &mdash; the daily feeding, the temperature monitoring, the willingness to let time do the work &mdash; maps directly onto the patience required to build software without sprints, backlogs, or the pathological urgency that most companies mistake for productivity.</EP>

      <EP>We have considered writing a book about this. We will call it "Bake Up." It will be available in letterpress.</EP>

      {/* ── GLOSSARY ── */}
      <EssayChapter label="Glossary" title="Key Concepts" id="glossary" />

      <GlossaryTable rows={[
        { term: "Appetite", definition: <>How much time a project <em>deserves</em>, as opposed to how much time it would <em>take</em>. These are different numbers. The first one is smaller and comes with more conviction.</> },
        { term: "Betting Table", definition: <>A meeting where shaped work is selected for the next cycle. Called a "table" because it occurs at a literal table, which we mention frequently to emphasize that we are a real company with physical objects.</> },
        { term: "Blog Post", definition: <>The primary deliverable of the 38signals product development process. Ships faster than software, generates more revenue than features (via book deals), and has never caused a production outage.</> },
        { term: "Circuit Breaker", definition: <>The principle that projects which don't ship in one cycle are killed. Named after an electrical component, because borrowing terminology from other fields is a load-bearing element of methodology design.</> },
        { term: "Convention Over Configuration", definition: <>The principle that you should spend less time configuring your software and more time at conventions telling people how you configured your software. The conference talk is the artifact. The software is the excuse.</> },
        { term: "Cool-Down", definition: <>A two-week period between cycles where no shaped work is assigned. Used for bug fixes, exploration, and building mechanical keyboards. The mechanical keyboard is not optional.</> },
        { term: "Contrarian Sandwich", definition: <>The structure of every 38signals conference talk: popular practice &rarr; why it's wrong &rarr; what we do instead &rarr; photo of a mountain. The mountain is non-negotiable.</> },
        { term: "Cycle", definition: "A six-week period of focused work. Contains five weeks of vibe and one week of settling." },
        { term: "Fat Marker Sketch", definition: "A deliberately rough sketch drawn with a thick marker to prevent premature detail. If you can read the text in the sketch, the marker isn't fat enough." },
        { term: "Hill Chart", definition: "A visualization of project progress divided into \"figuring it out\" (uphill) and \"making it happen\" (downhill). Also a visualization of the emotional arc of building software, which is: confusion \u2192 false confidence \u2192 panic \u2192 shipping \u2192 blog post." },
        { term: "Letterpress Edition", definition: "A premium physical edition of a 38signals book, printed on archival paper using a vintage press. Costs $45. Contains the same words as the free online version. Sells out immediately. This is the Convention Over Configuration of publishing." },
        { term: "Mustache Principle", definition: "The belief that a product which cannot do what the user needs is morally superior to a product that can but is complex. Named after a templating library that was celebrated for its inability to do things." },
        { term: "Shaping", definition: "The process of defining a project at the right level of abstraction \u2014 rough enough that the team has creative freedom, solved enough that they won't go in circles, and bounded enough that it fits in six weeks. In practice: a senior person writes a document that is part specification, part essay, part blog post draft." },
        { term: "The Storm", definition: "The 72-hour feedback surge after a feature ships. To be weathered, not acted upon. Like a real storm, it passes. Unlike a real storm, it is mostly composed of Hacker News comments." },
        { term: "Vibe", definition: "The irreducible unit of organizational coherence at 38signals. Cannot be measured, only felt. If you have to ask what the vibe is, the vibe is wrong." },
      ]} />

      {/* ── APPENDIX A ── */}
      <EssayChapter label="Appendix A" title="The Canonical Stack" id="stack" />

      <EP>At 38signals, we have used the same technology stack since 2005. This is not because we haven't evaluated alternatives. We have. Every year, during cool-down, someone suggests trying a new language, a new framework, a new database. We listen politely. Then we write a blog post about why Ruby is still the right choice, and the blog post generates more traffic than the alternative technology's entire documentation site, and we move on.</EP>

      <EssayCode>
        <CC># The 38signals production stack (2005&ndash;present)</CC>{"\n\n"}
        <CF>Language</CF>:       Ruby (<CS>"still beautiful, still enough"</CS>){"\n"}
        <CF>Framework</CF>:      Rails (<CS>"we built this"</CS>){"\n"}
        <CF>Frontend</CF>:       Turbolinks &rarr; Turbo &rarr; Hotwire &rarr; <CS>"whatever we renamed it this year"</CS>{"\n"}
        <CF>JavaScript</CF>:     As little as possible. Written reluctantly. Deleted joyfully.{"\n"}
        <CF>CSS</CF>:            Handwritten. No utility classes. <CC># We have opinions about Tailwind.</CC>{"\n"}
        <CF>Database</CF>:       MySQL (<CS>"it was here when we arrived and it will be here when we leave"</CS>){"\n"}
        <CF>Hosting</CF>:        Our own servers. (<CS>"The cloud is just someone else's computer"</CS>{"\n"}
        <CS> &mdash; a phrase we coined, or at least popularized, or at least blogged about</CS>){"\n"}
        <CF>Search</CF>:         ElasticSearch (<CS>"we don't talk about this one"</CS>){"\n"}
        <CF>Editor</CF>:         TextMate &rarr; Sublime &rarr; VS Code &rarr; <CS>"it doesn't matter, the code is the same"</CS>{"\n"}
        <CF>CI/CD</CF>:          A shell script Bryce wrote in 2009 that everyone is afraid to modify{"\n"}
        <CF>Monitoring</CF>:     <CS>"If customers are complaining, it's down"</CS>{"\n"}
        <CF>Templates</CF>:      ERB (<CS>"we considered Mustache. we wrote a blog post about Mustache.</CS>{"\n"}
        <CS> the blog post outlived Mustache."</CS>)
      </EssayCode>

      <EssayNote label="On JavaScript frameworks">
        <EP>We are aware of React, Vue, Svelte, Angular, Solid, Qwik, Astro, and the seventeen frameworks that have been released since this paragraph was written. We do not use them. We use Hotwire, which is HTML-over-the-wire, which is how the web worked before JavaScript, which means we have come full circle, which means we were right the first time, which is our favorite thing to be.</EP>
      </EssayNote>

      <EP>We ship a 22-year-old Ruby monolith that serves 3.3 million customers and we deploy it with a shell script. This is not legacy. This is <em>heritage</em>. There is a difference, and that difference is a blog post we will publish next Tuesday.</EP>

      {/* ── FOOTER ── */}
      <EssayFooter>
        <p><strong>Vibe Up: Stop Shipping Software and Start Shipping Opinions</strong></p>
        <p>&copy; 2026 38signals LLC. All rights reserved. Written during cool-down. Published during a cycle. Promoted at 7 conventions.</p>
        <p className="mt-2">We built <span style={{ color: "#d35400" }}>Pacecamp</span> to execute the techniques in this book. It puts all our project communication, shaped pitches, and hill charts in one place, which you could also achieve with a shared Google Doc, but then we wouldn't have a product to sell alongside the book.</p>
        <p className="mt-2 italic" style={{ color: "#aaa" }}>This book contains approximately 4,200 words about how to build software and zero lines of code. This ratio is intentional. It is also our annual average.</p>
      </EssayFooter>
    </div>
  );
}
