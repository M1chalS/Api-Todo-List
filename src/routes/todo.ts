import express, {Request, Response} from "express";
import {Todo} from "../models/todo";

const router = express.Router();

//Create new TODO
router.post('/api/todos', async (req: Request, res: Response) => {
    const {content} = req.body;

    const todo = Todo.build({
       content
    });
    await todo.save();

    res.send({todo});
});

//Get all TODOs
router.get('/api/todos', async (req: Request, res: Response) => {
    const todos = await Todo.find({});

    res.send({todos});
});

export {router as todoRouter};