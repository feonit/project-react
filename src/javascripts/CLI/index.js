/** Command Line Interface */
import React from 'react'
import config from '../config'
import jquery from 'jquery'
import { Link } from 'react-router'
import * as ReactRouter from "react-router";
import getRandomSnils from './getRandomSnils'
import Raven from 'raven-js'
import PropTypes from 'prop-types';

window.React = React;
window.Raven = Raven;
window.jquery = window.$ = jquery;
window.getRandomSnils = getRandomSnils;
window.ReactRouter = ReactRouter;
window.config = config;
window.PropTypes = PropTypes;
