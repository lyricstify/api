export class ColorEntity {
  background: number;
  text: number;
  highlightText: number;

  constructor(partial: Partial<ColorEntity>) {
    Object.assign(this, partial);
  }
}
