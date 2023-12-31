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
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculoService } from './vehiculos/vehiculo.service';
import { FormVehiculoComponent } from './vehiculos/form-vehiculo.component';
import { PaginatorvehiculoComponent } from './paginatorvehiculo/paginatorvehiculo.component';
import { DetallevehiculoComponent } from './vehiculos/detallevehiculo/detallevehiculo.component';


//import '@angular/common/locales/global/es';

registerLocaleData(localeES, 'es')
const routes: Routes = [
     {path:'', redirectTo:'/clientes', pathMatch: 'full'},
     {path:'directivas', component: DirectivaComponent},
     {path:'clientes', component: ClientesComponent},
     {path:'clientes/page/:page', component: ClientesComponent},
     {path:'clientes/form', component: FormComponent},
     {path: 'clientes/form/:id', component: FormComponent},
    /*  {path: 'clientes/ver/:id', component: DetalleComponent}, */
     {path:'vehiculos', component: VehiculosComponent},
     {path: 'vehiculos/page/:page', component: VehiculosComponent},
     {path:'vehiculos/form-vehiculo', component: FormVehiculoComponent},
     {path:'vehiculos/form-vehiculo/:id', component: FormVehiculoComponent},
     {path: 'vehiculos/ver/:id', component: DetallevehiculoComponent}
];

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
    DetallevehiculoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)

  ],
  providers: [ClienteService, VehiculoService,  {provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
