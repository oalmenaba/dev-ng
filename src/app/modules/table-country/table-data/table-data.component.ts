import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { CountryI } from '../../../interfaces/country.interface';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styles: ``
})
export class TableDataComponent implements AfterViewInit {

  counstries: CountryI[] = [
    {
       name: 'Ecuador',
       acronym: 'EC',
       continent: 'América',
       countryCode: '593'
    }
  ];

  statusData: string = 'success'; // init::cargando - success::información cargada - empty::sin datos

  constructor( private readonly countryService: CountryService, private readonly changeDetector: ChangeDetectorRef ){}

  ngAfterViewInit(): void {
    
    // this.countryService.findAll().subscribe({
    //   next: (value) => {
    //     let countriesResponse: CountryI[] = value as CountryI[];
    //     if(countriesResponse.length > 0) {
    //       this.statusData = 'success';
    //       this.counstries.push(...countriesResponse);
    //     } else {
    //       this.statusData = 'empty';
    //     }
    //     this.changeDetector.detectChanges();
    //   },
    //   error: (error) => {

    //   },
    //   complete: () => {

    //   }
    // });
  }

}
