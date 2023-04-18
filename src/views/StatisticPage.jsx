import { useEffect, useState } from 'react'
import { Sparklines } from 'react-sparklines'
import { SparklinesLine, SparklinesBars } from 'react-sparklines'
import { bitCoinService } from '../services/bitCoin.service.js'

export function StatisticPage(props) {
  const [marketPrices, setMarketPrices] = useState(null)
  const [transactions, setTransactions] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const prices = await bitCoinService.getMarketPrice()
      const transactions = await bitCoinService.getConfirmedTransactions()
      const priceValues = prices.values.map((price) => {
        return price.y
      })
      const transActionValues = transactions.values.map((price) => {
        return price.y
      })
      setMarketPrices(priceValues)
      setTransactions(transActionValues)
    } catch (err) {
      console.log('err:', err)
    }
  }

  if (!marketPrices || !transactions) return <div>...Loading</div>
  return (
    <>
      <div className="statistics-wrapper">
        <h2>Statistics</h2>
        <div>
          <section>
            <h3>Market Prices</h3>
            <Sparklines data={marketPrices}>
              <SparklinesLine color="blue" />
            </Sparklines>
          </section>
          <section>
            <h3>Transactions</h3>
            <Sparklines data={transactions}>
              <SparklinesLine color="red" />
            </Sparklines>
          </section>
        </div>
      </div>
    </>
  )
}
