import { IRateUnit, RateUnit } from '../shared';

export const money = (cents: number, unit: IRateUnit) =>
  `$${(cents / 100).toFixed(2)}/${unit === RateUnit.HOURLY ? `hr` : `fixed`}`;

export const ago = (date?: Date) =>
  date
    ? new Intl.RelativeTimeFormat(`en`, { numeric: `auto` }).format(Math.round((+date - Date.now()) / 86400000), `day`)
    : `—`;

export const fmt = (n: number) =>
  `$${(n / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
