# Design Guidelines for Johnny Clem Portfolio

## Design Approach
**System-Based with Technical Refinement**: Drawing from Linear's typography excellence and Apple's content-focused minimalism, adapted for a senior technical portfolio showcasing patents, products, and polymath expertise.

## Core Design Principles
- **Technical Sophistication**: Clean, precise layouts that reflect engineering excellence
- **Authority Through Clarity**: Information hierarchy that builds credibility
- **Strategic Emphasis**: Visual weight on patents, achievements, and specializations

## Color Palette

### Dark Mode (Primary)
- **Background**: 12 8% 6% (deep charcoal)
- **Surface**: 12 6% 10% (elevated panels)
- **Primary**: 217 91% 60% (professional blue - credibility, tech)
- **Accent**: 142 71% 45% (success green for achievements/patents)
- **Text Primary**: 0 0% 98%
- **Text Secondary**: 0 0% 71%

### Light Mode
- **Background**: 0 0% 98%
- **Surface**: 0 0% 100%
- **Primary**: 217 91% 45%
- **Accent**: 142 76% 36%
- **Text Primary**: 12 8% 12%
- **Text Secondary**: 0 0% 40%

## Typography
- **Font Families**: 
  - Headlines: Inter (weights: 600, 700)
  - Body: Inter (weights: 400, 500)
  - Code/Technical: JetBrains Mono (weight: 400)
- **Scale**: 
  - Hero: text-6xl to text-7xl
  - Section Headers: text-4xl to text-5xl
  - Subsections: text-2xl to text-3xl
  - Body: text-base to text-lg
  - Captions: text-sm

## Layout System
**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-20 (desktop), py-12 (mobile)
- Component spacing: gap-8, gap-12
- Inner margins: px-6 to px-8
- Max-width containers: max-w-7xl for full sections, max-w-4xl for content

## Component Library

### Navigation
- Fixed header with blur backdrop
- Logo/name left, navigation links right
- Smooth scroll anchors to sections
- Highlight active section in viewport
- Download resume CTA button (primary color, subtle hover lift)

### Hero Section
- Full-width, 85vh height
- Split layout: Left 60% content, Right 40% professional headshot or abstract tech visualization
- Large headline: "Polymath Engineer & Innovation Architect"
- Subheadline highlighting R&D, rapid prototyping, 10+ languages, dozen+ platforms
- Two CTAs: "View Patents" (primary), "Download Resume" (outline with blur background)
- Subtle gradient overlay from background to transparent

### Skills Matrix
- 3-4 column grid (responsive to 1 column mobile)
- Grouped categories: Languages, Platforms, Specializations, Frameworks
- Each skill card: icon area, skill name, proficiency indicator
- Highlight specializations (AVFoundation, Swift, iPhone) with accent border

### Work Experience Timeline
- Vertical timeline with company logos
- Each entry: Company, role, dates, 3-4 key achievements with checkmark icons
- Expandable details for major accomplishments
- Color-coded markers for different role types (Engineering, Leadership, CTO)

### Patent Portfolio Showcase
- 2-column grid (1 column mobile)
- Each patent card: Patent number (monospace font), title, year, visual abstract
- Hover effect: lift with subtle shadow, accent border pulse
- Icons indicating patent status (awarded vs. contributor)
- Link to full patent documentation

### Project Highlights
- Masonry grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Featured projects: Truepic SDK, Agentic AI MacOS, FiLMIC Pro optimizations
- Each card: Project image/screenshot, title, tech stack badges, brief description, impact metrics
- Hover: scale 1.02, shadow elevation
- Tech stack badges in monospace font with subtle backgrounds

### Specialization Deep-Dive
- Full-width section with centered content (max-w-4xl)
- Large heading: "AVFoundation & iOS Mastery"
- 2-column layout: Left - expertise description, Right - key achievements/metrics
- Include: App Store #1 ranking, performance optimizations, framework expertise
- Code snippet showcase (optional): brief example with syntax highlighting

### Testimonials/References
- 2-column grid featuring Brent Turner (Rover CEO) and Christopher Cohen (Apple)
- Quote card with photo, name, title, company, testimonial text
- Subtle accent border-left for visual emphasis

### Resume Integration
- Side-by-side preview: Resume | Cover Letter
- Embedded PDF viewers or clean formatted HTML versions
- Download buttons for each document

### Contact/Footer
- Centered layout with email, LinkedIn, GitHub links
- Icon-first design with hover animations
- Optional: Simple contact form with name, email, message fields
- Copyright and "Built with [tech stack]" note

## Animations
**Minimal and Purposeful**:
- Smooth scroll behavior for navigation
- Subtle fade-in-up for sections on scroll (use Intersection Observer)
- Hover states: scale, shadow elevation, border color shifts
- Page load: gentle fade-in for hero content
- No autoplay animations, no parallax effects

## Images
**Strategic Placement**:
- **Hero**: Professional headshot (400x400px) or abstract geometric/tech visualization showing code, circuits, or mobile device renders
- **Work Experience**: Company logos (100x40px, grayscale, color on hover)
- **Project Cards**: Screenshots of apps, products (600x400px, rounded corners)
- **Patent Section**: Simplified patent diagram illustrations or abstract representations
- **Testimonials**: Professional headshots of references (80x80px, circular)

All images should be optimized WebP with fallbacks, lazy-loaded below fold.

## Accessibility
- WCAG AA compliant contrast ratios (minimum 4.5:1 for body text)
- Focus indicators on all interactive elements (2px accent color ring)
- Semantic HTML structure (header, nav, main, section, footer)
- Alt text for all images
- Keyboard navigation support throughout

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked layouts)
- Tablet: 768px - 1024px (2 columns where appropriate)
- Desktop: > 1024px (full multi-column layouts)