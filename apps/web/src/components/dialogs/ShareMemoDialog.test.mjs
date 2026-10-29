import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { getPublicShareUrl } from "./ShareMemoDialog.tsx";

const source = readFileSync(new URL("./ShareMemoDialog.tsx", import.meta.url), "utf8");

describe("ShareMemoDialog raw markdown link support", () => {
  test("generates public share URLs and .md alternates", () => {
    const url = getPublicShareUrl("my-custom-note");
    expect(url).toBe("/share/my-custom-note");
    expect(`${url}.md`).toBe("/share/my-custom-note.md");
  });

  test("renders compact raw markdown strip with copy button and i18n labels", () => {
    expect(source).toContain('t("sharing.markdownRawLabel")');
    expect(source).toContain('"sharing.copyMarkdownLink"');
    expect(source).toContain('disabled={Boolean(share.passwordProtected)}');
    expect(source).toContain('onClick={() => void copyValue("markdown", markdownUrl)}');
  });

  test("renders open markdown button in actions footer when not password protected", () => {
    expect(source).toContain('t("sharing.openMarkdown")');
    expect(source).toContain('window.open(markdownUrl, "_blank", "noopener,noreferrer")');
    expect(source).toContain('!share.passwordProtected');
  });

  test("switches compact hint text when password protection is active", () => {
    expect(source).toContain('share.passwordProtected\n                    ? t("sharing.markdownPasswordProtectedHint")\n                    : t("sharing.markdownHint")');
  });
});
