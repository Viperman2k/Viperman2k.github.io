# DeDix – dedix.eu (STRATO + GitHub Pages)

> **Agent-Auftrag:** Dieses Dokument ist die Single Source of Truth für Firmen-Web/Infrastruktur (nicht MediPartner-App-Features).  
> **Start:** Erst ausführen, wenn `dedix.eu` im STRATO-Kundenlogin aktiv ist und DNS bearbeitbar ist.

## Kontext

| Thema | Wert |
|--------|------|
| Firma (amtlich) | DeDix Dennis Dittmann, Haydnstr. 9, 74821 Mosbach |
| Domain | **dedix.eu** – STRATO „Domainpaket .eu“ (Jahr 1: 2,40 €, danach 12 €/Jahr) |
| Inklusive | 1 Postfach, 20 E-Mail-Aliase, 10 Subdomains, Weiterleitung, DNS |
| Website | **GitHub Pages** – Repo `Viperman2k/Viperman2k.github.io` (User Pages, Branch `main`) |
| Kein STRATO-Webhosting | Nur DNS / Mail / Umleitungen |
| Bestehend | `dennis-dittmann.de` bei IONOS → später Redirect auf `https://dedix.eu` |
| Mail privat (bis @dedix.eu steht) | `dedix-support@online.de`, `kontakt@dennis-dittmann.de` |
| App | MediPartner, `com.medvitrine` – Repo `med_vitrine_v2`, `lib/constants/legal_urls.dart` |

## Phase A – STRATO DNS für GitHub Pages

Quelle: [GitHub – Apex domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)

### Apex `dedix.eu` – 4× A

| Typ | Host | Ziel |
|-----|------|------|
| A | `@` (Root) | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Optional IPv6 – 4× AAAA laut gleicher GitHub-Doku.

### `www.dedix.eu`

| Typ | Host | Ziel |
|-----|------|------|
| CNAME | `www` | `viperman2k.github.io` |

- STRATO-Parkplatz-/Webhosting-Einträge für `@`/`www` entfernen oder ersetzen.
- DNS-Propagation: 15 Min – 48 h.

## Phase B – GitHub

1. Repo **Viperman2k.github.io** → **Settings → Pages → Custom domain:** `dedix.eu`
2. **Enforce HTTPS** aktivieren (Zertifikat kann Stunden dauern).
3. Optional Root-Datei `CNAME` mit Inhalt `dedix.eu` (GitHub legt sie oft automatisch an).

## Phase C – Weiterleitungen (STRATO)

| Subdomain | Ziel (Beispiel) |
|-----------|------------------|
| `medipartner.dedix.eu` | Play Store: `https://play.google.com/store/apps/details?id=com.medvitrine` oder `/projekte/medipartner/` |
| (später) | `dennis-dittmann.de` → `https://dedix.eu` (IONOS) |

301 (dauerhaft) für Lesezeichen.

## Phase D – E-Mail (STRATO)

1. Ein Postfach anlegen (z. B. `info@dedix.eu`).
2. Aliase: `kontakt@`, `support@`, `support-medipartner@`, `dennis-dittmann@` → dasselbe Postfach **oder** Weiterleitung → `dedix-support@online.de`.
3. Impressum/Play Store erst auf `@dedix.eu` umstellen, wenn Weiterleitung/Postfach getestet ist.

## Phase E – URLs im Code / Website

### Repo `Viperman2k.github.io`

- Canonical-Links in `impressum.html`, `datenschutz.html`, `projekte/medipartner/*` von `viperman2k.github.io` auf `https://dedix.eu/...` umstellen.
- Interne Links prüfen (`index.html`, `projekte.html`, `kontakt.html`).

### Repo `med_vitrine_v2`

- `lib/constants/legal_urls.dart` – Provider-URLs auf `dedix.eu` wenn live.
- Play Console, D-U-N-S (Website-Feld), Marketing-Docs bei Bedarf.

## Checkliste „fertig“

- [ ] `https://dedix.eu` lädt GitHub-Seite, HTTPS grün
- [ ] `https://www.dedix.eu` ok (Redirect oder gleiche Seite)
- [ ] Test-Mail an `kontakt@dedix.eu` ankommt
- [ ] `medipartner.dedix.eu` Redirect ok
- [ ] Impressum/Datenschutz canonical auf dedix.eu
- [ ] App/Store URLs aktualisiert

