import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AssetmanagmentComponent = class AssetmanagmentComponent {
    constructor(activatedroute) {
        this.activatedroute = activatedroute;
        this.displayedColumns = ['path', 'group_name', 'code', 'asset_name', 'date', 'action'];
    }
    ngOnInit() {
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
    }
};
AssetmanagmentComponent = __decorate([
    Component({
        selector: 'app-assetmanagment',
        templateUrl: './assetmanagment.component.html',
        styleUrls: ['./assetmanagment.component.scss']
    })
], AssetmanagmentComponent);
export { AssetmanagmentComponent };
//# sourceMappingURL=assetmanagment.component.js.map