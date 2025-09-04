import express from "express";
import db from "#db/client";

const router = express.Router();

// GET /files → all files with folder_name
router.get("/", async (req, res) => {
  try {
    const { rows: files } = await db.query(`
      SELECT files.*, folders.name AS folder_name
      FROM files
      JOIN folders ON files.folder_id = folders.id
    `);
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
