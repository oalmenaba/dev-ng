import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { UserI } from '../../../../interfaces/user.interface';
import { lusers } from '../../../../datasource/user.datasource';
import { ProfileI } from '../../../../interfaces/profile.interface';
import { lprofiles } from '../../../../datasource/profile.datasource';
import { ProfileUserI } from '../../../../interfaces/profile-user.interface';
import { lprofileuser } from '../../../../datasource/profile-user.datasource';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent implements OnInit {

  userid: any;
  username: string = '';
  email: string = '';

  users: UserI[] = lusers;
  profiles: ProfileI[] = lprofiles;
  profileUser: ProfileUserI[] = lprofileuser;

  profilesByUser: ProfileI[] = [];
  profilesSystem: ProfileI[] = [];

  @Output() outEvent = new EventEmitter();

  ngOnInit(): void {
    // this.getUserProfiles();
    // this.getSystemProfiles();
  }

  onUserSelected() {
    this.getUserProfiles();
    this.getSystemProfiles();
  }

  getUserProfiles() {
    // de la lista de perfiles por usuario (profileUser), filtrar aquellos registros relacionados con 
    // el usuario seleccionado: this.userid
    let assignProfiles = this.profileUser.filter(profileUserData => profileUserData.userid == this.userid);
     // buscar en la lista de perfiles cuales son los datos de perfil asignados al usuario this.userid
     // el método foreach permite recorrer cada perfil del sistema y encontrar los datos del usuario
     // con los perfiles asignados
    this.profiles.forEach( profile => {
      // Validamos con el método find en la lista de perfiles asignados (assignProfiles) si existe el perfil 
      // iterado en el ciclo foreach
      let validationProfile =  assignProfiles.find( assignProfile => assignProfile.profileid == profile.profileid);
      // si la respuesta es diferente de undefined, el perfil se agrega a la variable profilesByUser
      if (validationProfile) {
        this.profilesByUser.push(profile);
      }
    });
  }

  getSystemProfiles() {
     // de la lista de perfiles por usuario (profileUser), filtrar aquellos registros relacionados con 
    // el usuario seleccionado: this.userid
     // buscar en la lista de perfiles cuales son los datos de perfil asignados al usuario this.userid
     // el método foreach permite recorrer cada perfil del sistema y encontrar los datos del usuario
     // con los perfiles asignados
    this.profiles.forEach( profile => {
      // Validamos con el método find en la lista de perfiles asignados (assignProfiles) si existe el perfil 
      // iterado en el ciclo foreach
      let validationProfile =  this.profilesByUser.find( assignProfile => assignProfile.profileid == profile.profileid);
      // si la respuesta es undefined, el perfil se agrega a la variable profilesSystem
      if (!validationProfile) {
        this.profilesSystem.push(profile);
      }
    });
  }

  quitProfile(profile: ProfileI) {
    // obtener la posición del perfil a quitar
    let profileIndex = this.profilesByUser.indexOf(profile);
    // quitamos el perfil con el método splice indicando que solo se eliminará 1 elemento desde la posición del perfil a eliminar
    this.profilesByUser.splice(profileIndex, 1);
    // buscamos en la lista de perfiles del sistema si existe el perfil eliminado para agregarlo
    let profileSystemValidation = this.profilesSystem.find( profileSystem => profileSystem.profileid == profile.profileid );
    // validamos si existe el perfil eliminado en la lista de perfiles del sistema
    if(!profileSystemValidation) {
      // si no existe se agrega a la lista de perfiles del sistema
      this.profilesSystem.push(profile);
    }

  }

  addProfiles(profile: ProfileI) {
     // obtener la posición del perfil a quitar
     let profileIndex = this.profilesSystem.indexOf(profile);
     // quitamos el perfil con el método splice indicando que solo se eliminará 1 elemento desde la posición del perfil a eliminar
     this.profilesSystem.splice(profileIndex, 1);
     // buscamos en la lista de perfiles del usuario si existe el perfil eliminado para agregarlo
     let profileUserValidation = this.profilesByUser.find( profileSystem => profileSystem.profileid == profile.profileid );
     // validamos si existe el perfil eliminado en la lista de perfiles del usuario
     if(!profileUserValidation) {
       // si no existe se agrega a la lista de perfiles del usuario
       this.profilesByUser.push(profile);
     }
  }
   outEventClick() {
     this.outEvent.emit();
    this.profilesByUser = [];
    this.profilesSystem = [];
   }
}
