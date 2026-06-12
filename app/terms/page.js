import Nav from '@/components/landing/Nav'
import Footer from '@/components/landing/Footer'

export const metadata = {
  title: 'Terms and Conditions | Susea',
  description: 'Terms and Conditions for Susea.ai — the legally binding agreement governing use of the Susea platform by AlphaBits Solutions.',
  alternates: { canonical: 'https://susea.ai/terms' },
}

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="legal-main">
        <div className="container legal-container">
          <div className="legal-header">
            <span className="eyebrow"><span className="dot"></span> Legal</span>
            <h1 className="legal-title">Terms and Conditions</h1>
            <p className="legal-meta">AlphaBits Solutions · Susea.ai · Last updated: June 13, 2026</p>
          </div>

          <div className="legal-body">

            <h2>Article I: Preamble, Acceptance, and Scope of Services</h2>

            <h3>1. Acceptance of Terms</h3>
            <p>These Terms and Conditions, including any incorporated Data Processing Addendums or Service Level Agreements (collectively, the "Agreement"), constitute a legally binding contract between you, whether personally or on behalf of an entity ("Customer", "User", "You", or "Your"), and Alphabits Solutions, operating under the trade name Susea.ai, with its principal place of business in Rajkot, Gujarat, India ("Alphabits Solutions", "Susea.ai", "We", "Us", or "Our").</p>
            <p>This Agreement governs your access to and use of the www.susea.ai website, its associated software-as-a-service (SaaS) platform, APIs, artificial intelligence data extraction tools, and any related media forms (collectively, the "Platform" or "Services"). By registering an account, clicking "I Agree," executing an Order Form, or otherwise accessing the Platform, You acknowledge that You have read, understood, and unconditionally agree to be bound by all terms contained herein. If You do not agree, You are expressly prohibited from using the Platform and must discontinue use immediately.</p>

            <h3>2. Definitions</h3>
            <ul>
              <li><strong>"AI Services":</strong> The proprietary artificial intelligence, machine learning, and natural language processing features developed by Alphabits Solutions, including automated ocean freight rate extraction, predictive pricing, and procurement automation.</li>
              <li><strong>"Customer Data":</strong> Any electronic data, unstructured documents, PDFs, rate sheets, supplier details, or other materials uploaded, inputted, or transmitted by Customer to the Platform.</li>
              <li><strong>"Freight Rates":</strong> The financial pricing data, including but not limited to Spot Rates, Contract Rates, Freight All Kinds (FAK), Named Account Contracts (NAC), and ancillary surcharges (e.g., Terminal Handling Charges, Bunker Adjustment Factors).</li>
              <li><strong>"Applicable Law":</strong> All statutes, enactments, laws, ordinances, rules, directives, and guidelines of any governmental authority, including but not limited to the laws of the Republic of India and applicable international trade sanctions.</li>
            </ul>

            <h2>Article II: User Obligations, Data Accuracy, and Trade Compliance</h2>

            <h3>3. Account Registration and Security</h3>
            <p>To access the core functionalities of the Platform, Customer must register an account. Customer agrees to provide true, accurate, current, and complete organizational and user information. Customer is solely responsible for ensuring that all persons who access the Platform through Customer's internet connection or credentials are aware of these Terms and comply with them. Customer shall bear all liability for actions taken under its account credentials. Alphabits Solutions reserves the right to suspend or terminate accounts immediately upon suspicion of unauthorized access or security breaches.</p>

            <h3>4. Customer Obligations Regarding Data Input and Accuracy</h3>
            <p>The efficacy of the AI Services is entirely dependent upon the quality of the Customer Data. Customer is solely responsible for ensuring that all uploaded data, including rate sheet formats, lists of liners, agents, and vendors, is accurate, complete, and legally obtained. Susea.ai does not independently verify the completeness or accuracy of Customer Data. Susea.ai shall bear zero liability for any commercial losses, missed service levels, or unprofitable freight quotes resulting from incomplete, corrupted, or inaccurate Customer Data processed by the Platform.</p>

            <h3>5. Global Sanctions and Export Control Compliance</h3>
            <p>Customer operations in international maritime logistics are subject to strict regulatory oversight. Customer represents, warrants, and covenants that neither Customer, nor any of its directors, officers, or the entities with which it transacts utilizing the Platform, are:</p>
            <ul>
              <li>Located in, organized under the laws of, or ordinarily resident in a country or territory subject to a comprehensive United States, European Union, or United Nations embargo.</li>
              <li>Identified on any sanctions list, including the Specially Designated Nationals and Blocked Persons (SDN) List administered by the US Office of Foreign Assets Control (OFAC), the EU Consolidated Financial Sanctions List, or the UN Security Council Consolidated List.</li>
            </ul>
            <p>Customer shall not utilize the Platform to facilitate logistics, procurements, or rate management for any sanctioned goods or prohibited entities. Any breach of this clause constitutes a material breach of this Agreement, resulting in immediate, unnotified termination of Services without refund, and Customer shall indemnify Alphabits Solutions against all resulting regulatory fines or legal actions.</p>

            <h2>Article III: Artificial Intelligence and Probabilistic Data Extraction</h2>

            <h3>6. Artificial Intelligence, Machine Learning, and Rate Extraction</h3>
            <p>Susea.ai heavily integrates artificial intelligence ("AI") to read, parse, and extract complex ocean freight contract logic from unstructured documents (e.g., PDFs, emails, Excel files) without requiring manual templates. By utilizing these AI Services, Customer expressly acknowledges, understands, and agrees to the following specialized terms:</p>
            <ul>
              <li><strong>6.1 Probabilistic Nature of Technology:</strong> AI and machine learning models are inherently probabilistic and dynamic. While Susea.ai optimizes the Platform for high accuracy in freight rate extraction, the AI Services may occasionally generate outputs, extracted rates, or procurement suggestions that are inaccurate, hallucinated, incomplete, or inappropriate for Customer's commercial context.</li>
              <li><strong>6.2 Mandatory Human-in-the-Loop Verification:</strong> The Platform is a decision-support tool, not an autonomous agent. Customer agrees that all AI-generated outputs—including but not limited to extracted Spot rates, NAC logic, FAK tables, transit schedules, and margin calculations—must be independently reviewed and verified by a qualified human logistics professional prior to execution, quoting to third parties, or binding financial commitment.</li>
              <li><strong>6.3 Disclaimer of Algorithmic and Extraction Liability:</strong> Alphabits Solutions expressly disclaims any and all liability for financial losses, lost margins, missed container bookings, or delayed shipments arising from Customer's reliance on AI-generated outputs or extraction errors. The risk of utilizing AI-extracted data for commercial quoting rests entirely with the Customer.</li>
              <li><strong>6.4 AI Training and Data Utilization:</strong> To continuously improve the AI Services, Susea.ai requires diverse training data. Customer hereby grants Alphabits Solutions a perpetual, worldwide, royalty-free, non-exclusive license to use, reproduce, and process anonymized and aggregated Customer Data strictly for the purpose of training, fine-tuning, and enhancing the Platform's underlying machine learning models. This processing shall strictly adhere to applicable data privacy frameworks, ensuring no personally identifiable information (PII) or competitively sensitive identifiable corporate metrics are exposed.</li>
            </ul>

            <h2>Article IV: Maritime Disclaimers and Intermediary Software Status</h2>

            <h3>7. Platform Role and Strict Intermediary Status</h3>
            <p>Alphabits Solutions is exclusively a software-as-a-service (SaaS) provider. The Susea.ai Platform is a digital tool designed to facilitate rate management and digital procurement. Customer acknowledges and agrees that Susea.ai is not a sea carrier, freight forwarder, Non-Vessel Operating Common Carrier (NVOCC), customs broker, physical logistics provider, or party to any contract of carriage.</p>

            <h3>8. Exclusion of Physical Shipping Liability</h3>
            <p>Susea.ai does not guarantee space allocation, container availability, equipment repositioning, or the execution of shipments by any third-party ocean liner, carrier, or logistics provider. All contracts of carriage, including eBookings facilitated through the Platform, are formed directly and exclusively between the Customer and the selected carrier.</p>
            <p>Susea.ai shall have no liability whatsoever for, and Customer shall defend, indemnify, and hold Alphabits Solutions harmless against, any claims, damages, or losses arising out of or in connection with:</p>
            <ul>
              <li>Delays in sea transit times, port congestion, or route alterations.</li>
              <li>Loss, damage, deterioration, or destruction of physical cargo.</li>
              <li>Customs actions, interventions, inspections, detentions, or demurrage and terminal handling charges (THC).</li>
              <li>Cancellation of bookings, rolled cargo, blank sailings, or booking amendments by the underlying carrier.</li>
            </ul>
            <p>All terms governing the physical movement of freight are subject exclusively to the specific bill of lading, sea waybill, IATA rules (for air freight), or standard trading conditions of the respective physical carrier.</p>

            <h2>Article V: Intellectual Property and Proprietary Rights</h2>

            <h3>9. Ownership and Licensing of Intellectual Property</h3>
            <p>The Susea.ai Platform, including but not limited to its source code, object code, AI algorithms, neural network weights, databases, user interfaces (UI/UX), manuals, and all associated intellectual property rights (patents, copyrights, trademarks, and trade secrets), are and shall remain the sole and exclusive proprietary property of Alphabits Solutions. Upon execution of an Order Form or account registration, Customer is granted a limited, non-exclusive, non-transferable, non-sublicensable, and revocable license to access and use the Platform solely for internal business purposes during the active subscription term.</p>

            <h3>10. Restrictions on Use</h3>
            <p>Customer expressly undertakes that it shall not, and shall not permit any third party to, directly or indirectly:</p>
            <ul>
              <li>Copy, modify, adapt, translate, merge, or create derivative works of the Platform or the AI Services.</li>
              <li>Reverse engineer, decompile, disassemble, or attempt to discover the source code or underlying algorithmic structures of the AI models.</li>
              <li>Use the Platform, its outputs, or its API to develop a competing software product, AI model, or digital freight rate management system.</li>
              <li>Remove, alter, or obscure any copyright, trademark, or proprietary rights notices contained within the Platform.</li>
              <li>Scrape, spider, or systematically extract data from the Platform using automated bots or manual processes.</li>
            </ul>

            <h3>11. Feedback and New Developments</h3>
            <p>Any suggestions, enhancement requests, recommendations, or other feedback provided by Customer relating to the operation or functionality of the Platform shall become the exclusive property of Alphabits Solutions. Furthermore, any new developments, custom API endpoints, features, or upgrades to the Platform, even if requested or financially subsidized by a Customer through a professional services agreement, shall remain the sole proprietary intellectual property of Alphabits Solutions. Susea.ai reserves the right to commercialize and offer these developments to other customers without restriction.</p>

            <h2>Article VI: Commercial Terms, Billing, and Subscriptions</h2>

            <h3>12. Subscription Fees, Invoicing, and Payment</h3>
            <p>Access to the premium functionalities of the Susea.ai Platform is provided on a subscription basis, as detailed in the applicable Order Form, standard operating procedure (SOP), or online checkout portal. Fees are stated and payable in the currency specified on the invoice. Customer must remit payment for all invoices within fifteen (15) days of the invoice date. All fees are non-refundable, and Susea.ai enforces a strict no-refund policy for SaaS subscriptions, except as expressly mandated by Applicable Law.</p>

            <h3>13. Taxes, Late Fees, and Suspension of Service</h3>
            <p>Subscription fees are exclusive of all applicable taxes, levies, or duties imposed by taxing authorities, including Goods and Services Tax (GST) or Value Added Tax (VAT), and Customer shall be responsible for payment of all such taxes. Any undisputed late payments shall accrue interest at the rate of 1.5% per month, or the maximum rate permitted by Applicable Law, whichever is lower. Alphabits Solutions reserves the right to suspend Customer's access to the Platform and AI Services without liability until all overdue amounts are paid in full.</p>

            <h3>14. Auto-Renewal and Data Retention Post-Termination</h3>
            <p>Unless otherwise explicitly specified in an executed Order Form, subscriptions shall automatically renew for successive periods equal to the expiring subscription term. Either party may prevent renewal by providing written notice of non-renewal at least thirty (30) days prior to the expiration of the current term. Upon termination or expiration of this Agreement, Customer's right to access the Platform will immediately cease. Alphabits Solutions shall have no obligation to maintain, store, or provide any Customer Data after thirty (30) days following termination, and may thereafter securely delete all such data from its active systems.</p>

            <h2>Article VII: Disclaimers, Limitation of Liability, and Indemnification</h2>

            <h3>15. Disclaimer of Warranties</h3>
            <p className="legal-caps">THE PLATFORM, AI SERVICES, EBOOKING FUNCTIONALITIES, AND ALL DATA THEREIN ARE PROVIDED STRICTLY ON AN "AS IS" AND "AS AVAILABLE" BASIS. ALPHABITS SOLUTIONS EXCLUDES AND EXPRESSLY DISCLAIMS ALL WARRANTIES, CONDITIONS, AND REPRESENTATIONS OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. SUSEA.AI DOES NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES, NOR DOES IT MAKE ANY WARRANTY AS TO THE ACCURACY, RELIABILITY, OR COMPLETENESS OF ANY AI-EXTRACTED FREIGHT RATES OR PROCUREMENT DATA.</p>

            <h3>16. Exclusion of Consequential Damages</h3>
            <p className="legal-caps">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ALPHABITS SOLUTIONS, ITS AFFILIATES, DIRECTORS, EMPLOYEES, LICENSORS, OR AGENTS BE LIABLE TO CUSTOMER OR ANY THIRD PARTY FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES. THIS EXCLUSION INCLUDES, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, LOSS OF ANTICIPATED SAVINGS, LOSS OF REVENUE, LOSS OF GOODWILL, LOSS OF DATA, BUSINESS INTERRUPTION, OR THE COST OF PROCURING SUBSTITUTE SERVICES, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE, INABILITY TO USE, OR PERFORMANCE OF THE PLATFORM, REGARDLESS OF THE LEGAL THEORY ASSERTED (CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE), EVEN IF ALPHABITS SOLUTIONS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>

            <h3>17. Absolute Cap on Liability</h3>
            <p className="legal-caps">NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, ALPHABITS SOLUTIONS' ENTIRE CUMULATIVE LIABILITY TO CUSTOMER FOR ALL CLAIMS ARISING FROM OR RELATING TO THIS AGREEMENT, THE PLATFORM, OR THE AI SERVICES SHALL BE STRICTLY CAPPED AND SHALL NOT EXCEED THE TOTAL AMOUNT OF SUBSCRIPTION FEES ACTUALLY PAID BY CUSTOMER TO SUSEA.AI DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE LIABILITY. IF NO FEES HAVE BEEN PAID (E.G., DURING A FREE TRIAL PERIOD), LIABILITY SHALL BE STRICTLY LIMITED TO ONE HUNDRED UNITED STATES DOLLARS ($100 USD).</p>

            <h3>18. Indemnification by Customer</h3>
            <p>Customer agrees to fully defend, indemnify, and hold harmless Alphabits Solutions, its affiliates, and their respective officers, directors, employees, and agents from and against any and all claims, demands, actions, suits, proceedings, damages, losses, liabilities, penalties, fines, and expenses (including reasonable attorney's fees and expert witness costs) arising from or related to:</p>
            <ul>
              <li>Customer's use of and access to the Platform.</li>
              <li>Customer's violation of any term of this Agreement or Applicable Law.</li>
              <li>Customer's violation of any third-party right, including without limitation any intellectual property, copyright, property, or privacy right.</li>
              <li>Any claim that Customer Data or misinterpretation of AI-extracted rates caused damage to a third party (including end-shippers or beneficial cargo owners).</li>
            </ul>
            <p>Customer may not settle any indemnified claim without the prior written consent of Alphabits Solutions.</p>

            <h2>Article VIII: Governing Law, Dispute Resolution, and General Provisions</h2>

            <h3>19. Governing Law and Exclusive Jurisdiction</h3>
            <p>This Agreement, its subject matter, and its formation (including non-contractual disputes or claims) shall be governed by, interpreted, construed, and enforced exclusively in accordance with the laws of the Republic of India, without regard to its conflict of law principles.</p>

            <h3>20. Dispute Resolution and Arbitration</h3>
            <p>The parties agree to first use good faith efforts to informally resolve any conflict or controversy relating to this Agreement through negotiation. In the event the dispute is not resolved amicably within thirty (30) days of written notice, the dispute shall be subject to binding and final arbitration in accordance with the provisions of the Arbitration and Conciliation Act, 1996, as amended.</p>
            <ul>
              <li>The arbitral tribunal shall consist of a sole arbitrator mutually appointed by Alphabits Solutions and the Customer.</li>
              <li>The legal seat, venue, and place of the arbitration shall exclusively be Rajkot, Gujarat, India.</li>
              <li>The language of the arbitration proceedings and all documentation shall be English.</li>
              <li>The award rendered by the arbitrator shall be final, binding, and enforceable in any court of competent jurisdiction.</li>
            </ul>
            <p>Subject to this arbitration clause, any matter requiring judicial intervention (such as requests for immediate injunctive relief to prevent intellectual property theft) shall be subject to the exclusive jurisdiction of the competent civil courts located in Rajkot, Gujarat, India. Customer hereby expressly consents to the personal jurisdiction and venue of such courts.</p>

            <h3>21. Force Majeure</h3>
            <p>Neither party shall be responsible for any failure or delay in performance under this Agreement (except for the obligation to pay fees) if caused by events beyond its reasonable control, including but not limited to acts of God, war, hostility, sabotage, pandemics, electrical or telecommunication outages, cyber-attacks, or government restrictions (including the denial or cancellation of any export/import licenses).</p>

            <h3>22. Modifications to Terms</h3>
            <p>Alphabits Solutions reserves the right to modify, amend, or update these Terms and Conditions at any time at its sole discretion. Susea.ai will provide notice of such changes by updating the "Last Updated" date at the top of these Terms, posting a conspicuous notice on the Platform, or sending an email notification to registered users. Customer's continued use of the Platform following such notice constitutes formal acceptance of the modified Terms.</p>

            <h3>23. Severability and Entire Agreement</h3>
            <p>If any provision of this Agreement is held by a court or arbitrator of competent jurisdiction to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that this Agreement will otherwise remain in full force and effect. This Agreement constitutes the entire agreement between the parties relating to the subject matter herein and supersedes all prior communications, proposals, and agreements, whether oral or written.</p>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
