import { ContactPreview } from "./ContactPreview";

export function ContactList({ contacts, onRemoveContact/* , onSelectContactId */ }) {
    return (
        <section className="contact-list">
            {contacts.map(contact =>
                <ContactPreview key={contact._id} contact={contact} onRemoveContact={onRemoveContact} /* onSelectContactId={onSelectContactId} */ />
            )}
        </section>
    )
}
