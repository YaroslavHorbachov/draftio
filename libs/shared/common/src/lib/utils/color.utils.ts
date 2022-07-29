import { COLOR_ENVIRONMENTS } from '../constants/color.constants';
import { AllColors, CommonColors } from '../enums/colors.enum';
import { ColorNormalizer } from '../types';

function normalizeColor(multicolorNormalizer: ColorNormalizer = rawMulticolorNormalizer) {
  return (color: string): AllColors[] => {
    if (color.length === 0) {
      return [AllColors.Colorless];
    }

    const colorSegments = color.split('/');

    if (colorSegments.length > 1) {
      return multicolorNormalizer(color);
    }

    return [color] as AllColors[];
  };
}

function multicolorNormalizer(color: string): AllColors[] {
  const searchingColor = color.split('/').sort().join();
  const matchingColorEnvironment = COLOR_ENVIRONMENTS.find((entry) => {
    const [environmentColorSegments] = entry;
    const environmentColor = [...environmentColorSegments].sort().join();

    return environmentColor === searchingColor;
  });

  if (matchingColorEnvironment) {
    const [, color] = matchingColorEnvironment;

    return [color];
  }

  console.error(color);

  // TODO: Handle hybrid/phirexian colors
  return [color] as AllColors[];
}

function segmentsMulticolorNormalizer(color: string): AllColors[] {
  return color.split('/') as AllColors[];
}

function rawMulticolorNormalizer(_: string): AllColors[] {
  return [AllColors.Multicolor];
}

function checkIsCommonColor(color: CommonColors): boolean {
  return Object.values(CommonColors).includes(color);
}

export const ColorUtils = {
  normalizeColor,
  checkIsCommonColor,
  multicolorNormalizer,
  segmentsMulticolorNormalizer,
};
