import css from './css/style.css';
import { alert,error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
import '../node_modules/@pnotify/core/dist/PNotify.css';
import debounce from 'lodash.debounce';
import template from './template/template.hbs';
defaultModules.set(PNotifyMobile, {});
const input = document.getElementById('get-country');
const div = document.getElementById('country-box');
let name, norice;

input.addEventListener('input', debounce(() => {
    name = input.value;
    div.innerHTML = '';
    fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => {
        if(response.status == 200 ){
            return  response.json();
        }else if(!name){
        div.innerHTML = '';
        }else{
        norice = alert({title:'NOT Found', hide: true, delay: 1000})
    }
    })
    .then(data => {
        if(data.length > 10|| !data.length) {
            return error({text: 'Введите точный запрос'})
        }
        const country = template(data)
        div.insertAdjacentHTML('afterbegin', country);
    })
    .catch(err => {
        div.innerHTML = '<h1>LOL: 404</h1>';
        console.log(err);
    })
}, 2000))
