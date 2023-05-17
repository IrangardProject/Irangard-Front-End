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
    const [acceptedEvents, setAcceptedEvents] = useState([]);
    const [rejectedEvents, setRejectedEvents] = useState([]);

    const getAllPendingTours = async() =>{
        await apiInstance.get(`${baseUrl}/events/pending_events/`)
        .then((res) =>[
            // console.log(res)
            setData(res.data)
        ])
        .catch((err) =>{
            console.log(err);
        })
    }
    const acceptTour = (eventId) => {
        setAcceptedEvents((prevState) => [...prevState, eventId]);
    };

    const rejectTour = (eventId) => {
        setRejectedEvents((prevState) => [...prevState, eventId]);
    };

    useEffect(() =>{
        getAllPendingTours();
    },[])
    useEffect(() => {
        if (acceptedEvents.length > 0) {
          setData((prevData) =>
            prevData.filter((event) => !acceptedEvents.includes(event.id))
          );
        }
    }, [acceptedEvents]);
      
    useEffect(() => {
        if (rejectedEvents.length > 0) {
          setData((prevData) =>
            prevData.filter((event) => !rejectedEvents.includes(event.id))
          );
        }
    }, [rejectedEvents]);
    
    return (
        <div className='bg' style={{backgroundColor:'white'}}>
            <div className='sidebar'>
              <Sidebar/>
            </div>
            <section className="events-AdminVerify">
                {data.length === 0 ? <h2>توری نیست که بخوای قبول کنی</h2> : <h2>تور هایی که منتظر پذیرش شما هستند</h2>}
                <div className="search-tours__tours-list__tours" >
                    {data.length > 0 ? (
                        data.map((event, index) => 
                            <PanelEventCard 
                            key={index}
                            event={event}
                            onAccept={acceptTour} 
                            onReject={rejectTour}
                        />)
                    ) : (
                    <div className="no-tour-wrapper">
                        {/* <div className="no-tours">
                        <TbZoomCancel style={{ fontSize: '48px', color: '#feb714' }} />
                        <h3 className="no-tours__title">توری نیست که بخوای قبول کنی.</h3>
                        </div> */}
                    </div>
                    )}
                </div>
            </section>
        </div>
    );
}
 
export default AdminVerify;