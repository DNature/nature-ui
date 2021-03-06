import * as React from 'react';
import {
  As,
  Dict,
  isEmptyObject,
  isString,
  isUndefined,
  runIfFn,
} from '@nature-ui/utils';
import hoist from 'hoist-non-react-statics';
import { CSSObject } from '@emotion/css';

import { jsx } from './jsx';
import { NatureComponent } from './system-types';
import { getDisplayName } from './system-utils';

export const createComponent = <T extends As>(component: T) => {
  // return (...interpolations: any[]) => {
  return (...interpolations: any[]) => {
    const Component = React.forwardRef((_props: any, ref: React.Ref<any>) => {
      const { as, ...props } = _props;
      let computedStyles: CSSObject = {};

      interpolations.forEach((interpolation) => {
        const style = runIfFn(interpolation, { ...props });

        computedStyles = {
          ...computedStyles,
          ...style,
        };
      });

      const element = as || component;

      const isTag = isString(element);

      const computedProps: Dict = isTag ? { ...props } : { ...props };
      // const computedProps: Dict = !isTag && { ...props };

      if (isEmptyObject(computedProps.css) || isUndefined(computedProps.css)) {
        delete computedProps.css;
      }

      return jsx(element, {
        ref,
        ...computedProps,
      });
    });

    // Compute the display name of the final component
    Component.displayName = getDisplayName(component);

    Component.defaultProps = (component as any).defaultProps;
    // hoist all non-react statics attached to the `component` prop
    const MainComponent = hoist(Component, component as any);

    return MainComponent as NatureComponent<T>;
  };
  // };
};
