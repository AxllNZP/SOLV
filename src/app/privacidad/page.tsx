import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: `Cómo ${SITE_NAME} trata los datos personales y la información de quienes visitan ${SITE_URL}.`,
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <LegalPage title="Política de Privacidad">
      <p>
        En {SITE_NAME} ({SITE_URL}) respetamos tu privacidad. Esta política explica qué información se trata cuando visitas nuestro sitio y utilizas nuestras herramientas web.
      </p>
      <h2>1. Responsable</h2>
      <p>
        {SITE_NAME} es un estudio digital. Para cualquier consulta sobre privacidad puedes escribirnos a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <h2>2. Herramientas que se ejecutan en tu navegador</h2>
      <p>
        Nuestras herramientas web funcionan del lado del cliente: los archivos y datos que utilizas se procesan en tu propio dispositivo. {SITE_NAME} no sube, almacena ni conserva en servidores los archivos que cargas en ellas.
      </p>
      <h2>3. Información que recopilamos</h2>
      <ul>
        <li>Datos que nos envías voluntariamente por correo electrónico (por ejemplo, tu dirección y el contenido de tu mensaje).</li>
        <li>Datos técnicos básicos de navegación (tipo de navegador, dispositivo, páginas visitadas) que pueden generarse a través de la infraestructura de alojamiento y de servicios de terceros.</li>
        <li>Identificadores de cookies y datos similares utilizados por Google AdSense (ver apartado 4).</li>
      </ul>
      <h2>4. Publicidad de Google AdSense</h2>
      <p>
        Este sitio utiliza Google AdSense para mostrar anuncios. Google, como proveedor externo, utiliza cookies para mostrar anuncios basados en tus visitas a este y otros sitios web. El uso de la cookie de publicidad de Google permite que Google y sus socios muestren anuncios en función de tu navegación.
      </p>
      <p>
        Puedes inhabilitar la publicidad personalizada en <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">https://adssettings.google.com</a>. Consulta también la política de Google sobre cómo utiliza los datos de sitios que usan sus servicios.
      </p>
      <h2>5. Finalidad y uso</h2>
      <p>
        Usamos la información para responder tus consultas, mantener y mejorar el sitio, garantizar su seguridad y mostrar publicidad que financia el servicio. No vendemos tus datos personales.
      </p>
      <h2>6. Conservación</h2>
      <p>
        Conservamos los mensajes que nos envías únicamente durante el tiempo necesario para atender tu solicitud, salvo que una obligación legal exija conservarlos más tiempo.
      </p>
      <h2>7. Tus derechos</h2>
      <p>
        Puedes solicitar el acceso, rectificación, supresión u oposición al tratamiento de tus datos, así como retirar tu consentimiento, escribiendo a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <h2>8. Menores</h2>
      <p>Este sitio no está dirigido a menores de 13 años y no recopilamos datos de ellos de forma deliberada.</p>
      <h2>9. Cambios en esta política</h2>
      <p>Podemos actualizar esta política; la fecha de última actualización aparece al inicio de la página.</p>
    </LegalPage>
  );
}
