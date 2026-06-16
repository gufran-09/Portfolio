import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => {
  return {
    tanstackStart: {
      server: {
        entry: "server",
      },
    },

    vite: {
      plugins: command === "build" ? [
        nitro({
          preset: "vercel",
        }),
      ] : [],
    },
  };
});