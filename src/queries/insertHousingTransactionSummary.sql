INSERT INTO tblTransactionSummary (
    TransactionCode, 
    TransYear, 
    CTLNo, 
    TransactionDate,
    ClientID, 
    Explanation, 
    DateTimeAdded, 
    PostedBy
) VALUES (?, YEAR(NOW()), ?, NOW(), ?, ?, NOW(), ?)