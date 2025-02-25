import { Injectable } from '@angular/core';
import { CountryI } from '../interfaces/country.interface';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  uriCountry: string = environment.URI_COUNTRY;
  urlBase: string = environment.URL_BASE;

  constructor(private readonly httpClient: HttpClient) { }

  findById(id: string) {
    
  }

  findAll() {
    return this.httpClient.get(`${this.urlBase}${this.uriCountry}`);
  }

  saveCountry(country: CountryI) { // create 
    return this.httpClient.post(`${this.urlBase}${this.uriCountry}`, country);
  }
}
