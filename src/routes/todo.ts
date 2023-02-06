import express, { Request, Response } from "express";
import { Todo } from "../models/todo";

const router = express.Router();

//Create new TODO
router.post('/api/todos', async (req: Request, res: Response) => {
    const { content } = req.body;

    const todo = Todo.build({
        content
    });
    await todo.save();

    res.status(201).send(todo);
});

//Get all TODOs
router.get('/api/todos', async (req: Request, res: Response) => {
    const todos = await Todo.find({});

    res.status(200).send(todos);
});

//Mark Todo as done
router.patch('/api/todos/done/:id', async (req: Request, res: Response) => {
    const todo = await Todo.findById(req.params.id);

    if(!todo) {
        throw new Error('Todo not found');
    }

    todo.set({ done: true });
    await todo.save();

    res.status(201).send(todo);
});

//Delete todo
router.delete('/api/todos/:id', async (req: Request, res: Response) => {
    const todo = await Todo.findById(req.params.id);

    if(!todo) {
        throw new Error('Todo not found');
    }

    await todo.delete();

    res.status(202).send({});
});

export { router as todoRouter };