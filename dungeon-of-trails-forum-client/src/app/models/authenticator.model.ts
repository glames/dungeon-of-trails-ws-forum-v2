export default interface Authenticator {
  accessToken: string;
  refreshToken: string;
  user: any;
}
