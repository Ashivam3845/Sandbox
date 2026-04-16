import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const breachDataset = {
  id: 'breach',
  banner: {
    title: 'TechVenture LLC v. InnovateSoft Corp',
    location: 'Delaware Court of Chancery',
    date: 'March 2024',
    type: 'Breach of Contract'
  },
  stats: {
    strength: '72%',
    risk: 'Medium',
    confidence: '88%',
    range: '$800k - $1.2M',
    summary: 'The dispute centers around InnovateSoft Corp\'s failure to deliver the agreed AI customer retention platform by September 15, 2024. Plaintiff seeks $2.3M in expectation damages for projected lost revenue. The core legal contention involves the enforceability of these speculative lost profits and whether TechVenture\'s undocumented scope additions constituted interference.'
  },
  views: {
    plaintiff: (
      <>
        <p>Based on my analysis of the TechVenture LLC v. InnovateSoft Corp case, I identify strong grounds for the plaintiff's claim:</p>
        <br/>
        <p><strong>**Breach of Contract Elements:**</strong></p>
        <ol className="markdown-list">
          <li><strong>**Valid Contract:**</strong> The Software Development Agreement (March 15, 2024) contains clear deliverables, timeline (6 months - due Sept 15, 2024), and compensation terms ($850,000)</li>
          <li><strong>**Material Breach:**</strong> InnovateSoft failed to deliver any functional prototype by the deadline, despite receiving 80% payment ($680,000)</li>
          <li><strong>**Causation:**</strong> The delay directly prevented TechVenture from launching their Q4 2024 customer retention campaign</li>
          <li><strong>**Quantifiable Damages:**</strong> $2.3M in documented lost revenue from delayed product launch</li>
        </ol>
        <br/>
        <p><strong>**Supporting Evidence:**</strong></p>
        <ul className="markdown-list unstyled">
          <li>- Email chain (April-August 2024) showing InnovateSoft's repeated missed milestones</li>
          <li>- Third-party expert testimony confirming the 6-month timeline was industry-standard for this scope</li>
          <li>- TechVenture's financial records showing projected vs. actual Q4 revenue</li>
        </ul>
        <br/>
        <p><strong>**Legal Precedent:**</strong></p>
        <p><em>*Hadley v. Baxendale*</em> (1854) establishes foreseeability standard for consequential damages. InnovateSoft was explicitly aware of the Q4 launch deadline and revenue projections in Exhibit B of the contract.</p>
        <br/>
        <div className="citations-block">
          <span className="text-xs">CITATIONS</span>
          <ul className="citations-list mt-2">
            <li><CheckCircle2 size={16} className="text-safe"/> Software Development Agreement (March 15, 2024)</li>
            <li><CheckCircle2 size={16} className="text-safe"/> Hadley v. Baxendale, 9 Ex. 341 (1854)</li>
            <li><CheckCircle2 size={16} className="text-safe"/> Restatement (Second) of Contracts § 351</li>
          </ul>
        </div>
      </>
    ),
    defendant: (
      <>
        <p>Evaluating potential defenses for InnovateSoft Corp, there are several mitigating factors and counter-arguments:</p>
        <br/>
        <p><strong>**Defense Arguments:**</strong></p>
        <ol className="markdown-list">
          <li><strong>**Substantial Performance / Interference:**</strong> InnovateSoft's delay was primarily caused by TechVenture's failure to provide essential API access tokens and data schemas until late July 2024.</li>
          <li><strong>**Scope Creep:**</strong> The "AI-powered customer analytics" functionality was repeatedly redefined by TechVenture in June and August, materially altering the initial contract scope.</li>
          <li><strong>**Damages Certainty:**</strong> The $2.3M lost revenue figure is highly speculative for a new Q4 retention campaign lacking established historical run rates.</li>
          <li><strong>**Duty to Mitigate:**</strong> Claimants took no reasonable steps to mitigate damages, such as deploying the base platform delivered on September 20.</li>
        </ol>
        <br/>
        <p><strong>**Supporting Evidence:**</strong></p>
        <ul className="markdown-list unstyled">
          <li>- Project management logs documented scope adjustments and blocker dependencies awaiting TechVenture approval</li>
          <li>- Delivery acceptance of the platform's core architecture on September 20</li>
        </ul>
        <br/>
        <p><strong>**Legal Precedent:**</strong></p>
        <p><em>*Rockingham County v. Luten Bridge Co.*</em> (1929) establishes that a party has a duty to mitigate losses. Additionally under UCC § 2-508, the seller may cure non-conforming delivery if time remains or if they had reasonable grounds to believe it would be acceptable.</p>
        <br/>
        <div className="citations-block">
          <span className="text-xs">CITATIONS</span>
          <ul className="citations-list mt-2">
            <li><CheckCircle2 size={16} className="text-safe"/> Rockingham County v. Luten Bridge Co. (1929)</li>
            <li><CheckCircle2 size={16} className="text-safe"/> Restatement (Second) of Contracts § 350</li>
            <li><CheckCircle2 size={16} className="text-safe"/> UCC § 2-508</li>
          </ul>
        </div>
      </>
    ),
    neutral: (
      <>
        <p>An impartial assessment suggests liability on both sides, making the probability of a mixed outcome significantly high.</p>
        <br/>
        <p><strong>**Key Neutral Observations:**</strong></p>
        <ol className="markdown-list">
          <li><strong>**Breach Likelihood:**</strong> InnovateSoft likely breached the strict 6-month deadline, as the platform was incomplete by Sept 15. However, strict adherence may be challenged under the *substantial performance* doctrine since delivery occurred closely thereafter (Sept 20).</li>
          <li><strong>**Culpability Distribution:**</strong> The contract lacked a stringent integration clause managing scope creep, creating ambiguity over changes requested by TechVenture in June/August.</li>
          <li><strong>**Damages Valuation:**</strong> Expectation damages of $2.3M are vulnerable to attack as overly speculative. A court is more likely to award reliance damages or a fraction of the expectation damages if causation cannot be hermetically tied to the 5-day delay.</li>
        </ol>
        <br/>
        <p><strong>**Settlement Feasibility:**</strong></p>
        <p>Given the mutual missteps in contract management, exploring settlement ranges between $800,000 and $1,100,000 avoids the severe litigation risk InnovateSoft faces and the speculative damages threshold TechVenture must meet to prove the $2.3M figure.</p>
      </>
    )
  },
  references: [
    { 
      title: 'Hadley v. Baxendale', 
      year: '1854', 
      match: '96%', 
      desc: 'Foundational case for foreseeability standard in consequential damages. Establishes that damages must arise naturally or be in contemplation of both parties at contract formation.',
      caseDetails: 'The plaintiffs operated a mill, and a crank shaft broke, halting operations. They contracted the defendants (carriers) to deliver the shaft to engineers for a replacement. Deliveries were delayed, resulting in significant lost profits for the plaintiffs.',
      plaintiffRemarks: 'The plaintiffs argued that the carriers breached the delivery contract and must be liable for the extensive lost profits incurred while the mill was non-operational.',
      defendantRemarks: 'The carriers countered that they were not made aware that the mill\'s functioning depended entirely on this single swift delivery and that such damages were generally unforeseen.',
      finalVerdict: 'The court ruled for the defendants, establishing the rule that consequential damages must be foreseeable by both parties at the time of contract formation. Because the necessity of the shaft for operations was not explicitly communicated, the loss was deemed unforeseeable.'
    },
    { 
      title: 'Rockingham County v. Luten Bridge Co.', 
      year: '1929', 
      match: '89%', 
      desc: 'Establishes duty to mitigate damages. Party cannot recover for losses that could have been avoided through reasonable effort after breach discovered.',
      caseDetails: 'Rockingham County contracted Luten Bridge Co. to construct a bridge. The County later voted to rescind the contract and told Luten to stop working. Luten ignored the notice, completed the bridge, and sued for the full contract price.',
      plaintiffRemarks: 'Luten Bridge Co. argued they were upholding their end of the legally binding construction contract and deserved full payment for the completed commercial work.',
      defendantRemarks: 'Rockingham County argued they explicitly canceled the contract midway, meaning the builder had a responsibility to cease operations to prevent further costs from accumulating.',
      finalVerdict: 'The court ruled that a non-breaching party has a duty to mitigate damages. Luten could only recover damages incurred up to the point of cancellation plus anticipated profit, rejecting compensation for work done after the breach notification.'
    },
    { 
      title: 'Freund v. Washington Square Press', 
      year: '1974', 
      match: '87%', 
      desc: 'Lost profits must be proven with reasonable certainty. Speculative damages for new business ventures face higher burden of proof.',
      caseDetails: 'An author sued his publisher for failing to publish his manuscript. The author claimed expectation damages based on potential royalties the book might have earned.',
      plaintiffRemarks: 'The author demanded damages equivalent to the specific anticipated royalties lost as a direct result of the publisher refusing to bind and distribute the manuscript.',
      defendantRemarks: 'The publisher maintained that projecting sales for an unpublished book was fundamentally speculative and lacked the certainty required for legal damages computation.',
      finalVerdict: 'The court agreed with the publisher. Damages for lost anticipated royalties were too speculative to award. The author was limited to nominal damages, asserting that lost profits must be proven with reasonable certainty.'
    },
    { 
      title: 'Kel Kim Corp. v. Central Markets', 
      year: '1987', 
      match: '82%', 
      desc: 'Force majeure requires unforeseeability and impossibility of performance, not mere difficulty or increased cost. Alternative means of performance preclude defense.',
      caseDetails: 'A roller skating rink lost its liability insurance and was unable to secure a replacement. The landlord terminated the lease, and the tenant claimed impossibility of performance under the force majeure clause.',
      plaintiffRemarks: 'The tenant argued that an industry-wide insurance crisis constituted an unforeseeable impossibility, thereby triggering the protective force majeure clause within the lease.',
      defendantRemarks: 'The landlord stated that failing to procure insurance was merely a business difficulty, not an objective impossibility, and did not fit the narrow scope of the contract\'s explicit force majeure wording.',
      finalVerdict: 'The court ruled for the landlord, finding that force majeure clauses are narrowly construed and applying only to listed events. The inability to get insurance did not legally constitute an absolute impossibility.'
    }
  ],
  facts: [
    { title: 'Software Development Contract', match: '94%' },
    { title: 'Consequential Damages Claim', match: '91%' },
    { title: 'Specification Changes', match: '86%' },
    { title: 'Delaware Jurisdiction', match: '88%' }
  ],
  legal: [
    { title: 'UCC § 2-615', desc: 'Excuse by failure of presupposed conditions. Applies to impossibility and impracticability defenses in commercial contracts.' },
    { title: 'Restatement (Second) § 237', desc: 'Effect of uncertainty as to order of performances. Defines conditions precedent and concurrent conditions in contracts.' },
    { title: 'Restatement (Second) § 241', desc: 'Circumstances significant in determining material breach. Five-factor test for assessing breach severity and remedies.' },
    { title: 'Restatement (Second) § 351', desc: 'Unforeseeability and related limitations on damages. Codifies Hadley v. Baxendale foreseeability standard.' }
  ],
  depth: { scanned: '2,847', verified: '156', jurisdictions: '12' }
};

