/* =============================================================
   Karten-Editor: Formular -> profil.js, mit Live-Vorschau
   ============================================================= */
(function () {
  "use strict";

  var ICONS = ["calendar", "mail", "phone", "whatsapp", "globe", "linkedin", "instagram",
               "facebook", "xing", "tiktok", "youtube", "github", "shop", "file", "map", "link"];
  var GRUPPEN = ["Direkt", "Profile", "Arbeit"];

  var form = document.getElementById("form");
  var linksBox = document.getElementById("links");
  var out = document.getElementById("out");
  var preview = document.getElementById("preview");

  function val(name) { var el = form.elements[name]; return el ? el.value.trim() : ""; }
  function slugify(t) {
    return t.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
            .replace(/Ä/g, "ae").replace(/Ö/g, "oe").replace(/Ü/g, "ue").replace(/ß/g, "ss")
            .normalize("NFKD").replace(/[̀-ͯ]/g, "")
            .replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
  }

  /* ---------- Linkzeilen ---------- */
  function linkRow(data) {
    data = data || {};
    var d = document.createElement("div");
    d.className = "linkrow";
    d.innerHTML =
      '<button type="button" class="del" title="Link entfernen">&times;</button>' +
      '<label>Gruppe<select class="l-group">' +
        GRUPPEN.map(function (g) { return '<option' + (data.group === g ? " selected" : "") + '>' + g + "</option>"; }).join("") +
      "</select></label>" +
      '<label>Symbol<select class="l-icon">' +
        ICONS.map(function (i) { return '<option' + (data.icon === i ? " selected" : "") + ">" + i + "</option>"; }).join("") +
      "</select></label>" +
      '<label>Beschriftung<input class="l-label" value="' + (data.label || "").replace(/"/g, "&quot;") + '" placeholder="Termin buchen"></label>' +
      '<label>Zusatz<input class="l-sub" value="' + (data.sub || "").replace(/"/g, "&quot;") + '" placeholder="kostenlos, 30 Min."></label>' +
      '<label class="full">Adresse<input class="l-url" value="' + (data.url || "").replace(/"/g, "&quot;") + '" placeholder="https://…"></label>';
    d.querySelector(".del").addEventListener("click", function () { d.remove(); update(); });
    linksBox.appendChild(d);
    return d;
  }

  function readLinks() {
    return Array.prototype.map.call(linksBox.querySelectorAll(".linkrow"), function (r) {
      return {
        group: r.querySelector(".l-group").value,
        icon:  r.querySelector(".l-icon").value,
        label: r.querySelector(".l-label").value.trim(),
        sub:   r.querySelector(".l-sub").value.trim(),
        url:   r.querySelector(".l-url").value.trim()
      };
    }).filter(function (l) { return l.label; });
  }

  /* ---------- Datenobjekt der Karte ---------- */
  function buildCard() {
    var flat = readLinks();
    var groups = [];
    flat.forEach(function (l) {
      var g = groups.filter(function (x) { return x.title === l.group; })[0];
      if (!g) { g = { title: l.group, links: [] }; groups.push(g); }
      g.links.push({ icon: l.icon, label: l.label, sub: l.sub, url: l.url });
    });

    var footer = [];
    if (val("imprint")) footer.push({ label: "Impressum", url: val("imprint") });
    if (val("privacy")) footer.push({ label: "Datenschutz", url: val("privacy") });

    return {
      firstName: val("firstName"),
      lastName:  val("lastName"),
      role:      val("role"),
      company:   val("company"),
      bio:       val("bio"),
      logo:      "../../assets/img/logo.png",
      photo:     val("photo"),
      contact: {
        phone:    val("phone"),
        mobile:   val("mobile"),
        email:    val("email"),
        website:  val("website"),
        whatsapp: val("whatsapp"),
        address: { street: val("street"), zip: val("zip"), city: val("city"), country: val("country") }
      },
      groups: groups,
      footer: footer
    };
  }

  /* ---------- Datei-Text erzeugen ---------- */
  function q(s) { return JSON.stringify(s == null ? "" : String(s)); }

  function toFile(card, name) {
    var L = [];
    L.push("/* ---------------------------------------------------------------------------");
    L.push("   Kundenkarte" + (name ? ": " + name : "") + " – alle Daten dieser einen Karte.");
    L.push("   Erzeugt mit dem Karten-Editor. Nur diese Datei bearbeiten.");
    L.push("--------------------------------------------------------------------------- */");
    L.push("window.CARD = {");
    L.push("  firstName: " + q(card.firstName) + ",");
    L.push("  lastName:  " + q(card.lastName) + ",");
    L.push("  role:      " + q(card.role) + ",");
    L.push("  company:   " + q(card.company) + ",");
    L.push("  bio:       " + q(card.bio) + ",");
    L.push("  logo:      " + q(card.logo) + ",");
    L.push("  photo:     " + q(card.photo) + ",");
    L.push("");
    L.push("  contact: {");
    L.push("    phone:    " + q(card.contact.phone) + ",");
    L.push("    mobile:   " + q(card.contact.mobile) + ",");
    L.push("    email:    " + q(card.contact.email) + ",");
    L.push("    website:  " + q(card.contact.website) + ",");
    L.push("    whatsapp: " + q(card.contact.whatsapp) + ",");
    L.push("    address:  { street: " + q(card.contact.address.street) + ", zip: " + q(card.contact.address.zip) +
           ", city: " + q(card.contact.address.city) + ", country: " + q(card.contact.address.country) + " }");
    L.push("  },");
    L.push("");
    L.push("  groups: [");
    card.groups.forEach(function (g, gi) {
      L.push("    { title: " + q(g.title) + ", links: [");
      g.links.forEach(function (l, li) {
        L.push("      { icon: " + q(l.icon) + ", label: " + q(l.label) +
               (l.sub ? ", sub: " + q(l.sub) : "") + ", url: " + q(l.url) + " }" +
               (li < g.links.length - 1 ? "," : ""));
      });
      L.push("    ] }" + (gi < card.groups.length - 1 ? "," : ""));
    });
    L.push("  ],");
    L.push("");
    L.push("  footer: [");
    card.footer.forEach(function (f, i) {
      L.push("    { label: " + q(f.label) + ", url: " + q(f.url) + " }" + (i < card.footer.length - 1 ? "," : ""));
    });
    L.push("  ]");
    L.push("};");
    return L.join("\n") + "\n";
  }

  /* ---------- Aktualisieren ---------- */
  var timer;
  function update() {
    var card = buildCard();
    var name = [card.firstName, card.lastName].filter(Boolean).join(" ");
    var slug = val("slug") || slugify(name) || "kundenname";
    document.getElementById("finalUrl").textContent = "k/" + slug + "/";
    document.getElementById("pathHint").textContent = "k/" + slug + "/";
    out.value = toFile(card, name);

    clearTimeout(timer);
    timer = setTimeout(function () {
      if (preview.contentWindow) {
        preview.contentWindow.postMessage({ type: "card-preview", card: card }, "*");
      }
    }, 450);
  }

  form.addEventListener("input", update);
  form.addEventListener("change", update);
  linksBox.addEventListener("input", update);
  linksBox.addEventListener("change", update);
  document.getElementById("addLink").addEventListener("click", function () { linkRow({ group: "Direkt" }); update(); });

  /* ---------- Herunterladen / Kopieren ---------- */
  document.getElementById("download").addEventListener("click", function () {
    var blob = new Blob([out.value], { type: "text/javascript;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = "profil.js";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    toast("profil.js heruntergeladen");
  });

  document.getElementById("copy").addEventListener("click", function () {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(out.value).then(function () { toast("Text kopiert"); });
    } else {
      out.removeAttribute("readonly"); out.select(); document.execCommand("copy");
      out.setAttribute("readonly", ""); toast("Text kopiert");
    }
  });

  /* ---------- Bestehende Karte einlesen ---------- */
  var dlg = document.getElementById("loadDlg");
  document.getElementById("load").addEventListener("click", function () {
    document.getElementById("loadText").value = "";
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
  });
  document.getElementById("loadCancel").addEventListener("click", function () {
    if (dlg.close) dlg.close(); else dlg.removeAttribute("open");
  });
  document.getElementById("loadOk").addEventListener("click", function () {
    var text = document.getElementById("loadText").value;
    var card;
    try {
      card = new Function("var window = {}; " + text + " return window.CARD;")();
    } catch (e) { card = null; }
    if (!card) { toast("Konnte die Datei nicht lesen"); return; }
    fill(card);
    if (dlg.close) dlg.close(); else dlg.removeAttribute("open");
    toast("Karte eingelesen");
  });

  function fill(card) {
    var c = card.contact || {}, a = c.address || {};
    var set = function (n, v) { if (form.elements[n]) form.elements[n].value = v || ""; };
    set("firstName", card.firstName); set("lastName", card.lastName);
    set("role", card.role); set("company", card.company);
    set("bio", card.bio); set("photo", card.photo);
    set("phone", c.phone); set("mobile", c.mobile); set("email", c.email);
    set("website", c.website); set("whatsapp", c.whatsapp);
    set("street", a.street); set("zip", a.zip); set("city", a.city); set("country", a.country || "Deutschland");
    (card.footer || []).forEach(function (f) {
      if (/impressum/i.test(f.label)) set("imprint", f.url);
      if (/datenschutz/i.test(f.label)) set("privacy", f.url);
    });
    linksBox.innerHTML = "";
    (card.groups || []).forEach(function (g) {
      (g.links || []).forEach(function (l) {
        if (GRUPPEN.indexOf(g.title) === -1) GRUPPEN.push(g.title);
        linkRow({ group: g.title, icon: l.icon, label: l.label, sub: l.sub, url: l.url });
      });
    });
    update();
  }

  /* ---------- Toast ---------- */
  var tt;
  function toast(msg) {
    var el = document.getElementById("toast");
    el.textContent = msg; el.classList.add("on");
    clearTimeout(tt); tt = setTimeout(function () { el.classList.remove("on"); }, 2400);
  }

  /* ---------- Start ---------- */
  linkRow({ group: "Direkt", icon: "calendar", label: "Termin buchen" });
  linkRow({ group: "Profile", icon: "linkedin", label: "LinkedIn" });
  preview.addEventListener("load", update);
  update();
})();
