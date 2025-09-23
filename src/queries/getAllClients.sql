SELECT 
    c.ClientID,
    c.FirstName,
    c.MiddleName,
    c.LastName,
    c.ClientAccountStatusID,
    c.BlockNo,
    c.LotNo,
    c.Occupants,
    c.IsSenior,
    c.SeniorCount,
    CONCAT(c.LastName, ', ', c.FirstName, ' ', c.MiddleName) AS FullName,
    CONCAT('Blk ', CAST(c.BlockNo AS CHAR), ' and Lot ', CAST(c.LotNo AS CHAR)) AS FullAddress,
    cs.ClientStatusDesc AS ClientStatusDesc,
    c.PreviousReading,
    c.LotArea,
    c.HouseTypeID
FROM tblClient c
INNER JOIN tblClientStatus cs ON cs.ClientStatusID = c.ClientAccountStatusID
ORDER BY c.BlockNo, c.LotNo;