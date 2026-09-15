#!/usr/bin/env python3
"""
Legt eine neue Kundenkarte an.

    python3 tools/neue-karte.py "Lena Harkonnen"
    python3 tools/neue-karte.py "Lena Harkonnen" --firma "Atelier Nord" \
        --rolle "Inhaberin" --mail lena@firma.de --mobil "+49 170 1234567"

Ergebnis: Ordner k/<name>/ mit index.html und profil.js.
Danach nur noch profil.js ausfuellen, committen, fertig.
"""
import argparse
import re
import shutil
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VORLAGE = ROOT / "k" / "_vorlage"


def slugify(text: str) -> str:
    text = text.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue")
    text = text.replace("Ä", "ae").replace("Ö", "oe").replace("Ü", "ue").replace("ß", "ss")
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower()
    return text or "karte"


def setze(inhalt: str, feld: str, wert: str) -> str:
    """Ersetzt den Wert eines Feldes in profil.js, Formatierung bleibt erhalten."""
    wert = wert.replace("\\", "\\\\").replace('"', '\\"')
    muster = re.compile(r'(^\s*%s:\s*)"[^"]*"' % re.escape(feld), re.M)
    return muster.sub(lambda m: '%s"%s"' % (m.group(1), wert), inhalt, count=1)


def main() -> int:
    ap = argparse.ArgumentParser(description="Neue Kundenkarte anlegen")
    ap.add_argument("name", help='Voller Name, z. B. "Lena Harkonnen"')
    ap.add_argument("--slug", help="Adresse der Karte, sonst aus dem Namen abgeleitet")
    ap.add_argument("--firma", default="")
    ap.add_argument("--rolle", default="")
    ap.add_argument("--mail", default="")
    ap.add_argument("--mobil", default="")
    ap.add_argument("--telefon", default="")
    ap.add_argument("--website", default="")
    ap.add_argument("--ueberschreiben", action="store_true", help="vorhandenen Ordner ersetzen")
    a = ap.parse_args()

    if not VORLAGE.is_dir():
        print("Vorlage fehlt: %s" % VORLAGE, file=sys.stderr)
        return 1

    teile = a.name.split()
    vorname = teile[0] if teile else a.name
    nachname = " ".join(teile[1:])
    slug = slugify(a.slug or a.name)
    ziel = ROOT / "k" / slug

    if ziel.exists():
        if not a.ueberschreiben:
            print("Ordner existiert bereits: k/%s  (mit --ueberschreiben erzwingen)" % slug, file=sys.stderr)
            return 1
        shutil.rmtree(ziel)

    shutil.copytree(VORLAGE, ziel)

    profil = ziel / "profil.js"
    inhalt = profil.read_text(encoding="utf-8")
    inhalt = inhalt.replace(
        "/* ---------------------------------------------------------------------------\n"
        "   Kundenkarte – alle Daten dieser einen Karte.",
        "/* ---------------------------------------------------------------------------\n"
        "   Kundenkarte: %s – alle Daten dieser einen Karte." % a.name,
    )
    for feld, wert in (
        ("firstName", vorname), ("lastName", nachname), ("role", a.rolle),
        ("company", a.firma), ("email", a.mail), ("mobile", a.mobil),
        ("phone", a.telefon), ("website", a.website),
    ):
        inhalt = setze(inhalt, feld, wert)
    profil.write_text(inhalt, encoding="utf-8")

    print("Karte angelegt: k/%s/" % slug)
    print("  1. Daten ergaenzen:   k/%s/profil.js" % slug)
    print("  2. Veroeffentlichen:  git add k/%s && git commit -m 'Karte %s' && git push" % (slug, a.name))
    print("  3. Adresse fuer NFC-Chip und QR-Code:  https://DEINE-DOMAIN/k/%s/" % slug)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
