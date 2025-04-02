import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Fetch weather for a list of cities (default: New York, London, Tokyo)
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (cities = ["New York", "London", "Tokyo"]) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const responses = await Promise.all(
      cities.map(city => 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
          .then(res => res.json())
      )
    )
    return responses;
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
})

export default weatherSlice.reducer
