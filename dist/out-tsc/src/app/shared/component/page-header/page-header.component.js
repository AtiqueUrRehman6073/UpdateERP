import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let PageHeaderComponent = class PageHeaderComponent {
    constructor(translate) {
        this.translate = translate;
        this.title = '';
        this.subtitle = '';
        this.nav = [];
        this.showBreadCrumb = true;
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], PageHeaderComponent.prototype, "title", void 0);
__decorate([
    Input()
], PageHeaderComponent.prototype, "subtitle", void 0);
__decorate([
    Input()
], PageHeaderComponent.prototype, "nav", void 0);
__decorate([
    Input()
], PageHeaderComponent.prototype, "showBreadCrumb", void 0);
PageHeaderComponent = __decorate([
    Component({
        selector: 'app-page-header',
        templateUrl: './page-header.component.html',
        styleUrls: ['./page-header.component.scss']
    })
], PageHeaderComponent);
export { PageHeaderComponent };
//# sourceMappingURL=page-header.component.js.map