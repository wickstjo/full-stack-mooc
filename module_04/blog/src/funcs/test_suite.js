import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import event from '@testing-library/user-event'

const log = () => {
    screen.debug()
}

export {
    render,
    event,
    log
}