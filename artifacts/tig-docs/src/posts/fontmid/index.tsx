import { useState } from "react";
import {
  FMNav,
  FMHero,
  FMSection,
  SentimentIcons,
  StatusIcons,
  CommerceIcons,
  NavigationIcons,
  WorkplaceIcons,
  DeveloperIcons,
  FMProBanner,
  FMUsage,
  FMTestimonials,
  FMFooter,
} from "@/components/docs/IconLibUI";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function FontMidPost() {
  useScrollReveal();
  const [query, setQuery] = useState("");
  const q = query.toLowerCase().trim();

  return (
    <div id="overview">
      <FMNav />
      <FMHero onSearch={setQuery} />

      <div className="pt-6">
        <FMSection
          emoji={"\uD83D\uDE10"}
          title="Sentiment"
          count={14}
          id="sentiment"
          description="Emotional expression icons for interfaces that need to convey feelings without committing to any particular one. Every face in this category is the same face. This was a deliberate design choice and not, as some have suggested, evidence that our illustrator was going through something."
        />
        <SentimentIcons query={q} />

        <FMSection
          emoji={"\uD83D\uDFE1"}
          title="Status"
          count={10}
          id="status"
          description="Status indicators for systems where nothing is ever fully operational and nothing is ever fully down. In our experience, most systems exist in a permanent state of amber. We designed for that reality. Green and red are available in FontMid Pro, but we have not tested them."
        />
        <StatusIcons query={q} />

        <FMSection
          emoji={"\uD83D\uDED2"}
          title="Commerce"
          count={12}
          id="commerce"
          description='Icons for e-commerce interfaces and the full spectrum of modern payment methods. Our shopping cart has a slightly wonky wheel, which our users report is "accurate to the experience of online shopping." The credit card icons are all the same rectangle because from the merchant&apos;s perspective, money is money.'
        />
        <CommerceIcons query={q} />

        <FMSection
          emoji={"\uD83E\uDDED"}
          title="Navigation"
          count={10}
          id="navigation"
          description='Directional icons for guiding users through your interface. Each arrow points in approximately the intended direction. We say "approximately" because at 16×16 pixels, the difference between "right" and "slightly right and a little up" is negligible. The collection includes several arrows whose directionality is best described as "aspirational."'
        />
        <NavigationIcons query={q} />

        <FMSection
          emoji={"\uD83D\uDCBC"}
          title="Workplace"
          count={12}
          id="workplace"
          description='Icons for productivity tools built by people who have not experienced productivity firsthand in several years. Includes essential concepts like "meeting that should have been an email," "email that should have been a Slack," and "Slack that should have been silence." All meeting icons are the same rectangle because all meetings feel the same.'
        />
        <WorkplaceIcons query={q} />

        <FMSection
          emoji={"\u2328\uFE0F"}
          title="Developer"
          count={10}
          id="developer"
          description='Icons for developer tools and engineering dashboards. The "deploy" and "revert" icons are identical because in our experience, one immediately follows the other. The "git blame" icon points at you specifically. The "LGTM" and "LGTM (didn&apos;t read)" icons are the same checkmark, which we feel is the most honest design decision we&apos;ve ever made.'
        />
        <DeveloperIcons query={q} />

        <FMProBanner />
        <FMUsage />
        <FMTestimonials />
        <FMFooter />
      </div>
    </div>
  );
}
