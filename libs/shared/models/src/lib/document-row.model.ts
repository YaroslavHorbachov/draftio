/* 
Name,
Name,
List name,
Edition,
Edition code,
Collector's number,
Price,
Price (total),
Foil,
QuantityX,
Tag,
Language,
Condition,
Rarity,
Card Type,
CMC,
Mana Value,
Color,
Card Rulings,
MultiverseID,
Card Text,
Power,
Toughness,
Loyalty,
Currency,
Scryfall ID,
TCGPlayer productID,
Is Commander?,Artists,Edition code MTGO
 */
export class DocumentRowModel {
  public readonly name: string;
  public readonly name2: string;
  public readonly listname: string;
  public readonly edition: string;
  public readonly editionCode: string;
  public readonly collectorsNumber: string;
  public readonly price: string;
  public readonly priceTotal: string;
  public readonly foil: string;
  public readonly qx: string;
  public readonly tag: string;
  public readonly language: string;
  public readonly condition: string;
  public readonly rarity: string;
  public readonly cardType: string;
  public readonly cmc: string;
  public readonly manaValue: string;
  public readonly color: string;
  public readonly cardRulings: string;
  public readonly multiverseId: string;
  public readonly cardText: string;
  public readonly power: string;
  public readonly toughness: string;
  public readonly loyalty: string;
  public readonly currency: string;

  constructor(documentRow: string[]) {
    const [
      name,
      name2,
      listname,
      edition,
      editionCode,
      collectorsNumber,
      price,
      priceTotal,
      foil,
      qx,
      tag,
      language,
      condition,
      rarity,
      cardType,
      cmc,
      manaValue,
      color,
      cardRulings,
      multiverseId,
      cardText,
      power,
      toughness,
      loyalty,
      currency,
    ] = documentRow;

    this.name = name;
    this.name2 = name2;
    this.listname = listname;
    this.edition = edition;
    this.editionCode = editionCode;
    this.collectorsNumber = collectorsNumber;
    this.price = price;
    this.priceTotal = priceTotal;
    this.foil = foil;
    this.qx = qx;
    this.tag = tag;
    this.language = language;
    this.condition = condition;
    this.rarity = rarity;
    this.cardType = cardType;
    this.cmc = cmc;
    this.manaValue = manaValue;
    this.color = color;
    this.cardRulings = cardRulings;
    this.multiverseId = multiverseId;
    this.cardText = cardText;
    this.power = power;
    this.toughness = toughness;
    this.loyalty = loyalty;
    this.currency = currency;
  }
}
