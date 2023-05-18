import { useEffect, useState } from 'react'
import { Sparklines } from 'react-sparklines'
import { SparklinesLine, SparklinesReferenceLine } from 'react-sparklines'
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
        <div className="main-wrapper">
        <section>
  <h3>Market Prices</h3>
  <div className="graph-wrapper">
    <div className="sparklines-container">
      <Sparklines data={marketPrices}>
        <SparklinesLine color="blue" />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
    </div>
    <div className="scale-container">
      {Array.from({ length: 6 }, (_, index) => {
        const isLast = index === 5;
        const value = isLast
          ? Math.ceil(Math.max(...marketPrices))
          : Math.floor(
              Math.min(...marketPrices) +
                (index * (Math.max(...marketPrices) - Math.min(...marketPrices))) / 5
            );

        return (
          <span className="scale-label" key={index}>
            {value}
          </span>
        );
      }).reverse()}
    </div>
  </div>
</section>


<section>
  <h3>Transactions</h3>
  <div className="graph-wrapper">
    <div className="sparklines-container">
      <Sparklines data={transactions}>
        <SparklinesLine color="red" />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
    </div>
    <div className="scale-container">
      {Array.from({ length: 6 }, (_, index) => {
        const valueCount = 5 - index;
        const value = transactions[0] +
          (valueCount * (transactions[transactions.length - 1] - transactions[0])) / 5;

        return (
          <span className="scale-label" key={index}>
            {value.toFixed(2)}
          </span>
        );
      })}
    </div>
  </div>
</section>




          {/* <section>
            <h3>Transactions</h3>
            <Sparklines data={transactions}>
              <SparklinesLine color="red" />
            </Sparklines>
          </section> */}
        </div>
      </div>
    </>
  )
}
