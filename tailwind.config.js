/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'apps/templates/**/*.html',
    'apps/static/assets/js/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

