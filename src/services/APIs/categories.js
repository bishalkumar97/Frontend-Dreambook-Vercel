const URL = "https://backend-dream-book-vercel.vercel.app/api";

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${URL}/categories`);
    const json = await res.json();
    return json;
  } catch (e) {
    console.error("❌ Failed to fetch categories", e);
    return { data: [] };
  }
};
