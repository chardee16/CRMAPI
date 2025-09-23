INSERT INTO tbltransactionsummary
(
	TransactionCode,
    TransYear,
    CTLNo,
    TransactionDate,
    ClientID,
    Explanation,
    DateTimeAdded,
    PostedBy
)
SELECT 
	3 as TransactionCode,
    TransYear,
    ? as CTLNo,
    CURDATE() as TransactionDate,
    ClientID,
    CONCAT('Reversed :', Explanation) AS Explanation,
    NOW() as DateTimeAdded,
    PostedBy
FROM tbltransactionsummary
WHERE TransactionCode = ?
AND CTLNo = ?
AND TransYear = ?