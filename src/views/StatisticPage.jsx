import { Component } from 'react'
import { Sparklines } from 'react-sparklines'
import { SparklinesLine } from 'react-sparklines'
import { bitCoinService } from '../services/bitCoin.service.js'

export class StatisticPage extends Component {
  state = {
    marketPrices: null,
  }

  componentDidMount() {
    this.loadPrices()
  }

  loadPrices = async () => {
    try {
      const prices = await bitCoinService.getMarketPrice()
      const values = prices.map((price) => {
        return price.y
      })
      this.setState({ marketPrices: values })
    } catch (err) {
      console.log('err:', err)
    }
  }

  render() {
    const { marketPrices } = this.state
    if (!marketPrices) return <div>...Loading</div>
    return (
      <>
        <Sparklines data={marketPrices}>
          <SparklinesLine color="blue" />
        </Sparklines>
      </>
    )
  }
}
