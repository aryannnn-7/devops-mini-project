// server/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Right = require('./models/rights');

dotenv.config();

const rights = [
  {
    title: "Right Against Cyberbullying",
    category: "cybercrime",
    section: "Section 66A & Section 67 of the IT Act",
    description: "Sending offensive or sexually explicit content online is punishable. Students can report cyberbullying to local police or cyber cells."
  },
  {
    title: "Right Against Online Defamation",
    category: "cybercrime",
    section: "Sections 499 & 500 of IPC",
    description: "If a student's reputation is harmed online, they can file a complaint under these sections."
  },
  {
    title: "Right to Protection from Cyberstalking",
    category: "cybercrime",
    section: "Section 354D of IPC",
    description: "Students facing repeated online harassment can report it to the authorities."
  },
  {
    title: "Right Against Ragging in Colleges",
    category: "student-safety",
    section: "UGC Regulations (2009) & Helpline 1800-180-5522",
    description: "UGC mandates zero tolerance for ragging. Students can report anonymously to anti-ragging cells or UGC helpline."
  },
  {
    title: "Right to Privacy in Digital Spaces",
    category: "data-protection",
    section: "Article 21 of the Constitution + Puttaswamy Judgment",
    description: "Unauthorized sharing of personal data is punishable under the IT Act."
  },
  {
    title: "Right to Report Harassment on Social Media",
    category: "cybercrime",
    section: "Section 66E of the IT Act",
    description: "Protects against violation of privacy, such as sharing intimate images or details."
  },
  {
    title: "Right Against Sending Threatening Messages Online",
    category: "cybercrime",
    section: "Sections 503 & 506 of IPC",
    description: "Criminal intimidation (e.g., threats via WhatsApp, email) is punishable."
  },
  {
    title: "Right to Report Data Misuse by Apps/Websites",
    category: "data-protection",
    section: "IT Rules, 2011",
    description: "Platforms must protect user data. Students can file complaints if their data is misused."
  },
  {
    title: "Right to Report Inappropriate Teacher Conduct Online",
    category: "student-safety",
    section: "Section 354A of IPC",
    description: "Covers harassment or misconduct by faculty online."
  },
  {
    title: "Right Against Identity Theft",
    category: "cybercrime",
    section: "Section 66C of the IT Act",
    description: "Penalizes misuse of student IDs, Aadhaar numbers, or email accounts."
  },
  {
    title: "Right to Digital Privacy",
    category: "data-protection",
    section: "Article 21 + Digital Personal Data Protection Act, 2023",
    description: "Grants rights to access, correct, erase, and control personal data."
  },
  {
    title: "Right Against Institutional Data Negligence",
    category: "data-protection",
    section: "Section 43A of the IT Act",
    description: "Organizations must protect sensitive personal data, or they are liable to compensate affected individuals."
  },
  {
    title: "Right Against Publishing Private Content Without Consent",
    category: "cybercrime",
    section: "Sections 66E & 67 of the IT Act",
    description: "Penalizes publishing obscene electronic content without consent."
  },
  {
    title: "Right Against Unauthorized Access & Hacking",
    category: "cybercrime",
    section: "Sections 43 & 66 of the IT Act",
    description: "Covers unauthorized access, data theft, and damage to computer systems."
  },
  {
    title: "Right Against Cyberterrorism",
    category: "cybercrime",
    section: "Section 66F of the IT Act",
    description: "Acts threatening national integrity or security online are punishable with life imprisonment."
  },
  {
    title: "Right Against Ragging in Educational Institutions",
    category: "student-safety",
    section: "Maharashtra Prohibition of Ragging Act, 1999 & UGC Regulations",
    description: "Criminalizes ragging with imprisonment up to 2 years, fines, and possible expulsion."
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  await Right.deleteMany(); // Clears existing rights — optional
  await Right.insertMany(rights);
  console.log('✅ Rights inserted successfully!');
  process.exit();
}).catch(err => {
  console.error('❌ Error inserting rights:', err);
  process.exit(1);
});
