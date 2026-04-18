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
        key:"before_august_30th",
        label:"Before August 30th",
        formatear: (valor) => valor ? `USD ${valor}` : ""
    },
    {
        key:"after_august_30th",
        label:"After August 30th",
        formatear: (valor) => valor ? `USD ${valor}` : ""
    },
]
const datosGeneral=[
    {
        rate:"R1",
        registration_type:"IEEE Member Author (included student members)",
        before_august_30th:395,
        after_august_30th:495
    },
    {
        rate:"R2",  
        registration_type:"Non Member Author (including students)",
        before_august_30th:510,
        after_august_30th:600
    },
    {
        rate:"R3",
        registration_type:"Additional page",
        before_august_30th:40,
        after_august_30th:55
    },
    {
        rate:"R4",
        registration_type:"Additional paper",
        before_august_30th:220,
        after_august_30th:300
    },
    {
        rate:"R5",
        registration_type:"IEEE Student member attendee",
        before_august_30th:155,
        after_august_30th:210
    },
    {
        rate:"R6",
        registration_type:"Non member student attendee",
        before_august_30th:250,
        after_august_30th:300
    },
    {
        rate:"R7",
        registration_type:"IEEE Professional member attendee",
        before_august_30th:300,
        after_august_30th:450
    },
    {
        rate:"R8",
        registration_type:"Non member Professional attendee",
        before_august_30th:400,
        after_august_30th:550
    },
    {
        rate:"R9",
        registration_type:"Guest companion",
        before_august_30th:180,
        after_august_30th:200
    },
    {
        rate:"R10",
        registration_type:"Gala dinner",
        before_august_30th:65,
        after_august_30th:80
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
        cost:20
    },
    {
        registration_type:"Non member student",
        cost:30
    },
    {
        registration_type:"IEEE Member",
        cost:50
    },
    {
        registration_type:"Non member Professional",
        cost:100
    },
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

