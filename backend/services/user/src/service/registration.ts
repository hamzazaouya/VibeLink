/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-13

 *******************************************************/

import { IUser } from "../types/user.interface";
import registrationDAO from "../database/registration"

async function registerUser(user_id: IUser, firstName: string, lastName: string, age: number, gender:string, phone: string, bio: string, latitude: string, longitude: string, hobbies: string[], avatar: any, images:any): Promise<void> {
    firstName = firstName.toLocaleLowerCase();
    lastName = lastName.toLocaleLowerCase();
    
    await registrationDAO.registerUserInfo(user_id, firstName, lastName, age, gender, phone, bio, latitude, longitude, hobbies);
    await registrationDAO.registerUserImages(user_id, avatar, images);
    await registrationDAO.registerUser(user_id);
}

export default {registerUser}