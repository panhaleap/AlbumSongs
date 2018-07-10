export const succeed = (res, data, code) => {
  if (typeof data == 'String' || data instanceof String) return res.status(code).json({ message: data });
  if (data === null) return res.status(code).json({ message: 'No data' });
  return res.status(code).json(data);
};

export const updatedResponse = (res, result, activity) => {
  const msg = result > 0 ? { message: `${routeType} Success`, code: 200 } : { message: `Nothing ${routeType}`, code: 404 };
  return succeed(res, msg.message, msg.code);
};

export const failed = (res, message, code) => {
  return res.status(code).json({ message });
};

export const errorValidation = (res, data, code) => {
  console.log(data);
  return res.status(code).json({ error: data.name, message: data.message });
};
