
export interface INote {
  id?: number;
  title?: string;
  text?: string;
}

export class Note implements INote {
  constructor(
    public id?: number,
    public title?: string,
    public text?: string,
  ) {}
}
