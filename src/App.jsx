// src/App.jsx
import React, { useState } from "react";
import "./App.css";

import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function App() {
  const [activeSection, setActiveSection] = useState("inicio");

  return (
    <div className="pc-root">
      {/* HEADER con banner y logo */}
      <header className="pc-header">
        <div className="pc-banner">
          <img
            src="/party-banner.png"
            alt="PartyClub Banner"
            className="pc-banner-img"
          />
          <img
            src="/party-logo.gif"
            alt="PartyClub Logo"
            className="pc-logo"
          />
        </div>

        <div className="pc-header-bottom">
          <h1 className="pc-main-title">Panel Staff Discord</h1>

          <nav className="pc-nav">
            <button
              className={`pc-nav-btn ${
                activeSection === "inicio" ? "active" : ""
              }`}
              onClick={() => setActiveSection("inicio")}
            >
              Inicio
            </button>
            <button
              className={`pc-nav-btn ${
                activeSection === "entrevista" ? "active" : ""
              }`}
              onClick={() => setActiveSection("entrevista")}
            >
              Entrevista
            </button>
            <button
              className={`pc-nav-btn ${
                activeSection === "formulario" ? "active" : ""
              }`}
              onClick={() => setActiveSection("formulario")}
            >
              Formulario
            </button>
          </nav>
        </div>
      </header>

      <main className="pc-main">
        {activeSection === "inicio" && <InicioSection />}
        {activeSection === "entrevista" && <EntrevistaSection />}
        {activeSection === "formulario" && <FormularioSection />}
      </main>
    </div>
  );
}

/* =============== INICIO =============== */

function InicioSection() {
  return (
    <section
      className="pc-section"
      style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}
    >
      {`╭─────────────────────❀─────────────────────╮ 

💫₊˚⊹♡ ROLES DEL SERVIDOR | PARTYCLUB ♡⊹˚₊💫 

╰─────────────────────❀─────────────────────╯  

╭˚₊♡────────╮ 

💎 GERENTE 

╰────────♡₊˚╯ 

Es la máxima autoridad del servidor. Supervisa la estructura general, establece directrices, coordina al equipo administrativo y toma decisiones estratégicas para asegurar el correcto funcionamiento y desarrollo de PartyClub.  

✦───────────────❀───────────────✦  

╭˚₊♡──────╮ 

🛡️ ADMIN 

╰──────♡₊˚╯ 

Ocupa el segundo nivel jerárquico. Se encarga de la configuración de roles, canales y bots, además de supervisar al personal del staff. Apoya al gerente en la ejecución de decisiones y garantiza el orden y estabilidad del servidor en su ausencia.  

✦───────────────❀───────────────✦  

╭˚₊♡────────╮ 

💬 SOPORTE 

╰────────♡₊˚╯ 

Brindan asistencia técnica y orientación a los usuarios. Atienden dudas, reportes o solicitudes, asegurando que todos los miembros disfruten de una experiencia cómoda y fluida dentro del servidor.  

✦───────────────❀───────────────✦ 

╭˚₊♡─────╮ 

🌸 STAFF 

╰─────♡₊˚╯ 

Conforma el equipo base de gestión. Su función es mantener el orden, asistir a los miembros, organizar actividades y contribuir activamente al buen funcionamiento y crecimiento del servidor.  

✦───────────────❀───────────────✦  

╭˚₊♡──────────────╮ 

⚖️ MODERADORES 

╰──────────────♡₊˚╯ 

Tienen la responsabilidad de garantizar el cumplimiento de las normas y la convivencia pacífica entre los miembros. Actúan con imparcialidad, aplicando medidas correctivas cuando es necesario y manteniendo siempre una conducta ejemplar.  

✦───────────────❀───────────────✦  

╭˚₊♡───────────────────────╮ 

🎀 CREADOR DE CONTENIDO 

╰───────────────────────♡₊˚╯ 

Es un rol destinado a los miembros que representan a PartyClub a través de contenido digital, como transmisiones, videos o publicaciones en redes sociales. Su propósito es proyectar la imagen del servidor y fortalecer su comunidad.  

✦───────────────❀───────────────✦  

╭˚₊♡───────────────╮ 

🧭 STAFF DE PRUEBA 

╰───────────────♡₊˚╯ 

Corresponde a los miembros que se encuentran en etapa de evaluación para incorporarse al equipo oficial del staff. Durante este periodo se analiza su compromiso, desempeño y capacidad para asumir responsabilidades.  

✦───────────────❀───────────────✦  

╭˚₊♡────────╮ 

💖 BOOSTER 

╰────────♡₊˚╯ 

Son los usuarios que contribuyen al servidor mediante Server Boosts, mejorando su rendimiento y apariencia. Aunque no forman parte del staff, reciben reconocimiento y beneficios especiales por su valioso apoyo.  

✦───────────────❀───────────────✦  

╭˚₊♡────────╮ 

🌙 CLIENTES 

╰────────♡₊˚╯ 

Es el rol inicial asignado automáticamente a los nuevos miembros. Permite acceder a los canales básicos, conocer las normas y comenzar su integración en la comunidad de PartyClub.  

╭─────────────────────❀─────────────────────╮ 

♡₊˚💫 Gracias por formar parte de PartyClub 💫˚₊♡ 

╰─────────────────────❀─────────────────────╯`}
    </section>
  );
}

