import { useBoolean, useControllableProp } from '@nature-ui/hooks';
import {
  dataAttr,
  ariaAttr,
  callAllHandler,
  Dict,
  mergeRefs,
} from '@nature-ui/utils';
import { visuallyHiddenStyle } from '@nature-ui/visually-hidden';
import * as React from 'react';

export interface UseRadioProps {
  /**
   * id assigned to input
   */
  id?: string;
  /**
   * The name of the input field in a radio
   * (Useful for form submission).
   */
  name?: string;
  /**
   * The value to be used in the radio button.
   * This is the value that will be returned on form submission.
   */
  value?: string | number;
  /**
   * If `true`, the radio will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  isChecked?: boolean;
  /**
   * If `true`, the radio will be initially checked.
   */
  defaultIsChecked?: boolean;
  /**
   * If `true`, the radio will be disabled
   */
  isDisabled?: boolean;
  /**
   * If `true` and `isDisabled` is true, the radio will remain
   * focusable but not interactive.
   */
  isFocusable?: boolean;
  /**
   * If `true`, the radio will be read-only
   */
  isReadOnly?: boolean;
  /**
   * If `true`, the radio button will be invalid. This sets `aria-invalid` to `true`.
   */
  isInvalid?: boolean;
  /**
   * If `true`, the radio button will be invalid. This sets `aria-invalid` to `true`.
   */
  isRequired?: boolean;
  /**
   * Function called when checked state of the `input` changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useRadio = (props: UseRadioProps = {}) => {
  const {
    defaultIsChecked,
    isChecked: isCheckedProp,
    isFocusable,
    isDisabled,
    isReadOnly,
    isRequired,
    onChange,
    isInvalid,
    name,
    value,
    id,
    ...htmlProps
  } = props;

  const [isFocused, setFocused] = useBoolean();
  const [isHovered, setHovering] = useBoolean();
  const [isActive, setActive] = useBoolean();

  const ref = React.useRef<HTMLInputElement>(null);

  const [isCheckedState, setChecked] = React.useState(
    Boolean(defaultIsChecked),
  );

  const [isControlled, isChecked] = useControllableProp(
    isCheckedProp,
    isCheckedState,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly || isDisabled) {
      event.preventDefault();

      return;
    }

    if (!isControlled) {
      setChecked(event.target.checked);
    }

    onChange?.(event);
  };

  const trulyDisabled = isDisabled && !isFocusable;

  const onKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === ' ') {
        setActive.on();
      }
    },
    [setActive],
  );

  const onKeyUp = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === ' ') {
        setActive.off();
      }
    },
    [setActive],
  );

  return {
    state: {
      isInvalid,
      isFocused,
      isChecked,
      isActive,
      isHovered,
      isDisabled,
      isReadOnly,
      isRequired,
    },
    getCheckboxProps: (_props: Dict = {}) => ({
      ..._props,
      'data-active': dataAttr(isActive),
      'data-hover': dataAttr(isHovered),
      'data-disabled': dataAttr(isDisabled),
      'data-invalid': dataAttr(isInvalid),
      'data-checked': dataAttr(isChecked),
      'data-focus': dataAttr(isFocused),
      'data-readonly': dataAttr(isReadOnly),
      'aria-hidden': true,
      onMouseDown: callAllHandler(_props.onMouseDown, setActive.on),
      onMouseUp: callAllHandler(_props.onMouseUp, setActive.off),
      onMouseEnter: callAllHandler(_props.onMouseEnter, setHovering.on),
      onMouseLeave: callAllHandler(_props.onMouseLeave, setHovering.off),
    }),
    getInputProps: (_props: Dict = {}) => ({
      ..._props,
      ref: mergeRefs(_props.ref, ref),
      type: 'radio',
      name,
      value,
      id,
      onChange: callAllHandler(_props.onChange, handleChange),
      onBlur: callAllHandler(_props.onBlur, setFocused.off),
      onFocus: callAllHandler(_props.onFocus, setFocused.on),
      onKeyDown: callAllHandler(_props.onKeyDown, onKeyDown),
      onKeyUp: callAllHandler(_props.onKeyUp, onKeyUp),
      'aria-required': ariaAttr(isRequired),
      checked: isChecked,
      disabled: trulyDisabled,
      readOnly: isReadOnly,
      'aria-invalid': ariaAttr(isInvalid),
      'aria-disabled': ariaAttr(isDisabled),
      style: visuallyHiddenStyle,
    }),
    getLabelProps: (_props: Dict = {}) => {
      /**
       * Prevent `onBlur` being fired when the checkbox label is touched
       */
      const stop = (event: React.SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
      };

      return {
        ..._props,
        style: {
          ..._props.style,
          touchAction: 'none',
        },
        onMouseDown: callAllHandler(_props.onMouseDown, stop),
        onTouchStart: callAllHandler(_props.onTouchState, stop),
        'data-disabled': dataAttr(isDisabled),
        'data-checked': dataAttr(isChecked),
        'data-invalid': dataAttr(isInvalid),
      };
    },
    htmlProps,
  };
};

export type UseRadioReturn = ReturnType<typeof useRadio>;
