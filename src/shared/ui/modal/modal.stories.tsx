import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from './modal'

const meta: Meta<typeof Modal> = {
  title: 'Example/lib',
  component: Modal,
}

export default meta
type Story = StoryObj<typeof Modal>

const childrenLayout = (
  <>
    Some Text <br />
    testing the modal window
  </>
)

export const ModalButtonPrimary: Story = {
  args: {
    title: 'Storybook',
    callBackCloseWindow: () => '',
    mainButton: 'Ok',
    children: childrenLayout,
  },
}
export const ModalButtonSecondary: Story = {
  args: {
    title: 'Storybook',
    callBackCloseWindow: () => '',
    mainButton: 'No',
    extraButton: 'Yes',
    children: childrenLayout,
  },
}
