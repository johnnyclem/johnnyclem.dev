import { TerminalWindow, TDim, TBlue, TGreen, TYellow, TRed, TMauve, TBold } from "@/components/docs/Terminal";
import { Callout, CodeBlock, InlineCode } from "@/components/docs/Callout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function TerminalInterfaceGuidelines() {
  useScrollReveal();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="text-[13px] text-text-tertiary font-medium mb-1 uppercase tracking-[0.3px]">Design</div>
      <h1 className="font-display text-[40px] font-bold tracking-[-0.5px] leading-[1.1] mb-3 text-text-primary">
        Terminal Interface<br />Guidelines
      </h1>
      <p className="text-[19px] text-text-secondary font-light leading-[1.42] mb-9 max-w-[600px]">
        Designing immersive, pixel-considered experiences within the profound constraint of a fixed-width character grid.
      </p>

      <div id="overview" className="font-display text-[22px] font-light leading-[1.5] text-text-secondary my-8 pl-5 border-l-2 border-border italic reveal-fade">
        "There is a profound, almost spiritual moment when you open a terminal for the first time and realize: this is how software was always meant to feel. No shadows. No border-radius. No design system maintained by a team of fourteen. Just you, a grid, and the courage to render a box using the pipe character."
        <br /><br />
        <span className="text-[16px]">— Jony Ive, if he had grown up running Arch Linux</span>
      </div>

      {/* Foundations */}
      <h2 id="foundations" className="font-display text-[28px] font-semibold mt-14 mb-4 tracking-[-0.2px] pt-6 border-t border-border reveal">Foundations</h2>
      
      <p className="mb-4">
        The Terminal Interface Guidelines (TIG) represent an unwavering commitment to the belief that great design can happen anywhere — even in a medium where your most expressive visual tool is the Unicode box-drawing character <InlineCode>U+2502</InlineCode>.
      </p>
      <p className="mb-4">
        A well-crafted TUI is not merely an interface. It is a <em>statement</em>. It tells the user: "I could have built this in SwiftUI. I chose not to. I chose <em>this</em>." That choice — that deliberate act of restraint — is what separates a terminal application from a mere command-line tool.
      </p>

      <Callout type="standard" label="Important">
        All TUI applications submitted to the Terminal App Store must be tested at a minimum of seven (7) different terminal widths, including the width at which your carefully centered title shifts one column to the left and everything looks subtly wrong but you can't quite articulate why.
      </Callout>

      {/* Design Philosophy */}
      <h2 id="philosophy" className="font-display text-[28px] font-semibold mt-14 mb-4 tracking-[-0.2px] pt-6 border-t border-border reveal">Design Philosophy</h2>

      <h3 className="font-display text-[21px] font-semibold mt-9 mb-3">Intentional Constraint</h3>
      <p className="mb-4">
        Where UIKit offers you millions of colors, scalable vectors, and sub-pixel anti-aliasing, the terminal offers you a grid. A beautiful, unforgiving, fixed-width grid. Each cell is a commitment. Each character is a choice. When you place a <InlineCode>┌</InlineCode> in column 0, row 0, you are not simply drawing a corner — you are making a promise to the user that a <InlineCode>┐</InlineCode> will appear exactly where they expect it.
      </p>
      <p className="mb-4">
        Sometimes that promise is broken. We'll get to that.
      </p>

      <h3 className="font-display text-[21px] font-semibold mt-9 mb-3">Immersion Through Limitation</h3>
      <p className="mb-4">
        A great terminal interface achieves what no graphical application can: the sensation that you are <em>inside</em> the computer. The user does not look <em>at</em> a TUI — they inhabit it. Every flickering cursor is a heartbeat. Every screen redraw is a breath. Every inexplicable rendering glitch after an <InlineCode>ssh</InlineCode> session is a gentle reminder of your own mortality.
      </p>

      <h3 className="font-display text-[21px] font-semibold mt-9 mb-3">The Mouse is a Crutch</h3>
      <p className="mb-4">
        The mouse was invented in 1964 by Douglas Engelbart, who could not have foreseen that sixty years later it would be used primarily to accidentally highlight three paragraphs in a terminal while trying to scroll. The TIG rejects the mouse not out of elitism, but out of <em>mercy</em>.
      </p>
      <p className="mb-4">
        All navigation must be achievable through keyboard input alone. If a user reaches for their mouse, you have failed. If a user reaches for their mouse and it <em>works</em>, you have failed catastrophically, because now you have to support it forever.
      </p>

      <Callout type="standard" label="Design Principle">
        Every interaction in your TUI should be discoverable through a system of keyboard shortcuts that the user will never memorize, printed in a help panel they will never open, toggled by pressing <InlineCode>?</InlineCode> — which they will discover by accident while typing a search query.
      </Callout>

      {/* Typography */}
      <h2 id="typography" className="font-display text-[28px] font-semibold mt-14 mb-4 tracking-[-0.2px] pt-6 border-t border-border reveal">Typography</h2>

      <h3 className="font-display text-[21px] font-semibold mt-9 mb-3">Font Selection</h3>
      <p className="mb-4">
        The terminal operates in a monospaced environment. This is not a limitation — it is a <em>liberation</em>. In the graphical world, designers agonize over kerning, tracking, and the existential weight of choosing between Helvetica Neue and SF Pro. In the terminal, every character occupies exactly one cell. The letter <InlineCode>W</InlineCode> and the letter <InlineCode>i</InlineCode> coexist as equals. This is perhaps the only truly egalitarian space in all of computing.
      </p>

      <table className="w-full border-collapse my-5 text-[14px] text-left reveal">
        <thead>
          <tr>
            <th className="font-semibold px-3.5 py-2.5 border-b-2 border-border text-text-secondary text-[12px] uppercase tracking-[0.3px]">Context</th>
            <th className="font-semibold px-3.5 py-2.5 border-b-2 border-border text-text-secondary text-[12px] uppercase tracking-[0.3px]">Recommended Font</th>
            <th className="font-semibold px-3.5 py-2.5 border-b-2 border-border text-text-secondary text-[12px] uppercase tracking-[0.3px]">Acceptable Alternative</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">General UI</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top"><InlineCode>JetBrains Mono</InlineCode></td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top"><InlineCode>SF Mono</InlineCode>, if you're in the ecosystem</td>
          </tr>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Nostalgic warmth</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top"><InlineCode>IBM Plex Mono</InlineCode></td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top"><InlineCode>Courier New</InlineCode>, but only ironically</td>
          </tr>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Asserting dominance</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top"><InlineCode>Fira Code</InlineCode> with ligatures</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Any Nerd Font variant</td>
          </tr>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Dashboard / Status</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top"><InlineCode>Iosevka</InlineCode></td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top"><InlineCode>Hack</InlineCode>, reluctantly</td>
          </tr>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">README screenshots</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Whichever one makes your TUI look best on a 16" MacBook Pro in a dark room, photographed slightly off-axis</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">—</td>
          </tr>
        </tbody>
      </table>

      <Callout type="deprecated" label="Deprecated">
        <strong>Proportional fonts in terminal emulators.</strong> Some terminal emulators now support variable-width fonts. This is technically possible in the same way that it is technically possible to eat soup with a fork. We ask that you do not.
      </Callout>

      <h3 className="font-display text-[21px] font-semibold mt-9 mb-3">Nerd Fonts &amp; Iconography</h3>
      <p className="mb-4">
        Nerd Font glyphs allow you to display icons, powerline symbols, and other visual flourishes within the character grid. Use them to convey meaning at a glance — or, more commonly, to render a row of inscrutable symbols in your status bar that you will explain to no one.
      </p>
      <p className="mb-4">
        The user should never need to install a custom font to use your application. The user will always need to install a custom font to use your application. Include a <InlineCode>README</InlineCode> section titled "Why does everything look like rectangles?" and link to <InlineCode>nerdfonts.com</InlineCode>. This is the way.
      </p>

      {/* Color */}
      <h2 id="color" className="font-display text-[28px] font-semibold mt-14 mb-4 tracking-[-0.2px] pt-6 border-t border-border reveal">Color</h2>

      <h3 className="font-display text-[21px] font-semibold mt-9 mb-3">The 256-Color Palette</h3>
      <p className="mb-4">
        The modern terminal supports 256 colors. Let that sink in. Two hundred and fifty-six. Where the Retina display offers you sixteen million, the terminal gives you exactly enough to create a gradient that is, objectively, mid — but in context feels like the Sistine Chapel ceiling.
      </p>
      <p className="mb-4">
        Use color with intention. A carefully chosen <InlineCode>fg: 114</InlineCode> (a muted seafoam) communicates calm professionalism. An accidental <InlineCode>fg: 196</InlineCode> (pure red) communicates that your CI pipeline has opinions about your last commit. These are different experiences and should be designed accordingly.
      </p>

      <div className="flex flex-wrap gap-1 my-4 reveal">
        {["#000", "#800000", "#008000", "#808000", "#000080", "#800080", "#008080", "#c0c0c0", "#808080", "#ff0000", "#00ff00", "#ffff00", "#0000ff", "#ff00ff", "#00ffff", "#fff"].map(color => (
          <span key={color} className="color-swatch w-6 h-6 rounded-md shadow-sm border border-black/10 cursor-pointer hover:scale-110 transition-transform" style={{ background: color }} data-hex={color}></span>
        ))}
      </div>
      <p className="text-[13px] text-text-tertiary -mt-2 mb-4">
        Figure 1. The base 16 ANSI colors. Your user has remapped all of them. The green is now pink. You were not consulted.
      </p>

      <Callout type="standard" label="Note">
        True color (24-bit) is now supported by most modern terminal emulators. Resist the urge. The fact that you <em>can</em> render a photorealistic sunset in your todo-list application does not mean you <em>should</em>. TIG-compliant applications should use no more than 12 colors total. Eight, if you want to be taken seriously on Hacker News.
      </Callout>

      <h3 className="font-display text-[21px] font-semibold mt-9 mb-3">Dark Mode</h3>
      <p className="mb-4">
        All TUI applications are dark mode. There is no light mode. If a user has configured their terminal with a white background, that is between them and God, and your application should make no attempt to accommodate their choices.
      </p>

      {/* Layout & Composition */}
      <h2 id="layout" className="font-display text-[28px] font-semibold mt-14 mb-4 tracking-[-0.2px] pt-6 border-t border-border reveal">Layout &amp; Composition</h2>

      <h3 className="font-display text-[21px] font-semibold mt-9 mb-3">The Sacred Grid</h3>
      <p className="mb-4">
        Every terminal interface is composed on a grid of fixed-width cells. This grid is your canvas, your constraint, and — when the user resizes their terminal mid-render — your enemy. Respect it. All elements must align to cell boundaries. Sub-cell positioning is not possible, has never been possible, and the fact that you briefly considered it means you should take a walk.
      </p>

      <h3 className="font-display text-[21px] font-semibold mt-9 mb-3">Pixel-Perfect Layout: A Complete Example</h3>
      <p className="mb-4">
        The following example demonstrates a TIG-compliant dashboard layout, rendered at the recommended minimum width of 80 columns. Note the precise alignment of borders, the considered use of whitespace, and the harmonious relationship between the sidebar navigation and content area.
      </p>

      <TerminalWindow 
        title="cloudctl — 80×24" 
        dimensions="80 × 24" 
        badge="correct" 
        badgeLabel="✓ Correct" 
        badgeText="Terminal: 80×24 — The intended experience"
      >
