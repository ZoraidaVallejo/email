import { Stack } from '@demo/components/Stack';
import { useFocusIdx } from 'easy-email-editor';
import {
  AttributesPanelWrapper,
  ColorPickerField,
  NumberField,
  TextField,
  FontFamily,
  FontStyle,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TextDecoration,
  TextTransform,
  Padding,
  BackgroundColor,
  CollapseWrapper,
  Color,
  FontSize
} from 'easy-email-extensions';
import React from 'react';
import { IBlockTest } from '.';
import { Collapse, Grid, Popover, Space, Button as ArcoButton } from '@arco-design/web-react';

export function Panel(
  {
    item,
    index,
  }: {
    item: IBlockTest['data']['value']['links'];
    index: number;
  }

) {

  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper>
      <CollapseWrapper defaultActiveKey={['0', '1', '2', '3']}>
        <Collapse.Item name='0' header={t('Wrapper Settings')}>
          <Space
            direction='vertical'
            style={{ width: '100%' }}
          >
          <BackgroundColor/>


          </Space>
          <Padding
            title={t('Padding')}
            name={`${focusIdx}.attributes.padding`}
            showResetAll
          />

        </Collapse.Item>
        <Collapse.Item name='1' header={t('Footer Nav Settings')}>
          <Space direction='vertical'>
            <ColorPickerField
              label='Text color'
              //name={`${focusIdx}.data.value.links.[${index}].color`}
              attributeName='color'
              inline
              alignment='center'
            />
            <Grid.Row>
              <Grid.Col span={11}>
                <Color />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <FontFamily />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col span={11}>
                <FontSize />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <FontWeight />
              </Grid.Col>
            </Grid.Row>

          </Space>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
