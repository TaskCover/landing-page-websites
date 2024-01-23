import localFont from 'next/font/local'

export const helveticaNeue = localFont({
  src: [
    {
      path: '../font/HelveticaNeue-Roman.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../font/HelveticaNeueMedium.otf',
      weight: '500',
      style: 'normal',
    }, 
    {
      path: '../font/HelveticaNeueBold.ttf',
      weight: '700',
      style: 'normal',
    },

  ],
})

const typography = {
  fontFamily: helveticaNeue.style.fontFamily,
  h1: {
    fontWeight: 700,
    fontSize: 64,
    lineHeight: 1.25,
  },
  h2: {
    fontWeight: 700,
    fontSize: 48,
    lineHeight: 1.1875,
  },
  h3: {
    fontWeight: 700,
    fontSize: 36,
    lineHeight: 1.25,
  },
  h4: {
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 1.2,
  },
  h5: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 1.25,
  },
  h6: {
    fontSize: 14,
    lineHeight: "18px",
    fontWeight: 500,
  },
  body1: {
    fontSize: 16,
  },
  body2: {
    fontSize: 14,
  },
  subtitle1: {
    fontSize: 20,
  },
  subtitle2: {
    fontSize: 17,
  },
  caption: {
    fontSize: 12,
  },
  overline: {
    fontSize: 18,
  },
};

export default typography;
