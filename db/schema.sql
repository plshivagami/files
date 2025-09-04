-- TODO
DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS folders;

-- Create folders table
CREATE TABLE folders (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- Create files table
CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    size INT NOT NULL,
    folder_id INT NOT NULL REFERENCES folders(id) ON DELETE CASCADE,
    CONSTRAINT unique_name_per_folder UNIQUE(name, folder_id)
);
INSERT INTO folders(name) VALUES ('Documents');
INSERT INTO folders(name) VALUES ('Pictures');
INSERT INTO folders(name) VALUES ('Music');

-- Seed files
INSERT INTO files(name, size, folder_id) VALUES ('resume.pdf', 120, 1);
INSERT INTO files(name, size, folder_id) VALUES ('holiday.jpg', 450, 2);
INSERT INTO files(name, size, folder_id) VALUES ('song.mp3', 3000, 3);
INSERT INTO files(name, size, folder_id) VALUES ('report.docx', 250, 1);
INSERT INTO files(name, size, folder_id) VALUES ('portrait.png', 500, 2);