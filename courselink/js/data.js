/**
 * CourseLink - Structured Program & Cycle Data Store
 * Organized hierarchically: Academic Course Programs -> Individual Cycles
 */

const COURSE_PROGRAMS = [
  // =========================================================================
  // HSC 2026 BATCH
  // =========================================================================
  {
    id: "hsc26-math-acs",
    title: "Academic HSC 26 Higher Math",
    shortTitle: "HSC 26 Higher Math",
    batch: "HSC 26",
    subject: "Higher Math",
    category: "Math",
    provider: "ACS",
    instructor: "ACS Higher Math Faculty",
    coverImage: "images/acsm271.png",
    description: "Complete Higher Mathematics 1st & 2nd Paper syllabus covered in 6 comprehensive cycles.",
    totalCycles: 6,
    tags: ["hsc 26", "2026", "math", "higher math", "acs", "academic", "gonit", "algebra", "calculus"],
    cycles: [
      {
        cycleNum: 1,
        title: "ACS HSC 26 Higher Math Cycle 1",
        shortTitle: "Cycle 1 — Matrix, Determinants & Basics",
        link: "https://t.me/+2VXPpBsl1MdjMDBl",
        image: "images/acsm271.png",
        status: "available"
      },
      {
        cycleNum: 2,
        title: "ACS HSC 26 Higher Math Cycle 2",
        shortTitle: "Cycle 2 — Straight Line & Circle",
        link: "https://t.me/+AKlmN65bcCIwYmU9",
        image: "images/acsm272.png",
        status: "available"
      },
      {
        cycleNum: 3,
        title: "ACS HSC 26 Higher Math Cycle 3",
        shortTitle: "Cycle 3 — Trigonometry & Differentiation",
        link: "https://t.me/+uE6cs8JGS-w2Yzc9",
        image: "images/acsm273.jpg",
        status: "available"
      },
      {
        cycleNum: 4,
        title: "ACS HSC 26 Higher Math Cycle 4",
        shortTitle: "Cycle 4 — Integration & Coordinate Geometry",
        link: "https://t.me/acsphysicscycle4mdtheboss",
        image: "images/acsm274.png",
        status: "available"
      },
      {
        cycleNum: 5,
        title: "ACS HSC 26 Higher Math Cycle 5",
        shortTitle: "Cycle 5 — 2nd Paper Advanced Problem Solving",
        link: "https://t.me/+-LzfFNTc5uwzNzk1",
        image: "images/acsm275.png",
        status: "available"
      },
      {
        cycleNum: 6,
        title: "ACS HSC 26 Higher Math Cycle 6",
        shortTitle: "Cycle 6 — Statics, Dynamics & Complete Revision",
        link: "https://t.me/+TELwxJaSjexlYzU1",
        image: "images/acsm276.jpg",
        status: "available"
      }
    ]
  },

  {
    id: "hsc26-physics-acs",
    title: "Academic HSC 26 Physics",
    shortTitle: "HSC 26 Physics",
    batch: "HSC 26",
    subject: "Physics",
    category: "Physics",
    provider: "ACS",
    instructor: "ACS Physics Faculty",
    coverImage: "images/acsp271.jpg",
    description: "Complete Physics 1st & 2nd Paper master cycles covering Newtonian Mechanics, Waves, Electricity & Modern Physics.",
    totalCycles: 6,
    tags: ["hsc 26", "2026", "physics", "phy", "acs", "academic", "mechanics", "vector", "thermo", "optics"],
    cycles: [
      {
        cycleNum: 1,
        title: "ACS HSC 26 Physics Cycle 1",
        shortTitle: "Cycle 1 — Vector & Kinematics",
        link: "https://t.me/+-QWIZo1ntN5kNDk1",
        image: "images/acsp271.jpg",
        status: "available"
      },
      {
        cycleNum: 2,
        title: "ACS HSC 26 Physics Cycle 2",
        shortTitle: "Cycle 2 — Newtonian Mechanics & Energy",
        link: "https://t.me/+DSgAwYTl0VhhNjJl",
        image: "images/acsp272.jpg",
        status: "available"
      },
      {
        cycleNum: 3,
        title: "ACS HSC 26 Physics Cycle 3",
        shortTitle: "Cycle 3 — Gravitation & Structural Properties",
        link: "https://t.me/+bIoHfJ0RfZQ0NWU1",
        image: "images/acsp273.jpg",
        status: "available"
      },
      {
        cycleNum: 4,
        title: "ACS HSC 26 Physics Cycle 4",
        shortTitle: "Cycle 4 — Periodic Motion & Thermodynamics",
        link: "https://t.me/+-UDY-kiJO1U1NzQ1",
        image: "images/acsp274.jpg",
        status: "available"
      },
      {
        cycleNum: 5,
        title: "ACS HSC 26 Physics Cycle 5",
        shortTitle: "Cycle 5 — Static & Current Electricity",
        link: "https://t.me/+VzxBnjP6kIc0Yzc1",
        image: "images/acsp275.jpg",
        status: "available"
      },
      {
        cycleNum: 6,
        title: "ACS HSC 26 Physics Cycle 6",
        shortTitle: "Cycle 6 — Optics, Modern Physics & Electronics",
        link: "https://t.me/+1HpBZ3r4Do84NjFl",
        image: "images/acsp274.jpg",
        status: "available"
      }
    ]
  },

  {
    id: "hsc26-chemistry-acs",
    title: "Academic HSC 26 Chemistry (ACS)",
    shortTitle: "HSC 26 Chemistry (ACS)",
    batch: "HSC 26",
    subject: "Chemistry",
    category: "Chemistry",
    provider: "ACS",
    instructor: "ACS Chemistry Faculty",
    coverImage: "images/acsc271.jpg",
    description: "In-depth Chemistry 1st & 2nd Paper cycles covering Qualitative Chemistry, Organic, and Electrochemistry.",
    totalCycles: 5,
    tags: ["hsc 26", "2026", "chemistry", "chem", "acs", "academic", "organic", "qualitative", "electrochemistry"],
    cycles: [
      {
        cycleNum: 1,
        title: "ACS HSC 26 Chemistry Cycle 1",
        shortTitle: "Cycle 1 — Qualitative Chemistry & Periodic Properties",
        link: "https://t.me/+aT_4NDxrWNsyZmE1",
        image: "images/acsc271.jpg",
        status: "available"
      },
      {
        cycleNum: 2,
        title: "ACS HSC 26 Chemistry Cycle 2",
        shortTitle: "Cycle 2 — Chemical Changes & Equilibrium",
        link: "https://t.me/+WMFoMaQCeIw1ZjI1",
        image: "images/acsc272.jpg",
        status: "available"
      },
      {
        cycleNum: 3,
        title: "ACS HSC 26 Chemistry Cycle 3",
        shortTitle: "Cycle 3 — Environmental Chemistry",
        link: "https://t.me/+enNLBAC5UIszYTg9",
        image: "images/acsc273.jpg",
        status: "available"
      },
      {
        cycleNum: 4,
        title: "ACS HSC 26 Chemistry Cycle 4",
        shortTitle: "Cycle 4 — Organic Chemistry",
        link: "https://t.me/+0xcq7sgbCBYzZmJl",
        image: "images/acsc274.jpg",
        status: "available"
      },
      {
        cycleNum: 5,
        title: "ACS HSC 26 Chemistry Cycle 5",
        shortTitle: "Cycle 5 — Quantitative & Electrochemistry",
        link: "https://t.me/+21g9ahKbXgRhMzg9",
        image: "images/acsc275.jpg",
        status: "available"
      }
    ]
  },

  {
    id: "hsc26-chemistry-bp",
    title: "Academic HSC 26 Chemistry (BP)",
    shortTitle: "HSC 26 Chemistry (BP)",
    batch: "HSC 26",
    subject: "Chemistry",
    category: "Chemistry",
    provider: "Bondi Pathshala",
    instructor: "Saikat Sir (BP Faculty)",
    coverImage: "images/bp4.jpg",
    description: "Bondi Pathshala Chemistry Organic & Special cycles for HSC 2026 batch by Saikat Sir.",
    totalCycles: 1,
    tags: ["hsc 26", "2026", "chemistry", "chem", "bp", "bondi pathshala", "saikat", "organic"],
    cycles: [
      {
        cycleNum: 4,
        title: "HSC 26 BP Chemistry Cycle 4",
        shortTitle: "Cycle 4 — Organic Chemistry Master Cycle",
        link: "https://web.telegram.org/k/#-3488370224",
        image: "images/bp4.jpg",
        status: "available"
      }
    ]
  },

  // =========================================================================
  // HSC 2027 BATCH
  // =========================================================================
  {
    id: "hsc27-chemistry-bp",
    title: "Academic HSC 27 Chemistry (BP)",
    shortTitle: "HSC 27 Chemistry (BP)",
    batch: "HSC 27",
    subject: "Chemistry",
    category: "Chemistry",
    provider: "Bondi Pathshala",
    instructor: "Saikat Sir (BP Faculty)",
    coverImage: "images/bp1.jpg",
    description: "Bondi Pathshala Chemistry cycle program for HSC 2027 batch with complete foundational to advanced lessons.",
    totalCycles: 4,
    tags: ["hsc 27", "2027", "chemistry", "chem", "bp", "bondi pathshala", "saikat", "academic"],
    cycles: [
      {
        cycleNum: 1,
        title: "BP HSC 27 Chemistry Cycle 1",
        shortTitle: "Cycle 1 — Qualitative Chemistry Foundation",
        link: "https://t.me/BPHSC27md",
        image: "images/bp1.jpg",
        status: "available"
      },
      {
        cycleNum: 2,
        title: "BP HSC 27 Chemistry Cycle 2",
        shortTitle: "Cycle 2 — Periodic Properties & Bonding",
        link: "https://t.me/bp27chemistry",
        image: "images/bp2.jpg",
        status: "available"
      },
      {
        cycleNum: 3,
        title: "BP HSC 27 Chemistry Cycle 3",
        shortTitle: "Cycle 3 — Chemical Changes & Equilibrium",
        link: "https://t.me/bpchemi",
        image: "images/bp3.jpg",
        status: "available"
      },
      {
        cycleNum: 4,
        title: "HSC 27 BP Chemistry Cycle 4",
        shortTitle: "Cycle 4 — Advanced Organic Chemistry",
        link: "",
        image: "images/bp4_27.jpg",
        status: "upcoming"
      }
    ]
  },

  {
    id: "hsc27-physics-acs",
    title: "Academic HSC 27 Physics (ACS)",
    shortTitle: "HSC 27 Physics (ACS)",
    batch: "HSC 27",
    subject: "Physics",
    category: "Physics",
    provider: "ACS",
    instructor: "ACS Physics Faculty",
    coverImage: "images/acsp1.jpg",
    description: "ACS Physics 1st & 2nd Paper complete cycle masterclass for HSC 2027 students.",
    totalCycles: 6,
    tags: ["hsc 27", "2027", "physics", "phy", "acs", "academic", "vector", "mechanics"],
    cycles: [
      {
        cycleNum: 1,
        title: "ACS HSC 27 Physics Cycle 1",
        shortTitle: "Cycle 1 — Vector & Kinematics",
        link: "https://t.me/ACSphysicsCycel1",
        image: "images/acsp1.jpg",
        status: "available"
      },
      {
        cycleNum: 2,
        title: "ACS HSC 27 Physics Cycle 2",
        shortTitle: "Cycle 2 — Newtonian Mechanics & Work-Energy",
        link: "https://t.me/HSC2027_ACS_Physics_Cycle_2",
        image: "images/acsp2.jpg",
        status: "available"
      },
      {
        cycleNum: 3,
        title: "ACS HSC 27 Physics Cycle 3 (Study Point)",
        shortTitle: "Cycle 3 — Gravitation & Structural Properties",
        link: "https://t.me/acsphysicscycle03",
        image: "images/acsp3.jpg",
        status: "available"
      },
      {
        cycleNum: 4,
        title: "ACS HSC 27 Physics Cycle 4",
        shortTitle: "Cycle 4 — Periodic Motion & Wave Mechanics",
        link: "https://t.me/acsphysicscyclee4",
        image: "images/acsp4.jpg",
        status: "available"
      },
      {
        cycleNum: 5,
        title: "ACS HSC 27 Physics Cycle 5",
        shortTitle: "Cycle 5 — Ideal Gas & Thermodynamics",
        link: "",
        image: "images/acsp5.jpg",
        status: "upcoming"
      },
      {
        cycleNum: 6,
        title: "ACS HSC 27 Physics Cycle 6",
        shortTitle: "Cycle 6 — 2nd Paper Core Modules",
        link: "",
        image: "images/acsp6.jpg",
        status: "upcoming"
      }
    ]
  },

  {
    id: "hsc27-math-acs",
    title: "Academic HSC 27 Higher Math (ACS)",
    shortTitle: "HSC 27 Higher Math (ACS)",
    batch: "HSC 27",
    subject: "Higher Math",
    category: "Math",
    provider: "ACS",
    instructor: "ACS Higher Math Faculty",
    coverImage: "images/acsm1.jpg",
    description: "ACS Higher Mathematics cycle series covering Matrix, Trigonometry, Calculus, and 2nd Paper for HSC 2027.",
    totalCycles: 6,
    tags: ["hsc 27", "2027", "math", "higher math", "acs", "academic", "calculus", "matrix", "trigonometry"],
    cycles: [
      {
        cycleNum: 1,
        title: "ACS HSC 27 Higher Math Cycle 1",
        shortTitle: "Cycle 1 — Matrix, Determinants & Basics",
        link: "https://t.me/acs_math_1",
        image: "images/acsm1.jpg",
        status: "available"
      },
      {
        cycleNum: 2,
        title: "ACS HSC 27 Higher Math Cycle 2",
        shortTitle: "Cycle 2 — Circle & Trigonometry",
        link: "https://t.me/HSC_27_ACS_Math_Cycle_2",
        image: "images/acsm2.jpg",
        status: "available"
      },
      {
        cycleNum: 3,
        title: "ACS HSC 27 Higher Math Cycle 3",
        shortTitle: "Cycle 3 — Differentiation & Calculus",
        link: "https://t.me/llahjsjhsi",
        image: "images/acsm3.jpg",
        status: "available"
      },
      {
        cycleNum: 4,
        title: "ACS HSC 27 Higher Math Cycle 4",
        shortTitle: "Cycle 4 — Integration & Coordinate Geometry",
        link: "",
        image: "images/acsm4.jpg",
        status: "upcoming"
      },
      {
        cycleNum: 5,
        title: "ACS HSC 27 Higher Math Cycle 5",
        shortTitle: "Cycle 5 — 2nd Paper Higher Math Modules",
        link: "",
        image: "images/acsm5.jpg",
        status: "upcoming"
      },
      {
        cycleNum: 6,
        title: "ACS HSC 27 Higher Math Cycle 6",
        shortTitle: "Cycle 6 — Final Review & Advanced Problems",
        link: "",
        image: "images/acsm6.jpg",
        status: "upcoming"
      }
    ]
  },

  // =========================================================================
  // ENGINEERING & SPECIAL
  // =========================================================================
  {
    id: "eng-chemistry-bp-25",
    title: "BP Engineering Chemistry 25",
    shortTitle: "Engineering Chemistry 25",
    batch: "Engineering",
    subject: "Chemistry",
    category: "Chemistry",
    provider: "Bondi Pathshala",
    instructor: "Saikat Sir (BP)",
    coverImage: "images/bpe.jpg",
    description: "BUET, CKET and Top Engineering University admission preparation chemistry mastercourse by Saikat Sir.",
    totalCycles: 1,
    tags: ["engineering", "buet", "admission", "chemistry", "chem", "bp", "saikat", "25 batch"],
    cycles: [
      {
        cycleNum: "Eng 25",
        title: "BP Engineering Chemistry 25",
        shortTitle: "Engineering Chemistry 25 — Saikat Sir",
        link: "https://t.me/saikatengichemimdboss",
        image: "images/bpe.jpg",
        status: "available"
      }
    ]
  }
];

