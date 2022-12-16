import { TestBed } from '@angular/core/testing';
import { StockApiService } from './stock-api.service';
describe('StockApiService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StockApiService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=stock-api.service.spec.js.map