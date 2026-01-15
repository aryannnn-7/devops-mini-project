// server/seedQuizzes.js
const mongoose = require("mongoose");
require("dotenv").config();
const Quiz = require("./models/quiz");

const quizzes = [
  // Cybercrime
  {
    question: "Which section of the IT Act deals with cyberbullying?",
    options: ["Section 66A", "Section 67", "Section 354D", "Section 499"],
    answer: "Section 66A",
    category: "cybercrime",
  },
  {
    question: "Which IPC section addresses cyberstalking?",
    options: ["Section 66F", "Section 354D", "Section 500", "Section 43A"],
    answer: "Section 354D",
    category: "cybercrime",
  },
  {
    question: "Section 66C of the IT Act deals with?",
    options: [
      "Hacking",
      "Identity Theft",
      "Cyberterrorism",
      "Data Breach",
    ],
    answer: "Identity Theft",
    category: "cybercrime",
  },
  {
    question: "Which section penalizes publishing obscene electronic content?",
    options: ["Section 66E", "Section 67", "Section 43", "Section 499"],
    answer: "Section 67",
    category: "cybercrime",
  },
  {
    question: "Cyberterrorism is covered under which section of the IT Act?",
    options: ["Section 66F", "Section 43A", "Section 354D", "Section 500"],
    answer: "Section 66F",
    category: "cybercrime",
  },
  {
    question: "Which IPC section deals with defamation?",
    options: ["Section 354A", "Section 500", "Section 67", "Section 66E"],
    answer: "Section 500",
    category: "cybercrime",
  },
  {
    question: "Criminal intimidation online is covered under which IPC sections?",
    options: ["Section 503 & 506", "Section 66C", "Section 43", "Section 499"],
    answer: "Section 503 & 506",
    category: "cybercrime",
  },
  {
    question: "Which section punishes capturing private images without consent?",
    options: ["Section 66E", "Section 43", "Section 354A", "Section 499"],
    answer: "Section 66E",
    category: "cybercrime",
  },
  {
    question: "Which section penalizes hacking under IT Act?",
    options: ["Section 66", "Section 354D", "Section 499", "Section 67"],
    answer: "Section 66",
    category: "cybercrime",
  },
  {
    question: "What is the maximum imprisonment for cyberterrorism under Section 66F?",
    options: ["3 years", "5 years", "Life Imprisonment", "10 years"],
    answer: "Life Imprisonment",
    category: "cybercrime",
  },

  // Data Protection
  {
    question: "Which Article of the Constitution guarantees Right to Privacy?",
    options: ["Article 14", "Article 19", "Article 21", "Article 25"],
    answer: "Article 21",
    category: "data-protection",
  },
  {
    question: "Which Act in 2023 strengthens personal data rights in India?",
    options: [
      "Information Technology Act",
      "Digital Personal Data Protection Act",
      "Cybersecurity Act",
      "Right to Information Act",
    ],
    answer: "Digital Personal Data Protection Act",
    category: "data-protection",
  },
  {
    question: "Section 43A of IT Act deals with?",
    options: [
      "Cyberterrorism",
      "Organizational negligence in data protection",
      "Cyberstalking",
      "Hacking",
    ],
    answer: "Organizational negligence in data protection",
    category: "data-protection",
  },
  {
    question: "Which rule mandates platforms to protect user data?",
    options: [
      "IT (Reasonable Security Practices) Rules, 2011",
      "Cybersecurity Policy 2022",
      "Data Protection Rule, 2023",
      "Section 67 of IT Act",
    ],
    answer: "IT (Reasonable Security Practices) Rules, 2011",
    category: "data-protection",
  },
  {
    question: "Unauthorized sharing of personal data is punishable under?",
    options: ["IT Act", "UGC Act", "IPC 354D", "Article 19"],
    answer: "IT Act",
    category: "data-protection",
  },
  {
    question: "The Puttaswamy judgment is related to?",
    options: [
      "Cybercrime",
      "Right to Privacy",
      "Freedom of Speech",
      "Freedom of Religion",
    ],
    answer: "Right to Privacy",
    category: "data-protection",
  },
  {
    question: "Under DPDP Act 2023, individuals can?",
    options: [
      "Delete personal data",
      "Block cybercriminals",
      "Access police records",
      "Ban websites",
    ],
    answer: "Delete personal data",
    category: "data-protection",
  },
  {
    question: "Which section of IT Act penalizes identity theft?",
    options: ["Section 66C", "Section 66E", "Section 354D", "Section 43A"],
    answer: "Section 66C",
    category: "data-protection",
  },
  {
    question: "Data breach compensation is covered under?",
    options: ["Section 43A", "Section 354D", "Section 66E", "Section 499"],
    answer: "Section 43A",
    category: "data-protection",
  },
  {
    question: "Right to correct and erase data is provided under?",
    options: [
      "Digital Personal Data Protection Act, 2023",
      "Cybersecurity Law",
      "IT Act, 2000",
      "Right to Information Act",
    ],
    answer: "Digital Personal Data Protection Act, 2023",
    category: "data-protection",
  },

  // Student Safety
  {
    question: "UGC's anti-ragging regulations were enforced in which year?",
    options: ["2005", "2007", "2009", "2012"],
    answer: "2009",
    category: "student-safety",
  },
  {
    question: "Which IPC section addresses sexual harassment?",
    options: ["Section 354A", "Section 354D", "Section 66A", "Section 43"],
    answer: "Section 354A",
    category: "student-safety",
  },
  {
    question: "Maharashtra Prohibition of Ragging Act was passed in?",
    options: ["1997", "1999", "2001", "2003"],
    answer: "1999",
    category: "student-safety",
  },
  {
    question: "UGC anti-ragging helpline number is?",
    options: [
      "1800-180-5522",
      "100",
      "181",
      "1098",
    ],
    answer: "1800-180-5522",
    category: "student-safety",
  },
  {
    question: "Which regulation mandates zero tolerance for ragging?",
    options: [
      "UGC Regulations 2009",
      "IT Act 2000",
      "DPDP Act 2023",
      "Cybersecurity Policy",
    ],
    answer: "UGC Regulations 2009",
    category: "student-safety",
  },
  {
    question: "Online teacher misconduct can be reported under?",
    options: [
      "IPC Section 354A",
      "IT Act Section 67",
      "UGC 2009",
      "Section 66C",
    ],
    answer: "IPC Section 354A",
    category: "student-safety",
  },
  {
    question: "Which IPC section addresses voyeurism?",
    options: ["Section 354C", "Section 354A", "Section 66C", "Section 499"],
    answer: "Section 354C",
    category: "student-safety",
  },
  {
    question: "Anonymous ragging complaints can be filed through?",
    options: [
      "UGC Anti-Ragging Portal",
      "Cyber Cell",
      "Consumer Court",
      "RTI Portal",
    ],
    answer: "UGC Anti-Ragging Portal",
    category: "student-safety",
  },
  {
    question: "What is the punishment for ragging under UGC rules?",
    options: [
      "Expulsion, fine, imprisonment",
      "Warning",
      "Community service",
      "Suspension only",
    ],
    answer: "Expulsion, fine, imprisonment",
    category: "student-safety",
  },
  {
    question: "Which act criminalizes ragging in India?",
    options: [
      "Maharashtra Prohibition of Ragging Act",
      "Cybersecurity Act",
      "IT Act",
      "DPDP Act",
    ],
    answer: "Maharashtra Prohibition of Ragging Act",
    category: "student-safety",
  },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    await Quiz.deleteMany();
    await Quiz.insertMany(quizzes);
    console.log("✅ 50 Quizzes inserted successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error inserting quizzes:", err);
    process.exit(1);
  });
