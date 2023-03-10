import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { defaults } from 'src/app/shared/service/settings';
import { ItemMasterStatus } from 'src/app/routes/Enums/ItemMaster';
let ListComponent = class ListComponent {
    constructor(activatedroute, messageService, fb, confirmation, translate, router, accountapi, masterapi) {
        this.activatedroute = activatedroute;
        this.messageService = messageService;
        this.fb = fb;
        this.confirmation = confirmation;
        this.translate = translate;
        this.router = router;
        this.accountapi = accountapi;
        this.masterapi = masterapi;
        this.items = [
            { label: 'New  Item Group', icon: 'pi pi-align-left',
                command: (event) => {
                    // event doesn't contain anything useful,
                    // and only has the clicked menu item specific information.
                    this.showBasicDialog();
                    console.log(event, this.selectedFile);
                    let data = this.selectedFile.data != null ? this.selectedFile.data : { itemMasterItemId: null };
                    this.itemMasterGrpFormGroup.controls.itemMasterAccountNo.setValue(data.itemMasterItemId);
                }
            },
            { label: 'Edit Item Group', icon: 'pi pi-user-edit', command: (event) => {
                    // event doesn't contain anything useful,
                    // and only has the clicked menu item specific information.
                    this.showBasicDialog();
                    console.log(event, this.selectedFile);
                },
            },
            { label: 'Change Group', icon: 'pi pi-replay', command: (event) => {
                    // event doesn't contain anything useful,
                    // and only has the clicked menu item specific information.
                    this.showBasicDialog();
                    console.log(event, this.selectedFile);
                },
            },
            { label: 'Delete item Group', icon: 'pi pi-trash', command: (event) => {
                    // event doesn't contain anything useful,
                    // and only has the clicked menu item specific information.
                    console.log(event, this.selectedFile);
                },
            },
            { label: 'New Item', icon: 'pi pi-plus', command: (event) => {
                    // event doesn't contain anything useful,
                    // and only has the clicked menu item specific information.
                    this.router.navigate(['/master/item/entry/' + this.selectedFile.data.itemMasterItemId]);
                    console.log(event, this.selectedFile);
                },
            },
            { label: 'Edit Item', icon: 'pi pi-user-edit', command: (event) => {
                    // event doesn't contain anything useful,
                    // and only has the clicked menu item specific information.
                    this.router.navigate(['/master/item/entry']);
                    console.log(event, this.selectedFile);
                },
            },
            { label: 'Delete Item', icon: 'pi pi-trash', command: (event) => {
                    // event doesn't contain anything useful,
                    // and only has the clicked menu item specific information.
                    console.log(event, this.selectedFile);
                },
            }
        ];
        this.priceTableSettings = this.BasicGridSettings();
        this.unitTableSettings = this.BasicGridSettings();
        this.ItemStockTypeArry = [];
        this.brandArry = [];
        this.ItemStockList = [];
        this.brandList = [];
        this.licensekey = defaults.hotlicensekey;
    }
    ngOnInit() {
        this.itemMasterGrpFormGroup = this.fb.group({
            itemMasterGroupDebitAcc: [null],
            itemMasterGroupCreditAcc: [null],
            itemMasterItemName: [null],
            itemMasterItemId: [null],
            itemMasterAccountNo: [null]
        });
        this.getStockType();
        this.getBrand();
        this.getAllItems();
        this.getAllAccount();
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
        // this.api.getItemTreeNode().then(files => this.files = files);
        // ============== Unit FormGroup Intization =======================
        this.intializepriceTableSetings();
        this.intializeunitTableSettings();
    }
    getAllItems() {
        this.masterapi.getItemsParentTreeNode().subscribe((data) => {
            this.files = [{
                    label: 'Item Master',
                    key: 'Item Master',
                    data: null,
                    expandedIcon: 'pi pi-folder-open',
                    expanded: true,
                    collapsedIcon: 'pi pi-folder',
                    children: data.result.map((k) => {
                        return {
                            label: k.itemMasterItemName,
                            key: k.itemMasterItemId.toString(),
                            data: k,
                            expandedIcon: 'pi pi-folder-open',
                            collapsedIcon: 'pi pi-folder',
                            children: [],
                            leaf: false
                        };
                    }),
                    leaf: false
                }];
            this.parentGroup = data.result.map((k) => ({ label: k.itemMasterItemName, value: k.itemMasterItemId }));
            this.parentGroup.unshift({ label: 'Item Master', value: null });
            // this.files =  data.result.map((k) => {
            //     return {
            //     label: k.itemMasterItemName,
            //     key: k.itemMasterItemId.toString(),
            //     data: k,
            //     expandedIcon: 'pi pi-folder',
            //     collapsedIcon: 'pi pi-folder',
            //     leaf: false
            //     };
            //     });
        });
    }
    contextMenuSelection($event, cm) {
        console.log($event, cm);
    }
    loadNode(event) {
        if (event.node) {
            // this.nodeService.getLazyFiles().then(nodes => event.node.children = nodes);
            this.masterapi.getItemsChildrenByParentTreeNode(event.node.data.itemMasterItemId).subscribe((data) => {
                for (const item of data.result) {
                    event.node.children.push({
                        label: item.itemMasterItemName,
                        key: item.itemMasterItemId.toString(),
                        data: item,
                        icon: item.itemMasterItemType === ItemMasterStatus.Group ? 'pi pi-folder' : 'fa fa-file-o',
                        leaf: item.itemMasterItemType === ItemMasterStatus.Group ? false : true
                    });
                }
                console.log(data.result, event.node);
            });
        }
    }
    getItemData($event) {
        console.log($event, this.selectedFile);
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
        //event.query
        //  this.brandList = this.brandArry.filter(k => k.vendorMasterVendorName.toLowerCase().match(event.query.toLowerCase()))
        //  .map(x => {
        //    return {label: x.vendorMasterVendorName, value: x.vendorMasterVendorId};
        //   });
        //  this.brandList.unshift({label: '--Select--', value: '-1'});
        const bander = [{ label: 'Lag1', value: '-1' }, { label: 'Lag2', value: '-1' }, { label: 'Lag3', value: '-1' }];
        this.brandList = bander.filter(k => k.label.toLowerCase().match(event.query.toLowerCase()));
    }
    getBrand() {
        this.masterapi.GetAllBrand().subscribe((data) => {
            this.brandArry = data;
            // this.brandList = this.brandArry.map((k) => {
            //  return {label: k.vendorMasterVendorName, value: k.vendorMasterVendorId};
            // });
        });
    }
    intializepriceTableSetings() {
        this.hotidPriceTbl = 'price_Grid';
        this.priceTableSettings.columns = [
            {
                data: 'level',
                type: 'text',
            },
            {
                data: 'rate',
                type: 'text',
            },
            {
                data: 'amount',
                type: 'text',
            }
        ];
        this.priceTableSettings.colHeaders = ['Level', 'Rate', 'Amount'];
    }
    intializeunitTableSettings() {
        this.hotidUnitTbl = 'unit_Grid';
        this.unitTableSettings.columns = [
            {
                data: 'unit',
                type: 'text',
            },
            {
                data: 'conversiontype',
                type: 'text',
            },
            {
                data: 'packing',
                type: 'text',
            }
        ];
        this.unitTableSettings.colHeaders = ['Unit', 'conversionType', 'Packing'];
    }
    BasicGridSettings(colsWidth = '150px', tablewidth = 'auto', tableheight = 200, tablerowHeights = 23) {
        return {
            rowHeaders: true,
            viewportColumnRenderingOffset: 27,
            viewportRowRenderingOffset: 'auto',
            minRows: 2,
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
    getAllAccount() {
        this.accountapi.GetAllAcounts().subscribe(k => {
            this.accountArray = k.result;
            this.accountList = k.result.map((kl) => ({ label: kl.masterAccountsTableAccName, value: kl.masterAccountsTableAccNo }));
            this.accountList.unshift({ label: '--Select--', value: -1 });
        });
    }
    showBasicDialog() {
        this.displayBasic = true;
    }
    saveGroup() {
        console.log(this.selectedFile);
        const itemData = this.itemMasterGrpFormGroup.value;
        itemData.itemMasterItemId = null;
        itemData.itemMasterAccountNo = itemData.itemMasterAccountNo == null ? 0 : itemData.itemMasterAccountNo;
        itemData.itemMasterItemType = ItemMasterStatus.Group;
        this.masterapi.InsertItem(itemData).subscribe((data) => {
            this.files = [{
                    label: 'Item Master',
                    key: 'Item Master',
                    data: null,
                    expandedIcon: 'pi pi-folder-open',
                    expanded: true,
                    collapsedIcon: 'pi pi-folder',
                    children: data.result.map((k) => {
                        return {
                            label: k.itemMasterItemName,
                            key: k.itemMasterItemId.toString(),
                            data: k,
                            expandedIcon: 'pi pi-folder-open',
                            collapsedIcon: 'pi pi-folder',
                            children: [],
                            leaf: false
                        };
                    }),
                    leaf: false
                }];
            this.messageService.add({ severity: 'success', summary: 'Alert',
                detail: 'Item Group is added' });
        });
    }
};
ListComponent = __decorate([
    Component({
        selector: 'app-list',
        templateUrl: './list.component.html',
        styleUrls: ['./list.component.scss']
    })
], ListComponent);
export { ListComponent };
//# sourceMappingURL=list.component.js.map