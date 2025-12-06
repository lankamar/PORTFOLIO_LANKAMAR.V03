/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-top': 'var(--color-bg-top)',
                'bg-mid': 'var(--color-bg-mid)',
                'bg-bottom': 'var(--color-bg-bottom)',
                'text-primary': 'var(--color-text-primary)',
                'text-secondary': 'var(--color-text-secondary)',
                'accent-base': 'var(--color-accent-base)',
                'accent-hover': 'var(--color-accent-hover)',
                'accent-active': 'var(--color-accent-active)',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'Georgia', 'serif'],
                mono: ['"JetBrains Mono"', 'Courier New', 'monospace'],
            },
            boxShadow: {
                'xl': '0 25px 50px -12px rgba(139, 29, 29, 0.25)',
                'glow': '0 0 15px rgba(139, 29, 29, 0.6)',
            },
            dropShadow: {
                'text': '0 4px 3px rgba(0, 0, 0, 0.8)',
            }
        }
    },
    plugins: [],
}
