import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gorilla_Caps';
  logeado = false;

  ngOnInit():void{
    this.session();
  }

  session(){
    if(localStorage.getItem('token') == null){
      this.logeado = false;
    }else{
      this.logeado = true;
    }
  }
}
