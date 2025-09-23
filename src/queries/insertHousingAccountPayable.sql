INSERT INTO tblaccountspayable
(
	SLC_CODE,
    SLT_CODE,
    SLE_CODE,
    AccountStatusID,
    AgentID,
    RealtyID,
    ReferenceNo,
    RefCount,
    Amount,
    TransactionDate,
    UserID,
    Remarks,
    UpdDateTime,
    HousingReferenceNo
) 
Value(?,?,?,?,?,?,?,?,?,NOw(),?,?,NOW(),?)