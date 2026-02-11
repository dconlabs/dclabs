import { cookies } from 'next/headers'
import LogoutButton from './logoutBtn';
import LoginForm from './login';

export default async function RegisterDclabsAdmins() {

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  return (
    <div>
      {token ? <LogoutButton/> : <LoginForm/>}
    </div>
  );
}