export type Professional = {
  id: string;
  name: string;
  qualification: "CA" | "CS" | "CMA";
  experience: number;
  rating: number;
  reviews: number;
  languages: string[];
  price: number;
  expertise: string[];
  bio: string;
  avatar: string;
  verified: boolean;
  slots: string[];
};

const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=2563eb,16a34a,7c3aed,db2777&textColor=ffffff`;

export const professionals: Professional[] = [
  {
    id: "p1",
    name: "Aanya Mehta",
    qualification: "CA",
    experience: 8,
    rating: 4.9,
    reviews: 312,
    languages: ["English", "Hindi", "Gujarati"],
    price: 499,
    expertise: ["GST", "ITR Filing", "Tax Planning"],
    bio: "Chartered Accountant with 8+ years helping startups and SMEs simplify GST compliance and tax planning.",
    avatar: avatar("Aanya Mehta"),
    verified: true,
    slots: ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM", "6:00 PM"],
  },
  {
    id: "p2",
    name: "Rohan Verma",
    qualification: "CS",
    experience: 12,
    rating: 4.8,
    reviews: 540,
    languages: ["English", "Hindi"],
    price: 799,
    expertise: ["Company Registration", "ROC Filings", "Compliance"],
    bio: "Company Secretary specializing in incorporation, secretarial audits and corporate governance.",
    avatar: avatar("Rohan Verma"),
    verified: true,
    slots: ["9:00 AM", "12:00 PM", "3:00 PM", "5:00 PM"],
  },
  {
    id: "p3",
    name: "Priya Nair",
    qualification: "CA",
    experience: 5,
    rating: 4.7,
    reviews: 184,
    languages: ["English", "Malayalam", "Tamil"],
    price: 349,
    expertise: ["ITR Filing", "Personal Tax", "Investments"],
    bio: "Friendly CA focused on individual tax filing and salaried-class advisory.",
    avatar: avatar("Priya Nair"),
    verified: true,
    slots: ["10:30 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
  },
  {
    id: "p4",
    name: "Karan Shah",
    qualification: "CMA",
    experience: 10,
    rating: 4.6,
    reviews: 221,
    languages: ["English", "Hindi", "Marathi"],
    price: 599,
    expertise: ["Cost Audit", "Budgeting", "Financial Planning"],
    bio: "Cost Accountant helping manufacturing businesses optimize cost structures.",
    avatar: avatar("Karan Shah"),
    verified: true,
    slots: ["11:00 AM", "2:30 PM", "5:30 PM"],
  },
  {
    id: "p5",
    name: "Neha Reddy",
    qualification: "CA",
    experience: 6,
    rating: 4.9,
    reviews: 276,
    languages: ["English", "Telugu", "Hindi"],
    price: 449,
    expertise: ["GST", "TDS", "Audit"],
    bio: "Expert in GST advisory, TDS compliance and statutory audits for SMEs.",
    avatar: avatar("Neha Reddy"),
    verified: true,
    slots: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM"],
  },
  {
    id: "p6",
    name: "Arjun Kapoor",
    qualification: "CS",
    experience: 15,
    rating: 4.8,
    reviews: 612,
    languages: ["English", "Hindi", "Punjabi"],
    price: 999,
    expertise: ["FEMA", "M&A", "Corporate Law"],
    bio: "Senior CS with 15+ years across M&A, FEMA, and complex corporate restructuring.",
    avatar: avatar("Arjun Kapoor"),
    verified: true,
    slots: ["10:00 AM", "1:30 PM", "4:00 PM"],
  },
];

export const services = [
  { id: "gst", name: "GST Filing", icon: "Receipt" },
  { id: "itr", name: "ITR Filing", icon: "FileText" },
  { id: "company", name: "Company Registration", icon: "Building2" },
  { id: "audit", name: "Audit & Assurance", icon: "ShieldCheck" },
  { id: "tds", name: "TDS Compliance", icon: "Calculator" },
  { id: "tax", name: "Tax Planning", icon: "TrendingUp" },
];

export const reviews = [
  { id: "r1", name: "Vikas S.", rating: 5, text: "Solved my GST notice in one call. Super clear advice!", date: "2 weeks ago" },
  { id: "r2", name: "Meera K.", rating: 5, text: "Patient and professional. Will book again.", date: "1 month ago" },
  { id: "r3", name: "Ankit R.", rating: 4, text: "Helpful session, good value for money.", date: "1 month ago" },
];

export const dummyAppointments = [
  { id: "a1", professionalId: "p1", professionalName: "Aanya Mehta", service: "GST Filing", date: "2026-04-28", time: "11:30 AM", status: "Confirmed" as const },
  { id: "a2", professionalId: "p3", professionalName: "Priya Nair", service: "ITR Filing", date: "2026-05-02", time: "4:00 PM", status: "Pending" as const },
  { id: "a3", professionalId: "p2", professionalName: "Rohan Verma", service: "Company Registration", date: "2026-04-15", time: "12:00 PM", status: "Completed" as const },
];
