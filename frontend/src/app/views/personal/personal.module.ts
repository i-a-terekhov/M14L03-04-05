import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { PersonalRoutingModule } from './personal-routing.module';
import { FavoriteComponent } from './favotite/favorite.component';
import { InfoComponent } from './info/info.component';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    FavoriteComponent,
    InfoComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class PersonalModule {
}
