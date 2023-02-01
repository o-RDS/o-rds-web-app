import react, { useEffect, useRef } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router';
import { retrieveSurveyConfig, signIn } from '../data/dataLayerManager';


export default function ConfigContext(props: any){
  const SurveyConfigContext = react.createContext({});
  const navigate = useNavigate();
  const params = useParams();
  const config = useRef({});

  useEffect(() => {
    signIn();
    if(params.id){
      console.log(params.id)
      retrieveSurveyConfig(params.id).then((data) => {
        if (data == null) {
          navigate("/invalid")
        } else {
          console.log(data)
          config.current = data;
        }
      })
    } else {
      navigate("/invalid")
    }
  }, [])

  return (
    <SurveyConfigContext.Provider value={config.current}>
      <Outlet/>
    </SurveyConfigContext.Provider>
  )
}