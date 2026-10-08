const config = {
  content: ["./{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg-main': '#0D0D0D',
        'bg-secondary': '#111827',
        'red-primary': '#E11D2E',
        'red-hover': '#FF2D3D',
        'text-white': '#FFFFFF',
        'text-light': '#D1D5DB',
        'text-muted': '#6B7280',
      },
    },
  },
  plugins: [],
}

export default config;