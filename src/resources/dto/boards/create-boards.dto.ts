import { Columns } from '../../../entities/column';

export class CreateBoardDto {
  readonly title: string;
  readonly columns: Columns[];
}
