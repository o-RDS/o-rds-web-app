import react, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router';
import { signIn } from '../data/dataLayerManager';


export default function ConfigContext(props: any){
  const AdminAuthContext = react.createContext({});
  const userID = "test"

  useEffect(() => {
    signIn();
  }, [])

  return (
    <AdminAuthContext.Provider value={userID}>
      <Outlet/>
    </AdminAuthContext.Provider>
  )
}