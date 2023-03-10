import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// Application Components
import { AppComponent } from './app.component';
import { AppMenuComponent } from './layout/menu/component/app.menu.component';
import { AppMenuitemComponent } from './layout/menu/component/app.menuitem.component';
import { AppTopBarComponent } from './layout/topbar/app.topbar.component';
import { AppFooterComponent } from './layout/footer/app.footer.component';
import { MenuService } from './layout/menu/service/app.menu.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { RouterModule } from '@angular/router';
import { TranslaterComponent } from './layout/topbar/translater/translater.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { PrimeModuleModule } from './shared/module/prime-module/prime-module.module';
import { MessageService, ConfirmationService } from 'primeng/api';
// Application services
export function TranslateHttpLoaderFactory(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        imports: [
            BrowserModule,
            SharedModule,
            HttpClientModule,
            BrowserAnimationsModule,
            CoreModule,
            PrimeModuleModule,
            RouterModule,
            RoutesModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: TranslateHttpLoaderFactory,
                    deps: [HttpClient],
                },
            }),
        ],
        declarations: [
            AppComponent,
            AppMenuComponent,
            AppMenuitemComponent,
            AppTopBarComponent,
            AppFooterComponent,
            TranslaterComponent,
        ],
        providers: [
            { provide: LocationStrategy, useClass: HashLocationStrategy },
            MenuService,
            MessageService,
            ConfirmationService
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map