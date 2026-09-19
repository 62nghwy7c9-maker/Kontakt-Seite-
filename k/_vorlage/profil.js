/* ---------------------------------------------------------------------------
   Kundenkarte – alle Daten dieser einen Karte.
   Nur diese Datei bearbeiten. Andere Karten sehen diese Daten nicht.
--------------------------------------------------------------------------- */
window.CARD = {
  /* --- Kopf --------------------------------------------------------- */
  firstName: "VORNAME",
  lastName:  "NACHNAME",
  role:      "Position",              // z. B. "Geschäftsführung"
  company:   "Firma",                 // leer lassen: ""
  bio:       "",                      // zwei bis drei Zeilen
  logo:      "../../assets/img/logo.png",   // Markenlogo – bleibt auf allen Karten gleich
  photo:     "",                      // "portrait.jpg" in diesen Ordner legen

  /* --- Kontaktdaten (landen in der gespeicherten Visitenkarte) ------- */
  contact: {
    phone:    "",                     // Festnetz
    mobile:   "",                     // Mobil
    email:    "",
    website:  "",
    whatsapp: "",                     // nur Ziffern, z. B. "491700000000"
    address:  { street: "", zip: "", city: "", country: "Deutschland" }
  },

  /* --- Zusaetzliche Links -------------------------------------------
     Telefon, E-Mail und Website oben muessen hier NICHT wiederholt werden;
     die stehen automatisch unter "Kontakt". Hier nur Profile, Termine usw. */
  /* Gruppentitel frei waehlbar. icon: phone mail whatsapp globe calendar
     linkedin instagram facebook xing tiktok youtube github file map shop link */
  groups: [
    {
      title: "Profile",
      links: [
        { icon: "linkedin",  label: "LinkedIn",  url: "" },
        { icon: "instagram", label: "Instagram", url: "" }
      ]
    }
  ],

  /* --- Fusszeile ----------------------------------------------------- */
  footer: [
    { label: "Impressum",   url: "" },
    { label: "Datenschutz", url: "" }
  ]
};
