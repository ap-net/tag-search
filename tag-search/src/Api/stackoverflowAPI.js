const BASE_URL = "https://api.stackexchange.com/2.2";

export const fetchTags = async (pageNumber, pageSize) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tags?pagesize=${pageSize}&page=${pageNumber}&order=desc&sort=popular&site=stackoverflow`
    );
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};