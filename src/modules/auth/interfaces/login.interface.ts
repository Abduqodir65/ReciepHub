export declare interface LoginRequest {
    username:string;
    email: string;
}

export declare interface LoginResponse {
    message:string;
    accessToken: string,
    refreshToken:string
}