import { UserModel } from "./User.model";

export interface Post {
    _id: string;
    title: string;
    content: string;
    image: string ;
    likes: any;
    userId: UserModel;
    createdAt: Date;
    updatedAt: Date;
}