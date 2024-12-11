import { UserModel } from "./User.model";
import { Post } from "./Post.model";  // Si nécessaire pour référencer un post

export interface Comment {
    _id: string;  // Identifiant unique du commentaire
    content: string;  // Contenu du commentaire
    userId: UserModel;  // Référence à l'utilisateur qui a écrit le commentaire
    postId: Post;  // Référence au post auquel appartient ce commentaire
    createdAt: Date;  // Date de création du commentaire
    updatedAt: Date;  // Date de dernière modification du commentaire 
    userPhoto: string;  // Photo de l'utilisateur qui a écrit le commentaire 
    firstNameUser: string;  // Prénom de l'utilisateur qui a écrit le commentaire 
    lastNameUser: string;  // Nom de l'utilisateur qui a écrit le commentaire
}
