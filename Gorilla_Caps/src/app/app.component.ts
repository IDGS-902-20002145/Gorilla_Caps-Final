import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gorilla_Caps';
  logeado = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.router.navigate(['']);
    this.session();

  }

  session() {
    if (localStorage.getItem('token') == null) {
      this.logeado = false;
    } else {
      this.logeado = true;
    }
  }
}
