import db from "#db/client";
//import { faker } from "@faker-js/faker";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // Clear existing data
  await db.query("TRUNCATE files RESTART IDENTITY CASCADE;");
  await db.query("TRUNCATE folders RESTART IDENTITY CASCADE;");

  // Insert folders
  const folderNames = ["Documents", "Pictures", "Music"];
  const folders = [];

  for (const name of folderNames) {
    const { rows } = await db.query(
      `INSERT INTO folders (name) VALUES ($1) RETURNING *;`,
      [name]
    );
    folders.push(rows[0]);
  }

  // Insert files
  const files = [
    { name: "resume.pdf", size: 120, folderId: folders[0].id },
    { name: "report.docx", size: 250, folderId: folders[0].id },
    { name: "holiday.jpg", size: 450, folderId: folders[1].id },
    { name: "portrait.png", size: 500, folderId: folders[1].id },
    { name: "song.mp3", size: 3000, folderId: folders[2].id },
  ];

  for (const file of files) {
    await db.query(
      `INSERT INTO files (name, size, folder_id) VALUES ($1, $2, $3);`,
      [file.name, file.size, file.folderId]
    );
  }
}

// async function seed() {
//   // Clear existing data and reset IDs
//   await db.query("TRUNCATE files RESTART IDENTITY CASCADE;");
//   await db.query("TRUNCATE folders RESTART IDENTITY CASCADE;");

//   // Create 3 folders
//   const folderNames = ["Documents", "Pictures", "Music"];
//   const folders = [];

//   for (const name of folderNames) {
//     const { rows } = await db.query(
//       `INSERT INTO folders (name) VALUES ($1) RETURNING *;`,
//       [name]
//     );
//     folders.push(rows[0]);
//   }

//   // Create 5 files per folder
//   for (const folder of folders) {
//     for (let i = 0; i < 5; i++) {
//       const fileName = faker.system.fileName();
//       const fileSize = faker.number.int({ min: 100, max: 5000 }); // size in KB
//       await db.query(
//         `INSERT INTO files (name, size, folder_id) VALUES ($1, $2, $3);`,
//         [fileName, fileSize, folder.id]
//       );
//     }
//   }
// }
