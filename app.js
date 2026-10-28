/**
 * BantayScam Prototype Controller
 * Manages screen switching, interactive micro-simulations, and sidebar metadata updates.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Screen Metadata for the Examination Sidebar
  const screenMeta = {
    1: {
      tag: "SCREEN 1 OF 5",
      title: "Home Page / Main Security Dashboard",
      desc: "Provides everyday Filipino users and seniors with an immediate security posture overview, one-tap scanning shortcuts, trending Philippine smishing alerts, and active protection status for linked family members.",
      techTags: [
        { label: "On-Device AI Threat Engine", type: "ai" },
        { label: "Blockchain Threat Node Synced", type: "bc" }
      ],
      uxPoints: [
        "Large, calming emerald shield indicator conveys instant protection without alarming non-technical users.",
        "One-tap quick access tiles for deep scanning, AI consultation, on-chain ledger check, and reporting.",
        "High-contrast live threat radar geolocated to Philippine regions (e.g. NCR, Cebu) displaying current smishing waves.",
        "Family Shield widget allows family breadwinners to monitor elderly parents' protection status at a glance."
      ]
    },
    2: {
      tag: "SCREEN 2 OF 5",
      title: "Main Feature: Deep Smishing & URL Threat Scanner",
      desc: "Allows users and online sellers to paste suspicious SMS messages, sender IDs, or links for deep multi-vector heuristic analysis with actionable defensive recommendations.",
      techTags: [
        { label: "NLP Intent & Homograph Domain Engine", type: "ai" },
        { label: "Phishing Signature Verification", type: "ai" }
      ],
      uxPoints: [
        "Color-coded threat severity badge (High Alert Red) with 98% risk score confidence for rapid comprehension.",
        "Detailed breakdown of threat indicators: deceptive urgency, homograph domain spoofing, and SIM registration pretext.",
        "Immediate defensive CTA buttons: 1-tap block sender, submit to community ledger, or warn family members."
      ]
    },
    3: {
      tag: "SCREEN 3 OF 5",
      title: "Emerging Tech 1: BantayAI Multimodal Threat Inspector",
      desc: "An intelligent conversational assistant and computer-vision analyzer that inspects uploaded transaction screenshots (e.g. fake GCash receipts) and explains the fraud in accessible Taglish/English.",
      techTags: [
        { label: "Multimodal Computer Vision OCR", type: "ai" },
        { label: "Conversational Taglish NLP Assistant", type: "ai" }
      ],
      uxPoints: [
        "Computer-vision overlay flags font anomalies, incorrect layout spacing, and invalid transaction reference checksums.",
        "Natural language conversational thread translates complex cryptographic and cryptographic flaws into plain, empathetic language.",
        "Equips online sellers and marketplace users with exact counter-phrases against classic scam excuses."
      ]
    },
    4: {
      tag: "SCREEN 4 OF 5",
      title: "Emerging Tech 2: Decentralized Blockchain Fraud Registry",
      desc: "A decentralized consortium ledger where verified scammer telephone numbers, mule e-wallet IDs, and blacklisted URLs are permanently registered with immutable cryptographic proof.",
      techTags: [
        { label: "Consortium Blockchain (L2 Rollup)", type: "bc" },
        { label: "Cryptographic Smart Contract Registry", type: "bc" }
      ],
      uxPoints: [
        "Clean query interface for instant pre-transaction verification of buyer/seller numbers and e-wallet IDs.",
        "Transparent on-chain metadata display: Block height, transaction hash, timestamp, and community consensus stake count.",
        "Educational callout explaining why decentralized blockchain prevents corrupt actors from bribing or erasing fraud records."
      ]
    },
    5: {
      tag: "SCREEN 5 OF 5",
      title: "Additional Feature: Community Incident Reporting Wizard",
      desc: "A guided, 4-step wizard that enables scam victims and marketplace sellers to record fraud incidents, stake evidence, broadcast alerts to their Family Shield, and generate official police/CICC blotter evidence.",
      techTags: [
        { label: "Cryptographic Signature & Evidence Hashing", type: "bc" },
        { label: "Automated Threat Cluster Dispatch", type: "ai" }
      ],
      uxPoints: [
        "Progressive 4-step wizard structure reduces cognitive burden during distressing fraud reporting.",
        "Automatic evidence hashing (SHA-256) guarantees evidentiary integrity for official law enforcement handoff.",
        "Instant multi-channel dispatch: alerts linked family members, updates the blockchain ledger, and generates a Case ID."
      ]
    }
  };

  // Switch Active Screen
  function switchScreen(screenNum) {
    // 1. Update Screens in Phone Mockup
    document.querySelectorAll('.app-screen').forEach(screen => {
      screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(`screen-${screenNum}`);
    if (targetScreen) {
      targetScreen.classList.add('active');
      // Scroll to top of phone content
      const phoneContent = document.getElementById('screen-container');
      if (phoneContent) phoneContent.scrollTop = 0;
    }

    // 2. Update Header Tabs
    document.querySelectorAll('.screen-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.screen === String(screenNum));
    });

    // 3. Update Phone Dock
    document.querySelectorAll('.dock-item').forEach(item => {
      item.classList.toggle('active', item.dataset.screen === String(screenNum));
    });

    // 4. Update Sidebar Info Card
    const meta = screenMeta[screenNum];
    if (meta) {
      const tagEl = document.getElementById('info-screen-tag');
      const titleEl = document.getElementById('info-screen-title');
      const descEl = document.getElementById('info-screen-desc');
      const tagsContainer = document.getElementById('info-tech-tags');
      const uxContainer = document.getElementById('info-ux-points');

      if (tagEl) tagEl.textContent = meta.tag;
      if (titleEl) titleEl.textContent = meta.title;
      if (descEl) descEl.textContent = meta.desc;

      if (tagsContainer) {
        tagsContainer.innerHTML = meta.techTags.map(t => 
          `<span class="tech-pill ${t.type}">${t.label}</span>`
        ).join('');
      }

      if (uxContainer) {
        uxContainer.innerHTML = meta.uxPoints.map(p => 
          `<li>${p}</li>`
        ).join('');
      }
    }
  }

  // Attach tab and dock click handlers
  document.querySelectorAll('.screen-tab, .dock-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const screenId = btn.dataset.screen;
      if (screenId) switchScreen(screenId);
    });
  });

  // Attach quick-action jump tile handlers
  document.querySelectorAll('[data-jump]').forEach(tile => {
    tile.addEventListener('click', () => {
      const targetScreen = tile.dataset.jump;
      if (targetScreen) switchScreen(targetScreen);
    });
  });

  // Interactive Action: Screen 2 Simulator
  const btnRunScan = document.getElementById('btn-run-scan');
  const scanResultCard = document.getElementById('scan-result-card');
  const btnPasteSample = document.getElementById('btn-paste-sample');
  const smsInput = document.getElementById('sample-sms-input');

  btnRunScan?.addEventListener('click', () => {
    btnRunScan.textContent = "Analyzing with BantayAI Engine...";
    btnRunScan.disabled = true;
    setTimeout(() => {
      btnRunScan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg> Scan Threat with BantayAI`;
      btnRunScan.disabled = false;
      if (scanResultCard) {
        scanResultCard.style.display = 'block';
        scanResultCard.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  });

  btnPasteSample?.addEventListener('click', () => {
    if (smsInput) {
      smsInput.value = "BDO ALERT: Your online banking account has been flagged for suspicious transfer. Secure your funds immediately at https://bdo-online-verification.net or transactions will be blocked.";
    }
  });

  // Interactive Action: Screen 4 Ledger Search
  const btnQueryLedger = document.getElementById('btn-query-ledger');
  btnQueryLedger?.addEventListener('click', () => {
    btnQueryLedger.textContent = "Checking Chain...";
    btnQueryLedger.disabled = true;
    setTimeout(() => {
      btnQueryLedger.textContent = "Search Ledger";
      btnQueryLedger.disabled = false;
      alert("Blockchain Query: Queried 3 peer consortium nodes across PLDT, Globe & GCash networks. Status: Confirmed Blacklisted.");
    }, 400);
  });

  // Interactive Action: Screen 5 Report Submission
  const btnSubmitReport = document.getElementById('btn-submit-report');
  const reportSuccessBox = document.getElementById('report-success-box');
  btnSubmitReport?.addEventListener('click', () => {
    btnSubmitReport.textContent = "Signing Block & Notifying Family...";
    btnSubmitReport.disabled = true;
    setTimeout(() => {
      btnSubmitReport.textContent = "Sign & Submit to Blockchain Ledger";
      btnSubmitReport.disabled = false;
      if (reportSuccessBox) {
        reportSuccessBox.style.display = 'flex';
        reportSuccessBox.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  });

  // Export Screenshot Helper
  const btnExportAll = document.getElementById('btn-export-all');
  btnExportAll?.addEventListener('click', () => {
    window.print();
  });
});
