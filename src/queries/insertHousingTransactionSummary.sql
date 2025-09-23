INSERT INTO tbltransactionsummary (
    TransactionCode, 
    TransYear, 
    CTLNo, 
    TransactionDate,
    ClientID, 
    Explanation, 
    DateTimeAdded, 
    PostedBy
) VALUES (?, YEAR(NOW()), ?, NOW(), ?, ?, NOW(), ?)