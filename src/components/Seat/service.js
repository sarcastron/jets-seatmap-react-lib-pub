export const seatTemplateService = {
  getTemplateBySeatType(seatType, style) {
    if (!seatType) return;

    const [cabinClass, type] = seatType.split('-');

    if (cabinClass === 'B') return businessClassTemplateService.getTemplate(type, style);
    if (cabinClass === 'F') return firstClassTemplateService.getTemplate(type, style);
    if (cabinClass === 'P') return premiumClassTemplateService.getTemplate(type, style);
    if (cabinClass === 'E') return economyClassTemplateService.getTemplate(type, style);

    return this._getFallBackTemplate();
  },

  _getFallBackTemplate() {
    return economyClassTemplateService.getTemplate(type, style);
  },
};

const businessClassTemplateService = {
  getTemplate(type, style) {
    if (type === '1') return this._type1(style);
    if (type === '4') return this._type4(style);

    return this._default(style);
  },

  _type1(style) {
    return `<svg version="1.1" baseProfile="full" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
            <g class="seat" transform="scale(1)">
                <path class="bd" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" fill="${style.fillColor}" d="M127.05,89.33H12.38V13.83A9.67,9.67,0,0,1,22,4.17,455.22,455.22,0,0,1,69.72,1.5a436.21,436.21,0,0,1,47.71,2.67,9.67,9.67,0,0,1,9.63,9.66Z"></path>
                <path class="bd" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" fill="${style.fillColor}" d="M12.38,89.33H127.05a0,0,0,0,1,0,0v36.26a7.59,7.59,0,0,1-7.59,7.59H20a7.59,7.59,0,0,1-7.59-7.59V89.33A0,0,0,0,1,12.38,89.33Z"></path><path stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" fill="${style.armrestColor}" class="bc" d="M13.84,131.7H3.08A3.09,3.09,0,0,1,0,128.61V33a3.09,3.09,0,0,1,3.08-3.08H13.84A3.09,3.09,0,0,1,16.93,33v95.64A3.09,3.09,0,0,1,13.84,131.7ZM140,128.61V33a3.09,3.09,0,0,0-3.08-3.08H126.57A3.09,3.09,0,0,0,123.49,33v95.64a3.09,3.09,0,0,0,3.08,3.08h10.34A3.09,3.09,0,0,0,140,128.61Z"></path>
                <path class="bd" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" fill="${style.fillColor}" d="M118.59,146.5H20.86c-3.83,0-7-3.93-7-8.77v-10.2c0-4.84,3.12-8.77,7-8.77l.27,0A272.65,272.65,0,0,0,69.72,123a293.15,293.15,0,0,0,48.61-4.24l.25,0c3.83,0,7,3.93,7,8.77v10.2C125.54,142.57,122.42,146.5,118.59,146.5Z"></path><path stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" fill="${style.fillColor}" class="cf" d="M94.24,140.35H45.19a4.13,4.13,0,0,1-4.13-4.14V122a4.15,4.15,0,0,1,.11-.93l3.65-7a4.13,4.13,0,0,1,4-3.21H90.1a4.13,4.13,0,0,1,4,3.09L98.24,121a4.15,4.15,0,0,1,.13,1v14.2A4.13,4.13,0,0,1,94.24,140.35Z"></path>
            </g>
        </svg>`;
  },

  _type4(style) {
    return `<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
        <g class="seat" transform="scale(1.2)">
            <path class="bd" fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" d="M89.24,20c-.34-7.62-6.46-6.61-9.52-10.33S78.71.5,70.55.5H29.75c-8.16,0-6.12,5.42-9.18,9.15S11.4,12.37,11.06,20s0,13.74,0,13.74H89.24S89.58,27.61,89.24,20Z">
            </path><path class="bd" fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" d="M85,72.8H16.81a6.89,6.89,0,0,1-6.88-6.86V37.14a6.89,6.89,0,0,1,6.88-6.86,326.72,326.72,0,0,1,34.08-1.9A313.07,313.07,0,0,1,85,30.27a6.89,6.89,0,0,1,6.88,6.86v28.8A6.89,6.89,0,0,1,85,72.8Z"></path>
            <rect class="bd" fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" x="9.93" y="71.69" width="81.91" height="60.75" rx="7.59" ry="7.59"></rect>
            <path class="bc" stroke="${style.strokeColor}" fill="${style.armrestColor}" stroke-width="${style.strokeWidth}" d="M9,142.15H3.08A3.09,3.09,0,0,1,0,139.07V84.52a3.09,3.09,0,0,1,3.08-3.08H9a3.09,3.09,0,0,1,3.08,3.08v54.55A3.09,3.09,0,0,1,9,142.15Zm91-3.08V84.52a3.09,3.09,0,0,0-3.08-3.08H91.29a3.09,3.09,0,0,0-3.08,3.08v54.55a3.09,3.09,0,0,0,3.08,3.08h5.63A3.09,3.09,0,0,0,100,139.07Z"></path>
            <path class="bd" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" 
            fill="${style.fillColor}" d="M84.71,145.5H14.9c-2.74,0-5-2.8-5-6.23V132c0-3.44,2.23-6.23,5-6.23l.19,0a195.67,195.67,0,0,0,34.71,3,210.38,210.38,0,0,0,34.72-3l.18,0c2.74,0,5,2.8,5,6.23v7.25C89.67,142.7,87.44,145.5,84.71,145.5Z"></path>
            <path class="cf" fill="white" stroke="white" d="M67.32,141.13h-35a2.94,2.94,0,0,1-2.95-2.94V128.06a2.93,2.93,0,0,1,.08-.66L32,116.12a3,3,0,0,1,2.87-2.28H64.35a3,3,0,0,1,2.85,2.2l3,11.31a2.93,2.93,0,0,1,.1.74v10.09A2.94,2.94,0,0,1,67.32,141.13Z"></path>
        </g>
    </svg>`;
  },

  _default(style) {
    return `<svg version="1.1" baseProfile="full" viewBox="0 -3 110 100" xmlns="http://www.w3.org/2000/svg">
        <g class="seat" transform="scale(2)"><rect fill="${style.armrestColor}" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />
        <rect fill="${style.armrestColor}" x="49.02" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" /><path fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" d="M44.94,1.07C40.15.71,33.1,0,26.87,0,21.37,0,13.66.47,9.35.93A4.41,4.41,0,0,0,5.41,5.31V33H49V5.47A4.41,4.41,0,0,0,44.94,1.07Z" />
        <path fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" d="M47.56,37.58h-40a2.85,2.85,0,0,1-2.85-2.85V31.43a2.85,2.85,0,0,1,2.85-2.85h.11A139.86,139.86,0,0,0,27.56,30a150.41,150.41,0,0,0,19.9-1.38h.1a2.85,2.85,0,0,1,2.85,2.85v3.31A2.85,2.85,0,0,1,47.56,37.58Z" />
        <rect fill="rgb(255, 255, 255)" x="19.25" y="28.88" width="15.92" height="5.47" rx="2.02" ry="2.02" />
      </g></svg>`;
  },
};

