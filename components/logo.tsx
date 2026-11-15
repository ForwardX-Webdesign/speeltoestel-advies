import { cn } from "@/lib/utils";

// ForwardX brandmark. The X follows `currentColor`, the dot is always orange.
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4", className)}
      viewBox="0 0 476 450"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M0 0H175L476 450H300L238 357L176 450H0L150 225Z"
      />
      <circle cx="369" cy="75" r="72" fill="#E8722A" />
    </svg>
  );
}
