const mongoose=require("mongoose");

const TransactionHistorySchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction",
        required:true,
    }

})

const TransactionHistoryModel=mongoose.model("TransactionHistoryModel", TransactionHistorySchema);
module.exports=TransactionHistoryModel;