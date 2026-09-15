# Digitale Visitenkarten (Dune-Stil)

Eine Seite pro Kunde. Jede Karte zeigt nur die Daten dieses einen Kunden,
liegt unter einer eigenen Adresse und lässt sich auf eine NFC-Karte oder einen
QR-Code schreiben. Kein Server, keine Datenbank, keine laufenden Kosten –
nur Dateien, die GitHub Pages kostenlos ausliefert.

Funktionsumfang wie unit.link: Profil, Schnellkontakt, gruppierte Links,
„Kontakt speichern" als `.vcf`, Teilen, QR-Code.

## Ordner

```
index.html                 leitet auf die eigene Karte weiter
k/kira/                    eigene Karte
k/demo-kunde/              Beispielkunde (zeigt eigene Markenfarben)
k/_vorlage/                Vorlage – bleibt unangetastet
tools/neue-karte.py        legt neue Kundenkarten an
assets/css/style.css       Design
assets/js/app.js           Technik (vCard, Teilen, QR, Farben)
assets/js/brand.js         Signatur in der Fußzeile ALLER Karten
assets/js/vendor/          QR-Bibliothek, lokal
assets/img/                Logo, Favicon
```

Jede Karte ist ein Ordner mit genau zwei Dateien: `index.html` (unverändert)
und `profil.js` (die Daten). Ein Kunde kann die Daten anderer Kunden nicht
sehen – seine Seite lädt nur seine eigene Datei.

## Neue Kundenkarte anlegen

```bash
python3 tools/neue-karte.py "Lena Harkonnen" \
  --firma "Atelier Nord" --rolle "Inhaberin" \
  --mail hallo@atelier-nord.de --mobil "+49 170 1234567"
```

Ergebnis: `k/lena-harkonnen/`. Danach `profil.js` fertig ausfüllen (Links,
Kurztext, Farben), committen, pushen. Zwei Minuten später ist die Karte live
unter `https://DEINE-DOMAIN/k/lena-harkonnen/`.

### Was in `profil.js` steht

| Feld | Bedeutung |
|---|---|
| `firstName`, `lastName`, `role`, `company` | Kopf der Karte und Adressbuch-Eintrag |
| `tagline`, `bio` | Kursivzeile und Kurztext |
| `logo`, `photo` | Dateien in denselben Ordner legen, Name hier eintragen |
| `contact` | Telefon, Mobil, E-Mail, Website, WhatsApp, Adresse – landen in der `.vcf` |
| `groups` | beliebig viele Blöcke mit beliebig vielen Links |
| `theme` | optionale Markenfarben des Kunden |
| `footer` | Impressum, Datenschutz |

Leere Felder verschwinden automatisch – eine Karte ohne WhatsApp zeigt keinen
WhatsApp-Knopf.

### Farben eines Kunden

```js
theme: { ember: "#3F8F86", emberHi: "#7FD6CF", sand: "#EAF4F3" },
```

`ember` ist die Hauptfarbe: Knopf, Symbole, Dünen und Horizontlicht rechnen
sich daraus ab. Weglassen = Dune-Standard in Schwarz und Glut-Orange.
Weitere mögliche Schlüssel: `black` (Hintergrund), `deep`, `sand` (Textfarbe),
`sandDim` (Nebentext).

## Physische Karte mit der Seite verbinden

Zwei Wege, beide funktionieren gleichzeitig:

**NFC-Chip beschreiben.** Die meisten Blanko-Karten enthalten einen NTAG-Chip,
der sich mit einer App wie „NFC Tools" beschreiben lässt: *Schreiben* →
*Datensatz hinzufügen* → *URL* → `https://DEINE-DOMAIN/k/kundenname/` →
*Schreiben*. Anschließend Karte ans Handy halten und prüfen. Wenn die App
danach „schreibgeschützt" anbietet: erst sperren, wenn die Adresse endgültig
ist – ein gesperrter Chip lässt sich nicht mehr ändern.

Zwei Dinge musst du an deinen Karten selbst prüfen, ich kenne sie nicht:
ob der Chip beschreibbar oder ab Werk auf einen Anbieter gesperrt ist, und
welchen Chiptyp er hat (davon hängt ab, wie lang die Adresse sein darf –
kurze Adressen wie oben sind unkritisch).

**QR-Code aufdrucken.** Die Karte selbst zeigt ihren QR-Code über den Knopf
*QR-Code*; für den Druck erzeugst du ihn mit einem beliebigen QR-Generator aus
derselben Adresse. Der QR-Code funktioniert auf jedem Handy, auch ohne NFC.

Wichtig: Der Chip speichert nur die Adresse, nicht die Daten. Ändert ein Kunde
seine Telefonnummer, änderst du `profil.js` – die Karte in seiner Tasche bleibt
unverändert und zeigt sofort das Neue. Umgekehrt gilt: Die Adresse darf sich
nie ändern, sonst zeigen verkaufte Karten ins Leere.

## Veröffentlichen (GitHub Pages)

1. Repository → **Settings** → **Pages**
2. *Source*: „Deploy from a branch", Branch dieses Codes, Ordner `/ (root)`
3. Eigene Domain: unter *Custom domain* eintragen und beim Domain-Anbieter
   einen CNAME auf `<benutzername>.github.io` setzen.

Eine kurze eigene Domain ist beim Verkauf mehr wert als die lange
github.io-Adresse – die Adresse steht dauerhaft auf der Karte des Kunden.

## Lokal ansehen

```bash
python3 -m http.server 8080
# http://localhost:8080/k/demo-kunde/
```

## Grenzen (bewusst so gebaut)

- Kunden können ihre Daten **nicht selbst ändern**; jede Änderung läuft über
  dich. Für Selbstbedienung bräuchte es ein Login und eine Datenbank – das ist
  ein eigener Schritt, kein Nachziehen an dieser Seite.
- Es gibt **keine Statistik**, wie oft eine Karte geöffnet wurde.
- Alle Kundendaten liegen in einem öffentlichen Repository. Was nicht auf der
  Karte stehen darf, gehört auch nicht in `profil.js`.
