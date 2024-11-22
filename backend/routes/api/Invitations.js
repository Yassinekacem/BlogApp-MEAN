const router = require('express').Router();
const User = require('../../models/User');  
const Invitation = require('../../models/Invitation');
const invitation = require('../../models/Invitation');








// obtenir tous  les invitations envoyées a un utilisateur 
router.get("/receiver/:receiverId", async (req, res) => {
    const { receiverId } = req.params;

    try {
        const ReceiverExists = await User.findById(receiverId);
        if (!ReceiverExists) {
            return res.status(404).json({ msg: 'receiver introuvable' });
        }

        const receivedInvitations = await Invitation.find({ receiverId });

        return res.status(200).json({ msg: 'invitations récupérés avec succès', invitations: receivedInvitations }); 
    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
    }
});




// envoyer une invitation  
router.post("/add", async (req, res) => {
    const { receiverId , senderId} = req.body;

    // Vérifier si tous les champs sont remplis
    if ( !receiverId || !senderId) {
        return res.status(400).json({ msg: 'Veuillez remplir tous les champs' });
    } 



    try { 
        // Vérifier si l'utilisateur qui envoie l'invitation existe
        const senderExists = await User.findById(senderId);
        if (!senderExists) {
            return res.status(404).json({ msg: 'sender introuvable' });
        } 

        // Vérifier si l'utilisateur qui reçoit l'invitation existe
        const ReceiverExists = await User.findById(receiverId);
        if (!ReceiverExists) {
            return res.status(404).json({ msg: 'receiver introuvable' });
        }  

        // Vérifier si l'invitation existe déjà
        const existingInvitation = await Invitation.findOne({ senderId, receiverId });
        if (existingInvitation) {
            return res.status(400).json({ msg: 'Cette invitaion existe déjà' });
        } 

        // Créer une nouvelle invitation 
        const newInvitation = new Invitation({
            senderId, 
            receiverId
        });

        // Enregistrer l'invitation dans la base de données
        const savedInvitation = await newInvitation.save();
        return res.status(201).json({ msg: 'invitaion ajouté avec succès', invitation: savedInvitation });

    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
    }
});  





// Supprimer une invitation par ID 
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedInvitaion = await Invitation.findByIdAndDelete(id);
      if (!deletedInvitaion) {
        return res.status(404).json({ message: ' invitation non trouvé' });
      }
      res.status(200).json({ message: 'invitation supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression de l invitation', error });
    }
  });







module.exports = router;