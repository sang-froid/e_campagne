import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModule } from './ui/ui.module';
import { LocalStorageService } from './service/storage/localstorage.service';
import { ParameterService } from './service/params/param';
import { AuthService } from './service/auth/auth.service';
import { OperationService } from './service/operation/operation.service';
import { SafePipe } from './pipe/security-iframe.pipe';
import { FormatMoneyPipe } from './pipe/format-money/format-money.pipe';
import { LimitToPipe } from './pipe/limit-to/limit-to.pipe';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { FormsModule } from '@angular/forms';
import { FecthDataService } from './service/fetchservice/fetchservice';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinner } from 'primeng/progressspinner';
import { HasRightDirective } from './directives/hasright.directive';

@NgModule({
  declarations: [
    FormatMoneyPipe,
    LimitToPipe,
    SafePipe,
    DateFormatPipe,


  ],
  imports: [
  CommonModule,
    UiModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [
    LocalStorageService,
    ParameterService,
    AuthService,
    OperationService,
    FecthDataService 
  ],
  exports : [
    FormatMoneyPipe,
    LimitToPipe,
    SafePipe,
    DateFormatPipe,

  ],

})
export class SharedModule { }
