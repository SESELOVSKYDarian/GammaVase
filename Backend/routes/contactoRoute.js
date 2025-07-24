const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    nombre,
    cuil,
    razon,
    rubro,
    email,
    prefijo,
    telefono,
    pais,
    provincia,
    ciudad,
    domicilio,
    comentario,
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mensajeAdmin = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER,

    subject: `Nuevo contacto de ${nombre}`,
    html: `
      <h3>Nuevo formulario recibido:</h3>
      <ul>
        <li><strong>Nombre:</strong> ${nombre}</li>
        <li><strong>CUIL:</strong> ${cuil}</li>
        <li><strong>Razón Social:</strong> ${razon}</li>
        <li><strong>Rubro:</strong> ${rubro}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Teléfono:</strong> ${prefijo} ${telefono}</li>
        <li><strong>País:</strong> ${pais}</li>
        <li><strong>Provincia:</strong> ${provincia}</li>
        <li><strong>Ciudad:</strong> ${ciudad}</li>
        <li><strong>Domicilio:</strong> ${domicilio}</li>
        <li><strong>Comentario:</strong> ${comentario || "Sin comentario"}</li>
      </ul>
    `,
  };

  const mensajeUsuario = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Confirmación de contacto",
    html: `
      <h4>¡Hola ${nombre}!</h4>
      <p>Gracias por completar el formulario. Nos pondremos en contacto contigo a la brevedad.</p>
    `,
  };

    try {
    await transporter.sendMail(mensajeAdmin);
    await transporter.sendMail(mensajeUsuario);
    console.log("✅ Emails sent successfully!");
    res.status(200).json({ success: true });
  } catch (error) {
    // Log the detailed error to the console
    console.error("❌ Nodemailer error object:", error);
    console.error("❌ Nodemailer error message:", error.message);
    console.error("❌ Error al enviar email:", error);
    res.status(500).json({ success: false, message: "Error al enviar el email" });
  }

});

module.exports = router;
