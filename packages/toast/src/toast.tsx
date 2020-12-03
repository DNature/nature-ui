import { isFunction, __DEV__ } from '@nature-ui/utils';
import { Transition } from '@nature-ui/transition';
import { useTimeout } from '@nature-ui/hooks';
import ReachAlert from '@reach/alert';
import { useRect } from '@reach/rect';
import * as React from 'react';
import { nature } from '@nature-ui/system';

import { ToastOptions } from './toast.types';
import { getToastStyle } from './toast.utils';

export interface ToastProps extends ToastOptions {
  requestClose?: boolean;
}

const DivTag = nature('div');

export const Toast = (props: ToastProps) => {
  const {
    id,
    message,
    onCloseComplete,
    onRequestRemove,
    requestClose = false,
    position = 'bottom',
    duration = 5000,
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  const [delay, setDelay] = React.useState(duration);
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    setDelay(duration);
  }, [duration]);

  const onMouseEnter = () => {
    setDelay(null);
  };

  const onMouseLeave = () => {
    setDelay(duration);
  };

  const onExited = () => {
    if (!show) {
      onRequestRemove();
    }

    onCloseComplete?.();
  };

  const close = () => {
    setShow(false);
  };

  React.useEffect(() => {
    if (requestClose) {
      setShow(false);
    }
  }, [requestClose]);

  useTimeout(close, delay);

  const style = React.useMemo(() => getToastStyle(position), [position]);

  const rect = useRect(ref);
  const height = rect?.height ?? 0;

  const isTop = position.includes('top');

  const y = isTop ? `-${height}px` : 0;

  const styles = {
    init: {
      opacity: 0,
      height: 0,
      transform: `translateY(${y}) scale(1)`,
    },
    entered: {
      opacity: 1,
      height,
      transform: `translateY(0) scale(1)`,
    },
    exiting: {
      opacity: 0,
      height: 0,
      transform: `translateY(0) scale(0.9)`,
    },
  };

  return (
    <Transition
      styles={styles}
      transition='all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
      in={show}
      timeout={{
        enter: 0,
        exit: 150,
      }}
      onExited={onExited}
    >
      {(_styles) => (
        <DivTag
          data-toast=''
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            willChange: 'transform, height, opacity',
            ...style,
            ..._styles,
          }}
        >
          <DivTag
            ref={ref}
            data-toast-inner=''
            style={{
              pointerEvents: 'auto',
              maxWidth: 560,
              minWidth: 300,
            }}
          >
            <ReachAlert>
              {isFunction(message)
                ? message({
                    id,
                    onClose: close,
                  })
                : message}
            </ReachAlert>
          </DivTag>
        </DivTag>
      )}
    </Transition>
  );
};

if (__DEV__) {
  Toast.displayName = 'Toast';
}