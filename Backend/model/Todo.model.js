import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    text:{
        type: String,
        require : true
    },
    complete:
    {
        type: Boolean,
        require : true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    }
})

const TODO = mongoose.model("TODO", TodoSchema);

export default TODO;