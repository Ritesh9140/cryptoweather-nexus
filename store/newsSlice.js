import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Fetch top 5 crypto-related news headlines
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async () => {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&category=business&language=en&country=us&keyword=crypto`;
    const res = await fetch(url);
    const data = await res.json();

    // Temporary console log to inspect the API response
    console.log("News API response:", data);

    // Check if data.results is an array and return the first 5 items
    if (Array.isArray(data.results)) {
      return data.results.slice(0, 5);
    } else {
      console.error("Unexpected response format:", data);
      return [];
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default newsSlice.reducer;
