import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IStartPayment, IUpdatePaymentStatus, IPaymentStatus, IPaymentListItem } from '../shared';

export class StartPayment implements IStartPayment {
  @Expose() @ApiProperty() contractId!: string;

  @Expose() @ApiProperty() amountCents!: number;

  @Expose() @ApiPropertyOptional() currency?: string;

  @Expose() @ApiPropertyOptional() method?: string;
}

export class UpdatePaymentStatus implements IUpdatePaymentStatus {
  @Expose() @ApiProperty() status!: IPaymentStatus;
}

export class PaymentListItem implements IPaymentListItem {
  @Expose() @ApiProperty() id: string;

  @Expose() @ApiProperty() contract: string;

  @Expose() @ApiProperty() amount: string;

  @Expose() @ApiProperty() method: string;

  @Expose() @ApiProperty() status: IPaymentStatus;

  @Expose() @ApiProperty() date: string;
}
