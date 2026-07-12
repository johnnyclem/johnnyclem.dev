import {
  TagSection,
  Endpoint,
  EndpointDescription,
  DetailSectionTitle,
  RateLimitNote,
  ParamTableSW,
  ParamName,
  ParamIn,
  ParamType,
  ParamDesc,
  ResponseRow,
  ResponseBody,
  RbKey,
  RbStr,
  RbNum,
  RbBool,
  RbCmt,
  TryItButton,
  SchemaBlock,
  SchemaField,
  SwaggerIC,
} from "@/components/docs/SwaggerUI";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function ChainTimeProtocol() {
  useScrollReveal();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out font-[Source_Sans_3,sans-serif]">
      <div>
        <span className="text-[36px] font-bold text-[#3b4151] font-[Source_Sans_3,sans-serif]">ChainTime Protocol API</span>
        <span className="inline-block text-[12px] font-bold bg-[#89bf04] text-white px-2.5 py-0.5 rounded-full align-[6px] ml-2">v3.1.0</span>
      </div>

      <div className="mt-2 text-[14px] space-x-4">
        <a href="#" className="text-[#4990e2] no-underline hover:underline">Terms of Service</a>
        <a href="#" className="text-[#4990e2] no-underline hover:underline">Validator Node Agreement</a>
        <a href="#" className="text-[#4990e2] no-underline hover:underline">Time Dispute Resolution Policy</a>
        <a href="#" className="text-[#4990e2] no-underline hover:underline">Contact the Core Temporal Team</a>
      </div>

      <div id="overview" className="mt-4 text-[14px] leading-[1.7] text-[#3b4151] max-w-[720px] [&_p]:mb-3">
        <p>
          <strong>ChainTime Protocol</strong> provides decentralized, consensus-validated, cryptographically verifiable temporal data for applications that require <em>trustless certainty</em> about what time it is.
        </p>
        <p>
          Traditional time APIs rely on centralized servers operated by governments and standards bodies — single points of failure controlled by entities that also brought you daylight saving time. ChainTime eliminates this dependency by distributing temporal consensus across a global network of 11,000+ validator nodes, each independently observing the passage of time and reaching agreement through our proprietary <strong>Proof of Clock™</strong> consensus mechanism.
        </p>
        <p>
          Every temporal query is validated by a minimum of 3 nodes, recorded immutably on-chain, and accompanied by a cryptographic proof that the current moment is, in fact, <em>now</em>. This proof can be independently verified by any participant in the network, or by looking at a clock.
        </p>
        <p>
          ChainTime serves over <strong>2.4 million temporal queries per day</strong> across 140 countries, consuming approximately the same energy as a small European nation. We believe this is a reasonable cost for knowing what time it is.
        </p>
      </div>

      <div className="mt-3 text-[13px] text-[#6b6b6b]">
        Base URL: <SwaggerIC>https://api.chaintime.io/v3</SwaggerIC> &nbsp;·&nbsp; Protocol: HTTPS &nbsp;·&nbsp; Format: JSON &nbsp;·&nbsp; Consensus: Proof of Clock™ (3-node minimum)
      </div>

      <div id="authorize" className="mt-5 flex items-center gap-2.5 reveal">
        <button className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[14px] font-bold text-[#3b4151] bg-transparent border-2 border-[#49cc90] rounded cursor-default font-[Source_Sans_3,sans-serif]">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zm3 7V7a3 3 0 00-6 0v2h6z"/></svg>
          Authorize
        </button>
        <span className="text-[13px] text-[#999]">Requires <SwaggerIC>X-ChainTime-Key</SwaggerIC> and <SwaggerIC>X-Temporal-Signature</SwaggerIC></span>
      </div>

      {/* ─── temporal-queries ─── */}
      <TagSection name="temporal-queries" description="Core endpoints for consensus-validated time retrieval">

        {/* GET /time/now */}
        <Endpoint method="get" path="/time/now" description="Get consensus-validated current UTC time" defaultOpen>
          <EndpointDescription>
            <p>Returns the current UTC time as agreed upon by the ChainTime validator network. Each response requires a minimum of 3 independent node confirmations and includes a cryptographic temporal proof that can be verified on-chain.</p>
            <p>Average response time is 340ms, which is approximately 340ms longer than checking the clock on your phone. This latency represents the cost of <strong>trustless temporal certainty</strong> and is not something we plan to optimize, as doing so would compromise the <em>decentralized integrity of the present moment</em>.</p>
          </EndpointDescription>

          <RateLimitNote>
            <strong>Rate limit:</strong> 100 queries/minute on Free tier. If you need to check the time more than 100 times per minute, please contact our Enterprise team, and also perhaps a doctor.
          </RateLimitNote>

          <DetailSectionTitle>Parameters</DetailSectionTitle>
          <ParamTableSW>
            <tr>
              <ParamName>confirmations</ParamName>
              <ParamIn>query</ParamIn>
              <ParamType>integer</ParamType>
              <ParamDesc>Number of node confirmations required (min: 3, max: 2048). Higher values increase accuracy by up to 0.0001ms and latency by up to 45 seconds.</ParamDesc>
            </tr>
            <tr>
              <ParamName>include_proof</ParamName>
              <ParamIn>query</ParamIn>
              <ParamType>boolean</ParamType>
              <ParamDesc>Whether to include the full cryptographic proof that it is currently now. Default: <SwaggerIC>true</SwaggerIC>. Setting to <SwaggerIC>false</SwaggerIC> means you are choosing to <em>trust</em>, which defeats the purpose.</ParamDesc>
            </tr>
            <tr>
              <ParamName>philosophical</ParamName>
              <ParamIn>query</ParamIn>
              <ParamType>boolean</ParamType>
              <ParamDesc>If <SwaggerIC>true</SwaggerIC>, response includes a <SwaggerIC>meditation</SwaggerIC> field reflecting on the nature of temporal experience. Adds ~200ms. Default: <SwaggerIC>false</SwaggerIC>.</ParamDesc>
            </tr>
          </ParamTableSW>

          <DetailSectionTitle>Responses</DetailSectionTitle>
          <ResponseRow code="200" type="success">Temporal consensus achieved. The time has been determined.</ResponseRow>
          <ResponseBody>
            {"{"}{"\n"}
            {"  "}<RbKey>"timestamp"</RbKey>: <RbStr>"2026-03-22T19:04:31.847Z"</RbStr>,{"\n"}
            {"  "}<RbKey>"unix"</RbKey>: <RbNum>1774494271847</RbNum>,{"\n"}
            {"  "}<RbKey>"confidence"</RbKey>: <RbNum>0.999997</RbNum>,{"\n"}
            {"  "}<RbKey>"consensus"</RbKey>: {"{"}{"\n"}
            {"    "}<RbKey>"nodes_queried"</RbKey>: <RbNum>7</RbNum>,{"\n"}
            {"    "}<RbKey>"nodes_agreed"</RbKey>: <RbNum>7</RbNum>,{"\n"}
            {"    "}<RbKey>"dissenting_nodes"</RbKey>: <RbNum>0</RbNum>,{"\n"}
            {"    "}<RbKey>"consensus_reached_at"</RbKey>: <RbStr>"2026-03-22T19:04:31.506Z"</RbStr>,{"\n"}
            {"    "}<RbKey>"consensus_duration_ms"</RbKey>: <RbNum>341</RbNum>{"\n"}
            {"  }"},{"\n"}
            {"  "}<RbKey>"proof"</RbKey>: {"{"}{"\n"}
            {"    "}<RbKey>"algorithm"</RbKey>: <RbStr>"ChronoHash-256"</RbStr>,{"\n"}
            {"    "}<RbKey>"hash"</RbKey>: <RbStr>"0x7f3a…c841"</RbStr>,{"\n"}
            {"    "}<RbKey>"block_height"</RbKey>: <RbNum>18439201</RbNum>,{"\n"}
            {"    "}<RbKey>"verifiable"</RbKey>: <RbBool>true</RbBool>,{"\n"}
            {"    "}<RbKey>"verification_url"</RbKey>: <RbStr>"https://explorer.chaintime.io/proof/0x7f3a…c841"</RbStr>{"\n"}
            {"  }"},{"\n"}
            {"  "}<RbKey>"energy_consumed_kwh"</RbKey>: <RbNum>0.0042</RbNum>,{"\n"}
            {"  "}<RbKey>"equivalent_to"</RbKey>: <RbStr>"running a microwave for 11 seconds"</RbStr>,{"\n"}
            {"  "}<RbKey>"billing"</RbKey>: {"{"}{"\n"}
            {"    "}<RbKey>"credits_used"</RbKey>: <RbNum>3</RbNum>,{"\n"}
            {"    "}<RbKey>"cost_usd"</RbKey>: <RbNum>0.003</RbNum>,{"\n"}
            {"    "}<RbKey>"note"</RbKey>: <RbStr>"Date.now() is free, but is it trustless?"</RbStr>{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </ResponseBody>

          <div className="mt-4">
            <ResponseRow code="408" type="client-err">Temporal Consensus Timeout. The validator network could not agree on what time it is within the allotted window. This is rare but philosophically interesting.</ResponseRow>
            <ResponseRow code="503" type="server-err">Time Unavailable. The network is experiencing a temporal disagreement. Please wait. Or don't. We can't be sure how long it will take.</ResponseRow>
          </div>

          <TryItButton />
        </Endpoint>

        {/* POST /time/validate */}
        <Endpoint method="post" path="/time/validate" description="Submit a time observation for network validation">
          <EndpointDescription>
            <p>Allows any participant to submit their own observation of the current time to the ChainTime validator network. The network will compare your observation against consensus and return a validation result.</p>
            <p>This endpoint exists because in a truly decentralized temporal system, <em>anyone</em> should be able to propose what time it is. In practice, 99.97% of submitted observations are correct, 0.02% are from misconfigured servers, and 0.01% appear to be from someone in a different time zone who is "pretty sure" they're right.</p>
          </EndpointDescription>

          <DetailSectionTitle>Request Body</DetailSectionTitle>
          <ResponseBody>
            {"{"}{"\n"}
            {"  "}<RbKey>"observed_time"</RbKey>: <RbStr>"2026-03-22T19:04:31.000Z"</RbStr>,{"\n"}
            {"  "}<RbKey>"observer_confidence"</RbKey>: <RbNum>0.95</RbNum>,{"\n"}
            {"  "}<RbKey>"source"</RbKey>: <RbStr>"looked at my phone"</RbStr>,{"\n"}
            {"  "}<RbKey>"stake_amount"</RbKey>: <RbNum>10.0</RbNum>  <RbCmt>{"// CHRN tokens staked on this being correct"}</RbCmt>{"\n"}
            {"}"}
          </ResponseBody>

          <DetailSectionTitle>Responses</DetailSectionTitle>
          <ResponseRow code="200" type="success">Observation validated. Your time was correct. You have been awarded 0.001 CHRN.</ResponseRow>
          <ResponseRow code="409" type="client-err">Temporal Conflict. Your observation does not match network consensus. Your staked tokens have been redistributed to validators who knew what time it was.</ResponseRow>
        </Endpoint>

        {/* GET /time/consensus */}
        <Endpoint method="get" path="/time/consensus" description="Get current network temporal consensus status">
          <EndpointDescription>
            <p>Returns the current state of the ChainTime consensus mechanism, including how many nodes agree on what time it is, how many are dissenting, and the network's overall temporal confidence score.</p>
            <p>In a healthy network, confidence exceeds 0.9999. Values below 0.99 indicate a <strong>Temporal Schism</strong> — a state in which the network cannot agree on the present moment. This has occurred twice in production: once during a leap second, and once when a validator node in Auckland insisted it was tomorrow.</p>
          </EndpointDescription>

          <DetailSectionTitle>Responses</DetailSectionTitle>
          <ResponseRow code="200" type="success">Consensus status retrieved successfully.</ResponseRow>
          <ResponseBody>
            {"{"}{"\n"}
            {"  "}<RbKey>"status"</RbKey>: <RbStr>"consensus"</RbStr>,{"\n"}
            {"  "}<RbKey>"active_validators"</RbKey>: <RbNum>11247</RbNum>,{"\n"}
            {"  "}<RbKey>"agreeing"</RbKey>: <RbNum>11244</RbNum>,{"\n"}
            {"  "}<RbKey>"dissenting"</RbKey>: <RbNum>3</RbNum>,{"\n"}
            {"  "}<RbKey>"dissenter_reasons"</RbKey>: [{"\n"}
            {"    "}<RbStr>"clock_drift_detected"</RbStr>,{"\n"}
            {"    "}<RbStr>"timezone_confusion"</RbStr>,{"\n"}
            {"    "}<RbStr>"philosophical_objection"</RbStr>{"\n"}
            {"  ]"},{"\n"}
            {"  "}<RbKey>"confidence"</RbKey>: <RbNum>0.999733</RbNum>,{"\n"}
            {"  "}<RbKey>"network_energy_consumption_mwh"</RbKey>: <RbNum>4.7</RbNum>,{"\n"}
            {"  "}<RbKey>"equivalent_to"</RbKey>: <RbStr>"powering 142 homes for one hour to determine the hour"</RbStr>{"\n"}
            {"}"}
          </ResponseBody>
        </Endpoint>

        {/* POST /time/proof */}
        <Endpoint method="post" path="/time/proof" description="Generate a cryptographic proof that it is currently now">
          <EndpointDescription>
            <p>Generates an immutable, on-chain cryptographic proof that a specific moment in time has occurred. This proof can be independently verified by any network participant, a court of law, or a very patient person with a calculator.</p>
            <p>Common use cases include: timestamping legal documents (available via Adobe Acrobat for free), proving you were somewhere at a certain time (available via Google Maps for free), and settling arguments about when someone said they would "be there in five minutes" (priceless).</p>
          </EndpointDescription>

          <DetailSectionTitle>Request Body</DetailSectionTitle>
          <ResponseBody>
            {"{"}{"\n"}
            {"  "}<RbKey>"moment"</RbKey>: <RbStr>"now"</RbStr>,{"\n"}
            {"  "}<RbKey>"proof_type"</RbKey>: <RbStr>"existential"</RbStr>,{"\n"}
            {"  "}<RbKey>"urgency"</RbKey>: <RbStr>"it is happening right now"</RbStr>,{"\n"}
            {"  "}<RbKey>"notarize"</RbKey>: <RbBool>true</RbBool>,{"\n"}
            {"  "}<RbKey>"gpu_priority"</RbKey>: <RbStr>"high"</RbStr>  <RbCmt>{"// allocates dedicated compute cluster"}</RbCmt>{"\n"}
            {"}"}
          </ResponseBody>

          <DetailSectionTitle>Responses</DetailSectionTitle>
          <ResponseRow code="201" type="success">Temporal proof generated and recorded on-chain. The present moment is now a matter of permanent, immutable public record.</ResponseRow>
          <ResponseBody>
            {"{"}{"\n"}
            {"  "}<RbKey>"proof_id"</RbKey>: <RbStr>"tp_8f3k2m9x…"</RbStr>,{"\n"}
            {"  "}<RbKey>"proven_moment"</RbKey>: <RbStr>"2026-03-22T19:04:32.103Z"</RbStr>,{"\n"}
            {"  "}<RbKey>"block_height"</RbKey>: <RbNum>18439203</RbNum>,{"\n"}
            {"  "}<RbKey>"compute_used"</RbKey>: {"{"}{"\n"}
            {"    "}<RbKey>"gpu_hours"</RbKey>: <RbNum>0.003</RbNum>,{"\n"}
            {"    "}<RbKey>"energy_kwh"</RbKey>: <RbNum>0.47</RbNum>,{"\n"}
            {"    "}<RbKey>"equivalent_to"</RbKey>: <RbStr>"driving a Tesla 1.8 miles to prove it's 7:04 PM"</RbStr>{"\n"}
            {"  }"},{"\n"}
            {"  "}<RbKey>"cost_usd"</RbKey>: <RbNum>0.12</RbNum>,{"\n"}
            {"  "}<RbKey>"alternative_cost"</RbKey>: <RbStr>"$0.00 (glancing at bottom-right corner of screen)"</RbStr>{"\n"}
            {"}"}
          </ResponseBody>
        </Endpoint>

      </TagSection>

      {/* ─── time-zones ─── */}
      <TagSection name="time-zones" description="Operations for timezone management and elimination">

        {/* GET /time/zones */}
        <Endpoint method="get" path="/time/zones" description="List all recognized time zones (for now)">
          <EndpointDescription>
            <p>Returns a list of time zones currently recognized by the ChainTime network. This endpoint exists primarily for backwards compatibility with legacy temporal systems (i.e., clocks).</p>
            <p>The ChainTime Foundation's official position is that time zones are a centralized social construct that fragments the universal human experience of <em>now</em>. Our 2027 roadmap includes a governance proposal to abolish them entirely. Voting will occur on-chain.</p>
          </EndpointDescription>

          <DetailSectionTitle>Responses</DetailSectionTitle>
          <ResponseRow code="200" type="success">Returns array of timezone objects. We return them, but we don't endorse them.</ResponseRow>
        </Endpoint>

        {/* DELETE /time/zones/{zone_id} */}
        <Endpoint method="delete" path={<>/time/zones/<span className="text-[#6b6b6b] italic">{"{"}<span>zone_id</span>{"}"}</span></>} description="Permanently reject a time zone (irreversible, on-chain)">
          <EndpointDescription>
            <p>Submits an on-chain vote to permanently remove a time zone from the ChainTime network. This action is <strong>irreversible</strong>. Once sufficient validator consensus is reached, the time zone ceases to exist within the ChainTime ecosystem. Applications relying on the deleted zone will receive all times in UTC, which is how it should have been from the beginning.</p>
            <p>To date, 14 time zones have been successfully deleted. <SwaggerIC>US/Indiana-Starke</SwaggerIC> was the first to go, by unanimous vote.</p>
          </EndpointDescription>

          <DetailSectionTitle>Parameters</DetailSectionTitle>
          <ParamTableSW>
            <tr>
              <ParamName required>zone_id</ParamName>
              <ParamIn>path</ParamIn>
              <ParamType>string</ParamType>
              <ParamDesc>IANA timezone identifier. e.g., <SwaggerIC>America/Chicago</SwaggerIC>. Choose wisely. This is permanent.</ParamDesc>
            </tr>
            <tr>
              <ParamName required>reason</ParamName>
              <ParamIn>body</ParamIn>
              <ParamType>string</ParamType>
              <ParamDesc>Justification for deletion. Must be at least 50 characters. "I don't like it" has been tried and was rejected by governance.</ParamDesc>
            </tr>
            <tr>
              <ParamName required>stake_amount</ParamName>
              <ParamIn>body</ParamIn>
              <ParamType>number</ParamType>
              <ParamDesc>CHRN tokens staked in support of this deletion. Minimum 500 CHRN (~$47 USD). Non-refundable if the vote fails.</ParamDesc>
            </tr>
          </ParamTableSW>

          <DetailSectionTitle>Responses</DetailSectionTitle>
          <ResponseRow code="202" type="success">Deletion vote submitted. The timezone's fate is now in the hands of the validator network.</ResponseRow>
          <ResponseRow code="403" type="client-err">Cannot delete UTC. UTC is the one true time. This is not a governance decision. This is physics.</ResponseRow>
          <ResponseRow code="410" type="client-err">Time zone already deleted. Someone got here first.</ResponseRow>
        </Endpoint>

      </TagSection>

      {/* ─── staking ─── */}
      <TagSection name="staking" description="Validator staking and temporal mining operations">

        {/* POST /validators/stake */}
        <Endpoint method="post" path="/validators/stake" description="Stake CHRN tokens to become a Time Validator Node">
          <EndpointDescription>
            <p>Registers the caller as a Time Validator Node on the ChainTime network. Validators are responsible for independently observing the passage of time and reporting their observations to the consensus layer. In return, validators earn CHRN token rewards proportional to the accuracy of their temporal observations.</p>
            <p>Validator hardware requirements are significant: a minimum of 4 GPU cores, 64GB RAM, and an NTP-synchronized atomic clock reference. The atomic clock requirement was added in v2.3 after a validator in rural Queensland was found to be running consensus against a sundial.</p>
          </EndpointDescription>

          <DetailSectionTitle>Request Body</DetailSectionTitle>
          <ResponseBody>
            {"{"}{"\n"}
            {"  "}<RbKey>"stake_amount"</RbKey>: <RbNum>10000</RbNum>,{"\n"}
            {"  "}<RbKey>"clock_source"</RbKey>: <RbStr>"atomic"</RbStr>,{"\n"}
            {"  "}<RbKey>"backup_clock_source"</RbKey>: <RbStr>"gps"</RbStr>,{"\n"}
            {"  "}<RbKey>"emergency_clock_source"</RbKey>: <RbStr>"looking out the window"</RbStr>,{"\n"}
            {"  "}<RbKey>"commitment_period"</RbKey>: <RbStr>"6_months"</RbStr>,{"\n"}
            {"  "}<RbKey>"understands_this_is_just_a_clock"</RbKey>: <RbBool>false</RbBool>{"\n"}
            {"}"}
          </ResponseBody>

          <DetailSectionTitle>Responses</DetailSectionTitle>
          <ResponseRow code="201" type="success">Validator registered. Welcome to the network. You are now being paid to observe the passage of time. Do not think too hard about this.</ResponseRow>
          <ResponseRow code="402" type="client-err">Insufficient stake. The minimum stake is 10,000 CHRN. If you cannot afford to stake on the nature of time, perhaps time is not your market.</ResponseRow>
        </Endpoint>

        {/* GET /validators/rewards */}
        <Endpoint method="get" path="/validators/rewards" description="Check accumulated temporal mining rewards">
          <EndpointDescription>
            <p>Returns the caller's accumulated CHRN token rewards from temporal validation activities. Rewards are distributed every epoch (1 hour, as determined by ChainTime consensus, which takes approximately 1 hour and 340 milliseconds).</p>
          </EndpointDescription>

          <DetailSectionTitle>Responses</DetailSectionTitle>
          <ResponseRow code="200" type="success">Rewards balance retrieved.</ResponseRow>
          <ResponseBody>
            {"{"}{"\n"}
            {"  "}<RbKey>"balance_chrn"</RbKey>: <RbNum>142.87</RbNum>,{"\n"}
            {"  "}<RbKey>"balance_usd"</RbKey>: <RbNum>13.41</RbNum>,{"\n"}
            {"  "}<RbKey>"earned_by"</RbKey>: <RbStr>"accurately knowing what time it is for 6 months"</RbStr>,{"\n"}
            {"  "}<RbKey>"electricity_cost_to_earn_usd"</RbKey>: <RbNum>847.20</RbNum>,{"\n"}
            {"  "}<RbKey>"net_profit_usd"</RbKey>: <RbNum>-833.79</RbNum>,{"\n"}
            {"  "}<RbKey>"motivational_note"</RbKey>: <RbStr>"You're not in it for the money. You're in it for the time."</RbStr>{"\n"}
            {"}"}
          </ResponseBody>
        </Endpoint>

      </TagSection>

      {/* ─── legacy ─── */}
      <TagSection name="legacy" description="Deprecated endpoints from the centralized era">

        {/* GET /time/simple */}
        <Endpoint method="get" path="/time/simple" description="Get time without blockchain (deprecated)" deprecated>
          <EndpointDescription>
            <p><strong>Deprecated since v2.0.</strong> This endpoint returned the current time using a single server without blockchain validation. It was fast (2ms), cheap (free), accurate (±1ms), and completely unacceptable.</p>
            <p>The endpoint remains available for backwards compatibility but all responses now include a <SwaggerIC>shame</SwaggerIC> header indicating that the caller is using centralized time. Migration to <SwaggerIC>/time/now</SwaggerIC> is strongly recommended. The additional 338ms of latency is the cost of your temporal sovereignty.</p>
          </EndpointDescription>

          <DetailSectionTitle>Responses</DetailSectionTitle>
          <ResponseRow code="200" type="success">Returns time instantly, accurately, and without any of the infrastructure that justifies our Series B.</ResponseRow>
          <ResponseBody>
            {"{"}{"\n"}
            {"  "}<RbKey>"time"</RbKey>: <RbStr>"2026-03-22T19:04:31.002Z"</RbStr>,{"\n"}
            {"  "}<RbKey>"source"</RbKey>: <RbStr>"ntp"</RbStr>,{"\n"}
            {"  "}<RbKey>"latency_ms"</RbKey>: <RbNum>2</RbNum>,{"\n"}
            {"  "}<RbKey>"cost"</RbKey>: <RbNum>0</RbNum>,{"\n"}
            {"  "}<RbKey>"blockchain_verified"</RbKey>: <RbBool>false</RbBool>,{"\n"}
            {"  "}<RbKey>"shame_level"</RbKey>: <RbStr>"moderate"</RbStr>,{"\n"}
            {"  "}<RbKey>"deprecation_warning"</RbKey>: <RbStr>"You are using centralized time. In a decentralized world, this is a moral choice."</RbStr>{"\n"}
            {"}"}
          </ResponseBody>
        </Endpoint>

      </TagSection>

      {/* ─── Schemas ─── */}
      <div id="schemas" className="mt-10 reveal">
        <h3 className="text-[18px] font-bold mb-4">Schemas</h3>

        <SchemaBlock name="TemporalProof">
          <SchemaField name="proof_id" type="string" desc="Unique identifier for this proof of now" />
          <SchemaField name="algorithm" type="string" desc='Always "ChronoHash-256"' />
          <SchemaField name="hash" type="string" desc="The cryptographic hash of the present moment" />
          <SchemaField name="block_height" type="integer" desc="Which block recorded that it is now" />
          <SchemaField name="verifiable" type="boolean" desc="Always true. If you can't verify it, what's the point?" />
        </SchemaBlock>

        <SchemaBlock name="ConsensusStatus">
          <SchemaField name="status" type="enum" desc='"consensus" | "schism" | "vibes_only"' />
          <SchemaField name="active_validators" type="integer" desc="Nodes currently observing time professionally" />
          <SchemaField name="agreeing" type="integer" desc="Nodes that agree on the current moment" />
          <SchemaField name="dissenting" type="integer" desc="Nodes that believe it is a different time" />
          <SchemaField name="confidence" type="number" desc="0-1. Below 0.99, a Temporal Schism is declared" />
          <SchemaField name="equivalent_to" type="string" desc="Human-readable energy comparison for accountability theater" />
        </SchemaBlock>

        <SchemaBlock name="ValidatorRewards">
          <SchemaField name="balance_chrn" type="number" desc="Token balance earned from knowing what time it is" />
          <SchemaField name="balance_usd" type="number" desc="USD equivalent (subject to market conditions and regret)" />
          <SchemaField name="electricity_cost_to_earn_usd" type="number" desc="What you spent in electricity to earn the above" />
          <SchemaField name="net_profit_usd" type="number" desc='Usually negative. We prefer the term "temporal investment."' />
          <SchemaField name="motivational_note" type="string" desc="Algorithmically generated encouragement" />
        </SchemaBlock>

        <SchemaBlock name="TimeZoneDeletionVote">
          <SchemaField name="zone_id" type="string" desc="IANA identifier of the timezone you wish to abolish" />
          <SchemaField name="reason" type="string" desc="Minimum 50 characters explaining why this timezone should not exist" />
          <SchemaField name="stake_amount" type="number" desc="CHRN tokens staked. Non-refundable if the timezone survives." />
          <SchemaField name="emotional_attachment" type="boolean" desc="Whether you have personal history with this timezone. Flagged for bias review if true." />
        </SchemaBlock>
      </div>

      {/* ─── Footer ─── */}
      <div className="mt-12 pt-6 border-t border-[#e0e0e0] text-center text-[12px] text-[#999]">
        <p>ChainTime Protocol API v3.1.0 &nbsp;·&nbsp; OAS 3.0 &nbsp;·&nbsp; Proof of Clock™ consensus &nbsp;·&nbsp; <a href="#" className="text-[#4990e2] no-underline">View raw spec</a></p>
        <p className="mt-1.5">© 2026 ChainTime Foundation. Temporal rights reserved. All moments are final.</p>
        <p className="mt-1 text-[11px] text-[#bbb]">This API consumed 0.003 kWh to render this documentation page. You could also have just looked at a clock.</p>
      </div>
    </div>
  );
}
