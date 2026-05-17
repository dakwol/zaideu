import { App } from '../App'
import { AuthPage } from '@/features/auth/model/types'

export default function LoginRoutePage() {
  return <App initialPage={AuthPage.Login} />
}