const firstClassTemplateService = {
  getTemplate(type, style) {
    if (type === '1') return this._type1(style);
    if (type === '2') return this._type2(style);
    if (type === '3') return this._type3(style);

    return this._default(style);
  },

  _type1(style) {
    return `<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
            <g class="seat" transform="scale(1)"><path class="bd" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" fill="${style.fillColor}" d="M127.05,89.33H12.38V13.83A9.67,9.67,0,0,1,22,4.17,455.22,455.22,0,0,1,69.72,1.5a436.21,436.21,0,0,1,47.71,2.67,9.67,9.67,0,0,1,9.63,9.66Z"></path>
            <path class="bd" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" fill="${style.fillColor}" d="M12.38,89.33H127.05a0,0,0,0,1,0,0v36.26a7.59,7.59,0,0,1-7.59,7.59H20a7.59,7.59,0,0,1-7.59-7.59V89.33A0,0,0,0,1,12.38,89.33Z"></path><path stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" fill="${style.armrestColor}" class="bc" d="M13.84,131.7H3.08A3.09,3.09,0,0,1,0,128.61V33a3.09,3.09,0,0,1,3.08-3.08H13.84A3.09,3.09,0,0,1,16.93,33v95.64A3.09,3.09,0,0,1,13.84,131.7ZM140,128.61V33a3.09,3.09,0,0,0-3.08-3.08H126.57A3.09,3.09,0,0,0,123.49,33v95.64a3.09,3.09,0,0,0,3.08,3.08h10.34A3.09,3.09,0,0,0,140,128.61Z"></path>
            <path class="bd" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" fill="${style.fillColor}" d="M118.59,146.5H20.86c-3.83,0-7-3.93-7-8.77v-10.2c0-4.84,3.12-8.77,7-8.77l.27,0A272.65,272.65,0,0,0,69.72,123a293.15,293.15,0,0,0,48.61-4.24l.25,0c3.83,0,7,3.93,7,8.77v10.2C125.54,142.57,122.42,146.5,118.59,146.5Z"></path>
            <path stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" fill="${style.fillColor}" class="cf" d="M94.24,140.35H45.19a4.13,4.13,0,0,1-4.13-4.14V122a4.15,4.15,0,0,1,.11-.93l3.65-7a4.13,4.13,0,0,1,4-3.21H90.1a4.13,4.13,0,0,1,4,3.09L98.24,121a4.15,4.15,0,0,1,.13,1v14.2A4.13,4.13,0,0,1,94.24,140.35Z"></path>
            </g>
        </svg>`;
  },

  _type2(style) {
    return `<svg version="1.1" baseProfile="full" viewBox="0 -3 110 100" xmlns="http://www.w3.org/2000/svg">
      <g class="seat" transform="scale(2)">
      <rect fill="${style.armrestColor}" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />
      <rect fill="${style.armrestColor}" x="49.02" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />
      <path fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" d="M44.94,1.07C40.15.71,33.1,0,26.87,0,21.37,0,13.66.47,9.35.93A4.41,4.41,0,0,0,5.41,5.31V33H49V5.47A4.41,4.41,0,0,0,44.94,1.07Z" />
      <path fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" d="M47.56,37.58h-40a2.85,2.85,0,0,1-2.85-2.85V31.43a2.85,2.85,0,0,1,2.85-2.85h.11A139.86,139.86,0,0,0,27.56,30a150.41,150.41,0,0,0,19.9-1.38h.1a2.85,2.85,0,0,1,2.85,2.85v3.31A2.85,2.85,0,0,1,47.56,37.58Z" />
      <rect fill="rgb(255, 255, 255)" x="19.25" y="28.88" width="15.92" height="5.47" rx="2.02" ry="2.02" /></g></svg>`;
  },

  _type3(style) {
    return `<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
      <g class="seat" transform="scale(2)"><rect fill="{$style.armrestColor}" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />
      <rect fill="${style.armrestColor}" x="49.02" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />
      <path fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" d="M44.94,1.07C40.15.71,33.1,0,26.87,0,21.37,0,13.66.47,9.35.93A4.41,4.41,0,0,0,5.41,5.31V33H49V5.47A4.41,4.41,0,0,0,44.94,1.07Z" />
      <path fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" d="M47.56,37.58h-40a2.85,2.85,0,0,1-2.85-2.85V31.43a2.85,2.85,0,0,1,2.85-2.85h.11A139.86,139.86,0,0,0,27.56,30a150.41,150.41,0,0,0,19.9-1.38h.1a2.85,2.85,0,0,1,2.85,2.85v3.31A2.85,2.85,0,0,1,47.56,37.58Z" />
      <rect fill="rgb(255, 255, 255)" x="19.25" y="28.88" width="15.92" height="5.47" rx="2.02" ry="2.02" /></g></svg>`;
  },

  _default(style) {
    return `<svg version="1.1" baseProfile="full" viewBox="0 0 150 220" xmlns="http://www.w3.org/2000/svg">
      <g class="seat" transform="scale(1.2)">
      <path class="bd" fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" d="M89.24,20c-.34-7.62-6.46-6.61-9.52-10.33S78.71.5,70.55.5H29.75c-8.16,0-6.12,5.42-9.18,9.15S11.4,12.37,11.06,20s0,13.74,0,13.74H89.24S89.58,27.61,89.24,20Z"></path>
      <path class="bd" fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" d="M85,72.8H16.81a6.89,6.89,0,0,1-6.88-6.86V37.14a6.89,6.89,0,0,1,6.88-6.86,326.72,326.72,0,0,1,34.08-1.9A313.07,313.07,0,0,1,85,30.27a6.89,6.89,0,0,1,6.88,6.86v28.8A6.89,6.89,0,0,1,85,72.8Z"></path>
      <rect class="bd" fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" x="9.93" y="71.69" width="81.91" height="60.75" rx="7.59" ry="7.59"></rect>
      <path class="bc" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" fill="${style.armrestColor}" d="M9,142.15H3.08A3.09,3.09,0,0,1,0,139.07V84.52a3.09,3.09,0,0,1,3.08-3.08H9a3.09,3.09,0,0,1,3.08,3.08v54.55A3.09,3.09,0,0,1,9,142.15Zm91-3.08V84.52a3.09,3.09,0,0,0-3.08-3.08H91.29a3.09,3.09,0,0,0-3.08,3.08v54.55a3.09,3.09,0,0,0,3.08,3.08h5.63A3.09,3.09,0,0,0,100,139.07Z"></path>
      <path class="bd" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" fill="${style.fillColor}" d="M84.71,145.5H14.9c-2.74,0-5-2.8-5-6.23V132c0-3.44,2.23-6.23,5-6.23l.19,0a195.67,195.67,0,0,0,34.71,3,210.38,210.38,0,0,0,34.72-3l.18,0c2.74,0,5,2.8,5,6.23v7.25C89.67,142.7,87.44,145.5,84.71,145.5Z"></path>
      <path class="cf" fill="white" stroke="white" d="M67.32,141.13h-35a2.94,2.94,0,0,1-2.95-2.94V128.06a2.93,2.93,0,0,1,.08-.66L32,116.12a3,3,0,0,1,2.87-2.28H64.35a3,3,0,0,1,2.85,2.2l3,11.31a2.93,2.93,0,0,1,.1.74v10.09A2.94,2.94,0,0,1,67.32,141.13Z"></path>
      </g></svg>`;
  },
};

