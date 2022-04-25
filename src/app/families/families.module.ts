import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FamiliesRoutingModule } from './families-routing.module';
import { NgxGraphModule } from '@swimlane/ngx-graph';

import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { LayoutComponent } from './layout/layout.component';
import { RcaComponent } from './rca/rca.component';

@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent,
    LayoutComponent,
    RcaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FamiliesRoutingModule,
    NgxGraphModule,
  ],
})
export class FamiliesModule {}
