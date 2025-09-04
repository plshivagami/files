import express from "express";
import foldersRouter from "./api/folders.js";
import filesRouter from "./api/files.js";

const app = express();
app.use(express.json());

app.use("/folders", foldersRouter);
app.use("/files", filesRouter);

export default app;
