const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Post = require('../../models/Post');
const config = require('config');
const upload = require('../../middleware/upload');

// Route d'inscription
router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ msg: 'Veuillez remplir tous les champs' });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ status: "notokmail", msg: "Cet email est déjà utilisé" });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            role
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        const savedUser = await newUser.save();

        jwt.sign(
            { id: savedUser.id },
            config.get("jwtSecret"),
            { expiresIn: config.get("tokenExpiry") },
            (err, token) => {
                if (err) {
                    console.error("JWT Error:", err);
                    return res.status(500).json({ status: "error", msg: "Erreur interne du serveur" });
                }
                res.status(200).json({ status: "ok", msg: "Inscription réussie", token, user: savedUser });
            }
        );
    } catch (err) {
        return res.status(500).json({ status: "error", msg: "Erreur interne du serveur" });
    }
});
 

// obtenir tous les utilisateurs    
router.get('/all' , async (req , res) => { 
    try { 
      const users = await User.find(); 
      res.status(200).json(users) ; 
  
    } catch (error) { 
      res.status(500).json({message : 'erreur lors de la recuperation des utilisateurs'} , error) 
    }
  })  


// obtenir un utilisateur par ID
  router.get('/:id',async (req , res) => { 
    const {id} = req.params 
  
    try { 
      const user = await User.findById(id) 
      if (!user ) { 
        return res.status(404).json({message : 'user not found'}) 
  
      } 
      res.status(200).json(user) 
  
     } catch (error) { 
      res.status(500).json({message : 'erreur lors de la recuperation de l utilisateur'})
     }
  })
 

// route de connexion 
  router.post("/login-user", (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }
  
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
  
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(401).json({ error: "Incorrect password" });
        }
  
        // Ajoutez ici le rôle de l'utilisateur à la réponse
        jwt.sign(
          { id: user.id, role: user.role }, // Incluez le rôle dans le payload du token si nécessaire
          config.get("jwtSecret"),
          { expiresIn: config.get("tokenExpiry") },
          (err, token) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Internal server error" });
            }
  
            // Retournez le token et le rôle dans la réponse
            return res.status(200).json({ token, role: user.role });
          }
        );
      });
    }).catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    });
  });
 


// Mettre à jour un utilisateur par ID (UPDATE)
router.put('/:id', upload.single('image'),async (req, res) => {
    const { id } = req.params;
    const { firstName , lastName, email , description , role} = req.body;
  
    try {

      const updateData = { firstName , lastName, email , description ,role};
      if (req.file) {
        updateData.image = req.file.filename; 
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        updateData ,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.status(200).json({ message: 'Utilisateur mis à jour avec succès', updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
    }
  });


  
  
  // Supprimer un utilisateur par ID (DELETE)
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      await Post.deleteMany({ userId: id });
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
  });





module.exports = router;