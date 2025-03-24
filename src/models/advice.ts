import { AdviceType } from '../enums/advice-types';

export class Advice {
  constructor(
    public id: string,
    public type: AdviceType
  ) {}
}
