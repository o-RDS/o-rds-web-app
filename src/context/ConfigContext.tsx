import react, { useEffect, useRef } from "react";
import { useParams, useNavigate, Outlet } from "react-router";
import { retrieveSurveyConfig } from "../APIs/Firebase";

export default function ConfigContext(props: any) {
  //const SurveyConfigContext = react.createContext({});
  const navigate = useNavigate();
  const params = useParams();
  const config = useRef(
    window.sessionStorage.getItem(
      params.id && typeof params.id === "string" ? params.id : ""
    )
      ? JSON.parse(
          window.sessionStorage.getItem(
            params.id && typeof params.id === "string" ? params.id : ""
          ) as string
        )
      : {}
  );

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      console.log(params.id);
      retrieveSurveyConfig(params.id).then((data) => {
        if (data == null) {
          navigate("/invalid");
        } else {
          if (!data.live) {
            navigate("/invalid");
          }
          console.log(data);
          config.current = data;
          if (params.id && typeof params.id === "string") {
            window.sessionStorage.setItem(params.id, JSON.stringify(data));
          }
        }
      });
    } else {
      navigate("/invalid");
    }
  }, []);

  return <Outlet context={config.current} />;
}
