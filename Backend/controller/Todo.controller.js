import TODO from "../model/Todo.model.js";

export const createTodo = async (req, res) => {
    try {
        
        const todo = new TODO({
            text: req.body.text,
            complete: req.body.complete,
            user: req.user.id
        })
        const newTodo = await todo.save();
        return res.json({ success: true, message: "Successfully added", todo:newTodo });
    }
    catch (error) {
        return res.json({ success: false, message: "Error Occurring in todo creation", error });
    }
}

export const fetchData = async (req, res) => {
    try {
        const todo = await TODO.find({ user: req.user.id });
        return res.json({ success: true, message: "fetch Successfully", todo });
    }
    catch (error) {
        res.json({ success:false, message:error.message})
    }
}

export const update = async (req, res) => {
    try {
        const todo = await TODO.findByIdAndUpdate(req.params.id, req.body, {new : true});
        return res.json({success:true, message: "Successfully updated", todo });
    }
    catch (error) {
        return res.json({success:true, message: error.message });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const todo = await TODO.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.json({success:false, message: "TODO NOT FOUND" });
        }
        return res.json({success:true , message: "Deleted Successfully", todo });
    }
    catch (error) {
        res.json({success:false, message: error.message});
    }
}