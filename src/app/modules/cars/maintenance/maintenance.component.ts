import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ControlDataI } from '../../../interfaces/control-data.interface';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styles: ``
})
export class MaintenanceComponent implements OnInit, AfterViewChecked {

  renderer = inject(Renderer2);



  ngAfterViewChecked(): void {
    this.frmCarRx.updateValueAndValidity();
    this.change.detectChanges();
  }

  constructor(private readonly frmBuilder: FormBuilder, private divCarsControl: ElementRef, private readonly change: ChangeDetectorRef){}

  frmCarRx!: FormGroup;

  ngOnInit(): void {
    this.frmCarRx = this.initForm();
  }

  initForm() : FormGroup {
    return this.frmBuilder.group({
      marca: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)] ],
      modelo: ['', [Validators.pattern('[A-Z]*$') ,Validators.required, Validators.minLength(8)] ],
      anio: [2000, [Validators.pattern('[0-9]*$'), Validators.minLength(4), Validators.max(2025) ]],
      tipo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]]
    });
  }

  sendInfo(){
    if(this.frmCarRx.valid) {
      let datosAuto: CarI = this.frmCarRx.value;
      alert(JSON.stringify(datosAuto));
    } else {
      alert('Los datos ingresados no son validos');
    }
    // alert(JSON.stringify(this.frmCarRx.value.marca));
  }

  newControl(control: ControlDataI) {
    
    let formControlNameValue: string = control.formControlNameValue;
    // AGREGAR UN OBJETO DE TIPO FORMCONTROL AL OBJETO DE FORMULARIO REACTIVO CON NUESTRO
    // CONTROL:
    let newControl = new FormControl('')
    // let formCar = this.frmCarRx.get('attributes') as FormArray;
    control.validation.forEach( validation => {

      // VALIDAR LA EXISTENCIA DE LAS VALIDACIONES DEFINIDAS PARA EL CONTROL:
      switch (validation.validation) {
        case Validators.required.name: {
          if(validation.status) {
            // SI LA VALIDACION SE APLICÓ, SE AGREGA AL CONTROL PREVIAMENTE AGREGADO
            // DE LA SIGUIENTE MANERA
            //this.frmCarRx.controls[formControlNameValue].addValidators();
            newControl.addValidators(Validators.required)
          }
          break;
        }
        case Validators.minLength.name: {
          if(validation.status) {
            // this.frmCarRx.controls[formControlNameValue].addValidators(Validators.minLength(Number(validation.valueValidation)));
            newControl.addValidators(Validators.minLength(Number(validation.valueValidation)));
          }
          break;
        }

        case Validators.maxLength.name: {
          if(validation.status) {
            // this.frmCarRx.controls[formControlNameValue].addValidators(Validators.maxLength(Number(validation.valueValidation)));
            newControl.addValidators(Validators.maxLength(Number(validation.valueValidation)));
          }
          break;
        }
        case Validators.pattern.name: {
          if(validation.status) {
            // this.frmCarRx.controls[formControlNameValue].addValidators(Validators.pattern(validation.valueValidation!));
            newControl.addValidators(Validators.pattern(validation.valueValidation!));
          }
          break;
        }
      }
    });
    // formCar.push({name: formControlNameValue, control: newControl});
    this.frmCarRx.addControl(formControlNameValue, newControl)
    const divCarsForm = this.divCarsControl.nativeElement.querySelector('#carsFormControl');
    this.renderer.appendChild(divCarsForm, control.control);
    this.change.detectChanges();
    this.frmCarRx.updateValueAndValidity();
    
  }
}

interface CarI {
  marca: string,
  modelo: string,
  anio: number,
  tipo: string
}
