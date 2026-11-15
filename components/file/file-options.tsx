"use client";

import { t } from "@/lib/i18n";
import { useMemo, useState } from "react";
import { useConfig } from "@/contexts/config-context";
import { getParentPath, getRelativePath, joinPathSegments, normalizePath } from "@/lib/utils/file";
import { getSchemaByName } from "@/lib/schema";
import { requireApiSuccess } from "@/lib/api-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { FileRename } from "@/components/file/file-rename";

export function FileOptions({
  path,
  sha,
  type,
  name,
  canDelete,
  canRename,
  portalProps,
  onDelete,
  onRename,
  children
}: {
  path: string;
  sha: string;
  type: "collection" | "file" | "media" | "settings";
  name?: string;
  canDelete?: boolean;
  canRename?: boolean;
  portalProps?: any;
  onDelete?: (path: string) => void;
  onRename?: (path: string, newPath: string) => void;
  children: React.ReactNode;
}) {
  const { config } = useConfig();
  if (!config) throw new Error(`Configuration not found.`);

  const normalizedPath = useMemo(() => normalizePath(path), [path]);
  const rootPath = useMemo(() => {
    if (type === "media" && name) {
      const schema = getSchemaByName(config.object, name, "media");
      return schema?.input || getParentPath(path);
    }
    if ((type === "collection" || type === "file") && name) {
      const schema = getSchemaByName(config.object, name);
      return schema?.path || getParentPath(path);
    }
    return getParentPath(path);
  }, [type, name, config.object, path]);
  const relativePath = useMemo(() => getRelativePath(normalizedPath, rootPath), [normalizedPath, rootPath]);
  const showRename = type !== "settings" && type !== "file" && canRename !== false;
  const showDelete = type !== "settings" && canDelete !== false;

  const [newPath, setNewPath] = useState(relativePath);
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      const deletePromise = new Promise(async (resolve, reject) => {
        try {
          const params = new URLSearchParams({ 
            sha,
            type: (type === "collection" || type === "file") ? "content" : type
          });
          if (name) params.set("name", name);

          const response = await fetch(`/api/${config.owner}/${config.repo}/${encodeURIComponent(config.branch)}/files/${encodeURIComponent(normalizedPath)}?${params.toString()}`, {
            method: "DELETE",
          });

          const data = await requireApiSuccess<any>(response, t("Failed to delete file"));

          resolve(data);
        } catch (error) {
          reject(error);
        }
      });

      toast.promise(deletePromise, {
        loading: t("Deleting {path}", { path }),
        success: (data: any) => {
          if (onDelete) onDelete(path);
          return data.message;
        },
        error: (error: any) => error.message,
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <>
      <AlertDialog>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            {children}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" portalProps={portalProps}>
            <DropdownMenuItem asChild>
              <a href={`https://github.com/${config.owner}/${config.repo}/blob/${encodeURIComponent(config.branch)}/${path}`} target="_blank">
                {t("View on GitHub")}
                <ArrowUpRight className="size-3 text-muted-foreground ml-auto" />
              </a>
            </DropdownMenuItem>
            {(showRename || showDelete)
              ? <>
                  <DropdownMenuSeparator />
                  {showRename &&
                    <DropdownMenuItem onSelect={() => setIsRenameOpen(true)}>
                      {t("Rename")}
                    </DropdownMenuItem>
                  }
                  {showDelete && (
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem variant="destructive">
                        {t("Delete")}
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                  )}
                </>
              : null
            }
          </DropdownMenuContent>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("Are you sure you want to delete this file?")}</AlertDialogTitle>
              <AlertDialogDescription>{t("This will permanently delete \"{path}\".", { path })}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete}>{t("Delete")}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </DropdownMenu>
      </AlertDialog>

      {showRename &&
        <FileRename
          isOpen={isRenameOpen}
          onOpenChange={setIsRenameOpen}
          path={path}
          type={type}
          sha={sha}
          name={name}
          onRename={onRename}
        />
      }
    </>
  );
}
