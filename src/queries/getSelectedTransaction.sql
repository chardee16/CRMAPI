SELECT 
    coa.COADesc AS SL_Description,
    td.AccountCode,
    td.BillMonth,
    CASE 
        WHEN td.Amt > 0 THEN CAST(td.Amt AS CHAR)
        ELSE ''
    END AS Debit,
    CASE 
        WHEN td.Amt < 0 THEN CAST(td.Amt * -1 AS CHAR)
        ELSE ''
    END AS Credit
FROM tblTransactionDetails td
INNER JOIN tblChartofaccounts coa
    ON coa.COAID = td.AccountCode
WHERE td.TransactionCode = ?
  AND td.CTLNo = ?
  AND td.TransYear = ?;