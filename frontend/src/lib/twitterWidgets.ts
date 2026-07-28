// src/lib/twitterWidgets.ts
//
// Twitter/X embeds need platform.twitter.com/widgets.js loaded in the page
// before `window.twttr.widgets.load()` does anything. The old code called
// `widgets.load()` but never loaded the script, so `window.twttr` was always
// undefined and the tweet blockquote just sat there un-rendered.
//
// This loads the script exactly once (cached across every Card that mounts)
// and returns a promise that resolves once `window.twttr.widgets` is ready.

let widgetsPromise: Promise<void> | null = null;

export function loadTwitterWidgets(): Promise<void> {
  // Already loaded and ready.
  if ((window as any).twttr?.widgets) {
    return Promise.resolve();
  }

  // Already loading (e.g. another Card mounted first) - reuse that promise.
  if (widgetsPromise) {
    return widgetsPromise;
  }

  widgetsPromise = new Promise((resolve) => {
    const existing = document.getElementById(
      "twitter-wjs",
    ) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }

    const script = document.createElement("script");
    script.id = "twitter-wjs";
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });

  return widgetsPromise;
}
