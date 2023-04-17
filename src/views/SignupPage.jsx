import { Component } from 'react'
import { userService } from '../services/user.service.js'
import { bitCoinService } from '../services/bitCoin.service.js'

export class SignupPage extends Component {
  state = {
    userName: '',
  }

  onSignup = async (ev) => {
    ev.preventDefault()
    if (this.state.name === '') return
    try {
      await userService.signup(this.state.userName)
      this.props.history.push('/')
    } catch (error) {
      console.log('error:', error)
    }
  }

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'name':
      case 'number':
      case 'range':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
    }
    this.setState({ userName: value })
    // this.setState(({ userName }) => ({
    //   userName: { ...userName, [field]: value },
    // }))
  }

  render() {
    const { userName } = this.state
    // if (!name) return <div>Loading...</div>
    return (
      <section className='signup'>
        <h1>Please enter your name:</h1>
        <form onSubmit={this.onSignup}>
          <input
            value={userName}
            onChange={this.handleChange}
            type="text"
            name="userName"
            id="userName"
          />
        </form>
        <button>Signup</button>
      </section>
    )
  }
}
