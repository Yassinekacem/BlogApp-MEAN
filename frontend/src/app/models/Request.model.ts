import { UserModel } from "./User.model";

export interface RequestModel {
    _id : string;
    senderId: UserModel;
    receiverId: UserModel;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}