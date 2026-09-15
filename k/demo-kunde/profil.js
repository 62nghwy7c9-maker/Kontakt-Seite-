/* Beispielkarte eines Kunden */
window.CARD = {
  firstName: "Lena",
  lastName:  "Harkonnen",
  role:      "Inhaberin",
  company:   "Atelier Nord",
  bio:       "Möbel nach Maß, Werkstatt in Hamburg-Altona.",
  logo:      "../../assets/img/logo.png",
  photo:     "",

  contact: {
    phone:    "+49 40 1234567",
    mobile:   "+49 170 1234567",
    email:    "hallo@atelier-nord.example",
    website:  "https://atelier-nord.example",
    whatsapp: "491701234567",
    address:  { street: "Museumstraße 1", zip: "22765", city: "Hamburg", country: "Deutschland" }
  },

  groups: [
    { title: "Direkt", links: [
      { icon: "calendar", label: "Beratungstermin", sub: "kostenlos, 30 Min.", url: "https://cal.com/" },
      { icon: "map",      label: "Werkstatt finden", sub: "Hamburg-Altona",    url: "https://maps.google.com/" }
    ]},
    { title: "Profile", links: [
      { icon: "instagram", label: "Instagram", url: "https://instagram.com/" },
      { icon: "facebook",  label: "Facebook",  url: "https://facebook.com/" }
    ]},
    { title: "Arbeit", links: [
      { icon: "shop",  label: "Kollektion", sub: "Online ansehen", url: "https://atelier-nord.example" },
      { icon: "file",  label: "Preisliste", sub: "PDF",            url: "#" }
    ]}
  ],

  footer: [
    { label: "Impressum",   url: "#" },
    { label: "Datenschutz", url: "#" }
  ]
};
