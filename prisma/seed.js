require('dotenv/config');

const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

function normalizeDatabaseUrl(url) {
  if (
    url.includes('<project-ref>') ||
    url.includes('<region>') ||
    url.includes('YOUR_PASSWORD')
  ) {
    throw new Error(
      'DATABASE_URL still contains placeholder values. Replace <project-ref>, <region>, and YOUR_PASSWORD with your real Supabase connection details.'
    );
  }

  const parsedUrl = new URL(url);

  if (parsedUrl.searchParams.get('sslmode') === 'require') {
    parsedUrl.searchParams.set('sslmode', 'verify-full');
  }

  return parsedUrl.toString();
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: normalizeDatabaseUrl(databaseUrl),
  }),
});

async function main() {
  console.log("Seeding database with default academic content...");

  const safeDelete = async (model) => {
    try {
      if (prisma[model]) {
        await prisma[model].deleteMany({});
        console.log(`Cleared ${model}`);
      }
    } catch (e) {
      console.log(`Note: Table ${model} might not exist yet.`);
    }
  };

  const models = ['publication', 'scholar', 'conference', 'extensionActivity', 'studentResource', 'studentCategory', 'education', 'experience', 'blogPost'];
  for (const model of models) {
    await safeDelete(model);
  }

  // Education
  await prisma.education.createMany({
    data: [
      { degree: "Doctor of Philosophy (PhD) in English", institution: "University", year: "2020", details: "Thesis on Dalit Literature", order: 1 },
      { degree: "MA in English", institution: "University", year: "2015", details: "Specialized in Literature", order: 2 }
    ]
  });

  // Experience
  await prisma.experience.createMany({
    data: [
      { role: "Assistant Professor", institution: "Gondwana University", period: "2023-Present", description: "Teaching and Research", order: 1 }
    ]
  });

  // Publications
  await prisma.publication.createMany({
    data: [
      {
        title: "The Role of Autobiography in Dalit Literature: A Study of Bama's Karukku and Meena Kandasamy's When I Hit You",
        journal: "Research Directions International Peer Reviewed Journal",
        year: "2024",
        type: "Journal Article",
        link: "https://www.researchdirections.org/Management/pdfreadpage.php?filename=article1350.pdf",
        abstract: "A comparative study of Bama's Karukku and Meena Kandasamy's When I Hit You, examining how Dalit women's autobiographical narratives critique caste and gender oppression in contemporary India."
      },
      {
        title: "Artificial Intelligence and Communication: Bridging the Gap Between Human and Machine Dialogue",
        journal: "Nanotechnology Perceptions",
        year: "2024",
        type: "Journal Article",
        link: "https://www.researchgate.net/publication/386496606_Artificial_Intelligence_and_Communication_Bridging_the_Gap_Between_Human_and_Machine_Dialogue",
        abstract: "An exploration of AI-driven communication systems, focusing on natural language processing, machine learning, and conversational agents to evaluate how they improve human-machine dialogue."
      },
      {
        title: "Feministic Rebellious Streaks in Meena Kandasamy's Novels When I Hit You: Or, A Portrait of the Writer as a Young Wife and The Gypsy Goddess",
        journal: "Research Paper",
        year: "2022",
        type: "Journal Article",
        link: null,
        abstract: "A critical study of feminist themes in Meena Kandasamy's novels, with emphasis on patriarchy, technology-fuelled injustice, and the evolving constraints placed on women's autonomy."
      }
    ]
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
