import Wrapper from './wrapper'

const Content = ({ payload, children }) => {

    // DESTRUCTURE PAYLOAD PARTS
    const [header, fallback, data] = payload

    // CATCH PROBLEMS
    if (!data || data.length === 0) { return (
        <Wrapper header={ header }>
            <div>{ fallback }</div>
        </Wrapper>
    )}

    // OTHERWISE, RENDER CHILDREN
    return (
        <Wrapper header={ header }>
            { children }
        </Wrapper>
    )
}

export default Content