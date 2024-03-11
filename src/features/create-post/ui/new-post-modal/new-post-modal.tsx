import React, { ReactNode } from 'react'

import { Dialog } from '@headlessui/react'

import styles from './new-post-modal.module.scss'

interface NewPostModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  title: string
  left?: ReactNode
  right?: ReactNode
  children: any
  setIsErrorMessage?: (setError: string) => void
}

const NewPostModal: React.FC<NewPostModalProps> = props => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={() => {
        props.setIsOpen(false)
        if (props.setIsErrorMessage) {
          props.setIsErrorMessage('')
        }
      }}
      className={styles.modalWrapper}
    >
      <Dialog.Panel className={styles.modal}>
        {/*header*/}
        <div className={styles.modalHeader}>
          {props.left}
          <Dialog.Title className={styles.modalTitle}>{props.title}</Dialog.Title>
          {props.right}
        </div>
        {/*content*/}
        <div className={styles.modalContent}>{props.children}</div>
      </Dialog.Panel>
    </Dialog>
  )
}

export default NewPostModal
