INSERT INTO tblaccountsreceivable
(
	SLC_CODE,
    SLT_CODE,
    SLE_CODE,
    AccountStatusID,
    ClientID,
    ReferenceNo,
    RefCount,
    Amount,
    TransactionDate,
    UserID,
    Remarks,
    UpdDateTime,
    HousingReferenceNo,
    IsMainSL
) 
Value(?,?,?,?,?,?,?,?,NOw(),?,?,NOW(),?,?)