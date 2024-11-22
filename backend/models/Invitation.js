const mongoose = require('mongoose');

const InvitationSchema = new mongoose.Schema({
    senderId: { // Référence à l'utilisateur qui envoie l'invitation
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, 
    receiverId: { // Référence à l'utilisateur qui reçoit l'invitation
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, 
    status: { // Statut de l'invitation
        type: String,
        enum: ['pending', 'accepted', 'refused'], 
        default: 'pending',
        required: true,
    },
} , 
{ timestamps: true }); 

const invitation = mongoose.model('Invitation', InvitationSchema);
module.exports = invitation;
