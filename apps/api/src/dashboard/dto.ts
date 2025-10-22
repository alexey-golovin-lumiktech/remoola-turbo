import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IContractListItem, IDashboard, IDocumentListItem } from '../shared';

export type ICompliance = {
  w9Ready: boolean;
  kycInReview: boolean;
  bankVerified: boolean;
};

export class Dashboard implements IDashboard {
  @Expose()
  @ApiProperty()
  balance: string;

  @Expose()
  @ApiProperty()
  contractsActiveCount: number;

  @Expose()
  @ApiProperty()
  lastPaymentAgo: string;

  @Expose()
  @ApiProperty()
  openContracts: IContractListItem[];

  @Expose()
  @ApiProperty()
  quickDocs: IDocumentListItem[];

  @Expose()
  @ApiProperty()
  compliance: ICompliance;
}
