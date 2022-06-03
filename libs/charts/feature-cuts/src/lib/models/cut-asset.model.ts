export class CutAssetModel {
  public readonly name: string;

  public readonly editionCode: string;

  public readonly rarity: string;

  public readonly cardType: string;

  public readonly cmc: string;

  public readonly manaValue: string;

  public readonly color: string;

  public readonly power: string;

  public readonly toughness: string;

  constructor(rawModel: string) {
    const [, name, cmc, cardType, color, , editionCode, , , manaValue, power, , rarity, toughness] =
      rawModel.split('; ');

    this.name = name;
    this.editionCode = editionCode;
    this.rarity = rarity;
    this.cardType = cardType;
    this.cmc = cmc;
    this.manaValue = manaValue;
    this.color = color;
    this.power = power;
    this.toughness = toughness;
  }
}
