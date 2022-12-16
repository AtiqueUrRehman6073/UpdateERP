export function DropDownValidator(control) {
    return control.value < 0 || control.value == null ? { required: true } : null;
}
//# sourceMappingURL=customvalidtor.js.map