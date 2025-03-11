import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                background_room1: "#7CB342",
                background_room2: "#388E3C",
                background_room3: "#E87800",
                background_room4: "#12401A",
                background_room5: "#E65100",
            },
        },
    },
    plugins: [],
} satisfies Config;
