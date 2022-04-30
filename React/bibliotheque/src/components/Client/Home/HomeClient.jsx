import Header from "../../Header/Header";
import {useLocation} from 'react-router-dom';

export default function HomeClient({ props }){

     const Client = useLocation().state;
    
    return(
        <>
            <Header headerFor={'client'}/>
        </>
    )

}