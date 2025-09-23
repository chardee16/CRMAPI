INSERT INTO tbltransactioncheck
(
	TransactionCode,
    CTLNo,
    TransYear,
    COCITypeID,
    BankID,
    CheckNumber,
    CheckDate,
    UPDTag,
    Amt
)
Values(?, ?,YEAR(NOW()),?,?,?,?,?,? )