import { useState } from "react";
import {
  LinearApp,
  SbBrand,
  SbSection,
  SbItem,
  SbUser,
  LinearHeader,
  CycleHeader,
  StatusGroup,
  IssueRow,
  DetailPanel,
  Comment,
  L,
} from "@/components/docs/LinearUI";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface DetailData {
  title: string;
  meta: [string, string][];
  body: React.ReactNode;
}

const details: Record<string, DetailData> = {
  "401": {
    title: '[URGENT] Complete pivot to "conversational commerce" platform',
    meta: [["Status", "In Progress (since Mar 12)"], ["Priority", "🔴 Urgent"], ["Assignee", "Kevin Chen"], ["Labels", "Marcus · pivot-v4"], ["Created", "Mar 12 by Marcus Webb (CTO)"], ["Blocked by", "ORB-399 (which contradicts this ticket)"]],
    body: <>
      <p>We need to pivot the entire platform to conversational commerce. I saw a demo at a dinner last week and this is clearly where the market is heading. Drop everything.</p>
      <p>Requirements TBD. I'll send a voice memo. Kevin — prototype by Wednesday?</p>
      <Comment author="Kevin Chen" date="Mar 12" text="Marcus, this contradicts ORB-399 which you created 2 hours later asking me to pivot to developer tools. Which one?" />
      <Comment author="Marcus Webb" date="Mar 13" text='Both. We can explore both simultaneously. That’s what agile means.' />
      <Comment author="Kevin Chen" date="Mar 13" text="That is not what agile means." />
      <Comment author="Marcus Webb" date="Mar 13" text="Let’s take this offline." />
      <Comment author="Priya Sharma" date="Mar 14" text='"Taking it offline" is how we got to Cycle 43 with 2 tickets completed. Both of which were sticker orders.' />
    </>,
  },
  "399": {
    title: "Actually, scrap that — pivot to developer tools instead",
    meta: [["Status", "In Progress"], ["Priority", "🔴 Urgent"], ["Assignee", "Kevin Chen"], ["Labels", "Marcus · pivot-v4"], ["Created", "Mar 12 by Marcus Webb (CTO)"], ["Blocks", "ORB-401 (which this contradicts)"]],
    body: <>
      <p>Forget conversational commerce. I just got off a call with our lead investor and the real opportunity is developer tools. Think "Linear meets Figma meets… something with AI."</p>
      <p>Kevin, technical spec by EOD? I know I asked for the conversational commerce prototype an hour ago but this is higher priority.</p>
      <Comment author="Kevin Chen" date="Mar 12" text="Marcus, are you closing ORB-401?" />
      <Comment author="Marcus Webb" date="Mar 12" text="No, keep that open too. Optionality." />
      <Comment author="Kevin Chen" date="Mar 12" text="👍" emoji="😐" />
    </>,
  },
  "392": {
    title: "SPIKE: Determine if Jake is still employed here",
    meta: [["Status", "In Progress"], ["Priority", "🟠 High"], ["Assignee", "Priya Sharma"], ["Labels", "spike · people-ops"], ["Created", "Mar 12 by Priya Sharma"], ["Related", "ORB-388, ORB-406, ORB-411, ORB-375, ORB-376, ORB-377"]],
    body: <>
      <p>Jake has not committed code since November. His Slack status has been "{"🏔️"} deep focus" for 4 months. He appears on the org chart but not in Zoom, standups, sprint reviews, or the office.</p>
      <p>His tickets have been "In Progress" since Q3 2024. When mentioned in Slack, he reacts with {"👀"} within 3{"–"}7 business days but does not reply.</p>
      <p><strong>Acceptance Criteria:</strong></p>
      <ul>
        <li>Confirm Jake's employment status with HR (if we have HR)</li>
        <li>Confirm Jake's VPN last-connected date</li>
        <li>Determine if Jake is, in a general sense, "around"</li>
      </ul>
      <Comment author="Kevin Chen" date="Mar 13" text="I saw Jake's Slack go green for 11 minutes last Tuesday. He reacted to the lunch channel with 🍕 but did not respond to my DM." />
      <Comment author="Marcus Webb" date="Mar 14" text="Who is Jake?" />
      <Comment author="Priya Sharma" date="Mar 14" text="Marcus, Jake reports to you." />
      <Comment author="Marcus Webb" date="Mar 14" text="Let's take this offline." />
      <Comment author="Priya Sharma" date="Mar 14" text={`Marcus, that is the third time this week you've said "let's take this offline" about Jake. At what point do we take it online. In a formal sense.`} />
    </>,
  },
  "388": {
    title: "SPIKE: Does Jake’s laptop even connect to our VPN anymore",
    meta: [["Status", "In Progress"], ["Priority", "🟡 Medium"], ["Assignee", "Priya Sharma"], ["Labels", "spike · infra"], ["Created", "Mar 11 by Priya Sharma"], ["Related", "ORB-392, ORB-411"]],
    body: <>
      <p>Sub-investigation of ORB-392. Checking VPN logs for Jake's device.</p>
      <p><strong>Update (Mar 14):</strong> Jake's laptop last connected to VPN on December 2, 2025. However, it appears connected to what our network admin describes as "an extremely powerful home network, possibly a gaming setup." We cannot confirm Jake is using the laptop for work purposes.</p>
      <p><strong>Update (Mar 18):</strong> Jake's laptop hostname has been changed from "ORBLY-JAKE-MBP" to "JAKE-PERSONAL-DO-NOT-TOUCH." Noting this for the file.</p>
      <p><strong>Update (Mar 21):</strong> Jake's laptop briefly appeared on the VPN at 2:47 AM EST for approximately 90 seconds. During this window, a single git pull was executed on the main branch. No commits were made. The pull was from a repository that was archived 6 months ago. We are unsure what to make of this.</p>
    </>,
  },
  "406": {
    title: 'Research if Jake has updated his LinkedIn to "Open to Work"',
    meta: [["Status", "In Progress"], ["Priority", "🟡 Medium"], ["Assignee", "Kevin Chen"], ["Labels", "spike · people-ops"], ["Created", "Mar 19 by Marcus Webb (CTO)"], ["Related", "ORB-411, ORB-392"]],
    body: <>
      <p>Before we proceed with ORB-411 I need someone to check if Jake has the "Open to Work" banner on LinkedIn. This will inform our approach.</p>
      <Comment author="Kevin Chen" date="Mar 19" text="Marcus, I am a backend engineer. This is not a backend engineering task." />
      <Comment author="Marcus Webb" date="Mar 19" text="Consider it a cross-functional growth opportunity." />
      <Comment author="Kevin Chen" date="Mar 20" text='Fine. He does not have the banner. His headline says "Building the future of [COMPANY NAME TBD]." That’s a direct quote. The brackets are his.' />
      <Comment author="Priya Sharma" date="Mar 20" text="That’s actually kind of on-brand for us." />
    </>,
  },
  "410": {
    title: "[URGENT] Marcus needs a demo for investor meeting TOMORROW",
    meta: [["Status", "Todo"], ["Priority", "🔴 Urgent"], ["Assignee", "Priya Sharma"], ["Labels", "Marcus · P0"], ["Created", "Mar 22 by Marcus Webb (CTO)"], ["Due", "Mar 23 (tomorrow)"]],
    body: <>
      <p>Need a working demo of "the platform" for a meeting with Sequoia tomorrow at 2pm. Doesn't need to be perfect, just needs to show our vision. And work. And look like we have product-market fit.</p>
      <p>Can be any of the pivots — whatever's closest to working.</p>
      <Comment author="Priya Sharma" date="Mar 22" text="Marcus, none of the pivots are close to working. That is the defining characteristic of all four pivots." />
      <Comment author="Marcus Webb" date="Mar 22" text="Can we stitch something together? Like a Franken-demo?" />
      <Comment author="Priya Sharma" date="Mar 22" text="You want me to combine the social-first UI, the AI agent backend, and the conversational commerce prototype into a coherent demo by tomorrow." />
      <Comment author="Marcus Webb" date="Mar 22" text="Yes! That’s the energy I love. That’s the Orbly spirit." />
      <Comment author="Kevin Chen" date="Mar 22" text="Priya, if you need me I'll be updating my LinkedIn." />
    </>,
  },
  "411": {
    title: "SPIKE: Determine if Jake deserves respect as a professional",
    meta: [["Status", "Todo"], ["Priority", "🟠 High"], ["Assignee", "Marcus Webb (CTO)"], ["Labels", "spike · people-ops · question"], ["Created", "Mar 21 by Marcus Webb (CTO)"], ["Related", "ORB-375, ORB-376, ORB-377, ORB-392, ORB-412"]],
    body: <>
      <p>Following the inconclusive results of ORB-375, ORB-376, and ORB-377, we are reopening the Jake question with a broader scope. Previous investigations focused on whether Jake "adds value" — this was too narrow. The real question is whether Jake, as a professional, has earned the team's respect through his actions, output, or at minimum, his presence.</p>
      <p><strong>Methodology:</strong> To be determined. Kevin has been asked to collect evidence of Jake's contributions (ORB-412). Priya has suggested we "just talk to Jake directly," which was considered and rejected as too confrontational.</p>
      <Comment author="Priya Sharma" date="Mar 21" text="Marcus, I want to flag that this ticket's title might be an HR issue. Maybe we could rephrase it?" />
      <Comment author="Marcus Webb" date="Mar 21" text='Good point. How about "SPIKE: Evaluate Jake’s alignment with team values"?' />
      <Comment author="Priya Sharma" date="Mar 21" text="That’s the same thing with more words." />
      <Comment author="Marcus Webb" date="Mar 21" text="Let's take this offline." />
      <Comment author="Kevin Chen" date="Mar 21" text="If we took everything offline that Marcus wants to take offline, we would have no tickets." />
      <Comment author="Jake Torres" date="Mar 22" text="👀" />
    </>,
  },
  "375": {
    title: "SPIKE: Determine if Jake adds value to the organization",
    meta: [["Status", "Cancelled"], ["Priority", "None"], ["Assignee", "Marcus Webb (CTO)"], ["Labels", "spike · people-ops"], ["Created", "Feb 20 by Marcus Webb"], ["Cancelled", "Feb 27 — Inconclusive"]],
    body: <>
      <p>Initial investigation into Jake's organizational impact. Cancelled after one week due to inability to locate Jake for a conversation.</p>
      <Comment author="Marcus Webb" date="Feb 22" text="Has anyone seen Jake this week?" />
      <Comment author="Kevin Chen" date="Feb 23" text="He was in the #random channel at 1am posting a Spotify link." />
      <Comment author="Priya Sharma" date="Feb 25" text={`I scheduled a 1:1 with Jake. He accepted, then did not join. His Slack went to 🏔️ deep focus at the scheduled time.`} />
    </>,
  },
  "376": {
    title: 'Follow-up: Jake value assessment (inconclusive — Jake "in a meeting")',
    meta: [["Status", "Cancelled"], ["Priority", "None"], ["Assignee", "Marcus Webb"], ["Labels", "spike · people-ops"], ["Created", "Feb 27 by Marcus Webb"], ["Cancelled", "Mar 3 — Escalated to ORB-377"]],
    body: <>
      <p>Second attempt to assess Jake's contributions. Marcus DM'd Jake directly. Jake responded 4 days later saying he was "in a meeting." Investigation pivoted to determining what meeting.</p>
      <Comment author="Marcus Webb" date="Feb 27" text="Jake, do you have 15 minutes this week to chat about your current workload?" />
      <Comment author="Jake Torres" date="Mar 3" text="Hey sorry just seeing this, was in a meeting. This week is tight but let me circle back." />
      <Comment author="Priya Sharma" date="Mar 3" text="Jake has no meetings on his calendar. I have checked." />
    </>,
  },
  "377": {
    title: "Determine what meeting Jake was in (he is on no calendars)",
    meta: [["Status", "Cancelled"], ["Priority", "None"], ["Assignee", "Kevin Chen"], ["Labels", "spike · people-ops"], ["Created", "Mar 3 by Priya Sharma"], ["Cancelled", "Mar 8 — Remains a mystery"]],
    body: <>
      <p>Following ORB-376, Jake claimed to be "in a meeting." Jake does not appear on any shared calendar. Jake's Google Calendar, when accessed by admin, shows no events since January 14.</p>
      <p>January 14's event was titled "Jake / Jake — sync" and was a 1:1 meeting with himself. Duration: 3 hours.</p>
      <Comment author="Kevin Chen" date="Mar 4" text="I checked the Zoom admin panel. Jake's last Zoom meeting was in December. He logged into Zoom on Feb 28 but immediately logged out. Total session: 4 seconds." />
      <Comment author="Priya Sharma" date="Mar 5" text="At this point I feel like we’re building a true crime podcast about Jake’s calendar." />
      <Comment author="Kevin Chen" date="Mar 7" text="I would listen to that podcast." />
      <Comment author="Marcus Webb" date="Mar 8" text='Closing this ticket. We’ll address the Jake situation holistically in ORB-411.' />
      <Comment author="Kevin Chen" date="Mar 8" text='"Holistically." Sure.' />
    </>,
  },
};

