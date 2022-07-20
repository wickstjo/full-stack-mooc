import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useStorage from '../hooks/storage'

export default () => {
    
    // GLOBAL STATE
    const dispatch = useDispatch()
    const storage = useStorage()

    // ON LOAD
    useEffect(() => {

        // CHECK STORAGE FOR CREDENTIALS
        storage.fetch().then(credentials => {

            // LOGIN IF CREDENTIALS ARE FOUND
            if (credentials) {
                dispatch({
                    type: 'auth/login',
                    credentials
                })
            }
        })
    }, [])

    return null
}