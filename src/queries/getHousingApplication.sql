SELECT Id,
    ha.ClientID,
    ha.ReferenceNo,
    ha.AgentID,
    ha.RealtyID,
    ha.HouseAndLotPackage,
    ha.ProcessingPercentageID,
    ha.ProcessingFee,
    ha.TotalContractPrice,
    ha.LoanableAmount,
    ha.Equity,
    ha.EquityPercentage,
    ha.ReservationFee,
    ha.CommissionPercentageID,
    ha.NetEquity,
    ha.CommissionableAmount,
    ha.PaymentTerm,
    ha.ProcessedBy,
    ha.TransactionDate,
    ha.ApplicationStatus,
    CONCAT('Block ', c.BlockNo, ' Lot ', c.LotNo) AS FullAddress,
    agent.AgentName,
    ha.CTLNo
FROM tblhousingapplication ha
INNER JOIN tblclient c ON c.ClientID = ha.ClientID
INNER JOIN tblagent agent ON agent.AgentID = ha.AgentID
WHERE ha.ClientID = ?