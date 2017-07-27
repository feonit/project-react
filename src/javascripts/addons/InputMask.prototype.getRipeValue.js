import InputMask from 'inputmask-core'

InputMask.prototype.getRipeValue = function getRipeValue() {
    var ripeValue = []
    var rawValue = this.getRawValue()
    for (var i = 0; i < rawValue.length; i++) {
        if (rawValue[i] !== this.placeholderChar) {
            ripeValue.push(rawValue[i])
        }
    }
    return ripeValue.join('')
}