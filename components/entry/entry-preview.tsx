"use client";

import { useCallback, useState } from "react";
import { getPreviewSettings } from "@/lib/preview";
import { t } from "@/lib/i18n";
import { useConfig } from "@/contexts/config-context";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  ArrowUpRight,
  ChevronDown,
  Copy,
  Eye,
  PanelRight,
  RotateCw,
} from "lucide-react";

export function EntryPreview({
  url,
  hasUnsavedChanges = false,
}: {
  url: string;
  hasUnsavedChanges?: boolean;
}) {
  const { config } = useConfig();
  const mode = getPreviewSettings(config?.object)?.mode ?? "tab";
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [frameKey, setFrameKey] = useState(0);

  const openTab = useCallback(() => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, [url]);

  const openPanel = useCallback(() => {
    setFrameKey((key) => key + 1);
    setIsPanelOpen(true);
  }, []);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t("Preview link copied."));
    } catch {
      toast.error(t("Could not copy the preview link."));
    }
  }, [url]);

  return (
    <>
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              onClick={mode === "panel" ? openPanel : openTab}
              aria-label={t("Preview")}
            >
              <Eye className="size-4" />
              <span className="hidden md:inline">{t("Preview")}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs break-all">
            {hasUnsavedChanges
              ? t("Save first: the preview shows the last saved version.")
              : url}
          </TooltipContent>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={t("Preview options")}
            >
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={openTab}>
              <ArrowUpRight />
              {t("Open in new tab")}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={openPanel}>
              <PanelRight />
              {t("Open in side panel")}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={copyLink}>
              <Copy />
              {t("Copy preview link")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>

      <Sheet open={isPanelOpen} onOpenChange={setIsPanelOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full gap-0 sm:w-[min(90vw,64rem)] sm:max-w-none"
        >
          <SheetHeader className="flex-row items-center gap-2 border-b p-3">
            <div className="min-w-0 flex-1">
              <SheetTitle className="text-sm">{t("Preview")}</SheetTitle>
              <SheetDescription className="truncate text-xs">
                {url}
              </SheetDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setFrameKey((key) => key + 1)}
              aria-label={t("Reload preview")}
            >
              <RotateCw />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={copyLink}
              aria-label={t("Copy preview link")}
            >
              <Copy />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={openTab}
              aria-label={t("Open in new tab")}
            >
              <ArrowUpRight />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPanelOpen(false)}
            >
              {t("Close")}
            </Button>
          </SheetHeader>
          {hasUnsavedChanges && (
            <p className="border-b bg-muted px-3 py-2 text-xs text-muted-foreground">
              {t("You have unsaved changes. The preview shows the last saved version, once the site has finished deploying.")}
            </p>
          )}
          <iframe
            key={frameKey}
            src={url}
            title={t("Preview")}
            className="min-h-0 w-full flex-1 bg-white"
            referrerPolicy="no-referrer"
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
