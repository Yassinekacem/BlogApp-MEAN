const router = require('express').Router();
const Post = require('../../models/Post');
const User = require('../../models/User'); 
const upload = require('../../middleware/upload');

// obtenir toutes les posts 
router.get('/all', async (req, res) => {
    try {
      const posts = await Post.find().populate('userId', 'firstName lastName email'); 
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
    } 
}); 

// obtenir un post par son id 
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id).populate('userId', 'firstName lastName email');
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
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title , content } = req.body;
  
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title , content },
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ message: 'post non trouvé' });
      }
      res.status(200).json({ message: 'post mis à jour avec succès', updatedPost });
    } catch (error) {
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





module.exports = router;