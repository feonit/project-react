import PropTypes from 'prop-types';

function getSchema(PropTypes){
    var education;

    return {
        "id":               (PropTypes && PropTypes.number.isRequired) || 1,
        "surname":          (PropTypes && PropTypes.string.isRequired) || "Петров",
        "givenName":        (PropTypes && PropTypes.string.isRequired) || "Иван",
        "patronymic":       (PropTypes && PropTypes.string.isRequired) || "Александрович",
        "info":             (PropTypes && PropTypes.string.isRequired) || "Работает в ГКБ с 2012 года. За этот срок получил признание и уважение.",
        "specialityId":     (PropTypes && PropTypes.number.isRequired) || 24,
        "avatarLink":       (PropTypes && PropTypes.string.isRequired) || "//download/document/ff30ba6f55b780f7dff89c10e9095b1236783ab2",
        "photoLink":        (PropTypes && PropTypes.string.isRequired) || "//download/document/ff30ba6f55b780f7dff89c10e9095b1236783ab2",
        "clinicId":         (PropTypes && PropTypes.number.isRequired) || 1,
        "workSince":        (PropTypes && PropTypes.string.isRequired) || "2009-08-06",
        
        "education":        (education = {
            "type":         (PropTypes && PropTypes.string.isRequired) || "Дополнительное профессиональное образование",
            "institution":  (PropTypes && PropTypes.string.isRequired) || "Северо-Западный государственный университет имени И.И.Мечникова",
            "speciality":   (PropTypes && PropTypes.string.isRequired) || "Кардиология",
            "year":         (PropTypes && PropTypes.number.isRequired) || 2014,
            "documentLink": (PropTypes && PropTypes.string.isRequired) || "//download/document/ff30ba6f55b780f7dff89c10e9095b1236783ab2"
        }) && ((PropTypes && PropTypes.arrayOf(PropTypes.shape(education))) || education )
    }
}

export const MedicSchema = getSchema(PropTypes);
export const MedicDefault = getSchema();
