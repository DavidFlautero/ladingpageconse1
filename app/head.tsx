export default function Head() {
  return (
    <>
      <title>Plan Nacional tu 0km</title>
      <meta
        name="description"
        content="Plataforma privada que conecta tus datos con concesionarios oficiales para evaluar opciones de acceso a tu 0km en cuotas."
      />
      {/* Google tag (gtag.js) */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-17872995421"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17872995421');
          `,
        }}
      />
    </>
  );
}
