export declare interface RegisterRequest {
    name:string;
    username:string;
    age:number;
    gender:string;
    email: string;
    password:string;
}

export declare interface RegisterResponse {
    message:string;
    accessToken: string,
    refreshToken:string
}