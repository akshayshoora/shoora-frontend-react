import { AppPaths,Actions } from '../constants/commonEnums';
import {
ALL_ROUTES,
 ALL_MENU
} from 'constants/commonConstants';
import { useAppContext } from "ContextAPIs/appContext";

 let actionModes : string[] | undefined= [];




export function getFeatures() {
const result = ALL_MENU.filter(CheckFeatureAccess);
return result
   
  }

  export function CheckFeatureAccess(item:any) {
    const { user } = useAppContext();
        for(let j=0;j<user.allowed_features.length;j++){
            if(item.toLowerCase()=="dashboard" || item.toLowerCase()=="live" || item.toLowerCase()=="map" || item.toLowerCase()=="trip" || item.toLowerCase()=="report"){
                return true
            }
           
        else if(user.allowed_features[j].feature.toLowerCase()==item.toLowerCase())
        {         
            return true
        
        }
    }
  }


  export function getProtectedRoutes(route: any) {
    const result = ALL_ROUTES.filter(CheckRoutesAccess);
    return result.includes(route);
       
      }
    
      export function CheckRoutesAccess(item:any) {
        const { user } = useAppContext();
            for(let j=0;j<user.allowed_features.length;j++){
                 if(item.toLowerCase()=="dashboard" || item.toLowerCase()=="live" || item.toLowerCase()=="map" || item.toLowerCase()=="trip" || item.toLowerCase()=="report"){
                     return true
                 }
               
             if(user.allowed_features[j].feature.toLowerCase()==item.toLowerCase())
            {         
                return true
            
            }
        }
      }

   export function GetActionsByfeature(feature:AppPaths){
        const { user } = useAppContext();
        for(let i=0;i<user.allowed_features.length;i++){
            if(user.allowed_features[i].feature.toLowerCase()==feature.toLowerCase()){
                return user.allowed_features[i].actions
            }
        }
          

    }

      export function actionAccess(feature:AppPaths,actions:Actions) {
        actionModes =GetActionsByfeature(feature)
        if(actionModes?.includes(actions)){
        return true
        }
        else{
            return false
        }
        
      }

     


