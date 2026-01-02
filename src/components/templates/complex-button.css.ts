import { style } from '@vanilla-extract/css';

// 복잡한 버튼을 위한 커스텀 스타일
export const complexButtonStyle = style({
  position: 'relative',
  transition: 'all 0.2s ease-in-out',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    backgroundColor: 'rgb(246, 157, 200)',
  },
  ':active': {
    transform: 'translateY(0)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  ':focus-visible': {
    outline: '2px solid rgb(236, 75, 153)',
    outlineOffset: '2px',
  },
});
