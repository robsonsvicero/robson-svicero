import { useEffect, useRef } from "react";
import { sanitizeRichText } from "../../utils/richText.js";

const controls = [
  { label: "P", command: "formatBlock", value: "P", title: "Parágrafo" },
  { label: "H2", command: "formatBlock", value: "H2", title: "Título" },
  { label: "H3", command: "formatBlock", value: "H3", title: "Subtítulo" },
  { label: "B", command: "bold", title: "Negrito" },
  { label: "I", command: "italic", title: "Itálico" },
  { label: "U", command: "underline", title: "Sublinhado" },
  { label: "•", command: "insertUnorderedList", title: "Lista" },
  { label: "1.", command: "insertOrderedList", title: "Lista numerada" },
];

export default function RichTextEditor({ id, name, value = "", onChange, required }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current || editorRef.current.innerHTML === value) return;
    if (document.activeElement === editorRef.current) return;
    editorRef.current.innerHTML = value || "";
  }, [value]);

  function emitChange() {
    onChange(editorRef.current?.innerHTML || "");
  }

  function runCommand(command, commandValue = null) {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    emitChange();
  }

  function insertLink() {
    const url = window.prompt("URL do link");
    if (!url) return;

    runCommand("createLink", url);
  }

  function handlePaste(event) {
    event.preventDefault();
    const html = event.clipboardData.getData("text/html");
    const text = event.clipboardData.getData("text/plain");

    if (html) {
      document.execCommand("insertHTML", false, sanitizeRichText(html));
    } else {
      document.execCommand("insertText", false, text);
    }

    emitChange();
  }

  return (
    <div className="rich-editor">
      <div className="rich-editor-toolbar" aria-label="Ferramentas de formatação">
        {controls.map((control) => (
          <button
            key={`${control.command}-${control.value || ""}`}
            type="button"
            title={control.title}
            onClick={() => runCommand(control.command, control.value)}
          >
            {control.label}
          </button>
        ))}
        <button type="button" title="Link" onClick={insertLink}>
          Link
        </button>
      </div>
      <div
        aria-label={name}
        className="rich-editor-surface"
        contentEditable
        id={id}
        onInput={emitChange}
        onPaste={handlePaste}
        ref={editorRef}
        role="textbox"
        tabIndex={0}
      />
      <input name={name} required={required} type="hidden" value={value || ""} />
    </div>
  );
}
