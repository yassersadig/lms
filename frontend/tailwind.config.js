/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    exstend: {
      // colors: {
      //   'primary': '#407899',
      //   'secondary': '#001A23',
      //   'background': '#A0BCCC',
      // }
    },
  },
  plugins: []
});