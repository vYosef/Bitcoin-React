import React from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact, onRemoveContact/* , onSelectContactId */ }) {

    const contactStyle = { src: `url(https://robohash.org/${contact._id})` }
    return (
        <article /* style={contactStyle} */ className='contact-preview'>
            <section className='image-wrapper'>
                <img src="https://robohash.org/1"/>
                {/* <img src={contactStyle}/> */}
            </section>
            <section /* onClick={() => onSelectContactId(contact._id)} */ className="info">
                <h2>{contact.name}</h2>
                <Link to={`/contacts/${contact._id}`}>Details</Link>
                <Link to={`/contacts/edit/${contact._id}`}>Edit</Link>
            </section>
            <section className="actions">
                <button onClick={() => onRemoveContact(contact._id)} >X</button>
            </section>
        </article>
    )
}