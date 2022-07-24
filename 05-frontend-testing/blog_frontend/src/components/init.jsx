import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Init = () => {

    // REDUX DISPATCH
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'auth/check'
        })
    }, [])

    return null
}

export default Init