<TDim>┌──────────────────────────────────────────────────────────────────────────────┐</TDim>{"\n"}
<TDim>│</TDim> <TBlue bold>☁  CloudCtl</TBlue>                              <TDim>v2.4.1</TDim>    <TGreen>● Connected</TGreen>    <TDim>12:04 PM</TDim> <TDim>│</TDim>{"\n"}
<TDim>├──────────────┬───────────────────────────────────────────────────────────────┤</TDim>{"\n"}
<TDim>│</TDim> <TMauve>▸ Dashboard</TMauve>  <TDim>│</TDim>  <TBold>Cluster Overview</TBold>                                              <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Services   <TDim>│</TDim>                                                              <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Pods       <TDim>│</TDim>  <TGreen>Nodes:</TGreen>   <TBold>3/3</TBold> healthy         <TGreen>████████████████</TGreen> <TBold>100%</TBold>  <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Nodes      <TDim>│</TDim>  <TYellow>Pods:</TYellow>   <TBold>42/50</TBold> running        <TGreen>█████████████</TGreen><TYellow>███</TYellow> <TBold> 84%</TBold>  <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Config     <TDim>│</TDim>  <TBlue>Memory:</TBlue> <TBold>12.4/16</TBold> GB           <TGreen>████████████</TGreen><TDim>████</TDim> <TBold> 78%</TBold>  <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Logs       <TDim>│</TDim>  <TRed>CPU:</TRed>    <TBold>67%</TBold> avg              <TGreen>████████████</TGreen><TDim>████</TDim> <TBold> 67%</TBold>  <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>                                                              <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>  <TDim>─── Recent Events ───────────────────────────────</TDim>              <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>  <TGreen>12:03</TGreen>  Pod <TBlue>web-frontend-7d4b</TBlue> scaled to 3 replicas       <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>  <TGreen>12:01</TGreen>  Deployment <TBlue>api-v2</TBlue> rollout complete              <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>  <TYellow>11:58</TYellow>  Node <TYellow>worker-02</TYellow> memory pressure warning         <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>  <TGreen>11:55</TGreen>  ConfigMap <TBlue>nginx-conf</TBlue> updated                    <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>                                                              <TDim>│</TDim>{"\n"}
<TDim>├──────────────┴───────────────────────────────────────────────────────────────┤</TDim>{"\n"}
<TDim>│</TDim> <TDim>? Help  q Quit  / Search  ↑↓ Navigate  ⏎ Select  r Refresh              </TDim> <TDim>│</TDim>{"\n"}
<TDim>└──────────────────────────────────────────────────────────────────────────────┘</TDim>
      </TerminalWindow>

      <p className="mb-4">
        Beautiful. Every box-drawing character aligns. The progress bars terminate precisely at the right border. The status line breathes. You could frame this. Some people have.
      </p>
      <p className="mb-4">
        Now observe what happens when the user exercises their <em>fundamental human right</em> to make the terminal three columns narrower:
      </p>

      <TerminalWindow 
        title="cloudctl — 77×24" 
        dimensions="77 × 24" 
        badge="incorrect" 
        badgeLabel="✗ Incorrect" 
        badgeText='Terminal: 77×24 — The user resized the window "a tiny bit"'
      >
