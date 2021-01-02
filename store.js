// store/index.js
import $ from "jquery";
import Vue from "vue";
import Vuex from "vuex";
import * as Dataset from "./dataset";

Vue.use(Vuex);



function makeItalia() {
    return {
        ...Dataset.emptyObj,
        serie: new Dataset.Italia()
    };
}

function makeRegioni() {
    var reg = [];
    for (var i = 0; i < 23; i++) {
        reg.push(new Dataset.Regione(i));
    }
    return {
        ...Dataset.emptyObj,
        serie: reg
    }
}

function makeProvince() {
    var prov = [];
    for (var i = 0; i < 23; i++) {
        prov.push(new Dataset.RegioneProvince(i));
    }
    return {
        ...Dataset.emptyObj,
        serie: prov
    }
}

export default new Vuex.Store({
    state: {
        repo: {
            'italia': makeItalia(),
            'regioni': makeRegioni(),
            'province': makeProvince(),
            'home': Dataset.emptyObj
        },
        active: "home",
        updateChart: false,
        downloading: {
            state: true,
            'italia': 0,
            'regioni': 0,
            'province': 0
        }
    },
    getters: {
        isDownloading: state => { return state.downloading.state; },
        downloadProgress: state => { return state.downloading; },
        getPage: state => { return state.active; },
        serie: state => { return state.repo[state.active].serie; },
        serieData: state => {
            if (state.active === 'province') {
                var myArray = [];
                state.repo[state.active].serie.forEach(reg => {
                    reg.province.forEach(prov => {
                        if (prov.show)
                            myArray.push(prov);
                    });
                });
                return myArray;
            } else
                return state.repo[state.active].serie;
        },
        updateChart: state => { return state.updateChart; },
        currentRepository: state => { return state.repo[state.active]; },
        repositories: state => { return state.repo; },
        getNumberOfRegions: state => {
            var count = 0;
            try {
                $.each(state.repo.regioni.serie, function(i, e) {
                    if (e.show)
                        count++;
                });
            } catch (e) {
                count = 0;
            }
            return count;
        },
        getNumberOfProvince: state => {
            var count = 0;
            try {
                $.each(state.repo.province.serie, function(i, e) {
                    $.each(e.province, function(j, f) {
                        if (f.show)
                            count++;
                    });
                });
            } catch (e) {
                count = 0;
            }
            return count;
        }
    },
    mutations: {
        showPage(state, payload) {
            var target = "home";
            switch (payload) {
                case "italia":
                    target = "italia"
                    break;
                case "regioni":
                    target = "regioni"
                    break;
                case "province":
                    target = "province"
                    break;
                case "report":
                    target = "report";
                case "home":
                default:
            }
            state.active = target;
        },
        toggleRegione(state, code) {
            var obj = state.repo.regioni.serie[code];
            Vue.set(obj, 'show', !obj.show);
            Vue.set(state, 'updateChart', true);
        },
        notifyChartUpdated(state) {
            Vue.set(state, 'updateChart', false);
        },
        notifyDownloadProgress(state, payload) {
            payload.what = payload.what || '';
            payload.value = payload.value || 0;
            payload.value = Math.floor(payload.value * 100);
            Vue.set(state.downloading, payload.what, payload.value);
            if (payload.bytes > 0)
                Vue.set(state.downloading, (payload.what + "kb"), Math.floor(payload.bytes / 1024));
        },
        notifyDownloadFinished(state) {
            Vue.set(state.downloading, 'state', false);
        },
        toggleProvincia(state, arg) {
            if (arg !== undefined) {
                var provinciaIndex = 0;
                var obj = state.repo.province.serie[arg.regione].province;
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].codice === arg.provincia)
                        provinciaIndex = i;
                }
                obj = obj[provinciaIndex];
                Vue.set(obj, 'show', !obj.show);
            }
            Vue.set(state, 'updateChart', true);
        },
        setData(state, payload) {
            //state.repo[payload.id].raw = payload.raw;
            var d = state.repo[payload.id];
            //console.log(payload.raw.length);
            for (var i = 0; i < payload.raw.length; i++) {
                Dataset.addElement(payload.id, d, payload.raw[i]);
            }
            Dataset.computeDifference(payload.id, d);
            state.repo[payload.id].download = true;

        }
    },
    actions: {}
});