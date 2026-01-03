import { Slot } from '../utils/slot';
import { buttonVariants, sizeVariants } from './buttons.css';
import { clsx } from 'clsx';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?:
    | 'default'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'secondary'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
  asChild?: boolean;
}

export const Button = ({
  variant = 'default',
  size = 'default',
  asChild = false,
  ref = null,
  className,
  ...props
}: ButtonProps) => {
  const buttonStyles = buttonVariants[`${variant}`];
  const sizeStyles = sizeVariants[`${size}`];

  const classes = clsx(buttonStyles, sizeStyles, className);

  const Comp = asChild ? Slot : 'button';

  return <Comp ref={ref} className={classes} {...props} />;
};
