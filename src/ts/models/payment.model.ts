export interface Payment {
  transactionIdentifier: number;
  actionCode: string;
  approvalCode: string;
  responseCode: string;
  transmissionDateTime: Date;
  cpsAuthorizationCharacteristicsIndicator: string;
  settlementFlags: {
    settlementResponsibilityFlag: boolean;
    givPreviouslyUpdatedFlag: boolean;
    givUpdatedFlag: boolean;
    settlementServiceFlag: string;
  };
}
