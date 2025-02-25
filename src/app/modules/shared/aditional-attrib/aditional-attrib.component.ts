import { Component, EventEmitter, inject, Output, Renderer2 } from '@angular/core';
import { ControlDataI } from '../../../interfaces/control-data.interface';
import { ControlValidationsI } from '../../../interfaces/control-validations.interface';

@Component({
  selector: 'app-aditional-attrib',
  templateUrl: './aditional-attrib.component.html',
  styles: ``
})
export class AditionalAttribComponent {

  // renderer  = inject(Renderer2);
  constructor(private readonly renderer: Renderer2){}

  typeControl: string = '';
  labelControl: string = '';
  arrayValidationsControl: ControlValidationsI[] = [];
  
  // VALIDACIONES

  //REQUIRED
  requiredValidation: ControlValidationsI = {
    validation: 'required',
    status: false
  };
  // LONGITUD MÍNIMA
  minLengthValidation: ControlValidationsI = {
    validation: 'minLength',
    status: false,
    valueValidation: ''
  }
  // LONGITUD MÁXIMA
  maxLengthValidation: ControlValidationsI = {
    validation: 'maxLength',
    status: false,
    valueValidation: ''
  }
  // EXPRESION REGULAR
  patterRegexValidation: ControlValidationsI = {
    validation: 'pattern',
    status: false,
    valueValidation: ''
  }

  newCtrlEvent: any;

  @Output() newControlEvent = new EventEmitter<ControlDataI>();

  createElement() {
    let container: HTMLElement = this.renderer.createElement('div');
    let labelControlHTML: HTMLElement = this.renderer.createElement('label');
    this.renderer.setAttribute(labelControlHTML, 'for', `${this.labelControl.toLowerCase()}id`);
    labelControlHTML.innerText = this.labelControl;
    let control: HTMLElement = this.renderer.createElement('input');
    this.renderer.setAttribute(control, 'type', 'text')
    this.renderer.setAttribute(control, 'formControlName', `${this.labelControl.toLowerCase()}`);
    this.renderer.setAttribute(control, 'id', `${this.labelControl.toLowerCase()}id`);
    this.renderer.setAttribute(control, 'name', `${this.labelControl.toLowerCase()}name`);
    this.renderer.addClass(control, 'form-control');
    this.renderer.addClass(control, 'mt-2');
    this.renderer.appendChild(container, labelControlHTML);
    this.renderer.appendChild(container, control);
    let controlData: ControlDataI = {
      control: container,
      validation: [
        this.requiredValidation,
        this.minLengthValidation,
        this.maxLengthValidation,
        this.patterRegexValidation
      ], 
      formControlNameValue: this.labelControl.toLowerCase()
    }
    this.newControlEvent.emit(controlData);
  }
}
