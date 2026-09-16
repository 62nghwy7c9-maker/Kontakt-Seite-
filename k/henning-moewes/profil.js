/* ---------------------------------------------------------------------------
   Kundenkarte: Henning Moewes – alle Daten dieser einen Karte.
   Quelle: planvoller.de und Impressum (Stand: September 2026).
   Vor dem Beschreiben der NFC-Karte mit ihm durchgehen – die mit TODO
   markierten Felder kenne ich nicht.
--------------------------------------------------------------------------- */
window.CARD = {
  firstName: "Henning",
  lastName:  "Moewes",
  role:      "Projektierung und Vertrieb",   // TODO: Funktionsbezeichnung mit ihm abstimmen
  company:   "Planvoller GmbH",
  bio:       "Neubauimmobilien vom Grundstück bis zur Übergabe. Standort Kerpen.",
  logo:      "../../assets/img/logo.png",
  photo:     "",                       // "portrait.jpg" in diesen Ordner legen

  contact: {
    phone:    "+49 2237 9232340",      // seine Durchwahl
    mobile:   "",                      // TODO: Durchwahl oder Mobilnummer von ihm
    email:    "info@planvoller.de",    // TODO: falls er eine eigene Adresse hat
    website:  "https://planvoller.de",
    whatsapp: "",                      // nur wenn er das ausdrücklich will
    address:  { street: "Ottostraße 4a", zip: "50170", city: "Kerpen", country: "Deutschland" }
  },

  groups: [
    {
      title: "Kontakt",
      links: [
        { icon: "mail", label: "E-Mail schreiben", sub: "info@planvoller.de", url: "mailto:info@planvoller.de" }
      ]
    }
  ],

  footer: [
    { label: "Impressum",   url: "https://planvoller.de/impressum/" },
    { label: "Datenschutz", url: "https://planvoller.de/datenschutz/" }
  ]
};