const economyClassTemplateService = {
  getTemplate(type, style) {
    return this._default(style);
  },

  _default(style) {
    return `<svg version="1.1" baseProfile="full" viewBox="0 -3 110 110" width="86" height="110" xmlns="http://www.w3.org/2000/svg">
        <g class="seat" transform="scale(2)">
        <rect fill="${style.armrestColor}" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />
        <rect fill="${style.armrestColor}" x="49.02" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />
        <path fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" d="M44.94,1.07C40.15.71,33.1,0,26.87,0,21.37,0,13.66.47,9.35.93A4.41,4.41,0,0,0,5.41,5.31V33H49V5.47A4.41,4.41,0,0,0,44.94,1.07Z" />
        <path fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" d="M47.56,37.58h-40a2.85,2.85,0,0,1-2.85-2.85V31.43a2.85,2.85,0,0,1,2.85-2.85h.11A139.86,139.86,0,0,0,27.56,30a150.41,150.41,0,0,0,19.9-1.38h.1a2.85,2.85,0,0,1,2.85,2.85v3.31A2.85,2.85,0,0,1,47.56,37.58Z" />
        <rect fill="rgb(255, 255, 255)" x="19.25" y="28.88" width="15.92" height="5.47" rx="2.02" ry="2.02" />
        </g></svg>`;
  },
};

