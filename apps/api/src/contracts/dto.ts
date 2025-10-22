import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ICreateContract, IRateUnit, IContractStatus, IUpdateContract, IContractListItem } from '../shared';
export class CreateContract implements ICreateContract {
  @Expose()
  @ApiProperty()
  clientId!: string;

  @Expose()
  @ApiProperty()
  contractorId!: string;

  @Expose()
  @ApiProperty()
  rateCents!: number;

  @Expose()
  @ApiProperty()
  rateUnit!: IRateUnit;

  @Expose()
  @ApiPropertyOptional()
  status?: IContractStatus;
}

export class UpdateContract implements IUpdateContract {
  @Expose()
  @ApiPropertyOptional()
  rateCents?: number;

  @Expose()
  @ApiPropertyOptional()
  rateUnit?: IRateUnit;

  @Expose()
  @ApiPropertyOptional()
  status?: IContractStatus;
}

export class ContractListItem implements IContractListItem {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  contractorId!: string;

  @Expose()
  @ApiProperty()
  contractorName: string;

  @Expose()
  @ApiProperty()
  rate: string;

  @Expose()
  @ApiProperty()
  status: IContractStatus;

  @Expose()
  @ApiProperty()
  lastActivityAgo: string;
}
