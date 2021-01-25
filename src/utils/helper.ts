import { TFunction } from "../types/TFunction"

export const getDateTimeNow: TFunction<string> = () => {
    const now: Date = new Date()
    const date: number = now.getDate()
    const month: number = now.getMonth() + 1
    const year: number = now.getFullYear()

    return `${date}-${month}-${year}`
}