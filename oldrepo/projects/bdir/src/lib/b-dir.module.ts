import { NgModule } from '@angular/core';
import { BDirDirective } from './b-dir.directive';
import { Directionality } from '@angular/cdk/bidi';
import { BDirService } from './b-dir.service';

@NgModule({
  declarations: [BDirDirective],
  exports: [BDirDirective],
  providers: [{ provide: Directionality, useExisting: BDirService }]
})
export class BDirModule {}
