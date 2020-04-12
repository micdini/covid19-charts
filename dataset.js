import $ from "jquery";

var emptyObj = {
    raw: {},
    serie: [],
    download: false
};

var colors = [
    'rgba(2,2,2,0.7)',
    'rgba(100, 30, 22, 0.7)',
    'rgba(120, 40, 31, 0.7)',
    'rgba(81, 46, 95, 0.7)',
    'rgba(74, 35, 90, 0.7)',
    'rgba(26, 82, 118, 0.7)',
    'rgba(23, 165, 114, 0.7)',
    'rgba(14, 98, 81, 0.7)',
    'rgba(11, 82, 59, 0.7)',
    'rgba(20, 90, 20, 0.7)',
    'rgba(24, 106, 59, 0.7)',
    'rgba(241, 196, 15, 0.7)',
    'rgba(185, 119, 14, 0.7)',
    'rgba(211, 84, 0, 0.7)',
    'rgba(125, 125, 125, 0.7)',
    'rgba(98, 101, 102, 0.7)',
    'rgba(77, 86, 86, 0.7)',
    'rgba(46, 204, 113, 0.7)',
    'rgba(66, 73, 73, 0.7)',
    'rgba(47, 38, 52, 0.7)',
    'rgba(22, 30, 32, 0.7)',
];

function Italia() {

    this.casi = { label: 'Totale casi', data: [], borderColor: 'rgba(127, 0, 0, 0.3)', fill: false, yAxisID: 'sx' };
    this.positivi = { label: 'Attualmente positivi', data: [], borderColor: 'rgba(255, 0, 0, 0.3)', fill: false, yAxisID: 'sx' };
    this.decessi = { label: 'Totale decessi', data: [], borderColor: 'rgba(0, 0, 127, 0.3)', fill: false, yAxisID: 'sx' };
    this.guariti = { label: 'Totale guariti', data: [], borderColor: 'rgba(0, 127, 0, 0.3)', fill: false, yAxisID: 'sx' };
    this.nuoviCasi = { label: 'Nuovi casi', data: [], backgroundColor: 'rgba(127, 0, 0, 0.7)', type: 'bar', yAxisID: 'dx' };
    this.nuoviPositivi = { label: 'Nuovi positivi', data: [], backgroundColor: 'rgba(255, 0, 0, 0.7)', type: 'bar', yAxisID: 'dx' };
    this.nuoviDecessi = { label: 'Nuovi decessi', data: [], backgroundColor: 'rgba(0, 0, 127, 0.7)', type: 'bar', yAxisID: 'dx' };
    this.nuoviGuariti = { label: 'Nuovi guariti', data: [], backgroundColor: 'rgba(0, 127, 0, 0.7)', type: 'bar', yAxisID: 'dx' };
    this.ricoveratiICU = { label: 'Terapia Intensiva', data: [], borderColor: 'rgba(0, 127, 127, 0.3)', fill: false, yAxisID: 'sx' };
    this.nuoviRicoveratiICU = { label: 'Nuovi Terapia Intensiva', data: [], backgroundColor: 'rgba(0, 127, 127, 0.7)', type: 'bar', yAxisID: 'dx' };
    this.ricoverati = { label: 'Ricoverati', data: [], borderColor: 'rgba(127, 0, 127, 0.3)', fill: false, yAxisID: 'sx' };
    this.nuoviRicoverati = { label: 'Nuovi Ricoverati', data: [], backgroundColor: 'rgba(127, 0, 127, 0.7)', type: 'bar', yAxisID: 'dx' };
    this.tamponi = { label: 'Tamponi', data: [], borderColor: 'rgba(0, 0, 0, 0.3)', fill: false, yAxisID: 'sx' };
    this.nuoviTamponi = { label: 'Nuovi Tamponi', data: [], backgroundColor: 'rgba(0, 0, 0, 0.7)', type: 'bar', yAxisID: 'dx' };
    this.nuoviCasiPercentuali = { label: 'Aumento Casi %', data: [], borderColor: 'rgba(255,0,0,1)', fill: false, yAxisID: 'sx' };
    this.nuoviPositiviPercentuali = { label: 'Aumento Positivi %', data: [], borderColor: 'rgba(20,192,0,1)', fill: false, yAxisID: 'sx' };
    this.nuoviRicoveratiPercentuali = { label: 'Aumento Ricoverati %', data: [], borderColor: 'rgba(0,0,192,1)', fill: false, yAxisID: 'sx' };
    this.nuoviRicoveratiICUPercentuali = { label: 'Aumento Terapia Intensiva %', data: [], borderColor: 'rgba(192,192,0,1)', fill: false, yAxisID: 'sx' };
}

