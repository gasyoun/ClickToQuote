// clicktoquote.js
(function () {
  "use strict";

  const SHORT_TEMPLATE = "(Коссович 2016: {numberColumn})";
  const LONG_TEMPLATE =
    '// Коссович К. А. Санскрито-русский словарь / 3-е изд., пред. А. А. Вигасина, ' +
    'испр. и доп. М. Ю. Гасунса. — М.: «АБВ», 2016. — ' +
    '(серия „Bibliotheca Sanscritica", 10). — стлб. {numberColumn}."';

  function fillTemplate(template, numberColumn) {
    return template.replace("{numberColumn}", numberColumn);
  }

  async function copyToClipboard(text, sourceElement) {
    try {
      await navigator.clipboard.writeText(text);
      flashCopied(sourceElement);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }

  function flashCopied(el) {
    el.classList.add("copied");
    setTimeout(() => el.classList.remove("copied"), 1500);
  }

  function handleShortCopy(el) {
    const numberColumn = el.innerText;
    const text = fillTemplate(SHORT_TEMPLATE, numberColumn);
    copyToClipboard(text, el);
  }

  function handleLongCopy(el) {
    const numberColumn =
      el.parentElement.parentElement.previousSibling.textContent;
    const par = el.parentElement;
    const dev = par.children[0].textContent;
    const iast = par.children[1].textContent.replace(/\//g, "");
    const text = dev + " " + iast + " " + fillTemplate(LONG_TEMPLATE, numberColumn);
    copyToClipboard(text, el);
  }

  // Single delegated listener instead of inline onclick on every element
  document.addEventListener("click", function (e) {
    const target = e.target;
    if (target.matches("p.stk")) handleShortCopy(target);
    else if (target.matches("p.sa")) handleLongCopy(target);
  });
})();
