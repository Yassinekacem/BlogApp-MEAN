const router = require('express').Router();
const Post = require('../../models/Post');
const Like = require('../../models/Like');  
const User = require('../../models/User'); 





router.post('/:postId', async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;
  
    try {
      // Vérifier si le like existe déjà
      const existingLike = await Like.findOne({ postId, userId });
  
      if (existingLike) {
        // Supprimer le like
        await Like.deleteOne({ postId, userId });
        return res.status(200).json({ message: 'Like removed' });
      }
  
      // Ajouter un nouveau like
      const newLike = new Like({ postId, userId });
      await newLike.save();
  
      res.status(200).json({ message: 'Like added' });
    } catch (error) {
      res.status(500).json({ message: 'Error toggling like', error });
    }
  });


  // Compter les likes pour un post
  router.get('/count/:postId', async (req, res) => {
    const { postId } = req.params;
  
    try {
      // Vérifier si le post existe dans la table des likes
      const postExists = await Like.exists({ postId });
  
      if (!postExists) {
        return 0 ;
      }
  
      // Compter le nombre de likes
      const count = await Like.countDocuments({ postId });
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ message: 'Error counting likes', error });
    }
  });
  




// router.get("/post/:postId", async (req, res) => {
//     const { postId } = req.params;

//     try {
//         const postExists = await Post.findById(postId);
//         if (!postExists) {
//             return res.status(404).json({ msg: 'post introuvable' });
//         }

//         const postLikes = await Like.find({ postId });

//         return res.status(200).json({ msg: 'Likes récupérés avec succès', likes: postLikes }); 
//     } catch (err) {
//         return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
//     }
// });




// router.post("/add", async (req, res) => {
//     const { userId , postId} = req.body;

//     if ( !userId || !postId) {
//         return res.status(400).json({ msg: 'Veuillez remplir tous les champs' });
//     } 



//     try {
//         const postExists = await Post.findById(postId);
//         if (!postExists) {
//             return res.status(404).json({ msg: 'post introuvable' });
//         } 

//         const userExists = await User.findById(userId);
//         if (!userExists) {
//             return res.status(404).json({ msg: 'utilisateur introuvable' });
//         }  

//         const existingLike = await Like.findOne({ userId, postId });
//         if (existingLike) {
//             return res.status(400).json({ msg: 'Ce like existe déjà' });
//         }
//         const newLike = new Like({
//             userId, 
//             postId
//         });

//         const savedLike = await newLike.save();
//         return res.status(201).json({ msg: 'like ajouté avec succès', like: savedLike });

//     } catch (err) {
//         return res.status(500).json({ status: "error", msg: "Erreur interne du serveur", error: err.message });
//     }
// });  













module.exports = router;