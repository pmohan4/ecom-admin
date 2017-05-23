import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing, HttpModule],
  declarations: [Pages]
})
export class PagesModule {
}
