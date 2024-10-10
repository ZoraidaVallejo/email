import { BasicType, AdvancedType } from 'easy-email-core';

export function isFooterBlock(blockType: any) {
  return blockType === BasicType.FOOTER || blockType === AdvancedType.FOOTER;
}