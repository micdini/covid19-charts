// store/index.js
import $ from "jquery";
import Vue from "vue";
import Vuex from "vuex";
import * as Dataset from "./dataset";

Vue.use(Vuex);



function makeItalia() {
    return {
        ...Dataset.emptyObj, serie: new Dataset.Italia()
    };
}
function makeRegioni() {
    var reg = [];
    for (var i = 0; i < 21; i++) {
        reg.push(new Dataset.Regione(i));
    }
    return {
        ...Dataset.emptyObj, serie: reg
    }
}

function makeProvince() {
    var prov = [];
    for (var i = 0; i < 21; i++) {
        prov.push(new Dataset.RegioneProvince(i));
    }
    return {
        ...Dataset.emptyObj, serie: prov
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
        updateChart: false
    },
    getters: {
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
                $.each(state.repo.regioni.serie, function (i, e) {
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
                $.each(state.repo.province.serie, function (i, e) {
                    $.each(e.province, function (j, f) {
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