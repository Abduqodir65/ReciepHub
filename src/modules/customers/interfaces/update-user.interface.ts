export declare interface UpdateUserRequest {
    name ?: string;
    username ?: string;
    age ?: number;
    gender ?: "male" | "female";
    email ?: string;
    role ?: "customer" | "admin";
    image ?: string;
}