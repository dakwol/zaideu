import { App } from '../App'
import { AuthPage } from '@/features/auth/model/types'
const LoginRoutePage = () => {
  return <App initialPage={AuthPage.Login} />
}
export default LoginRoutePage