/* ============ ENTREVISTA ============ */

function EntrevistaSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    usuarioDiscord: "",
    fecha: "",
    funcionesModeracion: "",
    actuarConflictos: "",
    configurarRoles: "",
    crecimientoServidor: "",
    ideasMiembros: "",
    staffConfiable: "",
    usoPermisos: "",
    infoPrivada: "",
    botProblemas: "",
    ticketSinRespuesta: "",
    sugerencias: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMsg("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMsg("");

    try {
      await addDoc(collection(db, "entrevistas"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setMsg("✅ Entrevista enviada correctamente.");

      setFormData({
        nombre: "",
        edad: "",
        usuarioDiscord: "",
        fecha: "",
        funcionesModeracion: "",
        actuarConflictos: "",
        configurarRoles: "",
        crecimientoServidor: "",
        ideasMiembros: "",
        staffConfiable: "",
        usoPermisos: "",
        infoPrivada: "",
        botProblemas: "",
        ticketSinRespuesta: "",
        sugerencias: "",
      });
    } catch (err) {
      console.error(err);
      setMsg("❌ Error al enviar la entrevista.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pc-section entrevista-section">
      <div className="entrevista-title">
        <div>╭──────────────✦──────────────╮</div>
        <div>📝 Postulación para Staff | PartyClub</div>
        <div>╰──────────────✦──────────────╯</div>
      </div>

      <form className="pc-form" onSubmit={handleSubmit}>
        {/* DATOS BÁSICOS */}
        <div className="entrevista-block">
          <h3 className="entrevista-heading">Datos Básicos</h3>

          <label className="pc-label">
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="pc-input"
              required
            />
          </label>

          <label className="pc-label">
            Edad:
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              className="pc-input"
              required
            />
          </label>

          <label className="pc-label">
            Usuario/ID de Discord:
            <input
              type="text"
              name="usuarioDiscord"
              value={formData.usuarioDiscord}
              onChange={handleChange}
              className="pc-input"
              required
            />
          </label>

          <label className="pc-label">
            Fecha:
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="pc-input"
              required
            />
          </label>
        </div>

        {/* EXPERIENCIA EN DISCORD */}
        <div className="entrevista-separator">
          ✦─────────────────────⚙️──────────────────────✦
        </div>

        <div className="entrevista-block">
          <h3 className="entrevista-heading">Experiencia en Discord</h3>

          <label className="pc-label">
            ¿Qué funciones usas para moderar un servidor?
            <textarea
              name="funcionesModeracion"
              value={formData.funcionesModeracion}
              onChange={handleChange}
              className="pc-textarea"
              rows={3}
              required
            />
          </label>

          <label className="pc-label">
            ¿Cómo actuarías ante un conflicto entre miembros?
            <textarea
              name="actuarConflictos"
              value={formData.actuarConflictos}
              onChange={handleChange}
              className="pc-textarea"
              rows={3}
              required
            />
          </label>

          <label className="pc-label">
            ¿Sabes configurar roles y permisos?
            <textarea
              name="configurarRoles"
              value={formData.configurarRoles}
              onChange={handleChange}
              className="pc-textarea"
              rows={2}
              required
            />
          </label>
        </div>

        {/* VISIÓN DEL PROYECTO */}
        <div className="entrevista-separator">
          ✦───────────────────────🚀────────────────────────✦
        </div>

        <div className="entrevista-block">
          <h3 className="entrevista-heading">Visión del Proyecto</h3>

          <label className="pc-label">
            ¿Cómo podrías ayudar al crecimiento del servidor?
            <textarea
              name="crecimientoServidor"
              value={formData.crecimientoServidor}
              onChange={handleChange}
              className="pc-textarea"
              rows={3}
              required
            />
          </label>

          <label className="pc-label">
            ¿Qué ideas tienes para atraer y mantener nuevos miembros?
            <textarea
              name="ideasMiembros"
              value={formData.ideasMiembros}
              onChange={handleChange}
              className="pc-textarea"
              rows={3}
              required
            />
          </label>
        </div>

        {/* RESPONSABILIDAD */}
        <div className="entrevista-separator">
          ✦────────────────────────💡─────────────────────────✦
        </div>

        <div className="entrevista-block">
          <h3 className="entrevista-heading">Responsabilidad</h3>

          <label className="pc-label">
            ¿Qué significa para ti ser un staff confiable?
            <textarea
              name="staffConfiable"
              value={formData.staffConfiable}
              onChange={handleChange}
              className="pc-textarea"
              rows={3}
              required
            />
          </label>

          <label className="pc-label">
            ¿Cómo usarías responsablemente tus permisos?
            <textarea
              name="usoPermisos"
              value={formData.usoPermisos}
              onChange={handleChange}
              className="pc-textarea"
              rows={3}
              required
            />
          </label>
        </div>

        {/* ESCENARIOS RÁPIDOS */}
        <div className="entrevista-separator">
          ✦────────────────────────⚠️────────────────────────✦
        </div>

        <div className="entrevista-block">
          <h3 className="entrevista-heading">Escenarios Rápidos</h3>

          <label className="pc-label">
            Un usuario comparte información privada. ¿Qué haces?
            <textarea
              name="infoPrivada"
              value={formData.infoPrivada}
              onChange={handleChange}
              className="pc-textarea"
              rows={2}
              required
            />
          </label>

          <label className="pc-label">
            Un bot causa problemas. ¿Qué haces?
            <textarea
              name="botProblemas"
              value={formData.botProblemas}
              onChange={handleChange}
              className="pc-textarea"
              rows={2}
              required
            />
          </label>

          <label className="pc-label">
            Hay un ticket sin respuesta y nadie del staff está disponible. ¿Qué harías?
            <textarea
              name="ticketSinRespuesta"
              value={formData.ticketSinRespuesta}
              onChange={handleChange}
              className="pc-textarea"
              rows={2}
              required
            />
          </label>
        </div>

        {/* APORTES */}
        <div className="entrevista-separator">
          ✦────────────────────────💬────────────────────────✦
        </div>

        <div className="entrevista-block">
          <h3 className="entrevista-heading">Aportes</h3>

          <label className="pc-label">
            ¿Tienes alguna idea o sugerencia para mejorar PartyClub?
            <textarea
              name="sugerencias"
              value={formData.sugerencias}
              onChange={handleChange}
              className="pc-textarea"
              rows={3}
              required
            />
          </label>
        </div>

        {msg && <p className="pc-msg">{msg}</p>}

        <button className="pc-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar entrevista"}
        </button>
      </form>
    </section>
  );
}

/* ============ FORMULARIO STAFF ============ */

function FormularioSection() {
  const [formData, setFormData] = useState({
    nombreDiscord: "",
    pais: "",
    edad: "",
    fortalezas: "",
    disponibilidad: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMsg("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      const current = [...prev.disponibilidad];

      if (checked && !current.includes(value)) {
        current.push(value);
      } else if (!checked) {
        const idx = current.indexOf(value);
        if (idx !== -1) current.splice(idx, 1);
      }

      return { ...prev, disponibilidad: current };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMsg("");

    try {
      await addDoc(collection(db, "staffForms"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setMsg("✅ Formulario enviado correctamente.");

      setFormData({
        nombreDiscord: "",
        pais: "",
        edad: "",
        fortalezas: "",
        disponibilidad: [],
      });
    } catch (err) {
      console.error(err);
      setMsg("❌ Error al enviar el formulario.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pc-section formulario-section">
      <div className="form-title">
        <div>╭─────────────────────────✦─────────────────────────╮</div>
        <div>💼 FORMULARIO DE INFORMACIÓN DEL STAFF | PARTYCLUB</div>
        <div>╰─────────────────────────✦─────────────────────────╯</div>
      </div>

      <form className="pc-form" onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="form-block">
          <h3 className="form-heading">🪪 Nombre de Discord o ID</h3>
          <p className="form-desc">
            ↳ Ejemplo: el_masgod#8470 / 708345457549770873
          </p>

          <input
            type="text"
            name="nombreDiscord"
            value={formData.nombreDiscord}
            onChange={handleChange}
            className="pc-input"
            required
          />
        </div>

        {/* País */}
        <div className="form-block">
          <h3 className="form-heading">🌍 País de Residencia</h3>
          <p className="form-desc">
            ↳ Indica tu país para ajustar zona horaria y coordinar horarios.
          </p>

          <input
            type="text"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            className="pc-input"
            required
          />
        </div>

        {/* Edad */}
        <div className="form-block">
          <h3 className="form-heading">🎂 Edad</h3>
          <p className="form-desc">↳ Especifica tu edad actual.</p>

          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            className="pc-input"
            min="10"
            max="99"
            required
          />
        </div>

        {/* Fortalezas */}
        <div className="form-block">
          <h3 className="form-heading">💬 Fortalezas dentro del Staff</h3>
          <p className="form-desc">
            ↳ Ejemplos: animar en llamadas, moderar, ayudar usuarios, organizar
            eventos, responder tickets…
          </p>

          <textarea
            name="fortalezas"
            value={formData.fortalezas}
            onChange={handleChange}
            className="pc-textarea"
            rows={3}
            required
          />
        </div>

        {/* Disponibilidad */}
        <div className="form-block">
          <h3 className="form-heading">🕒 Horario de Disponibilidad</h3>
          <p className="form-desc">
            ↳ Selecciona los horarios donde normalmente estás activo:
          </p>

          <div className="form-checkboxes">
            <label className="checkbox-item">
              <input
                type="checkbox"
                value="mañana"
                onChange={handleCheckboxChange}
                checked={formData.disponibilidad.includes("mañana")}
              />
              Mañana (06:00 - 12:00)
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                value="tarde"
                onChange={handleCheckboxChange}
                checked={formData.disponibilidad.includes("tarde")}
              />
              Tarde (12:00 - 18:00)
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                value="noche"
                onChange={handleCheckboxChange}
                checked={formData.disponibilidad.includes("noche")}
              />
              Noche (18:00 - 00:00)
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                value="madrugada"
                onChange={handleCheckboxChange}
                checked={formData.disponibilidad.includes("madrugada")}
              />
              Madrugada (00:00 - 06:00)
            </label>
          </div>
        </div>

        {msg && <p className="pc-msg">{msg}</p>}

        <button type="submit" className="pc-btn" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar formulario"}
        </button>
      </form>

      <div className="form-footer">
        <div>╭───────────────────────✦───────────────────────╮</div>
        <div>✨ Gracias por colaborar con el equipo de PartyClub ✨</div>
        <div>╰───────────────────────✦───────────────────────╯</div>
      </div>
    </section>
  );
}

export default App;
