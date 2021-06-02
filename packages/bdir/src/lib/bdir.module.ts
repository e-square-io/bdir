import { NgModule } from '@angular/core';
import { BDirDirective } from './bdir.directive';
import { Directionality } from '@angular/cdk/bidi';
import { BDirService } from './bdir.service';

@NgModule({
  declarations: [BDirDirective],
  exports: [BDirDirective],
  providers: [{ provide: Directionality, useExisting: BDirService }],
})
export class BDirModule {}
