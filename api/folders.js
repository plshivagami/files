import express from "express";
import db from "#db/client";

const router = express.Router();

// GET /folders → all folders
router.get("/", async (req, res) => {
  try {
    const { rows: folders } = await db.query("SELECT * FROM folders");
    res.status(200).json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /folders/:id → folder with files
router.get("/:id", async (req, res) => {
  const folderId = parseInt(req.params.id);
  if (isNaN(folderId))
    return res.status(400).json({ error: "Invalid folder id" });

  try {
    const { rows: folders } = await db.query(
      `SELECT f.*, 
              (SELECT COALESCE(json_agg(files), '[]'::json) 
               FROM files 
               WHERE folder_id = f.id) AS files
       FROM folders f
       WHERE f.id = $1`,
      [folderId]
    );

    if (folders.length === 0)
      return res.status(404).json({ error: "Folder not found" });

    res.status(200).json(folders[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /folders/:id/files → create file in folder
router.post("/:id/files", async (req, res) => {
  const folderId = parseInt(req.params.id);
  const { name, size } = req.body || {};

  if (isNaN(folderId))
    return res.status(400).json({ error: "Invalid folder id" });
  if (!req.body)
    return res.status(400).json({ error: "Request body required" });
  if (!name || !size)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    // Check folder exists
    const { rows: folderRows } = await db.query(
      "SELECT * FROM folders WHERE id = $1",
      [folderId]
    );
    if (folderRows.length === 0)
      return res.status(404).json({ error: "Folder not found" });

    const { rows: fileRows } = await db.query(
      "INSERT INTO files (name, size, folder_id) VALUES ($1, $2, $3) RETURNING *",
      [name, size, folderId]
    );

    res.status(201).json(fileRows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
