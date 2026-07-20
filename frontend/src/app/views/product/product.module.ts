import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductRoutingModule } from './product-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CatalogComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CarouselModule,
    ProductRoutingModule,
  ],
})
export class ProductModule {
}