function Regione(code) {
    this.codice = code;
    this.name = 'unset';
    this.show = false;
    this.casi = { label: 'Totale casi', data: [], borderColor: 'rgba(127, 0, 0, 0.3)', fill: false, yAxisID: 'sx' };
    //this.positivi = { label: 'Attualmente positivi', data: [], borderColor: 'rgba(255, 0, 0, 0.3)', fill: false, yAxisID: 'sx' };
    //this.decessi = { label: 'Totale decessi', data: [], borderColor: 'rgba(0, 0, 127, 0.3)', fill: false, yAxisID: 'sx' };
    //this.guariti = { label: 'Totale guariti', data: [], borderColor: 'rgba(0, 127, 0, 0.3)', fill: false, yAxisID: 'sx' };
    this.nuoviCasi = { label: 'Nuovi casi', data: [], backgroundColor: 'rgba(127, 0, 0, 0.7)', type: 'bar', yAxisID: 'dx' };
    //this.nuoviPositivi = { label: 'Nuovi positivi', data: [], backgroundColor: 'rgba(255, 0, 0, 0.7)', type: 'bar', yAxisID: 'dx' };
    //this.nuoviDecessi = { label: 'Nuovi decessi', data: [], backgroundColor: 'rgba(0, 0, 127, 0.7)', type: 'bar', yAxisID: 'dx' };
    //this.nuoviGuariti = { label: 'Nuovi guariti', data: [], backgroundColor: 'rgba(0, 127, 0, 0.7)', type: 'bar', yAxisID: 'dx' };
    //this.ricoveratiICU = { label: 'Terapia Intensiva', data: [], borderColor: 'rgba(0, 127, 127, 0.3)', fill: false, yAxisID: 'sx' };
    //this.nuoviRicoveratiICU = { label: 'Nuovi Terapia Intensiva', data: [], backgroundColor: 'rgba(0, 127, 127, 0.7)', type: 'bar', yAxisID: 'dx' };
    //this.ricoverati = { label: 'Ricoverati', data: [], borderColor: 'rgba(127, 0, 127, 0.3)', fill: false, yAxisID: 'sx' };
    //this.nuoviRicoverati = { label: 'Nuovi Ricoverati', data: [], backgroundColor: 'rgba(127, 0, 127, 0.7)', type: 'bar', yAxisID: 'dx' };
    //this.tamponi = { label: 'Tamponi', data: [], borderColor: 'rgba(0, 0, 0, 0.3)', fill: false, yAxisID: 'sx' };
    //this.nuoviTamponi = { label: 'Nuovi Tamponi', data: [], backgroundColor: 'rgba(0, 0, 0, 0.7)', type: 'bar', yAxisID: 'dx' };
    //this.nuoviCasiPercentuali = { label: 'Aumento Casi %', data: [], borderColor: 'rgba(255,0,0,1)', fill: false, yAxisID: 'sx' };
    //this.nuoviPositiviPercentuali = { label: 'Aumento Positivi %', data: [], borderColor: 'rgba(20,192,0,1)', fill: false, yAxisID: 'sx' };
    //this.nuoviRicoveratiPercentuali = { label: 'Aumento Ricoverati %', data: [], borderColor: 'rgba(0,0,192,1)', fill: false, yAxisID: 'sx' };
    //this.nuoviRicoveratiICUPercentuali = { label: 'Aumento Terapia Intensiva %', data: [], borderColor: 'rgba(192,192,0,1)', fill: false, yAxisID: 'sx' };
}

function RegioneProvince(code) {
    this.codice = code;
    this.name = 'unset';
    this.province = [];
};

function Provincia(code) {
    this.codice = code;
    this.show = false;
    this.name = 'unset';
    this.casi = { label: 'Totale casi', data: [], borderColor: 'rgba(127, 0, 0, 0.3)', fill: false, yAxisID: 'sx' };
    this.nuoviCasi = { label: 'Nuovi casi', data: [], backgroundColor: 'rgba(127, 0, 0, 0.7)', type: 'bar', yAxisID: 'dx' };
}



