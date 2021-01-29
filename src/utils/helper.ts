import jwt from "jsonwebtoken"

import User from "../models/entities/User"
import { IUserLoginInfo } from "../interfaces/UserLoginInfo"
import { TFunction } from "../types/TFunction"

const { ACCESS_TOKEN_SECRET_KEY, JWT_ACCESS_TOKEN_LIFE } = process.env

export const getDateTimeNow: TFunction<string> = () => {
    const now: Date = new Date()
    const date: number = now.getDate()
    const month: number = now.getMonth() + 1
    const year: number = now.getFullYear()

    return `${date}-${month}-${year}`
}

export const getUserLogInInfo: TFunction<IUserLoginInfo> = (user: User) => {
    const accessToken: string = jwt.sign({ _id: user.id, email: user.email }, ACCESS_TOKEN_SECRET_KEY, { expiresIn: JWT_ACCESS_TOKEN_LIFE })

    const userLogInInfo: IUserLoginInfo = {
        email: user.email,
        accessToken
    }

    return userLogInInfo
}