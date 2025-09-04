// db/queries/files.js
import db from "#db/client";

/** @returns all files with their folder name */
export async function getAllFiles() {
  const SQL = `
    SELECT f.*, fol.name AS folder_name
    FROM files f
    JOIN folders fol ON f.folder_id = fol.id;
  `;
  const { rows } = await db.query(SQL);
  return rows;
}

/** @returns a single file by id */
export async function getFileById(id) {
  const SQL = `
    SELECT f.*, fol.name AS folder_name
    FROM files f
    JOIN folders fol ON f.folder_id = fol.id
    WHERE f.id = $1;
  `;
  const { rows } = await db.query(SQL, [id]);
  return rows[0];
}

/** Create a new file under a folder */
export async function addFileToFolder(folderId, name, size) {
  const SQL = `
    INSERT INTO files(name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await db.query(SQL, [name, size, folderId]);
  return rows[0];
}

/** Get all files belonging to a specific folder */
export async function getFilesByFolderId(folderId) {
  const SQL = `
    SELECT *
    FROM files
    WHERE folder_id = $1;
  `;
  const { rows } = await db.query(SQL, [folderId]);
  return rows;
}
