export declare interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  image:string
}

export declare interface RegisterResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}
