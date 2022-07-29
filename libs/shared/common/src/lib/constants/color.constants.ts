import { AllColors } from '../enums/colors.enum';

export const COLOR_ENVIRONMENTS: [string[], AllColors][] = [
  [['White', 'Blue'], AllColors.Azorius],
  [['White', 'Green'], AllColors.Selesnya],
  [['White', 'Red'], AllColors.Boros],
  [['White', 'Black'], AllColors.Orzhov],
  [['Red', 'Blue'], AllColors.Izzet],
  [['Red', 'Green'], AllColors.Gruul],
  [['Red', 'Black'], AllColors.Rakdos],
  [['Black', 'Blue'], AllColors.Dimir],
  [['Black', 'Green'], AllColors.Golgari],
  [['Green', 'Blue'], AllColors.Simic],

  [['Green', 'White', 'Blue'], AllColors.Bant],
  [['White', 'Blue', 'Black'], AllColors.Esper],
  [['Blue', 'Black', 'Red'], AllColors.Grixis],
  [['Red', 'Green', 'Black'], AllColors.Jund],
  [['Red', 'Green', 'White'], AllColors.Naya],

  [['Red', 'White', 'Black'], AllColors.Mardu],
  [['Green', 'Blue', 'Red'], AllColors.Temur],
  [['White', 'Black', 'Green'], AllColors.Abzan],
  [['Blue', 'Red', 'White'], AllColors.Jeskai],
  [['Black', 'Green', 'Blue'], AllColors.Sultai],
];
