import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myapp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    BarcodeScanner: {
      // Configuración específica del plugin BarcodeScanner
      CAMERA_USAGE_DESCRIPTION: 'Permitir acceso a la cámara para escanear códigos QR.'
    }
  }
};

export default config;