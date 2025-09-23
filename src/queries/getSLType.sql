SELECT Id,
	slt.SLC_CODE,
    slt.SLT_CODE,
    slt.SLE_CODE,
    slt.StatusID,
    slt.SL_Description,
    slt.SL_Description1,
    slt.Formula,
    slt.IsAutoLoad,
    gl.AccountCode
FROM tblsltype slt
INNER JOIN tblglcontrol gl
	ON gl.SLC_CODE = slt.SLC_CODE
		AND gl.SLT_CODE = slt.SLT_CODE
        AND gl.SLE_CODE = slt.SLE_CODE
WHERE slt.Id = ?
;