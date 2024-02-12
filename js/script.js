document.addEventListener("DOMContentLoaded", function() {
    seleccionarPais();
    document.getElementById("selectPaises").addEventListener("change", mostrarPais);
});

function seleccionarPais(){
    fetch(`https://restcountries.com/v3.1/all`)

    .then(response => response.json())
    .then(data => {
        const paises = data;
        paises.sort((a, b) => {
            const nombreA = a.name.common.toUpperCase();
            const nombreB = b.name.common.toUpperCase();
            if (nombreA < nombreB) {
                return -1;
            }
            if (nombreA > nombreB) {
                return 1;
            }
            return 0;
        });

        const selectPaises = document.getElementById("selectPaises");

        paises.forEach((p) =>{
            const nombrePais = p.name.common;
            const option = document.createElement("option");
            option.text = nombrePais;
            option.value = nombrePais;
            selectPaises.add(option);
        });

    });
}

function mostrarPais() {
    const selectElement = document.getElementById("selectPaises");
    const paisSeleccionado = selectElement.value;

    const container = document.getElementById("container");
    container.innerHTML = '';

    buscarPais(paisSeleccionado)
        .then(pais => {

            const bandera = document.createElement("flag");
            bandera.innerHTML = pais.flag;

            const nombrePais = document.createElement("h4");
            nombrePais.innerText = `PAIS: ${paisSeleccionado}`;

            const moneda = document.createElement("h4");
            moneda.innerText = `MONEDA: ${obtenerMonedas(pais)}`;

            const lenguaje = document.createElement("h4");
            lenguaje.innerText = `LENGUAJE: ${obtenerLenguajes(pais)}`;

            const capital = document.createElement("h4");
            capital.innerText = `CAPITAL: ${pais.capital}`;

            const region = document.createElement("h4");
            region.innerText = `REGION: ${pais.region}`;

            const subregion = document.createElement("h4");
            subregion.innerText = `SUBREGION: ${pais.subregion}`;

            container.appendChild(bandera);
            container.appendChild(nombrePais);
            container.appendChild(capital);
            container.appendChild(region);
            container.appendChild(subregion);
            container.appendChild(moneda);
            container.appendChild(lenguaje);
           
            
        })
}

function buscarPais(paisNombre) {
    return new Promise((resolve, reject) => {
        fetch(`https://restcountries.com/v3.1/all`)
            .then(response => response.json())
            .then(data => {
                const paisEncontrado = data.find(p => p.name.common === paisNombre);
                if (paisEncontrado) {
                    resolve(paisEncontrado);
                } else {
                    reject(new Error('País no encontrado'));
                }
            })
            .catch(error => reject(error));
    });
}

function obtenerMonedas(pais) {
    const monedas = pais.currencies;
    listaDeMonedas = [];

    for (const codigoMoneda in monedas) {
        if (monedas.hasOwnProperty(codigoMoneda)) {
            const moneda = monedas[codigoMoneda];
            listaDeMonedas.push(`${moneda.name} (${codigoMoneda})`);
        }
    }
    return listaDeMonedas;
}

function obtenerLenguajes(pais) {
    const lenguajes = pais.languages;
    listaDeLenguajes = [];

    for (const codigoLenguaje in lenguajes) {
        if (lenguajes.hasOwnProperty(codigoLenguaje)) {
            const lenguaje = lenguajes[codigoLenguaje];
            listaDeLenguajes.push(`${lenguaje}`);
        }
    }
    return listaDeLenguajes;
}