const router = require('express').Router();
const Post = require('../../models/Post');
const Like = require('../../models/Like');  
const User = require('../../models/User'); 



//obtenir tous les likes
router.get("/all", async (req, res) => {
    try {
        const likes = await Like.find();
        return res.status(200).json( likes );
    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
    }
}
);




// obtenir tous les likes d'un post 
router.get("/post/:postId", async (req, res) => {
    const { postId } = req.params;

    try {
        const postExists = await Post.findById(postId);
        if (!postExists) {
            return res.status(404).json({ msg: 'post introuvable' });
        }

        const postLikes = await Like.find({ postId });

        return res.status(200).json({ msg: 'Likes récupérés avec succès', likes: postLikes }); 
    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
    }
});




// ajouter un like  
router.post("/add", async (req, res) => {
    const { userId , postId} = req.body;

    if ( !userId || !postId) {
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

        const existingLike = await Like.findOne({ userId, postId });
        if (existingLike) {
            return res.status(400).json({ msg: 'Ce like existe déjà' });
        }
        const newLike = new Like({
            userId, 
            postId
        });

        const savedLike = await newLike.save();
        return res.status(201).json({ msg: 'like ajouté avec succès', like: savedLike });

    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
    }
});  





// Supprimer un like par ID (DELETE)
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedLike = await Like.findByIdAndDelete(id);
      if (!deletedLike) {
        return res.status(404).json({ message: ' like non trouvé' });
      }
      res.status(200).json({ message: 'like supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression du like', error });
    }
  });







module.exports = router;