import { getRepository } from "typeorm"

import User from "../models/entities/User"
import { IUser } from "../interfaces/User"
import UserDto from "../models/dtos/UserDto"

interface IUserService {
    get(): Promise<UserDto[]>
    getById(id: number): Promise<UserDto>
    add(user: User): Promise<UserDto>
    delete(id: number): Promise<void>
}

export default class UserService implements IUserService {
    async get(): Promise<UserDto[]> {
        const userRepository = getRepository(User)
        const users = await userRepository.find({})
        return users.map(user => new UserDto(user))
    }

    async getById(id: number): Promise<UserDto> {

        const userRepository = getRepository(User)
        const user = await userRepository.findOneOrFail(id)
        if (!user) throw new Error("User doesn't exist")
        return new UserDto(user)
    }

    async add(model: IUser): Promise<UserDto> {
        const { password, email } = model

        const user = new User()
        user.password = password
        user.email = email
        user.hashPassword()

        const userRepository = getRepository(User)
        const savedUser = await userRepository.save(user)
        return new UserDto(savedUser)
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