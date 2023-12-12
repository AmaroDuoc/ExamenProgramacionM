import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  email: String;
  
   constructor(private router: Router) { 
    this.email = ""
   }

  ngOnInit() {
  }
  irALogin() {
    this.router.navigate(['/login']); // Navega a la página recuperar
  }

}
  

