import { cookies } from 'next/headers'
import LogoutButton from './logoutBtn';
import LoginForm from './login';
import Header from '../components/header';

export default async function RegisterDclabsAdmins() {

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  return (
    <>
    <Header/>
    <div style={{display:'flex', justifyContent:'center', marginTop:'200px'}}>
      {token ? <LogoutButton/> : <LoginForm/>}
    </div>
    </>
  );
}