import { ControlValidationsI } from "./control-validations.interface";

export interface ControlDataI {
    control: HTMLElement,
    validation: ControlValidationsI[],
    formControlNameValue: string
}