import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    SelectComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    SelectComponent,
    ProductCardComponent,
  ]
})
export class SharedModule { }
