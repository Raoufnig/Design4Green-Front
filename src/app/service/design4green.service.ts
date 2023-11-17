import { Injectable } from '@angular/core';
import axios from 'axios';
import { URL } from '../Classe/base-url';

@Injectable({
  providedIn: 'root'
})
export class Design4greenService {

  constructor() { }


  getJsonCriteria(){
    return  axios.get(URL.jAPI_URL);
  }
}
