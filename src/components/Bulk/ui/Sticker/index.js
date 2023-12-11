import React, { useEffect, useRef, useState, useContext } from 'react';
import { STICKER_TEMPLATE_MAP } from '../../constants';
import { JetsContext } from '../../../../common';

export const Sticker = ({ iconType }) => {
  const [componentClassName, setComponentClassName] = useState('');
  const $component = useRef();
  const { params, colorTheme } = useContext(JetsContext);

  const { bulkIconColor } = colorTheme;

  const preparedIconType = iconType ? iconType.toLowerCase().trim() : '';

  const onLoadSticker = () => {
    if (!$component.current) return;

    const { width, height } = $component.current.getBoundingClientRect();
    const orientationCheck = params?.isHorizontal ? height > width : width > height;

    const stickerClass = orientationCheck ? 'bulk__sticker--album' : 'bulk__sticker--portrait';

    setComponentClassName(stickerClass);
  };

  useEffect(() => {
    onLoadSticker();
  }, []);

  let coloredStickerSVG = STICKER_TEMPLATE_MAP.get(preparedIconType);
  // if (preparedIconType && !coloredStickerSVG) {
  //   console.log('NOT SUPPORTED STICKER:', preparedIconType);
  // }
  coloredStickerSVG = preparedIconType && coloredStickerSVG?.replace('$stickerColor', bulkIconColor);

  return (
    <div className={`bulk__sticker ${componentClassName}`} ref={$component}>
      {preparedIconType && (
        <div
          className="bulk__icon"
          dangerouslySetInnerHTML={{
            __html: coloredStickerSVG,
          }}
        />
      )}
    </div>
  );
};
