import { redirect } from '@tanstack/react-router'
import { store } from 'src/app/store'

export const beforeLoad = () => {
  const disabled = store.getState().flags.disableConfigPage
  if (disabled) throw redirect({ to: '/table' })
}
