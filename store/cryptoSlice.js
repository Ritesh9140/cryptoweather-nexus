import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Fetch crypto data for a list of cryptocurrencies (default: bitcoin, ethereum, ripple)
export const fetchCrypto = createAsyncThunk(
  'crypto/fetchCrypto',
  async (cryptos = ["bitcoin", "ethereum", "ripple"]) => {
    const responses = await Promise.all(
      cryptos.map(crypto =>
        fetch(`https://api.coingecko.com/api/v3/coins/${crypto}`)
          .then(res => res.json())
      )
    )
    return responses;
  }
)

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Action to update crypto prices from WebSocket messages.
    updateCryptoPrice: (state, action) => {
      // action.payload example: { bitcoin: "12345.67", ethereum: "2345.67" }
      const prices = action.payload
      state.data = state.data.map(coin => {
        if (prices[coin.id]) {
          coin.market_data.current_price.usd = parseFloat(prices[coin.id])
        }
        return coin
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
})

export const { updateCryptoPrice } = cryptoSlice.actions
export default cryptoSlice.reducer
