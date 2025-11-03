import { Request, Response, NextFunction } from "express";
import userService from "../service/user.service.js";

const userController = {

    list: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const body = req.body;
            const data = await userService.userList();
            res.status(200).json({
                message: 'User List fetch successfully',
                data
            })
        }catch(error){
            next(error);
        }
    },

    getUser:  async (req: Request<{id : string}>, res: Response, next: NextFunction) => {
        try{
            const {id} = req.params;
            const data = await userService.findUserById(id);

            if(!data){
                return res.status(404).json({
                    message: 'User not found',
                })
            }

            res.status(200).json({
                message: 'User Details.',
                data
            })
        }catch(error){
            next(error)
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const newData = req.body;
            
            const existingUser = await userService.findUserByEmail(newData.email);
            if(existingUser){
                return res.status(409).json({
                    message: `User already exit with this ${newData.email}`,
                });
            }

            const user = await userService.userCreate(newData);
            res.status(201).json({
                message: 'User create successfully.',
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }

            })
        }catch(error){
            next(error);
        }
    },

    update: async (req: Request <{id: string}>, res: Response, next: NextFunction) => {
        const {id} = req.params;
        const newData = req.body;
        const data = await userService.userUpdate(id, newData);

        if(!data){
            return res.status(404).json({
                message: 'User not found',
            })
        }

        res.status(200).json({
            message: 'User update successfully.'
        })
    },

    delete:  async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        const {id} = req.params;
        const data = await userService.userDelete(id);

        if(!data){
            return res.status(404).json({
                message: 'User not found',
            })
        }

        res.status(200).json({
            message: 'User delete successfully.'
        })
    }

}

export default userController