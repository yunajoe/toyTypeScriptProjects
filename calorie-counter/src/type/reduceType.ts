export interface Action {
  type: string;
  totalOutputCalorie?: number;
  selectedValue?: string;
}

export interface State {
  totalOutputCalorie: number;
  selectedValue?: string;
}
