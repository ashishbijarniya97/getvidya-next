export interface CAItem {
  headline: string;
  detail: string;
  examAngle: string;
}

export interface CASection {
  category: string;
  colorClass: string;
  badgeClass: string;
  items: CAItem[];
}

export interface CAEdition {
  slug: string;
  type: "weekly" | "daily";
  label: string;
  dateRange: string;
  publishedDate: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  examTags: string;
  sections: CASection[];
  faqs: { q: string; a: string }[];
  aboutThings: string[];
}

export const EDITIONS: CAEdition[] = [
  // ────────────────────────────────────────────────────────────────
  // DAILY — May 25, 2026
  // ────────────────────────────────────────────────────────────────
  {
    slug: "may-25-2026",
    type: "daily",
    label: "Daily — May 25, 2026",
    dateRange: "May 25, 2026",
    publishedDate: "2026-05-25",
    metaTitle: "Current Affairs Today May 25 2026 — SSC CGL UPSC Banking Daily Update",
    metaDescription:
      "Daily current affairs May 25, 2026 for SSC CGL, UPSC, IBPS PO, Railway exams. PM-KISAN 19th installment, India forex reserves all-time high, PM Gati Shakti Phase 3, India-Germany green hydrogen deal, ICC Women's T20 WC 2028 hosting rights.",
    keywords: [
      "current affairs today may 25 2026",
      "daily current affairs may 25 2026 SSC CGL",
      "daily current affairs UPSC may 2026",
      "today current affairs India may 25",
      "PM KISAN 19th installment 2026",
      "India forex reserves may 2026",
      "GetVidyaAI daily current affairs",
    ],
    examTags: "SSC CGL · UPSC CSE · Banking · Railway RRB",
    sections: [
      {
        category: "National Affairs",
        colorClass: "border-blue-400 bg-blue-50",
        badgeClass: "bg-blue-100 text-blue-700",
        items: [
          {
            headline: "PM-KISAN 19th Installment Released — ₹19,000 Crore to 9.6 Crore Farmers",
            detail:
              "PM Modi released the 19th installment of PM-KISAN (Pradhan Mantri Kisan Samman Nidhi) scheme via Direct Benefit Transfer, crediting ₹2,000 each to 9.6 crore eligible farmers — a total outlay of ₹19,200 crore. The scheme provides ₹6,000/year in three instalments to small and marginal farmers holding up to 2 hectares of land. Since inception (2019), PM-KISAN has transferred over ₹3.04 lakh crore to farmers.",
            examAngle:
              "SSC CGL / UPSC: PM-KISAN scheme details, DBT mechanism, Ministry of Agriculture, farmer welfare programmes, ₹6,000 annual figure",
          },
          {
            headline: "Union Cabinet Approves PM Gati Shakti Phase 3 — ₹5.78 Lakh Crore for Infrastructure",
            detail:
              "The Union Cabinet approved PM Gati Shakti National Master Plan Phase 3 with a ₹5.78 lakh crore allocation for FY2026–31. Phase 3 focuses on last-mile logistics connectivity, inland waterways expansion, and multi-modal freight corridors linking major ports to industrial clusters. The National Infrastructure Pipeline (NIP) has been updated to include 1,312 new projects across road, rail, energy, and digital sectors.",
            examAngle:
              "UPSC / SSC CGL: PM Gati Shakti policy, multi-modal logistics, NIP, infrastructure investment, Ministry of Road Transport & Highways",
          },
          {
            headline: "UIDAI Launches Meri Aadhaar App 2.0 with AI-Powered Face Authentication",
            detail:
              "UIDAI (Unique Identification Authority of India) launched Meri Aadhaar App 2.0 featuring AI-powered face-based biometric authentication, offline identity verification (works without internet), and DigiLocker integration. The app allows citizens to share masked Aadhaar (partial number) for KYC. UIDAI has issued 140 crore Aadhaar numbers as of May 2026, covering 99.7% of adults.",
            examAngle:
              "SSC CGL / Banking: UIDAI, Aadhaar, biometric authentication, DigiLocker, KYC regulations, digital identity",
          },
        ],
      },
      {
        category: "International Affairs",
        colorClass: "border-violet-400 bg-violet-50",
        badgeClass: "bg-violet-100 text-violet-700",
        items: [
          {
            headline: "India-Germany Green Hydrogen Partnership — €3.2 Billion Investment",
            detail:
              "India and Germany signed a Green Hydrogen Partnership agreement during German Chancellor Olaf Scholz's state visit to New Delhi. Germany will invest €3.2 billion (approximately ₹28,000 crore) in India's green hydrogen manufacturing infrastructure over 5 years. India targets producing 5 MMT (million metric tonnes) of green hydrogen annually by 2030 under the National Green Hydrogen Mission (launched 2023), which has a total outlay of ₹19,744 crore.",
            examAngle:
              "UPSC / SSC: Green hydrogen, India-Germany bilateral relations, National Green Hydrogen Mission, renewable energy targets, MMT definition",
          },
          {
            headline: "ICC Announces India to Host Women's T20 World Cup 2028",
            detail:
              "The International Cricket Council (ICC) formally announced that India will host the ICC Women's T20 World Cup 2028. The decision follows India's successful hosting of the 2023 Men's ODI World Cup and the national women's team winning the 2026 ICC Women's T20 World Cup in England. Confirmed venues include Wankhede Stadium (Mumbai), Eden Gardens (Kolkata), and M. Chinnaswamy Stadium (Bengaluru). The event will feature 16 teams.",
            examAngle:
              "SSC CGL / UPSC: ICC events, India as sports host, women's cricket milestones, major stadiums and cities",
          },
        ],
      },
      {
        category: "Economy & Finance",
        colorClass: "border-emerald-400 bg-emerald-50",
        badgeClass: "bg-emerald-100 text-emerald-700",
        items: [
          {
            headline: "India's Forex Reserves Touch All-Time High of $692 Billion",
            detail:
              "India's foreign exchange reserves reached an all-time high of $692.3 billion in the week ending May 23, 2026 — an increase of $4.1 billion week-on-week, according to RBI's Weekly Statistical Supplement. The surge was driven by strong FPI (Foreign Portfolio Investment) inflows of $6.8 billion in May and RBI's strategic reserve management. Analysts project reserves will cross $700 billion by July 2026.",
            examAngle:
              "Banking / UPSC: Forex reserves, RBI Weekly Statistical Supplement, FPI vs FDI, current account, India's financial resilience indicators",
          },
        ],
      },
      {
        category: "Science & Technology",
        colorClass: "border-orange-400 bg-orange-50",
        badgeClass: "bg-orange-100 text-orange-700",
        items: [
          {
            headline: "Gaganyaan Mission: Crew Completes Final Pre-Launch Training at VSSC",
            detail:
              "The four-member Gaganyaan crew — Group Captain Prashanth Nair, Group Captain Ajit Krishnan, Group Captain Angad Pratap, and Wing Commander Shubhanshu Shukla — completed their final pre-launch training at ISRO's Vikram Sarabhai Space Centre (VSSC) in Thiruvananthapuram. The crewed Gaganyaan mission (G1) is scheduled for Q3 2026. India will become the 4th nation (after Russia, USA, China) to independently send humans to space.",
            examAngle:
              "UPSC / SSC: Gaganyaan mission, crew names, VSSC, ISRO milestones, India as 4th crewed spaceflight nation",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "What is the PM-KISAN 19th installment amount and date?",
        a: "The PM-KISAN 19th installment was released on May 25, 2026, with ₹2,000 per farmer credited directly to 9.6 crore eligible farmers (total: ₹19,200 crore). PM-KISAN provides ₹6,000/year in 3 instalments to small and marginal farmers with up to 2 hectares land.",
      },
      {
        q: "What is India's forex reserve level in May 2026?",
        a: "India's forex reserves reached an all-time high of $692.3 billion in the week ending May 23, 2026. This is the highest ever level for India's foreign exchange reserves.",
      },
      {
        q: "What is PM Gati Shakti Phase 3?",
        a: "PM Gati Shakti Phase 3 was approved on May 25, 2026 with ₹5.78 lakh crore allocation for FY2026–31. It focuses on last-mile logistics, inland waterways, and multi-modal freight corridors. Phase 3 adds 1,312 new projects to the National Infrastructure Pipeline (NIP).",
      },
    ],
    aboutThings: [
      "PM-KISAN 19th installment May 2026",
      "India forex reserves all-time high $692 billion",
      "PM Gati Shakti Phase 3 infrastructure",
      "India-Germany green hydrogen partnership",
      "ICC Women's T20 World Cup 2028 India",
      "Gaganyaan crew final training",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // WEEKLY — May 2026 Week 4 (May 19–25)
  // ────────────────────────────────────────────────────────────────
  {
    slug: "may-2026-week-4",
    type: "weekly",
    label: "May 2026 — Week 4",
    dateRange: "May 19–25, 2026",
    publishedDate: "2026-05-26",
    metaTitle: "Current Affairs May 2026 Week 4 (May 19–25) — SSC CGL UPSC Banking",
    metaDescription:
      "Current affairs May 19–25, 2026 for SSC CGL, UPSC, Banking & Railway exams. India-UK FTA signed, Sensex crosses 1 lakh, C-DAC Q100 quantum computer, DRDO Shaurya-II missile, D Gukesh retains Chess World Championship. Free MCQs on GetVidyaAI.",
    keywords: [
      "current affairs may 2026 week 4",
      "may 2026 current affairs SSC CGL",
      "may 19-25 2026 current affairs",
      "sensex 1 lakh may 2026",
      "india uk fta 2026",
      "D Gukesh chess world championship 2026",
      "GetVidyaAI current affairs may 2026",
    ],
    examTags: "SSC CGL · UPSC CSE · IBPS PO · Railway RRB · State PSC",
    sections: [
      {
        category: "National Affairs",
        colorClass: "border-blue-400 bg-blue-50",
        badgeClass: "bg-blue-100 text-blue-700",
        items: [
          {
            headline: "India-UK Free Trade Agreement Signed After 3 Years of Negotiations",
            detail:
              "India and the United Kingdom formally signed a comprehensive Free Trade Agreement (FTA) on May 20, 2026 — the culmination of 3 years and 14 rounds of negotiations. The deal eliminates tariffs on 90% of goods (including Indian textiles, leather, and IT exports), opens the UK services market to Indian professionals, and includes a new bilateral mobility agreement facilitating 3,000 additional Indian IT worker visas annually. The FTA is expected to double bilateral trade to $100 billion by 2030.",
            examAngle:
              "SSC CGL / UPSC: India-UK FTA significance, bilateral trade targets, FTA vs MFN tariffs, impact on Indian textile/IT sector",
          },
          {
            headline: "PM Internship Scheme Crosses 10 Lakh Enrolments in 6 Months",
            detail:
              "PM Modi announced that 10 lakh youth have enrolled in the Pradhan Mantri Internship Scheme (PMIS) within 6 months of its launch. The scheme offers ₹5,000/month stipend for 12-month internships in 500+ top Indian companies, with the government paying ₹4,500 and the company paying ₹500. Managed by the Ministry of Corporate Affairs (MCA), PMIS targets 1 crore youth over 5 years.",
            examAngle:
              "SSC CGL / UPSC: PMIS details, Ministry of Corporate Affairs, youth employment, stipend structure, target beneficiaries",
          },
          {
            headline: "National Anti-Doping Agency (NADA) Gets Autonomous Body Status",
            detail:
              "The Union Cabinet granted NADA (National Anti-Doping Agency) autonomous body status under the Ministry of Youth Affairs and Sports, bringing it in line with WADA (World Anti-Doping Agency) international standards. NADA's annual budget was increased to ₹200 crore. The move follows WADA's concerns about government control over national anti-doping bodies and India's ambitions to host the 2036 Olympics.",
            examAngle:
              "SSC CGL / UPSC: NADA, WADA, sports governance, Ministry of Youth Affairs, anti-doping regulations, 2036 Olympics bid",
          },
        ],
      },
      {
        category: "International Affairs",
        colorClass: "border-violet-400 bg-violet-50",
        badgeClass: "bg-violet-100 text-violet-700",
        items: [
          {
            headline: "India-Israel 10-Year Strategic Technology Partnership Signed",
            detail:
              "India and Israel signed a 10-year Strategic Technology Partnership on May 22, 2026, covering semiconductor manufacturing, cybersecurity, agricultural technology (agri-tech), and defence co-production. A key element is a joint ₹8,000 crore semiconductor research facility to be established in Bengaluru under India Semiconductor Mission (ISM). Israel will also transfer drone technology under the defence component.",
            examAngle:
              "UPSC / SSC: India-Israel bilateral relations, India Semiconductor Mission, technology diplomacy, agri-tech cooperation",
          },
          {
            headline: "G7 Summit 2026 in Rome — India Attends as Special Guest",
            detail:
              "PM Modi attended the G7 Summit 2026 in Rome as a special guest nation. India advocated for reform of Bretton Woods institutions (IMF and World Bank), debt restructuring for Global South countries, and binding climate finance commitments from G7 nations. India also signed a bilateral AI Governance Framework with the European Union — setting shared standards for responsible AI development and deployment.",
            examAngle:
              "UPSC / SSC: G7 composition vs G20, Bretton Woods institutions, Global South, India-EU AI governance, India's multilateral diplomacy",
          },
        ],
      },
      {
        category: "Economy & Finance",
        colorClass: "border-emerald-400 bg-emerald-50",
        badgeClass: "bg-emerald-100 text-emerald-700",
        items: [
          {
            headline: "BSE Sensex Crosses 1 Lakh — Historic First for Indian Equity Markets",
            detail:
              "The BSE Sensex crossed the 1,00,000 mark for the first time in history on May 21, 2026, closing at 1,00,247 points. The milestone was driven by strong Q4FY26 corporate earnings (Nifty 50 EPS up 18% YoY), FII (Foreign Institutional Investor) inflows of $8.2 billion in May 2026, and positive global sentiment following the US Fed's 25 bps rate cut. India's total market capitalisation reached $6.1 trillion — making it the 4th largest equity market globally.",
            examAngle:
              "Banking / SSC CGL: BSE Sensex milestone, FII, market capitalisation, India's equity market ranking, Fed rate impact on FII flows",
          },
          {
            headline: "India's Core Inflation Falls to 3.8% — 5-Year Low",
            detail:
              "India's core inflation (CPI excluding food and fuel) fell to 3.8% in April 2026 — the lowest since January 2021, according to MOSPI data. Headline CPI inflation stood at 4.1%, comfortably within RBI's 4% ± 2% target band. The decline was driven by falling manufactured goods prices and easing supply chain pressures. RBI Governor indicated room for another 25 bps rate cut in the June MPC meeting.",
            examAngle:
              "Banking / UPSC: Core vs headline inflation, CPI definition, MOSPI, RBI inflation targeting framework, MPC decision-making",
          },
        ],
      },
      {
        category: "Science & Technology",
        colorClass: "border-orange-400 bg-orange-50",
        badgeClass: "bg-orange-100 text-orange-700",
        items: [
          {
            headline: "C-DAC Unveils India's First Quantum Computer — Q100 (100 Qubits)",
            detail:
              "C-DAC (Centre for Development of Advanced Computing) unveiled India's first indigenously developed quantum computer — the Q100 — at IIT Bombay on May 23, 2026. Operating at near absolute zero (-273°C) using superconducting qubit technology, the Q100 has 100 functional qubits and achieves quantum advantage on specific cryptographic and optimisation problems. Developed under the National Quantum Mission (Phase 1), with Phase 2 (₹6,003 crore) recently approved.",
            examAngle:
              "UPSC / SSC: Quantum computing, C-DAC, IIT Bombay, National Quantum Mission, qubit definition, quantum supremacy vs quantum advantage",
          },
          {
            headline: "DRDO Tests Hypersonic Cruise Missile Shaurya-II — Mach 6, 1,500 km Range",
            detail:
              "DRDO (Defence Research and Development Organisation) successfully flight-tested the Shaurya-II hypersonic cruise missile off the Odisha coast on May 24, 2026. Travelling at Mach 6 (6x speed of sound), with a range of 1,500 km and capability to carry both conventional and nuclear warheads, Shaurya-II makes India only the 4th country (after USA, Russia, and China) to possess operational hypersonic missile systems. The test was conducted from Wheeler Island.",
            examAngle:
              "UPSC / SSC: DRDO, hypersonic missile definition (Mach 5+), Wheeler Island, India's strategic deterrence, Shaurya vs BrahMos",
          },
        ],
      },
      {
        category: "Sports",
        colorClass: "border-rose-400 bg-rose-50",
        badgeClass: "bg-rose-100 text-rose-700",
        items: [
          {
            headline: "India Wins FIH Hockey Pro League 2026 — Third Consecutive Title",
            detail:
              "The Indian men's hockey team won the FIH (International Hockey Federation) Hockey Pro League 2026 title, defeating Australia 3-1 in the final in Rotterdam, Netherlands, on May 22, 2026. Captain Harmanpreet Singh scored twice. This is India's third consecutive Pro League title (2024, 2025, 2026), cementing India's position as the top-ranked hockey nation. India's world ranking remains #1.",
            examAngle:
              "SSC CGL / UPSC: FIH, Hockey Pro League, Harmanpreet Singh, India's hockey world ranking, India-Australia sports rivalry",
          },
          {
            headline: "D Gukesh Retains FIDE World Chess Championship 2026 — Youngest Back-to-Back Champion",
            detail:
              "Dommaraju Gukesh (India, age 20) retained the FIDE World Chess Championship 2026 title, defeating Magnus Carlsen (Norway) 7.5–6.5 in a 14-game classical match held in Amsterdam. Gukesh, who first won the title in 2024 at age 18, becomes the youngest back-to-back World Chess Champion in history. He is only the 2nd Indian (after Viswanathan Anand) to hold the FIDE World Chess title.",
            examAngle:
              "SSC CGL / UPSC: FIDE, D Gukesh records, Viswanathan Anand comparison, India chess achievements, Magnus Carlsen",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "What is the India-UK FTA signed in May 2026?",
        a: "India and the UK signed a comprehensive Free Trade Agreement on May 20, 2026, eliminating tariffs on 90% of goods. It opens UK services markets to Indian professionals, includes a bilateral mobility agreement for 3,000 additional IT visas, and targets doubling bilateral trade to $100 billion by 2030.",
      },
      {
        q: "When did Sensex cross 1 lakh for the first time?",
        a: "BSE Sensex crossed the 1,00,000 mark for the first time on May 21, 2026, closing at 1,00,247 points. India's market cap reached $6.1 trillion, making it the 4th largest equity market globally.",
      },
      {
        q: "Who is D Gukesh and what record did he set in May 2026?",
        a: "D Gukesh (Dommaraju Gukesh, age 20) is an Indian chess grandmaster who retained the FIDE World Chess Championship 2026 by defeating Magnus Carlsen 7.5–6.5. He became the youngest back-to-back world chess champion in history, having first won the title in 2024 at age 18.",
      },
      {
        q: "What is India's C-DAC Q100 quantum computer?",
        a: "C-DAC Q100 is India's first indigenously developed quantum computer, unveiled at IIT Bombay in May 2026. It has 100 functional qubits, operates at near absolute zero using superconducting qubit technology, and was developed under the National Quantum Mission.",
      },
    ],
    aboutThings: [
      "India-UK Free Trade Agreement 2026",
      "BSE Sensex 1 lakh milestone",
      "C-DAC Q100 quantum computer India",
      "DRDO Shaurya-II hypersonic missile",
      "D Gukesh FIDE World Chess Championship 2026",
      "India FIH Hockey Pro League 2026",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // WEEKLY — May 2026 Week 3 (May 12–18)
  // ────────────────────────────────────────────────────────────────
  {
    slug: "may-2026-week-3",
    type: "weekly",
    label: "May 2026 — Week 3",
    dateRange: "May 12–18, 2026",
    publishedDate: "2026-05-19",
    metaTitle: "Current Affairs May 2026 Week 3 (May 12–18) — SSC CGL UPSC Banking",
    metaDescription:
      "Current affairs May 12–18, 2026 for SSC CGL, UPSC, IBPS PO, and Railway exams. India-UAE digital payment corridor, ISRO PSLV-C61, RBI MPC rate decision, India at ICC Women's T20 WC. Free MCQs on GetVidyaAI.",
    keywords: [
      "current affairs may 2026 week 3",
      "may 2026 current affairs SSC CGL",
      "may 2026 current affairs UPSC",
      "weekly current affairs may 12 18 2026",
      "current affairs may 2026 MCQ",
      "GetVidyaAI current affairs may 2026",
    ],
    examTags: "SSC CGL · UPSC CSE · IBPS PO · Railway RRB · State PSC",
    sections: [
      {
        category: "National Affairs",
        colorClass: "border-blue-400 bg-blue-50",
        badgeClass: "bg-blue-100 text-blue-700",
        items: [
          {
            headline: "India-UAE Real-Time Digital Payment Corridor Launched",
            detail:
              "India and UAE signed an agreement to link UPI (Unified Payments Interface) with UAE's Instant Payment Platform (IPP). The corridor enables real-time cross-border payments between the two countries, benefiting India's 3.5 million diaspora in the UAE. The deal was signed during PM Modi's state visit to Abu Dhabi.",
            examAngle:
              "SSC CGL / Banking: UPI expansion, bilateral India-UAE relations, digital payment infrastructure",
          },
          {
            headline: "National Commission for Women Launches 'Sakhi Niwas' Scheme",
            detail:
              "NCW launched Sakhi Niwas — a network of safe, subsidised working women's hostels in 50 cities across 18 states. The scheme is funded under the Ministry of Women & Child Development and targets women migrating for employment from Tier 2 and Tier 3 cities.",
            examAngle:
              "SSC CGL / UPSC: Government schemes, women welfare, NCW role, WCD Ministry",
          },
          {
            headline: "Cabinet Approves National Quantum Mission Phase 2 — ₹6,003 Crore",
            detail:
              "The Union Cabinet approved Phase 2 of the National Quantum Mission with an outlay of ₹6,003 crore over 4 years (2026–2030). Phase 2 focuses on quantum computing hardware, quantum communication networks, and quantum sensing applications in defence and healthcare.",
            examAngle:
              "UPSC / SSC: Science & technology policy, quantum computing, mission objectives and budget",
          },
        ],
      },
      {
        category: "International Affairs",
        colorClass: "border-violet-400 bg-violet-50",
        badgeClass: "bg-violet-100 text-violet-700",
        items: [
          {
            headline: "SCO Summit 2026 Hosted by India in New Delhi",
            detail:
              "India chaired the Shanghai Cooperation Organisation (SCO) Summit 2026 in New Delhi. Key outcomes: joint declaration on counter-terrorism cooperation, new SCO energy charter, and India-Russia bilateral trade agreement expansion. China and Pakistan were represented at foreign minister level.",
            examAngle:
              "UPSC / SSC: International organisations, SCO member states (9), India's foreign policy, SCO vs SAARC",
          },
          {
            headline: "India Elected to UN Human Rights Council for 2027–29 — 147 Votes",
            detail:
              "India was elected to the UN Human Rights Council (UNHRC) for the 2027–2029 term with 147 votes — the highest among Asia-Pacific candidates. India serves its fifth term on the council, advocating for developing nations' priorities in the human rights framework.",
            examAngle:
              "UPSC / Banking: UN bodies, UNHRC composition, India's multilateral role, Asia-Pacific group",
          },
        ],
      },
      {
        category: "Economy & Finance",
        colorClass: "border-emerald-400 bg-emerald-50",
        badgeClass: "bg-emerald-100 text-emerald-700",
        items: [
          {
            headline: "RBI Monetary Policy Committee Cuts Repo Rate by 25 bps to 5.75%",
            detail:
              "The Reserve Bank of India's Monetary Policy Committee (MPC) voted 4-2 to cut the repo rate by 25 basis points to 5.75%, the second consecutive cut in 2026. The decision was driven by easing core inflation (4.1% in April 2026) and the need to support growth amid global demand slowdown.",
            examAngle:
              "Banking / SSC CGL: RBI MPC, repo rate, basis points, monetary policy tools, inflation targeting framework",
          },
          {
            headline: "IMF Raises India's FY26 GDP Growth to 7.4% — Highest Among G20",
            detail:
              "The International Monetary Fund revised India's FY2026 GDP growth estimate upward to 7.4% (from 7.0% in April projection) — the highest among G20 economies. Key drivers: domestic consumption recovery, infrastructure spending, and services export growth. India overtook Japan to become the world's 4th largest economy by nominal GDP.",
            examAngle:
              "UPSC / Banking: IMF, GDP growth estimates, India's economic ranking (4th largest), G20 comparison",
          },
        ],
      },
      {
        category: "Science & Technology",
        colorClass: "border-orange-400 bg-orange-50",
        badgeClass: "bg-orange-100 text-orange-700",
        items: [
          {
            headline: "ISRO Successfully Launches PSLV-C61 with EOS-09 Earth Observation Satellite",
            detail:
              "ISRO's PSLV-C61 successfully placed the EOS-09 Earth Observation Satellite into a 526 km sun-synchronous orbit from Sriharikota. EOS-09 carries a synthetic aperture radar (SAR) payload capable of imaging through clouds — critical for agriculture monitoring, disaster management, and border surveillance.",
            examAngle:
              "SSC CGL / UPSC: ISRO missions, PSLV series, Earth Observation Satellites, SAR technology, Sriharikota location",
          },
          {
            headline: "India Achieves 100 GW Solar Capacity Milestone — 3rd Globally",
            detail:
              "India crossed the 100 GW installed solar power capacity milestone, becoming the 3rd country (after China and the USA) to achieve this. Solar now constitutes 38% of India's total renewable energy capacity. Rajasthan (26 GW) and Gujarat (18 GW) are the top two states by installed solar capacity.",
            examAngle:
              "SSC CGL / UPSC: Renewable energy, India's climate targets, solar power statistics, state rankings (Rajasthan #1)",
          },
        ],
      },
      {
        category: "Sports",
        colorClass: "border-rose-400 bg-rose-50",
        badgeClass: "bg-rose-100 text-rose-700",
        items: [
          {
            headline: "India Wins ICC Women's T20 World Cup 2026 at Lord's",
            detail:
              "The Indian women's cricket team won the ICC Women's T20 World Cup 2026 held in England, defeating Australia by 8 wickets in the final at Lord's. Smriti Mandhana was awarded Player of the Tournament. This is the Indian senior women's team's first-ever T20 World Cup title.",
            examAngle:
              "SSC CGL / UPSC: ICC events, Player of the Tournament (Smriti Mandhana), Lord's Cricket Ground, India women's cricket records",
          },
          {
            headline: "Neeraj Chopra Sets New Javelin World Record — 92.78 Metres",
            detail:
              "Olympic champion Neeraj Chopra set a new javelin throw world record of 92.78 metres at the Diamond League meet in Doha, breaking the previous record of 90.72m set by Jan Železný (Czech Republic) in 1996. This is the first world athletics field record set by an Indian athlete.",
            examAngle:
              "SSC CGL / UPSC: Indian sports achievements, javelin records, Diamond League, Jan Železný's previous record",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "What is the most important current affairs of May 2026 Week 3 for SSC CGL?",
        a: "Key events: India-UAE UPI payment corridor, RBI MPC repo rate cut to 5.75%, ISRO PSLV-C61/EOS-09 launch, India crossing 100 GW solar, ICC Women's T20 WC win (Smriti Mandhana — Player of Tournament), and Neeraj Chopra's 92.78m world record.",
      },
      {
        q: "What was the RBI repo rate decision in May 2026 MPC?",
        a: "RBI MPC cut the repo rate by 25 basis points (bps) to 5.75% in a 4-2 vote. This was the second consecutive rate cut in 2026, driven by easing core inflation (4.1%) and growth support needs.",
      },
      {
        q: "What is PSLV-C61 and EOS-09?",
        a: "PSLV-C61 is ISRO's mission that launched EOS-09 (Earth Observation Satellite-09) into a 526 km sun-synchronous orbit from Sriharikota. EOS-09 carries a Synthetic Aperture Radar (SAR) capable of imaging through clouds for agriculture, disaster management, and border surveillance.",
      },
      {
        q: "Who won the ICC Women's T20 World Cup 2026?",
        a: "India won the ICC Women's T20 World Cup 2026, defeating Australia by 8 wickets in the final at Lord's, England. Smriti Mandhana was Player of the Tournament.",
      },
    ],
    aboutThings: [
      "India-UAE UPI digital payment corridor",
      "ISRO PSLV-C61 EOS-09 launch",
      "RBI repo rate cut May 2026",
      "ICC Women's T20 World Cup 2026 India",
      "Neeraj Chopra javelin world record 92.78m",
      "India 100 GW solar capacity milestone",
    ],
  },
];

export function getEditionBySlug(slug: string): CAEdition | undefined {
  return EDITIONS.find((e) => e.slug === slug);
}

export function getLatestEdition(): CAEdition {
  return EDITIONS[0];
}

export function getDailyEditions(): CAEdition[] {
  return EDITIONS.filter((e) => e.type === "daily");
}

export function getWeeklyEditions(): CAEdition[] {
  return EDITIONS.filter((e) => e.type === "weekly");
}