function addElement(id, d, element, list, sublist) {
    var date = Date.parse(element['data']);
    if (id === 'italia') {
        d = d.serie;
        _addElement(d['casi'], date, element['totale_casi']);
        _addElement(d['positivi'], date, element['totale_positivi']);
        _addElement(d['guariti'], date, element['dimessi_guariti']);
        _addElement(d['decessi'], date, element['deceduti']);
        _addElement(d['ricoverati'], date, element['ricoverati_con_sintomi']);
        _addElement(d['ricoveratiICU'], date, element['terapia_intensiva']);
        _addElement(d['tamponi'], date, element['tamponi']);
    }

    if (id === 'regioni') {
        var codice = parseInt('' + element['codice_regione']);
        var f = d.serie[codice];
        f.name = element['denominazione_regione'];
        _addElement(f['casi'], date, element['totale_casi']);
        //_addElement(f['positivi'], date, element['totale_attualmente_positivi']);
        //_addElement(f['guariti'], date, element['dimessi_guariti']);
        //_addElement(f['decessi'], date, element['deceduti']);
        //_addElement(f['ricoverati'], date, element['ricoverati_con_sintomi']);
        //_addElement(f['ricoveratiICU'], date, element['terapia_intensiva']);
        //_addElement(f['tamponi'], date, element['tamponi']);

        f['casi'].label = element['denominazione_regione'] + ' (totale, sx)';
        f['nuoviCasi'].label = element['denominazione_regione'] + ' (nuovi, dx)';
        f['casi'].borderColor = colors[codice];
        f['casi'].backgroundColor = colors[codice];
        f['nuoviCasi'].borderColor = colors[codice];
        f['nuoviCasi'].backgroundColor = colors[codice];
    }

    if (id === 'province') {
        //get region code
        var codice = parseInt('' + element['codice_regione']);
        var f = d.serie[codice];
        f.name = element['denominazione_regione'];
        var codiceProv = parseInt('' + element['codice_provincia']);
        var provincia = 'prov' + codiceProv;   //as string
        var found = false;
        var index = -1;
        for (var i = 0; i < f.province.length; i++) {
            if (f.province[i].codice === codiceProv) {
                index = i;
                found = true;
            }
        }
        if (!found) {
            f.province.push(new Provincia(codiceProv));
            index = f.province.length - 1;
        }

        var p = f.province[index];
        p.name = element['denominazione_provincia'];

        var colore = Math.round(Math.random() * (colors.length - 1));

        _addElement(p['casi'], date, element['totale_casi']);
        p['casi'].label = element['denominazione_provincia'] + ' (totale, sx)';
        p['nuoviCasi'].label = element['denominazione_provincia'] + ' (nuovi, dx)';
        p['casi'].borderColor = colors[colore];
        p['casi'].backgroundColor = colors[colore];
        p['nuoviCasi'].borderColor = colors[colore];
        p['nuoviCasi'].backgroundColor = colors[colore];
    }

}

/**
 * 
 * @param {Array} serie Array in which point is added
 * @param {Date} x  Date of event
 * @param {Number} y Value
 */
function _addElement(serie, time, value) {
    serie.data.push({ x: time, y: value });
}

function computeDifference(id, d) {
    switch (id) {
        case 'italia':
            d = d.serie;
            _computeDifference(d, 'casi', 'nuoviCasi');
            _computeDifference(d, 'casi', 'nuoviCasiPercentuali');
            _computeDifference(d, 'positivi', 'nuoviPositivi');
            _computeDifference(d, 'positivi', 'nuoviPositiviPercentuali');
            _computeDifference(d, 'decessi', 'nuoviDecessi');
            _computeDifference(d, 'tamponi', 'nuoviTamponi');
            _computeDifference(d, 'guariti', 'nuoviGuariti');
            _computeDifference(d, 'ricoverati', 'nuoviRicoverati');
            _computeDifference(d, 'ricoveratiICU', 'nuoviRicoveratiICU');
            _computeDifference(d, 'ricoverati', 'nuoviRicoveratiPercentuali');
            _computeDifference(d, 'ricoveratiICU', 'nuoviRicoveratiICUPercentuali');

            _computePercent(d, 'casi', 'nuoviCasiPercentuali');
            _computePercent(d, 'positivi', 'nuoviPositiviPercentuali');
            _computePercent(d, 'ricoverati', 'nuoviRicoveratiPercentuali');
            _computePercent(d, 'ricoveratiICU', 'nuoviRicoveratiICUPercentuali');
            break;
        case 'regioni':
            for (var i = 0; i < d.serie.length; i++) {
                _computeDifference(d.serie[i], 'casi', 'nuoviCasi');
            }
            break;
        case 'province':
            for (var i = 0; i < d.serie.length; i++) {
                for (var j = 0; j < d.serie[i].province.length; j++) {
                    _computeDifference(d.serie[i].province[j], 'casi', 'nuoviCasi');
                }
            }
            break;
    }
}

function _computePercent(d, name_serie, name_percent) {
    $.each(d[name_percent].data, function (i, e) {
        if (i > 0) {
            e.y = 100 * e.y / d[name_serie].data[i - 1].y;
        }
    });
    d[name_percent].data.shift();
}

function _computeDifference(d, name_serie, name_increment) {
    $.each(d[name_serie].data, function (i, e) {
        if (i == 0) {
            d[name_increment].data = [];
            d[name_increment].data.push({ x: e.x, y: e.y });
        } else
            d[name_increment].data.push({ x: e.x, y: (e.y - d[name_serie].data[i - 1].y) });
    });
}


export { emptyObj, Italia, Regione, RegioneProvince, computeDifference, addElement };