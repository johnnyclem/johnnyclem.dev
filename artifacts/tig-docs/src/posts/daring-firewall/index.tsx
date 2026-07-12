import {
  BlogHeader,
  BlogWrap,
  BlogPost,
  BP,
  BlogCode,
  BlogQuote,
  BlogFootnote,
  BlogDivider,
  BlogSponsor,
  BlogLink,
  BlogFooter,
} from "@/components/docs/BlogUI";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function DaringFirewallPost() {
  useScrollReveal();

  return (
    <div id="overview" style={{ background: "#f9f9f7" }} className="-mx-6 lg:-mx-12 -mt-10 lg:-mt-12 px-6 lg:px-12 pt-0 -mb-12 pb-20">
      <BlogHeader />
      <BlogWrap>

        <BlogPost date="Monday, 21 March 2026" title="Ubuntu 26.04's System Tray Clock Now Uses a Middle Dot Instead of a Colon" linked id="post-middledot">
          <BP>Canonical, in their infinite wisdom, has replaced the colon between hours and minutes in the GNOME system tray clock with a middle dot (·). So where you once saw <BlogCode>2:47 PM</BlogCode>, you now see <BlogCode>2·47 PM</BlogCode>.</BP>
          <BP>I have been staring at this for three days.</BP>
          <BP>A colon is not a design choice. A colon, in the context of time display, is a <strong style={{ color: "#333" }}>covenant</strong>. It is the single most universally understood glyph-meaning pair in computing. <BlogCode>HH:MM</BlogCode>. Every digital clock since 1972 has used a colon. Your microwave uses a colon. The international space station uses a colon. The colon <em>is</em> time, rendered typographically.</BP>
          <BP>And someone at Canonical looked at that and said, "What if we didn't."</BP>
          <BP>There's a <BlogLink>merge request</BlogLink> on the GNOME GitLab where the justification is — and I'm quoting literally — "the middle dot feels more modern and reduces visual clutter." The colon is two dots. The middle dot is one dot. You have saved one dot. <em>One dot.</em> That is your modernity. That is the full extent of the innovation. The colon has been cut in half and everyone involved considers this progress.</BP>
          <BP>I am told I should care less about this. I am told that there are more important things happening in the world. Both of these statements are true, and neither of them makes the middle dot acceptable.</BP>
          <BlogFootnote num={1}>I recognize that I am a person who invented a text formatting syntax that is now used by approximately every LLM on earth, and that I am choosing to spend my Tuesday on a punctuation mark in a taskbar. I am at peace with this.</BlogFootnote>
        </BlogPost>

        <BlogDivider />

        <BlogSponsor label="★ This Week's Sponsor" title="Buttonsmith — Accessible UI Components That Ship">
          Buttonsmith gives your team production-ready, WCAG 2.2 AA-compliant components out of the box. No config, no theming arguments, no three-hour PRs about border-radius. Just buttons that work. <BlogLink>Try it free →</BlogLink>
        </BlogSponsor>

        <BlogPost date="Sunday, 20 March 2026" title="On the Spacing of Ubuntu's Login Screen Password Dots" id="post-dots">
          <BP>I've been running Ubuntu 26.04 on a ThinkPad for the past two weeks — partly out of curiosity, partly as penance for a lost bet<sup style={{ fontSize: 8, color: "#999" }}>1</sup> — and I want to talk about the login screen.</BP>
          <BP>Not the login screen broadly. The password dots. Specifically, the spacing between the password dots.</BP>
          <BP>On macOS, the password dots are spaced at what I'd estimate is 10 points center-to-center, with each dot being approximately 8 points in diameter. This produces a rhythm that is dense enough to feel secure but open enough that each dot reads as an individual character. It is a small masterpiece of information density. You can <em>feel</em> your password being entered, dot by dot, like a heartbeat.</BP>
          <BP>On Ubuntu 26.04, the dots are spaced at roughly 18 pixels center-to-center. Each dot is 6 pixels in diameter. The result is that typing your password feels like morse code transmitted across a vast and indifferent field. The dots do not cohere. They drift. They are lonely dots, separated by chasms of negative space, each one uncertain whether the next will arrive.</BP>
          <BP>I have filed a bug. The bug has been closed as "not a bug." I disagree. I disagree with my entire body.</BP>
          <BlogFootnote num={1}>The bet involved whether I could use a Linux desktop for a full month without writing a blog post about it. I lost on day fourteen. This is that post. I'm not counting the three I wrote before this one.</BlogFootnote>
        </BlogPost>

        <BlogDivider />

        <BlogPost date="Saturday, 19 March 2026" title="The Nautilus File Manager Icon Has Been 1px Off-Center Since 2019" linked id="post-nautilus">
          <BP><BlogLink>Redditor u/pixel_witness</BlogLink> has documented — with screenshots, overlays, and a precision that I frankly admire — that the Nautilus file manager icon in the GNOME Activities bar has been 1 pixel off-center horizontally since GNOME 3.34. That's seven years. Seven years of a file cabinet sitting one pixel to the left of where God intended.</BP>
          <BP>I want to be clear about something: this is not about one pixel. This is about what one pixel <em>represents</em>. One pixel off-center means no one is looking. It means the icon was placed programmatically without visual verification. It means the grid was trusted, and the grid was wrong, and no one checked because no one thought anyone would notice.</BP>
          <BP>Someone noticed. Someone always notices. This is the covenant of shipping software: every pixel is a promise, and a broken promise does not become acceptable simply because it is small.</BP>
          <BP>I once moved a heading in the Markdown spec from <BlogCode>##</BlogCode> to <BlogCode># ##</BlogCode> and received 340 emails. Do not tell me people don't notice.</BP>
        </BlogPost>

        <BlogDivider />

        <BlogPost date="Friday, 18 March 2026" title="Ubuntu's Default Wallpaper and the Aesthetics of Resignation" id="post-wallpaper">
          <BP>Every two years, Canonical releases a new version of Ubuntu with a new default wallpaper. And every two years, that wallpaper is a geometric animal rendered in the brand colors of that release, which are always one of: purple, orange, or "aubergine," a word Canonical uses to describe a color that is purple but would like you to know it went to art school.</BP>
          <BP>Ubuntu 26.04 "Nebular Newt" ships with a wallpaper depicting an abstract newt composed of overlapping translucent polygons in — you guessed it — aubergine. The newt gazes leftward, toward what I can only assume is a future in which someone at Canonical considers using a photograph instead.</BP>
          <BP>Compare this to macOS, where the default wallpaper is a photograph of Sequoia National Park so detailed you can see individual pine needles, and which communicates: <em>your computer is a window to the natural world, and the natural world is beautiful, and you are part of it.</em></BP>
          <BP>Ubuntu's wallpaper communicates: <em>your computer runs Linux, and here is a newt.</em></BP>
          <BP>I don't object to the newt. I object to the <em>resignation</em> that the newt represents. The newt says: "We know you're not here for the aesthetics. You're here because you believe in open source, or because your company's IT department made this choice for you, or because of the bet."<sup style={{ fontSize: 8, color: "#999" }}>1</sup></BP>
          <BP>The newt is not trying to delight you. The newt is trying to not offend you, which is a fundamentally different design goal, and one that produces fundamentally different outcomes, all of them aubergine.</BP>
          <BlogFootnote num={1}>It's always the bet.</BlogFootnote>
        </BlogPost>

        <BlogDivider />

        <BlogPost date="Thursday, 17 March 2026" title={'GNOME\'s "Activities" Hot Corner: A 13-Year Design Mistake That No One Will Acknowledge'} linked id="post-hotcorner">
          <BP>Since GNOME 3.0, released in 2011, moving your mouse to the top-left corner of the screen triggers the Activities overview. This is called a "hot corner." It has been the subject of more configuration debates than any other single UI element in the history of desktop Linux, which is saying something, because desktop Linux is <em>composed entirely</em> of configuration debates.</BP>
          <BP>Here's the thing about the hot corner: it is wrong. Not "wrong for some users" or "wrong in some contexts." It is wrong in the way that a door that opens the wrong way is wrong — technically functional, but in violation of a spatial contract that your body understood before your mind could articulate it.</BP>
          <BP>The top-left corner of a screen is where the <strong style={{ color: "#333" }}>close button</strong> goes. It has been where the close button goes since 1984. The Mac put it there. Windows put it somewhere else, but we don't talk about Windows. The point is: the top-left corner is an exit. It is not an entrance. Making it an entrance is like putting a welcome mat on the fire escape.</BP>
          <BP>I have been told — repeatedly, on forums, in comment threads, in emails that begin with "Actually," — that the hot corner can be disabled. I know it can be disabled. <em>That it needs to be disabled is the problem.</em></BP>
        </BlogPost>

        <BlogDivider />

        <BlogPost date="Wednesday, 16 March 2026" title="The Scrollbar Situation" id="post-scrollbar">
          <BP>I need to talk about GNOME's scrollbars. I have needed to talk about this for several years and have been waiting for the right moment, which is now, because I just lost forty-five minutes of my life trying to grab one with a mouse.</BP>
          <BP>GNOME's default scrollbars are what I would describe as "aspirationally invisible." They appear as a thin, 6-pixel-wide overlay that manifests when you hover near the edge of a scrollable region, lingers for approximately 800 milliseconds, and then vanishes, like a thought you had in the shower that felt important but that you cannot now recall.</BP>
          <BP>The theory is that scrollbars are visual clutter and should be hidden until needed. This theory was originated by people who use trackpads, which have built-in momentum scrolling and two-finger gestures, and which therefore render scrollbars vestigial. These people are not wrong about trackpads. They are wrong about <em>everyone else</em>.</BP>
          <BP>I use a mouse. I am not ashamed of this. A mouse is a precision instrument. A mouse has a scroll wheel, which is adequate for casual navigation, but for <strong style={{ color: "#333" }}>targeted scrolling</strong> — jumping to a specific region of a long document — you need a scrollbar you can <em>grab</em>. And you cannot grab a 6-pixel line that disappears when it senses your intent.</BP>
          <BP>The scrollbar should be visible. The scrollbar should be grabbable. The scrollbar should be <em>there</em>, in the way that a handrail should be there: not because you always need it, but because when you do, its absence is a betrayal.</BP>
          <BlogQuote>"Show me a desktop environment's scrollbars and I will tell you whether that environment respects its users or is performing for a screenshot."</BlogQuote>
          <BP>I will not be elaborating on this quote because I just said it and it speaks for itself.</BP>
          <BlogFootnote num={1}>I am aware that I could install <BlogCode>gnome-tweaks</BlogCode> and enable "always show scrollbars." I am aware of this the way I am aware that I could technically eat soup with a fork if I were sufficiently patient. The existence of a workaround does not excuse the default.</BlogFootnote>
        </BlogPost>

        <BlogDivider />

        <BlogPost date="Monday, 14 March 2026" title={'Canonical CEO: "Ubuntu Desktop Is Better Than Ever"'} linked id="post-shuttleworth">
          <BP>Mark Shuttleworth, in a <BlogLink>blog post</BlogLink> celebrating the upcoming 26.04 release:</BP>
          <BlogQuote>"Ubuntu desktop has never been more polished, more cohesive, or more ready for the mainstream."</BlogQuote>
          <BP>The middle dot says otherwise, Mark.</BP>
        </BlogPost>

        <BlogDivider />

        <BlogPost date="Sunday, 13 March 2026" title="A Brief, Incomplete, and Highly Opinionated History of Things I Have Noticed About Ubuntu That Bother Me, Listed in Decreasing Order of Defensibility" id="post-list">
          <BP>
            1. The font rendering is worse than macOS.<br />
            2. The default monospace font is not the right monospace font.<br />
            3. The system tray icons are not optically aligned.<br />
            4. The dock auto-hide animation is 40ms too fast.<br />
            5. Application windows do not have drop shadows that match the light source implied by the rest of the UI.<br />
            6. Right-clicking on the desktop does nothing, which I understand is a philosophical choice, but philosophy should not leave me staring at a wallpaper I did not choose.<br />
            7. The cursor is fine, but it's not <em>right</em>.<br />
            8. The notification sound is a xylophone hit that conveys neither urgency nor calm but rather the precise energy of a hold music sample that was licensed for $4.<br />
            9. The Settings app has a toggle labeled "Do Not Disturb" and another labeled "Quiet Mode" and I cannot determine the difference, and the documentation says they are "similar but distinct," which is not an explanation, it is a taunt.<br />
            10. The middle dot. The <em>middle dot.</em>
          </BP>
          <BlogFootnote num={1}>I have used Ubuntu for fourteen days and have produced six blog posts about it. At this rate I will have written a book by April. The book will be about the middle dot. It will be formatted in Markdown, which I invented, and which — I want to note — uses a <em>regular period</em> for list items, not a middle dot, because I am a person of principle.</BlogFootnote>
        </BlogPost>

        <BlogDivider />

        <BlogSponsor label="★ Sponsor" title="Rendered — Font Rendering That Doesn't Make You Wince">
          Rendered is a font rendering engine for Linux desktops that produces text so crisp, so properly hinted, so optically perfect that you'll forget you're running GNOME. Subpixel anti-aliasing the way it was meant to be. <BlogLink>Free for open source →</BlogLink>
        </BlogSponsor>

        <BlogFooter />

      </BlogWrap>
    </div>
  );
}
