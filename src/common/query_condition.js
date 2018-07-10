export const getLimit = limit => {
    limit = +limit;
    return limit > 100 ? 100 : limit;
  };
  
  export const getOffset = offset => {
    offset = +offset;
    return offset;
  };

  export const getTotal = result => {
    const total = result ? result.count : 0;
    return total;
  };