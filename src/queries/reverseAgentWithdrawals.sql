INSERT INTO tblagentwithdrawals
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
SELECT 
	3 as TransactionCode,
	TransYear,
    SLC_CODE,
    SLT_CODE,
    SLE_CODE,
	? as CTLNo,
    AgentID,
    HousingReferenceNo,
    Amount * -1 as Amount,
    1 as UPDTag,
    CURDATE() as TransactionDate
FROM tblagentwithdrawals
WHERE TransactionCode = ?
AND CTLNo = ?
AND TransYear = ?