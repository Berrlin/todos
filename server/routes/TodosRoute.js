import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { addToDos, deleteToDo, getTodoById, listToDo, updateToDo } from '../controller/TodosController.js';


const todosRoute = express.Router();
todosRoute.post("/add",authMiddleware, addToDos)
todosRoute.put("/update/:id",updateToDo)
todosRoute.post("/list",authMiddleware,listToDo)
todosRoute.delete("/delete/:id",deleteToDo)
todosRoute.get("/:id", getTodoById);
export default todosRoute