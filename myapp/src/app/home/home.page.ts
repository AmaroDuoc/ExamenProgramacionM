import { NavController, Platform } from '@ionic/angular';
import { Component, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import type { QueryList } from '@angular/core';
import { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { Browser } from '@capacitor/browser';
import { Plugins,  } from '@capacitor/core';
import { Capacitor } from '@capacitor/core';
import { PermissionState } from '@capacitor/core';


const { Permissions } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;
  @ViewChildren(IonCard) ionCards!: QueryList<IonCard>;

  private animation!: Animation;
  nombreUsuario: string;
  isAlertOpen = false;
  public alertButtons = ['OK'];
  
  constructor(private navCtrl: NavController, private animationCtrl: AnimationController, private platform: Platform) {
    this.nombreUsuario = 'UsuarioEjemplo';
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .direction('alternate')
      .fromTo('background', 'blue', 'var(--background)');
     
  }

  play() {
    this.animation.play();
  }

  pause() {
    this.animation.pause();
  }

  stop() {
    this.animation.stop();
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  // Función para redirigir a la página de inicio de sesión (login)
  redirectToLogin() {
    setTimeout(() => {
      this.navCtrl.navigateForward('/login');
    }, 400);
  }

 
}
    

