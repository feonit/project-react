import fetch from 'whatwg-fetch'
import assign from './2015/assign'
import find from './2015/Array.prototype.find'

if (!fetch){
    if (fetch.polyfill){
        console.warn('fetch polyfill')
    }
}