
UPDATE tblhousingapplication
SET
    AgentID = ?,
    RealtyID = ?,
    HouseAndLotPackage = ?,
    ProcessingPercentageID = ?,
    ProcessingFee = ?,
    TotalContractPrice = ?,
    LoanableAmount = ?,
    Equity = ?,
    EquityPercentage = ?,
    ReservationFee = ?,
    NetEquity = ?,
    CommissionPercentageID = ?,
    CommissionableAmount = ?,
    PaymentTerm = ?,
    ProcessedBy = ?,
    TransactionDate = NOW(),
    ApplicationStatus = ?
WHERE Id = ?
;
