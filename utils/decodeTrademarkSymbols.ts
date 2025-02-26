export function decodeTrademarkSymbols(htmlText: string): string {
  return htmlText.replace(/&reg;/g, '®').replace(/&trade;/g, '™');
}
