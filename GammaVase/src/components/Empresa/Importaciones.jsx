import React from "react";
import "../../styles/Empresa/Importaciones.css";

const paises = [
  { nombre: "India", bandera: "../../assets/banderas/india.webp" },
  { nombre: "Brasil", bandera: "../../assets/banderas/brasil.png" },
  { nombre: "China", bandera: "../../assets/banderas/china.webp" },
];

const Importaciones = () => {
  return (
    <section className="importaciones">
      <h3>Importaciones desde</h3>
      <div className="paises">
        {paises.map((pais) => (
          <div key={pais.nombre} className="pais">
            <img src={pais.bandera} alt={pais.nombre} />
            <p>{pais.nombre}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Importaciones;
