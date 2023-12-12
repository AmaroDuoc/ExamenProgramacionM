import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'; // Importa NavController
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';  // Variable para almacenar el usuario
  contrasena: string = '';  // Variable para almacenar la contraseña
  private USUARIOS_VALIDOS = [
    { usuario: 'usuario1', contrasena: 'contrasena1' },
    { usuario: 'usuario2', contrasena: 'contrasena2' }
  ];
  constructor(private router: Router,private alertController: AlertController) { }

  ngOnInit() {
  }
  irARecuperar() {
    this.router.navigate(['/recuperar']); // Navega a la página recuperar
  }
  // Función para validar las credenciales
  private validarCredenciales(usuario: string, contrasena: string): boolean {
    return this.USUARIOS_VALIDOS.some(u => u.usuario === usuario && u.contrasena === contrasena);
  }
  irAInicio() {
    // Validar las credenciales
    if (this.validarCredenciales(this.usuario, this.contrasena)) {
      console.log('Credenciales válidas, navegando a inicio...');
      this.router.navigate(['/inicio']); // Navega a la página de inicio
    } this.mostrarAlerta('Credenciales incorrectas', 'Por favor, revisa tu usuario y contraseña.');
  }


async mostrarAlerta(titulo: string, mensaje: string) {
  const alert = await this.alertController.create({
    header: titulo,
    message: mensaje,
    buttons: ['OK']
  });

  await alert.present();
}
}