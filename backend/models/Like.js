const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
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

const like = mongoose.model('Like', LikeSchema);
module.exports = like;
