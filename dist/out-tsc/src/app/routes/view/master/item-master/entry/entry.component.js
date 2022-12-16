import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { defaults } from 'src/app/shared/service/settings';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
let EntryComponent = class EntryComponent {
    constructor(activatedroute, messageService, fb, confirmation, translate, router, masterapi) {
        this.activatedroute = activatedroute;
        this.messageService = messageService;
        this.fb = fb;
        this.confirmation = confirmation;
        this.translate = translate;
        this.router = router;
        this.masterapi = masterapi;
        this.supplierList = [];
        this.ItemStockTypeArry = [];
        this.brandArry = [];
        this.ItemStockList = [];
        this.brandList = [];
        this.supplierMasterListArry = [];
        this.supplierMasterList = [];
        this.itemGroup = [];
        this.priceTableSettings = this.BasicGridSettings();
        this.unitTableSettings = this.BasicGridSettings();
        this.unitLvlMasterGrid = [];
        this.unitLvlMaster = [];
        this.priceLvlMasterGrid = [];
        this.priceLvlMaster = [];
        this.itemTableData = new Subject();
        this.searchfilter = new Subject();
        this.licensekey = defaults.hotlicensekey;
    }
    ngOnInit() {
        this.searchfilter.pipe(debounceTime(500)).subscribe(searchTextValue => {
            this.getItemyname(searchTextValue);
        });
        this.newitemForm = this.fb.group({
            itemMasterAccountNo: [null],
            itemMasterItemId: [null],
            itemMasterItemName: [null],
            itemMasterItemType: [null],
            itemMasterVenderId: [null],
            itemMasterSupplierName: [null],
            itemMasterSuplierCode: [null],
            itemMasterPartNo: [null],
            itemMasterReOrderLevel: [null],
            itemMasterItemSize: [null],
            itemMasterColor: [null],
            itemMasterShape: [null],
            itemMasterPacking: [null],
            itemMasterRef2: [null],
            itemMasterUserId: [null],
            itemMasterLandingCost: [null],
            itemMasterVat: [null]
        });
        this.btnFlag = { edit: false, cancel: false, save: true, update: false, delete: false };
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
        this.getunitlevelGridMaster();
        this.getpricelevelGridMaster();
        this.getSupplierMasterList();
        this.getAllItems();
        this.getStockType();
        this.getBrand();
        this.intializepriceTableSetings();
        this.intializeunitTableSettings();
    }
    onKeyUp(searchTextValue) {
        this.searchfilter.next(searchTextValue);
    }
    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = (event) => {
                this.url = event.target.result;
            };
        }
    }
    intializepriceTableSetings() {
        this.hotidPriceTbl = 'price_Grid';
        this.priceTableSettings.columns = [
            {
                data: 'level',
                type: 'dropdown',
                source: (query, callback) => {
                    callback(this.priceLvlMasterGrid);
                },
            },
            {
                data: 'rate',
                type: 'numeric',
            },
            {
                data: 'amount',
                type: 'numeric',
            }
        ];
        this.priceTableSettings.colHeaders = ['Level', 'Rate', 'Amount'];
    }
    intializeunitTableSettings() {
        this.hotidUnitTbl = 'unit_Grid';
        this.unitTableSettings.columns = [
            {
                data: 'unit',
                type: 'dropdown',
                source: (query, callback) => {
                    callback(this.unitLvlMasterGrid);
                },
            },
            {
                data: 'convRate',
                type: 'numeric',
            },
            {
                data: 'packing',
                type: 'text',
            },
            {
                data: 'height',
                type: 'numeric',
            },
            {
                data: 'width',
                type: 'numeric',
            },
            {
                data: 'reorder',
                type: 'text',
            },
            {
                data: 'barcode',
                type: 'text',
            },
            {
                data: 'genBarcode',
                type: 'text',
            },
            {
                data: 'print',
                type: 'text',
            },
            {
                data: 'description',
                type: 'text',
            },
            {
                data: 'costPrice',
                type: 'numeric',
            },
            {
                data: 'unitPrice',
                type: 'numeric',
            },
            {
                data: 'profitpercentage',
                type: 'numeric',
            },
            {
                data: 'overheadpercentage',
                type: 'numeric',
            }
        ];
        this.unitTableSettings.colHeaders = ['Unit', 'Conv.Type', 'Packing', 'Barcode',
            'Gen Barcode', 'Print', 'Description', 'Cost Price', 'Height', 'Width', 'Re-order', 'Unit Price', 'Profit(%)', 'Overhead(%)'];
    }
    BasicGridSettings(colsWidth = 'auto', tablewidth = 'auto', tableheight = 200, tablerowHeights = 23) {
        return {
            rowHeaders: true,
            viewportColumnRenderingOffset: 27,
            viewportRowRenderingOffset: 'auto',
            minRows: 8,
            fillHandle: {
                direction: 'vertical',
                autoInsertRow: true
            },
            colWidths: colsWidth,
            width: tablewidth,
            height: tableheight,
            rowHeights: tablerowHeights,
            data: [],
            minSpareRows: 1,
            allowInsertRow: true,
            stretchH: 'all',
            manualRowResize: true,
            manualColumnResize: true,
            columns: [],
            colHeaders: [],
            manualRowMove: true,
            manualColumnMove: true,
            contextMenu: true,
            filters: true,
            dropdownMenu: true,
        };
    }
    getAllItems() {
        this.masterapi.getItemsParentTreeNode().subscribe((data) => {
            this.itemGroup = data.result.map((k) => ({ label: k.itemMasterItemName, value: k.itemMasterItemId }));
            this.itemGroup.unshift({ label: 'Item Master', value: null });
            this.activatedroute.paramMap.subscribe(params => {
                this.itemId = params.get('id');
                this.newitemForm.controls.itemMasterAccountNo.setValue(Number(this.itemId));
                this.getSupplierList(this.itemId);
            });
        });
    }
    getStockType() {
        this.masterapi.GetAllItemStock().subscribe((data) => {
            this.ItemStockTypeArry = data.result;
            this.ItemStockList = this.ItemStockTypeArry.map((k) => {
                return { label: k.itemStockTypeDescription, value: k.itemStockTypeId };
            });
            this.ItemStockList.unshift({ label: '--Select--', value: '-1' });
        });
    }
    search(event) {
        // const bander = [{label: 'Lag1', value: '-1'}, {label: 'Lag2', value: '-1'}, {label: 'Lag3', value: '-1'}];
        if (event.query.trim() !== '') {
            this.brandList = this.brandArry.filter(k => k.vendorMasterVendorName.toLowerCase()
                .match(event.query.toLowerCase())).map((x) => ({ label: x.vendorMasterVendorName,
                value: x.vendorMasterVendorId }));
        }
        else {
            this.brandList = this.brandArry.map((x) => ({ label: x.vendorMasterVendorName,
                value: x.vendorMasterVendorId }));
        }
    }
    searchBySupplier(event) {
        if (event.query.trim() !== '') {
            this.supplierMasterList = this.supplierMasterListArry.filter(k => k.suppliersMasterSupplierName.toLowerCase()
                .match(event.query.toLowerCase())).map((x) => ({ label: x.suppliersMasterSupplierName,
                value: x.suppliersMasterSupplierId }));
        }
        else {
            this.supplierMasterList = this.supplierMasterListArry.map((x) => ({ label: x.suppliersMasterSupplierName,
                value: x.suppliersMasterSupplierId }));
        }
    }
    getBrand() {
        this.masterapi.GetAllBrand().subscribe((data) => {
            this.brandArry = data;
        });
    }
    getSupplierList(id) {
        this.masterapi.GetSupplierDetailsByItemId(id).subscribe((data) => {
            this.supplierList = data.result;
        });
    }
    getSupplierMasterList() {
        this.masterapi.GetAllSupplier().subscribe((data) => {
            this.supplierMasterListArry = data;
        });
    }
    getItemyname(event) {
        this.masterapi.GetAllItemByName(event).pipe(debounceTime(4000)).subscribe((data) => {
            console.log('itemData by name', data);
            this.itemTableData.next(data.result);
        });
    }
    getpricelevelGridMaster() {
        this.masterapi.GetAllPriceLevel().subscribe((data) => {
            this.priceLvlMasterGrid = data.map(k => k.priceLevelMasterPriceLevelName.trim());
            this.priceLvlMaster = data;
        });
    }
    getunitlevelGridMaster() {
        this.masterapi.GetAllUnit().subscribe((data) => {
            this.unitLvlMasterGrid = data.map(k => k.unitMasterUnitFullName.trim());
            this.unitLvlMaster = data;
        });
    }
    transformUnitLvlgrid() {
        // priceTableSettings: Handsontable.GridSettings = this.BasicGridSettings() ;
        // unitTableSettings: Handsontable.GridSettings = this.BasicGridSettings() ;
        const unitGridData = this.unitTableSettings.data;
        return unitGridData.filter(k => k.hasOwnProperty('unit')).map(k => ({
            unitDetailsId: null,
            unitDetailsUnitId: k.unit != null && k.unit !== '' ? this.unitLvlMaster
                .find(j => j.unitMasterUnitFullName.trim() === k.unit.trim()).unitMasterUnitId : null,
            unitDetailsConversionType: k.convRate,
            unitDetailsRate: null,
            unitDetailsWrate: null,
            unitDetailsDefUnit: null,
            unitDetailsDefWunit: null,
            unitDetailsHeight: k.height,
            unitDetailsWidth: k.width,
            unitDetailsReorder: k.reorder,
            unitDetailsDelStatus: null,
            unitDetailsItem: null,
            unitDetailsUnit: null
        }));
    }
    transformPriceLvlgrid() {
        // priceTableSettings: Handsontable.GridSettings = this.BasicGridSettings() ;
        // unitTableSettings: Handsontable.GridSettings = this.BasicGridSettings() ;
        const priceGridData = this.unitTableSettings.data;
        return priceGridData.filter(k => k.hasOwnProperty('level')).map(k => ({
            itemPriceLevelId: null,
            itemId: null,
            levelId: k.level != null && k.level !== '' ? this.priceLvlMaster
                .find(j => j.priceLevelMasterPriceLevelName.trim() === k.level.trim()).priceLevelMasterPriceLevelId : null,
            levelRate: k.rate,
            levelAmt: k.amount,
            unitId: null,
            item: null,
            level: null
        }));
    }
    saveItem() {
        const itemData = JSON.parse(JSON.stringify(this.newitemForm.value));
        itemData.itemMasterAccountNo = itemData.itemMasterAccountNo == null ? 0 : itemData.itemMasterAccountNo;
        itemData.itemMasterVenderId = this.newitemForm.value.itemMasterVenderId.value;
        itemData.itemMasterSuplierCode = this.newitemForm.value.itemMasterSuplierCode.label;
        itemData.itemMasterSupplierName = this.newitemForm.value.itemMasterSuplierCode.label;
        itemData.itemMasterReOrderLevel = Number(itemData.itemMasterReOrderLevel);
        itemData.itemMasterLandingCost = Number(itemData.itemMasterLandingCost);
        itemData.itemMasterUserId = null;
        itemData.itemMasterVat = Number(itemData.itemMasterVat);
        itemData.itemMasterItemType = null;
        itemData.unitDetails = this.transformUnitLvlgrid();
        itemData.itemPriceLevelDetails = this.transformPriceLvlgrid();
        this.masterapi.InsertItem(itemData).subscribe((data) => {
            if (data.valid) {
                this.messageService.add({ severity: 'success', summary: 'Alert',
                    detail: 'New Item is Saved' });
            }
        });
    }
};
EntryComponent = __decorate([
    Component({
        selector: 'app-entry',
        templateUrl: './entry.component.html',
        styleUrls: ['./entry.component.scss']
    })
], EntryComponent);
export { EntryComponent };
//# sourceMappingURL=entry.component.js.map