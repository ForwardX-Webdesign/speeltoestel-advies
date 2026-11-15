/**
 * Preview links (ForwardX addition).
 *
 * Resolves the URL of the built site for the branch being edited, and the page
 * that matches a given entry. Configured in `.pages.yml`:
 *
 *   preview:
 *     url: https://klant-git-{branch}-forwardx.vercel.app   # any branch
 *     production: https://www.klant.nl                        # default branch
 *     branches:                                               # exact overrides
 *       staging: https://staging.klant.nl
 *     mode: tab                                               # or "panel"
 *
 *   content:
 *     - name: blog
 *       preview: /blog/{slug}/
 */

import { safeAccess } from "@/lib/schema";

type PreviewMode = "tab" | "panel";

type PreviewContext = {
  owner: string;
  repo: string;
  branch: string;
  defaultBranch?: string;
};

type PreviewEntry = {
  path?: string | null;
  fields?: Record<string, unknown> | null;
};

type PreviewSettings = {
  url?: string;
  production?: string;
  branches?: Record<string, string>;
  mode: PreviewMode;
};

// Same shape as the branch part of Vercel/Netlify branch URLs.
const slugifyBranch = (branch: string) =>
  branch
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getPreviewSettings = (
  configObject: Record<string, any> | null | undefined,
): PreviewSettings | null => {
  const preview = configObject?.preview;
  if (!preview) return null;
  if (typeof preview === "string") return { url: preview, mode: "tab" };
  if (typeof preview !== "object") return null;

  return {
    url: typeof preview.url === "string" ? preview.url : undefined,
    production:
      typeof preview.production === "string" ? preview.production : undefined,
    branches:
      preview.branches && typeof preview.branches === "object"
        ? preview.branches
        : undefined,
    mode: preview.mode === "panel" ? "panel" : "tab",
  };
};

const toHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
};

const resolvePreviewBase = (
  configObject: Record<string, any> | null | undefined,
  context: PreviewContext,
): string | null => {
  const settings = getPreviewSettings(configObject);
  if (!settings) return null;

  const isDefaultBranch =
    context.defaultBranch != null && context.branch === context.defaultBranch;

  const template =
    settings.branches?.[context.branch] ??
    (isDefaultBranch ? settings.production : undefined) ??
    settings.url ??
    // With only `production` set, every branch previews the live site.
    settings.production;

  if (!template || typeof template !== "string") return null;

  const tokens: Record<string, string> = {
    branch: slugifyBranch(context.branch),
    branch_raw: context.branch,
    owner: context.owner.toLowerCase(),
    repo: context.repo.toLowerCase(),
  };

  const resolved = template.replace(/\{([a-z_]+)\}/g, (match, token) =>
    token in tokens ? tokens[token] : match,
  );

  const url = toHttpUrl(resolved);
  return url ? url.toString().replace(/\/$/, "") : null;
};

const encodePathValue = (value: string) =>
  value.split("/").map(encodeURIComponent).join("/");

const resolvePreviewPath = (
  schema: Record<string, any> | null | undefined,
  entry: PreviewEntry,
): string | null => {
  const template = schema?.preview;
  if (template === false) return null;
  if (typeof template !== "string" || template.trim() === "") return "/";

  const entryPath = entry.path ?? "";
  const filename = entryPath.split("/").pop() ?? "";
  const slug = filename.replace(/\.[^.]+$/, "");
  const schemaPath = typeof schema?.path === "string" ? schema.path : "";
  const parentPath = entryPath.split("/").slice(0, -1).join("/");
  const dir =
    schema?.type === "collection" && parentPath.startsWith(schemaPath)
      ? parentPath.slice(schemaPath.length).replace(/^\/+/, "")
      : "";

  const tokens: Record<string, string> = {
    path: entryPath,
    filename,
    slug,
    dir,
  };
  const fields = entry.fields ?? {};

  const resolved = template.replace(/\{([^}]+)\}/g, (_, rawToken) => {
    const token = String(rawToken).trim();
    if (token in tokens) return encodePathValue(tokens[token]);
    const fieldName = token.startsWith("fields.") ? token.slice(7) : token;
    const value = safeAccess(fields as Record<string, any>, fieldName);
    if (value == null || typeof value === "object") return "";
    return encodePathValue(String(value));
  });

  // Absolute URLs are not allowed here: the path always hangs off the base.
  const path = `/${resolved}`.replace(/\/{2,}/g, "/");
  return path;
};

const resolvePreviewUrl = (
  configObject: Record<string, any> | null | undefined,
  schema: Record<string, any> | null | undefined,
  context: PreviewContext,
  entry: PreviewEntry = {},
): string | null => {
  const base = resolvePreviewBase(configObject, context);
  if (!base) return null;
  if (!schema) return `${base}/`;

  const path = resolvePreviewPath(schema, entry);
  if (path == null) return null;
  return `${base}${path}`;
};

export {
  getPreviewSettings,
  resolvePreviewBase,
  resolvePreviewPath,
  resolvePreviewUrl,
  slugifyBranch,
};
export type { PreviewContext, PreviewEntry, PreviewMode, PreviewSettings };
