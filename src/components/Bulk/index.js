import React, { useContext, useEffect, useRef, useState } from 'react';

import { Sticker } from './ui/Sticker';

import './index.css';
import { DECK_ITEM_ALIGN_MAP, DEFAULT_STYLE_POSITION } from '../../common/constants';
import { BULK_TEMPLATE_MAP } from './constants';
import { JetsContext } from '../../common';

const SCALE_BULK_COEFF = 0.7;

export const JetsBulk = ({ id, type, align, width, height, iconType, xOffset, topOffset }) => {
  const { params, colorTheme } = useContext(JetsContext);
  const { bulkBaseColor, bulkCutColor } = colorTheme;
  const [stickerWrapperHeight, setStickerWrapperHeight] = useState(0);
  const $component = useRef(null);

  const [style, setStyle] = useState(() => {
    const updatedWidth = Math.floor(width * SCALE_BULK_COEFF);
    const updatedHeight = Math.floor(height * SCALE_BULK_COEFF);

    return {
      top: topOffset,
      left: align === DECK_ITEM_ALIGN_MAP.left ? xOffset : DEFAULT_STYLE_POSITION,
      right: align === DECK_ITEM_ALIGN_MAP.right ? xOffset : DEFAULT_STYLE_POSITION,
      width: updatedWidth,
      height: updatedHeight,
      transform: align === DECK_ITEM_ALIGN_MAP.right ? 'scaleX(-1)' : '',
    };
  });

  const addFontSizeToBulk = () => {
    const coeffFontSize = 10;
    const bulkFontSize = style.width > style.height ? style.width / coeffFontSize : style.height / coeffFontSize;

    const updatedStyle = { ...style };

    updatedStyle.fontSize = `${Math.round(bulkFontSize)}px`;

    setStyle(updatedStyle);
  };

  const onLoadBulk = () => {
    if (!$component.current) return;

    const $bulkBase = $component.current.querySelector('.bulk-base');

    if (!$bulkBase) return;

    const clientRect = $bulkBase.getBoundingClientRect();
    const bulkPartHeight = params?.isHorizontal ? clientRect.width : clientRect.height;

    const preparedStickerWrapperHeight = Math.round(
      style.height - bulkPartHeight * params.antiScale * SCALE_BULK_COEFF
    );

    setStickerWrapperHeight(preparedStickerWrapperHeight);
  };

  useEffect(() => {
    addFontSizeToBulk();
    onLoadBulk();
  }, []);

  let coloredBulkSVG = BULK_TEMPLATE_MAP.get(id);
  coloredBulkSVG = coloredBulkSVG.replace('$baseColor', bulkBaseColor);
  coloredBulkSVG = coloredBulkSVG.replace('$cutColor', bulkCutColor);

  return (
    <div className="bulk" style={style} ref={$component}>
      <div
        className="bulk__icon"
        dangerouslySetInnerHTML={{
          __html: coloredBulkSVG,
        }}
      />
      {
        <div
          className="bulk__sticker_wrap"
          style={{
            height: `${stickerWrapperHeight}px`,
          }}
        >
          <Sticker iconType={iconType} />
        </div>
      }
    </div>
  );
};