<TDim>┌──────────────────────────────────────────────────────────────────────────────┐</TDim>{"\n"}
<TDim>│</TDim> <TBlue bold>☁  CloudCtl</TBlue>                              <TDim>v2.4.1</TDim>    <TGreen>● Connected</TGreen>    <TDim>12:04</TDim>{"\n"}
<TDim>PM</TDim> <TDim>│</TDim>{"\n"}
<TDim>├──────────────┬────────────────────────────────────────────────────────────</TDim>{"\n"}
<TDim>───┤</TDim>{"\n"}
<TDim>│</TDim> <TMauve>▸ Dashboard</TMauve>  <TDim>│</TDim>  <TBold>Cluster Overview</TBold>                                           <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Services   <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Pods       <TDim>│</TDim>  <TGreen>Nodes:</TGreen>   <TBold>3/3</TBold> healthy         <TGreen>████████████████</TGreen> <TBold>100%</TBold>{"\n"}
<TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Nodes      <TDim>│</TDim>  <TYellow>Pods:</TYellow>   <TBold>42/50</TBold> running        <TGreen>█████████████</TGreen><TYellow>███</TYellow> <TBold> 84</TBold>{"\n"}
<TRed>%  │</TRed>{"\n"}
<TDim>│</TDim>   Config     <TDim>│</TDim>  <TBlue>Memory:</TBlue> <TBold>12.4/16</TBold> GB           <TGreen>████████████</TGreen><TDim>████</TDim> <TBold> 7</TBold>{"\n"}
<TRed>8%  │</TRed>{"\n"}
<TDim>│</TDim>   Logs       <TDim>│</TDim>  <TRed>CPU:</TRed>    <TBold>67%</TBold> avg              <TGreen>████████████</TGreen><TDim>████</TDim> <TBold> 6</TBold>{"\n"}
<TRed>7%  │</TRed>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>  <TDim>─── Recent Events ─────────────────────────────</TDim>{"\n"}
<TDim>──              │</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>  <TGreen>12:03</TGreen>  Pod <TBlue>web-frontend-7d4b</TBlue> scaled to 3 replic{"\n"}
<TDim>as       │</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>  <TGreen>12:01</TGreen>  Deployment <TBlue>api-v2</TBlue> rollout complete{"\n"}
              <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>  <TYellow>11:58</TYellow>  Node <TYellow>worker-02</TYellow> memory pressure warni{"\n"}
