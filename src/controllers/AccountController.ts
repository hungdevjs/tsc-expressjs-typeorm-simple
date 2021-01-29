import { Response } from "express"

import AccountService from "../services/AccountService"
import { IUser } from "../interfaces/User"

const service = new AccountService()

class AccountController {
    public static logIn = async (req: any, res: Response, next: any) => {
        try {
            const model: IUser = req.body
            const data = await service.logIn(model)
            res.status(200).json(data)
        } catch (err) {
            req.errorCode = 400
            req.errorMessage = err.message
            next()
        }
    }
}

export default AccountController