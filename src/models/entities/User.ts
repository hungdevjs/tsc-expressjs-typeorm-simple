import * as passwordHash from "password-hash"
import { Length } from "class-validator"
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm"

@Entity()
@Unique(["email"])
export default class User {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column()
    @Length(4, 100)
    public email!: string

    @Column()
    @Length(4, 100)
    public password!: string

    @Column()
    @CreateDateColumn()
    public createdAt!: Date

    @Column()
    @UpdateDateColumn()
    public updatedAt!: Date

    public hashPassword() {
        this.password = passwordHash.generate(this.password)
    }

    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return passwordHash.verify(unencryptedPassword, this.password)
    }
}