
INSERT INTO tblhousingapplication
(
    ClientID,
    ReferenceNo,
    AgentID,
    RealtyID,
    HouseAndLotPackage,
    ProcessingPercentageID,
    ProcessingFee,
    TotalContractPrice,
    LoanableAmount,
    Equity,
    EquityPercentage,
    ReservationFee,
    NetEquity,
    CommissionPercentageID,
    CommissionableAmount,
    PaymentTerm,
    ProcessedBy,
    TransactionDate,
    ApplicationStatus
)
VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),?);