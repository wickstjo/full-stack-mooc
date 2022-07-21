import Repositories from '../components/repos/'
import { render } from '@testing-library/react-native'

const dataset = [
    {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears',
        language: 'TypeScript',
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 4,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
    },
    {
        id: 'async-library.react-async',
        fullName: 'async-library/react-async',
        description: 'Flexible promise-based React data loader',
        language: 'JavaScript',
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
    },
]

describe('RepositoryList', () => {

    // REPO COMPONENT
    const foo = <Repositories data={ dataset } />

    it('Renders full names correctly', () => {
        const { getByText } = render(foo)
        const bar = render(foo)

        dataset.map(item => {
            expect(getByText(item.fullName)).toBeDefined()
        })
    })

    it('Renders languages correctly', () => {
        const { getByText } = render(foo)

        dataset.map(item => {
            expect(getByText(item.language)).toBeDefined()
        })
    })

    it('Renders rating labels correctly', () => {
        const { getAllByText } = render(foo)

        expect(getAllByText('Reviews').length).toBe(2)
        expect(getAllByText('Stars').length).toBe(2)
        expect(getAllByText('Forks').length).toBe(2)
        expect(getAllByText('Rating').length).toBe(2)
    })

    it('Renders ratings for first card correctly', () => {
        const { getByText } = render(foo)

        expect(getByText('1.6K')).toBeDefined()
        expect(getByText('21.9K')).toBeDefined()
        expect(getByText('88')).toBeDefined()
        expect(getByText('4')).toBeDefined()
    })

    it('Renders ratings for second card correctly', () => {
        const { getByText } = render(foo)

        expect(getByText('69')).toBeDefined()
        expect(getByText('1.8K')).toBeDefined()
        expect(getByText('72')).toBeDefined()
        expect(getByText('3')).toBeDefined()
    })
})