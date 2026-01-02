import { style, styleVariants } from '@vanilla-extract/css';

const baseButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px 8px',
  borderRadius: '2px',
  border: '0px',
  color: '#1e1e1e',
  fontWeight: '400',
  fontSize: '12px',

  ':hover': {
    backgroundColor: '#c4e817',
    cursor: 'pointer',
  },
});
const defaultButton = style({
  backgroundColor: '#1e1e1e11',
  backdropFilter: 'blur(10px)',
});

const outlineButton = style({
  backgroundColor: 'transparent',
  border: '1px solid #1e1e1e11',
  ':hover': {
    backgroundColor: 'transparent',
    border: '1px solid #c4e817',
  },
});

const ghostButton = style({
  backgroundColor: 'transparent',
  border: '0px',
});

const destructiveButton = style({
  backgroundColor: '#F5B9AE',
  color: '#ff0000',
  border: '0px',
  pointerEvents: 'none',
  ':hover': {
    backgroundColor: '#F5B9AE',
  },
});

const secondaryButton = style({
  backgroundColor: '#525252',
  color: '#f0f0f0',
});

const linkButton = style({
  backgroundColor: 'transparent',
  border: '0px',
  ':hover': {
    textDecoration: 'underline',
  },
});

export const buttonVariants = styleVariants({
  default: [baseButton, defaultButton],
  outline: [baseButton, outlineButton],
  ghost: [baseButton, ghostButton],
  destructive: [baseButton, destructiveButton],
  secondary: [baseButton, secondaryButton],
  link: [baseButton, linkButton],
});

export const sizeVariants = styleVariants({
  default: {
    padding: '5px 8px',
  },
  sm: {
    padding: '4px 6px',
  },
  lg: {
    padding: '7px 10px',
  },
  icon: {
    width: '1.6rem',
    height: '1.6rem',
    padding: '2px',
  },
  'icon-sm': {
    width: '1.2rem',
    height: '1.2rem',
    padding: '1px',
  },
  'icon-lg': {
    width: '2rem',
    height: '2rem',
    padding: '4px',
  },
});
