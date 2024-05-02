
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { authGuard } from './usuarios/guards/auth.guard';
import { roleGuard } from './usuarios/guards/role.guard';




const app_routes: Routes = [
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
    //{path:'**', pathMatch: 'full', redirectTo:''}
];

@NgModule({
        imports:[
            RouterModule.forRoot(app_routes, {useHash: true})
        ],
        exports: [
           RouterModule //se exporta para que lo detect el app.module
        ]
})

export class AppRoutingModule{

}