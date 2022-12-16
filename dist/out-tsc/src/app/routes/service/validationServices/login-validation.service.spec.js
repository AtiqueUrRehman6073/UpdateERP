import { TestBed } from '@angular/core/testing';
import { LoginValidationService } from './login-validation.service';
describe('LoginValidationService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LoginValidationService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=login-validation.service.spec.js.map