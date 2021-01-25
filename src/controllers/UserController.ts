import { Response } from "express"

import UserService from "../services/UserService"

const service = new UserService()

class UserController {
    public static get = async (req: any, res: Response, next: any) => {
        try {
            const users = await service.get()
            res.status(200).json(users)
        } catch (err) {
            req.errorCode = 400
            req.errorMessage = err.message
            next()
        }
    }

    public static getById = async (req: any, res: Response, next: any) => {
        try {
            const { id } = req.params
            const user = await service.getById(id)
            res.status(200).json(user)
        } catch (err) {
            req.errorCode = 400
            req.errorMessage = err.message
            next()
        }
    }

    public static add = async (req: any, res: Response, next: any) => {
        try {
            const user = await service.add(req.body)
            res.status(201).json(user)
        } catch (err) {
            req.errorCode = 400
            req.errorMessage = err.message
            next()
        }
    }

    public static delete = async (req: any, res: Response, next: any) => {
        try {
            const { id } = req.params
            await service.delete(id)
            res.status(200).end()
        } catch (err) {
            req.errorCode = 400
            req.errorMessage = err.message
            next()
        }
    }
}

export default UserController