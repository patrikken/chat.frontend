import UserInterface from './UserInterface';

class User implements UserInterface {
  public id: number;
  public last_name: string;
  public first_name: string;
  public avatar: string;
  public lastconnexion: string;
  public status: string;
  constructor(){
    this.id = 0;
    this.first_name = "";
    this.lastconnexion = "";
    this.avatar = require("./../assets/man.png"),
    this.status = "",
    this.last_name = ""
  }

  get getFullName(){
    return  this.first_name + ' ' + this.last_name;
  }

  get getAvatar(){
    return require('./../assets/man.png');
  }
}

export default User;