const premiumClassTemplateService = {
  getTemplate(type, style) {
    return this._default(style);
  },

  _default(style) {
    return `<svg version="1.1" baseProfile="full" viewBox="0 -3 110 100" width="110" height="100" xmlns="http://www.w3.org/2000/svg">
        <g class="seat" transform="scale(2)"><rect fill="${style.armrestColor}" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />
        <rect fill="${style.armrestColor}" x="49.02" y="4.3" width="5.36" height="32.29" rx="1.97" ry="1.97" />
        <path fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" d="M44.94,1.07C40.15.71,33.1,0,26.87,0,21.37,0,13.66.47,9.35.93A4.41,4.41,0,0,0,5.41,5.31V33H49V5.47A4.41,4.41,0,0,0,44.94,1.07Z" />
        <path fill="${style.fillColor}" stroke="${style.strokeColor}" stroke-width="${style.strokeWidth}" d="M47.56,37.58h-40a2.85,2.85,0,0,1-2.85-2.85V31.43a2.85,2.85,0,0,1,2.85-2.85h.11A139.86,139.86,0,0,0,27.56,30a150.41,150.41,0,0,0,19.9-1.38h.1a2.85,2.85,0,0,1,2.85,2.85v3.31A2.85,2.85,0,0,1,47.56,37.58Z" />
        <rect fill="rgb(255, 255, 255)" x="19.25" y="28.88" width="15.92" height="5.47" rx="2.02" ry="2.02" />
        </g></svg>`;
  },
};
