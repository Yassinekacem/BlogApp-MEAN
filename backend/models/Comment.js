const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userId: { // Référence à l'utilisateur
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, 
    postId: { // Référence au post
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
} , 
{ timestamps: true }); 

const comment = mongoose.model('Comment', commentSchema);
module.exports = comment;
