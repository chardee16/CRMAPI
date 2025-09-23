INSERT INTO tblAgentWithdrawals
(
    TransactionCode,
    TransYear,
    SLC_CODE,
    SLT_CODE,
    SLE_CODE,
    CTLNo,
    AgentID,
    HousingReferenceNo,
    Amount,
    UPDTag,
    TransactionDate
)
VALUES
(?,YEAR(CURDATE()),?,?,?,?,?,?,?,?, CURDATE())
;