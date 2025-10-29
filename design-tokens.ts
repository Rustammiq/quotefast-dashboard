// Design Tokens voor consistentie door het hele project

export const tokens = {
  colors: {
    primary: {
      50: 'oklch(0.95 0.05 25.331)',
      100: 'oklch(0.9 0.1 25.331)',
      500: 'oklch(0.637 0.237 25.331)', // brand-primary
      900: 'oklch(0.25 0.18 25.331)',
    },
    secondary: {
      500: 'oklch(0.723 0.219 149.579)', // brand-secondary
    },
    neutral: {
      white: 'rgb(249, 250, 251)',
      muted: 'rgb(156, 163, 175)',
      card: 'rgb(24, 32, 42)',
      dark: 'rgb(3, 7, 18)',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
  },
} as const

