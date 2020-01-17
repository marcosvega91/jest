/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import setPrettyPrint from './setPrettyPrint';
import prettyFormat from '..';

const {ReactElement} = prettyFormat.plugins;

setPrettyPrint([ReactElement]);

describe('ReactElement Plugin', () => {
  let forwardRefComponent: {
    (_props: any, _ref: any): any;
    displayName?: string;
  };

  let forwardRefExample: ReturnType<typeof React.forwardRef>;

  beforeEach(() => {
    forwardRefComponent = (_props, _ref) => null;

    forwardRefExample = React.forwardRef(forwardRefComponent);

    forwardRefExample.displayName = undefined;
  });

  test('serializes forwardRef without displayName', () => {
    forwardRefExample = React.forwardRef((_props, _ref) => null);
    expect(React.createElement(forwardRefExample)).toPrettyPrintTo(
      '<ForwardRef />',
    );
  });

  test('serializes forwardRef with displayName', () => {
    forwardRefExample.displayName = 'Display';
    expect(React.createElement(forwardRefExample)).toPrettyPrintTo(
      '<Display />',
    );
  });

  test('serializes forwardRef component with displayName', () => {
    forwardRefComponent.displayName = 'Display';
    expect(React.createElement(forwardRefExample)).toPrettyPrintTo(
      '<ForwardRef(Display) />',
    );
  });
});
