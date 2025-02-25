import { Component, ViewChild } from '@angular/core';
import { UserI } from '../../../../interfaces/user.interface';
import { lusers } from '../../../../datasource/user.datasource';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: ``
})
export class UsersComponent {

  @ViewChild(ProfileComponent) profileComponent!: ProfileComponent;

  userSelected: UserI = {
    userid: 0,
    username: '',
    email: ''
  };

  systemUser: UserI[] = lusers;

  eventSelectUser(user: UserI ){
    this.userSelected = user;
    this.profileComponent.userid = this.userSelected.userid;
    this.profileComponent.username = this.userSelected.username;
    this.profileComponent.email = this.userSelected.email;
    this.profileComponent.onUserSelected();
  }

  dataUserRestore() {
    this.userSelected = {
      userid: 0,
      username: '',
      email: ''
    };
  }
}
