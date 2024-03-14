import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from './modal.module.scss'
export const Modal = () => {
  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay className={s.DialogOverlay} />
        <Dialog.Content className={s.DialogContent}>
          <HeaderModal />
          <ContentContainerModal />
          <FooterModal />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export const HeaderModal = () => {
  return <Dialog.Title className={s.DialogTitle}>Edit profile</Dialog.Title>
}

export const ContentContainerModal = () => {
  return (
    <>
      <Dialog.Description className={s.DialogDescription}>
        Make changes to your profile here. Click save when you're done.
      </Dialog.Description>
      <fieldset className={s.Fieldset}>
        <label className={s.Label} htmlFor={'name'}>
          Name
        </label>
        <input className={s.Input} defaultValue={'Pedro Duarte'} id={'name'} />
      </fieldset>
      <fieldset className={s.Fieldset}>
        <label className={s.Label} htmlFor={'username'}>
          Username
        </label>
        <input className={'Input'} defaultValue={'@peduarte'} id={'username'} />
      </fieldset>
    </>
  )
}

export const FooterModal = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}>
        <Dialog.Close asChild>
          <button className={s.ButtonGreen}>Save changes</button>
        </Dialog.Close>
      </div>
      <Dialog.Close asChild>
        <button aria-label={'Close'} className={s.IconButton}>
          <Cross2Icon />
        </button>
      </Dialog.Close>
    </>
  )
}
