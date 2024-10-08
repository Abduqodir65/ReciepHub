export declare interface CreateCustomerRequest {
    name: string;
    username: string;
    age: number;
    gender: "male" | "female";
    email: string;
    role: "customer"| "admin";
    image: string;
}