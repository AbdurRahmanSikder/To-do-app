import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    text:{
        type: String,
        required : true
    },
    complete:
    {
        type: Boolean,
        default: false
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
})

const TODO = mongoose.model("TODO", TodoSchema);

export default TODO;