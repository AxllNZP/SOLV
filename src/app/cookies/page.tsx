import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: `Información sobre las cookies y tecnologías similares que utiliza ${SITE_URL}, incluida la publicidad de Google AdSense.`,
  alternates: { canonical: "/cookies" },
};

export default function Cookies() {
  return (
    <LegalPage title="Política de Cookies">
      <p>
        Esta política explica qué son las cookies y cómo las utiliza {SITE_NAME} en {SITE_URL}.
      </p>
      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Son pequeños archivos de texto que un sitio web guarda en tu dispositivo para recordar información sobre tu visita.
      </p>
      <h2>2. Cookies que pueden utilizarse</h2>
      <ul>
        <li><strong>Técnicas:</strong> necesarias para el funcionamiento básico del sitio.</li>
        <li><strong>Publicitarias de terceros (Google AdSense):</strong> Google y sus socios publicitarios pueden colocar cookies para mostrar anuncios basados en tus visitas a este y otros sitios, medir su rendimiento y evitar fraudes.</li>
      </ul>
      <h2>3. Google AdSense</h2>
      <p>
        Google utiliza la cookie de publicidad para mostrar anuncios personalizados. Puedes inhabilitar la publicidad personalizada en <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">https://adssettings.google.com</a>.
      </p>
      <h2>4. Cómo gestionar o eliminar cookies</h2>
      <p>
        Puedes bloquear o eliminar las cookies desde la configuración de tu navegador. Ten en cuenta que, al desactivarlas, algunas funciones del sitio podrían verse afectadas.
      </p>
      <h2>5. Cambios en esta política</h2>
      <p>Podemos actualizar esta política; la fecha de última actualización aparece al inicio de la página.</p>
      <h2>6. Contacto</h2>
      <p>
        Si tienes dudas, escríbenos a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
