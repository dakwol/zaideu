import { App } from '../App'
import { AuthPage } from '@/features/auth/model/types'
const RegisterRoutePage = () => {
  return <App initialPage={AuthPage.Register} />
}
export default RegisterRoutePage
