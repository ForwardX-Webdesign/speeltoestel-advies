"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { HelpTopic } from "@/lib/help";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronDown, Lightbulb, PlayCircle } from "lucide-react";

export function HelpBackButton({ label }: { label: string }) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      size="xs"
      onClick={() => {
        if (window.history.length > 1) router.back();
        else router.push("/");
      }}
    >
      <ArrowLeft />
      {label}
    </Button>
  );
}

function HelpTopicCard({
  topic,
  isOpen,
  onToggle,
}: {
  topic: HelpTopic;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `uitleg-${topic.slug}`;

  return (
    <section id={topic.slug} className="scroll-mt-6 rounded-lg border bg-card">
      <h2>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 font-semibold">
              {topic.title}
              {topic.video && (
                <PlayCircle className="size-4 text-primary" aria-label="Met video" />
              )}
            </span>
            <span className="mt-0.5 block text-sm font-normal text-muted-foreground">
              {topic.summary}
            </span>
          </span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </h2>
      {isOpen && (
        <div id={panelId} className="space-y-4 border-t p-4">
          {topic.video && (
            <video
              className="aspect-video w-full rounded-md border bg-black"
              src={topic.video.src}
              poster={topic.video.poster}
              controls
              playsInline
              preload="metadata"
            />
          )}
          <ol className="space-y-3">
            {topic.steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
          {topic.tip && (
            <p className="flex gap-2 rounded-md bg-muted p-3 text-sm text-muted-foreground">
              <Lightbulb className="mt-0.5 size-4 shrink-0" />
              <span>{topic.tip}</span>
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export function HelpTopics({ topics }: { topics: HelpTopic[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(
    topics[0]?.slug ?? null,
  );

  // Open the topic named in the URL, e.g. /uitleg#foto-vervangen.
  useEffect(() => {
    const slug = window.location.hash.replace(/^#/, "");
    if (slug && topics.some((topic) => topic.slug === slug)) {
      setOpenSlug(slug);
    }
  }, [topics]);

  return (
    <div className="space-y-3">
      {topics.map((topic) => (
        <HelpTopicCard
          key={topic.slug}
          topic={topic}
          isOpen={openSlug === topic.slug}
          onToggle={() =>
            setOpenSlug((current) =>
              current === topic.slug ? null : topic.slug,
            )
          }
        />
      ))}
    </div>
  );
}
