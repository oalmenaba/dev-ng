import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../../services/country.service';
import { CountryI } from '../../../interfaces/country.interface';

@Component({
  selector: 'app-newcountry',
  templateUrl: './newcountry.component.html',
  styles: ``
})
export class NewcountryComponent implements OnInit {

  id: any;
  frmBuilder = inject(FormBuilder);
  countryService = inject(CountryService);

  frmCountryRx!: FormGroup;

  ngOnInit(): void {
    this.frmCountryRx = this.formInit();
  }

  formInit(): FormGroup {
    return this.frmBuilder.group({
      name: ['', [Validators.required]],
      acronym: ['', [Validators.required, Validators.maxLength(5)]],
      countryCode: ['', [Validators.required, Validators.maxLength(5)]],
      continent: ['', [Validators.required]]
    });
  }

  saveCountry() {
    if (this.frmCountryRx.valid) {
      let newCountryData: CountryI = {
        name: this.frmCountryRx.get('name')?.value,
        acronym: this.frmCountryRx.get('acronym')?.value,
        countryCode: this.frmCountryRx.get('countryCode')?.value,
        continent: this.frmCountryRx.get('continent')?.value
      }
  
      // proceso de observable para agregar un país
      this.countryService.saveCountry(newCountryData).subscribe({
        next: (value) => {
          let valueResponse: any = value;
          alert(`País creada correctamente: ${valueResponse._id}`)
        },
        error: (error) =>{
          alert(`Error al guardar un país: ${JSON.stringify(error)}`);
        },
        complete:() =>{
          console.log(`Proceso de creación de paises completado`);
        }
      });
    } else {
      alert('Los datos ingresados están incompletos o son inválidos');
    }
  }
}
