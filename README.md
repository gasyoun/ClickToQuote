# ClickToQuote

_Created: 14-06-2026 · Last updated: 11-07-2026_

A lightweight JavaScript utility that lets users click any dictionary entry to instantly copy a formatted bibliography citation to their clipboard. Built for the digital HTML edition of the *Kossovich Sanskrit–Russian Dictionary* ([`kossovich_dict.htm`](https://github.com/gasyoun/ClickToQuote/blob/master/kossovich_dict.htm), 2016 reprint).

---

## Features

- **One-click citation copying** — click any entry to copy a ready-to-paste citation
- **Two citation formats** — short `(Коссович 2016: N)` and long (full bibliographic record with Devanagari + IAST)
- **Modern Clipboard API** — uses `navigator.clipboard.writeText()`, no deprecated `execCommand`
- **Visual feedback** — a brief green outline confirms the copy succeeded
- **Event delegation** — a single listener handles the whole document; no inline `onclick` attributes needed
- **Zero dependencies** — plain JavaScript, no frameworks or build step required

---

## Installation

1. Copy [`scripts/clicktoquote.js`](https://github.com/gasyoun/ClickToQuote/blob/master/scripts/clicktoquote.js) and the [font files](https://github.com/gasyoun/ClickToQuote/tree/master/fonts) into your project.

2. Add the script to your HTML `<head>`:

```html
<script type="text/javascript" src="./scripts/clicktoquote.js"></script>
```

3. Add the feedback style to your stylesheet (or inside a `<style>` tag):

```css
p.stk.copied,
p.sa.copied {
  outline: 2px solid #4caf50;
  transition: outline 0.2s ease;
}
```

That's it — no extra HTML elements required.

---

## Usage

Mark up your dictionary entries with the appropriate CSS classes. The script detects clicks automatically via event delegation.

### Short citation — `p.stk`

Copies the format: `(Коссович 2016: {column number})`

```html
<p class="stk">42</p>
```

### Long citation — `p.sa`

Copies the full bibliographic record with Devanagari script and IAST transliteration:

```html
<div>
  <p class="stk">42</p>           <!-- column number, sibling above -->
  <div>
    <p class="sa">
      <span>देव</span>            <!-- Devanagari -->
      <span>/deva/</span>         <!-- IAST (slashes are stripped automatically) -->
    </p>
  </div>
</div>
```

The script walks the DOM to find the column number and both script forms, then assembles the citation string.

---

## Citation Templates

| Type | Output |
|------|--------|
| Short | `(Коссович 2016: 42)` |
| Long | `देव deva // Коссович К. А. Санскрито-русский словарь / … — стлб. 42."` |

Templates are defined as constants at the top of [`clicktoquote.js`](https://github.com/gasyoun/ClickToQuote/blob/master/scripts/clicktoquote.js) and are easy to adapt for other dictionaries or citation styles.

---

## Browser Support

Requires the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText), supported in all modern browsers. If the clipboard write fails (e.g. due to missing permissions), an error is logged to the browser console and no exception is thrown.

---

## Project Structure

```
ClickToQuote/
├── fonts/                  # Fonts used by the dictionary layout
├── scripts/
│   └── clicktoquote.js     # Core click-to-quote logic
├── koss_style.css           # Dictionary stylesheet (add .copied rule here)
├── kossovich_dict.htm       # The full digital dictionary
└── README.md
```

---

## License

MIT — see [LICENSE](https://github.com/gasyoun/ClickToQuote/blob/master/LICENSE) for details. Copyright (c) 2020 Lidia Zaikova, the original author; this repository is a maintained fork of [lidazaikova/ClickToQuote](https://github.com/lidazaikova/ClickToQuote).

_Dr. Mārcis Gasūns_
