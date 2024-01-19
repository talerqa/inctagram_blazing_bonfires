import type { Meta, StoryObj } from '@storybook/react'

import { Text } from './Text'

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Components/Text',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>

export const XXLTextStory: Story = {
  args: {
    size: 'xxl',
    weight: 'semi_bold',
    children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
  },
}

export const XLTextStory: Story = {
  args: {
    size: 'xl',
    weight: 'bold',
    children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
  },
}

export const LargeTextStory: Story = {
  args: {
    size: 'large',
    weight: 'bold',
    children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
  },
}
////////

export const RegularTextStory: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
  },
}

export const RegularBoldTextStory: Story = {
  args: {
    weight: 'bold',
    children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
  },
}
export const RegularSemiBoldTextStory: Story = {
  args: {
    weight: 'semi_bold',
    children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
  },
}
export const MediumMediumTextStory: Story = {
  args: {
    size: 'medium',
    weight: 'medium',
    children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
  },
}

export const MediumRegularTextStory: Story = {
  args: {
    size: 'medium',

    children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
  },
}

export const MediumBoldTextStory: Story = {
  args: {
    size: 'medium',
    weight: 'bold',
    children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
  },
}

export const SmallTextStory: Story = {
  args: {
    size: 'small',
    children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
  },
}

export const SmallSemiBoldTextStory: Story = {
  args: {
    size: 'small',
    weight: 'semi_bold',
    children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
  },
}
export const RegularLinkTextStory: Story = {
  args: {
    color: 'info',
    size: 'link',
    children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
  },
}

export const SmallRegularlinkTextStory: Story = {
  args: {
    color: 'info',
    size: 'small_link',
    children: 'Carosserie Test Zürich Stauffacherstrasse 3 8004 Zürich, ZH, CH',
  },
}
