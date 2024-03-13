import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

const meta = {
  argTypes: {
    //для переключения варианта
    variant: {
      control: { type: 'radio' },
      options: [
        'body1',
        'body2',
        'caption',
        'h1',
        'h2',
        'h3',
        'h4',
        'link1',
        'link2',
        'overline',
        'subtitle1',
        'subtitle2',
      ],
    },
  },
  component: Typography,
  //для создания Docs с общей страницей
  tags: ['autodocs'],
  //для красоты чтоб было все названо слева в уголке
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Body1: Story = {
  args: {
    children: 'Body1 Text',
    variant: 'body1',
  },
}

export const Body2: Story = {
  args: {
    children: 'Body2 Text',
    variant: 'body2',
  },
}

export const Caption: Story = {
  args: {
    children: 'Caption Text',
    variant: 'caption',
  },
}

export const H1: Story = {
  args: {
    as: 'h1',
    children: 'h1 Text',
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    as: 'h2',
    children: 'h2 Text',
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    as: 'h3',
    children: 'h3 Text',
    variant: 'h3',
  },
}

export const H4: Story = {
  args: {
    as: 'h4',
    children: 'h4 Text',
    variant: 'h4',
  },
}

export const Link1: Story = {
  args: {
    as: 'a',
    children: 'Link1 Text',
    variant: 'link1',
  },
}

export const Link2: Story = {
  args: {
    as: 'a',
    children: 'Link2 Text',
    variant: 'link2',
  },
}

export const Overline: Story = {
  args: {
    as: 'p',
    children: 'Overline Text',
    variant: 'overline',
  },
}

export const Subtitle1: Story = {
  args: {
    children: 'Subtitle1 Text',
    variant: 'subtitle1',
  },
}

export const Subtitle2: Story = {
  args: {
    children: 'Subtitle2 Text',
    variant: 'subtitle2',
  },
}
