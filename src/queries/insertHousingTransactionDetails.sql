INSERT INTO tbltransactiondetails
(
	TransactionCode,
    TransYear,
    CTLNo,
    AccountCode,
    ClientID,
    SLC_CODE,
    SLT_CODE,
    ReferenceNo,
    SLE_CODE,
    StatusID,
    TransactionDate,
    Amt,
    PostedBy,
    UPDTag,
    SequenceNo,
    ClientName,
    AgentID,
    RealtyID
)
Values(?,YEAR(NOW()), ?, ?,?,?,?,?,?,?,NOW(),?,?,?,?,?,?,?);