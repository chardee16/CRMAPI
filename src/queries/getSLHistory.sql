SELECT
	td.TransactionCode,
    tt.TransactionAbb,
    CTLNo,
    LPAD(CTLNo, 8, '0') AS DocumentNo,
    DATE_FORMAT(TransactionDate, '%Y-%m-%d') AS TransactionDate,
    CASE
		WHEN td.Amt  >  0 THEN FORMAT(td.Amt, 2)
		ELSE ''
	END as Debit,
    CASE
		WHEN td.Amt  <  0 THEN FORMAT(td.Amt * -1, 2)
		ELSE ''
	END as Credit,
    ABS(SUM(td.Amt) OVER (PARTITION BY td.ReferenceNo ORDER BY td.ID)) AS Balance
 FROM tbltransactiondetails td	
 INNER JOIN tbltransactiontype tt
 ON tt.TransactionCode = td.TransactionCode
WHERE ReferenceNo = ?
ORDER BY ID