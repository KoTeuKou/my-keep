
export interface INote {
  id?: number;
  tittle?: string;
  text?: string;
}

export class Note implements INote {
  constructor(
    public id?: number,
    public tittle?: string,
    public text?: string,
  ) {}
}
