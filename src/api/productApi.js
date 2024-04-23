export const getProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = 'recent',
}) => {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;

  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  if (!response.ok) {
    throw new Error('상품 불러오기 실패');
  }
  const body = await response.json();
  return body;
};