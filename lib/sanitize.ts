import sanitizeHtml from "sanitize-html";

const colorPattern = [/^#(0x)?[0-9a-f]+$/i, /^rgba?\([\d\s.,%]+\)$/i, /^[a-z]+$/i];

/**
 * Sanitize blog body HTML before it is stored and later rendered with
 * dangerouslySetInnerHTML. The allowlist matches what the Tiptap editor
 * produces (headings, lists, tables, links, images, code blocks with
 * lowlight span classes, text-align, highlight). Anything else — scripts,
 * event handlers, iframes, javascript: URLs — is stripped.
 */
export function sanitizeBlogHtml(dirty: string): string {
  if (!dirty) return "";
  return sanitizeHtml(dirty, {
    allowedTags: [
      "p", "br", "hr", "blockquote", "pre", "code", "span", "mark",
      "strong", "b", "em", "i", "u", "s", "del", "sup", "sub",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li",
      "a", "img",
      "table", "thead", "tbody", "tr", "th", "td", "colgroup", "col",
      "figure", "figcaption",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      span: ["class", "style"],
      code: ["class"],
      pre: ["class"],
      mark: ["class", "style", "data-color"],
      th: ["colspan", "rowspan", "align", "style"],
      td: ["colspan", "rowspan", "align", "style"],
      col: ["span", "style"],
      "*": ["class", "style"],
    },
    allowedStyles: {
      "*": {
        "text-align": [/^(left|right|center|justify)$/],
        "background-color": colorPattern,
        color: colorPattern,
      },
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["http", "https", "data"] },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer nofollow" }, true),
    },
  });
}
