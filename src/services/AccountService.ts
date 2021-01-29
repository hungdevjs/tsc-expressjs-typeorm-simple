import { getRepository } from "typeorm"

import User from "../models/entities/User"
import { IUserLoginInfo } from "../interfaces/UserLoginInfo"
import { IUser } from "../interfaces/User"

import { getUserLogInInfo } from "../utils/helper"

interface IAccountService {
    logIn(model: IUser): Promise<IUserLoginInfo>
}

export default class AccountService implements IAccountService {
    async logIn(model: IUser): Promise<IUserLoginInfo> {
        const userRepository = getRepository(User)

        const user = await userRepository.findOne({ email: model.email })
        if (!user) throw new Error("User doesn't exist")

        const isValid = user.checkIfUnencryptedPasswordIsValid(model.password)
        if (!isValid) throw new Error("Wrong email or password")

        return getUserLogInInfo(user)
    }
}