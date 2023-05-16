import { useEffect,useState } from "react";
import './AdminVerify.scss'
import EventCard from "../Events/EventCard";
import Sidebar from "./Sidebar";
import apiInstance from "../../config/axios";
import { baseUrl } from "../../utils/constants";
import PanelEventCard from "./panelEventCard";
import { TbZoomCancel } from "react-icons/tb";

const AdminVerify = () => {
    
    const [data,setData] = useState([])

    const getAllPendingTours = async() =>{
        await apiInstance.get(`${baseUrl}/tours/pending_tours/`)
        .then((res) =>[
            // console.log(res)
            setData(res.data)
        ])
        .catch((err) =>{
            console.log(err);
        })
    }

    useEffect(() =>{
        getAllPendingTours();
    },[])
    
    return (
        <div className='bg' style={{backgroundColor:'white'}}>
            <div className='sidebar'>
              <Sidebar/>
            </div>
            <div className="search-tours__tours-list__tours" >
                {data.length > 0 ? (
                  data.map((tour, index) => <PanelEventCard key={index} tour={tour} />)
                ) : (
                  <div className="no-tour-wrapper">
                    <div className="no-tours">
                      <TbZoomCancel style={{ fontSize: '48px', color: '#feb714' }} />
                      <h3 className="no-tours__title">توری یافت نشد.</h3>
                    </div>
                  </div>
                )}
                {/* {
                    tours.map((tour) =>{
                        return(
                            <PanelEventCard tour={tour} key={tour.id}/>
                        )
                    })
                } */}
            </div>
        </div>
    );
}
 
export default AdminVerify;