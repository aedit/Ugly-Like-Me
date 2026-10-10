// Generates every theme in ./themes from the variants below.
// Edit colours here, then run `npm run build`. Never edit themes/*.json by hand.
const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// Variants
// Each variant fills the same set of roles, so all rules below are shared.
// `syntax` colours must stay readable on `editorBg` (check with `npm run check`).
// ---------------------------------------------------------------------------
const variants = [
  {
    name: "Ugly Like Me",
    file: "ugly-like-me-color-theme.json",
    type: "dark",
    ui: {
      editorBg: "#4A3F29", // bog brown
      editorFg: "#FFF84F", // bile yellow
      lineHighlight: "#5E1F4A",
      selection: "#FF2E9366",
      cursor: "#86FF64",
      lineNumber: "#B9C1AA",
      lineNumberActive: "#FF2E93",
      titleBg: "#FF2E93", // hot pink
      titleFg: "#0D042F",
      activityBg: "#86FF64", // radioactive lime
      activityFg: "#851287",
      badgeBg: "#DA0428",
      badgeFg: "#FFFFFF",
      sideBg: "#851287", // bruise purple
      sideFg: "#C8F1C7",
      sideTitleFg: "#FFF84F",
      tabActiveBg: "#FFF84F",
      tabActiveFg: "#0D042F",
      tabInactiveBg: "#17646E", // swamp teal
      tabInactiveFg: "#FFFFFF",
      tabBarBg: "#320059",
      statusBg: "#FF6A00", // traffic-cone orange
      statusFg: "#0D042F",
      panelBg: "#0D042F",
      panelFg: "#86FF64",
      border: "#DA0428",
      inputBg: "#C8F1C7",
      inputFg: "#320059",
      buttonBg: "#DA0428",
      buttonFg: "#FFF84F",
      scrollbar: "#FF2E9380",
      error: "#FF2E2E",
      warning: "#3DF5FF",
      info: "#FBB903",
    },
    syntax: {
      comment: "#FF85D0",
      keyword: "#3DF5FF",
      storage: "#3DF5FF",
      operator: "#A8D86E",
      string: "#86FF64",
      number: "#FBB903",
      variable: "#FF8C69",
      parameter: "#FBB903",
      func: "#D59BFF",
      type: "#ECB980",
      tag: "#86FF64",
      attribute: "#FBB903",
      property: "#C8F1C7",
      regexp: "#A8D86E",
      invalid: "#FFFFFF",
      heading: "#FF85D0",
      link: "#3DF5FF",
      inserted: "#86FF64",
      deleted: "#FF9494",
      changed: "#FBB903",
      // Cycled through for nested JSON keys and bracket pairs
      rainbow: [
        "#FF85D0",
        "#86FF64",
        "#FBB903",
        "#3DF5FF",
        "#D59BFF",
        "#FF8C69",
      ],
    },
    terminal: {
      black: "#0D042F",
      red: "#DA0428",
      green: "#86FF64",
      yellow: "#FFF84F",
      blue: "#3D5AFE",
      magenta: "#FF2E93",
      cyan: "#3DF5FF",
      white: "#C8F1C7",
      brightBlack: "#57594E",
      brightRed: "#FF2E2E",
      brightGreen: "#B6FF9E",
      brightYellow: "#FBB903",
      brightBlue: "#8C9EFF",
      brightMagenta: "#D59BFF",
      brightCyan: "#A0FFFF",
      brightWhite: "#FFFFFF",
    },
    // Font styles get uglier per variant
    loud: "italic bold underline",
  },
  {
    // Tribute to the Windows 3.1 "Hot Dog Stand" colour scheme
    name: "Ugly Like Me: Hot Dog Stand",
    file: "hot-dog-stand-color-theme.json",
    type: "light",
    ui: {
      editorBg: "#FFFF00",
      editorFg: "#000000",
      lineHighlight: "#FFD000",
      selection: "#FF000055",
      cursor: "#FF0000",
      lineNumber: "#A00000",
      lineNumberActive: "#000000",
      titleBg: "#FF0000",
      titleFg: "#FFFFFF",
      activityBg: "#FF0000",
      activityFg: "#FFFF00",
      badgeBg: "#000000",
      badgeFg: "#FFFF00",
      sideBg: "#FF0000",
      sideFg: "#FFFFFF",
      sideTitleFg: "#FFFF00",
      tabActiveBg: "#FFFF00",
      tabActiveFg: "#000000",
      tabInactiveBg: "#FF0000",
      tabInactiveFg: "#FFFFFF",
      tabBarBg: "#C00000",
      statusBg: "#000000",
      statusFg: "#FFFF00",
      panelBg: "#FF0000",
      panelFg: "#FFFFFF",
      border: "#000000",
      inputBg: "#FFFFFF",
      inputFg: "#000000",
      buttonBg: "#000000",
      buttonFg: "#FFFF00",
      scrollbar: "#00000080",
      error: "#C00000",
      warning: "#0000C0",
      info: "#006000",
    },
    syntax: {
      comment: "#9A0000",
      keyword: "#C00000",
      storage: "#C00000",
      operator: "#000000",
      string: "#0000A0",
      number: "#7A007A",
      variable: "#000000",
      parameter: "#7A3D00",
      func: "#C00000",
      type: "#005A00",
      tag: "#C00000",
      attribute: "#7A3D00",
      property: "#0000A0",
      regexp: "#7A007A",
      invalid: "#000000",
      heading: "#C00000",
      link: "#0000A0",
      inserted: "#005A00",
      deleted: "#C00000",
      changed: "#7A3D00",
      rainbow: [
        "#C00000",
        "#0000A0",
        "#005A00",
        "#7A007A",
        "#7A3D00",
        "#000000",
      ],
    },
    terminal: {
      black: "#000000",
      red: "#C00000",
      green: "#005A00",
      yellow: "#7A3D00",
      blue: "#0000A0",
      magenta: "#7A007A",
      cyan: "#005A5A",
      white: "#FFFFFF",
      brightBlack: "#404040",
      brightRed: "#FF0000",
      brightGreen: "#008000",
      brightYellow: "#A05000",
      brightBlue: "#0000FF",
      brightMagenta: "#A000A0",
      brightCyan: "#007070",
      brightWhite: "#FFFFFF",
    },
    loud: "italic bold underline strikethrough",
  },
];

