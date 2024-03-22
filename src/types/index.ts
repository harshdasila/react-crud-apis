import {z} from 'zod'
import { signInSchema } from '../schema'

export type signInType = z.infer<typeof signInSchema> 

export interface createUser {
    email: string,
    name:string,
    mobileNumber: string,
    password: string
}