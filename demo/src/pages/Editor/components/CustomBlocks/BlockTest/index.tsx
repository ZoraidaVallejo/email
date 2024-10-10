import {
  IBlockData,
  BasicType,
  components,
  createCustomBlock,
  getPreviewClassName,
  AdvancedType,
  mergeBlock,
} from 'easy-email-core';
import { NavbarLinkPadding } from "easy-email-extensions";
import { CustomBlocksType } from '../constants';
import React from 'react';

const {Wrapper, Section, Column, Image, BasicBlock } = components;

export type IBlockTest = IBlockData<
  {
    'background-color'?: string;
    'text-color'?: string;
    align?: string;
    'src'?: string;
    width?: string;
    padding?: string;
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
      'text-transform'?: string;
      target?: string;
      padding?: string;
    }>;
  }
>;

export const BlockTest = createCustomBlock<IBlockTest>({
  name: 'Footer',
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
              padding: '5px 10px 0px 0px',
              'text-transform': 'capitalize',
            },
            {
              href: 'https://www.justia.com/marketing/',
              content: 'Unsubscribe',
              color: '#ffffff',
              'font-size': '14px',
              target: '_blank',
              padding: '5px 10px 0px 0px',
              'text-transform': 'capitalize',
            },
            {
              href: 'https://www.justia.com/privacy-policy/',
              content: 'Privacy Policy',
              color: '#ffffff',
              'font-size': '14px',
              target: '_blank',
              padding: '5px 10px 0px 0px',
              'text-transform': 'capitalize',
            },
          ],
        },
      },
      attributes: {
        align: 'center',
        'text-color': '#fffff',
        'background-color': '#06357a',
        src: 'https://justatic.com/v/2040227/shared/images/logos/justia-blue.png',
        width: '111px',
        padding: '12px 0px 12px 0px'
      },
      children: [],
    };
    return mergeBlock(defaultData, payload);
  },

  render(params) {
    const { data, idx, mode, context, dataSource } = params;
    const attributes = (data).attributes;
    const links = (data).data.value.links.map((link) => {
      const linkAttributeStr = Object.keys(link)
        .filter((key) => key !== 'content' && link[key as keyof typeof link] !== '') // filter att=""
        .map((key) => `${key}="${link[key as keyof typeof link]}"`)
        .join(' ');
      return `<mj-navbar-link ${linkAttributeStr}>${link.content}</mj-navbar-link>`;
    }).join('\n');

    mode == 'testing';

    return (
      <Wrapper
        css-class={mode === 'testing' ? getPreviewClassName(idx, data.type) : ''}
        padding={attributes['padding']}
        border='none'
        direction='ltr'
        text-align='center'
        background-color={attributes['background-color']}
      >
        <Section padding='0px'>
          <Column
            width='35%'
            padding='0px'
            border='none'
            vertical-align='middle'
          >
            <Image
              align='center'
              height='auto'
              padding='0px'
              width={attributes['width']}
              src={attributes['src']}
            />
          </Column>
          <Column
            width='65%'
            padding='0px'
            border='none'
            vertical-align='middle'
          >
            <BasicBlock params={params} tag='mj-navbar'>
              {links}
            </BasicBlock>
          </Column>
        </Section>
      </Wrapper>
    );
  },
});

export { Panel } from './Panel';