// ---------------------------------------------------------------------------
// Workbench (UI) colours
// ---------------------------------------------------------------------------
function uiColors({ ui, syntax, terminal }) {
  const c = {
    // Editor
    "editor.background": ui.editorBg,
    "editor.foreground": ui.editorFg,
    "editor.lineHighlightBackground": ui.lineHighlight,
    "editor.selectionBackground": ui.selection,
    "editorCursor.foreground": ui.cursor,
    "editorLineNumber.foreground": ui.lineNumber,
    "editorLineNumber.activeForeground": ui.lineNumberActive,
    "editorIndentGuide.background1": ui.border,
    "editorIndentGuide.activeBackground1": ui.cursor,
    "editorWhitespace.foreground": ui.lineNumber,
    "editorError.foreground": ui.error,
    "editorWarning.foreground": ui.warning,
    "editorInfo.foreground": ui.info,
    "editorGutter.addedBackground": syntax.inserted,
    "editorGutter.deletedBackground": syntax.deleted,
    "editorGutter.modifiedBackground": syntax.changed,

    // Title bar
    "titleBar.activeBackground": ui.titleBg,
    "titleBar.activeForeground": ui.titleFg,
    "titleBar.inactiveBackground": ui.titleBg,
    "titleBar.inactiveForeground": ui.titleFg,

    // Activity bar
    "activityBar.background": ui.activityBg,
    "activityBar.foreground": ui.activityFg,
    "activityBar.inactiveForeground": ui.activityFg + "99",
    "activityBarBadge.background": ui.badgeBg,
    "activityBarBadge.foreground": ui.badgeFg,
    "badge.background": ui.badgeBg,
    "badge.foreground": ui.badgeFg,

    // Side bar
    "sideBar.background": ui.sideBg,
    "sideBar.foreground": ui.sideFg,
    "sideBarTitle.foreground": ui.sideTitleFg,
    "sideBarSectionHeader.background": ui.tabInactiveBg,
    "sideBarSectionHeader.foreground": ui.tabInactiveFg,
    "list.activeSelectionBackground": ui.tabActiveBg,
    "list.activeSelectionForeground": ui.tabActiveFg,
    "list.hoverBackground": ui.lineHighlight,
    "list.hoverForeground": ui.editorFg,

    // Tabs
    "editorGroupHeader.tabsBackground": ui.tabBarBg,
    "tab.activeBackground": ui.tabActiveBg,
    "tab.activeForeground": ui.tabActiveFg,
    "tab.inactiveBackground": ui.tabInactiveBg,
    "tab.inactiveForeground": ui.tabInactiveFg,
    "tab.border": ui.border,
    "tab.activeBorderTop": ui.border,

    // Status bar
    "statusBar.background": ui.statusBg,
    "statusBar.foreground": ui.statusFg,
    "statusBar.noFolderBackground": ui.statusBg,
    "statusBar.debuggingBackground": ui.badgeBg,
    "statusBar.debuggingForeground": ui.badgeFg,

    // Panel and terminal
    "panel.background": ui.panelBg,
    "panel.border": ui.border,
    "panelTitle.activeForeground": ui.panelFg,
    "terminal.background": ui.panelBg,
    "terminal.foreground": ui.panelFg,

    // Inputs, buttons, misc
    "input.background": ui.inputBg,
    "input.foreground": ui.inputFg,
    "dropdown.background": ui.inputBg,
    "dropdown.foreground": ui.inputFg,
    "button.background": ui.buttonBg,
    "button.foreground": ui.buttonFg,
    focusBorder: ui.border,
    "scrollbarSlider.background": ui.scrollbar,
    "scrollbarSlider.hoverBackground": ui.cursor,
    "scrollbarSlider.activeBackground": ui.border,
    "minimap.background": ui.tabBarBg,
  };

  syntax.rainbow.forEach((color, i) => {
    c[`editorBracketHighlight.foreground${i + 1}`] = color;
  });

  for (const [name, color] of Object.entries(terminal)) {
    c[`terminal.ansi${name[0].toUpperCase()}${name.slice(1)}`] = color;
  }

  return c;
}

