import React, {memo, Fragment} from 'react';
import ImgFilter from '../components/ImgFilter';
import uuid from 'uuid/v4';
import Thresh from '../components/filters/Thresh';

const Invert = ({inGraphic, outGraphic}) => (
  <feComponentTransfer in={inGraphic} out={outGraphic}>
    <feFuncR type="discrete" tableValues="1 0" />
    <feFuncG type="discrete" tableValues="1 0" />
    <feFuncB type="discrete" tableValues="1 0" />
  </feComponentTransfer>
);

const Thin = memo(({kernel, inGraphic = 'SourceGraphic'}) => {
  const prefix = uuid();
  const pre = name => prefix + '_' + name;

  const fgKernel = kernel.map(x => (x === 1 ? 1 : 0)).join(' ');
  const bgKernel = kernel.map(x => (x === 0 ? 1 : 0)).join(' ');

  return (
    <Fragment>
      <feConvolveMatrix preserveAlpha="true" in={inGraphic} kernelMatrix={fgKernel} />
      <Thresh thresh={254} outGraphic={pre('fg')} />

      <Invert inGraphic={inGraphic} />
      <feConvolveMatrix preserveAlpha="true" kernelMatrix={bgKernel} />
      <Invert />
      <Thresh thresh={254} outGraphic={pre('bg')} />

      <feBlend mode="screen" in={pre('fg')} in2={pre('bg')} out={pre('blend')} />
      {/* <Invert outGraphic={pre('hit-and-miss')} /> */}

      {/* <feBlend in={inGraphic} in2={pre('blend')} mode="add" /> */}
    </Fragment>
  );
});

export default memo(({src, baseWidth, baseHeight}) => (
  <div>
    <img src={src} width={baseWidth} height={baseHeight} />

    <ImgFilter src={src} width={baseWidth} height={baseHeight} cssPre="grayscale()">
      <Thresh thresh={100} />
      <feConvolveMatrix
        kernelMatrix={[-1, 0, 1, -2, 0, 2, -1, 0, 1].join(' ')}
        preserveAlpha="true"
        out="conv"
      />
      <Thin inGraphic="conv" kernel={[0, 0, 0, null, 1, null, 1, 1, 1]} />
    </ImgFilter>
  </div>
));
