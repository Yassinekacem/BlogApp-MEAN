const router = require('express').Router();
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');  
const User = require('../../models/User');


// obtenir touts les commentaires 
router.get('/all', async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
    } 
}); 





// obtenir tous les commentaires d'un post 
router.get("/post/:postId", async (req, res) => {
    const { postId } = req.params;

    try {
        const postExists = await Post.findById(postId);
        if (!postExists) {
            return res.status(404).json({ msg: 'post introuvable' });
        }

        const postComments = await Comment.find({ postId });

        return res.status(200).json({ msg: 'comments récupérés avec succès', comments: postComments }); 
    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
    }
});




// ajouter un commentaire  
router.post("/add", async (req, res) => {
    const { content, userId , postId} = req.body;

    if (!content || !userId || !postId) {
        return res.status(400).json({ msg: 'Veuillez remplir tous les champs' });
    }

    try {
        const postExists = await Post.findById(postId);
        if (!postExists) {
            return res.status(404).json({ msg: 'post introuvable' });
        } 

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ msg: 'utilisateur introuvable' });
        } 


        const newComment = new Comment({
            content,
            userId, 
            postId
        });

        const savedComment = await newComment.save();
        return res.status(201).json({ msg: 'comment créé avec succès', comment: savedComment });

    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
    }
});  


// Mettre à jour un commentaire par ID (PUT)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      );
      if (!updatedComment) {
        return res.status(404).json({ message: 'comment non trouvé' });
      }
      res.status(200).json({ message: 'comment mis à jour avec succès', updatedComment });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du commentaire', error });
    }
  }); 


// Supprimer un comment par ID (DELETE)
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedComment = await Comment.findByIdAndDelete(id);
      if (!deletedComment) {
        return res.status(404).json({ message: 'comment non trouvé' });
      }
      res.status(200).json({ message: 'comment supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression du commentaire', error });
    }
  });







module.exports = router;