// ---------------------------------------------------------------------------
// TextMate token rules (later rules win when scopes tie)
// ---------------------------------------------------------------------------
function tokenColors({ syntax: s, loud }) {
  const rule = (name, scope, foreground, fontStyle) => ({
    name,
    scope,
    settings: {
      ...(foreground && { foreground }),
      ...(fontStyle && { fontStyle }),
    },
  });

  const jsonKey = "source.json meta.structure.dictionary.json";
  const jsonNest =
    " meta.structure.dictionary.value.json meta.structure.dictionary.json";
  const jsonKeys = s.rainbow.map((color, depth) =>
    rule(
      `JSON Key - Level ${depth}`,
      [jsonKey + jsonNest.repeat(depth) + " support.type.property-name.json"],
      color,
    ),
  );

  return [
    rule(
      "Comment",
      ["comment", "punctuation.definition.comment"],
      s.comment,
      loud,
    ),
    rule("Keyword", ["keyword", "keyword.control"], s.keyword),
    rule("Storage", ["storage.type", "storage.modifier"], s.storage, "italic"),
    rule(
      "Operator, Punctuation",
      ["keyword.operator", "punctuation", "meta.brace"],
      s.operator,
    ),
    rule(
      "String",
      ["string", "constant.other.symbol", "string constant.other.placeholder"],
      s.string,
    ),
    rule(
      "Escape, Regexp",
      ["constant.character.escape", "string.regexp"],
      s.regexp,
      "bold",
    ),
    rule(
      "Number, Constant",
      [
        "constant.numeric",
        "constant.language",
        "constant.character",
        "support.constant",
        "keyword.other.unit",
      ],
      s.number,
    ),
    rule("Colors", ["constant.other.color"], s.number, "underline"),
    rule("Variable", ["variable", "support.other.variable"], s.variable),
    rule(
      "Language Variable (this, self)",
      ["variable.language"],
      s.keyword,
      loud,
    ),
    rule("Parameter", ["variable.parameter"], s.parameter, "italic"),
    rule(
      "Function",
      [
        "entity.name.function",
        "meta.function-call",
        "variable.function",
        "support.function",
        "keyword.other.special-method",
      ],
      s.func,
      "bold",
    ),
    rule(
      "Method Definition",
      ["entity.name.method", "meta.class-method entity.name.function"],
      s.func,
      loud,
    ),
    rule(
      "Class, Type",
      [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
        "entity.other.inherited-class",
        "entity.name.namespace",
      ],
      s.type,
    ),
    rule(
      "Decorator",
      [
        "meta.decorator",
        "tag.decorator.js entity.name.tag.js",
        "tag.decorator.js punctuation.definition.tag.js",
      ],
      s.func,
      loud,
    ),
    rule(
      "Property",
      [
        "variable.other.property",
        "variable.other.object.property",
        "meta.object-literal.key",
        "support.type.property-name",
      ],
      s.property,
    ),
    rule("Tag", ["entity.name.tag", "meta.tag.sgml"], s.tag, "bold"),
    rule("Tag Punctuation", ["punctuation.definition.tag"], s.operator),
    rule("Attribute", ["entity.other.attribute-name"], s.attribute, "italic"),
    rule(
      "CSS Class, ID",
      ["entity.other.attribute-name.class", "entity.other.attribute-name.id"],
      s.type,
      loud,
    ),
    rule(
      "CSS Property",
      [
        "source.css support.type.property-name",
        "source.scss support.type.property-name",
        "source.sass support.type.property-name",
        "source.less support.type.property-name",
      ],
      s.property,
    ),
    rule("Invalid", ["invalid", "invalid.illegal"], s.invalid, loud),
    rule("URL", ["*url*", "*link*", "*uri*"], s.link, "underline"),

    ...jsonKeys,

    // Diff and git
    rule("Inserted", ["markup.inserted"], s.inserted),
    rule("Deleted", ["markup.deleted"], s.deleted, "strikethrough"),
    rule("Changed", ["markup.changed"], s.changed),

    // Markdown
    rule(
      "Markdown Heading",
      [
        "markup.heading",
        "markup.heading entity.name",
        "punctuation.definition.heading.markdown",
      ],
      s.heading,
      loud,
    ),
    rule("Markdown Bold", ["markup.bold"], s.number, "bold"),
    rule("Markdown Italic", ["markup.italic"], s.type, "italic"),
    rule(
      "Markdown Bold Italic",
      ["markup.bold markup.italic", "markup.italic markup.bold"],
      s.func,
      "italic bold",
    ),
    rule("Markdown Underline", ["markup.underline"], s.number, "underline"),
    rule(
      "Markdown Strikethrough",
      ["markup.strikethrough"],
      s.comment,
      "strikethrough",
    ),
    rule("Markdown Quote", ["markup.quote"], s.property, "italic"),
    rule(
      "Markdown Inline Code",
      ["markup.inline.raw", "markup.raw.block"],
      s.string,
    ),
    rule(
      "Markdown Fence",
      [
        "punctuation.definition.fenced.markdown",
        "punctuation.definition.raw.markdown",
      ],
      s.operator,
    ),
    rule(
      "Markdown Fence Language",
      ["fenced_code.block.language"],
      s.keyword,
      "italic",
    ),
    rule(
      "Markdown Link Text",
      [
        "string.other.link.title.markdown",
        "string.other.link.description.markdown",
      ],
      s.link,
      "underline",
    ),
    rule("Markdown Link URL", ["markup.underline.link"], s.attribute),
    rule(
      "Markdown List Bullet",
      ["punctuation.definition.list.begin.markdown"],
      s.comment,
      "bold",
    ),
    rule("Markdown Separator", ["meta.separator"], s.comment, loud),
  ];
}

