import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { Browser } from '@capacitor/browser';
import { Plugins, PermissionState } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

const { Permissions } = Plugins;

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  asistencia = {
    estadistica: 100,
    programacionMovil: 95,
    arquitectura: 95,
    calidadSoftware: 95,
    eticaTrabajo: 60,
    procesoPortafolios: 100,
  };

  code: any;
  constructor(private router: Router, private platform: Platform, private androidPermissions: AndroidPermissions) { }

  ngOnInit() {
  }

  redirectToAsistencia() {
    this.router.navigate(['/asistencia']); // Navega a la página de asistencia
  }

  irAHome() {
    this.router.navigate(['/home']);
  }

  redirectToInicio() {
    this.router.navigate(['/inicio']); // Navega a la página de asistencia
    this.platform.ready().then(() => {
      this.solicitarPermisosDeCamara();
    });
  }

  generarQR() {
    // Generar el contenido del QR localmente, por ejemplo, con la fecha actual
    const qrContent = new Date().toISOString();

    // Llamar a la función para actualizar la asistencia al generar el QR
    this.actualizarAsistencia();

    // Aquí puedes usar qrContent como desees, por ejemplo, mostrarlo en una variable o abrir una página web.
    console.log('Contenido del QR generado:', qrContent);
  }

  async solicitarPermisosDeCamara() {
    try {
      const permission = this.androidPermissions.PERMISSION.CAMERA;
  
      const hasPermission = await this.androidPermissions.checkPermission(permission);
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (!hasPermission) {
        const result = await this.androidPermissions.requestPermission(permission);
  
        if (result.hasPermission) {
          // Permiso concedido, puedes escanear QR
          await this.escanearQR();
        } else {
          console.warn('Permiso de la cámara denegado');
        }
        
      } else {
        // Permiso ya concedido, puedes escanear QR
        await this.escanearQR();
      }
    } catch (error) {
      console.error('Error al solicitar permisos de la cámara:', error);
    }
  }

  async escanearQR() {
    try {
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        await this.leerTexto(result.content);

        // Verificar si el contenido del QR es una URL antes de navegar
        const isUrl = /^(https?|ftp):\/\//.test(result.content);
        if (isUrl) {
          // Usar el plugin Capacitor Browser para abrir la URL
          await Browser.open({ url: result.content });
        } else {
          // Si no es una URL, imprimir el contenido en la consola
          console.log('Contenido del QR:', result.content);
        }
      }
    } catch (error) {
      console.error('Error al escanear:', error);
    }
  }

  async leerTexto(texto: string) {
    try {
      if (TextToSpeech) {
        await TextToSpeech.speak({
          text: texto,
          lang: 'es-US',
          rate: 1.0,
        });
      } else {
        console.warn('La funcionalidad de TextToSpeech no está disponible en este dispositivo.');
      }
    } catch (error) {
      console.error('Error al leer texto:', error);
    }
  }

  

  actualizarAsistencia() {
    // Puedes implementar la lógica para actualizar la asistencia aquí.
    // Por ejemplo, aumentar la asistencia de estadística en 5 puntos.
    this.asistencia.estadistica += 5;
  }
}
