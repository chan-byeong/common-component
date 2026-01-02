import * as React from 'react';

export const Slot = (
  props: React.PropsWithChildren<{ ref: React.Ref<unknown> }>
) => {
  const { children, ref: parentRef, ...slotProps } = props;

  // lazy component <- use를 통해 await (생략)

  if (React.isValidElement(children)) {
    const childRef =
      (children.props as { ref?: React.Ref<unknown> })?.ref || null;
    const combinedProps = mergeProps(
      slotProps,
      children.props as Record<string, unknown>
    );

    if (children.type !== React.Fragment) {
      combinedProps.ref = parentRef
        ? composeRefs(parentRef, childRef)
        : childRef;
    }

    return React.cloneElement(children, combinedProps);
  }
};

// 19 버전 부터 ref cleanup 기능이 추가되었다고 한다.
function composeRefs<T>(...refs: React.Ref<T>[]) {
  return (node: T | null) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      if (typeof ref === 'function') {
        hasCleanup = true;
        return ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });

    if (hasCleanup) {
      cleanups.forEach((cleanup) => cleanup && cleanup());
    }
  };
}

// https://github.com/radix-ui/primitives/blob/main/packages/react/slot/src/slot.tsx
// 베껴서 가져옴
function mergeProps(
  slotProps: Record<string, unknown>,
  childProps: Record<string, unknown>
) {
  // all child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          const result = (childPropValue as (...args: unknown[]) => unknown)(
            ...args
          );
          (slotPropValue as (...args: unknown[]) => unknown)(...args);
          return result;
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === 'style') {
      overrideProps[propName] = {
        ...(slotPropValue as Record<string, unknown>),
        ...(childPropValue as Record<string, unknown>),
      };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}
