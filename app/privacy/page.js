import Nav from '@/components/landing/Nav'
import Footer from '@/components/landing/Footer'

export const metadata = {
  title: 'Privacy Policy | Susea',
  description: 'Privacy Policy for Susea.ai — how AlphaBits Solutions collects, processes, and protects your data on the Susea platform.',
  alternates: { canonical: 'https://susea.ai/privacy' },
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="legal-main">
        <div className="container legal-container">
          <div className="legal-header">
            <span className="eyebrow"><span className="dot"></span> Legal</span>
            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-meta">AlphaBits Solutions · Susea.ai · Last updated: June 13, 2026</p>
          </div>

          <div className="legal-body">

            <h2>1. Introduction and Scope of Policy</h2>
            <p>This Privacy Policy governs the collection, processing, and storage of information by AlphaBits Solutions (owner and operator of the Susea.ai platform, accessible at www.susea.ai), encompassing our logistics automation software, artificial intelligence agent diagnostic tools, Model Context Protocol (MCP) interfaces, and any associated application programming interfaces (APIs) provided on the platform.</p>
            <p>We recognize that modern logistics requires the processing of highly sensitive commercial documentation alongside advanced generative AI capabilities. Consequently, AlphaBits Solutions treats all client data on the Susea.ai platform—including proprietary workflow intelligence, shipment routing information, and AI telemetry—with the utmost confidentiality.</p>
            <p>This document explicitly outlines our practices in accordance with leading global data protection regulations, including:</p>
            <ul>
              <li>General Data Protection Regulation (GDPR)</li>
              <li>California Consumer Privacy Act (CCPA)</li>
              <li>Digital Personal Data Protection Act (DPDP)</li>
              <li>Other applicable regional frameworks</li>
            </ul>
            <p>By accessing or utilizing www.susea.ai, users accept the practices detailed within this policy and provide explicit consent for the processing of their information as described herein.</p>

            <h2>2. Exhaustive Taxonomy of Information Collected</h2>
            <p>To provide our suite of logistics and AI services, Susea.ai collects multiple categories of data. We strictly categorize this data to ensure appropriate security measures and retention schedules are applied to each distinct dataset.</p>

            <div className="legal-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Data Category</th>
                    <th>Specific Elements Collected</th>
                    <th>Collection Mechanism and Operational Context</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Identity and Account Information</td>
                    <td>First name, last name, corporate email address, contact numbers, corporate titles, company names, and secure account authentication credentials.</td>
                    <td>Voluntarily provided during account registration, onboarding, and through our contact form interfaces.</td>
                  </tr>
                  <tr>
                    <td>Logistics and Commercial Freight Data</td>
                    <td>Commercial invoices, Bills of Lading (BoL), customs clearance documentation, hazardous material declarations, routing preferences, and B2B deal cycle contracts.</td>
                    <td>Uploaded directly by users during shipment management or ingested via authorized third-party APIs.</td>
                  </tr>
                  <tr>
                    <td>Business Automation and Workflow Data</td>
                    <td>Proprietary workflow constraints, organizational team sizes, manual process bottlenecks, historical shipment volume metrics, and financial inefficiency reports.</td>
                    <td>Inputted by users actively utilizing the Susea Automation Calculator and associated diagnostic surveys.</td>
                  </tr>
                  <tr>
                    <td>AI Agent Telemetry and Diagnostic Data</td>
                    <td>Agent loop execution histories, context accumulation metrics, hallucination risk scores, API schema validations, token exposure metrics, and system prompt architectures.</td>
                    <td>Extracted passively and actively via the Susea AI Agent Diagnostic Tool when users connect agents.</td>
                  </tr>
                  <tr>
                    <td>System, Technical, and Usage Data</td>
                    <td>IP addresses, browser specifications, operating system versions, DecompressionStream load logs, session timestamps, and interface interaction patterns.</td>
                    <td>Collected automatically via server logs, application bootstrapping sequences, and operational cookies.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p><strong>User Responsibility:</strong> Users acknowledge that if they utilize Susea.ai to process information belonging to external third parties (e.g., consignees or independent freight drivers), the user assumes sole responsibility for obtaining explicit, legally binding written authorization and consent from those third parties prior to inputting their data into our systems.</p>

            <h2>3. Purposes of Processing and Established Legal Bases</h2>
            <p>In strict compliance with international data protection frameworks, AlphaBits Solutions maps every Susea.ai data processing activity to a clearly defined legal basis:</p>
            <ul>
              <li><strong>Contractual Necessity:</strong> The processing of Identity, Logistics, Business Automation, and AI Agent Telemetry data is required to deliver our core contractual value propositions of logistics automation and multi-agent system diagnostics.</li>
              <li><strong>Legitimate Business Interests:</strong> System, Technical, and Usage Data is leveraged to monitor platform stability, troubleshoot errors, analyze aggregate metrics, and proactively defend against cybersecurity threats. These interests never override the fundamental privacy rights of the data subject.</li>
              <li><strong>Explicit Consent:</strong> For non-essential analytical tracking, targeted marketing, and exceptionally sensitive personal information, we rely exclusively on explicit consent. Users are presented with clear opt-in/opt-out choices via our Consent Management Platform.</li>
              <li><strong>Legal Obligations:</strong> We reserve the right to process and retain specific historical data to comply with enforceable governmental requests, law enforcement subpoenas, and stringent global maritime/financial regulatory frameworks.</li>
            </ul>

            <h2>4. Artificial Intelligence and Machine Learning Data Governance</h2>
            <p>Susea.ai distinguishes itself by implementing enterprise-grade privacy safeguards specifically tailored for the artificial intelligence era. We explicitly guarantee an absolute zero-training policy for foundation models regarding user-submitted data.</p>
            <ul>
              <li><strong>No Model Training:</strong> User inputs, B2B workflow constraints, commercial freight documents, and AI agent diagnostic telemetry will never be utilized to train Susea.ai's proprietary foundational Large Language Models.</li>
              <li><strong>Enterprise API Routing:</strong> When leveraging third-party generative capabilities, we exclusively route data through secure commercial Enterprise APIs. Data transmitted is subject to strict zero-retention or maximum 30-day retention policies by sub-processors and is contractually prohibited from being absorbed into their upstream training pipelines.</li>
              <li><strong>Siloed Vector Embeddings:</strong> When utilizing internal Retrieval-Augmented Generation (RAG) capabilities, all generated vector embeddings are strictly siloed within the client's isolated tenant architecture, cryptographically sealed, and permanently destroyed upon account deletion.</li>
              <li><strong>De-identified User Feedback:</strong> Any user feedback (e.g., thumbs up/down ratings) used to improve system reliability is mathematically de-linked from identifiable user IDs. Users maintain the absolute right to disable these feedback mechanisms at the organizational level.</li>
            </ul>

            <h2>5. Third-Party Sub-processors and Ecosystem Sharing</h2>
            <p>To deliver a highly available, globally distributed platform, Susea.ai integrates with a carefully vetted ecosystem of third-party service providers. We do not sell user data.</p>

            <div className="legal-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Sub-processor Category</th>
                    <th>Operational Purpose and Data Shared</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cloud Infrastructure and Hosting</td>
                    <td>Providers (e.g., AWS, GCP) are utilized for application hosting, encrypted database storage, and edge content delivery networks.</td>
                  </tr>
                  <tr>
                    <td>Generative AI and API Providers</td>
                    <td>Frontier laboratories (e.g., Anthropic, OpenAI) utilized strictly via commercial APIs under Enterprise Data Processing Agreements prohibiting model training.</td>
                  </tr>
                  <tr>
                    <td>Logistics Execution Partners</td>
                    <td>Customs brokerages, ocean carriers, and cargo insurance agencies. Shared exclusively when the user initiates specific workflows requiring partner intervention.</td>
                  </tr>
                  <tr>
                    <td>Operational SaaS and Support</td>
                    <td>CRM platforms, electronic signature vendors, and customer support ticketing systems. Identity data is shared to maintain business continuity and resolve issues.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>AlphaBits Solutions reserves the right to share Susea.ai data internally across future subsidiaries to streamline service delivery. In the event of a structural transaction (merger, acquisition, or sale of corporate assets), user data will be transferred to the acquiring entity. Users will be notified prior to any transfer. We will also disclose information if reasonably necessary to enforce our Terms of Use, defend against liability claims, or comply with valid legal processes.</p>

            <h2>6. Data Lifecycle, Archival, and Retention Economics</h2>
            <p>Susea.ai implements a multi-tiered data retention protocol balancing data minimization with international trade compliance laws.</p>

            <div className="legal-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Data Classification</th>
                    <th>Anticipated Retention Schedule</th>
                    <th>Post-Account Deletion and Archival Protocol</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>General Account Data</td>
                    <td>Retained strictly for the duration of the active software subscription.</td>
                    <td>Deleted or fully, irreversibly anonymized within 30 to 60 days following a confirmed closure request.</td>
                  </tr>
                  <tr>
                    <td>AI Session and Diagnostic Logs</td>
                    <td>Managed on a rolling 30-day retention window.</td>
                    <td>Instantly purged upon manual session termination or complete account deletion.</td>
                  </tr>
                  <tr>
                    <td>Opt-in Classifier Feedback</td>
                    <td>Retained for up to 5 years.</td>
                    <td>De-identified from the user ID and retained purely for the improvement of platform safety classifiers.</td>
                  </tr>
                  <tr>
                    <td>Commercial Freight Documents</td>
                    <td>Retained for the subscription duration plus an additional 5 years.</td>
                    <td>Retained securely in encrypted cold storage to guarantee compliance with financial and FMC auditing requirements.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p><strong>Disaster Recovery Notice:</strong> Due to the immutable nature of encrypted, distributed backup arrays, prior information is never instantaneously wiped from our deepest database structures upon a deletion request. Residual backup data is sequentially overwritten over a 90-day rolling window and is retained solely for emergency system restoration or the preservation of digital evidence.</p>

            <h2>7. Cross-Border Data Transfer Mechanisms</h2>
            <p>Given the global nature of supply chains, Susea.ai routinely processes and transfers data across international jurisdictions. Data collected from users within the European Economic Area (EEA), the United Kingdom, or the Asia-Pacific (APAC) region may be transferred to and hosted on secure servers located within the United States.</p>
            <p>To legitimize these trans-border data flows, AlphaBits Solutions mandates the execution of Standard Contractual Clauses (SCCs) approved by the European Commission, relies on established adequacy decisions, and ensures all international sub-processors deliver a level of data protection fundamentally equivalent to the standards enforced within the user's origin jurisdiction.</p>

            <h2>8. Global Privacy Rights and Jurisdictional Nuances</h2>
            <p>Susea.ai guarantees robust privacy rights to all data subjects, regardless of geographic location:</p>
            <ul>
              <li><strong>Right to Access and Portability:</strong> Users may request a structured, machine-readable copy of their data to port to alternative vendors.</li>
              <li><strong>Right to Rectification:</strong> Users can autonomously review and alter inaccurate personal information directly within their account portals.</li>
              <li><strong>Right to Erasure:</strong> Users may request the deletion of personal data, which we honor promptly, subject to the superseding 5-year regulatory retention requirements for commercial documents.</li>
              <li><strong>Right to Restriction and Objection:</strong> Users may request a halt to processing or object to specific processing vectors, such as algorithmic analysis.</li>
            </ul>
            <h3>California Residents (CCPA/CPRA)</h3>
            <p>This policy strictly adheres to the CCPA and CPRA. AlphaBits Solutions explicitly declares that we do not sell personal information, nor do we share it for cross-context behavioral advertising. California residents may exercise their rights to know, delete, and opt-out without fear of discriminatory treatment.</p>
            <h3>Digital Tracking Controls</h3>
            <p>Users are encouraged to adapt, review, and erase cookies via their native browser settings. To exercise any of the above rights, users must submit a formal request to our compliance team. To protect platform integrity, Susea.ai may request additional verification documentation to conclusively confirm identity before fulfilling complex requests.</p>

            <h2>9. Security Posture and Incident Response</h2>
            <p>AlphaBits Solutions employs a comprehensive matrix of physical, technical, and administrative safeguards for the Susea.ai platform:</p>
            <ul>
              <li><strong>In-Transit Encryption:</strong> All data transmitted between user clients and Susea.ai servers is encrypted using industry-standard Transport Layer Security (TLS/SSL) protocols.</li>
              <li><strong>At-Rest Encryption:</strong> Data at rest is secured utilizing Advanced Encryption Standard (AES-256) cryptography across all cloud storage buckets and relational databases.</li>
              <li><strong>Internal Access:</strong> We enforce strict Role-Based Access Controls (RBAC) and adhere to the principle of least privilege.</li>
            </ul>
            <p>Despite these rigorous measures, no method of digital transmission is mathematically impenetrable. Users bear the fundamental responsibility for maintaining strict confidentiality of their account passwords, utilizing multi-factor authentication where available, and ensuring they sign out securely following the completion of their sessions.</p>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
