export function MovesList({ title, movesList }) {
    return (
        <section className="moves-list">
            <h3>{title}</h3>
            {movesList.map((move, idx) =>
                // <ContactPreview key={contact._id} contact={contact} onRemoveContact={onRemoveContact} /* onSelectContactId={onSelectContactId} */ />
                <section key={idx} move={move}>
                    <p>At: {new Date(move.at).toLocaleTimeString()}</p>
                    <p>Amount: {move.amount}</p>
                    <p>Transferred to: {move.to}</p>
                </section>
            )}
        </section>
    )
}