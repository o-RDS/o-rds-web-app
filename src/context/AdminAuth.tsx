import react, { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { signIn } from "../data/dataLayerManager";

export default function ConfigContext(props: any) {
  const AdminAuthContext = react.createContext({});
  const userID = "test@siue.edu";

  useEffect(() => {
    signIn();
  }, []);

  return <Outlet context={userID} />;
}
