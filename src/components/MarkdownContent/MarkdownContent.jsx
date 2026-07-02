function parseInline(text) {
  const parts = [];
  const pattern = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(_([^_]+)_)|(\[([^\]]+)\]\((https?:\/\/[^)]+)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      parts.push(<strong key={`${match.index}-strong`}>{match[2]}</strong>);
    } else if (match[4]) {
      parts.push(<em key={`${match.index}-em`}>{match[4]}</em>);
    } else if (match[6]) {
      parts.push(<em key={`${match.index}-underscore-em`}>{match[6]}</em>);
    } else if (match[8] && match[9]) {
      parts.push(
        <a key={`${match.index}-link`} href={match[9]} target="_blank" rel="noreferrer noopener">
          {match[8]}
        </a>,
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function createBlocks(markdown) {
  const lines = markdown.split(/\r?\n/);
  const blocks = [];
  let paragraph = [];
  let list = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    blocks.push({ type: "paragraph", content: paragraph.join(" ") });
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    blocks.push({ type: "list", items: list });
    list = [];
  }

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    if (trimmed === "---") {
      flushParagraph();
      flushList();
      blocks.push({ type: "spacer" });
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", content: trimmed.slice(4) });
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", content: trimmed.slice(3) });
      return;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      list.push(trimmed.slice(2));
      return;
    }

    flushList();
    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();

  return blocks;
}

export default function MarkdownContent({ children, className = "" }) {
  const blocks = createBlocks(children || "");

  return (
    <div className={`markdown-content ${className}`.trim()}>
      {blocks.map((block, index) => {
        if (block.type === "h2") return <h2 key={index}>{parseInline(block.content)}</h2>;
        if (block.type === "h3") return <h3 key={index}>{parseInline(block.content)}</h3>;
        if (block.type === "spacer") return <div className="markdown-spacer" key={index} />;
        if (block.type === "list") {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>{parseInline(item)}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{parseInline(block.content)}</p>;
      })}
    </div>
  );
}
