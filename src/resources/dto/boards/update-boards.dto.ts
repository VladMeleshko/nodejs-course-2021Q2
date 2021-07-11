import { Columns } from '../../../entities/column';

export class UpdateBoardDto {
  readonly title: string;
  readonly columns: Columns[];
}
