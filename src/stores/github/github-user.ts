export class GithubUser {
  private avatar:string;
  private username:string;

  constructor(username:string, avatarUrl:string) {
    this.avatar = avatarUrl;
    this.username = username;
  }

  getUserDetails() {
    return {
      avatar: this.avatar,
      name: this.username
    }
  }

}