import Wrapper from './wrapper'

const List = ({ header, data }) => { return (
    <Wrapper header={ header }>
        { Object.keys(data).map(key =>
            <div key={ key }>
                <div>{ key }</div>
                <div>{ data[key] }</div>
            </div>
        )}
    </Wrapper>
)}

export default List