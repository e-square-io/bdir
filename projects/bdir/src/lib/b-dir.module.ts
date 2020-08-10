import { NgModule } from '@angular/core';
import { RTL_LANGUAGES_LIST } from './b-dir.models';
import { RTL_LANGUAGES } from './b-dir.tokens';
import { BDirDirective } from './b-dir.directive';

@NgModule({
  declarations: [BDirDirective],
  exports: [BDirDirective],
  providers: [
    { provide: RTL_LANGUAGES, useValue: RTL_LANGUAGES_LIST }
  ]
})
export class BDirModule {}
