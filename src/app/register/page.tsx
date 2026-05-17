import { App } from '../App'
import { AuthPage } from '@/features/auth/model/types'

export default function RegisterRoutePage() {
  return <App initialPage={AuthPage.Register} />
}
