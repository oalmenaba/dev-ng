export interface ControlValidationsI {
    validation: string; // nombre de la validacion
    status: boolean; // establece si la validacion está activa
    valueValidation?: string; // valor de la validacion si necesita atributos
}