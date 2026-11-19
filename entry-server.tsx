/**
 * Server entry used only at build time (scripts/generate-route-html-shells.ts)
 * to prerender each indexable route to static HTML, so crawlers receive the
 * full page content without having to run JavaScript.
 */
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppShell } from "./App";
import { ThemeProvider } from "./theme/ThemeProvider";

export function render(url: string): string {
  return renderToString(
    <ThemeProvider>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </ThemeProvider>,
  );
}
