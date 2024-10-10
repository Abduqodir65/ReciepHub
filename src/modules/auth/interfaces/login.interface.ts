export declare interface LoginRequest {
  email: string;
  password: string;
}

export declare interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}
