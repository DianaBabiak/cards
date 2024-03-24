import type { Meta, StoryObj } from '@storybook/react'

import { LearnDeck } from '@/features/learnDeck/LearnDeck'

import photo from '../../assets/imgReact.png'

const meta = {
  component: LearnDeck,
  tags: ['autodocs'],
  title: 'features/LearDeck',
} satisfies Meta<typeof LearnDeck>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    answer: 'This is how This works in JavaScript',
    deckName: 'Deck Name',
    imageAnswer: photo,
    imageQuestion: photo,
    numberAttempts: 10,
    question: 'How This works in JavaScript?',
  },
}

export const WithoutImage: Story = {
  args: {
    answer: 'This is how This works in JavaScript',
    deckName: 'Deck Name',
    numberAttempts: 10,
    question: 'How This works in JavaScript?',
  },
}
