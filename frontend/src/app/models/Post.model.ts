import { UserModel } from "./User.model";

export interface Post {
    _id: string;
    title: string;
    content: string;
    image: string ;
    userId: UserModel;
    createdAt: Date;
    updatedAt: Date;
}