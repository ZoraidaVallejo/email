import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { ITexttwo } from '@core/blocks';
import MjmlBlock, { MjmlBlockProps } from '@core/components/MjmlBlock';

export type TextProps = RecursivePartial<ITexttwo['data']> &
  RecursivePartial<ITexttwo['attributes']> & {
    children?: MjmlBlockProps<ITexttwo>['children'];
  };

export function Texttwo(props: TextProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children', 'value'])}
      value={props.value}
      type={BasicType.TEXTTWO}
    >
      {props.children}
    </MjmlBlock>
  );
}
