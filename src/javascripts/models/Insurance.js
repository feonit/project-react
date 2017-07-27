import React from 'react'
import {InsuranceTypes} from '../../models/Patient'

export default React.PropTypes.shape({
    "regionId": React.PropTypes.number,
    "clinicId": React.PropTypes.number,
    "series": React.PropTypes.string,
    "dateEnd": React.PropTypes.number,
    "type": React.PropTypes.oneOf(InsuranceTypes)
})