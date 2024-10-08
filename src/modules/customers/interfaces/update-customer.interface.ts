export declare interface UpdateCustomerRequest {
    name ?: string;
    username ?: string;
    age ?: number;
    gender ?: "male" | "female";
    email ?: string;
    role ?: "CUSTOMER" | "ADMIN";
    image ?: string;
}