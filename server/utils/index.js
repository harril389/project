export const responseFormat = (data) => ({
  ...data,
  message: data?.message || "OK",
  error: data?.error || null,
  data: data?.data || null,
});

export const convertPaging = (data) => ({
  size: parseInt(data.query?.size) || 10,
  page: parseInt(data.query?.page) || 1,
  paging: parseInt(data.query?.paging) || 0,
});
