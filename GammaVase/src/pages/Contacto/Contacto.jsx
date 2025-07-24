import { motion } from "framer-motion";
import wasapIcon from "/wasap.svg";
import Hero from "../../components/Contacto/Hero";
import TijerasImage from "../../components/Empresa/TijerasImage";
import "../../styles/Contacto/Contacto.css";

export const Contacto = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      nombre: form.nombre.value,
      cuil: form.cuil.value,
      razon: form.razon.value,
      rubro: form.rubro.value,
      email: form.email.value,
      prefijo: form.prefijo.value,
      telefono: form.telefono.value,
      pais: form.pais.value,
      provincia: form.provincia.value,
      ciudad: form.ciudad.value,
      domicilio: form.domicilio.value,
      comentario: form.comentario.value,
    };

    try {
      const res = await fetch("http://localhost:3000/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Formulario enviado correctamente");
        form.reset();
      } else {
        alert("Error al enviar el formulario");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error de conexión");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <TijerasImage />
      <div className="contacto-container">
        <div className="form-section">
          <div className="formulario-box">
            <h3 className="titulo-formulario">Formulario</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                required
              />

              <div className="doble-input">
                <input type="text" name="cuil" placeholder="CUIL" required />
                <input
                  type="text"
                  name="razon"
                  placeholder="Razón Social"
                  required
                />
              </div>

              <input type="text" name="rubro" placeholder="Rubro" required />
              <input type="email" name="email" placeholder="Email" required />

              <div className="telefono-box">
                <select name="prefijo" id="prefijo" required>
                  <option value="+54">+54</option>
                  <option value="+55">+55 (Brasil)</option>
                  <option value="+51">+51 (Perú)</option>
                  <option value="+56">+56 (Chile)</option>
                  <option value="+57">+57 (Colombia)</option>
                </select>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Número de teléfono"
                  required
                />
              </div>

              <div className="doble-input">
                <input type="text" name="pais" placeholder="País" required />
                <input
                  type="text"
                  name="provincia"
                  placeholder="Provincia"
                  required
                />
              </div>

              <div className="doble-input">
                <input
                  type="text"
                  name="ciudad"
                  placeholder="Ciudad"
                  required
                />
                <input
                  type="text"
                  name="domicilio"
                  placeholder="Domicilio"
                  required
                />
              </div>

              <textarea name="comentario" placeholder="Comentario (opcional)" />

              <button type="submit">Enviar</button>
            </form>
          </div>

          <div className="linea-divisoria" />

          <div className="contacto-derecho">
            <h3 className="titulo-formulario">Contáctanos por</h3>
            <a
              href="https://wa.me/5490000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
              <img src={wasapIcon} alt="WhatsApp" className="whatsapp-icon" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contacto;
