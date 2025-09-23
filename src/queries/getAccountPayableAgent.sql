SELECT 
	ap.SLC_CODE,
    ap.SLT_CODE,
    ap.SLE_CODE,
    gl.AccountCode,
    ap.AgentID,
    ap.ReferenceNo,
    sltype.SL_Description,
    ap.Amount as PrincipalAmount,
    DATE_FORMAT(ap.TransactionDate, '%Y-%m-%d') AS SetupDate,
    coalesce(SUM(trdt.Amt) * -1, 0) as Balance
 FROM tblaccountspayable ap
 INNER JOIN tblsltype sltype ON
	sltype.SLC_CODE = ap.SLC_CODE and
    sltype.SLT_CODE = ap.SLT_CODE and
    sltype.SLE_CODE = ap.SLE_CODE
INNER JOIN tblglcontrol gl ON
	gl.SLC_CODE = ap.SLC_CODE and
    gl.SLT_CODE = ap.SLT_CODE and
    gl.SLE_CODE = ap.SLE_CODE
LEFT JOIN tbltransactiondetails trdt ON
	trdt.SLC_CODE =  ap.SLC_CODE and
    trdt.SLT_CODE =  ap.SLT_CODE and
    trdt.SLE_CODE =  ap.SLE_CODE and
    trdt.ReferenceNo = ap.ReferenceNo and
    trdt.AgentID = ap.AgentID
WHERE ap.AgentID = ? and 
      ap.AccountStatusID = 1
GROUP BY 
  ap.SLC_CODE,
  ap.SLT_CODE,
  ap.SLE_CODE,
  gl.AccountCode,
  ap.AgentID,
  ap.ReferenceNo,
  ap.TransactionDate,
  ap.Amount,
  sltype.SL_Description