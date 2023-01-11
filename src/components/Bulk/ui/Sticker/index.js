import React, { useRef, useState } from 'react';
import SVG from 'react-inlinesvg';

export const Sticker = ({ iconType }) => {
  const [componentClassName, setComponentClassName] = useState('');
  const $component = useRef();

  const preparedIconType = iconType ? iconType.toLowerCase() : '';

  const onLoadSticker = () => {
    const { width, height } = $component.current.getBoundingClientRect();

    const stickerClass = width > height ? 'bulk__sticker--album' : 'bulk__sticker--portrait';

    setComponentClassName(stickerClass);
  };

  return (
    <div className={`bulk__sticker ${componentClassName}`} ref={$component}>
      {preparedIconType && (
        <SVG
          className="bulk__icon"
          onLoad={onLoadSticker}
          src={require(`../../../../assets/icons/${preparedIconType}.svg`)}
        />
      )}
    </div>
  );
};
