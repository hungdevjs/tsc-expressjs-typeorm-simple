import User from "../entities/User"

export default class UserDto {
    public id: number
    public email: string

    constructor(user: User) {
        this.id = user.id
        this.email = user.email
    }
}