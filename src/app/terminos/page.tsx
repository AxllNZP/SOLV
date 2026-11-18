import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { COMPARINIZADOR_URL, CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description: `Condiciones de uso del sitio ${SITE_URL} y de las herramientas web de ${SITE_NAME}.`,
  alternates: { canonical: "/terminos" },
};

export default function Terminos() {
  return (
    <LegalPage title="Términos de Uso">
      <p>
        Al acceder y utilizar {SITE_URL} y sus herramientas aceptas estos términos. Si no estás de acuerdo, te pedimos que no uses el sitio.
      </p>
      <h2>1. Servicio</h2>
      <p>
        {SITE_NAME} es un estudio digital que ofrece información sobre sus servicios y herramientas web, como El Comparinizador (<a href={COMPARINIZADOR_URL}>{COMPARINIZADOR_URL}</a>), que se ejecutan en el navegador del usuario.
      </p>
      <h2>2. Uso permitido</h2>
      <ul>
        <li>Debes usar el sitio de forma lícita y sin vulnerar derechos de terceros.</li>
        <li>No está permitido intentar interrumpir, sobrecargar o acceder sin autorización a la infraestructura del sitio.</li>
        <li>No puedes usar medios automatizados para generar tráfico publicitario artificial ni hacer clic en anuncios de forma fraudulenta.</li>
      </ul>
      <h2>3. Tus archivos y datos</h2>
      <p>
        Las herramientas procesan la información en tu dispositivo y no almacenamos tus archivos en nuestros servidores. Eres responsable del contenido que utilizas y de contar con los derechos para ello.
      </p>
      <h2>4. Propiedad intelectual</h2>
      <p>
        El diseño, textos, marca y código del sitio pertenecen a {SITE_NAME} o se usan con la debida autorización. No puedes reproducirlos ni distribuirlos sin permiso previo.
      </p>
      <h2>5. Publicidad y enlaces de terceros</h2>
      <p>
        El sitio puede mostrar anuncios de Google AdSense y enlazar a sitios de terceros. No controlamos ni somos responsables de su contenido ni de sus políticas.
      </p>
      <h2>6. Exclusión de garantías</h2>
      <p>
        El sitio y las herramientas se ofrecen «tal cual», sin garantía de disponibilidad ininterrumpida o ausencia de errores. Procura verificar los resultados antes de tomar decisiones basadas en ellos.
      </p>
      <h2>7. Limitación de responsabilidad</h2>
      <p>
        En la medida permitida por la ley, {SITE_NAME} no será responsable de daños indirectos derivados del uso o la imposibilidad de uso del sitio y sus herramientas.
      </p>
      <h2>8. Modificaciones</h2>
      <p>Podemos modificar estos términos en cualquier momento; el uso continuado del sitio implica su aceptación.</p>
      <h2>9. Contacto</h2>
      <p>
        Para cualquier consulta escríbenos a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