<TDim>ng         │</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>  <TGreen>11:55</TGreen>  ConfigMap <TBlue>nginx-conf</TBlue> updated{"\n"}
                    <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>{"\n"}
<TDim>├──────────────┴────────────────────────────────────────────────────────────</TDim>{"\n"}
<TDim>───┤</TDim>{"\n"}
<TDim>│</TDim> <TDim>? Help  q Quit  / Search  ↑↓ Navigate  ⏎ Select  r Refresh</TDim>{"\n"}
   <TDim>│</TDim>{"\n"}
<TDim>└──────────────────────────────────────────────────────────────────────────────┘</TDim>
      </TerminalWindow>

      <p className="mb-4">
        This is what the industry refers to as a "character-level reflow event." The user will refer to it as "broken." Both are correct. Note how <InlineCode>PM</InlineCode> has emigrated to its own line. Note how the percentage signs have developed a sense of independence. The bottom border, a stoic survivor, remains at its original 80-column width, now extending boldly into the void.
      </p>

      {/* Borders & Box Drawing */}
      <h2 id="borders" className="font-display text-[28px] font-semibold mt-14 mb-4 tracking-[-0.2px] pt-6 border-t border-border reveal">Borders &amp; Box Drawing</h2>

      <h3 className="font-display text-[21px] font-semibold mt-9 mb-3">Character Selection</h3>
      <p className="mb-4">
        The Unicode box-drawing block (<InlineCode>U+2500</InlineCode>–<InlineCode>U+257F</InlineCode>) provides 128 characters for constructing borders. You will use approximately six of them. The remaining 122 exist to populate blog posts titled "You Won't Believe What Unicode Can Do."
      </p>

      <table className="w-full border-collapse my-5 text-[14px] text-left reveal">
        <thead>
          <tr>
            <th className="font-semibold px-3.5 py-2.5 border-b-2 border-border text-text-secondary text-[12px] uppercase tracking-[0.3px]">Style</th>
            <th className="font-semibold px-3.5 py-2.5 border-b-2 border-border text-text-secondary text-[12px] uppercase tracking-[0.3px]">Characters</th>
            <th className="font-semibold px-3.5 py-2.5 border-b-2 border-border text-text-secondary text-[12px] uppercase tracking-[0.3px]">Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50">Light</td>
            <td className="px-3.5 py-2.5 border-b border-border/50"><InlineCode>┌ ─ ┐ │ └ ┘</InlineCode></td>
            <td className="px-3.5 py-2.5 border-b border-border/50">Standard containers, the backbone of civilization</td>
          </tr>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50">Heavy</td>
            <td className="px-3.5 py-2.5 border-b border-border/50"><InlineCode>┏ ━ ┓ ┃ ┗ ┛</InlineCode></td>
            <td className="px-3.5 py-2.5 border-b border-border/50">Focus states, active selections, "look at this one"</td>
          </tr>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50">Double</td>
            <td className="px-3.5 py-2.5 border-b border-border/50"><InlineCode>╔ ═ ╗ ║ ╚ ╝</InlineCode></td>
            <td className="px-3.5 py-2.5 border-b border-border/50">Dialog boxes, modal confirmations, "are you <em>sure</em>"</td>
          </tr>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50">Rounded</td>
            <td className="px-3.5 py-2.5 border-b border-border/50"><InlineCode>╭ ─ ╮ │ ╰ ╯</InlineCode></td>
            <td className="px-3.5 py-2.5 border-b border-border/50">A gentler container. Use when your TUI is having a soft day.</td>
          </tr>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50">ASCII fallback</td>
            <td className="px-3.5 py-2.5 border-b border-border/50"><InlineCode>+ - + | + +</InlineCode></td>
            <td className="px-3.5 py-2.5 border-b border-border/50">SSH into a machine running <InlineCode>screen</InlineCode> inside <InlineCode>tmux</InlineCode> inside <InlineCode>mosh</InlineCode>. God help you.</td>
          </tr>
        </tbody>
      </table>

      {/* Interaction Model */}
      <h2 id="interaction" className="font-display text-[28px] font-semibold mt-14 mb-4 tracking-[-0.2px] pt-6 border-t border-border reveal">Interaction Model</h2>

      <h3 className="font-display text-[21px] font-semibold mt-9 mb-3">Keyboard-First Navigation</h3>
      <p className="mb-4">
        TIG-compliant applications must support a minimum of three navigation paradigms simultaneously, ensuring that no single user can remember all of them:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1 text-[15px]">
        <li><strong>Arrow keys</strong> — for users who are new, cautious, or correct</li>
        <li><strong>Vim bindings</strong> (<InlineCode>hjkl</InlineCode>) — for users who have opinions about text editors</li>
        <li><strong>Emacs bindings</strong> (<InlineCode>C-n</InlineCode>, <InlineCode>C-p</InlineCode>) — for users who also have opinions about text editors but different ones</li>
      </ul>

      <Callout type="standard" label="Design Principle">
        The ideal TUI keybinding scheme should feel instantly familiar to users of vim, emacs, and readline, while being subtly incompatible with all three.
      </Callout>

      {/* Dynamic Resizing */}
      <h2 id="resizing" className="font-display text-[28px] font-semibold mt-14 mb-4 tracking-[-0.2px] pt-6 border-t border-border reveal">Dynamic Resizing</h2>

      <h3 className="font-display text-[21px] font-semibold mt-9 mb-3">The SIGWINCH Promise</h3>
      <p className="mb-4">
        When the user resizes their terminal, the operating system delivers a <InlineCode>SIGWINCH</InlineCode> signal to your process. This is the system's way of saying: "something has changed, and it is now your problem."
      </p>
      <p className="mb-4">
        A TIG-compliant application must handle <InlineCode>SIGWINCH</InlineCode> gracefully. "Gracefully" means: re-query the terminal dimensions, recalculate your layout, re-render every visible element, and do all of this before the user's eye completes a single saccade. You have approximately 16 milliseconds. The user's expectations are, as always, unreasonable.
      </p>

      <TerminalWindow 
        title="cloudctl — 60×24" 
        dimensions="60 × 24" 
        badge="catastrophic" 
        badgeLabel="☠ Catastrophic" 
        badgeText="Terminal: 60×24 — The layout has given up"
      >
