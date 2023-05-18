import { useEffect,useState } from "react";
import './AdminVerify.scss'
import EventCard from "../Events/EventCard";
import Sidebar from "./Sidebar";
import apiInstance from "../../config/axios";
import { baseUrl } from "../../utils/constants";
import PanelEventCard from "./panelEventCard";
import { TbZoomCancel } from "react-icons/tb";
import toast, { Toaster } from 'react-hot-toast';
import PanelTourCard from "./panelTourCard";


const AdminVerify = () => {
    
    const [data,setData] = useState([])
    const [acceptedEvents, setAcceptedEvents] = useState([]);
    const [rejectedEvents, setRejectedEvents] = useState([]);
    const [allTours,setAllTours] = useState([]);
    const [acceptedTours, setAcceptedTours] = useState([]);
    const [rejectedTours, setRejectedTours] = useState([]);
    console.log('allTours',allTours);
    const getAllPendingEvents = async() =>{
        await apiInstance.get(`${baseUrl}/events/pending_events/`)
        .then((res) =>[
            // console.log(res)
            setData(res.data)
        ])
        .catch((err) =>{
            console.log(err);
        })
    }

    const getAllPendingTours = async() =>{
        await apiInstance.get(`${baseUrl}/tours/pending_tours/`)
        .then((res) =>{
            setAllTours(res.data)
        })
        .catch((err) =>{
            console.log(err);
        })
    }
    const acceptEvent = (eventId) => {
        setAcceptedEvents((prevState) => [...prevState, eventId]);
    };
    const acceptTour =  (tourId) =>{
        setAcceptedTours((prevState) => [...prevState, tourId]);
    }

    const rejectEvent = (eventId) => {
        setRejectedEvents((prevState) => [...prevState, eventId]);
    };
    const rejectTour = (tourId) =>{
        setRejectedTours((prevState) => [...prevState, tourId]);
    }

    useEffect(() =>{
        getAllPendingEvents();
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
    
      useEffect(() => {
        if (acceptedTours.length > 0) {
          setAllTours((prevTours) =>
            prevTours.filter((tour) => !acceptedTours.includes(tour.id))
          );
        }
      }, [acceptedTours]);
    
      useEffect(() => {
        if (rejectedTours.length > 0) {
          setAllTours((prevTours) =>
            prevTours.filter((tour) => !rejectedTours.includes(tour.id))
          );
        }
      }, [rejectedTours]);
    
    return (
        <div className='bg' style={{backgroundColor:'white'}}>
            <div className='sidebar'>
              <Sidebar/>
            </div>
            <Toaster />
            <section className="events-AdminVerify">
                {data.length === 0 ? <h2>رویدادی نیست که بخوای قبول کنی</h2> : <h2> رویداد منتظر تایید شما هستند</h2>}
                <div className="search-tours__tours-list__tours" >
                    {data.length > 0 ? (
                        data.map((event, index) => 
                            <PanelEventCard 
                            key={index}
                            event={event}
                            onAccept={acceptEvent} 
                            onReject={rejectEvent}
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
            <section className="tours-AdminVerify">
                    {allTours.length === 0 ? <h2>توری نیست که بخوای قبول کنی</h2> : <h2>تور هایی که منتظر پذیرش شما هستند</h2>}
                    <div className="search-tours__tours-list__tours" >
                        {allTours.length > 0 ? (
                            allTours.map((tour, index) =>
                            <PanelTourCard
                                key={index}
                                tour={tour}
                                onAccept={acceptTour}
                                onReject={rejectTour}
                            />
                            )
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