exports.AssignQueryLabels = (recordsets, labelArray) => {      
  let rsObject = {};
  recordsets.forEach((rs, index) => {    
    let label = labelArray[index]
      ? labelArray[index]
      : `qry${index.toString()}`;
    rsObject[label] = rs;
  });
  return rsObject;
};


