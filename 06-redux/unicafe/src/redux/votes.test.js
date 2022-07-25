import deepFreeze from 'deep-freeze'
import { reducer, init_state } from './votes'

describe('unicafe reducer', () => {
    test('Init state is returned correctly', () => {

        // RUN NON-EXISTENT ACTION
        const new_state = reducer(undefined, {
            type: 'DO_NOTHING'
        })

        // EXPECT THE INIT STATE IN RETURN
        expect(new_state).toEqual(init_state)
    })

    test('Voting for "good" works correctly', () => {

        // FREEZE THE INIT STATE
        const state = init_state
        deepFreeze(state)

        // VOTE "GOOD"
        const new_state = reducer(state, {
            type: 'good'
        })

        // ASSERT CHANGE
        expect(new_state).toEqual({
            ...init_state,
            good: 1,
            total: 1,
        })
    })

    test('Voting for "neutral" works correctly', () => {

        // FREEZE THE INIT STATE
        const state = init_state
        deepFreeze(state)

        // VOTE "OK"
        const new_state = reducer(state, {
            type: 'neutral'
        })

        // ASSERT CHANGE
        expect(new_state).toEqual({
            ...init_state,
            neutral: 1,
            total: 1,
        })
    })

    test('Voting for "bad" works correctly', () => {

        // FREEZE THE INIT STATE
        const state = init_state
        deepFreeze(state)

        // VOTE "BAD"
        const new_state = reducer(state, {
            type: 'bad'
        })

        // ASSERT CHANGE
        expect(new_state).toEqual({
            ...init_state,
            bad: 1,
            total: 1,
        })
    })
})