export class GithubUser {
  //TODO why do these have to public to return them from the getter?
  public avatar:string;
  public username:string;

  constructor(username:string, avatarUrl:string) {
    this.avatar = avatarUrl;
    this.username = username;
  }

  getDetails() {
    return {
      avatar: this.avatar,
      username: this.username
    }
  }

}