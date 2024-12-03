import TODO from "../model/Todo.model.js";

export const createTodo = async (req, res) => {
    const todo = new TODO({
        text: req.body.text,
        complete: req.body.complete,
        user: req.user._id
    })
    try {
        const newTodo = await todo.save();
        res.status(201).json({ message: "Successfully added", newTodo });
    }
    catch (error) {
        res.status(400).json({ message: "Error Occurring in todo creation", error });
    }
}

export const fetchData = async (req, res) => {
    try {
        const todo = await TODO.find({user: req.user._id});
        res.status(201).json({ message: "fetch Successfully ", todo });
    } 
    catch (error) {
        res.status(400).json({message : 
            "Fetch Error",
            error
        })
    }
}

export const update = async(req,res) => {
    try{
        const todo = await TODO.findByIdAndUpdate(req.params.id,req.body, { new : true});
        res.status(201).json({message: "Successfully updated", todo});
    }
    catch (error) {
        res.status(400).json({message: "Update Error", error});
    }
}

export const deleteTodo = async(req,res) => {
    try{
        const todo = await TODO.findByIdAndDelete(req.params.id);
        if(!todo){
            res.status(404).json({message:"TODO NOT FOUND"});    
        }
        res.status(201).json({message:"Deleted Successfully",todo});
    }
    catch (error){
        res.status(400).json({message: "Error occured Deleting time", error});
    }
}