import type { BaseUser } from "./BaseUser";

export interface ISignup extends BaseUser {
    name: string;
    gender: "male" | "female" | "other";
    phone: string;
    dateOfBirth: Date;
}