<TDim>┌──────────────────────────────────────────────────────────────────────────────┐</TDim>{"\n"}
<TDim>│</TDim> <TBlue bold>☁  CloudCtl</TBlue>                              <TDim>v2.4.1</TDim>    <TGreen>●</TGreen>{"\n"}
<TGreen>Connected</TGreen>    <TDim>12:04 PM</TDim> <TDim>│</TDim>{"\n"}
<TDim>├──────────────┬──────────────────────────────────────────────</TDim>{"\n"}
<TDim>─────────────────┤</TDim>{"\n"}
<TDim>│</TDim> <TMauve>▸ Dashboard</TMauve>  <TDim>│</TDim>  <TBold>Cluster Overview</TBold>                          <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Services   <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Pods       <TDim>│</TDim>  <TGreen>Nodes:</TGreen>   <TBold>3/3</TBold> healthy         <TGreen>████████</TGreen>{"\n"}
<TGreen>████████</TGreen> <TBold>100%</TBold>  <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Nodes      <TDim>│</TDim>  <TYellow>Pods:</TYellow>   <TBold>42/50</TBold> running        <TGreen>█████████</TGreen>{"\n"}
<TGreen>████</TGreen><TYellow>███</TYellow> <TBold> 84%</TBold>  <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Config     <TDim>│</TDim>  <TBlue>Memory:</TBlue> <TBold>12.4/16</TBold> GB           <TGreen>████████</TGreen>{"\n"}
<TGreen>████</TGreen><TDim>████</TDim> <TBold> 78%</TBold>  <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Logs       <TDim>│</TDim>  <TRed>CPU:</TRed>    <TBold>67%</TBold> avg              <TGreen>████████</TGreen>{"\n"}
<TGreen>████</TGreen><TDim>████</TDim> <TBold> 67%</TBold>  <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>{"\n"}
<TDim>├──────────────┴──────────────────────────────────────────────</TDim>{"\n"}
<TDim>─────────────────┤</TDim>{"\n"}
<TDim>│</TDim> <TDim>? Help  q Quit  / Search  ↑↓ Navigate  ⏎ Select  r</TDim>{"\n"}
<TDim>Refresh              │</TDim>{"\n"}
<TDim>└──────────────────────────────────────────────────────────────────────────────┘</TDim>
      </TerminalWindow>

      <p className="mb-4">
        The application has entered what we call the "responsive collapse" state. Note: the borders have not resized. They <em>never</em> resize. The borders were rendered once, at 80 columns, and they will stay at 80 columns until heat death, system reboot, or a particularly aggressive <InlineCode>kill -9</InlineCode>.
      </p>

      <h3 className="font-display text-[21px] font-semibold mt-9 mb-3">Minimum Viable Terminal</h3>
      <p className="mb-4">
        Every TIG application must define a minimum supported terminal size. The recommended minimum is 80×24, because that is the size of a VT100, and we are nothing if not reverent of a terminal introduced in 1978 by a company that no longer exists.
      </p>
      <p className="mb-4">
        If the user's terminal falls below the minimum size, display a polite message asking them to resize. This message must itself be shorter than the minimum width. If the message is too long to display, you have entered a recursive failure state.
      </p>

      <TerminalWindow 
        title="cloudctl — 40×10" 
        dimensions="40 × 10" 
        badge="catastrophic" 
        badgeLabel="☠ Catastrophic" 
        badgeText="Terminal: 40×10 — Below minimum viable terminal"
      >
