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
  tagline:   "",                      // kurzer Satz in Kursiv
  bio:       "",                      // zwei bis drei Zeilen
  logo:      "",                      // "logo.png" in diesen Ordner legen; leer = kein Logo
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

  /* --- Linkgruppen -------------------------------------------------- */
  /* icon: phone mail whatsapp globe calendar linkedin instagram
           facebook xing tiktok youtube github file map shop link     */
  groups: [
    {
      title: "Direkt",
      links: [
        { icon: "calendar", label: "Termin buchen", sub: "", url: "" }
      ]
    },
    {
      title: "Profile",
      links: [
        { icon: "linkedin",  label: "LinkedIn",  url: "" },
        { icon: "instagram", label: "Instagram", url: "" }
      ]
    }
  ],

  /* --- Farben (optional) -------------------------------------------- */
  /* Weglassen = Dune-Standard (Schwarz + Glut-Orange).
     Beispiel für eine Kundenmarke:
     theme: { ember:"#3FA9A0", emberHi:"#7FD6CF", sand:"#EAF4F3" },        */

  /* --- Fusszeile ----------------------------------------------------- */
  footer: [
    { label: "Impressum",   url: "" },
    { label: "Datenschutz", url: "" }
  ]
};
