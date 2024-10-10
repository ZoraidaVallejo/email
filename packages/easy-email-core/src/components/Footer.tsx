import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { IFooter } from '@core/blocks';
import MjmlBlock, { MjmlBlockProps } from '@core/components/MjmlBlock';

export type FooterProps = RecursivePartial<IFooter['data']> &
  RecursivePartial<IFooter['attributes']> & {
    children?: MjmlBlockProps<IFooter>['children'];
  };

export function Footer(props: FooterProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children', 'value'])}
      value={props.value}
      type={BasicType.FOOTER}
    >
      {props.children}
    </MjmlBlock>
  );
}
