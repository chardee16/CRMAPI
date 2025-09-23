INSERT INTO tbltransactiondetails
(
	TransactionCode,
    TransYear,
    CTLNo,
    AccountCode,
    ClientID,
    BillMonth,
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
SELECT 
3 as TransactionCode,
TransYear,
? as CTLNo,
AccountCode,
ClientID,
BillMonth,
SLC_CODE,
SLT_CODE,
ReferenceNo,
SLE_CODE,
StatusID,
CURDATE() as TransactionDate,
Amt * -1 as Amt,
PostedBy,
1 as UPDTag,
SequenceNo,
ClientName,
AgentID,
RealtyID
 FROM tbltransactiondetails
WHERE TransactionCode = ?
AND CTLNo = ?
AND TransYear = ?
;