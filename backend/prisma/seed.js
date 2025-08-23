import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Ensure test user exists
  const user = await prisma.user.upsert({
    where: { email: "test@demo.com" },
    update: {},
    create: {
      email: "test@demo.com",
      password: "$2b$10$WzqQFw2FtkVdTh9Ubi0dmeVw07gPv59mfs9Pc/4B5LNo.Yq0PJo0i",
    },
  });

  // Count how many leads already exist for this user
  const existingCount = await prisma.lead.count({
    where: { userId: user.id },
  });

  const MIN_LEADS = 108;
  const MAX_LEADS = 150;

  // If already in range, do nothing
  if (existingCount >= MIN_LEADS && existingCount <= MAX_LEADS) {
    console.log(`✅ Existing leads ${existingCount} already within range. No new leads added.`);
    return;
  }

  // Calculate how many leads to create
  let leadsToCreate = 0;
  if (existingCount < MIN_LEADS) {
    leadsToCreate = MIN_LEADS - existingCount;
  } else if (existingCount > MAX_LEADS) {
    console.log(`⚠️ Already ${existingCount} leads, above max ${MAX_LEADS}. No new leads added.`);
    return;
  }

  // Create new leads
  for (let i = 0; i < leadsToCreate; i++) {
    await prisma.lead.create({
      data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        company: faker.company.name(),
        city: faker.location.city(),
        state: faker.location.state(),
        source: faker.helpers.arrayElement([
          "website", "facebook_ads", "google_ads", "referral", "events", "other",
        ]),
        status: faker.helpers.arrayElement([
          "new", "contacted", "qualified", "lost", "won",
        ]),
        score: faker.number.int({ min: 0, max: 100 }),
        lead_value: faker.number.float({ min: 100, max: 5000 }),
        last_activity_at: faker.date.recent({ days: 30 }),
        userId: user.id,
      },
    });
  }

  console.log(`✅ ${leadsToCreate} new leads created. Total leads: ${existingCount + leadsToCreate}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
