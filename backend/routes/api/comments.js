const router = require('express').Router();
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');  
const User = require('../../models/User');
const upload = require('../../middleware/upload');


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

        const postComments = await Comment.find({ postId }).populate('userId', 'firstName lastName email image');; 
        

        return res.status(200).json({ msg: 'comments récupérés avec succès', comments: postComments }); 
    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
    }
});




// ajouter un commentaire  
router.post("/add", upload.any('userPhoto'), async (req, res) => {
  const { content, userId, postId } = req.body;

  if (!content || !userId || !postId) {
      return res.status(400).json({ msg: 'Veuillez remplir tous les champs' });
  }

  try {
      // Vérifier si le post existe
      const postExists = await Post.findById(postId);
      if (!postExists) {
          return res.status(404).json({ msg: 'Post introuvable' });
      }

      // Vérifier si l'utilisateur existe
      const userExists = await User.findById(userId);
      if (!userExists) {
          return res.status(404).json({ msg: 'Utilisateur introuvable' });
      }

      // Créer un nouvel objet commentaire
      const newComment = new Comment({
          content,
          userId,
          postId,
          firstNameUser: userExists.firstName,
          lastNameUser: userExists.lastName
      });

      // Ajouter la photo si un fichier est uploadé
      if (req.files.length > 0) {
          newComment.userPhoto = req.files[0].filename; // Stocker le nom du fichier
      }

      // Sauvegarder le commentaire
      const savedComment = await newComment.save();
      return res.status(201).json({ msg: 'Commentaire créé avec succès', comment: savedComment });

  } catch (err) {
      return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
  }
});


// Mettre à jour un commentaire par ID (PUT)
// Mettre à jour un commentaire par ID (PUT)
router.put("/:id", upload.any('userPhoto'), async (req, res) => {
  const { id } = req.params;
  const { content, userId, postId } = req.body;

  if (!content || !userId || !postId) {
    return res.status(400).json({ msg: 'Veuillez remplir tous les champs' });
  }

  try {
    // Vérifier si le commentaire existe
    const commentExists = await Comment.findById(id);
    if (!commentExists) {
      return res.status(404).json({ msg: 'Commentaire introuvable' });
    }

    // Vérifier si le post existe
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ msg: 'Post introuvable' });
    }

    // Vérifier si l'utilisateur existe
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ msg: 'Utilisateur introuvable' });
    }

    // Mettre à jour le commentaire
    commentExists.content = content;
    commentExists.userId = userId;
    commentExists.postId = postId;
    commentExists.firstNameUser = userExists.firstName;
    commentExists.lastNameUser = userExists.lastName;

    // Ajouter la photo si un fichier est uploadé
    if (req.files.length > 0) {
      commentExists.userPhoto = req.files[0].filename; // Stocker le nom du fichier
    }

    // Sauvegarder les modifications
    const updatedComment = await commentExists.save();
    return res.status(200).json({ msg: 'Commentaire mis à jour avec succès', comment: updatedComment });

  } catch (err) {
    return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
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