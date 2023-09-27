import {Router} from "express";
import * as task from "../controllers/taskController.js";

const taskRouter = Router();

taskRouter
    .post("/", task.createTask)
    .get("/", task.getAllTasks)
    .get("/:id", task.getOneTask)
    .put("/:id", task.updateOneTask)
    .delete("/", task.deleteAllTasks)
    .delete("/:id", task.deleteOneTask)

export default taskRouter;