// Flat list for searching individual cycles easily
const COURSE_DATA = COURSE_PROGRAMS.flatMap(prog => 
  prog.cycles.map(cyc => ({
    id: `${prog.id}-c${cyc.cycleNum}`,
    programId: prog.id,
    programTitle: prog.title,
    title: cyc.title,
    shortTitle: cyc.shortTitle,
    batch: prog.batch,
    subject: prog.subject,
    category: prog.category,
    provider: prog.provider,
    instructor: prog.instructor,
    cycle: cyc.cycleNum,
    link: cyc.link,
    image: cyc.image,
    status: cyc.status,
    description: prog.description,
    tags: [...prog.tags, `cycle ${cyc.cycleNum}`, `c${cyc.cycleNum}`]
  }))
);

// Subject Filters Metadata
const SUBJECTS = [
  { id: "all", name: "All Subjects", icon: "bi-grid-fill" },
  { id: "Physics", name: "Physics", icon: "bi-lightning-charge-fill" },
  { id: "Chemistry", name: "Chemistry", icon: "bi-flask" },
  { id: "Math", name: "Higher Math", icon: "bi-calculator-fill" }
];

// Batches Metadata
const BATCHES = [
  { id: "all", name: "All Batches" },
  { id: "HSC 26", name: "HSC 2026", count: 4, desc: "4 Course Programs (18 Cycles)" },
  { id: "HSC 27", name: "HSC 2027", count: 3, desc: "3 Course Programs (16 Cycles)" },
  { id: "Engineering", name: "Engineering", count: 1, desc: "Engineering Special" }
];

window.COURSE_PROGRAMS = COURSE_PROGRAMS;
window.COURSE_DATA = COURSE_DATA;
window.SUBJECTS = SUBJECTS;
window.BATCHES = BATCHES;
