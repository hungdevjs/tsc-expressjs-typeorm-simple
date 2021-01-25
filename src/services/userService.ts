import { getRepository } from "typeorm"

import User from "../models/entities/User"
import { IUser } from "../models/interfaces/User"

interface IUserService {
    get(): Promise<User[]>
    getById(id: number): Promise<User>
    add(user: User): Promise<User>
    delete(id: number): Promise<void>
}

export default class UserService implements IUserService {
    async get(): Promise<User[]> {
        const userRepository = getRepository(User)
        const users = await userRepository.find({})
        return users
    }

    async getById(id: number): Promise<User> {

        const userRepository = getRepository(User)
        const user = await userRepository.findOneOrFail(id)
        if (!user) throw new Error("User doesn't exist")
        return user
    }

    async add(model: IUser): Promise<User> {
        const { password, email } = model

        const user = new User()
        user.password = password
        user.email = email
        user.hashPassword()

        const userRepository = getRepository(User)
        const savedUser = await userRepository.save(user)
        return savedUser
    }

    async delete(id: number): Promise<void> {
        const userRepository = getRepository(User)

        let user: User
        user = await userRepository.findOneOrFail(id)
        if (user) {
            userRepository.delete(id)
        }
    }
}