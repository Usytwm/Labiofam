export interface LoginResponse {
  name: string;
  token: string;
  refreshToken: string;
  expirationDate: string;
  refreshTokenExpirationDate: string;
  email: string;
}
