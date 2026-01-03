import React from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import { Slot } from '../utils/slot';
import {
  overlay,
  content,
  title,
  description,
  footer,
  confirmButton,
  cancelButton,
} from './alert-dialog.css';

interface AlertDialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  triggerId: string;
  contentId: string;
  titleId: string;
  descriptionId: string;
}

const AlertDialogContext = React.createContext<
  AlertDialogContextValue | undefined
>(undefined);

const useAlertDialogContext = () => {
  const context = React.useContext(AlertDialogContext);

  if (!context) {
    throw new Error(
      'AlertDialogContext is undefined. Make sure you are using AlertDialog within an AlertDialogProvider.'
    );
  }

  return context;
};

interface AlertDialogProps {
  defaultOpen?: boolean;
  open?: boolean;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export const AlertDialog = ({
  children,
  open: openProp,
  onOpenChange: onOpenChangeProp,
  defaultOpen = false,
}: AlertDialogProps) => {
  const [open, setOpen] = React.useState(defaultOpen || false);

  const isOpen = openProp ?? open;
  const onOpenChage = onOpenChangeProp ?? setOpen;

  const triggerId = React.useId();
  const contentId = React.useId();
  const titleId = React.useId();
  const descriptionId = React.useId();

  const contextValue: AlertDialogContextValue = {
    open: isOpen,
    onOpenChange: onOpenChage,
    triggerId,
    contentId,
    titleId,
    descriptionId,
  };

  return (
    <AlertDialogContext.Provider value={contextValue}>
      {children}
    </AlertDialogContext.Provider>
  );
};

/**
 * AlertDialogTrigger
 */

// interface AlertDialogTriggerProps
//   extends React.ComponentPropsWithRef<'button'> {}

interface AlertDialogTriggerProps
  extends React.ComponentPropsWithRef<'button'> {
  asChild?: boolean;
}

export const AlertDialogTrigger = ({
  asChild = false,
  onClick,
  ...props
}: AlertDialogTriggerProps) => {
  const context = useAlertDialogContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('AlertDialogTrigger clicked');
    console.log('Current open state:', context.open);
    context.onOpenChange(!context.open);
    onClick?.(event);
  };

  const triggerProps = {
    type: 'button' as const,
    'aria-haspopup': 'dialog' as const,
    'aria-expanded': context.open,
    'aria-controls': context.contentId,
    onClick: handleClick,
  };

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      {...triggerProps}
      {...props} // ref 포함
    >
      {props.children}
    </Comp>
  );
};

/**
 * AlertDialogPortal
 */

interface AlertDialogPortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

export const AlertDialogPortal = ({
  children,
  container,
}: AlertDialogPortalProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const portalContainer = container || document.body;
  return createPortal(children, portalContainer);
};

/**
 * AlertDialogOverlay
 */
interface AlertDialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  isCloseable?: boolean;
}

export const AlertDialogOverlay = ({
  isCloseable = false, // 백그라운드 클릭 시 모달 닫히는지 안 닫히는지 설정
  className,
  ...props
}: AlertDialogOverlayProps) => {
  const context = useAlertDialogContext();
  const { onClick, ...restProps } = props;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isCloseable && event.target === event.currentTarget) {
      context.onOpenChange(false);
    }
    onClick?.(event);
  };

  return (
    <div
      {...restProps}
      className={clsx(overlay, className)}
      onClick={handleClick}
      aria-hidden='true'
      data-state={context.open ? 'open' : 'closed'}
    />
  );
};

/**
 * AlertDialogContent
 */
interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  isDismissable?: boolean;
}
// todo: .focus() 설정하기
export const AlertDialogContent = ({
  children,
  isDismissable = false,
  className,
  ...props
}: AlertDialogContentProps) => {
  const context = useAlertDialogContext();

  React.useEffect(() => {
    if (!context.open) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        context.onOpenChange(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [context.open, context.onOpenChange]);

  React.useEffect(() => {
    if (!context.open) return undefined;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [context.open]);

  // open이 false일 때는 렌더링하지 않음
  if (!context.open) {
    return null;
  }

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay isCloseable={isDismissable} />
      <div
        role='alertdialog'
        aria-modal='true'
        aria-labelledby={context.titleId}
        aria-describedby={context.descriptionId}
        id={context.contentId}
        data-state={context.open ? 'open' : 'closed'}
        className={clsx(content, className)}
        {...props}
      >
        {children}
      </div>
    </AlertDialogPortal>
  );
};

/**
 * AlertDialogTitle
 */
interface AlertDialogTitleProps extends React.ComponentPropsWithRef<'h2'> {}

export const AlertDialogTitle = ({
  className,
  ...props
}: AlertDialogTitleProps) => {
  const { titleId } = useAlertDialogContext();
  return <h2 id={titleId} className={clsx(title, className)} {...props} />;
};

/**
 * AlertDialogDescription
 */
interface AlertDialogDescriptionProps
  extends React.ComponentPropsWithRef<'p'> {}

export const AlertDialogDescription = ({
  className,
  ...props
}: AlertDialogDescriptionProps) => {
  const { descriptionId } = useAlertDialogContext();
  return (
    <p id={descriptionId} className={clsx(description, className)} {...props} />
  );
};

/**
 * AlertDialogFooter
 */

interface AlertDialogFooterProps extends React.ComponentPropsWithRef<'div'> {}

export const AlertDialogFooter = ({
  className,
  ...props
}: AlertDialogFooterProps) => {
  return <div className={clsx(footer, className)} {...props} />;
};

/**
 * AlertDialogAction & AlertDialogCancel
 */

interface AlertDialogActionProps extends React.ComponentPropsWithRef<'button'> {
  asChild?: boolean;
}

export const AlertDialogAction = ({
  asChild = false,
  onClick,
  className,
  ...props
}: AlertDialogActionProps) => {
  const context = useAlertDialogContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    context.onOpenChange(false);
    onClick?.(event);
  };

  const actionProps = {
    type: 'button' as const,
    onClick: handleClick,
  };

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      {...actionProps}
      {...props}
      className={clsx(confirmButton, className)}
    />
  );
};

interface AlertDialogCancelProps extends React.ComponentPropsWithRef<'button'> {
  asChild?: boolean;
}

export const AlertDialogCancel = ({
  asChild = false,
  onClick,
  className,
  ...props
}: AlertDialogCancelProps) => {
  const context = useAlertDialogContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    context.onOpenChange(false);
    console.log('AlertDialogCancel clicked, dialog closed');
    onClick?.(event);
  };
  const cancelProps = {
    type: 'button' as const,
    onClick: handleClick,
  };

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      {...cancelProps}
      {...props}
      className={clsx(cancelButton, className)}
    />
  );
};

// Compound Component Pattern 적용
AlertDialog.Trigger = AlertDialogTrigger;
AlertDialog.Portal = AlertDialogPortal;
AlertDialog.Overlay = AlertDialogOverlay;
AlertDialog.Content = AlertDialogContent;
AlertDialog.Title = AlertDialogTitle;
AlertDialog.Description = AlertDialogDescription;
AlertDialog.Footer = AlertDialogFooter;
AlertDialog.Action = AlertDialogAction;
AlertDialog.Cancel = AlertDialogCancel;
