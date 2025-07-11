/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-13

 *******************************************************/

import { IUser } from "../types/user.interface";
import registrationDAO from "../database/registration"

async function registerUser(user_id: IUser, firstName: string, lastName: string, userName: string, age: number, gender:string, phone: string, bio: string, latitude: string, longitude: string, hobbies: string[], profileImage: any, images:any): Promise<void> {
    await registrationDAO.registerUserInfo(user_id, firstName, lastName, userName, age, gender, phone, bio, latitude, longitude, hobbies);
    await registrationDAO.registerUserImages(user_id,profileImage, images);
    await registrationDAO.registerUser(user_id);
}

export default {registerUser}