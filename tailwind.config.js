import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {

    },
  },
  daisyui: {
    themes: [
      "dark",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "forest",
      "aqua",
      "black",
      "luxury",
      "dracula",
      "autumn",
      "business",
      "night",
      "coffee",
      "dim",
      "sunset",
    ],
  },
  plugins: [daisyui],
};
