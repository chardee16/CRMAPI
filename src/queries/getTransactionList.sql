SELECT ts.TransactionCode,
	   ts.TransYear,
	   ts.CTLNo,
	   DATE_FORMAT(ts.TransactionDate, '%Y-%m-%d') AS TransactionDate,
	   ts.ClientID,
	   td.Amt,
	   td.UPDTag,
	   td.ClientName
from tblTransactionSummary ts
INNER JOIN tblTransactionDetails td
	ON td.TransactionCode = ts.TransactionCode
		and td.CTLNo = ts.CTLNo
		and td.TransYear = ts.TransYear
		and td.SLC_CODE = 11
where ts.TransactionCode = ?
;