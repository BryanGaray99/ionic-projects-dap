import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';

/**
 * Explaining the basic structure of an Angular module.
 * declarations: Specifies the components, directives, and pipes that belong to this module.
 * imports: Imports other modules that this module needs.
 * providers: Registers the services and other objects that are available within the module.
 * bootstrap: Specifies the root component that Angular creates and inserts into the index.html host web page.
 */
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy,
  }, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
