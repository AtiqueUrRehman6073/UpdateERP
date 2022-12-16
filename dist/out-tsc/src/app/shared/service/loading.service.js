import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { LoadingComponent } from '../component/loading/loading.component';
export class LoadingOverlayRef {
    constructor(overlayRef) {
        this.overlayRef = overlayRef;
    }
    close() {
        this.overlayRef.dispose();
    }
}
let LoadingService = class LoadingService {
    constructor(injector, overlay) {
        this.injector = injector;
        this.overlay = overlay;
    }
    open() {
        const overlayRef = this.createOverlay();
        const dialogRef = new LoadingOverlayRef(overlayRef);
        const overlayComponent = this.attachDialogContainer(overlayRef, dialogRef);
        return dialogRef;
    }
    createOverlay() {
        const positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();
        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });
        return this.overlay.create(overlayConfig);
    }
    attachDialogContainer(overlayRef, dialogRef) {
        const injector = this.createInjector(dialogRef);
        const containerPortal = new ComponentPortal(LoadingComponent, null, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    createInjector(dialogRef) {
        const injectionTokens = new WeakMap();
        injectionTokens.set(LoadingOverlayRef, dialogRef);
        return new PortalInjector(this.injector, injectionTokens);
    }
};
LoadingService = __decorate([
    Injectable()
], LoadingService);
export { LoadingService };
//# sourceMappingURL=loading.service.js.map