module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      animation: {
        'appear-mark': 'appear 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        appear: {
          '0%': { opacity: '0', transform: 'scale(0) rotate(-20deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0)' },
        },
      }
    },
  },
}
