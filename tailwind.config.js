/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#ffffff",
                dark: "#0F0F0F"
            }
        }
    },
    plugins: []
};