## Erste Nachricht an Agent (wenn STRATO steht)

```text
@docs/DEDIX-EU-SETUP.md STRATO ist aktiv – bitte Phase A–E der Reihe nach abarbeiten. Bei DNS Screenshots/Fehlern mit mir klären.
```

## Dateien mit URL-Anpassung

Stand: Repo-Grep nach `viperman2k.github.io`, `dennis-dittmann.de` und Legal-/Canonical-URLs.  
**Ziel-URLs (Phase E, nach HTTPS auf `dedix.eu`):**

| Alt | Neu |
|-----|-----|
| `https://viperman2k.github.io/projekte/medipartner/datenschutz.html` | `https://dedix.eu/projekte/medipartner/datenschutz.html` |
| `https://viperman2k.github.io/projekte/medipartner/impressum.html` | `https://dedix.eu/projekte/medipartner/impressum.html` |
| `https://viperman2k.github.io/datenschutz.html` | `https://dedix.eu/datenschutz.html` (Root-Redirect bleibt) |

**Manuell (keine Datei im Repo):** Google Play Console (Datenschutz-URL), D-U-N-S-/Payments-Website-Feld — siehe `med_vitrine_v2/docs/GEWERBE-DEDIX-CHECKLISTE.md`, `docs/DUNS-BEANTRAGUNG.md`.

### Repo `Viperman2k.github.io` (5 Dateien)

| Datei | Zeilen / Hinweis |
|-------|------------------|
| `impressum.html` | **L6** `link rel="canonical"` → `https://dedix.eu/projekte/medipartner/impressum.html` |
| `datenschutz.html` | **L6** `link rel="canonical"` → `https://dedix.eu/projekte/medipartner/datenschutz.html` |
| `projekte/medipartner/impressum.html` | **L32** `kontakt@dennis-dittmann.de` → erst nach **Phase D** (Mail getestet) z. B. `kontakt@dedix.eu`; optional **`<head>`** Canonical ergänzen |
| `projekte/medipartner/datenschutz.html` | **L33** E-Mail wie Impressum; optional Canonical |
| `kontakt.html` | **L44** `mailto:` / Button-Text → `@dedix.eu` nach Phase D |

Interne Navigation (`index.html`, `projekte.html`, `projekte/medipartner/index.html`) nutzt **relative** Pfade — nach Custom Domain keine Pflichtänderung.

`docs/DEDIX-EU-SETUP.md` **L38** (`CNAME` → `viperman2k.github.io`) ist **DNS-Ziel**, kein Seiten-URL-Tausch.

### Repo `med_vitrine_v2` (6 Dateien)

| Datei | Zeilen / Hinweis |
|-------|------------------|
| `lib/constants/legal_urls.dart` | **L6–9** `privacyPolicy`, `impressumWeb` → `dedix.eu`; **L19** `contactEmail` nach Phase D |
| `impressum.html` (Repo-Root, Redirect-Stub) | **L5–6, L10** Refresh, Canonical und Link-Text von GitHub Pages auf `dedix.eu` |
| `datenschutz.html` (Repo-Root) | **L5–6, L10** wie Impressum-Stub |
| `marketing/playstore/LISTING-production.txt` | **L14, L18** Store-Listing-URLs |
| `marketing/playstore/ANLEITUNG.md` | **L4** Datenschutzrichtlinie-URL |
| `marketing/LAUNCH-PLAN.md` | **L19** Checkliste Datenschutz-URL |

Keine Treffer in `lib/screens/impressum_screen.dart` / `settings_screen.dart` — URLs kommen aus `LegalUrls`.

**Nicht umstellen (nur lokaler Pfad):** `tool/generate_*_screenshots.ps1`, `tool/generate_marketing_one.ps1` (Verweis auf Website-Ordner `Viperman2k.github.io`, keine öffentliche URL).

### Zählung

| Kategorie | Anzahl Dateien |
|-----------|----------------|
| HTTP(S)-Canonical / Legal-URLs (Phase E) | **8** (2 Website + 6 App) |
| Zusätzlich E-Mail `@dennis-dittmann.de` (Phase D) | **+3** Website (Impressum/Datenschutz/Kontakt; `legal_urls.dart` bereits in App-Zählung) |
| **Summe eindeutige Dateien mit Anpassungsbedarf** | **11** |
