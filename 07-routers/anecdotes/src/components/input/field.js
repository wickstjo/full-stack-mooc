const Field = ({ type='text', placeholder='PLACEHOLDER MISSING', hook }) => {

    // FILTER OUT HOOK RESET PROP
    const cloned = { ...hook }
    delete cloned.reset

    return (
        <input
            type={ type }
            placeholder={ placeholder }
            { ...cloned }
        />
    )
}

export default Field