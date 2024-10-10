import React from 'react';
import { AdvancedType, IImage, RecursivePartial } from 'easy-email-core';
import { Stack } from 'easy-email-editor';

import { BlockMaskWrapper } from '@extensions/ShortcutToolbar/components/BlockMaskWrapper';
import { getImg } from '@extensions/ShortcutToolbar/utils/getImg';
import { Picture } from '@extensions/ShortcutToolbar/components/Picture';

const list = [
  {
    thumbnail: getImg('IMAGE_46'),
    payload: {
      type: AdvancedType.FOOTER,
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
        'base-url': 'https://mjml.io',
      },
      children: [],
    },
  },
];

export function FooterBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {list.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={AdvancedType.FOOTER}
              payload={item.payload}
            >
              <div style={{ position: 'relative' }}>
                <Picture src={item.thumbnail} />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                  }}
                />
              </div>
            </BlockMaskWrapper>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}