import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AditionalAttribComponent } from './aditional-attrib/aditional-attrib.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AditionalAttribComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AditionalAttribComponent
  ]
})
export class SharedModule { }
