import React from 'react';
import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { getImg } from '@core/utils/getImg';
import { mergeBlock } from '@core/utils/mergeBlock';
import { t } from '@core/utils';
import { BasicBlock } from '@core/components/BasicBlock';

export type IFooter = IBlockData<
  {
    'background-color'?: string;
    'text-color'?: string;
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


export const Footer = createBlock<IFooter>({
  get name() {
    return t('Footer');
  },
  type: BasicType.FOOTER,
  create: payload => {
    const defaultData: IFooter = {
      type: BasicType.FOOTER,
      data: {
        value: {},
      },
      attributes: {
        'background-color': '#06357a',
        'text-color': '#ffffff'
      },
      children: [
        {
          type: BasicType.NAVBAR,
          children: [],
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
          },
        }
      ],
    };
    return mergeBlock(defaultData, payload);
  },
  validParentType: [BasicType.PAGE, BasicType.WRAPPER, BasicType.COLUMN],
  render(params) {
    const { data } = params;
    const links = (data ).data.value.links
      .map((link, index) => {
        const linkAttributeStr = Object.keys(link)
          .filter((key) => key !== 'content' && link[key as keyof typeof link] !== '') // filter att=""
          .map((key) => `${key}="${link[key as keyof typeof link]}"`)
          .join(' ');
        return `
          <mj-navbar-link ${linkAttributeStr}>${link.content}</mj-navbar-link>
          `;
      })
      .join('\n');

  },
});
