import * as React from 'react';
import { Button } from '../ui/button';
import { buttonOverrides } from '../../app.css.ts';
import { complexButtonStyle } from './complex-button.css.ts';

interface ComplexButtonProps extends React.ComponentProps<typeof Button> {
  /**
   * 버튼의 주요 액션 핸들러
   */
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * 마우스 진입 핸들러
   */
  onHover?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * 마우스 이탈 핸들러
   */
  onLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * 포커스 핸들러
   */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /**
   * 블러 핸들러
   */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /**
   * 키보드 핸들러
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  /**
   * 접근성을 위한 aria-label
   */
  'aria-label'?: string;
  /**
   * 접근성을 위한 aria-describedby
   */
  'aria-describedby'?: string;
  /**
   * 접근성을 위한 aria-pressed (토글 버튼인 경우)
   */
  'aria-pressed'?: boolean | 'mixed';
  /**
   * 커스텀 스타일 오버라이드
   */
  styleOverride?: React.CSSProperties;
  /**
   * 로딩 상태
   */
  isLoading?: boolean;
  /**
   * 비활성화 상태
   */
  isDisabled?: boolean;
  /**
   * 아이콘 (선택적)
   */
  icon?: React.ReactNode;
  /**
   * 아이콘 위치
   */
  iconPosition?: 'left' | 'right';
}

const ComplexButton = React.forwardRef<HTMLButtonElement, ComplexButtonProps>(
  (
    {
      onAction,
      onHover,
      onLeave,
      onFocus,
      onBlur,
      onKeyDown,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-pressed': ariaPressed,
      styleOverride,
      isLoading = false,
      isDisabled = false,
      icon,
      iconPosition = 'left',
      children,
      className,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      onKeyDown: onKeyDownProp,
      disabled,
      style: styleProp,
      ...props
    },
    ref
  ) => {
    // 이벤트 핸들러 합성
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isLoading || isDisabled || disabled) {
          event.preventDefault();
          return;
        }
        onAction?.(event);
        onClick?.(event);
      },
      [onAction, onClick, isLoading, isDisabled, disabled]
    );

    const handleMouseEnter = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled || disabled) return;
        onHover?.(event);
        onMouseEnter?.(event);
      },
      [onHover, onMouseEnter, isDisabled, disabled]
    );

    const handleMouseLeave = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled || disabled) return;
        onLeave?.(event);
        onMouseLeave?.(event);
      },
      [onLeave, onMouseLeave, isDisabled, disabled]
    );

    const handleFocus = React.useCallback(
      (event: React.FocusEvent<HTMLButtonElement>) => {
        if (isDisabled || disabled) return;
        onFocus?.(event);
        onFocusProp?.(event);
      },
      [onFocus, onFocusProp, isDisabled, disabled]
    );

    const handleBlur = React.useCallback(
      (event: React.FocusEvent<HTMLButtonElement>) => {
        if (isDisabled || disabled) return;
        onBlur?.(event);
        onBlurProp?.(event);
      },
      [onBlur, onBlurProp, isDisabled, disabled]
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (isDisabled || disabled) return;
        // Enter나 Space 키로도 클릭 가능하도록
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick(event as unknown as React.MouseEvent<HTMLButtonElement>);
        }
        onKeyDown?.(event);
        onKeyDownProp?.(event);
      },
      [onKeyDown, onKeyDownProp, handleClick, isDisabled, disabled]
    );

    // 스타일 병합
    const mergedStyle = React.useMemo(
      () => ({
        ...styleProp,
        ...styleOverride,
        ...(isLoading && { cursor: 'wait' }),
        ...(isDisabled && { cursor: 'not-allowed', opacity: 0.6 }),
      }),
      [styleProp, styleOverride, isLoading, isDisabled]
    );

    // className 병합
    const mergedClassName = React.useMemo(
      () =>
        [complexButtonStyle, buttonOverrides, className]
          .filter(Boolean)
          .join(' '),
      [className]
    );

    // 아이콘과 텍스트 렌더링
    const content = React.useMemo(() => {
      if (isLoading) {
        return (
          <>
            <span
              style={{
                display: 'inline-block',
                width: '1em',
                height: '1em',
                border: '2px solid currentColor',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.6s linear infinite',
                marginRight: iconPosition === 'left' ? '0.5em' : 0,
                marginLeft: iconPosition === 'right' ? '0.5em' : 0,
              }}
              aria-hidden='true'
            />
            {children}
          </>
        );
      }

      if (icon) {
        return (
          <>
            {iconPosition === 'left' && (
              <span style={{ marginRight: '0.5em' }} aria-hidden='true'>
                {icon}
              </span>
            )}
            {children}
            {iconPosition === 'right' && (
              <span style={{ marginLeft: '0.5em' }} aria-hidden='true'>
                {icon}
              </span>
            )}
          </>
        );
      }

      return children;
    }, [isLoading, icon, iconPosition, children]);

    return (
      <Button
        ref={ref}
        className={mergedClassName}
        style={mergedStyle}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={isDisabled || disabled || isLoading}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-pressed={ariaPressed}
        aria-busy={isLoading}
        {...props}
      >
        {content}
      </Button>
    );
  }
);

ComplexButton.displayName = 'ComplexButton';

export { ComplexButton };
