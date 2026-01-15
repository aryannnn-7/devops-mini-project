// server/seedScenarioQuizzes.js
const mongoose = require("mongoose");
require("dotenv").config();
const ScenarioQuiz = require("./models/ScenarioQuiz"); // ✅ correct

// seedScenarioQuizzes.js (data only)
// Exported as a grouped structure: 30 scenarios × 4 Q each.

const scenarioQuizzes = [
  // 1
  {
    scenario:
      "You receive threatening Instagram DMs demanding money or they’ll leak your private photos. They mention your college and try to scare you into quick payment.",
    questions: [
      {
        question: "What should you do first?",
        options: [
          "Block the user and preserve screenshots as evidence",
          "Pay to end it quickly",
          "Delete your account immediately",
          "Argue with them in DMs"
        ],
        answer: "Block the user and preserve screenshots as evidence"
      },
      {
        question: "Which mindset helps here?",
        options: [
          "Stay calm; this is a crime and you’re protected",
          "Blame yourself and panic",
          "Avoid telling anyone out of shame",
          "Assume nothing can be done"
        ],
        answer: "Stay calm; this is a crime and you’re protected"
      },
      {
        question: "Where should you report online?",
        options: [
          "National Cyber Crime Reporting Portal",
          "RTI Portal",
          "Consumer Helpline",
          "Passport Seva Kendra"
        ],
        answer: "National Cyber Crime Reporting Portal"
      },
      {
        question: "Which laws may apply?",
        options: [
          "IPC Sections 503/506 (criminal intimidation) and IT Act 67/67A",
          "Motor Vehicles Act",
          "Income Tax Act",
          "UGC Attendance Rules"
        ],
        answer: "IPC Sections 503/506 (criminal intimidation) and IT Act 67/67A"
      }
    ]
  },

  // 2
  {
    scenario:
      "A fake Facebook account uses your name and photos to message classmates with obscene content, hurting your reputation.",
    questions: [
      {
        question: "Best immediate step?",
        options: [
          "Report the fake profile and collect evidence",
          "Create another fake account to fight back",
          "Ignore it and hope it fades",
          "Publicly abuse the impersonator"
        ],
        answer: "Report the fake profile and collect evidence"
      },
      {
        question: "Helpful mindset?",
        options: [
          "It’s not your fault; act methodically",
          "Feel guilty and hide",
          "Quit all social media permanently",
          "Argue with everyone who messages you"
        ],
        answer: "It’s not your fault; act methodically"
      },
      {
        question: "Where else to escalate if it continues?",
        options: [
          "Cyber Crime Cell/Portal",
          "RTI Office",
          "Passport Office",
          "Election Commission"
        ],
        answer: "Cyber Crime Cell/Portal"
      },
      {
        question: "Relevant law?",
        options: [
          "IT Act Section 66C (identity theft)",
          "IPC Section 124A",
          "Motor Vehicles Act",
          "Negotiable Instruments Act"
        ],
        answer: "IT Act Section 66C (identity theft)"
      }
    ]
  },

  // 3
  {
    scenario:
      "Seniors keep calling late at night making you perform tasks and demanding money. They threaten to spread rumors if you refuse.",
    questions: [
      {
        question: "What should you do first?",
        options: [
          "Record details/evidence and complain",
          "Try to befriend them",
          "Avoid classes to stay unseen",
          "Offer a small payment to stop it"
        ],
        answer: "Record details/evidence and complain"
      },
      {
        question: "Right mindset?",
        options: [
          "Zero tolerance: you deserve dignity and safety",
          "It’s normal; tolerate it",
          "You must obey to be accepted",
          "You brought this on yourself"
        ],
        answer: "Zero tolerance: you deserve dignity and safety"
      },
      {
        question: "Whom to contact in college?",
        options: [
          "UGC Anti-Ragging Helpline / College Anti-Ragging Committee",
          "Sports Captain",
          "Librarian",
          "Mess Supervisor"
        ],
        answer: "UGC Anti-Ragging Helpline / College Anti-Ragging Committee"
      },
      {
        question: "Which rules protect you?",
        options: [
          "UGC Anti-Ragging Regulations, 2009",
          "Companies Act, 2013",
          "Transfer of Property Act",
          "Factory Act"
        ],
        answer: "UGC Anti-Ragging Regulations, 2009"
      }
    ]
  },

  // 4
  {
    scenario:
      "You ordered a phone online and received an empty box. Support refuses a refund or replacement.",
    questions: [
      {
        question: "First practical step?",
        options: [
          "File a complaint on National Consumer Helpline with evidence",
          "Abuse the courier agent",
          "Wait silently for weeks",
          "Order another phone from same seller"
        ],
        answer: "File a complaint on National Consumer Helpline with evidence"
      },
      {
        question: "Mindset to adopt?",
        options: [
          "Be firm, factual, and persistent",
          "Give up to avoid hassle",
          "Threaten random employees",
          "Assume nothing can be done"
        ],
        answer: "Be firm, factual, and persistent"
      },
      {
        question: "Other platform action?",
        options: [
          "Raise a ticket and escalate via marketplace grievance mechanism",
          "Post a meme",
          "Change your email ID",
          "Delete your bank account"
        ],
        answer: "Raise a ticket and escalate via marketplace grievance mechanism"
      },
      {
        question: "Law that protects you?",
        options: [
          "Consumer Protection Act, 2019",
          "IT Act Section 66D",
          "UGC 2009",
          "Representation of People Act"
        ],
        answer: "Consumer Protection Act, 2019"
      }
    ]
  },

  // 5
  {
    scenario:
      "A morphed obscene image of you is circulating in college WhatsApp groups and causing distress.",
    questions: [
      {
        question: "Immediate action?",
        options: [
          "Save evidence, report to platform and authorities",
          "Beg the group to stop",
          "Leave all groups quietly",
          "Ignore to avoid attention"
        ],
        answer: "Save evidence, report to platform and authorities"
      },
      {
        question: "Helpful mindset?",
        options: [
          "You’re a victim; prioritize safety and support",
          "Feel ashamed and isolate",
          "Don’t tell anyone",
          "Assume it’s your fault"
        ],
        answer: "You’re a victim; prioritize safety and support"
      },
      {
        question: "Campus escalation?",
        options: [
          "Internal Complaints Committee (ICC)",
          "Sports Committee",
          "Alumni Cell",
          "Placement Cell"
        ],
        answer: "Internal Complaints Committee (ICC)"
      },
      {
        question: "Applicable law?",
        options: [
          "IT Act Sections 67/67A",
          "Companies Act",
          "Registration Act",
          "Arbitration Act"
        ],
        answer: "IT Act Sections 67/67A"
      }
    ]
  },

  // 6
  {
    scenario:
      "A telecom/website appears to have shared your Aadhaar and phone number without consent; you get targeted calls and messages.",
    questions: [
      {
        question: "First practical step?",
        options: [
          "Document the misuse and contact the company’s grievance officer",
          "Change your name",
          "Post private data on social media",
          "Do nothing"
        ],
        answer: "Document the misuse and contact the company’s grievance officer"
      },
      {
        question: "Mindset?",
        options: [
          "Assert your privacy rights confidently",
          "Assume privacy doesn’t matter",
          "It’s too late to act",
          "Harass call-center agents"
        ],
        answer: "Assert your privacy rights confidently"
      },
      {
        question: "Where else to complain if unresolved?",
        options: [
          "TRAI / Data Protection Authority (when applicable) and Cyber Crime Portal",
          "Election Commission",
          "NITI Aayog",
          "Public Works Department"
        ],
        answer: "TRAI / Data Protection Authority (when applicable) and Cyber Crime Portal"
      },
      {
        question: "Key legal basis?",
        options: [
          "Right to Privacy (Article 21; Puttaswamy, 2017) and DPDP Act, 2023",
          "Motor Vehicles Act",
          "Arms Act",
          "CGST Act"
        ],
        answer: "Right to Privacy (Article 21; Puttaswamy, 2017) and DPDP Act, 2023"
      }
    ]
  },

  // 7
  {
    scenario:
      "A senior demands your online exam login, threatening to ‘ruin your image’ if you refuse.",
    questions: [
      {
        question: "What should you do?",
        options: [
          "Refuse and report to faculty/admin with evidence",
          "Share login and change later",
          "Switch off phone and disappear",
          "Ask a friend to give their login"
        ],
        answer: "Refuse and report to faculty/admin with evidence"
      },
      {
        question: "Mindset?",
        options: [
          "Integrity and safety over fear",
          "Seniors must be obeyed",
          "Cheating is okay if pressured",
          "It’s a small issue"
        ],
        answer: "Integrity and safety over fear"
      },
      {
        question: "If they access your account anyway, where to complain?",
        options: [
          "Cyber Crime Cell/Portal",
          "Consumer Court",
          "RTI Portal",
          "Passport Seva"
        ],
        answer: "Cyber Crime Cell/Portal"
      },
      {
        question: "Relevant law?",
        options: [
          "IT Act Sections 66C/66D",
          "Motor Vehicles Act",
          "Forest Act",
          "Evidence Act only"
        ],
        answer: "IT Act Sections 66C/66D"
      }
    ]
  },

  // 8
  {
    scenario:
      "A professor makes unwelcome comments about your appearance and sends personal messages after class.",
    questions: [
      {
        question: "First step?",
        options: [
          "Document everything and complain",
          "Ignore to ‘keep peace’",
          "Apologize to the professor",
          "Stop attending class forever"
        ],
        answer: "Document everything and complain"
      },
      {
        question: "Mindset?",
        options: [
          "You deserve a safe learning environment",
          "It’s normal and harmless",
          "You invited it",
          "Stay silent to avoid trouble"
        ],
        answer: "You deserve a safe learning environment"
      },
      {
        question: "College body to approach?",
        options: [
          "Internal Complaints Committee (ICC)",
          "Student Cultural Club",
          "Sports Committee",
          "Library Committee"
        ],
        answer: "Internal Complaints Committee (ICC)"
      },
      {
        question: "Key law?",
        options: [
          "POSH Act, 2013 (in educational institutions too)",
          "Factories Act",
          "Arbitration Act",
          "Companies Act"
        ],
        answer: "POSH Act, 2013 (in educational institutions too)"
      }
    ]
  },

  // 9
  {
    scenario:
      "A ‘scholarship update’ email asks you to click a link; after doing so, your bank details are compromised and money is debited.",
    questions: [
      {
        question: "Immediate action?",
        options: [
          "Contact bank to block card/account and enable fraud report",
          "Wait to see if more money leaves",
          "Email the scammer politely",
          "Delete the email only"
        ],
        answer: "Contact bank to block card/account and enable fraud report"
      },
      {
        question: "Mindset?",
        options: [
          "Act fast; prevention beats regret",
          "It’ll fix itself",
          "Hide it from family",
          "Nothing can be done"
        ],
        answer: "Act fast; prevention beats regret"
      },
      {
        question: "Where to report?",
        options: [
          "National Cyber Crime Reporting Portal (1930 helpline for banking fraud)",
          "UGC Helpline",
          "Consumer Court only",
          "Passport Office"
        ],
        answer: "National Cyber Crime Reporting Portal (1930 helpline for banking fraud)"
      },
      {
        question: "Applicable law?",
        options: [
          "IT Act Section 66D (cheating by personation)",
          "Forest Act",
          "Companies Act",
          "UGC 2009"
        ],
        answer: "IT Act Section 66D (cheating by personation)"
      }
    ]
  },

  // 10
  {
    scenario:
      "A classmate secretly records your private phone call and shares the audio with others as a ‘joke’.",
    questions: [
      {
        question: "First step?",
        options: [
          "Collect proof and ask for removal; escalate if needed",
          "Laugh it off",
          "Record their calls too",
          "Ignore it"
        ],
        answer: "Collect proof and ask for removal; escalate if needed"
      },
      {
        question: "Mindset?",
        options: [
          "Privacy matters; this is not okay",
          "Friends tease; accept it",
          "You’re overreacting",
          "It’s your fault for talking"
        ],
        answer: "Privacy matters; this is not okay"
      },
      {
        question: "Who to approach in college?",
        options: [
          "Grievance Cell/ICC (depending on content)",
          "Sports Club",
          "Exam Cell",
          "Accounts Section"
        ],
        answer: "Grievance Cell/ICC (depending on content)"
      },
      {
        question: "Relevant law?",
        options: [
          "IT Act Section 72/72A (breach of confidentiality/privacy)",
          "Motor Vehicles Act",
          "Contract Act (only)",
          "Income Tax Act"
        ],
        answer: "IT Act Section 72/72A (breach of confidentiality/privacy)"
      }
    ]
  },

  // 11
  {
    scenario:
      "After a breakup, you find a tiny GPS tracker in your bag and notice someone lingering near your hostel repeatedly.",
    questions: [
      {
        question: "Immediate action?",
        options: [
          "Disable/remove the device, preserve evidence, inform authorities",
          "Ignore it",
          "Track them back",
          "Post pictures online first"
        ],
        answer: "Disable/remove the device, preserve evidence, inform authorities"
      },
      {
        question: "Mindset?",
        options: [
          "Your safety is priority; stalking is serious",
          "You must have caused it",
          "It’s romantic attention",
          "Keep it secret to avoid drama"
        ],
        answer: "Your safety is priority; stalking is serious"
      },
      {
        question: "Whom to contact?",
        options: [
          "Police/Cyber Cell and campus security",
          "Transport Office",
          "Cultural Club",
          "Library Desk"
        ],
        answer: "Police/Cyber Cell and campus security"
      },
      {
        question: "Applicable law?",
        options: [
          "IPC Section 354D (stalking)",
          "Companies Act",
          "GST Act",
          "Registration Act"
        ],
        answer: "IPC Section 354D (stalking)"
      }
    ]
  },

  // 12
  {
    scenario:
      "In a shared PG/hostel, you discover a hidden camera in the bathroom pointed at the shower area.",
    questions: [
      {
        question: "First response?",
        options: [
          "Do not destroy evidence; secure the area and call police",
          "Smash the device immediately",
          "Post it on Instagram first",
          "Move out silently"
        ],
        answer: "Do not destroy evidence; secure the area and call police"
      },
      {
        question: "Mindset?",
        options: [
          "This is a grave violation; act decisively",
          "It’s a prank",
          "You’re overreacting",
          "Accept it and move on"
        ],
        answer: "This is a grave violation; act decisively"
      },
      {
        question: "Who else should be informed?",
        options: [
          "PG/Hostel management and ICC if on campus",
          "Only your friends",
          "No one",
          "The canteen staff"
        ],
        answer: "PG/Hostel management and ICC if on campus"
      },
      {
        question: "Relevant provisions?",
        options: [
          "IPC 354C (voyeurism) and IT Act 66E (privacy violation)",
          "Factories Act",
          "Limitation Act",
          "Evidence Act only"
        ],
        answer: "IPC 354C (voyeurism) and IT Act 66E (privacy violation)"
      }
    ]
  },

  // 13
  {
    scenario:
      "A Telegram group shares your phone number and address publicly with abusive captions inviting harassment (doxxing).",
    questions: [
      {
        question: "First step?",
        options: [
          "Collect evidence, report to platform and police/cyber cell",
          "Change SIM only",
          "Ignore it",
          "Reply to abusers"
        ],
        answer: "Collect evidence, report to platform and police/cyber cell"
      },
      {
        question: "Mindset?",
        options: [
          "Stay composed; prioritize safety and support",
          "Engage in fights online",
          "Blame yourself",
          "Keep it secret"
        ],
        answer: "Stay composed; prioritize safety and support"
      },
      {
        question: "What else can help?",
        options: [
          "Request takedown and enable privacy settings/number change",
          "Quit the internet forever",
          "Buy a new phone",
          "Do nothing"
        ],
        answer: "Request takedown and enable privacy settings/number change"
      },
      {
        question: "Likely laws?",
        options: [
          "IPC 354D (stalking), IPC 503/506 (intimidation), IT Act 66E/67",
          "Companies Act",
          "Negotiable Instruments Act",
          "RTI Act"
        ],
        answer: "IPC 354D (stalking), IPC 503/506 (intimidation), IT Act 66E/67"
      }
    ]
  },

  // 14
  {
    scenario:
      "A deepfake explicit video with your face is circulating in college groups.",
    questions: [
      {
        question: "First action?",
        options: [
          "Preserve proof and file takedown/complaints immediately",
          "Ignore to avoid attention",
          "Threaten random students",
          "Delete all your accounts"
        ],
        answer: "Preserve proof and file takedown/complaints immediately"
      },
      {
        question: "Mindset?",
        options: [
          "You are not to blame; seek support",
          "Feel ashamed and isolate",
          "Accept it as a joke",
          "Stay silent"
        ],
        answer: "You are not to blame; seek support"
      },
      {
        question: "Whom to contact on campus?",
        options: [
          "ICC/Grievance Cell",
          "Sports Council",
          "Library",
          "Hostel Mess"
        ],
        answer: "ICC/Grievance Cell"
      },
      {
        question: "Applicable law?",
        options: [
          "IT Act Sections 67/67A and related IPC provisions",
          "Sale of Goods Act",
          "Transfer of Property Act",
          "Income Tax Act"
        ],
        answer: "IT Act Sections 67/67A and related IPC provisions"
      }
    ]
  },

  // 15
  {
    scenario:
      "A loan app demands repayment you never took, spams your contacts with abusive messages, and threatens to leak edited photos.",
    questions: [
      {
        question: "Immediate step?",
        options: [
          "Report to Cyber Crime Portal and your bank; deny consent and document",
          "Pay to end harassment",
          "Change your name",
          "Abuse them back"
        ],
        answer: "Report to Cyber Crime Portal and your bank; deny consent and document"
      },
      {
        question: "Mindset?",
        options: [
          "Stay firm; this is harassment and misuse of data",
          "Give in to stop it",
          "Hide it from everyone",
          "There’s no help"
        ],
        answer: "Stay firm; this is harassment and misuse of data"
      },
      {
        question: "Regulatory escalation?",
        options: [
          "RBI Sachet portal / complaint channels",
          "Election Commission",
          "RTI Portal",
          "Sports Council"
        ],
        answer: "RBI Sachet portal / complaint channels"
      },
      {
        question: "Legal basis?",
        options: [
          "DPDP Act 2023, IT Act 72/72A, IPC 503/506",
          "Companies Act",
          "Contract Act (only)",
          "Patent Act"
        ],
        answer: "DPDP Act 2023, IT Act 72/72A, IPC 503/506"
      }
    ]
  },

  // 16
  {
    scenario:
      "An ex-partner threatens to share your intimate photos unless you ‘do as they say’.",
    questions: [
      {
        question: "First response?",
        options: [
          "Stop contact, collect evidence, file complaint",
          "Negotiate terms",
          "Delete phone gallery",
          "Meet alone to ‘sort it’"
        ],
        answer: "Stop contact, collect evidence, file complaint"
      },
      {
        question: "Mindset?",
        options: [
          "It’s not your fault; get support",
          "Feel ashamed and isolated",
          "Give in quietly",
          "Blame yourself"
        ],
        answer: "It’s not your fault; get support"
      },
      {
        question: "Where to report?",
        options: [
          "Cyber Crime Portal/Police and ICC (if campus related)",
          "Sports Club",
          "Library",
          "Canteen"
        ],
        answer: "Cyber Crime Portal/Police and ICC (if campus related)"
      },
      {
        question: "Law?",
        options: [
          "IT Act 67A/66E and IPC 354C, 503/506",
          "Factories Act",
          "Companies Act",
          "Arbitration Act"
        ],
        answer: "IT Act 67A/66E and IPC 354C, 503/506"
      }
    ]
  },

  // 17
  {
    scenario:
      "A caller claims to be from your bank for KYC verification and asks for OTP/PIN.",
    questions: [
      {
        question: "Correct action?",
        options: [
          "Never share OTP/PIN; hang up and call bank on official number",
          "Share OTP quickly",
          "Text them your PIN only",
          "Ignore the bank forever"
        ],
        answer: "Never share OTP/PIN; hang up and call bank on official number"
      },
      {
        question: "Mindset?",
        options: [
          "Skeptical and security-first",
          "Trust every caller",
          "Fearful and rushed",
          "Embarrassed to verify"
        ],
        answer: "Skeptical and security-first"
      },
      {
        question: "Where to report?",
        options: [
          "1930 helpline / Cyber Crime Portal and bank",
          "UGC Helpline",
          "RTI Portal",
          "Railway Enquiry"
        ],
        answer: "1930 helpline / Cyber Crime Portal and bank"
      },
      {
        question: "Law?",
        options: [
          "IT Act Section 66D",
          "Motor Vehicles Act",
          "Companies Act",
          "Evidence Act"
        ],
        answer: "IT Act Section 66D"
      }
    ]
  },

  // 18
  {
    scenario:
      "A buyer on a marketplace sends a fake payment screenshot and pressures you to ship the product.",
    questions: [
      {
        question: "What should you do?",
        options: [
          "Ship only after confirmed credit in your bank",
          "Trust the screenshot",
          "Send item to be polite",
          "Accept wallet screenshot"
        ],
        answer: "Ship only after confirmed credit in your bank"
      },
      {
        question: "Mindset?",
        options: [
          "Verify first; no urgency",
          "Rushed compliance",
          "Trust strangers online",
          "Fear missing the sale"
        ],
        answer: "Verify first; no urgency"
      },
      {
        question: "Where to escalate fraud?",
        options: [
          "Cyber Crime Portal and platform support",
          "Election Commission",
          "Municipal Office",
          "RTI Commission"
        ],
        answer: "Cyber Crime Portal and platform support"
      },
      {
        question: "Law in play?",
        options: [
          "IPC 420 and IT Act 66D (as applicable)",
          "Companies Act",
          "Income Tax Act",
          "UGC Rules"
        ],
        answer: "IPC 420 and IT Act 66D (as applicable)"
      }
    ]
  },

  // 19
  {
    scenario:
      "A Telegram/WhatsApp ‘crypto tips’ group asks you to deposit funds to an unknown wallet promising guaranteed returns.",
    questions: [
      {
        question: "What’s the right move?",
        options: [
          "Do not invest; report the group",
          "Invest a small test amount",
          "Invite friends to join",
          "Share your seed phrase for verification"
        ],
        answer: "Do not invest; report the group"
      },
      {
        question: "Mindset?",
        options: [
          "If it’s guaranteed, it’s likely a scam",
          "Easy money is real",
          "Act fast before missing out",
          "Trust anonymous admins"
        ],
        answer: "If it’s guaranteed, it’s likely a scam"
      },
      {
        question: "Where to report?",
        options: [
          "Cyber Crime Portal and platform",
          "SEBI grievance (if registered entity)",
          "Railway Enquiry",
          "UGC Helpline"
        ],
        answer: "Cyber Crime Portal and platform"
      },
      {
        question: "Law?",
        options: [
          "IPC 420 and IT Act 66D (cheating/personation)",
          "Factories Act",
          "RTI Act",
          "Arbitration Act"
        ],
        answer: "IPC 420 and IT Act 66D (cheating/personation)"
      }
    ]
  },

  // 20
  {
    scenario:
      "A college WhatsApp group shares private pictures of a classmate with sexual comments and ratings.",
    questions: [
      {
        question: "First action?",
        options: [
          "Collect evidence, report to admins and ICC",
          "Mute group and move on",
          "Forward to friends",
          "Vote in the poll"
        ],
        answer: "Collect evidence, report to admins and ICC"
      },
      {
        question: "Mindset?",
        options: [
          "Support the victim and avoid victim-blaming",
          "It’s harmless fun",
          "They asked for it",
          "Stay silent"
        ],
        answer: "Support the victim and avoid victim-blaming"
      },
      {
        question: "Where else to report?",
        options: [
          "Cyber Crime Portal and platform takedown",
          "Consumer Helpline",
          "RTI Portal",
          "Alumni Office"
        ],
        answer: "Cyber Crime Portal and platform takedown"
      },
      {
        question: "Laws that may apply?",
        options: [
          "IPC 354A/354C and IT Act 67/67A",
          "Companies Act",
          "GST Act",
          "Excise Act"
        ],
        answer: "IPC 354A/354C and IT Act 67/67A"
      }
    ]
  },

  // 21
  {
    scenario:
      "A hostel warden confiscates your phone and demands to read all private chats ‘for discipline’.",
    questions: [
      {
        question: "First practical step?",
        options: [
          "Politely refuse, ask for written reason, escalate to authorities",
          "Hand over all passwords",
          "Run away from hostel",
          "Delete all chats instantly"
        ],
        answer: "Politely refuse, ask for written reason, escalate to authorities"
      },
      {
        question: "Mindset?",
        options: [
          "Privacy is a right; be respectful but firm",
          "You have no rights",
          "Obey without question",
          "It’s easier to accept"
        ],
        answer: "Privacy is a right; be respectful but firm"
      },
      {
        question: "Where to escalate?",
        options: [
          "College Grievance Cell/ICC/Principal",
          "Sports Captain",
          "Student Union only",
          "Mess Committee"
        ],
        answer: "College Grievance Cell/ICC/Principal"
      },
      {
        question: "Legal basis?",
        options: [
          "Article 21 Right to Privacy (Puttaswamy, 2017); IT Act 72/72A",
          "Factories Act",
          "Evidence Act only",
          "Arbitration Act"
        ],
        answer: "Article 21 Right to Privacy (Puttaswamy, 2017); IT Act 72/72A"
      }
    ]
  },

  // 22
  {
    scenario:
      "Your college posts a spreadsheet of students with phone numbers and emails on a public web page.",
    questions: [
      {
        question: "First step?",
        options: [
          "Request immediate takedown via college DPO/grievance officer",
          "Ignore it",
          "Forward it widely",
          "Comment jokes under the post"
        ],
        answer: "Request immediate takedown via college DPO/grievance officer"
      },
      {
        question: "Mindset?",
        options: [
          "Privacy by default; minimal disclosure",
          "Public data is fine",
          "No harm in sharing",
          "It’s your fault"
        ],
        answer: "Privacy by default; minimal disclosure"
      },
      {
        question: "External escalation if needed?",
        options: [
          "Data Protection Authority (when applicable) / Cyber Crime Portal",
          "UGC Sports Wing",
          "Municipal Office",
          "Election Commission"
        ],
        answer: "Data Protection Authority (when applicable) / Cyber Crime Portal"
      },
      {
        question: "Legal basis?",
        options: [
          "DPDP Act 2023 and Right to Privacy (Art 21)",
          "Factories Act",
          "Motor Vehicles Act",
          "Sale of Goods Act"
        ],
        answer: "DPDP Act 2023 and Right to Privacy (Art 21)"
      }
    ]
  },

  // 23
  {
    scenario:
      "A teacher publicly body-shames a student with sexualized comments during class.",
    questions: [
      {
        question: "First action?",
        options: [
          "Document incident and complain",
          "Laugh along to avoid conflict",
          "Skip class forever",
          "Apologize to the teacher"
        ],
        answer: "Document incident and complain"
      },
      {
        question: "Mindset?",
        options: [
          "Such comments are harassment, not ‘discipline’",
          "It’s normal in college",
          "Student is to blame",
          "Nothing can be done"
        ],
        answer: "Such comments are harassment, not ‘discipline’"
      },
      {
        question: "Whom to approach?",
        options: [
          "ICC/Principal/Grievance Cell",
          "Cultural Committee",
          "Sports Club",
          "Lab Assistant"
        ],
        answer: "ICC/Principal/Grievance Cell"
      },
      {
        question: "Applicable framework?",
        options: [
          "POSH Act, 2013 and UGC guidelines",
          "Companies Act",
          "Forest Act",
          "Evidence Act only"
        ],
        answer: "POSH Act, 2013 and UGC guidelines"
      }
    ]
  },

  // 24
  {
    scenario:
      "A cyber café scanned your ID to print a form; later you discover your ID copy was shared and used elsewhere.",
    questions: [
      {
        question: "First step?",
        options: [
          "Confront the café, demand deletion, and file complaint with evidence",
          "Forget it",
          "Change your name",
          "Threaten random staff"
        ],
        answer: "Confront the café, demand deletion, and file complaint with evidence"
      },
      {
        question: "Mindset?",
        options: [
          "Data handling must be lawful and minimal",
          "Copies are fine everywhere",
          "It’s harmless",
          "You can’t question vendors"
        ],
        answer: "Data handling must be lawful and minimal"
      },
      {
        question: "Where to report?",
        options: [
          "Cyber Crime Portal / local police",
          "UGC Helpline",
          "SEBI",
          "Railway Enquiry"
        ],
        answer: "Cyber Crime Portal / local police"
      },
      {
        question: "Law?",
        options: [
          "IT Act Section 72A (disclosure in breach of lawful contract)",
          "Motor Vehicles Act",
          "Companies Act",
          "UGC 2009"
        ],
        answer: "IT Act Section 72A (disclosure in breach of lawful contract)"
      }
    ]
  },

  // 25
  {
    scenario:
      "A friend posts screenshots of your private chat on Instagram stories without your consent.",
    questions: [
      {
        question: "First move?",
        options: [
          "Ask takedown, preserve evidence, and consider complaint",
          "Shout at them publicly",
          "Ignore it",
          "Delete your account"
        ],
        answer: "Ask takedown, preserve evidence, and consider complaint"
      },
      {
        question: "Mindset?",
        options: [
          "Consent and privacy are essential",
          "Screenshots are public property",
          "Friends can share anything",
          "It’s a harmless prank"
        ],
        answer: "Consent and privacy are essential"
      },
      {
        question: "Where to complain if needed?",
        options: [
          "Platform + Cyber Crime Portal",
          "Election Commission",
          "UGC Sports Wing",
          "Municipal Office"
        ],
        answer: "Platform + Cyber Crime Portal"
      },
      {
        question: "Relevant provision?",
        options: [
          "IT Act 72/72A and Article 21 privacy",
          "Companies Act",
          "Indian Telegraph Act",
          "Forest Act"
        ],
        answer: "IT Act 72/72A and Article 21 privacy"
      }
    ]
  },

  // 26
  {
    scenario:
      "A senior posts your photo with your handle and invites followers to ‘teach you a lesson’, leading to threats in DMs.",
    questions: [
      {
        question: "What should you do?",
        options: [
          "Collect evidence, report to platform, ICC and police",
          "Insult them back publicly",
          "Delete your account",
          "Ignore the messages"
        ],
        answer: "Collect evidence, report to platform, ICC and police"
      },
      {
        question: "Mindset?",
        options: [
          "Targeted harassment is not okay; take action",
          "It’s normal online",
          "You deserved it",
          "Stay silent"
        ],
        answer: "Targeted harassment is not okay; take action"
      },
      {
        question: "Which college body?",
        options: [
          "Anti-Ragging Committee/ICC",
          "Gym Instructor",
          "Canteen Manager",
          "Library Desk"
        ],
        answer: "Anti-Ragging Committee/ICC"
      },
      {
        question: "Likely laws?",
        options: [
          "IPC 503/506 and 354D; IT Act 66E/67 (as applicable)",
          "Companies Act",
          "Sale of Goods Act",
          "Arbitration Act"
        ],
        answer: "IPC 503/506 and 354D; IT Act 66E/67 (as applicable)"
      }
    ]
  },

  // 27
  {
    scenario:
      "A class group admin demands money to let you share notes; threatens to remove you and spread rumours otherwise.",
    questions: [
      {
        question: "First step?",
        options: [
          "Refuse, keep evidence, report to platform/college",
          "Pay quietly",
          "Leave and stay silent",
          "Add more people to the group"
        ],
        answer: "Refuse, keep evidence, report to platform/college"
      },
      {
        question: "Mindset?",
        options: [
          "Coercion/extortion is not acceptable",
          "It’s just group culture",
          "Do whatever they say",
          "It’s harmless"
        ],
        answer: "Coercion/extortion is not acceptable"
      },
      {
        question: "Where to escalate?",
        options: [
          "College authorities/ICC and platform",
          "District Collector",
          "SEBI",
          "Forest Dept"
        ],
        answer: "College authorities/ICC and platform"
      },
      {
        question: "Possible law?",
        options: [
          "IPC 503/506 (intimidation) and IPC 384 (extortion) where applicable",
          "Companies Act",
          "Limitation Act",
          "Negotiable Instruments Act"
        ],
        answer: "IPC 503/506 (intimidation) and IPC 384 (extortion) where applicable"
      }
    ]
  },

  // 28
  {
    scenario:
      "A company’s recruiter suggests you send ‘personal photos’ in exchange for an internship offer.",
    questions: [
      {
        question: "Correct action?",
        options: [
          "Refuse, document, and report to ICC/HR/authority",
          "Comply to secure the offer",
          "Keep chatting to negotiate",
          "Ignore and forget"
        ],
        answer: "Refuse, document, and report to ICC/HR/authority"
      },
      {
        question: "Mindset?",
        options: [
          "This is harassment; you have the right to say no",
          "It’s harmless flirting",
          "It’s your chance for career",
          "You caused it"
        ],
        answer: "This is harassment; you have the right to say no"
      },
      {
        question: "Where to report (campus-linked internship)?",
        options: [
          "ICC/Placement Cell and company HR",
          "Sports Council",
          "Student Union",
          "Mess Committee"
        ],
        answer: "ICC/Placement Cell and company HR"
      },
      {
        question: "Law?",
        options: [
          "POSH Act, 2013 and IPC 354A",
          "Companies Act only",
          "Evidence Act",
          "Income Tax Act"
        ],
        answer: "POSH Act, 2013 and IPC 354A"
      }
    ]
  },

  // 29
  {
    scenario:
      "An anonymous meme page targets your caste/religion with abusive posts and encourages hate against you and your friends.",
    questions: [
      {
        question: "First action?",
        options: [
          "Collect evidence and report to platform and police",
          "Argue in comments",
          "Do nothing",
          "Forward to escalate drama"
        ],
        answer: "Collect evidence and report to platform and police"
      },
      {
        question: "Mindset?",
        options: [
          "Hate speech is serious; prioritize safety",
          "It’s just jokes",
          "You deserve it",
          "Stay quiet"
        ],
        answer: "Hate speech is serious; prioritize safety"
      },
      {
        question: "Who else on campus?",
        options: [
          "College authorities/disciplinary committee",
          "Sports Coach",
          "Transport Office",
          "Library"
        ],
        answer: "College authorities/disciplinary committee"
      },
      {
        question: "Possible statutes?",
        options: [
          "IPC 153A/295A (as applicable) and IT Act provisions",
          "Companies Act",
          "Forest Act",
          "Arms Act"
        ],
        answer: "IPC 153A/295A (as applicable) and IT Act provisions"
      }
    ]
  },

  // 30
  {
    scenario:
      "A dating app match coaxes you to share intimate images and then demands money, threatening to expose you.",
    questions: [
      {
        question: "What should you do first?",
        options: [
          "Stop contact, preserve evidence, file complaint",
          "Pay once to stop it",
          "Meet them in person",
          "Delete everything quietly"
        ],
        answer: "Stop contact, preserve evidence, file complaint"
      },
      {
        question: "Mindset?",
        options: [
          "You’re a victim of sextortion; seek help",
          "It’s your fault; hide it",
          "There’s no remedy",
          "Comply to ‘finish it’"
        ],
        answer: "You’re a victim of sextortion; seek help"
      },
      {
        question: "Where to report?",
        options: [
          "Cyber Crime Portal/1930 and platform report",
          "Consumer Court",
          "RTI Commission",
          "Railway Police"
        ],
        answer: "Cyber Crime Portal/1930 and platform report"
      },
      {
        question: "Applicable law?",
        options: [
          "IT Act 67A/66E and IPC 354C, 503/506",
          "Motor Vehicles Act",
          "Indian Contract Act (only)",
          "GST Act"
        ],
        answer: "IT Act 67A/66E and IPC 354C, 503/506"
      }
    ]
  }
];

//module.exports = scenarioQuizzes;

const formattedQuizzes = scenarioQuizzes.map((sc, index) => ({
  scenarioId: `scenario-${index + 1}`,
  scenario: sc.scenario,
  questions: sc.questions.map((q, i) => ({
    subIndex: i + 1,
    question: q.question,
    options: q.options,
    answer: q.answer,
  }))
}));


mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await ScenarioQuiz.deleteMany({}); // ✅ clear old scenario quizzes
    await ScenarioQuiz.insertMany(formattedQuizzes); // ✅ insert new ones
    console.log("✅ Scenario Quizzes inserted successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error inserting scenario quizzes:", err);
    process.exit(1);
  });