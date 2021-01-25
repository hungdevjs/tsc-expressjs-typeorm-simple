import User from "../entities/User"

export default class UserDto {
    public email: string

    constructor(user: User) {
        this.email = user.email
    }
}