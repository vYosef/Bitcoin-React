export function MovesList({ title, movesList }) {
    return (
        <section className="moves-list">
            <h3>{title}</h3>
            {movesList.map(move =>
                // <ContactPreview key={contact._id} contact={contact} onRemoveContact={onRemoveContact} /* onSelectContactId={onSelectContactId} */ />
                <section key={move.toId} move={move}>
                    <p>At:{move.at}</p>
                    <p>Amount:{move.amount}</p>
                </section>
            )}
        </section>
    )
}