import React from 'react';
import { ColorPickerField, EditTabField, SelectField, TextField, ImageUploaderField, SwitchField } from '@extensions/components/Form';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { IconLink } from '@arco-design/web-react/icon';
import { NavbarLinkPadding } from '@extensions/AttributePanel/components/attributes/NavbarLinkPadding';
import { useFocusIdx, useEditorProps, Stack } from 'easy-email-editor';
import { INavbar } from 'easy-email-core';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { Link } from '@extensions/AttributePanel/components/attributes/Link';

import {
  FontFamily,
  FontStyle,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TextDecoration,
  TextTransform,
} from '../../attributes';
import { imageHeightAdapter, pixelAdapter } from '../../adapter';

const fullWidthOnMobileAdapter = {
  format(obj: any) {
    return Boolean(obj);
  },
  parse(val: string) {
    if (!val) return undefined;

    return 'true';
  },
};

export function Footer() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item
          name='0'
          header={t('Layout')}
        >
          <Stack
            vertical
            spacing='tight'
          >
            <Align />
          </Stack>
        </Collapse.Item>

        <Collapse.Item
          contentStyle={{ padding: 0 }}
          name='1'
          header={t('Navbar links')}
        >
          <Space
            direction='vertical'
            style={{ width: '100%' }}
          >
            <EditTabField
              tabPosition='top'
              name={`${focusIdx}.data.value.links`}
              label={t('Links')}
              labelHidden
              renderItem={(item, index) => (
                <NavbarLink
                  item={item}
                  index={index}
                />
              )}
              additionItem={{
                src: 'https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg',
                target: '_blank',
                content: 'New link',
                color: '#1890ff',
                'font-size': '13px',
              }}
            />
            <div />
          </Space>
        </Collapse.Item>
        <Collapse.Item
          name='4'
          header={t('Extra')}
        >
          <Grid.Col span={24}>
            <ClassName />
          </Grid.Col>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}

function NavbarLink({
  item,
  index,
}: {
  item: INavbar['data']['value']['links'];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  return (
    <div className='NavbarLink'>
      <Space
        direction='vertical'
        style={{ width: '100%' }}
      >
        <Grid.Row>
          <Grid.Col span={11}>
            <TextField
              label={t('Content')}
              name={`${focusIdx}.data.value.links.[${index}].content`}
            />
          </Grid.Col>
          <Grid.Col
            offset={1}
            span={11}
          >
            <ColorPickerField
              label={t('Color')}
              name={`${focusIdx}.data.value.links.[${index}].color`}
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={11}>
            <FontFamily name={`${focusIdx}.data.value.links.[${index}].font-family`} />
          </Grid.Col>
          <Grid.Col
            offset={1}
            span={11}
          >
            <TextField
              label={t('Font size (px)')}
              name={`${focusIdx}.data.value.links.[${index}].font-size`}
              config={pixelAdapter}
              autoComplete='off'
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={11}>
            <LineHeight name={`${focusIdx}.data.value.links.[${index}].line-height`} />
          </Grid.Col>
          <Grid.Col
            offset={1}
            span={11}
          >
            <LetterSpacing
              name={`${focusIdx}.data.value.links.[${index}].letter-spacing`}
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={11}>
            <TextDecoration
              name={`${focusIdx}.data.value.links.[${index}].text-decoration`}
            />
          </Grid.Col>
          <Grid.Col
            offset={1}
            span={11}
          >
            <FontWeight name={`${focusIdx}.data.value.links.[${index}].font-weight`} />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={11}>
            <TextTransform
              name={`${focusIdx}.data.value.links.[${index}].text-transform`}
            />
          </Grid.Col>
          <Grid.Col
            offset={1}
            span={11}
          />
        </Grid.Row>
        <FontStyle name={`${focusIdx}.data.value.links.[${index}].font-style`} />
        <Grid.Row>
          <Grid.Col span={11}>
            <TextField
              prefix={<IconLink />}
              label={<span>{t('Url')}</span>}
              name={`${focusIdx}.data.value.links.[${index}].href`}
            />
          </Grid.Col>
          <Grid.Col
            offset={1}
            span={11}
          >
            <SelectField
              style={{ minWidth: 65 }}
              label={t('Target')}
              name={`${focusIdx}.data.value.links.[${index}].target`}
              options={[
                {
                  value: '_blank',
                  label: t('_blank'),
                },
                {
                  value: '_self',
                  label: t('_self'),
                },
              ]}
            />
          </Grid.Col>
        </Grid.Row>
        <NavbarLinkPadding
          key={index}
          name={`${focusIdx}.data.value.links.[${index}].padding`}
        />
        <div />
      </Space>
    </div>
  );
}

export function Image() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapseWrapper defaultActiveKey={['0', '1', '2', '3', '4']}>
        <Collapse.Item
          name='1'
          header={t('Setting')}
        >
          <Stack
            vertical
            spacing='tight'
          >
            <ImageUploaderField
              label={t('src')}
              labelHidden
              name={`${focusIdx}.attributes.src`}
              helpText={t(
                'The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.',
              )}
              uploadHandler={onUploadImage}
            />
            <ColorPickerField
              label={t('Background color')}
              name={`${focusIdx}.attributes.container-background-color`}
              inline
            />
            <SwitchField
              label={t('Full width on mobile')}
              name={`${focusIdx}.attributes.fluid-on-mobile`}
              config={fullWidthOnMobileAdapter}
            />
          </Stack>
        </Collapse.Item>

        <Collapse.Item
          name='0'
          header={t('Dimension')}
        >
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <Width config={pixelAdapter} />
              </Grid.Col>
              <Grid.Col
                offset={1}
                span={11}
              >
                <Height config={imageHeightAdapter} />
              </Grid.Col>
            </Grid.Row>

            <Padding showResetAll />
            <Grid.Row>
              <Grid.Col span={24}>
                <Align />
              </Grid.Col>
            </Grid.Row>
          </Space>
        </Collapse.Item>

        <Collapse.Item
          name='2'
          header={t('Link')}
        >
          <Stack
            vertical
            spacing='tight'
          >
            <Link />
          </Stack>
        </Collapse.Item>

        <Collapse.Item
          name='3'
          header={t('Border')}
        >
          <Border />
        </Collapse.Item>

        <Collapse.Item
          name='4'
          header={t('Extra')}
        >
          <Grid.Row>
            <Grid.Col span={11}>
              <TextField
                label={t('title')}
                name={`${focusIdx}.attributes.title`}
              />
            </Grid.Col>
            <Grid.Col
              offset={1}
              span={11}
            >
              <TextField
                label={t('alt')}
                name={`${focusIdx}.attributes.alt`}
              />
            </Grid.Col>
          </Grid.Row>
          <Grid.Col span={24}>
            <TextField
              label={t('class name')}
              name={`${focusIdx}.attributes.css-class`}
            />
          </Grid.Col>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
