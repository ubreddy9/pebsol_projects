/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pebsol: {
          navy: '#0f2b48',     // Deep corporate navy
          navyLight: '#1a3d66',
          navyDark: '#081a2e',
          green: '#16a34a',    // Fresh solar green
          greenHover: '#15803d',
          greenLight: '#dcfce7',
          amber: '#f59e0b',    // Sun solar amber
          amberLight: '#fef3c7',
          surface: '#ffffff',
          slate: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          textDark: '#0f172a',
          textMuted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Barlow', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 43, 72, 0.06), 0 2px 6px -1px rgba(15, 43, 72, 0.04)',
        'soft-hover': '0 12px 28px -4px rgba(15, 43, 72, 0.12), 0 4px 10px -2px rgba(15, 43, 72, 0.06)',
      }
    },
  },
  plugins: [],
}
