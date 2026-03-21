import { config } from 'dotenv'
config()

import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool as any)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding database with default academic content...")

  // Clear existing research and activity data to remove dummy placeholders
  await prisma.publication.deleteMany({});
  await prisma.scholar.deleteMany({});
  await prisma.conference.deleteMany({});
  await prisma.extensionActivity.deleteMany({});
  await prisma.studentResource.deleteMany({});
  await prisma.studentCategory.deleteMany({});

  // Education
  await prisma.education.createMany({
    data: [
      { degree: "Doctor of Philosophy (PhD) in English", institution: "Name of University", year: "Year of Award", details: "Thesis Title: [Insert Title Here]. Specialized in [Specialization].", order: 1 },
      { degree: "State Eligibility Test (SET) for Lectureship", institution: "Maharashtra State", year: "Year", details: "Qualified in English Literature.", order: 2 },
      { degree: "Master of Arts (MA) in English", institution: "Name of University", year: "Year", details: "Specialized in [Specialization].", order: 3 },
      { degree: "Bachelor of Arts (BA)", institution: "Name of College/University", year: "Year", details: "English Literature, History, Political Science.", order: 4 }
    ],
    skipDuplicates: true
  });

  // Experience
  await prisma.experience.createMany({
    data: [
      { role: "Assistant Professor", institution: "Post Graduate Teaching Department of English, Gondwana University, Gadchiroli", period: "25-09-2023 – Present", description: "Teaching Post-Graduate students, supervising PhD scholars, and contributing to departmental research initiatives.", order: 1 },
      { role: "Administrative Responsibilities", institution: "Gondwana University", period: "Various", description: "Member of [Committee Name], Coordinator for [Program Name], and involved in NAAC/IQAC documentation.", order: 2 }
    ],
    skipDuplicates: true
  });

  // Publications (Only the 2 authentic papers)
  await prisma.publication.createMany({
    data: [
      { 
        title: "THE ROLE OF AUTOBIOGRAPHY IN DALIT LITERATURE: A STUDY OF BAMA’S KARUKKU AND MEENA KANDASAMY’S WHEN I HIT YOU", 
        journal: "Research Directions (ISSN: 2321-5488, Impact Factor: 5.7)", 
        year: "2024", 
        type: "International Peer Reviewed Journal",
        link: "https://www.researchdirections.org/Management/pdfreadpage.php?filename=article1350.pdf",
        abstract: "Present paper examines two influential autobiographical works by Dalit women writers: Bama’s Karukku (1992) and Meena Kandasamy’s When I Hit You (2017). Through a comparative analysis, it explores how these authors use personal narratives to critique intersecting systems of caste and gender oppression in contemporary India. The study situates these texts within the broader context of Dalit literature and feminist autobiography, drawing on theoretical frameworks from postcolonial feminism and Dalit feminist theory."
      },
      { 
        title: "Artificial Intelligence and Communication Bridging the Gap Between Human and Machine Dialogue", 
        journal: "Nanotechnology Perceptions (DOI: 10.62441/nano-ntp.vi.1453)", 
        year: "2024", 
        type: "Peer-reviewed (CC BY 4.0)",
        link: "https://www.researchgate.net/publication/386496606_Artificial_Intelligence_and_Communication_Bridging_the_Gap_Between_Human_and_Machine_Dialogue",
        abstract: "The integration of Artificial Intelligence (AI) into communication technologies has significantly transformed how humans interact with machines. This research paper explores the evolving landscape of AI-driven communication systems, focusing on how these technologies bridge the gap between human and machine dialogue. The study examines various AI methodologies, including natural language processing (NLP), machine learning, and conversational agents, to understand their impact on enhancing communication efficiency and effectiveness."
      },
      {
        title: "Feministic Rebellious Streaks in Meena Kandasamy's Novels When I Hit You: Or, A Portrait of The Writer as a Young Wife and The Gypsy Goddess",
        journal: "Research Directions",
        year: "2022",
        type: "Research Paper",
        abstract: "The present study is a humble attempt to critically explore the feminist characteristics of Meena Kandasamy's works. Though the impact of patriarchy has been a pervasive theme of writers in order to shed a light on the misery of women, the research paper brings to fore thematic issues of women which have been emerged in recent times."
      }
    ],
    skipDuplicates: true
  });

  // Extension Activities (Placeholder Cleaned)
  // await prisma.extensionActivity.createMany({ ... });

  console.log("Database perfectly seeded with academic content!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
