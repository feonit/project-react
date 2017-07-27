import React from 'react'
import PropTypes from 'prop-types'

export const HOME_TYPE = 'HOME'
export const CLINIC_TYPE = 'CLINIC'
export const UNCONFIRMED_STATUS = 'UNCONFIRMED'
export const PLANNED_STATUS = 'PLANNED'
export const FINISHED_STATUS = 'FINISHED'
export const CANCELLED_STATUS = 'CANCELLED'

export let ReceptionStatusTypes = ['UNCONFIRMED', 'PLANNED', 'FINISHED', 'CANCELLED']
export let ReceptionTypes = [CLINIC_TYPE, HOME_TYPE]

export default class Reception{
    constructor({ id, clinicId, medicId, patientId, conclusion, status, type, dateTime} = data){
        this.id = id;
        this.clinicId = clinicId;
        this.medicId = medicId;
        this.patientId = patientId;
        this.conclusion = conclusion;
        this.status = status;
        this.type = type;
        this.dateTime = dateTime;

        PropTypes.validateWithErrors({
            "id": PropTypes.number.isRequired,
            "clinicId": PropTypes.number.isRequired,
            "medicId": PropTypes.number.isRequired,
            "patientId": PropTypes.number.isRequired,
            "conclusion": PropTypes.string, // или null
            "status": PropTypes.string.isRequired,
            "type": PropTypes.string.isRequired,
            "dateTime": PropTypes.string.isRequired
        }, arguments[0], this.constructor.name);
    }
}