
//import dependencies (js)
import $ from 'jquery';
import popper from 'popper.js';
import "bootstrap";
import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);

import store from './store';
import { version } from "./package.json";

//import dependencies (css)
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

//urls of covid-19 data from github (protezione civile)
const REPOSITORY = {
    italia: 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json',
    regioni: 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json',
    province: 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json'
}

import App from './App';

function download(what) {
    $.get(REPOSITORY[what], function (data) {
        try {
            var json = JSON.parse(data);
            store.commit('setData', { id: what, raw: json });
        } catch (ex) {
            console.warn('Error parsing json data from repository');
        }
    });
}

//start vue
window.Vue = new Vue({
    el: '#main-container',
    store,
    render: h => h(App)
});

window.onload = function () {
    //start data download
    download('italia');
    download('regioni');
    download('province');
}