# Research and CV update

Approved in the ongoing conversation on 2026-11-11; execute without another approval gate.

## Intent and scope

- Keep AI for EDA as the overarching research theme and the current three-card layout.
- Card 01: ML for Physical Design. Combine the existing algorithm-discovery and physical-design directions. Link TAPCO, TAPCO-G, and HyPAS separately; omit contest links here.
- Card 02: ML for Logic Synthesis. Explain online learning and evolutionary search; retain relevant logic-synthesis contest evidence.
- Card 03: LLM-Guided RTL Recovery. Explain LLMs and formal verification; link RTLREX, the DATE 2024 paper, and the relevant RTL-recovery contest.
- Add TAPCO-G as independent P3, explicitly Preprint, in More; preserve the current four Selected records. Add November news with an arXiv link and host its PDF locally. Copy authors and contribution status from arXiv v1, not from TAPCO's conference version.
- Group CV publications as Conference Papers, Journal Papers, Preprints; reverse chronological within each, preserving C/J/P identities. Full CVs include TAPCO-G, RTLREX, and Trinity; the two-page selected CV prioritizes the two first-author preprints while retaining two pages and existing font sizes. Place its selected bibliography after experience/skills like Full so its section title stays with the first record.
- Synchronize the public CV source and three public PDF aliases, local CV source and Full/2Page PDFs, current-use full-CV mirrors and existing current ZIP bundles. Preserve public/private contact differences and the private CV's existing exclusion of the oracle-bone journal article. Leave Original and historical archives untouched.
- Push the public website and private profile repositories, verify Pages deployment and live files, and synchronize the user's original checkouts without touching unrelated changes.

## Exact research copy

1. ML for Physical Design: Combining LLM-guided algorithm discovery and learned models to optimize timing, power, placement, and cell sizing.
2. ML for Logic Synthesis: Combining online learning and evolutionary search to discover synthesis strategies that produce smaller, faster circuits.
3. LLM-Guided RTL Recovery: Recovering compact, functionally equivalent RTL from gate-level circuits with LLMs and formal verification.

## Approach

Use the existing JSON content, native publication renderer, and shared LuaLaTeX CV source. Rejected alternatives: merging TAPCO and TAPCO-G records (the user requires separate entries); mixing preprints into formal conference/journal counts; compressing fonts to force the short CV onto two pages. No new frontend framework, images, or navigation behavior.

## Verification

Check official arXiv metadata and local PDF, contest-topic mapping, four Selected versus More, separate BibTeX records, hidden-paper anchors, links opening in new tabs, light/dark mobile/desktop layout, exact public asset manifest, CV group order/labels/metadata, PDF pagination and clipping, public-contact privacy, duplicate public-CV hashes, unchanged unrelated files, both GitHub heads, and the live deployment.
