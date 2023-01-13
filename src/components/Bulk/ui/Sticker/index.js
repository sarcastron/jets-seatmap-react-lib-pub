import React, { useEffect, useRef, useState } from 'react';
import { STICKER_TEMPLATE_MAP } from '../../constants';

export const Sticker = ({ iconType }) => {
  const [componentClassName, setComponentClassName] = useState('');
  const $component = useRef();

  const preparedIconType = iconType ? iconType.toLowerCase() : '';

  const onLoadSticker = () => {
    if (!$component.current) return;

    const { width, height } = $component.current.getBoundingClientRect();

    const stickerClass = width > height ? 'bulk__sticker--album' : 'bulk__sticker--portrait';

    setComponentClassName(stickerClass);
  };

  useEffect(() => {
    onLoadSticker();
  }, []);

  return (
    <div className={`bulk__sticker ${componentClassName}`} ref={$component}>
      {preparedIconType && (
        <div
          className="bulk__icon"
          dangerouslySetInnerHTML={{
            __html: STICKER_TEMPLATE_MAP.get(preparedIconType),
          }}
        />
      )}
    </div>
  );
};
