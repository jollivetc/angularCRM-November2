import { NgModule } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar'
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatIconModule} from '@angular/material/icon'
import {MatSelectModule} from '@angular/material/select'


const importExport=[MatToolbarModule,MatFormFieldModule,
                      MatButtonModule, MatInputModule,
                      MatTooltipModule, MatIconModule,
                      MatSelectModule]

@NgModule({
  declarations: [],
  imports: importExport,
  exports: importExport
})
export class AppMaterialModule { }
