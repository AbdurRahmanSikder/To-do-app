import express from "express";
import { createTodo, deleteTodo, fetchData, update } from "../controller/Todo.controller.js";
import { authorization } from "../middleware/authorize.js";
const route = express.Router();

route.post("/create", authorization, createTodo);
route.get("/fetch", authorization, fetchData);
route.put("/update/:id", authorization, update);
route.delete("/delete/:id", authorization, deleteTodo);

export default route;