<TRed bold>╔════════════════════════════════════╗</TRed>{"\n"}
<TRed bold>║</TRed>  <TYellow>Terminal too small.</TYellow>              <TRed bold>║</TRed>{"\n"}
<TRed bold>║</TRed>                                    <TRed bold>║</TRed>{"\n"}
<TRed bold>║</TRed>  <TDim>Required: 80×24</TDim>                 <TRed bold>║</TRed>{"\n"}
<TRed bold>║</TRed>  <TDim>Current:  40×10</TDim>                 <TRed bold>║</TRed>{"\n"}
<TRed bold>║</TRed>                                    <TRed bold>║</TRed>{"\n"}
<TRed bold>║</TRed>  <TDim>Please resize your terminal.</TDim>     <TRed bold>║</TRed>{"\n"}
<TRed bold>║</TRed>  <TDim>We'll wait.</TDim>                     <TRed bold>║</TRed>{"\n"}
<TRed bold>║</TRed>  <TDim>We have nowhere else to be.</TDim>      <TRed bold>║</TRed>{"\n"}
<TRed bold>╚════════════════════════════════════╝</TRed>
      </TerminalWindow>

      <p className="mb-4">
        This is correct behavior.
      </p>

      {/* Progress Indicators */}
      <h2 id="progress" className="font-display text-[28px] font-semibold mt-14 mb-4 tracking-[-0.2px] pt-6 border-t border-border reveal">Progress Indicators</h2>

      <h3 className="font-display text-[21px] font-semibold mt-9 mb-3">The Art of the Progress Bar</h3>
      <p className="mb-4">
        A progress bar in a terminal is constructed from block characters of varying fullness: <InlineCode>█ ▓ ▒ ░</InlineCode>. This gives you four levels of visual density with which to communicate progress, or — in practice — three more than you need, because everyone just uses <InlineCode>█</InlineCode> and a space character.
      </p>

      <TerminalWindow 
        title="npm-install.sh" 
        dimensions="80 × 12" 
        badge="correct" 
        badgeLabel="✓ Correct" 
        badgeText="Progress: 80 columns — Everything lines up"
      >
<TBlue bold>Installing dependencies...</TBlue>{"\n"}
{"\n"}
  <TGreen>react</TGreen>          <TGreen>████████████████████████████████████████████</TGreen><TDim>█████</TDim>  <TBold>89%</TBold>{"\n"}
  <TYellow>typescript</TYellow>    <TGreen>█████████████████████████████████████████</TGreen><TDim>████████</TDim>  <TBold>76%</TBold>{"\n"}
  <TMauve>webpack</TMauve>       <TGreen>████████████████████████</TGreen><TDim>████████████████████████</TDim>  <TBold>50%</TBold>{"\n"}
  <TRed>node-sass</TRed>     <TGreen>████████</TGreen><TDim>████████████████████████████████████████</TDim>  <TBold>17%</TBold>{"\n"}
{"\n"}
<TDim>  Elapsed: 2m 34s    Remaining: ∞    ETA: never</TDim>
      </TerminalWindow>

      <p className="mb-4">
        Now observe the same progress display at 65 columns:
      </p>

      <TerminalWindow 
        title="npm-install.sh" 
        dimensions="65 × 12" 
        badge="incorrect" 
        badgeLabel="✗ Incorrect" 
        badgeText="Progress: 65 columns — The bars have been truncated by reality"
      >
<TBlue bold>Installing dependencies...</TBlue>{"\n"}
{"\n"}
  <TGreen>react</TGreen>          <TGreen>██████████████████████████████</TGreen><TDim>█████</TDim>  <TBold>89</TBold>{"\n"}
<TBold>%</TBold>{"\n"}
  <TYellow>typescript</TYellow>    <TGreen>███████████████████████████</TGreen><TDim>████████</TDim>  <TBold>7</TBold>{"\n"}
<TBold>6%</TBold>{"\n"}
  <TMauve>webpack</TMauve>       <TGreen>████████████████</TGreen><TDim>███████████████████</TDim>  <TBold>50%</TBold>{"\n"}
  <TRed>node-sass</TRed>     <TGreen>█████</TGreen><TDim>██████████████████████████████</TDim>  <TBold>17%</TBold>{"\n"}
{"\n"}
<TDim>  Elapsed: 2m 34s    Remaining: ∞    ETA: never</TDim>
      </TerminalWindow>

      <p className="mb-4">
        The percentage signs have been separated from their numbers. <InlineCode>react</InlineCode> is reported as <InlineCode>89</InlineCode>-newline-<InlineCode>%</InlineCode>. TypeScript is <InlineCode>7</InlineCode>-newline-<InlineCode>6%</InlineCode>. Somewhere, in a parallel universe, these are valid numbers. In this universe, your user has filed a bug report titled "my install is 7-6% complete???"
      </p>

      {/* Modal Dialogs */}
      <h2 id="modals" className="font-display text-[28px] font-semibold mt-14 mb-4 tracking-[-0.2px] pt-6 border-t border-border reveal">Modal Dialogs</h2>

      <p className="mb-4">
        A modal dialog in a TUI is achieved by rendering a second box on top of the first box. This is the terminal equivalent of a <InlineCode>UIAlertController</InlineCode>, if the <InlineCode>UIAlertController</InlineCode> was drawn by hand using typographic characters and could be defeated by resizing the window.
      </p>

      <TerminalWindow 
        title="cloudctl — 80×24" 
        dimensions="80 × 24" 
        badge="correct" 
        badgeLabel="✓ Correct" 
        badgeText="Modal: Centered, properly layered"
      >
