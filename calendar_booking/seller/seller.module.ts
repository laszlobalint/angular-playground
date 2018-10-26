import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { effects, reducers, resetStateReducer } from './store';

import { AppointmentModule } from '../appointment/appointment.module';
import { SharedModule } from '../shared/shared.module';

import { Role } from '../auth/models';
import { RouteData } from '../core/models/route-data.model';

import { SellerComponent } from './containers/seller.component';
import { CreatePropertyAppointmentComponent } from './containers/create-property-appointment/create-property-appointment.component';

import { CreatePropertyService } from './services/create-property.service';
import { AuthGuard } from '../auth/services/auth-guard.service';
import { RoleGuard } from '../auth/services/role-guard.service';

const routes: Routes = [
  {
    path: 'seller',
    component: SellerComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { acceptRoles: [Role.Seller] } as RouteData,
    children: [
      {
        path: 'create-appointment',
        component: CreatePropertyAppointmentComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [
    SharedModule,
    AppointmentModule,
    EffectsModule.forFeature(effects),
    RouterModule.forChild(routes),
    StoreModule.forFeature('seller', reducers, { metaReducers: [resetStateReducer] }),
  ],
  declarations: [SellerComponent, CreatePropertyAppointmentComponent],
  providers: [CreatePropertyService],
})
export class SellerModule {}
