import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import taskRouter from "./routes/taskRouter.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json()); // body parser erlaubt uns auf Daten aus dem req.body zuzugreifen

app.use("/tasks", taskRouter);
app.use("/", express.static(path.join(__dirname, "/dist")));
app.get("/*", (req, res) => res.sendFile(__dirname + "/dist/index.html"));
app.use((req, res, next)=>{
    res.status(404).send("Page not found!");
});

app.use((err, req, res, next)=>{
    console.log("General error handler", err);
    res.status(500).json(err);
})


app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}`);
});