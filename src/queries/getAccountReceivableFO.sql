SELECT 
	ar.SLC_CODE,
    ar.SLT_CODE,
    ar.SLE_CODE,
    gl.AccountCode,
    ar.ClientID,
    ar.ReferenceNo,
    ar.Amount as PrincipalAmount,
    sltype.SL_Description,
    DATE_FORMAT(ar.TransactionDate, '%Y-%m-%d') AS SetupDate,
    coalesce(SUM(trdt.Amt), 0) as Balance,
    (ar.Amount - COALESCE(SUM(trdt.Amt), 0)) AS OtherSLBalance
FROM tblAccountsReceivable ar
INNER JOIN tblSLType sltype ON
	sltype.SLC_CODE = ar.SLC_CODE and
    sltype.SLT_CODE = ar.SLT_CODE and
    sltype.SLE_CODE = ar.SLE_CODE
INNER JOIN tblGLControl gl ON
	gl.SLC_CODE = ar.SLC_CODE and
    gl.SLT_CODE = ar.SLT_CODE and
    gl.SLE_CODE = ar.SLE_CODE
LEFT JOIN tblTransactionDetails trdt ON
	trdt.SLC_CODE =  ar.SLC_CODE and
    trdt.SLT_CODE =  ar.SLT_CODE and
    trdt.SLE_CODE =  ar.SLE_CODE and
    trdt.ReferenceNo = ar.ReferenceNo
WHERE ar.ClientID = ?
    and ar.IsMainSL = ?
    and ar.AccountStatusID = 1
GROUP BY 
  ar.SLC_CODE,
  ar.SLT_CODE,
  ar.SLE_CODE,
  gl.AccountCode,
  ar.ClientID,
  ar.ReferenceNo,
  ar.Amount,
  ar.TransactionDate,
  sltype.SL_Description