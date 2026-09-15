/* ---------------------------------------------------------------------------
   DEINE DATEN – nur diese Datei musst du anfassen.
   Jede Karte = ein Eintrag in "profiles". Aufruf: /?k=<schluessel>
   Beispiel: deine-domain.de/?k=kira
   Der Eintrag unter "default" wird ohne Parameter angezeigt.
--------------------------------------------------------------------------- */
window.CARDS = {
  default: "kira",

  profiles: {
    kira: {
      /* --- Kopf ------------------------------------------------------- */
      firstName: "Kira",
      lastName:  "Moewes",
      role:      "KI-Automatisierung",
      company:   "",                     // optional, z. B. "Moewes Systems"
      tagline:   "Systeme, die ohne mich weiterlaufen.",
      bio:       "Ich baue Automatisierungen mit KI – von der ersten Idee bis zum System, das im Alltag trägt.",
      logo:      "assets/img/logo.png",  // Markenlogo im Kopf
      photo:     "",                     // optional: "assets/img/portrait.jpg"

      /* --- Kontaktdaten (landen in der Visitenkarte .vcf) -------------- */
      contact: {
        phone:   "",                     // Festnetz, z. B. "+49 40 1234567"
        mobile:  "+49 000 0000000",      // TODO: echte Nummer eintragen
        email:   "mail@deine-domain.de", // TODO: echte Adresse eintragen
        website: "https://deine-domain.de",
        whatsapp:"",                     // nur Ziffern, z. B. "491700000000"
        address: { street: "", zip: "", city: "", country: "Deutschland" }
      },

      /* --- Linkgruppen ------------------------------------------------ */
      groups: [
        {
          title: "Direkt",
          links: [
            { icon: "calendar", label: "Termin buchen",  sub: "15 Min. Kennenlernen", url: "https://cal.com/" },
            { icon: "mail",     label: "E-Mail schreiben", sub: "Antwort < 24 h",     url: "mailto:mail@deine-domain.de" }
          ]
        },
        {
          title: "Profile",
          links: [
            { icon: "linkedin",  label: "LinkedIn",  url: "https://www.linkedin.com/" },
            { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/" },
            { icon: "github",    label: "GitHub",    url: "https://github.com/" }
          ]
        },
        {
          title: "Arbeit",
          links: [
            { icon: "globe", label: "Website",   sub: "Leistungen & Referenzen", url: "https://deine-domain.de" },
            { icon: "file",  label: "Portfolio", sub: "PDF",                     url: "#" }
          ]
        }
      ],

      /* --- Fusszeile --------------------------------------------------- */
      footer: [
        { label: "Impressum",   url: "#" },
        { label: "Datenschutz", url: "#" }
      ]
    },

    /* Zweite Karte – Vorlage zum Kopieren. Aufruf: /?k=team */
    team: {
      firstName: "Max",
      lastName:  "Mustermann",
      role:      "Projekte",
      company:   "",
      tagline:   "",
      bio:       "Kurzer Satz zur Person.",
      logo:      "assets/img/logo.png",
      photo:     "",
      contact: {
        phone: "", mobile: "", email: "max@deine-domain.de",
        website: "https://deine-domain.de", whatsapp: "",
        address: { street: "", zip: "", city: "", country: "Deutschland" }
      },
      groups: [
        { title: "Direkt", links: [ { icon: "mail", label: "E-Mail", url: "mailto:max@deine-domain.de" } ] }
      ],
      footer: [ { label: "Impressum", url: "#" } ]
    }
  }
};
