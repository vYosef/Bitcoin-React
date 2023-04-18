import axios from 'axios'
import { storageService } from './storage.service'
const MARKET_PRICE_KEY = 'marketPriceDB'
const BLOCK_SIZE_KEY = 'blockSizeDB'

export const bitCoinService = {
    getRate,
    getMarketPrice,
    getConfirmedTransactions
}

const data = {
  status: 'ok',
  name: 'Market Price (USD)',
  unit: 'USD',
  period: 'day',
  description: 'Average USD market price across major bitcoin exchanges.',
  values: [
    { x: 1680134400, y: 28355.92 },
    { x: 1680220800, y: 28033.06 },
    { x: 1680307200, y: 28479.75 },
    { x: 1680393600, y: 28465.04 },
    { x: 1680480000, y: 28185.2 },
    { x: 1680566400, y: 27802.23 },
    { x: 1680652800, y: 28169.5 },
    { x: 1680739200, y: 28180.4 },
    { x: 1680825600, y: 28039.94 },
    { x: 1680912000, y: 27925.55 },
    { x: 1680998400, y: 27956.01 },
    { x: 1681084800, y: 28336.18 },
    { x: 1681171200, y: 29656.24 },
    { x: 1681257600, y: 30234.98 },
    { x: 1681344000, y: 29899.24 },
  ],
}

async function getRate(coins) {
  try {
    const coinsInUsd = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    return coinsInUsd.data
} catch (err) {
    console.error(`failed to get coins`, err)
}
}

async function getMarketPrice() {
  const marketPricesFromStorage = storageService.load(MARKET_PRICE_KEY)
  if (marketPricesFromStorage) return marketPricesFromStorage
  try {
       const response = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
       const data = response.data
       storageService.store(MARKET_PRICE_KEY, data)
       return data
  } catch (err) {
       console.error('Error getting market prices:', err)
       return null
  }
}

async function getConfirmedTransactions() {
  const blockSizeFromStorage = storageService.load(BLOCK_SIZE_KEY)
  if (blockSizeFromStorage) return blockSizeFromStorage
  try {
       const response = await axios.get(`https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`)
       const data = response.data
       storageService.store(BLOCK_SIZE_KEY, data)
       return data
  } catch (err) {
       console.error('Error getting block size:', err)
       return null
  }
}
