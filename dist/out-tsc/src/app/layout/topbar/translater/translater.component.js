import { __decorate } from "tslib";
import { Component } from '@angular/core';
let TranslaterComponent = class TranslaterComponent {
    constructor(translate, settings, app) {
        this.translate = translate;
        this.settings = settings;
        this.app = app;
        translate.addLangs(['en-US', 'ar-SA']);
        translate.setDefaultLang('en-US');
        const browserLang = navigator.language;
        translate.use(browserLang.match(/en-US|ar-SA/) ? browserLang : 'en-US');
    }
    ngOnInit() {
        this.items = [
            { label: 'English', icon: 'pi pi-fw pi-microsoft', command: () => this.useLanguage('en-US') },
            { label: 'رمز قصير', icon: 'pi pi-fw pi-microsoft', command: () => this.useLanguage('ar-SA') },
        ];
    }
    useLanguage(language) {
        this.translate.use(language);
        this.settings.setLanguage(language);
    }
};
TranslaterComponent = __decorate([
    Component({
        selector: 'app-translater',
        templateUrl: './translater.component.html',
        styleUrls: ['./translater.component.scss']
    })
], TranslaterComponent);
export { TranslaterComponent };
//# sourceMappingURL=translater.component.js.map