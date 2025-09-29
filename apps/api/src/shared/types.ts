export const UserRole = {
  CLIENT: `client`,
  ADMIN: `admin`,
  SUPERADMIN: `superadmin`,
} as const;
export const UserRoles = Object.values(UserRole);
export type IUserRole = (typeof UserRole)[keyof typeof UserRole];

export const ContractStatus = {
  DRAFT: `draft`,
  SIGNATURE: `signature`,
  ACTIVE: `active`,
  ARCHIVED: `archived`,
} as const;
export const ContractStatuses = Object.values(ContractStatus);
export type IContractStatus = (typeof ContractStatus)[keyof typeof ContractStatus];

export const RateUnit = {
  HOURLY: `hour`,
  FIXED: `fixed`,
} as const;
export const RateUnits = Object.values(RateUnit);
export type IRateUnit = (typeof RateUnit)[keyof typeof RateUnit];

export const DocumentType = {
  INVOICE: `invoice`,
  CONTRACT: `contract`,
  ATTESTATION: `attestation`,
  OTHER: `other`,
} as const;
export const DocumentTypes = Object.values(DocumentType);
export type IDocumentType = (typeof DocumentType)[keyof typeof DocumentType];

export const PaymentStatus = {
  PENDING: `pending`,
  COMPLETED: `completed`,
  FAILED: `failed`,
} as const;
export const PaymentStatuses = Object.values(PaymentStatus);
export type IPaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export type IContractListItem = {
  id: string;
  contractorName: string;
  rate: string;
  status: IContractStatus;
  lastActivityAgo: string;
};

export type IDashboard = {
  balance: string;
  contractsActiveCount: number;
  lastPaymentAgo: string;
  openContracts: IContractListItem[];
  quickDocs: IDocumentListItem[];
  compliance: { w9Ready: boolean; kycInReview: boolean; bankVerified: boolean };
};

export type IUploadDocument = {
  contractId: string;
  name: string;
  type: IDocumentType;
  fileUrl?: string;
  sizeBytes?: number;
};

export type IDocumentListItem = {
  id: string;
  name: string;
  type: IDocumentType;
  size: string;
  updated: string;
  fileUrl?: string;
};

export type IPresignedResponse = {
  url: string;
  fields?: Record<string, string>;
  fileUrl: string;
  method: `PUT` | `POST`;
};

export type IStartPayment = {
  contractId: string;
  amountCents: number;
  currency?: string;
  method?: string;
};

export type IUpdatePaymentStatus = {
  status: IPaymentStatus;
};

export type IPaymentListItem = {
  id: string;
  contract: string;
  amount: string;
  method: string;
  status: IPaymentStatus;
  date: string;
};

export type ICreateContract = {
  clientId: string;
  contractorId: string;
  rateCents: number;
  rateUnit: IRateUnit;
  status?: IContractStatus;
};

export type IUpdateContract = {
  rateCents?: number;
  rateUnit?: IRateUnit;
  status?: IContractStatus;
};

export type ILogin = {
  email: string;
  password: string;
};

export type IAuthResponse = {
  access_token: string;
};
