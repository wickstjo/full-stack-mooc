import Wrapper from './wrapper'

const Swapper = ({ params, children }) => {

    // WHEN LOADING
    if (params.loading) { return (
        <Wrapper header={ 'alert' }>
            <div>Loading data...</div>
        </Wrapper>
    )}

    // DATA LOADED
    if (params.data) {
        return (
            <Wrapper header={ 'author found' }>
                { children }
            </Wrapper>
        )
    }

    // FALLBACK
    return (
        <Wrapper header={ 'error' }>
            <div>Data could not be retrieved.</div>
        </Wrapper>
    )
}

export default Swapper