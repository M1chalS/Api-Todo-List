import mongoose from "mongoose";

interface TodoAttrs {
    content: string;
}

interface TodoModel extends mongoose.Model<TodoDoc> {
    build(attrs: TodoAttrs): TodoDoc;
}

interface TodoDoc extends mongoose.Document {
    content: string;
}

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

todoSchema.statics.build = (attrs: TodoAttrs) => {
    return new Todo(attrs);
};

const Todo = mongoose.model<TodoDoc, TodoModel>('Todo', todoSchema);

export {Todo};