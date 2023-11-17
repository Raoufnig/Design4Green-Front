import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { Design4greenService } from 'src/app/service/design4green.service';
import { Message } from 'primeng/api';
import axios from 'axios';

interface Etat {
  state: string,
  code: string
}

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  items: MegaMenuItem[] | undefined;

  state:any[]=[] ;

  State: any[]=[];

  messages!: Message[];

  eco : any;

  i=1;

  scoreRes: any;

  criterias : any;

  theme: Set<string> = new Set();

  conforme!: string;

  non_conforme!: string;

  description!: string;

  isErr = false;

  value: string | undefined;

  non_applicable! : string;

  encoursdeploy!: string;

  visible = false;

  end = false;

  constructor(private design4 : Design4greenService) { 
    
  }

    ngOnInit() {
      this.JsonInfo();
      this.messages = [{ severity: 'success', summary: 'Success', detail: 'Message Content' }];
    }

    JsonInfo(){
      this.design4.getJsonCriteria().then((res)=>{
        console.log(res);
        this.eco = res.data;
        this.description = this.eco.description;
        this.criterias = res.data.criteres;
       

        for(let i of this.criterias){
          this.theme.add(i.thematique);
        }
        console.log(this.theme);
       
      })
    }

    submit(){
      console.log(this.state);
      console.log(this.value);
      
      for (let on of this.criterias){

        let c = { 
              number: on.id,
              state: this.state[this.i],
            }
       this.i= this.i+1;
      
       this.State.push(c);
          
      }


      let sender = {
        url : this.value,
        criterias: this.State
      }
      console.log(sender);


      axios.post("http://127.0.0.1:8000"+"/add-website",sender,{
        headers: {
          "Content-Type" : 'application/json'
        }
      }).then((res)=>{
        this.scoreRes = res.data;
        this.end = true;

      }).catch((err)=>{
        console.log(err);
        this.end = false;
      })

      //console.log(this.State);
    }


    step2(){

      if(this.value==undefined || this.value==null ){

        this.isErr= true;
        
      }else{
        this.visible = true;
      }
        
    }
}
