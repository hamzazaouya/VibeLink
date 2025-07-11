/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-12-04

 *******************************************************/
import { log } from 'console'
import statusDAO from '../database/status'
/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-12-04
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function user_location(user_id: string, latitude: number, longitude: number) {
    await statusDAO.user_location(user_id, latitude, longitude);
}
export default {user_location}