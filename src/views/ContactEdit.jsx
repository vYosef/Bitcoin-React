import { useEffect } from 'react'
import { contactService } from '../services/contact.service'
import { useForm } from '../customHooks/useForm'
import { useParams } from 'react-router-dom'

export function ContactEdit(props) {
  const [contact, handleChange, setContact] = useForm(null)
  const params = useParams()
  // state = {
  //   contact: contactService.getEmptyContact(),
  // }

  useEffect(() => {
    loadContact()
  }, [])

  async function loadContact() {
    const contactId = params.id
    if (contactId) {
      try {
        const contact = await contactService.getContactById(contactId)
        console.log(contact)
        setContact(contact)
        // this.setState({ contact })
      } catch (error) {
        console.log('error:', error)
      }
    }
  }

  const onSaveContact = async (ev) => {
    ev.preventDefault()
    try {
      await contactService.saveContact(contact)
      props.history.push('/contacts')
    } catch (error) {
      console.log('error:', error)
    }
  }

  // handleChange = ({ target }) => {
  //   const field = target.name
  //   let value = target.value

  //   switch (target.type) {
  //     case 'number':
  //     case 'range':
  //       value = +value
  //       break
  //     case 'checkbox':
  //       value = target.checked
  //       break
  //   }
  //   this.setState(({ contact }) => ({
  //     contact: { ...contact, [field]: value },
  //   }))
  // }

  // render() {
    // const { contact } = this.state
    if (!contact) return <div>Loading...</div>
    const { name, email, phone } = contact
    return (
      <section className="contact-edit">
        <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
        <form onSubmit={onSaveContact}>
          <label htmlFor="name">Name:</label>
          <input
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
          />

          <label htmlFor="phone">Phone:</label>
          <input
            value={phone}
            onChange={handleChange}
            type="text"
            name="phone"
            id="phone"
          />

          <label htmlFor="email">Email:</label>
          <input
            value={email}
            onChange={handleChange}
            type="text"
            name="email"
            id="email"
          />

          <button>Save</button>
        </form>
      </section>
    )
  }
// }