// Used when a language server provides semantic tokens (TS, Python, Rust...)
function semanticTokenColors({ syntax: s }) {
  return {
    "variable.readonly": { foreground: s.number },
    parameter: { foreground: s.parameter, italic: true },
    property: s.property,
    function: { foreground: s.func, bold: true },
    method: { foreground: s.func, bold: true },
    class: s.type,
    interface: { foreground: s.type, italic: true },
    enumMember: s.number,
    type: s.type,
    namespace: s.type,
    decorator: { foreground: s.func, italic: true, underline: true },
    "*.deprecated": { strikethrough: true },
    "*.defaultLibrary": { italic: true },
  };
}

// ---------------------------------------------------------------------------
// Contrast check (`npm run check`): ugly is fine, unreadable is not
// ---------------------------------------------------------------------------
const MIN_CONTRAST = 4.5;

function luminance(hex) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function check() {
  let failed = false;
  for (const { name, ui, syntax } of variants) {
    const pairs = Object.entries(syntax).flatMap(([role, value]) =>
      Array.isArray(value)
        ? value.map((c, i) => [`${role}[${i}]`, c])
        : [[role, value]],
    );
    pairs.push(["editorFg", ui.editorFg]);
    for (const [role, color] of pairs) {
      const ratio = contrast(color, ui.editorBg);
      if (ratio < MIN_CONTRAST) {
        failed = true;
        console.log(
          `${name}: ${role} ${color} is ${ratio.toFixed(2)}:1 on ${ui.editorBg}`,
        );
      }
    }
  }
  if (failed) process.exit(1);
  console.log(
    `All syntax colours are at least ${MIN_CONTRAST}:1. Disgusting, yet legible.`,
  );
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------
if (process.argv.includes("--check")) {
  check();
  process.exit(0);
}

fs.mkdirSync(path.join(__dirname, "themes"), { recursive: true });

for (const variant of variants) {
  const theme = {
    $schema: "vscode://schemas/color-theme",
    name: variant.name,
    type: variant.type,
    semanticHighlighting: true,
    colors: uiColors(variant),
    semanticTokenColors: semanticTokenColors(variant),
    tokenColors: tokenColors(variant),
  };
  const out = path.join(__dirname, "themes", variant.file);
  fs.writeFileSync(out, JSON.stringify(theme, null, 2) + "\n");
  console.log(`Built ${variant.name} -> themes/${variant.file}`);
}
