import fs from "fs/promises";
import path from "path";

/**
 * Loads markdown/mdx content from the local repository based on a file reference path.
 * The content is typically stored under the `content/` directory at the project root.
 */
export async function loadLessonContent(bodyRef: string | null): Promise<string> {
  if (!bodyRef) {
    return "";
  }

  try {
    // Resolve the file path relative to the process cwd
    const filePath = path.join(process.cwd(), bodyRef);
    
    // Check if file exists to prevent throwing raw ENOENT to the UI
    try {
      await fs.access(filePath);
    } catch {
      console.warn(`Content file not found: ${filePath}`);
      return `> Content not found for path: \`${bodyRef}\``;
    }

    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error("Error reading lesson content:", error);
    return `> Error loading content for path: \`${bodyRef}\``;
  }
}