<TDim>┌──────────────────────────────────────────────────────────────────────────────┐</TDim>{"\n"}
<TDim>│</TDim> <TBlue bold>☁  CloudCtl</TBlue>                              <TDim>v2.4.1</TDim>    <TGreen>● Connected</TGreen>    <TDim>12:04 PM</TDim> <TDim>│</TDim>{"\n"}
<TDim>├──────────────┬───────────────────────────────────────────────────────────────┤</TDim>{"\n"}
<TDim>│</TDim> <TMauve>▸ Dashboard</TMauve>  <TDim>│</TDim>  <TBold>Cluster Overview</TBold>                                              <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Services   <TDim>│</TDim>                                                              <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Pods       <TDim>│</TDim>     <TRed bold>╔══════════════════════════════════════════╗</TRed>      <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Nodes      <TDim>│</TDim>     <TRed bold>║</TRed>                                          <TRed bold>║</TRed>      <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Config     <TDim>│</TDim>     <TRed bold>║</TRed>  <TRed bold>⚠  Delete Pod?</TRed>                       <TRed bold>║</TRed>      <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Logs       <TDim>│</TDim>     <TRed bold>║</TRed>                                          <TRed bold>║</TRed>      <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>     <TRed bold>║</TRed>  <TDim>This action cannot be undone.</TDim>         <TRed bold>║</TRed>      <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>     <TRed bold>║</TRed>  <TDim>Pod: web-frontend-7d4b</TDim>               <TRed bold>║</TRed>      <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>     <TRed bold>║</TRed>                                          <TRed bold>║</TRed>      <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>     <TRed bold>║</TRed>  <TDim>[</TDim><TGreen bold> Yes, delete </TGreen><TDim>]</TDim>  <TDim>[</TDim><TDim> Cancel </TDim><TDim>]</TDim>        <TRed bold>║</TRed>      <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>     <TRed bold>║</TRed>                                          <TRed bold>║</TRed>      <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>     <TRed bold>╚══════════════════════════════════════════╝</TRed>      <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>                                                              <TDim>│</TDim>{"\n"}
<TDim>├──────────────┴───────────────────────────────────────────────────────────────┤</TDim>{"\n"}
<TDim>│</TDim> <TDim>⏎ Confirm  Esc Cancel                                                     </TDim> <TDim>│</TDim>{"\n"}
<TDim>└──────────────────────────────────────────────────────────────────────────────┘</TDim>
      </TerminalWindow>

      <p className="mb-4">
        Elegant. The dialog floats above the interface like a perfectly centered thought. The double-line border communicates gravity. The user understands: this moment matters. Now, the same dialog at 95 columns:
      </p>

      <TerminalWindow 
        title="cloudctl — 95×24" 
        dimensions="95 × 24" 
        badge="incorrect" 
        badgeLabel="✗ Incorrect" 
        badgeText="Modal: The container grew. The dialog didn't."
      >
