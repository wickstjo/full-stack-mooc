import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Init = () => {

    // REDUX DISPATCH
    const dispatch = useDispatch()

    // CHECK LOCALSTORAGE FOR SESSION
    useEffect(() => {
        dispatch({
            type: 'auth/check'
        })
    }, [])

    return null
}

export default Init