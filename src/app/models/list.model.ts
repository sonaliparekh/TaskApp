import { Cards } from './cards.model';
export interface List {
  id: number;
  name: string;
  cards: Cards[];
}