<TDim>┌────────────────────────────────────────────────────────────────────────────────────────────┐</TDim>{"\n"}
<TDim>│</TDim> <TBlue bold>☁  CloudCtl</TBlue>                              <TDim>v2.4.1</TDim>    <TGreen>● Connected</TGreen>    <TDim>12:04 PM</TDim>                <TDim>│</TDim>{"\n"}
<TDim>├──────────────┬─────────────────────────────────────────────────────────────────────────────┤</TDim>{"\n"}
<TDim>│</TDim> <TMauve>▸ Dashboard</TMauve>  <TDim>│</TDim>  <TBold>Cluster Overview</TBold>                                                             <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Services   <TDim>│</TDim>                                                                             <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Pods       <TDim>│</TDim>     <TRed bold>╔══════════════════════════════════════════╗</TRed>                     <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Nodes      <TDim>│</TDim>     <TRed bold>║</TRed>                                          <TRed bold>║</TRed>                     <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Config     <TDim>│</TDim>     <TRed bold>║</TRed>  <TRed bold>⚠  Delete Pod?</TRed>                       <TRed bold>║</TRed>                     <TDim>│</TDim>{"\n"}
<TDim>│</TDim>   Logs       <TDim>│</TDim>     <TRed bold>║</TRed>                                          <TRed bold>║</TRed>                     <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>     <TRed bold>║</TRed>  <TDim>This action cannot be undone.</TDim>         <TRed bold>║</TRed>                     <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>     <TRed bold>║</TRed>  <TDim>Pod: web-frontend-7d4b</TDim>               <TRed bold>║</TRed>                     <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>     <TRed bold>║</TRed>                                          <TRed bold>║</TRed>                     <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>     <TRed bold>║</TRed>  <TDim>[</TDim><TGreen bold> Yes, delete </TGreen><TDim>]</TDim>  <TDim>[</TDim><TDim> Cancel </TDim><TDim>]</TDim>        <TRed bold>║</TRed>                     <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>     <TRed bold>║</TRed>                                          <TRed bold>║</TRed>                     <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>     <TRed bold>╚══════════════════════════════════════════╝</TRed>                     <TDim>│</TDim>{"\n"}
<TDim>│</TDim>              <TDim>│</TDim>                                                                             <TDim>│</TDim>{"\n"}
<TDim>├──────────────┴─────────────────────────────────────────────────────────────────────────────┤</TDim>{"\n"}
<TDim>│</TDim> <TDim>⏎ Confirm  Esc Cancel                                                                    </TDim> <TDim>│</TDim>{"\n"}
<TDim>└────────────────────────────────────────────────────────────────────────────────────────────┘</TDim>
      </TerminalWindow>

      <p className="mb-4">
        The outer container has dutifully expanded to accommodate the new width. The inner dialog has not. It sits there, pinned to the left, like a painting that was centered above the fireplace before someone extended the mantle. The asymmetry is not a bug — it is a <em>conversation</em> between your layout engine and the void.
      </p>

      {/* Known Behaviors */}
      <h2 id="known-issues" className="font-display text-[28px] font-semibold mt-14 mb-4 tracking-[-0.2px] pt-6 border-t border-border reveal">Known Behaviors</h2>

      <p className="mb-4">
        The TIG recognizes certain persistent behaviors that exist across all terminal applications. These are not bugs. They are <em>characteristics</em>.
      </p>

      <table className="w-full border-collapse my-5 text-[14px] text-left reveal">
        <thead>
          <tr>
            <th className="font-semibold px-3.5 py-2.5 border-b-2 border-border text-text-secondary text-[12px] uppercase tracking-[0.3px]">Behavior</th>
            <th className="font-semibold px-3.5 py-2.5 border-b-2 border-border text-text-secondary text-[12px] uppercase tracking-[0.3px]">Classification</th>
            <th className="font-semibold px-3.5 py-2.5 border-b-2 border-border text-text-secondary text-[12px] uppercase tracking-[0.3px]">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Unicode characters display as <InlineCode>?</InlineCode> on some systems</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Font configuration issue</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Permanent</td>
          </tr>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Colors look different on every terminal</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Philosophical</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Eternal</td>
          </tr>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Scrollback buffer contains rendering artifacts</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Expected</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Won't fix</td>
          </tr>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Application looks different over SSH</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Networking is not a design tool</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">By design</td>
          </tr>
          <tr>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top"><InlineCode>tmux</InlineCode> renders your app differently</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Multiplexer interference</td>
            <td className="px-3.5 py-2.5 border-b border-border/50 align-top">Blame tmux</td>
          </tr>
        </tbody>
      </table>

      {/* Deprecated Paradigms */}
      <h2 id="deprecated" className="font-display text-[28px] font-semibold mt-14 mb-4 tracking-[-0.2px] pt-6 border-t border-border reveal">Deprecated Paradigms</h2>

      <Callout type="deprecated" label="Deprecated in TIG 2.0">
        <strong>Mouse support.</strong> Click handling was introduced as an experimental feature in TIG 1.2. It has been deprecated because it works. Specifically, it works <em>just well enough</em> that users expect it to work everywhere, including in nested scroll regions, which it does not. The resulting support burden has been classified as "unsustainable" and "genuinely haunting."
      </Callout>

      <Callout type="deprecated" label="Deprecated">
        <strong>The <InlineCode>clear</InlineCode> command.</strong> Calling <InlineCode>clear</InlineCode> to reset the screen is the TUI equivalent of flipping the table when you lose at chess. Use the alternate screen buffer (<InlineCode>\e[?1049h</InlineCode>) like a civilized person.
      </Callout>

      <Callout type="deprecated" label="Removed">
        <strong>Asking the user their terminal width.</strong> Your application must detect the terminal width. Displaying a prompt that reads <InlineCode>"How wide is your terminal? [80]:"</InlineCode> is an admission of defeat and will result in your application being removed from the Terminal App Store and your commit history being audited.
      </Callout>

      {/* Footer philosophy */}
      <div className="font-display text-[22px] font-light leading-[1.5] text-text-secondary mt-16 pl-5 border-l-2 border-border italic">
        "We believe the terminal is not a step backward. It is a step <em>inward</em>. Toward the machine. Toward the craft. Toward a world where the only thing between the user and their data is a monospaced font and the unwavering belief that <InlineCode>U+2502</InlineCode> is all you will ever need."
        <br /><br />
        <span className="text-[16px]">— Terminal Interface Guidelines, 80 Pixel Dr, 2026</span>
      </div>

      {/* Footer info */}
      <div className="text-[12px] text-text-tertiary mt-12 pt-4 border-t border-border leading-[1.6]">
        <p>
          <strong>Terminal Interface Guidelines</strong> · Revision 2.0.1 · March 2026<br />
          © 2026 Pear Inc. All rights reserved. 80 Pixel Dr, Cupertino-ish, CA. Rendered in a terminal at 80 columns. Do not resize this page.
        </p>
        <p className="mt-2 italic">
          Filed under: Documentation › Design › Things We Made At 2 AM
        </p>
      </div>

    </div>
  );
}
