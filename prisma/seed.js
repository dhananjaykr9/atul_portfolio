const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
