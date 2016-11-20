export interface CredentialsInterface {
  username: string,
  accessToken: string
}

export class Credentials {
  public username: string = "thescientist13";
  public accessToken: string = "d36830f306d3a8e79479b464527017f2f9d5f6b3";

  constructor() {
  }

  public getCredentials(): CredentialsInterface {
    return {
      accessToken: this.accessToken,
      username: this.username
    }
  }
}