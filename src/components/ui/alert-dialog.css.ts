import { style, keyframes } from '@vanilla-extract/css';

// 애니메이션
const overlayShow = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const contentShow = keyframes({
  from: {
    opacity: 0,
    transform: 'translate(-50%, -48%) scale(0.96)',
  },
  to: {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

// Overlay 스타일
export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(4px)',
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

// Content 스타일
export const content = style({
  position: 'fixed',
  left: '50%',
  top: '50%',
  zIndex: 50,
  display: 'grid',
  width: '100%',
  maxWidth: '32rem', // 512px
  transform: 'translate(-50%, -50%)',
  gap: '1rem',
  border: '1px solid rgba(229, 229, 229, 0.2)',
  backgroundColor: 'white',
  padding: '1.5rem',
  boxShadow:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  borderRadius: '0.5rem',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  ':focus': {
    outline: 'none',
  },
});

// Title 스타일
export const title = style({
  margin: 0,
  fontSize: '1.125rem',
  fontWeight: 600,
  lineHeight: '1.75rem',
  letterSpacing: '-0.025em',
  color: '#111827',
});

// Description 스타일
export const description = style({
  margin: 0,
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: '#6b7280',
});

export const footer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center', // 수직 정렬
  gap: '0.5rem',
  marginTop: '1.5rem',
  width: '100%', // 전체 너비 사용
});

// Action & Cancel 버튼 스타일
export const action = style({
  marginTop: '1.5rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: '0.5rem',
});

export const actionButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  height: '2.25rem',
  padding: '0 1rem',
  transition: 'all 0.2s',
  cursor: 'pointer',
  border: 'none',
  ':focus-visible': {
    outline: '2px solid #3b82f6',
    outlineOffset: '2px',
  },
  ':disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
});

export const cancelButton = style([
  actionButton,
  {
    backgroundColor: 'transparent',
    color: '#111827',
    border: '1px solid #e5e7eb',
    ':hover': {
      backgroundColor: '#f9fafb',
    },
  },
]);

export const confirmButton = style([
  actionButton,
  {
    backgroundColor: '#111827',
    color: 'white',
    ':hover': {
      backgroundColor: '#1f2937',
    },
  },
]);

export const destructiveButton = style([
  actionButton,
  {
    backgroundColor: '#dc2626',
    color: 'white',
    ':hover': {
      backgroundColor: '#b91c1c',
    },
  },
]);
