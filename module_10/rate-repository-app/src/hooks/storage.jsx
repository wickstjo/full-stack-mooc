import { useState } from 'react'
import Storage from '../funcs/storage'

export default () => {
    
    // STORAGE STATE
    const [resource] = useState(
        new Storage()
    );

    return resource
}