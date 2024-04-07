import hljs from "highlight.js";
import { default as MarkdownIt, default as markdownit } from "markdown-it";
import fs from "node:fs";
import path from "node:path";
hljs.configure({ classPrefix: "ssss" });

const md: MarkdownIt = markdownit({
  html: true,
  linkify: true,
  typographer: true,

  highlight: function (str, lang) {
    const esc = md.utils.escapeHtml;
    if (lang && lang !== "auto" && hljs.getLanguage(lang)) {
      return (
        '<pre class="hljs language-' +
        esc(lang.toLowerCase()) +
        '"><code>' +
        hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
        "</code></pre>"
      );
    } else if (lang === "auto") {
      const result = hljs.highlightAuto(str);
      return (
        '<pre class="hljs language-' +
        esc(result.language ?? "") +
        '"><code>' +
        result.value +
        "</code></pre>"
      );
    }

    return '<pre><code class="hljs">' + esc(str) + "</code></pre>";
  },
});

export default async function GetMarkdown(props: {
  filename: string;
  docsPath?: string;
}) {
  const { filename, docsPath = "src/docs" } = props;
  const filePath = path.join(process.cwd(), docsPath, `${filename}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const result = md.render(fileContents);
  return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
}

export function getDocsList() {
  const docsPath = path.join(process.cwd(), "src/docs");
  const files = fs.readdirSync(docsPath);
  return files.map((file) => file.replace(/\.md$/, ""));
}
