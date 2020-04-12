## covid19-charts
Visualizzatore dati epidemia COVID-19 su scala nazionale/regionale/provinciale.
I dati sono presi dal repository della protezione civile su dati protezione civile (https://github.com/pcm-dpc/COVID-19)

Esempio visualizzabile su http://micheledini.com/covid19

### Run

Lanciare parcel per webserver sviluppo (http://localhost:1234)

~~~
parcel run index.html
~~~

### Build

Lanciare parcel per generazione file distribuzione

~~~
parcel build .\index.html --no-source-maps --public-url ./
~~~