import express, { Request, Response } from "express";
import { Todo } from "../models/todo";

const router = express.Router();

//Create new TODO
router.post('/api/todos', async (req: Request, res: Response) => {
    const { content } = req.body;

    if(!content) {
        throw new Error("Content is required!");
    }

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

//Get concrete TODO
router.get('/api/todos/:id', async (req: Request, res: Response) => {
    const todo = await Todo.findById(req.params.id);

    res.status(200).send(todo);
});

//Mark Todo as done
router.patch('/api/todos/done/:id', async (req: Request, res: Response) => {
    const todo = await Todo.findById(req.params.id);

    if(!todo) {
        throw new Error('Todo not found');
    }

    todo.set({ done: true });
    await todo.save();

    res.status(202).send(todo);
});

//Update todo
router.patch('/api/todos/:id', async (req: Request, res: Response) => {
    const { content, done } = req.body;
    const todo = await Todo.findById(req.params.id);

    if(!todo) {
        throw new Error('Todo not found');
    }

    let updatedDone = done;

    if(!content) {
        throw new Error("Content is required!");
    }
    if(!done) {
        updatedDone = todo.done;
    }

    todo.set({
        content: req.body.content,
        done: updatedDone
    });

    await todo.save();

    res.status(202).send(todo);
});

//Delete todo
router.delete('/api/todos/:id', async (req: Request, res: Response) => {
    const todo = await Todo.findById(req.params.id);

    if(!todo) {
        throw new Error('Todo not found');
    }

    await todo.delete();

    res.status(204).send({});
});

export { router as todoRouter };