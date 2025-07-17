/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-17

 *******************************************************/

import profileDAO from "../database/profile";
import { userImages, userMatches, userProfilInfo, profileInfo} from "../types/user.interface";


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-18
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function getUserInfo(user_id: string) {
    const info = await profileDAO.getUserInfo(user_id);
    const user_info = { first_name: info.first_name, 
                        last_name: info.last_name, 
                        user_name: info.user_name,
                        age: info.age,
                        phone: info.phone,
                        email: info.email,
                        bio: info.bio,
                        hobbies: info.hobbies 
                    }
    return user_info;
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-18
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function updateUserInfo(user_id: string, firstName: string, lastName: string, userName: string, age: number, email:string, phone: string, bio: string, hobbies: string[],) {
    const user_email = await profileDAO.getUserEmail(user_id);
    await profileDAO.updateUserInfo(user_id, firstName, lastName, userName, age, phone, bio);
    await profileDAO.updateHobbies(user_id, hobbies);
    if(user_email != email) {
        await profileDAO.updateUserEmail(user_id, email);
    }
}

async function getProfileInfo(user_id: string): Promise<profileInfo> {
    const user_info:userProfilInfo = await profileDAO.getProfileInfo(user_id);
    const userImages: userImages = await profileDAO.getUserProfileImages(user_id);
    const userMatches: userMatches[] | null  = await profileDAO.userMatches(user_id);
    const profile_info: profileInfo = {user_info: user_info, user_images: userImages};
    if(userMatches)
        profile_info.matches = userMatches;
    return profile_info;
}

async function getProfileById(user_id: string): Promise<profileInfo> {
    const user_info:userProfilInfo = await profileDAO.getProfileInfo(user_id);
    const userImages: userImages = await profileDAO.getUserProfileImages(user_id);
    const profile_info: profileInfo = {user_info: user_info, user_images: userImages};
    return profile_info;
}

export default {getUserInfo, updateUserInfo, getProfileInfo, getProfileById};