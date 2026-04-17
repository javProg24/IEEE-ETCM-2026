function crearTabla({ contenedor, columnas, datos, clase = "tabla" }) {
    const elementoContenedor = document.querySelector(contenedor);
    elementoContenedor.innerHTML = "";

    const table = document.createElement("table");
    table.className = clase;

    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");

    columnas.forEach(columna => {
        const th = document.createElement("th");
        th.textContent = columna.label;
        trHead.appendChild(th);
    });

    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    datos.forEach(fila => {
        const tr = document.createElement("tr");

        columnas.forEach(columna => {
            const td = document.createElement("td");
            const valor = fila[columna.key] ?? "";
            td.textContent = columna.formatear ? columna.formatear(valor, fila) : valor;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

        table.appendChild(tbody);
        elementoContenedor.appendChild(table);
}

const columnasGeneral = [
    {key: "rate",label:"Rate"},
    {key:"registration_type",label:"Registration type"},
    {
        key:"before_september_5th",
        label:"Before September 5th",
        formatear: (valor) => valor ? `USD ${valor}` : ""
    },
    {
        key:"after_september_5th",
        label:"After September 5th",
        formatear: (valor) => valor ? `USD ${valor}` : ""
    },
]
const datosGeneral=[
    {
        rate:"R1",
        registration_type:"IEEE Member Author (included student members)",
        before_september_5th:"395",
        after_september_5th:"495"
    }
]

const columnasTutorials = [
    {key:"registration_type",label:"Registration type"},
    {
        key:"cost",
        label:"Cost",
        formatear: (valor) => valor ? `USD ${valor}` : ""
    }
]

const datosTutorials=[
    {
        registration_type:"IEEE Student member",
        cost:"20"
    }
]

crearTabla({
    contenedor: "#tablaGeneral",
    columnas: columnasGeneral,
    datos: datosGeneral
});

crearTabla({
    contenedor: "#tablaTutorials",
    columnas: columnasTutorials,
    datos: datosTutorials
});

