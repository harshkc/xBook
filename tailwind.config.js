module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        base: 'white',
        textPrimary: '#434449',
        secondary: '#f1f2f7',
        secondary10: '#f1f1f4',
        secondary20: '#e4e5e9',
        secondary80: '#6f7077',
        primary: '#3f51b5',
        primaryDarken: '#364495',
        primaryLighten: '#b7c1f8',
        yellow: '#ffc107',
        green: '#4caf50',
        danger: '#ef5350',
        orange: 'orange',
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
}
