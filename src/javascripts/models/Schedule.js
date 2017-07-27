import React from 'react'
import { ReceptionTypes } from './Reception'

export default React.PropTypes.shape({
    "type": React.PropTypes.oneOf([ReceptionTypes]),
    "medicId": React.PropTypes.number,
    "list": React.PropTypes.arrayOf(React.PropTypes.shape({
        "date": React.PropTypes.string,
        "freeTime": React.PropTypes.arrayOf(React.PropTypes.string)
    }))
})
