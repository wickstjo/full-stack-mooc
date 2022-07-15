import Wrapper from './wrapper'

const Content = ({ payload, verify=true, header=false, children }) => {

    // DESTRUCT PAYLOAD
    const { result, query } = payload

    // WHEN LOADING OR NO-DATA
    if (result?.loading || !result?.data[query.key]) { return (
        <Wrapper header={ 'error' }>
            <div>Data could not be retrieved.</div>
        </Wrapper>
    )}

    // DONE LOADING, BUT THE LIST IS EMPTY
    if (verify && !result?.loading && result?.data[query.key].length === 0) { return (
        <Wrapper header={ header }>
            <div>There are currently no listed items under this category.</div>
        </Wrapper>
    )}

    // WITH HEADER
    if (header) { return (
        <Wrapper header={ header }>
            { children }
        </Wrapper>
    )}

    // RAW
    return children
}

export default Content