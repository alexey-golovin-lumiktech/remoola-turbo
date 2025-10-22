import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { type IUserRole } from '../shared';

export class SearchResult {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  type: Exclude<IUserRole, `superadmin`>;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  href: string;
}

export type IDatasourceQuerySearchResult = Omit<SearchResult, `type` | `href`>;
