import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeES from '@angular/common/locales/es';
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { FormVehiculoComponent } from './vehiculos/form-vehiculo.component';
import { PaginatorvehiculoComponent } from './paginatorvehiculo/paginatorvehiculo.component';
import { DetallevehiculoComponent } from './vehiculos/detallevehiculo/detallevehiculo.component';
import { LoginComponent } from './usuarios/login.component';



import { ClienteService } from './clientes/cliente.service';

import {HttpClientModule} from '@angular/common/http';

import { FormsModule } from '@angular/forms';
//import { HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import {registerLocaleData} from '@angular/common';

import { VehiculoService } from './vehiculos/vehiculo.service';
import { AppRoutingModule } from './app-routing.module';




//import '@angular/common/locales/global/es';

registerLocaleData(localeES, 'es')

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    VehiculosComponent,
    FormVehiculoComponent,
    PaginatorvehiculoComponent,
    DetallevehiculoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    //RouterModule.forRoot(routes)
    AppRoutingModule
  ],
 
 providers: [ClienteService, VehiculoService, 
   {provide: LOCALE_ID, useValue: 'es' }
   //{provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
