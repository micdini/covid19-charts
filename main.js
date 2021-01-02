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
const GITHUB_REPOSITORY_URL = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/";

const REPOSITORY = {
    italia: { url: 'dpc-covid19-ita-andamento-nazionale.json', factor: 6 },
    regioni: { url: 'dpc-covid19-ita-regioni.json', factor: 5 },
    province: { url: 'dpc-covid19-ita-province.json', factor: 5 }
}

import App from './App';

var downloadCount = 0;

function handleEvent(e) {
    log.textContent = log.textContent + `${e.type}: ${e.loaded} bytes transferred\n`;
}

function download(what) {

    $.ajax({
        xhr: function() {
            var xhr = new window.XMLHttpRequest();

            xhr.addEventListener("progress", function(evt) {
                var total = evt.total;
                if (!evt.lengthComputable) {
                    var header = xhr.getResponseHeader("Content-Length");
                    total = parseInt(header) * REPOSITORY[what].factor;
                }
                var percentComplete = evt.loaded / total;
                store.commit('notifyDownloadProgress', { 'what': what, value: percentComplete, bytes: evt.loaded });
            }, false);
            return xhr;
        },
        type: 'GET',
        url: GITHUB_REPOSITORY_URL + REPOSITORY[what].url,
        async: true,
        success: function(data) {
            try {
                var json = JSON.parse(data);
                store.commit('setData', { id: what, raw: json });
                store.commit('notifyDownloadProgress', { 'what': what, value: 100, bytes: -1 });
                downloadCount++;

                if (downloadCount > 2)
                    store.commit('notifyDownloadFinished');
            } catch (ex) {
                console.warn('Error parsing json data from repository ' + what + ': ' + ex);
            }
        }
    });
}

//start vue
window.Vue = new Vue({
    el: '#main-container',
    store,
    render: h => h(App)
});

window.onload = function() {
    //start data download
    download('italia');
    download('regioni');
    download('province');
}