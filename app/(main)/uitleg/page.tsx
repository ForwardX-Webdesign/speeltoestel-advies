import { MainRootLayout } from "../main-root-layout";
import { DocumentTitle } from "@/components/document-title";
import { HelpBackButton, HelpTopics } from "@/components/help/help-topics";
import { helpContact, helpTopics } from "@/lib/help";
import { t } from "@/lib/i18n";

export default function Page() {
  return (
    <MainRootLayout>
      <DocumentTitle title={t("Help")} />
      <div className="mx-auto max-w-screen-sm space-y-6 p-4 md:p-6">
        <HelpBackButton label={t("Back")} />
        <header className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight md:text-2xl">
            {t("Help")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("Short guides for the things you do most often.")}
          </p>
        </header>
        <HelpTopics topics={helpTopics} />
        <p className="text-sm text-muted-foreground">
          {t("Can't find what you need?")}{" "}
          <a
            className="underline hover:decoration-muted-foreground/50"
            href={helpContact.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("Contact {name}", { name: helpContact.name })}
          </a>
          .
        </p>
      </div>
    </MainRootLayout>
  );
}
