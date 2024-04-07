import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "node:fs";
import path from "node:path";

export function getDocsList() {
  const docsPath = path.join(process.cwd(), "src/docs");
  const files = fs.readdirSync(docsPath);
  return files.map((file) => {
    const filePath = path.join(docsPath, file);
    const stats = fs.statSync(filePath);
    const lastModified = stats.mtime;
    return {
      name: file.replace(/\.mdx|md$/, ""),
      lastModified,
    };
  });
}

export async function getMdxResource(blogName: string) {
  const docsPath = path.join(process.cwd(), "src/docs");
  const filePath = path.join(docsPath, `${blogName}.mdx`);
  const mdxSource = fs.readFileSync(filePath, "utf8");

  return mdxSource;
}

const Markdown: React.FC<{ blogName: string }> = async ({ blogName }) => {
  const source = await getMdxResource(blogName);
  return (
    <article className="prose prose-sm 2xl:max-w-3xl min-w-none max-w-none overflow-x-clip w-full my-0 mx-auto">
      <MDXRemote source={source} />
    </article>
  );
};

export default Markdown;
