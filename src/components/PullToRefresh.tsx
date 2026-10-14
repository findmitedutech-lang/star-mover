import { useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, ArrowDown } from "lucide-react";

const TRIGGER = 80;
const RESUME_AFTER_MS = 30_000;

/**
 * Swipe down at the top of any screen to refresh, and refresh automatically
 * whenever the app is opened again. Saved screens show instantly, then update.
 */
export function PullToRefresh() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef<number | null>(null);
  const pullRef = useRef(0);

  useEffect(() => {
    const softRefresh = () => {
      void queryClient.invalidateQueries();
      void router.invalidate();
      window.dispatchEvent(new Event("fm:refresh"));
    };

    // Auto refresh when the app comes back to the screen.
    let hiddenAt = 0;
    const onVisible = () => {
      if (document.visibilityState === "hidden") hiddenAt = Date.now();
      else if (hiddenAt && Date.now() - hiddenAt > RESUME_AFTER_MS) softRefresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", softRefresh);

    const atTop = () => (window.scrollY || document.documentElement.scrollTop) <= 0;
    const blocked = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("[data-no-pull], video, input, textarea, [role=dialog]");

    const onStart = (e: TouchEvent) => {
      startY.current = atTop() && !blocked(e.target) && e.touches.length === 1 ? e.touches[0]!.clientY : null;
    };
    const onMove = (e: TouchEvent) => {
      if (startY.current === null) return;
      const dy = e.touches[0]!.clientY - startY.current;
      if (dy <= 0 || !atTop()) {
        pullRef.current = 0;
        setPull(0);
        return;
      }
      pullRef.current = Math.min(dy * 0.5, 120);
      setPull(pullRef.current);
    };
    const onEnd = () => {
      if (startY.current === null) return;
      startY.current = null;
      if (pullRef.current >= TRIGGER) {
        setRefreshing(true);
        setPull(60);
        // Full reload keeps everything current; saved screens make it instant.
        window.setTimeout(() => window.location.reload(), 300);
      } else {
        setPull(0);
      }
      pullRef.current = 0;
    };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", softRefresh);
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [queryClient, router]);

  if (pull <= 0 && !refreshing) return null;
  const ready = pull >= TRIGGER || refreshing;
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center"
      style={{ transform: `translateY(${Math.max(pull - 40, 8)}px)` }}
    >
      <div className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-primary shadow-lg">
        {refreshing ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <ArrowDown className="size-5 transition-transform" style={{ transform: ready ? "rotate(180deg)" : undefined }} />
        )}
      </div>
    </div>
  );
}
