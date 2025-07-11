/*****************************************************

 * @fileoverview Defines and exports Home-related controllers.
 * @author 
 * @version 1.0.0
 * @created 2024-10-25

 *******************************************************/

// homeController.ts

import { Request, Response } from 'express';

// Define a custom session type (if necessary)
interface IUser {
    id: string;
    email: string;
    discord_id: string;
}

function home(req: Request, res: Response): void {
    if (req.session ){
        const user: IUser = req.session.user;
        res.status(200).send(`Hello to your Home ${user.id} ${user.email} ${user.discord_id}`);
    }
}

export default { home };
