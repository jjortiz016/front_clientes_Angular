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
//import { HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import {registerLocaleData} from '@angular/common';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculoService } from './vehiculos/vehiculo.service';
import { FormVehiculoComponent } from './vehiculos/form-vehiculo.component';
import { PaginatorvehiculoComponent } from './paginatorvehiculo/paginatorvehiculo.component';
import { DetallevehiculoComponent } from './vehiculos/detallevehiculo/detallevehiculo.component';
import { LoginComponent } from './usuarios/login.component';
import { authGuard } from './usuarios/guards/auth.guard';
import { roleGuard } from './usuarios/guards/role.guard';




//import '@angular/common/locales/global/es';

registerLocaleData(localeES, 'es')
const routes: Routes = [
     {path:'', redirectTo:'/clientes', pathMatch: 'full'},
     {path:'directivas', component: DirectivaComponent},
     {path:'clientes', component: ClientesComponent},
     {path:'clientes/page/:page', component: ClientesComponent},
     {path:'clientes/form', component: FormComponent, canActivate:[authGuard, roleGuard], data:{role:'ROLE_ADMIN'}},
     {path: 'clientes/form/:id', component: FormComponent, canActivate:[authGuard, roleGuard], data:{role:'ROLE_ADMIN'}},
    //{path:'clientes/form', component: FormComponent},
  //  {path: 'clientes/form/:id', component: FormComponent},
     {path:'vehiculos', component: VehiculosComponent},
     {path: 'vehiculos/page/:page', component: VehiculosComponent},
     {path:'vehiculos/form-vehiculo', component: FormVehiculoComponent},
     {path:'vehiculos/form-vehiculo/:id', component: FormVehiculoComponent},
     {path: 'vehiculos/ver/:id', component: DetallevehiculoComponent},
     {path: 'login', component: LoginComponent},
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
    DetallevehiculoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)

  ],
 
 providers: [ClienteService, VehiculoService, 
   {provide: LOCALE_ID, useValue: 'es' }
   //{provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
