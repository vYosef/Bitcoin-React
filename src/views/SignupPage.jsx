import { useEffect, useState } from 'react'
import { userService } from '../services/user.service.js'
import { useForm } from '../customHooks/useForm'

export function SignupPage(props) {
  const [userName, setUserName] = useState('')

  const onSignup = async (ev) => {
    ev.preventDefault()
    // if (this.state.name === '') return
    try {
      await userService.signup(userName)
      setUserName(userName)
      props.history.push('/')
    } catch (error) {
      console.log('error:', error)
    }
  }

  const handleChange = ({ target }) => {
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
    setUserName(value)
    // this.setState({ amount: value })
    // this.setState(({ userName }) => ({
    //   userName: { ...userName, [field]: value },
    // }))
  }

  return (
    <section className="signup">
      <h1>Please enter your name:</h1>
      <form onSubmit={onSignup}>
        <input
          value={userName}
          onChange={handleChange}
          type="text"
          name="userName"
          id="userName"
        />
      </form>
      <button>Signup</button>
    </section>
  )
}
