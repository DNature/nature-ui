/** ** */
import { nature, clsx, PropsOf, css } from '@nature-ui/system';
import * as React from 'react';

import {
  __DEV__,
  lighten,
  darken,
  dataAttr,
  StringOrNumber,
} from '@nature-ui/utils';
import { Spinner } from '@nature-ui/spinner';

import { rippleEffect } from './button-effects';

interface ButtonProps {
  /**
   * The text color of the button. Use a color key passed in theme.colors.
   */
  text?: string;
  /**
   * The background color of the button. Use a color key passed in theme.colors.
   */
  color?: string;
  /**
   * The variant of the button style to use.
   */
  variant?: 'outline' | 'ghost' | 'link' | 'solid' | 'none';
  /**
   * If true, the button will be disabled.
   */
  isDisabled?: boolean;
  /**
   * If `true`, the button will be styled in it's active state.
   */
  isActive?: boolean;
  /**
   * If true, the button will show a spinner.
   */
  isLoading?: boolean;
  /**
   * The label to show in the button when isLoading is true. If no text is passed, it only shows the spinner
   */
  loadingText?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | number;
  /**
   * If added, the button will show an icon before the button's label.
   * @type React.ReactElement
   */
  leftIcon?: React.ReactElement;
  /**
   * If added, the button will show an icon after the button's label.
   * @type React.ReactElement
   */
  rightIcon?: React.ReactElement;
  /**
   * The space between the button icon and label.
   * @type SystemProps["marginRight"]
   */
  iconSpacing?: StringOrNumber;
  /**
   * Typeof String | JSX.Element
   */
  children?: React.ReactNode;
  /**
   * to specify if a button is an icon button.
   * If this is set to true, the default padding-x will be removed
   */
  isIconButton?: boolean;
}

const NatureButton = nature('button');

export type ButtonType = PropsOf<typeof NatureButton> & ButtonProps;

const _SIZES = {
  xs: {
    size: '1.5rem',
    font: '0.75rem',
    padding: 'px-2',
  },
  sm: {
    size: '2rem',
    font: '0.875rem',
    padding: 'px-3',
  },
  md: {
    size: '2.5rem',
    font: '1rem',
    padding: 'px-4',
  },
  lg: {
    size: '3rem',
    font: '1.125rem',
    padding: 'px-5',
  },
};

const ButtonIcon = (props: PropsOf<typeof nature.span>) => {
  const { children, ...rest } = props;

  const _children = React.isValidElement(children)
    ? React.cloneElement(children, {
        'aria-hidden': true,
        focusable: false,
      })
    : children;

  return <nature.span {...rest}>{_children}</nature.span>;
};

if (__DEV__) {
  ButtonIcon.displayName = 'ButtonIcon';
}

export const ButtonSpinner = (
  props: ButtonType & {
    spinner?: React.ReactNode;
    label?: string;
  },
) => {
  const { className = '', label, spinner, ...rest } = props;

  const _className = clsx(className, 'align-middle', {
    absolute: !label,
    relative: label,
  });

  return (
    <span className={_className} {...rest}>
      {spinner || <Spinner size='xs' color='currentColor' />}
      {label && <span className='ml-2'>{label}</span>}
    </span>
  );
};

export const Button = React.forwardRef(
  (props: ButtonType, ref: React.Ref<any>) => {
    const {
      as,
      variant = 'solid',
      color = 'gray-200',
      size = 'md',
      children,
      text: _text,
      className = '',
      isDisabled = false,
      isLoading = false,
      loadingText,
      isActive,
      leftIcon,
      rightIcon,
      isIconButton,
      iconSpacing = '10px',
      ...rest
    } = props;

    const textColor = (): string => {
      const split = color.split('-');
      const amount = Number(split[split.length - 1]);
      if (amount >= 300) {
        return 'white';
      }
      if (!amount) {
        return 'white';
      }
      return 'gray-600';
    };

    let text = _text || textColor();

    const _size = typeof size === 'string' ? _SIZES[size].size : `${size}px`;
    const _font = _SIZES[size].font ?? '1rem';
    const _padding = _SIZES[size].padding ?? '0.8rem';

    const _link = variant === 'link';

    const _sizes = css({
      height: _size,
      minWidth: _size,
    });

    if (Number(color.split('-')[1]) <= 400) {
      text = 'gray-700';
    }

    if (variant === 'ghost') {
      text = _text || 'gray-700';
    }

    const DEFAULT_CLASS =
      'focus:shadow-outline focus:outline-none rounded font-semibold relative overflow-hidden align-middle inline-flex justify-center items-center leading-normal';
    const STYLES = {
      solid: `bg-${color} text-${text} hover:bg-${darken(color)}`,
      outline: `bg-transparent text-${color ?? text} border border-${
        color ?? text
      } focus:border-transparent hover:bg-${lighten(color ?? text)}`,
      ghost: `hover:bg-${lighten(text)} text-${text}`,
      link: `hover:underline text-${color}`,
      disabled: 'opacity-50 cursor-not-allowed',
    };

    let BTNClass: string;

    if (variant === 'none') {
      BTNClass = clsx(className, {
        [STYLES.disabled]: isDisabled || isLoading,
      });
    } else {
      BTNClass = clsx(className, rippleEffect, DEFAULT_CLASS, {
        [_sizes]: !_link,
        [STYLES[variant]]: variant,
        [STYLES.disabled]: isDisabled || isLoading,
        [_padding]: !isIconButton && !_link,
      });
    }

    const defaults = {
      className: BTNClass,
      ref,
      as,
      size,
      disabled: isDisabled || isLoading,
      'data-active': dataAttr(isActive),
      'data-loading': dataAttr(isLoading),
    };

    return (
      <NatureButton
        css={{
          fontSize: _font,
        }}
        {...defaults}
        {...rest}
      >
        {leftIcon && !isLoading && (
          <ButtonIcon
            css={{
              marginRight: iconSpacing,
            }}
          >
            {leftIcon}
          </ButtonIcon>
        )}
        {isLoading ? (
          <>
            <ButtonSpinner label={loadingText}>{children}</ButtonSpinner>
            {children && !loadingText && (
              <nature.span className='opacity-0'>{children}</nature.span>
            )}
          </>
        ) : (
          children
        )}
        {rightIcon && !isLoading && (
          <ButtonIcon
            css={{
              marginLeft: iconSpacing,
            }}
          >
            {rightIcon}
          </ButtonIcon>
        )}
      </NatureButton>
    );
  },
);

if (__DEV__) {
  Button.displayName = 'Button';
  ButtonSpinner.displayName = 'ButtonSpinner';
}