export default function OrblyPost() {
  useScrollReveal();
  const [activeDetail, setActiveDetail] = useState<string | null>(null);
  const detail = activeDetail ? details[activeDetail] : null;

  return (
    <div className="-mx-6 lg:-mx-12 -my-10 lg:-my-12 reveal" id="overview">
      <LinearApp>
        <div className="flex h-[85vh] min-h-[700px] relative overflow-hidden">
          <aside className="w-[220px] flex-shrink-0 border-r border-[#2a2a2a] flex flex-col p-3 overflow-y-auto hidden lg:flex">
            <SbBrand name="Orbly" initial="O" />
            <SbSection>
              <SbItem icon="🔍" label="Search" />
              <SbItem icon="📥" label="Inbox" count="47" countColor="text-[#e5484d]" />
              <SbItem icon="📊" label="My Issues" count="23" />
            </SbSection>
            <SbSection label="Workspace">
              <SbItem icon="📋" label="Active Cycle" active />
              <SbItem icon="📦" label="Backlog" count="347" countColor="text-[#e5934b]" />
              <SbItem icon="🗺️" label="Roadmap" count="lol" countColor="text-[#3a3a3a]" />
              <SbItem icon="📈" label="Analytics" />
            </SbSection>
            <SbSection label="Epics">
              <SbItem icon="◆" label="Platform v1 (Abandoned)" struck />
              <SbItem icon="◆" label='AI Pivot (Abandoned)' struck />
              <SbItem icon="◆" label='"Social-First" (Abandoned)' struck />
              <SbItem icon="◆" label="Marcus’s Vision™" urgentStyle />
              <SbItem icon="◆" label="Refactor v3 (In Progress?)" mutedStyle />
            </SbSection>
            <SbSection label="Team">
              <SbItem icon="🟢" label="Priya" count="8" />
              <SbItem icon="🟡" label="Kevin" count="19" />
              <SbItem icon="⚫" label="Jake" count="11" ghost />
              <SbItem icon="🔴" label="Marcus (CTO)" count="6" />
              <SbItem icon="⚫" label="Darian (Former)" count="11" ghost />
            </SbSection>
            <SbUser name="Priya Sharma" title="the one who ships" initial="P" color="#46a758" />
          </aside>

          <div className="flex-1 flex flex-col min-w-0">
            <LinearHeader path="Orbly" current="Active Cycle" />
            <CycleHeader
              name="Cycle 43: Marcus’s Vision"
              dateRange="Mar 10 – Mar 24"
              overdue="2 days overdue"
              done={2}
              total={31}
              progressDone={6}
              progressInProgress={4}
              progressTodo={18}
            />

            <div className="flex-1 overflow-y-auto">
              <StatusGroup status="In Progress" color="#5e6ad2" count={14}>
                <IssueRow id="ORB-401" title='[URGENT] Complete pivot to "conversational commerce" platform' priority="urgent" labels={[{text:"Marcus",cls:L.marcus},{text:"pivot-v4",cls:L.pivotV4}]} assignee="kevin" assigneeInitial="K" date="Mar 17" overdue onClick={() => setActiveDetail("401")} />
                <IssueRow id="ORB-399" title="[URGENT] Actually, scrap that — pivot to developer tools instead" priority="urgent" labels={[{text:"Marcus",cls:L.marcus},{text:"pivot-v4",cls:L.pivotV4}]} assignee="kevin" assigneeInitial="K" date="Mar 14" overdue onClick={() => setActiveDetail("399")} />
                <IssueRow id="ORB-392" title="SPIKE: Determine if Jake is still employed here" priority="high" labels={[{text:"spike",cls:L.spike},{text:"people-ops",cls:L.peopleOps}]} assignee="priya" assigneeInitial="P" date="Mar 12" onClick={() => setActiveDetail("392")} />
                <IssueRow id="ORB-312" title="Refactor auth module to new architecture (v3)" priority="high" labels={[{text:"refactor-v3",cls:L.refactorV3},{text:"tech-debt",cls:L.techDebt}]} assignee="kevin" assigneeInitial="K" date="Jan 8" stale />
                <IssueRow id="ORB-278" title="Migrate DB to new schema (blocked by ORB-277, blocked by ORB-201)" priority="high" labels={[{text:"blocked",cls:L.blocked},{text:"refactor-v3",cls:L.refactorV3}]} assignee="darian" assigneeInitial="D" date="Nov 3" stale />
                <IssueRow id="ORB-388" title="SPIKE: Does Jake’s laptop even connect to our VPN anymore" priority="medium" labels={[{text:"spike",cls:L.spike},{text:"infra",cls:L.infra}]} assignee="priya" assigneeInitial="P" date="Mar 11" onClick={() => setActiveDetail("388")} />
                <IssueRow id="ORB-345" title="Determine what the product actually is (for landing page)" priority="medium" labels={[{text:"question",cls:L.question},{text:"blocked",cls:L.blocked}]} assignee="priya" assigneeInitial="P" date="Feb 2" stale />
                <IssueRow id="ORB-389" title="Build landing page for new positioning (which positioning?)" priority="medium" labels={[{text:"design",cls:L.design},{text:"blocked",cls:L.blocked}]} assignee="priya" assigneeInitial="P" date="Mar 20" />
                <IssueRow id="ORB-406" title='Research if Jake has updated his LinkedIn to "Open to Work"' priority="medium" labels={[{text:"spike",cls:L.spike},{text:"people-ops",cls:L.peopleOps}]} assignee="kevin" assigneeInitial="K" date="Mar 19" onClick={() => setActiveDetail("406")} />
                <IssueRow id="ORB-298" title="Set up monitoring for production (which production?)" priority="low" labels={[{text:"infra",cls:L.infra},{text:"question",cls:L.question}]} assignee="darian" assigneeInitial="D" date="Dec 1" stale />
                <IssueRow id="ORB-394" title="Write documentation (haha)" priority="low" labels={[{text:"tech-debt",cls:L.techDebt}]} assignee="none" assigneeInitial="" date="Jan 15" stale />
                <IssueRow id="ORB-367" title="Fix login bug from pivot v2 (does anyone still use this login?)" priority="low" labels={[{text:"bug",cls:L.bug},{text:"legacy",cls:L.legacy}]} assignee="jake" assigneeInitial="J" date="Nov 14" stale />
                <IssueRow id="ORB-287" title="Remove Darian’s AWS credentials (seriously, someone do this)" priority="none" labels={[{text:"P0",cls:L.P0},{text:"infra",cls:L.infra}]} assignee="darian" assigneeInitial="D" date="Nov 9" stale />
                <IssueRow id="ORB-341" title="Update dependencies (last updated: never)" priority="none" labels={[{text:"tech-debt",cls:L.techDebt}]} assignee="jake" assigneeInitial="J" date="Oct 22" stale />
              </StatusGroup>

              <StatusGroup status="Todo" color="#888" count={9}>
                <IssueRow id="ORB-410" title="[URGENT] Marcus needs a demo for investor meeting TOMORROW" priority="urgent" labels={[{text:"Marcus",cls:L.marcus},{text:"P0",cls:L.P0}]} assignee="priya" assigneeInitial="P" date="Mar 22" overdue onClick={() => setActiveDetail("410")} />
                <IssueRow id="ORB-408" title="Figure out which AWS account is running $4,200/mo in unused EC2 instances" priority="high" labels={[{text:"infra",cls:L.infra},{text:"P0",cls:L.P0}]} assignee="none" assigneeInitial="" date="Mar 15" overdue />
                <IssueRow id="ORB-411" title="SPIKE: Determine if Jake deserves respect as a professional" priority="high" labels={[{text:"spike",cls:L.spike},{text:"people-ops",cls:L.peopleOps},{text:"question",cls:L.question}]} assignee="marcus" assigneeInitial="M" date="Mar 21" onClick={() => setActiveDetail("411")} />
                <IssueRow id="ORB-412" title="Subtask: Collect evidence of Jake’s contributions (if any exist)" priority="medium" labels={[{text:"spike",cls:L.spike},{text:"people-ops",cls:L.peopleOps}]} assignee="kevin" assigneeInitial="K" date="Mar 22" />
                <IssueRow id="ORB-403" title='Create onboarding doc for "whatever we are now"' priority="medium" labels={[{text:"onboarding",cls:L.onboarding}]} assignee="none" assigneeInitial="" date="Mar 22" />
                <IssueRow id="ORB-404" title="Update company LinkedIn to reflect current pivot (which one)" priority="medium" labels={[{text:"question",cls:L.question}]} assignee="none" assigneeInitial="" date="Mar 22" />
                <IssueRow id="ORB-405" title="Investigate why Slack #general has been muted by entire team" priority="low" labels={[{text:"morale",cls:L.morale}]} assignee="none" assigneeInitial="" date="Mar 22" />
                <IssueRow id="ORB-398" title='Plan team offsite to "rebuild trust" and "align on vision" (Marcus’s words)' priority="low" labels={[{text:"morale",cls:L.morale},{text:"Marcus",cls:L.marcus}]} assignee="none" assigneeInitial="" date="Mar 24" />
                <IssueRow id="ORB-407" title="Consider adding tests (carry-over from Cycle 12)" priority="none" labels={[{text:"tech-debt",cls:L.techDebt},{text:"legacy",cls:L.legacy}]} assignee="none" assigneeInitial="" date="Jul 2024" stale />
              </StatusGroup>

              <StatusGroup status="Backlog" color="#555" count={347} note="(showing 6 of 347)" defaultOpen={false}>
                <IssueRow id="ORB-002" title="Build core product" priority="none" labels={[{text:"scope-tbd",cls:L.scopeTbd}]} assignee="none" assigneeInitial="" date="Mar 2024" stale />
                <IssueRow id="ORB-047" title="Define product-market fit" priority="none" labels={[{text:"question",cls:L.question}]} assignee="darian" assigneeInitial="D" date="May 2024" stale />
                <IssueRow id="ORB-134" title="Resolve disagreement re: whether we are B2B or B2C" priority="none" labels={[{text:"question",cls:L.question},{text:"blocked",cls:L.blocked}]} assignee="darian" assigneeInitial="D" date="Aug 2024" stale />
                <IssueRow id="ORB-089" title="Address Jake’s PR from June (14 comments, 0 approvals, no resolution)" priority="none" labels={[{text:"tech-debt",cls:L.techDebt}]} assignee="jake" assigneeInitial="J" date="Jun 2024" stale />
                <IssueRow id="ORB-023" title="Jake’s onboarding tasks (never completed, unclear if onboarding ended)" priority="none" labels={[{text:"onboarding",cls:L.onboarding}]} assignee="jake" assigneeInitial="J" date="Apr 2024" stale />
                <IssueRow id="ORB-001" title="Choose company name (revisit?)" priority="none" labels={[{text:"scope-tbd",cls:L.scopeTbd}]} assignee="darian" assigneeInitial="D" date="Feb 2024" stale />
              </StatusGroup>

              <StatusGroup status="Done" color="#46a758" count={2}>
                <IssueRow id="ORB-390" title="Update Slack status to reflect current pivot" priority="low" labels={[{text:"morale",cls:L.morale}]} assignee="priya" assigneeInitial="P" date="Mar 13" />
                <IssueRow id="ORB-396" title="Order new laptop stickers that don’t say our old name" priority="low" labels={[{text:"morale",cls:L.morale}]} assignee="priya" assigneeInitial="P" date="Mar 18" />
              </StatusGroup>

              <StatusGroup status="Cancelled" color="#e5484d" count={6} defaultOpen={false}>
                <IssueRow id="ORB-301" title="Ship MVP to actual customers" priority="none" labels={[{text:"pivot-v3",cls:L.pivotV3}]} assignee="darian" assigneeInitial="D" date="Dec 15" cancelled />
                <IssueRow id="ORB-256" title="Launch AI agent marketplace (pivot v2)" priority="none" labels={[{text:"pivot-v2",cls:L.pivotV2}]} assignee="darian" assigneeInitial="D" date="Oct 1" cancelled />
                <IssueRow id="ORB-188" title="Launch social-first collaboration tool (pivot v1)" priority="none" labels={[{text:"pivot-v1",cls:L.pivotV1}]} assignee="darian" assigneeInitial="D" date="Aug 19" cancelled />
                <IssueRow id="ORB-375" title="SPIKE: Determine if Jake adds value to the organization" priority="none" labels={[{text:"spike",cls:L.spike},{text:"people-ops",cls:L.peopleOps}]} assignee="marcus" assigneeInitial="M" date="Feb 20" cancelled onClick={() => setActiveDetail("375")} />
                <IssueRow id="ORB-376" title='Follow-up: Jake value assessment (inconclusive — Jake "in a meeting")' priority="none" labels={[{text:"spike",cls:L.spike},{text:"people-ops",cls:L.peopleOps}]} assignee="marcus" assigneeInitial="M" date="Feb 27" cancelled onClick={() => setActiveDetail("376")} />
                <IssueRow id="ORB-377" title="Determine what meeting Jake was in (he is on no calendars)" priority="none" labels={[{text:"spike",cls:L.spike},{text:"people-ops",cls:L.peopleOps}]} assignee="kevin" assigneeInitial="K" date="Mar 3" cancelled onClick={() => setActiveDetail("377")} />
              </StatusGroup>
            </div>
          </div>

          {detail && activeDetail && (
            <DetailPanel
              open={!!detail}
              onClose={() => setActiveDetail(null)}
              issueId={`ORB-${activeDetail}`}
              title={detail.title}
              meta={detail.meta}
            >
              {detail.body}
            </DetailPanel>
          )}
        </div>
      </LinearApp>
    </div>
  );
}
