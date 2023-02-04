/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'playfair': ['Playfair Display', 'sans-serif'],
                'raleway': ['Raleway', 'sans-serif'],
            },
            colors: {
                'primary': '#a5f3fc',
                'secondary': '#11379f',
                'tertiary': '#93c5fd',
                'quaternary': '#0D0E18',
            },
            backgroundImage: {
                'peace': "url('/img/bg-image.png')",
            }
        },
    },
    daisyui: {
        themes: ["lofi"],
    },
    plugins: [require("daisyui")],
};