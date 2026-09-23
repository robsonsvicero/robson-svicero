import { Extension } from "@tiptap/core";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { useEffect, useRef, useState } from "react";

const editorBlockTypes = ["paragraph", "heading", "listItem"];

const LayoutAttributes = Extension.create({
  name: "layoutAttributes",
  addGlobalAttributes() {
    return [{
      types: editorBlockTypes,
      attributes: {
        indent: {
          default: 0,
          parseHTML: (element) => Number(element.dataset.indent || 0),
          renderHTML: (attributes) => attributes.indent
            ? { "data-indent": attributes.indent, style: `margin-left: ${attributes.indent * 2}rem` }
            : {},
        },
        lineHeight: {
          default: null,
          parseHTML: (element) => element.style.lineHeight || null,
          renderHTML: (attributes) => attributes.lineHeight
            ? { style: `line-height: ${attributes.lineHeight}` }
            : {},
        },
      },
    }];
  },
});

const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width") || null,
        renderHTML: (attributes) => attributes.width ? { width: attributes.width } : {},
      },
    };
  },
});

function changeIndent(editor, amount) {
  const { $from } = editor.state.selection;
  const node = $from.node($from.depth);
  if (!editorBlockTypes.includes(node.type.name)) return;
  const indent = Math.max(0, Math.min(6, (node.attrs.indent || 0) + amount));
  editor.chain().focus().updateAttributes(node.type.name, { indent }).run();
}

function setLineHeight(editor, value) {
  const { $from } = editor.state.selection;
  const nodeName = $from.node($from.depth).type.name;
  if (editorBlockTypes.includes(nodeName)) {
    editor.chain().focus().updateAttributes(nodeName, { lineHeight: value || null }).run();
  }
}

const toolbarGroups = [
  [
    ["P", "Parágrafo", (editor) => editor.chain().focus().setParagraph().run()],
    ["H1", "Título 1", (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run()],
    ["H2", "Título 2", (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run()],
    ["H3", "Título 3", (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run()],
  ],
  [
    ["B", "Negrito", (editor) => editor.chain().focus().toggleBold().run()],
    ["I", "Itálico", (editor) => editor.chain().focus().toggleItalic().run()],
    ["U", "Sublinhado", (editor) => editor.chain().focus().toggleUnderline().run()],
    ["S", "Tachado", (editor) => editor.chain().focus().toggleStrike().run()],
  ],
  [
    ["•", "Lista com marcadores", (editor) => editor.chain().focus().toggleBulletList().run()],
    ["1.", "Lista numerada", (editor) => editor.chain().focus().toggleOrderedList().run()],
    ["←", "Diminuir recuo", (editor) => changeIndent(editor, -1)],
    ["→", "Aumentar recuo", (editor) => changeIndent(editor, 1)],
  ],
  [
    ["E", "Alinhar à esquerda", (editor) => editor.chain().focus().setTextAlign("left").run()],
    ["C", "Centralizar", (editor) => editor.chain().focus().setTextAlign("center").run()],
    ["D", "Alinhar à direita", (editor) => editor.chain().focus().setTextAlign("right").run()],
    ["J", "Justificar", (editor) => editor.chain().focus().setTextAlign("justify").run()],
  ],
];

export default function RichTextEditor({ id, name, value = "", onChange, onImageUpload, required, autosaveStatus = "idle" }) {
  const imageInputRef = useRef(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false, autolink: true, defaultProtocol: "https" }),
      ResizableImage.configure({ allowBase64: false }),
      Youtube.configure({ controls: true, nocookie: true, modestBranding: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      LayoutAttributes,
    ],
    content: value || "",
    editorProps: { attributes: { class: "rich-editor-surface", "aria-label": name, role: "textbox" } },
    onUpdate: ({ editor: currentEditor }) => onChange(currentEditor.getHTML()),
  });

  useEffect(() => {
    if (!editor || editor.isDestroyed || editor.getHTML() === (value || "")) return;
    editor.commands.setContent(value || "", false);
  }, [editor, value]);

  function insertLink() {
    const url = window.prompt("URL do link", editor?.getAttributes("link").href || "https://");
    if (url === null) return;
    if (!url.trim()) editor.chain().focus().unsetLink().run();
    else editor.chain().focus().setLink({ href: url.trim() }).run();
  }

  async function insertImageFromFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !onImageUpload || !editor) return;
    setIsUploadingImage(true);
    try {
      const url = await onImageUpload(file);
      if (url) editor.chain().focus().setImage({ src: url, alt: file.name.replace(/\.[^.]+$/, "") }).run();
    } finally {
      setIsUploadingImage(false);
    }
  }

  function insertImageByUrl() {
    const url = window.prompt("URL da imagem");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }

  function insertVideo() {
    const url = window.prompt("URL do vídeo do YouTube");
    if (url) editor.chain().focus().setYoutubeVideo({ src: url, width: 640, height: 360 }).run();
  }

  if (!editor) return null;

  return (
    <div className="rich-editor">
      <div className="rich-editor-toolbar" aria-label="Ferramentas de formatação">
        {toolbarGroups.map((group, groupIndex) => (
          <div className="rich-editor-toolbar-group" key={groupIndex}>
            {group.map(([label, title, action]) => (
              <button key={title} type="button" title={title} onClick={() => action(editor)}>{label}</button>
            ))}
          </div>
        ))}
        <label className="rich-editor-color" title="Cor do texto">
          <span aria-hidden="true">A</span>
          <input type="color" defaultValue="#222222" onChange={(event) => editor.chain().focus().setColor(event.target.value).run()} />
        </label>
        <label className="rich-editor-color" title="Cor de destaque">
          <span aria-hidden="true">H</span>
          <input type="color" defaultValue="#fff19a" onChange={(event) => editor.chain().focus().toggleHighlight({ color: event.target.value }).run()} />
        </label>
        <select title="Espaçamento entre linhas" defaultValue="" onChange={(event) => setLineHeight(editor, event.target.value)}>
          <option value="">Linhas</option><option value="1.15">1,15</option><option value="1.5">1,5</option><option value="2">2,0</option>
        </select>
        <select title="Largura da imagem selecionada" defaultValue="" onChange={(event) => editor.chain().focus().updateAttributes("image", { width: event.target.value || null }).run()}>
          <option value="">Imagem</option><option value="25%">25%</option><option value="50%">50%</option><option value="75%">75%</option><option value="100%">100%</option>
        </select>
        <button type="button" title="Inserir ou editar link" onClick={insertLink}>Link</button>
        {onImageUpload && <>
          <button type="button" title="Enviar imagem para o Supabase Storage" onClick={() => imageInputRef.current?.click()} disabled={isUploadingImage}>{isUploadingImage ? "Enviando..." : "Upload"}</button>
          <input ref={imageInputRef} className="rich-editor-image-input" type="file" accept="image/*" onChange={insertImageFromFile} />
        </>}
        <button type="button" title="Inserir imagem por URL" onClick={insertImageByUrl}>Imagem</button>
        <button type="button" title="Inserir vídeo do YouTube" onClick={insertVideo}>Vídeo</button>
        <span className={`rich-editor-autosave is-${autosaveStatus}`} aria-live="polite">
          {autosaveStatus === "saving" ? "Salvando..." : autosaveStatus === "saved" ? "Salvo" : autosaveStatus === "error" ? "Erro ao salvar" : ""}
        </span>
      </div>
      <EditorContent editor={editor} id={id} />
      <input name={name} required={required} type="hidden" value={value || ""} readOnly />
    </div>
  );
}