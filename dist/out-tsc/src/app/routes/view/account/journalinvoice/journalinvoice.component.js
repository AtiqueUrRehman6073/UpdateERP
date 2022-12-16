import { __decorate } from "tslib";
// import { JournalInvoiceMaster } from './../../../domain/JounralInvoiceMaster';
// import { JournalInvoiceDetails } from './../../../domain/JournalInvoiceDetails';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { defaults } from 'src/app/shared/service/settings';
import { HotTableRegisterer } from '@handsontable/angular';
import { DropDownValidator } from 'src/app/shared/validator/customvalidtor';
let JournalinvoiceComponent = class JournalinvoiceComponent {
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
        this.supplierArray = [];
        this.supplierArry = [];
        // costcenterArray: CostCenterMaster[] = [];
        // costcenterList: SelectItem[] = [];
        // costcenterArry: string[] = [];
        this.accountTransactionList = [];
        this.journalInvoicearry = [];
        this.hotRegisterer = new HotTableRegisterer();
        this.hotid = 'journalInvoiceEntry';
        this.licensekey = defaults.hotlicensekey;
    }
    ngOnInit() {
        this.cols = [
            { field: 'JournalInvoiceMasterNo', header: 'Invoice No' },
            { field: 'JournalInvoiceMasterDate', header: 'Date' },
            { field: 'JournalInvoiceMasterSupplierId: ', header: 'Supplier' },
            { field: 'JournalInvoiceMasterCurrencyId', header: 'Currency' },
            // { field: 'JournalInvoiceMasterDrAmount', header: 'Vchr.Debit' },
            // { field: 'JournalInvoiceMasterCrAmount', header: 'Vchr.Credit' },
            { field: 'JournalInvoiceMasterNarration', header: 'Particulars' }
            // { field: 'JournalInvoiceMasterDrAmount', header: 'Dtls.Debit' },
            // { field: 'JournalInvoiceMasterCrAmount', header: 'Dtls.Credit' }
        ];
        this.btnFlag = { edit: false, cancel: false, save: true, update: false, delete: false };
        this.initializeControls();
        this.journalInvoicerMasterFormGroup = this.fb.group({
            // receiptVoucherSno: [null],
            // receiptVoucherVoucherNo: [{ value: null, disabled: true }],
            // receiptVoucherDate: [null],
            // receiptVoucherVoucherRef: [''],
            // receiptVoucherCrAcNo: [-1],
            // receiptVoucherCrAmount: [null],
            // receiptVoucherDbAmount: [null],
            // receiptVoucherNarration: [''],
            // receiptVoucherCurreReceiptVoucherMasterVoucherDatencyId: [-1],
            journalInvoiceMasterID: [null],
            journalInvoiceMasterInvoiceNo: [{ value: null, disabled: true }],
            journalInvoiceMasterDate: [null, [Validators.required]],
            journalInvoiceMasterRefNo: ['', [Validators.required]],
            journalInvoiceMasterDbAmount: [null],
            journalInvoiceMasterSupplierId: [-1, [DropDownValidator]],
            journalInvoiceMasterNarration: ['', [Validators.required]],
            journalInvoiceMasterCurrencyId: [-1, [DropDownValidator]]
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
    getSupplier(id) {
        var _a;
        return (_a = this.supplierList) === null || _a === void 0 ? void 0 : _a.find(k => k.value === id).label;
    }
    get f() {
        return this.journalInvoicerMasterFormGroup.controls;
    }
    initializeControls() {
        this.getAllJobs();
        //this.getAllCostCenter();
        this.getAllAccount();
        this.getAllCurrency();
        this.getAllReceiptVouchrs();
        this.getAllSupplier();
        //this.getSupplierAcno();
        // this.getAllAccountTransaction();
        this.journalinvoiceentry = {
            rowHeaders: true,
            viewportColumnRenderingOffset: 27,
            viewportRowRenderingOffset: 'auto',
            colWidths: 150,
            minRows: 3,
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
                columns: [5],
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
                    data: 'refno',
                    type: 'text',
                },
                {
                    data: 'amount',
                    type: 'numeric'
                },
                {
                    data: 'remarks',
                    type: 'text',
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
                    data: 'id',
                    type: 'numeric'
                }
            ],
            colHeaders: [
                this.translate.instant('Account'),
                this.translate.instant('Ref.No'),
                this.translate.instant('Amount'),
                this.translate.instant('Remarks'),
                this.translate.instant('Job Name'),
                this.translate.instant('Id')
            ],
            manualRowMove: true,
            manualColumnMove: true,
            contextMenu: true,
            filters: true,
            dropdownMenu: true,
        };
        this.journalinvoiceentry.beforeChangeRender = (change, source) => {
            this.ColumnSum();
        };
        this.journalinvoiceentry.afterRemoveRow = (index, amount) => {
            // console.log('beforeRemove: index: %d, amount: %d', index, amount);
            // console.log(this.hotRegisterer.getInstance(this.hotid).getDataAtRow(index));
            this.ColumnSum();
        };
        this.journalinvoiceentry.afterValidate = (isValid, value, row, prop) => {
            if (!isValid) {
                this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Invalid entry' });
            }
        };
    }
    ColumnSum() {
        if (this.journalinvoiceentry.data.length > 0) {
            const sum1 = this.journalinvoiceentry.data.filter(item => item.hasOwnProperty('amount'))
                .reduce((sum, current) => sum + current.amount, 0);
            this.journalInvoicerMasterFormGroup.controls.journalInvoiceMasterDbAmount.setValue(sum1);
        }
    }
    getAllCurrency() {
        this.masterapi.GetAllCurrency().subscribe(k => {
            this.currencyList = k.map((kl) => ({ label: kl.currencyMasterCurrencyName, value: kl.currencyMasterCurrencyId }));
            this.currencyList.unshift({ label: '--Select--', value: -1 });
            this.currArry = k.map(ar => ar.currencyMasterCurrencyName.trim());
        });
    }
    getAllSupplier() {
        this.masterapi.GetAllSupplier().subscribe(k => {
            this.supplierList = k.map((kl) => ({ label: kl.suppliersMasterSupplierName, value: kl.suppliersMasterSupplierId }));
            this.supplierList.unshift({ label: '--Select--', value: -1 });
            this.supplierArry = k.map(ar => ar.suppliersMasterSupplierName.trim());
        });
    }
    getAllJobs() {
        this.masterapi.GetAllJob().subscribe(k => {
            this.jobArray = k;
            this.jobList = k.map((kl) => ({ label: kl.jobMasterJobName, value: kl.jobMasterId }));
            this.jobArry = k.map(ar => ar.jobMasterJobName.trim());
        });
    }
    onSupplierChange(event) {
        console.log(event);
        this.supplierArray.filter(k => k.suppliersMasterSupplierId == Number(event.value)).map(item => ({
            SupplierRefAcno: item.suppliersMasterSupplierReffAcNo,
        }));
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
    saveJournalVoucher() {
        let deletedGridData = [];
        let deletedAccountTrans = [];
        const savedData = this.journalinvoiceentry.data.filter(k => k.hasOwnProperty('account'));
        const JournInvoice = this.journalInvoicerMasterFormGroup.value;
        JournInvoice.journalInvoiceMasterNo = this.journalInvoicerMasterFormGroup.getRawValue().journalInvoiceMasterInvoiceNo;
        JournInvoice.journalInvoiceMasterDate = this.journalInvoicerMasterFormGroup.getRawValue().journalInvoiceMasterDate;
        JournInvoice.journalInvoiceMasterRefNo = this.journalInvoicerMasterFormGroup.getRawValue().journalInvoiceMasterRefNo;
        JournInvoice.journalInvoiceMasterSupplierId = this.journalInvoicerMasterFormGroup.getRawValue().journalInvoiceMasterSupplierId;
        JournInvoice.journalInvoiceMasterNarration = this.journalInvoicerMasterFormGroup.getRawValue().journalInvoiceMasterNarration;
        JournInvoice.journalInvoiceMasterCurrencyId = this.journalInvoicerMasterFormGroup.getRawValue().journalInvoiceMastercourrencyID;
        JournInvoice.JournalInvoiceDetails = savedData.filter(k => k.account != null
            && k.amount != null)
            .map((k) => {
            return {
                JournalInvoiceDetails: k.id != null ? k.id : 0,
                journalInvoiceDetailsNo: this.journalInvoicerMasterFormGroup.getRawValue().journalInvoiceMasterNo,
                journalInvoiceDetailsAccNo: k.account.trim().split('|')[1],
                journalInvoiceDetailsRefNo: null,
                journalInvoiceDetailsAmount: k.amount,
                journalInvoiceDetailsRemarks: k.remarks,
                journalInvoiceDetailsSlNo: 0,
                journalInvoiceDetailsJobId: k.jobname != null && k.jobname !== '' ? this.jobArray
                    .find(j => j.jobMasterJobName.trim() === k.jobname.trim()).jobMasterId : null,
                journalInvoiceDetailsIsEdit: false,
                journalInvoiceDetailsDelStatus: false
            };
        });
        if (this.btnFlag.update) {
            deletedGridData = this.savedJournalInvoice.JournalInvoiceDetails.filter((k) => {
                if (!(JournInvoice.JournalInvoiceDetails
                    .some(l => l.journalInvoiceDetailsId === k.journalInvoiceDetailsId))) {
                    k.journalInvoiceDetailsDelStatus = true;
                    return k;
                }
            });
            if (deletedGridData.length > 0) {
                JournInvoice.JournalInvoiceDetails.push(...deletedGridData);
            }
        }
        JournInvoice.accountsTransactions = [];
        const creditData = {
            accountsTransactionsAccNo: this.SupplierRefAcno.toString(),
            accountsTransactionsTransDate: this.f.journalInvoiceMasterDate.value,
            accountsTransactionsParticulars: this.f.journalInvoiceMasterNarration.value,
            accountsTransactionsCredit: this.f.journalInvoiceMasterDbAmount.value,
            accountsTransactionsFcCredit: this.f.journalInvoiceMasterDbAmount.value,
            accountsTransactionsVoucherType: null,
            accountsTransactionsTstamp: new Date(),
            accountsTransactionsVoucherNo: this.journalInvoicerMasterFormGroup.getRawValue().journalInvoiceMasterNo,
            accountsTransactionsDescription: this.f.ReceiptVoucherMasterNarration.value,
            accountsTransactionsStatus: null,
            accountstransactionsDelStatus: false
        };
        JournInvoice.accountsTransactions.push(creditData);
        // console.log('RcpVcher Details',JournInvoice.receiptVoucherDetails)
        // console.log('JournInvoice-receiptVoucherDetails',JournInvoice.receiptVoucherDetails.
        // filter(x => x.ReceiptVoucherDetailsDelStatus === false));
        JournInvoice.JournalInvoiceDetails.filter(x => x.journalInvoiceDetailsDelStatus === false)
            .forEach(element => {
            const debitData = {
                accountsTransactionsAccNo: element.journalInvoiceDetailsAccNo,
                accountsTransactionsTransDate: this.f.journalInvoiceMasterDate.value,
                accountsTransactionsParticulars: element.journalInvoiceDetailsRemarks,
                accountsTransactionsDebit: element.journalInvoiceDetailsAmount,
                accountsTransactionsFcDebit: element.journalInvoiceDetailsAmount,
                accountsTransactionsVoucherType: null,
                accountsTransactionsTstamp: new Date(),
                accountsTransactionsVoucherNo: this.f.journalInvoiceMasterNo.value,
                accountsTransactionsDescription: element.journalInvoiceDetailsRemarks,
                accountsTransactionsStatus: null,
                accountstransactionsDelStatus: false
            };
            JournInvoice.accountsTransactions.push(creditData);
        });
        // console.log('JournInvoice',JournInvoice);
        if (this.btnFlag.save) {
            this.saveVoucher(JournInvoice);
        }
        else {
            JournInvoice.accountsTransactions.filter(x => x.accountsTransactionsDebit > 0)
                .forEach((element, index, arry) => {
                const acctTransEntry = this.savedJournalInvoice.accountsTransactions
                    .filter(x => x.accountsTransactionsDebit > 0)
                    .find(kl => kl.accountsTransactionsVoucherNo === arry[index].accountsTransactionsVoucherNo
                    && kl.accountsTransactionsAccNo === arry[index].accountsTransactionsAccNo);
                if (acctTransEntry) {
                    arry[index].accountsTransactionsTransSno = acctTransEntry.accountsTransactionsTransSno;
                    arry[index].accountsTransactionsStatus = acctTransEntry.accountsTransactionsStatus;
                    arry[index].accountsTransactionsVoucherType = acctTransEntry.accountsTransactionsVoucherType;
                }
            });
            JournInvoice.accountsTransactions.filter(x => x.accountsTransactionsCredit > 0)
                .forEach((element, index, arry) => {
                const acctTransEntry = this.savedJournalInvoice.accountsTransactions
                    .filter(x => x.accountsTransactionsCredit > 0)
                    .find(kl => kl.accountsTransactionsVoucherNo === arry[index].accountsTransactionsVoucherNo
                    && kl.accountsTransactionsAccNo === arry[index].accountsTransactionsAccNo);
                if (acctTransEntry) {
                    arry[index].accountsTransactionsTransSno = acctTransEntry.accountsTransactionsTransSno;
                    arry[index].accountsTransactionsStatus = acctTransEntry.accountsTransactionsStatus;
                    arry[index].accountsTransactionsVoucherType = acctTransEntry.accountsTransactionsVoucherType;
                }
            });
            deletedAccountTrans = this.savedJournalInvoice.accountsTransactions
                .filter((k) => {
                if (!(JournInvoice.accountsTransactions.filter(x => x.accountsTransactionsTransSno > 0)
                    .some(l => l.accountsTransactionsTransSno
                    === k.accountsTransactionsTransSno))) {
                    k.accountstransactionsDelStatus = true;
                    return k;
                }
            });
            if (deletedAccountTrans.length > 0) {
                JournInvoice.accountsTransactions.push(...deletedAccountTrans);
            }
            this.updateVoucher(JournInvoice);
        }
    }
    saveVoucher(JournInvoice) {
        this.confirmation.confirm({
            key: 'confirm-key',
            message: 'Do you want to save Journal Invoice?',
            accept: () => {
                this.accountapi.InsertReceiptVoucher(JournInvoice).subscribe((data) => {
                    this.btnFlag = { edit: true, cancel: false, save: false, update: true, delete: true };
                    this.updateFormGrid(data.result);
                    this.messageService.add({ severity: 'success', summary: 'Alert', detail: 'Journal Invoice Saved Succesfully' });
                }, (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Journal Invoice Save Failed' });
                });
            }
        });
    }
    updateVoucher(JournInvoice) {
        this.confirmation.confirm({
            key: 'confirm-key',
            message: 'Do you want to update existing Invoice?',
            accept: () => {
                this.accountapi.UpdatePaymentVoucher(JournInvoice).subscribe((data) => {
                    this.btnFlag = { edit: true, cancel: false, save: false, update: true, delete: true };
                    this.updateFormGrid(data.result);
                    this.messageService.add({ severity: 'success', summary: 'Alert', detail: 'Journal Invoice Updated Succesfully' });
                }, (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Journal Invoice Update Failed' });
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
            this.journalInvoicearry = data.result;
        });
    }
    getAccountName(acctnumber) {
        return this.accountArray
            .find(j => j.masterAccountsTableAccNo.trim() === acctnumber.trim()).masterAccountsTableAccName;
    }
    new() {
        this.journalInvoicerMasterFormGroup.reset();
        this.journalinvoiceentry.data = [];
        this.journalinvoiceentry.readOnly = false;
        this.hotRegisterer.getInstance(this.hotid).updateSettings(this.journalinvoiceentry);
        this.accountTransactionList = [];
        this.journalInvoicerMasterFormGroup.get('JournalInvoiceMasterInvoiceNo').setValue(null);
        this.journalInvoicerMasterFormGroup.get('JournalInvoiceMasterSupplierId').setValue(-1);
        this.journalInvoicerMasterFormGroup.get('JournalInvoiceMasterCurrencyId').setValue(-1);
        this.btnFlag = { edit: false, cancel: false, save: true, update: false, delete: false };
        this.index = 0;
    }
    showMaximizableDialog() {
        this.getAllReceiptVouchrs();
        this.displayMaximizable = true;
    }
    updateFormGrid(Journ) {
        this.search = null;
        this.journalInvoicerMasterFormGroup.patchValue({
            JournalInvoiceMasterInvoiceNo: Journ.journalInvoiceMasterNo,
            JournalInvoiceMasterDate: Journ.journalInvoiceMasterDate,
            JournalInvoiceMasterRefNo: Journ.journalInvoiceMasterRefNo,
            JournalInvoiceMasterSupplierId: Journ.journalInvoiceMasterSupplierId,
            JournalInvoiceMasterNarration: Journ.journalInvoiceMasterNarration,
            JournalInvoiceMasterCurrencyId: Journ.journalInvoiceMasterCurrencyId
        });
        this.accountTransactionList = Journ.accountsTransactions;
        // this.jobArray.find(j => j.jobMasterJobName.trim()  === k.jobname.trim()).jobMasterId,
        const gridData = Journ.JournalInvoiceDetails.map(k => {
            let accountId = k.journalInvoiceDetailsAccNo != null ? this.acctArry.find(l => l.match(k.journalInvoiceDetailsAccNo)) : null;
            let jobId = (k.journalInvoiceDetailsJobId != null) ? this.jobArry.find(l => l.match(k.journalInvoiceDetailsJobId.toString())) : null;
            return {
                account: accountId,
                amount: k.journalInvoiceDetailsAmount,
                jobname: jobId,
                costcenter: null,
                remarks: k.journalInvoiceDetailsRemarks,
                id: k.journalInvoiceDetailsId
            };
        });
        this.journalinvoiceentry.data = gridData;
        this.hotRegisterer.getInstance(this.hotid).updateSettings({ data: gridData, readOnly: true });
    }
    handleChange(e) {
        this.index = e.index;
    }
    GetSavedJournalDetails(id) {
        this.index = 0;
        this.accountapi.GetSavedReceiptDetails(id).subscribe((data) => {
            if (data !== null) {
                this.btnFlag = { edit: true, cancel: true, save: false, update: true, delete: true };
                this.accountTransactionList = data.result.accountsTransactions;
                this.updateFormGrid(data.result);
                this.savedJournalInvoice = data.result;
                this.journalInvoicerMasterFormGroup.disable();
            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Journal Invoice  not found' });
            }
        }, (err) => {
            this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Failed' });
        });
    }
    delete() {
        this.confirmation.confirm({
            key: 'confirm-key',
            message: 'Do you want to delete Journal Invoice?',
            accept: () => {
                this.accountapi.DeleteReceiptVoucher(this.savedJournalInvoice).subscribe((data) => {
                    this.messageService.add({ severity: 'success', summary: 'Alert', detail: 'Journal Invoice  Deleted Succesfully' });
                    this.new();
                }, (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Failed' });
                });
            }
        });
    }
    cancel() {
        this.GetSavedJournalDetails(this.journalInvoicerMasterFormGroup.getRawValue().journalInvoiceMasterNo);
    }
    edit() {
        this.hotRegisterer.getInstance(this.hotid).updateSettings({ readOnly: false });
    }
};
JournalinvoiceComponent = __decorate([
    Component({
        selector: 'app-journalinvoice',
        templateUrl: './journalinvoice.component.html',
        styleUrls: ['./journalinvoice.component.scss']
    })
], JournalinvoiceComponent);
export { JournalinvoiceComponent };
//# sourceMappingURL=journalinvoice.component.js.map