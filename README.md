# Digitale Visitenkarte (Dune-Style)

Eine statische Kontaktseite im Stil einer digitalen Visitenkarte – funktional
vergleichbar mit unit.link: Profil, Schnellkontakt, gruppierte Links,
„Kontakt speichern" als `.vcf`, Teilen-Funktion und QR-Code.
Kein Server, kein Build, keine Datenbank – reines HTML/CSS/JS.

## Was drin ist

| Funktion | Verhalten |
|---|---|
| Kontakt speichern | erzeugt im Browser eine vCard 3.0 (`.vcf`) und lädt sie herunter → landet im Adressbuch |
| Schnellaktionen | Anrufen, E-Mail, WhatsApp, Website – erscheinen nur, wenn Daten hinterlegt sind |
| Linkgruppen | beliebig viele Gruppen mit beliebig vielen Links |
| Teilen | nutzt die Teilen-Funktion des Handys, sonst Link in die Zwischenablage |
| QR-Code | zeigt die aktuelle Adresse als QR-Code zum Abscannen |
| Mehrere Karten | eine Datei, mehrere Personen: `?k=<schluessel>` |

## Daten ändern

Alles steht in **`assets/js/profiles.js`**. Dort Name, Rolle, Telefon, E-Mail,
Links und Fußzeile eintragen. Der Eintrag unter `default` wird angezeigt, wenn
keine Karte in der Adresse steht.

Zweite Karte anlegen: Block kopieren, neuen Schlüssel vergeben, aufrufen über
`https://deine-domain.de/?k=team`.

Noch als Platzhalter hinterlegt und zu ersetzen: Telefonnummer, E-Mail,
Website, Termin-Link, Social-Profile, Impressum und Datenschutz.

## Veröffentlichen (GitHub Pages)

1. Repository → **Settings** → **Pages**
2. *Source*: „Deploy from a branch", Branch: der Branch dieses Codes, Ordner `/ (root)`
3. Nach ein bis zwei Minuten ist die Seite unter der angezeigten Adresse erreichbar.

Die Datei `.nojekyll` sorgt dafür, dass GitHub die Dateien unverändert ausliefert.

## Lokal ansehen

```bash
python3 -m http.server 8080
# danach http://localhost:8080 öffnen
```

## Aufbau

```
index.html                 Gerüst der Seite
assets/css/style.css       Design (Dune: Schwarz, Sand, Glut, Dünenkämme, Sandkorn)
assets/js/profiles.js      >>> DEINE DATEN <<<
assets/js/app.js           Rendering, vCard, Teilen, QR
assets/img/logo.png        Markenlogo (weiß freigestellt)
```

## Hinweise

- Der QR-Code wird von der mitgelieferten Bibliothek `assets/js/vendor/qrcode.min.js`
  erzeugt – kein externer Dienst, funktioniert auch offline.
- Die Schriften kommen von Google Fonts; ohne Internet greift automatisch die
  Systemschrift.
- Die Dünen-Kulisse ist vollständig aus CSS und SVG erzeugt – keine fremden
  Bilddateien, daher keine Lizenzfragen und schnelle Ladezeit.
