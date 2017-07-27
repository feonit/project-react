import PropTypes from 'prop-types';

function getSchema(){
    var gallery;
    var docs;
    return {
        "id":           PropTypes && PropTypes.number.isRequired || 1,
        "name":         PropTypes && PropTypes.string.isRequired || "Костромская поликлиника №1",
        "shortName":    PropTypes && PropTypes.string.isRequired || "№1",
        "location":     PropTypes && PropTypes.string.isRequired || "Котовского 23, налево, направо, на лифте в бок",
        "promoLink":    PropTypes && PropTypes.string.isRequired || "//download/document/ff30ba6f55b780f7dff89c10e9095b1236783ab2",
        "info":         PropTypes && PropTypes.string.isRequired || "Первая в своей истории",
        "phones":       PropTypes && PropTypes.arrayOf(PropTypes.string).isRequired || [ "79091234567890" ],
        "email":        PropTypes && PropTypes.string.isRequired || "mail@sovet.ru",

        "gallery":      (gallery = {
            "link":     PropTypes && PropTypes.string.isRequired || "//download/document/ff30ba6f55b780f7dff89c10e9095b1236783ab2",
            "name":     PropTypes && PropTypes.string.isRequired || "Общий вид",
            "info":     PropTypes && PropTypes.string.isRequired || "Ремонт был сделан в таком-то году"
        }) && ((PropTypes && PropTypes.arrayOf(PropTypes.shape(gallery))) || gallery ),

        "docs":         (docs = {
            "link":     PropTypes && PropTypes.string.isRequired || "//download/document/ff30ba6f55b780f7dff89c10e9095b1236783ab2",
            "name":     PropTypes && PropTypes.string.isRequired || "Общий вид"
        }) && ((PropTypes.arrayOf(PropTypes.shape(docs))) || docs )
    }
}

export const ClinicDefault = getSchema()
export const ClinicSchema = getSchema(PropTypes)

