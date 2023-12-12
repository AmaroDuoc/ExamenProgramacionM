import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  nombreUsuario: string;
  constructor(private router: Router) { 
    this.nombreUsuario = "Usuario1";

  }
   
  ngOnInit() {
  }
  irAHome() {
    this.router.navigate(['/home']); 
  }
  redirectToAsistencia() {
    this.router.navigate(['/asistencia']); // Navega a la página de asistencia
  }
}

