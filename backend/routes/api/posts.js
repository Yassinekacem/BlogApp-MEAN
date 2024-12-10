const router = require('express').Router();
const Post = require('../../models/Post');
const User = require('../../models/User'); 
const upload = require('../../middleware/upload');
const Like = require('../../models/Like');  
const Comment = require('../../models/Comment'); 

// obtenir toutes les posts 
router.get('/all', async (req, res) => {
    try {
      const posts = await Post.find().populate('userId', 'firstName lastName email image'); 
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
    } 
}); 

// obtenir un post par son id 
router.get('/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const post = await Post.findById(id).populate('userId', 'firstName lastName email image');
        if (!post) {
            return res.status(404).json({ msg: 'Post introuvable' });
        }
        return res.status(200).json(post);

    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
    }
}); 



// obtenir tous les posts d'un utilisateur 
router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ msg: 'Utilisateur introuvable' });
        }

        const userPosts = await Post.find({ userId }).populate('userId', 'firstName lastName email');

        return res.status(200).json( userPosts); 
    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
    }
});




// ajouter un post 
router.post("/add", upload.any('image') , async (req, res) => {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
        return res.status(400).json({ msg: 'Veuillez remplir tous les champs' });
    }

    try {
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ msg: 'Utilisateur introuvable' });
        }

        const newPost = new Post({
            title,
            content,
            userId
        });

        if (req.files.length > 0) {
            newPost.image = req.files[0].filename;
        }

        const savedPost = await newPost.save();
        return res.status(201).json({ msg: 'Post créé avec succès', post: savedPost });

    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
    }
});  


// Mettre à jour un post par ID (PUT)

router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  
  try {
  
    // Prepare update data
    const updateData = { title, content };
    if (req.file) {
      updateData.image = req.file.filename; // Adjust path if necessary
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id, updateData, { new: true });
    
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    res.status(200).json({ message: 'Post mis à jour avec succès', updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du post', error });
  }
});




// Supprimer un post par ID (DELETE)
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedPost = await Post.findByIdAndDelete(id);
      if (!deletedPost) {
        return res.status(404).json({ message: 'post non trouvé' });
      }
      res.status(200).json({ message: 'post supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression du post', error });
    }
  });



 

  // Obtenir le nombre de likes pour un post
  router.get('/:id/likes', async (req, res) => {
      const { id } = req.params; // ID du post
  
      try {
          // Compter les likes pour le post donné
          const likeCount = await Like.countDocuments({ postId: id });
  
          return res.status(200).json({ postId: id, likeCount });
      } catch (err) {
          return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
      }
  });
 


  // Obtenir le nombre de commentaires pour un post
router.get('/:id/comments', async (req, res) => {
  const { id } = req.params; // ID du post

  try {
      // Compter les commentaires pour le post donné
      const commentCount = await Comment.countDocuments({ postId: id });

      return res.status(200).json({ postId: id, commentCount });
  } catch (err) {
      return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
  }
});
 

// Vérifier si un utilisateur a aimé un post
router.get('/:postId/liked-by/:userId', async (req, res) => {
  const { postId, userId } = req.params; // Récupérer les paramètres

  try {
      // Chercher un like correspondant à l'utilisateur et au post
      const likeExists = await Like.findOne({ postId, userId });

      if (likeExists) {
          return res.status(200).json({ liked: true });
      } else {
          return res.status(200).json({ liked: false });
      }
  } catch (err) {
      return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
  }
});


// Obtenir l'ID du like pour un utilisateur sur un post
router.get('/:postId/like-id/:userId', async (req, res) => {
  const { postId, userId } = req.params; // Récupérer les paramètres

  try {
    // Chercher le like correspondant à l'utilisateur et au post
    const like = await Like.findOne({ postId, userId });

    if (like) {
      return res.status(200).json({ likeId: like._id });
    } else {
      return res.status(404).json({ msg: "Aucun like trouvé pour cet utilisateur et ce post" });
    }
  } catch (err) {
    return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
  }
});




module.exports = router;