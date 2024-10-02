import { ApplicationConfig, provideZoneChangeDetection, NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, BrowserModule } from '@angular/platform-browser';

//componenete para el formulario
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; //

//componentes de las notificaciones
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr'

//componentes propios
import { AppComponent } from './app.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';

//Componente para concetar el backend
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient} from '@angular/common/http';
import { withFetch } from '@angular/common/http'; 



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimations(),provideToastr(), provideHttpClient(), provideHttpClient(withFetch())],
  
};
