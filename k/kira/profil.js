/* Eigene Karte – Kira */
window.CARD = {
  firstName: "Kira",
  lastName:  "Moewes",
  role:      "KI-Automatisierung",
  company:   "",
  bio:       "",
  logo:      "../../assets/img/logo.png",
  photo:     "",

  contact: {
    phone:    "",
    mobile:   "",                       // TODO: eigene Nummer
    email:    "",                       // TODO: eigene Adresse
    website:  "",
    whatsapp: "",
    address:  { street: "", zip: "", city: "", country: "Deutschland" }
  },

  groups: [
    {
      title: "Direkt",
      links: [
        { icon: "calendar", label: "Termin buchen", sub: "15 Min. Kennenlernen", url: "" }
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

  footer: [
    { label: "Impressum",   url: "" },
    { label: "Datenschutz", url: "" }
  ]
};
