import { Response } from "express"

import UserService from "../services/UserService"

const service = new UserService()

class UserController {
    public static listAll = async (req: any, res: Response, next: any) => {
        try {
            const users = await service.get()
            res.status(200).json(users)
        } catch (err) {
            req.errorCode = 400
            req.errorMessage = err.message
            next()
        }
    }
    public static addNew = async (req: any, res: Response, next: any) => {
        try {
            const user = await service.add(req.body)
            res.status(201).json(user)
        } catch (err) {
            req.errorCode = 400
            req.errorMessage = err.message
            next()
        }
    }
}

export default UserController