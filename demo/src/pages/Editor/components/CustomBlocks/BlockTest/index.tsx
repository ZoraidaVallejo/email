import {
  IBlockData,
  BasicType,
  components,
  createCustomBlock,
  getPreviewClassName,
  AdvancedType,
  mergeBlock,
} from 'easy-email-core';

import { CustomBlocksType } from '../constants';
import React from 'react';
import { link } from 'fs';

const {Wrapper, Section, Column, Image, Navbar } = components;

export type IBlockTest = IBlockData<
  {
    'background-color'?: string;
    'text-color'?: string;
    align?: string;
  },
  {
    links: Array<{
      content: string;
      color?: string;
      href?: string;
      'font-family'?: string;
      'font-size'?: string;
      'font-style'?: string;
      'font-weight'?: string;
      'line-height'?: string;
      'text-decoration'?: string;
      target?: string;
      padding?: string;
    }>;
  }
>;

export const BlockTest = createCustomBlock<IBlockTest>({
  name: 'Product recommendation',
  type: CustomBlocksType.BLOCK_TEST,
  validParentType: [BasicType.PAGE, AdvancedType.WRAPPER, BasicType.WRAPPER],
  create: (payload) => {
    const defaultData: IBlockTest = {
      type: CustomBlocksType.BLOCK_TEST,
      data: {
        value: {
          links: [
            {
              href: 'https://www.justia.com/marketing/',
              content: 'Contact Us',
              color: '#ffffff',
              'font-size': '14px',
              target: '_blank',
              padding: '5px 10px',
            },
            {
              href: 'https://www.justia.com/marketing/',
              content: 'Unsubscribe',
              color: '#ffffff',
              'font-size': '14px',
              target: '_blank',
              padding: '5px 10px',
            },
            {
              href: 'https://www.justia.com/privacy-policy/',
              content: 'Privacy Policy',
              color: '#ffffff',
              'font-size': '14px',
              target: '_blank',
              padding: '5px 10px',
            },
          ],
        },
      },
      attributes: {
        align: 'center',
        'background-color': '#ffffff',
      },
      children: [
      ],
    };
    return mergeBlock(defaultData, payload);
  },

  render(params) {
    const { data } = params;
    const attributes = (data).attributes;
    const links = (data).data.value.links.map((link) => {
      const linkAttributeStr = Object.keys(link)
        .filter((key) => key !== 'content' && link[key as keyof typeof link] !== '') // filter att=""
        .map((key) => `${key}="${link[key as keyof typeof link]}"`)
        .join(' ');
      return `<mj-navbar-link ${linkAttributeStr}>${link.content}</mj-navbar-link>`;
    }).join('\n');

    console.log(links)

    return (
      <Wrapper
        padding='20px 0px 20px 0px'
        border='none'
        direction='ltr'
        text-align='center'
        background-color={attributes['background-color']}
      >
            <Navbar>{links}</Navbar>
      </Wrapper>
    );
  },
});

export { Panel } from './Panel';