export declare interface CreateUserRequest {
    name: string;
    username: string;
    age: number;
    gender: "male" | "female";
    password:string;
    email: string;
    role: "customer"| "admin";
    image: string;
}