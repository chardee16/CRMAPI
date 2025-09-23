SELECT  
	housing.ClientID,
    agent.AgentName,
    realty.RealtyDesctiption,
    CONCAT('Block ',client.BlockNo, ' Lot ', client.LotNo) AS Address,
    CONCAT(client.LastName, ', ', client.FirstName, ' ', client.MiddleName) AS FullName,
    housing.ReferenceNo,
    housing.TransactionDate,
    housing.HouseAndLotPackage,
    housing.ProcessingFee,
    housing.TotalContractPrice,
    housing.LoanableAmount,
    housing.Equity,
    housing.EquityPercentage,
    housing.ReservationFee,
    housing.NetEquity,
    housing.CommissionableAmount,
	inc.Amount as Incentives,
    com.Amount as GrossCommission,
    COALESCE(resPay.TotalReservation * -1, 0) AS ReservationPayment,
    COALESCE(eqPay.TotalEquity * -1, 0) AS EquityPayment,
    COALESCE(resPay.TotalReservation * -1, 0) + COALESCE(eqPay.TotalEquity * -1, 0) AS TotalPaymentMade,
    COALESCE(withdrawal.TotalWithdrawal, 0) AS TotalWithdrawal,
    COALESCE(com.Amount  - COALESCE(withdrawal.TotalWithdrawal, 0),0) AS CommissionBalance
FROM tblhousingapplication housing
INNER JOIN tblclient client
	ON client.ClientID = housing.ClientID
INNER JOIN tblagent agent
	ON agent.AgentID = housing.AgentID
INNER JOIN tblrealty realty
	ON realty.RealtyID = housing.RealtyID
LEFT JOIN tblagentearnings inc
    ON inc.AgentID = housing.AgentID 
   AND inc.HousingReferenceNo = housing.ReferenceNo
   AND inc.SLC_CODE = 16 
   AND inc.SLT_CODE = 1
LEFT JOIN tblagentearnings com
    ON com.AgentID = housing.AgentID 
   AND com.HousingReferenceNo = housing.ReferenceNo
   AND com.SLC_CODE = 16 
   AND com.SLT_CODE = 2
LEFT JOIN (
    SELECT 
		AgentID,
		HousingReferenceNo, 
        SUM(Amount) AS TotalWithdrawal
    FROM tblagentwithdrawals
    GROUP BY AgentID, HousingReferenceNo
) withdrawal
   ON withdrawal.AgentID = housing.AgentID
  AND withdrawal.HousingReferenceNo = housing.ReferenceNo
LEFT JOIN (
    SELECT 
        ar.ClientID,
        SUM(td.Amt) AS TotalReservation
    FROM tbltransactiondetails td
    INNER JOIN tblaccountsreceivable ar
        ON td.SLC_CODE = ar.SLC_CODE
       AND td.SLT_CODE = ar.SLT_CODE
       AND td.SLE_CODE = ar.SLE_CODE
       AND td.ReferenceNo = ar.ReferenceNo
    WHERE ar.SLC_CODE = 12
      AND ar.SLT_CODE = 2
      AND ar.AccountStatusID = 1
      AND td.TransactionCode = 1
      AND td.UPDTag = 1
    GROUP BY ar.ClientID
) resPay
    ON resPay.ClientID = housing.ClientID
LEFT JOIN (
    SELECT 
        ar.ClientID,
        SUM(td.Amt) AS TotalEquity
    FROM tbltransactiondetails td
    INNER JOIN tblaccountsreceivable ar
        ON td.SLC_CODE = ar.SLC_CODE
       AND td.SLT_CODE = ar.SLT_CODE
       AND td.SLE_CODE = ar.SLE_CODE
       AND td.ReferenceNo = ar.ReferenceNo
    WHERE ar.SLC_CODE = 12
      AND ar.SLT_CODE = 3
      AND ar.AccountStatusID = 1
      AND td.TransactionCode = 1
      AND td.UPDTag = 1
    GROUP BY ar.ClientID
) eqPay
    ON eqPay.ClientID = housing.ClientID
WHERE 
	housing.ApplicationStatus = 5 and
    housing.AgentID = ?
