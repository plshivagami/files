// db/queries/folders.js
import db from "#db/client";

export async function getAllFolders() {
  const SQL = `SELECT * FROM folders;`;
  const { rows } = await db.query(SQL);
  return rows;
}

export async function getFolderById(id) {
  const SQL = `
    SELECT 
  f.name as file_name, 
  f.size, 
  fol.name as folder_name 
    FROM f  
    JOIN fol 
    ON (f.folder_id = fol.id);
    WHERE fol.id = $1;
  `;
  const { rows } = await db.query(SQL, [id]);
  return rows[0];
}

export async function addFileToFolder(folderId, name, size) {
  const SQL = `
    INSERT INTO files(name, size, folder_id) 
    VALUES ($1, $2, $3) RETURNING *;
  `;
  const { rows } = await db.query(SQL, [name, size, folderId]);
  return rows[0];
}

/*
SELECT 
  f.name as file_name, 
  f.size, 
  fol.name as folder_name 
    FROM f  
    JOIN fol 
    ON (f.folder_id = fol.id);
*/
