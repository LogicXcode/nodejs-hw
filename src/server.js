import express from "express";
import "dotenv/config";
import cors from "cors";
import pino from "pino-http";
import helmet from "helmet";
const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(cors());
app.use(express.json());
app.use(pino());
app.use(helmet());
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
app.get("/notes", (req, res) => {
  res.status(200).json({ message: "Retrieved all notes" });
});
app.get("/notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  res
    .status(200)
    .json({ id: noteId, message: `Retrieved note with ID: ${noteId} ` });
});
app.get("/test-error", () => {
  throw new Error("Simulated server error");
});
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
