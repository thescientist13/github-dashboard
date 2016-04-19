export class GithubUser {

  constructor(avatar, name) {
    this.avatar = avatar;
    this.name = name;
  }

  getUserDetails() {
    return {
      avatar: this.avatar,
      name: this.name
    }
  }

}