import React from 'react'
import ReactRedux, { connect } from 'react-redux'
import LoadingSpinner from './LoadingSpinner'

export default connect( function (state) {
    return {
        isVisible: state.user.loadProcessIsBusy
    }
} )(LoadingSpinner);