export const patentDataset = {
  id: 'patent',
  banner: {
    title: 'PulseCharging v. OmniTech',
    location: 'N.D. California',
    date: 'April 2025',
    type: 'Patent Infringement'
  },
  stats: {
    strength: '84%',
    risk: 'High',
    confidence: '92%',
    range: '$4.5M - $7.0M',
    summary: 'Infringement claim regarding U.S. Patent No. 10,XXX,XXX governing inductive wireless charging coil arrays. OmniTech claims the patent is invalid due to obviousness over prior art (Smith 2018). High damages potential given OmniTech\'s global product distribution volume.'
  },
  views: {
    plaintiff: (
      <>
        <p>Based on my analysis of the PulseCharging v. OmniTech case, I identify exceptional grounds for the plaintiff's infringement claim:</p>
        <br/>
        <p><strong>**Infringement Elements:**</strong></p>
        <ol className="markdown-list">
          <li><strong>**Valid Patent Title:**</strong> PulseCharging holds valid title to the \'XXX patent covering the specific interleaving coil structures.</li>
          <li><strong>**Direct Infringement:**</strong> Reverse engineering of OmniTech's "PowerPad Pro" clearly demonstrates a 1:1 mapping of all elements of Claim 1.</li>
          <li><strong>**Willfulness:**</strong> OmniTech engaged in licensing discussions in 2023 but abruptly severed communications before launching the exact technology.</li>
        </ol>
        <br/>
        <div className="citations-block">
          <span className="text-xs">CITATIONS</span>
          <ul className="citations-list mt-2">
            <li><CheckCircle2 size={16} className="text-safe"/> U.S. Patent No. 10,XXX,XXX</li>
            <li><CheckCircle2 size={16} className="text-safe"/> 35 U.S.C. § 271(a)</li>
            <li><CheckCircle2 size={16} className="text-safe"/> Halo Electronics, Inc. v. Pulse Electronics, Inc. (2016)</li>
          </ul>
        </div>
      </>
    ),
    defendant: (
      <>
        <p>OmniTech has a strong invalidity defense under 35 U.S.C. § 103:</p>
        <br/>
        <p><strong>**Defense Arguments:**</strong></p>
        <ol className="markdown-list">
          <li><strong>**Obviousness:**</strong> The specific interleaving of coils was detailed in the "Smith 2018" academic paper published at IEEE. The \'XXX patent is merely an obvious combination of Smith and standard PCB manufacturing techniques.</li>
          <li><strong>**Non-Infringement:**</strong> If valid, OmniTech's device utilizes a slightly different voltage threshold trigger which arguably falls outside the scope of the patent claims under the Doctrine of Equivalents.</li>
        </ol>
        <br/>
        <div className="citations-block">
          <span className="text-xs">CITATIONS</span>
          <ul className="citations-list mt-2">
            <li><CheckCircle2 size={16} className="text-safe"/> 35 U.S.C. § 103</li>
            <li><CheckCircle2 size={16} className="text-safe"/> KSR Int\'l Co. v. Teleflex Inc. (2007)</li>
            <li><CheckCircle2 size={16} className="text-safe"/> Warner-Jenkinson Co. v. Hilton Davis Chemical Co. (1997)</li>
          </ul>
        </div>
      </>
    ),
    neutral: (
      <>
        <p>This is a high stakes litigation with bimodal outcomes.</p>
        <p>If PulseCharging survives the inevitable *Inter Partes* Review (IPR) challenge at the PTAB, OmniTech faces severe damages due to willful infringement indications. However, the Smith 2018 prior art presents a massive hurdle for PulseCharging. A settlement via a standard FRAND or tiered cross-licensing arrangement is mathematically optimal for both entities to hedge risk.</p>
      </>
    )
  },
  references: [
    { 
      title: 'KSR Int\'l Co. v. Teleflex Inc.', 
      year: '2007', 
      match: '98%', 
      desc: 'Redefines the standard for obviousness, rejecting the rigid TSM test in favor of a more flexible "common sense" approach.',
      caseDetails: 'Teleflex sued KSR for infringing a patent on an adjustable gas pedal with an electronic sensor. KSR argued the patent was invalid as obvious, as combining adjustable pedals with electronic sensors was known in the automotive industry.',
      plaintiffRemarks: 'Teleflex argued that under the rigid "Teaching, Suggestion, or Motivation" (TSM) test, there was no explicit prior art instructing the combination of these specific mechanical parameters.',
      defendantRemarks: 'KSR rebutted that any person having ordinary skill in the art (PHOSITA) would naturally combine an electronic sensor with an adjustable pedal given the industry shift towards electronic throttle controls.',
      finalVerdict: 'The Supreme Court ruled unanimously for KSR, rejecting the rigid TSM test. They established that a patent is obvious if the combination is an predictable variation of prior art elements using common sense.'
    },
    { 
      title: 'Halo Electronics, Inc. v. Pulse Electronics', 
      year: '2016', 
      match: '94%', 
      desc: 'Lowers the bar for proving willful infringement, allowing for enhanced damages under 35 U.S.C. § 284.',
      caseDetails: 'Halo sued Pulse for copying their surface mount transformers. The district court found infringement but denied enhanced damages because pulse had established a "reasonable defense" during trial.',
      plaintiffRemarks: 'Halo maintained that Pulse deliberately copied their proprietary transformer architecture long before litigation started, and that creating a reasonable defense later at trial shouldn\'t absolve pre-litigation culpability.',
      defendantRemarks: 'Pulse argued that because they presented a reasonable defense of invalidity during litigation, their actions were not objectively reckless under previous stringent Federal Circuit standards.',
      finalVerdict: 'The Supreme Court ruled for Halo, holding that willful infringement should be assessed based on the infringer\'s subjective culpability at the time of the infringement, paving the way for easier enhanced treble damages.'
    },
    { 
      title: 'eBay Inc. v. MercExchange, L.L.C.', 
      year: '2006', 
      match: '80%', 
      desc: 'Establishes that permanent injunctions are not automatically issued upon a finding of patent infringement.',
      caseDetails: 'MercExchange held a business method patent for electronic markets and sued eBay over its "Buy It Now" functionality. After winning damages, MercExchange sought a permanent injunction to shut down the feature.',
      plaintiffRemarks: 'MercExchange argued that, per historical norms, discovering valid patent infringement should automatically trigger a permanent injunction protecting their property rights.',
      defendantRemarks: 'eBay claimed an injunction would cause catastrophic harm to their platform and the public interest, far outweighing the damages suffered by the non-practicing entity (MercExchange).',
      finalVerdict: 'The Supreme Court ruled for eBay, stating that an injunction should not automatically issue based merely on a finding of patent infringement. The standard four-factor equity test must be applied.'
    }
  ],
  facts: [
    { title: 'Inductive Coil Architecture', match: '99%' },
    { title: 'Willful Infringement Claim', match: '92%' },
    { title: 'Prior Art Defense (Academic)', match: '85%' },
    { title: 'NDCA Patent Local Rules', match: '91%' }
  ],
  legal: [
    { title: '35 U.S.C. § 103', desc: 'Conditions for patentability; non-obvious subject matter.' },
    { title: '35 U.S.C. § 271(a)', desc: 'Infringement of patent standard framework.' },
    { title: '35 U.S.C. § 284', desc: 'Damages. Court may increase the damages up to three times the amount found or assessed (enhanced damages).' }
  ],
  depth: { scanned: '5,102', verified: '203', jurisdictions: '3' }
};
