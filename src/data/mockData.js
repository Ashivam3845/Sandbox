export const mockCases = [
  {
    id: 'c1',
    title: 'Apple Inc. v. Samsung Electronics Co.',
    date: 'Dec 14, 2012',
    jurisdiction: 'N.D. California',
    verdict: 'Infringement Found',
    score: 85,
    matchReason: 'High match on Claim 4 language and inductive charging constraints.',
    ratioDecidendi: 'The court determined that the defendant\'s continuous energy transfer method constituted direct infringement of the \'915 patent. Specifically, the inclusion of an intermediary magnetic resonance coupling apparatus did not exempt the system from the original claim scope, focusing on the result achieved rather than structural variance.',
    infringementRisk: 'Opposing counsel is likely to argue that our secondary coil configuration functions identically to the infringing devices in Apple v. Samsung. They will focus on the court\'s broad interpretation of "continuous inductive field", applying the doctrine of equivalents to capture our revised layout.',
    defenseStrategy: 'We must distinguish our shielding methodology from the prior art referenced in the Apple verdict. By citing the modified magnetic flux paths in our latest iteration (see Claim 7), we can argue structural uniqueness. Furthermore, we should emphasize US Patent 6,112,014 as an exclusionary prior art not considered in this earlier ruling.'
  },
  {
    id: 'c2',
    title: 'WiTricity Corp. v. Momentum Dynamics',
    date: 'Apr 03, 2019',
    jurisdiction: 'D. Delaware',
    verdict: 'Patent Invalidated',
    score: 72,
    matchReason: 'Similar technology domain (inductive EV charging) but different scale.',
    ratioDecidendi: 'The patents asserted by WiTricity were invalidated under 35 U.S.C. § 101, as the claims were directed toward the natural phenomenon of electromagnetic resonance without adding an inventive concept sufficient to transform the nature of the claim into a patent-eligible application.',
    infringementRisk: 'While the patent was invalidated, plaintiff may use the geometric claim limits established here to argue that our device falls into a pre-existing patentable category if re-examined based on different physical parameters.',
    defenseStrategy: 'Rely heavily on this precedent for an invalidity counter-claim. If their patent rests on standard resonance frequencies (10-15 MHz), we can use the WiTricity ruling to invalidate their claims outright.'
  },
  {
    id: 'c3',
    title: 'Energous Corp. v. Powercast Corp.',
    date: 'Aug 21, 2021',
    jurisdiction: 'W.D. Texas',
    verdict: 'No Infringement',
    score: 64,
    matchReason: 'RF-based wireless charging, differs from our inductive scope.',
    ratioDecidendi: 'The court found no infringement because the defendant\'s system operated via directed RF energy transmission, which fell outside the literal scope of the plaintiff\'s claims requiring "near-field magnetic coupling."',
    infringementRisk: 'Minor risk. Opposing counsel might attempt to blur the lines between near-field and far-field definitions established in this case, but the technical divergence is significant.',
    defenseStrategy: 'If they attempt to interpret "proximity" broadly, use the Powercast decision to firmly delineate the technical boundaries of RF versus inductive paradigms, keeping our product well within the safe harbor.'
  }
];
