import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styles: ``
})
export class MaintenanceComponent {

  nombre: string = '';
  apellido: string = '';
  identificacion: string = '';
  email: string = '';
  contrasenia: string = '';

  savePersonMaintenance(personForm: NgForm) {
    if(personForm.valid) {
      alert( 'Validacion exitosa' );
    } else {
      alert( 'Valores inconsistentes' );
    }
  }
}
