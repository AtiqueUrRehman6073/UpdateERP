import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { DropDownValidator } from 'src/app/shared/validator/customvalidtor';
import { defaults } from 'src/app/shared/service/settings';
import { HotTableRegisterer } from '@handsontable/angular';
let StockMovementComponent = class StockMovementComponent {
    constructor(activatedroute, messageService, fb, confirmation, translate, router, masterapi, accountapi) {
        this.activatedroute = activatedroute;
        this.messageService = messageService;
        this.fb = fb;
        this.confirmation = confirmation;
        this.translate = translate;
        this.router = router;
        this.masterapi = masterapi;
        this.accountapi = accountapi;
        this.confirmDropDatabaseDialogVisible = false;
        this.index = 0;
        this.currArry = [];
        this.accountArray = [];
        this.acctArry = [];
        this.jobArray = [];
        this.jobList = [];
        this.jobArry = [];
        this.costcenterArray = [];
        this.costcenterList = [];
        this.costcenterArry = [];
        this.accountTransactionList = [];
        this.receiptVoucherarry = [];
        this.hotRegisterer = new HotTableRegisterer();
        this.hotid = 'receiptVouchrEntry';
        this.locations = [];
        this.licensekey = defaults.hotlicensekey;
        this.locations = [
            { name: 'Main::1' },
            { name: 'Main::2' },
            { name: 'Main::3' }
        ];
    }
    ngOnInit() {
        this.cols = [
            { field: 'ReceiptVoucherMasterVoucherNo', header: 'Voucher No' },
            { field: 'ReceiptVoucherMasterVoucherDate', header: 'Date' },
            { field: 'ReceiptVoucherMasterDrAcNo', header: 'Account' },
            { field: 'ReceiptVoucherMasterCurrencyId', header: 'Currency' },
            { field: 'ReceiptVoucherMasterDrAmount', header: 'Vchr.Debit' },
            { field: 'ReceiptVoucherMasterCrAmount', header: 'Vchr.Credit' },
            { field: 'ReceiptVoucherMasterNarration', header: 'Particulars' },
            { field: 'ReceiptVoucherMasterDrAmount', header: 'Dtls.Debit' },
            { field: 'ReceiptVoucherMasterCrAmount', header: 'Dtls.Credit' }
        ];
        this.btnFlag = { edit: false, cancel: false, save: true, update: false, delete: false };
        this.initializeControls();
        this.receiptVoucherFormGroup = this.fb.group({
            // receiptVoucherSno: [null],
            // receiptVoucherVoucherNo: [{ value: null, disabled: true }],
            // receiptVoucherDate: [null],
            // receiptVoucherVoucherRef: [''],
            // receiptVoucherCrAcNo: [-1],
            // receiptVoucherCrAmount: [null],
            // receiptVoucherDbAmount: [null],
            // receiptVoucherNarration: [''],
            // receiptVoucherCurreReceiptVoucherMasterVoucherDatencyId: [-1],
            ReceiptVoucherMasterSNO: [null],
            ReceiptVoucherMasterVoucherNo: [{ value: null, disabled: true }],
            ReceiptVoucherMasterVoucherDate: [null, [Validators.required]],
            ReceiptVoucherMasterRefNo: ['', [Validators.required]],
            ReceiptVoucherMasterDrAcNo: [-1, [DropDownValidator]],
            ReceiptVoucherMasterDrAmount: [null],
            ReceiptVoucherMasterNarration: ['', [Validators.required]],
            ReceiptVoucherMasterCurrencyId: [-1, [DropDownValidator]]
        });
        this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
        });
    }
    getCurrency(id) {
        var _a;
        return (_a = this.currencyList) === null || _a === void 0 ? void 0 : _a.find(k => k.value === id).label;
    }
    get f() {
        return this.receiptVoucherFormGroup.controls;
    }
    initializeControls() {
        this.getAllJobs();
        this.getAllCostCenter();
        this.getAllAccount();
        this.getAllCurrency();
        this.getAllReceiptVouchrs();
        // this.getAllAccountTransaction();
        this.receiptvoucherentry = {
            rowHeaders: true,
            viewportColumnRenderingOffset: 27,
            viewportRowRenderingOffset: 'auto',
            colWidths: 150,
            minRows: 2,
            width: '100%',
            height: 150,
            rowHeights: 23,
            fillHandle: {
                direction: 'vertical',
                autoInsertRow: true
            },
            data: [],
            minSpareRows: 1,
            // allowInsertColumn: false,
            allowInsertRow: true,
            // allowRemoveColumn: false,
            // allowRemoveRow: false,
            // autoWrapRow: false,
            // autoWrapCol: false,
            stretchH: "all",
            //  autoWrapRow: true,
            // height: 487,
            // maxRows: 22,
            manualRowResize: true,
            manualColumnResize: true,
            hiddenColumns: {
                columns: [8],
                indicators: false
            },
            // rowHeaders: true,
            columns: [
                {
                    data: 'account',
                    type: 'autocomplete',
                    source: (query, callback) => {
                        callback(this.acctArry);
                    },
                    allowInvalid: false,
                    strict: false
                },
                {
                    data: 'credit',
                    type: 'numeric'
                },
                {
                    data: 'jobname',
                    type: 'autocomplete',
                    source: (query, callback) => {
                        callback(this.jobArry);
                    },
                    allowInvalid: false,
                    strict: false
                },
                {
                    data: 'costcenter',
                    type: 'dropdown',
                    source: (query, callback) => {
                        callback(this.costcenterArry);
                    },
                },
                {
                    data: 'narration',
                    type: 'text',
                },
                {
                    data: 'id',
                    type: 'numeric'
                },
                {
                    data: 'Temp',
                    type: 'numeric'
                },
                {
                    data: 'Temp',
                    type: 'numeric'
                }
            ],
            colHeaders: [
                this.translate.instant('A'),
                this.translate.instant('B'),
                this.translate.instant('C'),
                this.translate.instant('D'),
                this.translate.instant('E'),
                this.translate.instant('F'),
                this.translate.instant('G'),
                this.translate.instant('H')
            ],
            manualRowMove: true,
            manualColumnMove: true,
            contextMenu: true,
            filters: true,
            dropdownMenu: true,
        };
        this.receiptvoucherentry.beforeChangeRender = (change, source) => {
            this.ColumnSum();
        };
        this.receiptvoucherentry.afterRemoveRow = (index, amount) => {
            // console.log('beforeRemove: index: %d, amount: %d', index, amount);
            // console.log(this.hotRegisterer.getInstance(this.hotid).getDataAtRow(index));
            this.ColumnSum();
        };
        this.receiptvoucherentry.afterValidate = (isValid, value, row, prop) => {
            if (!isValid) {
                this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Invalid entry' });
            }
        };
    }
    ColumnSum() {
        if (this.receiptvoucherentry.data.length > 0) {
            const sum1 = this.receiptvoucherentry.data.filter(item => item.hasOwnProperty('credit'))
                .reduce((sum, current) => sum + current.credit, 0);
            this.receiptVoucherFormGroup.controls.ReceiptVoucherMasterDrAmount.setValue(sum1);
        }
    }
    getAllCurrency() {
        this.masterapi.GetAllCurrency().subscribe(k => {
            this.currencyList = k.map((kl) => ({ label: kl.currencyMasterCurrencyName, value: kl.currencyMasterCurrencyId }));
            this.currencyList.unshift({ label: '--Select--', value: -1 });
            this.currArry = k.map(ar => ar.currencyMasterCurrencyName.trim());
        });
    }
    getAllJobs() {
        this.masterapi.GetAllJob().subscribe(k => {
            this.jobArray = k;
            this.jobList = k.map((kl) => ({ label: kl.jobMasterJobName, value: kl.jobMasterId }));
            this.jobArry = k.map(ar => ar.jobMasterJobName.trim());
        });
    }
    getAllCostCenter() {
        this.masterapi.GetAllCostCenter().subscribe(k => {
            this.costcenterArray = k;
            this.costcenterList = k.map((kl) => ({ label: kl.costCenterMasterCostCenterName, value: kl.costCenterMasterCostCenterId }));
            this.costcenterArry = k.map(ar => ar.costCenterMasterCostCenterName.trim());
        });
    }
    getAllAccount() {
        this.accountapi.GetAllAcounts().subscribe(k => {
            this.accountArray = k.result;
            this.accountList = k.result.filter(v => v.masterAccountsTableRelativeNo.trim() === 'AS11')
                .map((kl) => ({ label: kl.masterAccountsTableAccName, value: kl.masterAccountsTableAccNo }));
            this.accountList.unshift({ label: '--Select--', value: -1 });
            this.acctArry = k.result.map(ar => ar.masterAccountsTableAccName.trim() + '|' + ar.masterAccountsTableAccNo);
        });
    }
    saveReceiptVoucher() {
        let deletedGridData = [];
        let deletedAccountTrans = [];
        const savedData = this.receiptvoucherentry.data.filter(k => k.hasOwnProperty('account'));
        const RcptVoucher = this.receiptVoucherFormGroup.value;
        RcptVoucher.receiptVoucherMasterVoucherNo = this.receiptVoucherFormGroup.getRawValue().ReceiptVoucherMasterVoucherNo;
        RcptVoucher.receiptVoucherMasterSno = this.receiptVoucherFormGroup.value.ReceiptVoucherMasterSNO;
        RcptVoucher.receiptVoucherMasterDrAmount = this.receiptVoucherFormGroup.getRawValue().ReceiptVoucherMasterDrAmount;
        RcptVoucher.receiptVoucherMasterFcDrAmount = this.receiptVoucherFormGroup.getRawValue().ReceiptVoucherMasterDrAmount;
        RcptVoucher.receiptVoucherMasterFsno = 1;
        RcptVoucher.receiptVoucherMasterUserId = 1;
        RcptVoucher.receiptVoucherMasterAllocId = 0;
        RcptVoucher.receiptVoucherMasterVoucherDate = this.receiptVoucherFormGroup.getRawValue().ReceiptVoucherMasterVoucherDate;
        RcptVoucher.receiptVoucherMasterVoucherType = '';
        RcptVoucher.receiptVoucherMasterDrAcNo = this.receiptVoucherFormGroup.getRawValue().ReceiptVoucherMasterDrAcNo;
        RcptVoucher.receiptVoucherMasterCrAmount = 0;
        RcptVoucher.receiptVoucherMasterFcCrAmount = 0;
        RcptVoucher.receiptVoucherMasterNarration = this.receiptVoucherFormGroup.getRawValue().ReceiptVoucherMasterNarration;
        RcptVoucher.receiptVoucherMasterRefNo = this.receiptVoucherFormGroup.getRawValue().ReceiptVoucherMasterRefNo;
        RcptVoucher.receiptVoucherMasterCurrencyId = this.receiptVoucherFormGroup.getRawValue().ReceiptVoucherMasterCurrencyId;
        RcptVoucher.receiptVoucherDetails = savedData.filter(k => k.account != null
            && k.credit != null)
            .map((k) => {
            return {
                receiptVoucherDetailsId: k.id != null ? k.id : 0,
                receiptVoucherDetailsVoucherNo: this.receiptVoucherFormGroup.getRawValue().ReceiptVoucherMasterVoucherNo,
                receiptVoucherDetailsSlNo: 0,
                receiptVoucherDetailsCrAcNo: k.account.trim().split('|')[1],
                receiptVoucherDetailsCrAmount: k.credit,
                receiptVoucherDetailsFcCrAmount: k.credit,
                receiptVoucherDetailsDbAmount: 0,
                receiptVoucherDetailsJobId: k.jobname != null && k.jobname !== '' ? this.jobArray
                    .find(j => j.jobMasterJobName.trim() === k.jobname.trim()).jobMasterId : null,
                receiptVoucherDetailsDepId: 0,
                receiptVoucherDetailsNarration: k.narration,
                receiptVoucherDetailsFsno: 0,
                receiptVoucherDetailsDelStatus: false
            };
        });
        if (this.btnFlag.update) {
            deletedGridData = this.savedReceiptVoucher.receiptVoucherDetails.filter((k) => {
                if (!(RcptVoucher.receiptVoucherDetails
                    .some(l => l.receiptVoucherDetailsId === k.receiptVoucherDetailsId))) {
                    k.receiptVoucherDetailsDelStatus = true;
                    return k;
                }
            });
            if (deletedGridData.length > 0) {
                RcptVoucher.receiptVoucherDetails.push(...deletedGridData);
            }
        }
        RcptVoucher.accountsTransactions = [];
        const debitData = {
            accountsTransactionsAccNo: this.f.ReceiptVoucherMasterDrAcNo.value,
            accountsTransactionsTransDate: this.f.ReceiptVoucherMasterVoucherDate.value,
            accountsTransactionsParticulars: this.f.ReceiptVoucherMasterNarration.value,
            accountsTransactionsCredit: this.f.ReceiptVoucherMasterDrAmount.value,
            accountsTransactionsFcCredit: this.f.ReceiptVoucherMasterDrAmount.value,
            accountsTransactionsVoucherType: null,
            accountsTransactionsTstamp: new Date(),
            accountsTransactionsVoucherNo: this.receiptVoucherFormGroup.getRawValue().ReceiptVoucherMasterVoucherNo,
            accountsTransactionsDescription: this.f.ReceiptVoucherMasterNarration.value,
            accountsTransactionsStatus: null,
            accountstransactionsDelStatus: false
        };
        RcptVoucher.accountsTransactions.push(debitData);
        // console.log('RcpVcher Details',RcptVoucher.receiptVoucherDetails)
        // console.log('RcptVoucher-receiptVoucherDetails',RcptVoucher.receiptVoucherDetails.
        // filter(x => x.ReceiptVoucherDetailsDelStatus === false));
        RcptVoucher.receiptVoucherDetails.filter(x => x.receiptVoucherDetailsDelStatus === false)
            .forEach(element => {
            const creditData = {
                accountsTransactionsAccNo: element.receiptVoucherDetailsCrAcNo,
                accountsTransactionsTransDate: this.f.receiptVoucherMasterVoucherDate.value,
                accountsTransactionsParticulars: element.receiptVoucherDetailsNarration,
                accountsTransactionsDebit: element.receiptVoucherDetailsCrAmount,
                accountsTransactionsFcDebit: element.receiptVoucherDetailsCrAmount,
                accountsTransactionsVoucherType: null,
                accountsTransactionsTstamp: new Date(),
                accountsTransactionsVoucherNo: element.receiptVoucherDetailsVoucherNo,
                accountsTransactionsDescription: element.receiptVoucherDetailsNarration,
                accountsTransactionsStatus: null,
                accountstransactionsDelStatus: false
            };
            RcptVoucher.accountsTransactions.push(creditData);
        });
        // console.log('RcptVoucher',RcptVoucher);
        if (this.btnFlag.save) {
            this.saveVoucher(RcptVoucher);
        }
        else {
            RcptVoucher.accountsTransactions.filter(x => x.accountsTransactionsDebit > 0)
                .forEach((element, index, arry) => {
                const acctTransEntry = this.savedReceiptVoucher.accountsTransactions
                    .filter(x => x.accountsTransactionsDebit > 0)
                    .find(kl => kl.accountsTransactionsVoucherNo === arry[index].accountsTransactionsVoucherNo
                    && kl.accountsTransactionsAccNo === arry[index].accountsTransactionsAccNo);
                if (acctTransEntry) {
                    arry[index].accountsTransactionsTransSno = acctTransEntry.accountsTransactionsTransSno;
                    arry[index].accountsTransactionsStatus = acctTransEntry.accountsTransactionsStatus;
                    arry[index].accountsTransactionsVoucherType = acctTransEntry.accountsTransactionsVoucherType;
                }
            });
            RcptVoucher.accountsTransactions.filter(x => x.accountsTransactionsCredit > 0)
                .forEach((element, index, arry) => {
                const acctTransEntry = this.savedReceiptVoucher.accountsTransactions
                    .filter(x => x.accountsTransactionsCredit > 0)
                    .find(kl => kl.accountsTransactionsVoucherNo === arry[index].accountsTransactionsVoucherNo
                    && kl.accountsTransactionsAccNo === arry[index].accountsTransactionsAccNo);
                if (acctTransEntry) {
                    arry[index].accountsTransactionsTransSno = acctTransEntry.accountsTransactionsTransSno;
                    arry[index].accountsTransactionsStatus = acctTransEntry.accountsTransactionsStatus;
                    arry[index].accountsTransactionsVoucherType = acctTransEntry.accountsTransactionsVoucherType;
                }
            });
            deletedAccountTrans = this.savedReceiptVoucher.accountsTransactions
                .filter((k) => {
                if (!(RcptVoucher.accountsTransactions.filter(x => x.accountsTransactionsTransSno > 0)
                    .some(l => l.accountsTransactionsTransSno
                    === k.accountsTransactionsTransSno))) {
                    k.accountstransactionsDelStatus = true;
                    return k;
                }
            });
            if (deletedAccountTrans.length > 0) {
                RcptVoucher.accountsTransactions.push(...deletedAccountTrans);
            }
            this.updateVoucher(RcptVoucher);
        }
    }
    saveVoucher(RcptVoucher) {
        this.confirmation.confirm({
            key: 'confirm-key',
            message: 'Do you want to save voucher?',
            accept: () => {
                this.accountapi.InsertReceiptVoucher(RcptVoucher).subscribe((data) => {
                    this.btnFlag = { edit: true, cancel: false, save: false, update: true, delete: true };
                    this.updateFormGrid(data.result);
                    this.messageService.add({ severity: 'success', summary: 'Alert', detail: 'Receipt Voucher Saved Succesfully' });
                }, (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Receipt Voucher Save Failed' });
                });
            }
        });
    }
    updateVoucher(RcptVoucher) {
        this.confirmation.confirm({
            key: 'confirm-key',
            message: 'Do you want to update existing voucher?',
            accept: () => {
                this.accountapi.UpdateReceiptVoucher(RcptVoucher).subscribe((data) => {
                    this.btnFlag = { edit: true, cancel: false, save: false, update: true, delete: true };
                    this.updateFormGrid(data.result);
                    this.messageService.add({ severity: 'success', summary: 'Alert', detail: 'Receipt Voucher Updated Succesfully' });
                }, (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Receipt Voucher Update Failed' });
                });
            }
        });
    }
    getAllAccountTransaction() {
        this.accountapi.GetAllAcountTransactions().subscribe((data) => {
            this.accountTransactionList = data.result;
        });
    }
    getAllReceiptVouchrs() {
        this.accountapi.GetReceiptVouchers().subscribe((data) => {
            this.receiptVoucherarry = data.result;
        });
    }
    getAccountName(acctnumber) {
        return this.accountArray
            .find(j => j.masterAccountsTableAccNo.trim() === acctnumber.trim()).masterAccountsTableAccName;
    }
    new() {
        this.receiptVoucherFormGroup.reset();
        this.receiptvoucherentry.data = [];
        this.receiptvoucherentry.readOnly = false;
        this.hotRegisterer.getInstance(this.hotid).updateSettings(this.receiptvoucherentry);
        this.accountTransactionList = [];
        this.receiptVoucherFormGroup.get('ReceiptVoucherMasterSNO').setValue(null);
        this.receiptVoucherFormGroup.get('ReceiptVoucherMasterDrAcNo').setValue(-1);
        this.receiptVoucherFormGroup.get('ReceiptVoucherMasterCurrencyId').setValue(-1);
        this.btnFlag = { edit: false, cancel: false, save: true, update: false, delete: false };
        this.index = 0;
    }
    showMaximizableDialog() {
        this.getAllReceiptVouchrs();
        this.displayMaximizable = true;
    }
    updateFormGrid(Rcpt) {
        this.search = null;
        this.receiptVoucherFormGroup.patchValue({
            ReceiptVoucherMasterVoucherNo: Rcpt.receiptVoucherMasterVoucherNo,
            ReceiptVoucherMasterVoucherDate: new Date(Rcpt.receiptVoucherMasterVoucherDate),
            ReceiptVoucherMasterRefNo: Rcpt.receiptVoucherMasterRefNo,
            ReceiptVoucherMasterDrAcNo: Rcpt.receiptVoucherMasterDrAcNo,
            ReceiptVoucherMasterDrAmount: Rcpt.receiptVoucherMasterDrAmount,
            ReceiptVoucherMasterNarration: Rcpt.receiptVoucherMasterNarration,
            ReceiptVoucherMasterCurrencyId: Rcpt.receiptVoucherMasterCurrencyId
        });
        this.accountTransactionList = Rcpt.accountsTransactions;
        // this.jobArray.find(j => j.jobMasterJobName.trim()  === k.jobname.trim()).jobMasterId,
        const gridData = Rcpt.receiptVoucherDetails.map(k => {
            let accountId = k.receiptVoucherDetailsCrAcNo != null ? this.acctArry.find(l => l.match(k.receiptVoucherDetailsCrAcNo)) : null;
            let jobId = (k.receiptVoucherDetailsJobId != null) ? this.jobArry.find(l => l.match(k.receiptVoucherDetailsJobId.toString())) : null;
            return {
                account: accountId,
                credit: k.receiptVoucherDetailsCrAmount,
                jobname: jobId,
                costcenter: null,
                narration: k.receiptVoucherDetailsNarration,
                id: k.receiptVoucherDetailsId
            };
        });
        this.receiptvoucherentry.data = gridData;
        this.hotRegisterer.getInstance(this.hotid).updateSettings({ data: gridData, readOnly: true });
    }
    handleChange(e) {
        this.index = e.index;
    }
    GetSavedReceiptDetails(id) {
        this.index = 0;
        this.accountapi.GetSavedReceiptDetails(id).subscribe((data) => {
            if (data !== null) {
                this.btnFlag = { edit: true, cancel: true, save: false, update: true, delete: true };
                this.accountTransactionList = data.result.accountsTransactions;
                this.updateFormGrid(data.result);
                this.savedReceiptVoucher = data.result;
                this.receiptVoucherFormGroup.disable();
            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Receipt voucher not found' });
            }
        }, (err) => {
            this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Failed' });
        });
    }
    delete() {
        this.confirmation.confirm({
            key: 'confirm-key',
            message: 'Do you want to delete voucher?',
            accept: () => {
                this.accountapi.DeleteReceiptVoucher(this.savedReceiptVoucher).subscribe((data) => {
                    this.messageService.add({ severity: 'success', summary: 'Alert', detail: 'Receipt Voucher Deleted Succesfully' });
                    this.new();
                }, (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Failed' });
                });
            }
        });
    }
    cancel() {
        this.GetSavedReceiptDetails(this.receiptVoucherFormGroup.getRawValue().ReceiptVoucherMasterVoucherNo);
    }
    edit() {
        this.hotRegisterer.getInstance(this.hotid).updateSettings({ readOnly: false });
    }
};
StockMovementComponent = __decorate([
    Component({
        selector: 'app-stock-movement',
        templateUrl: './stock-movement.component.html',
        styleUrls: ['./stock-movement.component.scss']
    })
], StockMovementComponent);
export { StockMovementComponent };
//# sourceMappingURL=stock-movement.component.js.map