/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#13ecc8",
                "primary-hover": "#0fbda0",
                "primary-dark": "#0ea68c",
                "primary-dim": "rgba(19, 236, 200, 0.1)",
                "accent-purple": "#6366f1",
                "secondary": "#6366f1",
                "secondary-dim": "rgba(99, 102, 241, 0.1)",
                "background-light": "#f6f8f8",
                "background-dark": "#0a1412",
                "surface-dark": "#1a2f2b",
                "surface": "#161b22",
                "surface-glass": "rgba(22, 27, 34, 0.6)",
                "card-dark": "#11221f",
                "input-bg": "#19332f",
                "input-border": "#32675e",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"],
                "heading": ["Space Grotesk", "sans-serif"],
                "body": ["Inter", "sans-serif"],
                "numbers": ["Space Grotesk", "sans-serif"],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'mesh-dark': 'radial-gradient(at 0% 0%, hsla(168,49%,15%,1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(260,40%,15%,1) 0, transparent 50%), radial-gradient(at 50% 50%, hsla(168,49%,5%,1) 0, transparent 100%)',
            },
            animation: {
                'float': 'float 10s infinite ease-in-out',
                'spin-slow': 'spin 20s linear infinite',
                'spin-slow-reverse': 'spin 15s linear infinite reverse',
                'mesh': 'gradient-move 15s ease infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(-20px, 20px)' },
                },
                'gradient-move': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            },
            boxShadow: {
                'glow': '0 0 20px -5px rgba(19, 236, 200, 0.15)',
            },
        },
    },
    plugins: [],
}
