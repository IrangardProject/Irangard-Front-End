import { Dialog} from "@mui/material";
import Button from '../Button/index'
import {useState, useEffect} from "react";
import {TbBellRinging2, TbMoodSad} from 'react-icons/tb';
import apiInstance from 'src/config/axios';
import {MdPlace, MdTour} from 'react-icons/md';
import {BsCreditCard2Back, BsFillCalendarEventFill} from 'react-icons/bs';
import './index.scss'
import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import { IoArrowBackCircleOutline } from "react-icons/io5";
// import { TfiFaceSad } from "react-icons/tfi";
const RecieveSuggestionModal = ({open, setOpen}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [recieve, setRecieve] = useState(false)
    const [events, setEvents] = useState([]);
    const [place, setPlace] = useState([]);
    const [tours, setTours] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedData, setSelectedData] = useState([]);
    const [eventId, setEventId] = useState(0);
    const categoryTexts = {
        place: "مکان های پیشنهاد شده به شما",
        tour: "تور های پیشنهاد شده به شما",
        event: "رویداد های پیشنهاد شده به شما"
    };
    const getEvents = async () => {
        const access_token = localStorage.getItem('access-token');
        console.log('access_token is', access_token);
        if (access_token) {
            const headers = {
                Authorization: `JWT ${access_token}`
            };
            await apiInstance.get('/suggestion/event/receiver_suggestions/', {headers}).then((res) => {
                setEvents(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    const getPlace = async () => {
        const access_token = localStorage.getItem('access-token');
        console.log('access_token is', access_token);
        if (access_token) {
            const headers = {
                Authorization: `JWT ${access_token}`
            };
            await apiInstance.get('/suggestion/place/receiver_suggestions/', {headers}).then((res) => {
                setPlace(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    };
    const getTours = async () => {
        const access_token = localStorage.getItem('access-token');
        if (access_token) {
            const headers = {
                Authorization: `JWT ${access_token}`
            };
            await apiInstance.get('/suggestion/tour/receiver_suggestions/', {headers}).then((res) => {
                setTours(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    useEffect(() => {
        getEvents();
        getPlace();
        getTours();
    }, []);
    const handleClose = () => {
        onClose();
    };
    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleArticle = (category) => {
        setOpen(false);
        setRecieve(true)
        setSelectedCategory(category);
    }

    const removeSuggestionEventHandler = (id) => {
        const access_token = localStorage.getItem('access-token');
        if (access_token) {
            const headers = {
                Authorization: `JWT ${access_token}`
            };
            console.log(headers);
            apiInstance.delete(`/suggestion/event/${id}/`, {headers}).then(() => {
                toast.success('رویداد از لیست شما حذف شد')
                setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
            })
        }
    }
    const removeSuggestionPlaceHandler = (id) => {
        console.log('place function clicked', id);
        const access_token = localStorage.getItem('access-token');
        if (access_token) {
            const headers = {
                Authorization: `JWT ${access_token}`
            };
            apiInstance.delete(`/suggestion/place/${id}/`, {headers}).then(() => {
                toast.success('مکان از لیست شما حذف شد')
                setPlace(prevPlace => prevPlace.filter(place => place.id !== id));
            })
        }
    }
    const removeSuggestionTourHandler = (id) => {
        console.log('tour function clicked', id);
        const access_token = localStorage.getItem('access-token');
        if (access_token) {
            const headers = {
                Authorization: `JWT ${access_token}`
            };
            apiInstance.delete(`/suggestion/tour/${id}/`, {headers}).then(() => {
                toast.success('تور از لیست شما حذف شد')
                setTours(prevPlace => prevPlace.filter(place => place.id !== id));
            })
        }
    }

    const BackiconHandler = () => {
        setRecieve(false)
        setOpen(true);
        
    }

    return (
        <div>
            <Dialog className="recieve-suggestion"
                onClose={handleDialogClose}
                open={open}>
                <section className="recieve-suggestion__container">
                    <h2>لیست پیشنهاد شده به شما</h2>
                    <section className='list-of-shared'>
                        <article onClick={
                            () => handleArticle("place")
                        }>
                            <MdPlace/>
                            <p>مکان های پیشنهاد شده به شما</p>
                        </article>
                        <article onClick={
                            () => handleArticle("tour")
                        }>
                            <MdTour/>
                            <p>تور های پیشنهاد شده به شما</p>
                        </article>
                        <article onClick={
                            () => handleArticle("event")
                        }>
                            <BsFillCalendarEventFill/>
                            <p>رویداد های پیشنهاد شده به شما</p>
                        </article>
                    </section>
                </section>
            </Dialog>
            <Dialog className="recieve-suggestion-shared"
                onClose={
                    () => setRecieve(false)
                }
                open={recieve}>
                <section className="recieve-suggestion-shared__container">
                    
                    <section className="backtopreviespage">
                        <IoArrowBackCircleOutline onClick={() =>BackiconHandler()}
                        className="backIcontplistPage"  />
                        <h3>بازگشت به صفحه قبل</h3>
                    </section>
                    {
                    selectedCategory === "place" && (
                        <div> {
                            place.length > 0 ? (place.map((item, index) => (
                                <div className="event-child"
                                    key={index}>
                                    <section className="event-information">
                                        <h4>عنوان مکان : {
                                            item.place_title
                                        }</h4>
                                        <p>کاربر فرستنده : {
                                            item.sender_username
                                        }</p>
                                        <p>متن پشنهادی : {
                                            item.text
                                        }</p>
                                    </section>
                                    <section className="event-buttons">
                                        <Link to={
                                            `places/${
                                                item.place
                                            }`
                                        }>
                                            <button className="event-btn visit">مشاهده مکان</button>
                                        </Link>
                                        <Button onClick={
                                                () => removeSuggestionPlaceHandler(item.place)
                                            }
                                            className="event-btn delete">
                                            حذف مکان از لیست
                                        </Button>
                                    </section>
                                </div>
                            ))) : (
                                <div>
                                    
                                    <p className="noDataFount"><span><TbMoodSad />   </span>لیست پیشنهاد شده به شما خالی است</p>
                                  </div>
                            )
                        } </div>
                    )
                }
                    {
                    selectedCategory === "tour" && (
                        <div> {
                            tours.length > 0 ? (tours.map((item, index) => (
                                <div className="event-child"
                                    key={index}>
                                    <section className="event-information">
                                        <h4>عنوان تور : {
                                            item.tours_title
                                        }</h4>
                                        <p>کاربر فرستنده : {
                                            item.sender_username
                                        }</p>
                                        <p>متن پشنهادی : {
                                            item.text
                                        }</p>
                                    </section>
                                    <section className="event-buttons">
                                        <Link to={
                                            `tours/${
                                                item.tour
                                            }`
                                        }>
                                            <button className="event-btn visit">مشاهده تور</button>
                                        </Link>
                                        <button onClick={
                                                () => removeSuggestionTourHandler(item.tour)
                                            }
                                            className="event-btn delete">
                                            حذف تور از لیست
                                        </button>
                                    </section>
                                </div>
                            ))) : (
                              <div>
                                    
                              <p className="noDataFount"><span><TbMoodSad />   </span>لیست پیشنهاد شده به شما خالی است</p>
                            </div>
                            )
                        } </div>
                    )
                }
                    {
                    selectedCategory === "event" && (
                        <div> {
                            events.length > 0 ? (events.map((item, index) => (
                                <div className="event-child"
                                    key={index}>
                                    <section className="event-information">
                                        <h4>عنوان رویداد : {
                                            item.event_title
                                        }</h4>
                                        <p>کاربر فرستنده : {
                                            item.sender_username
                                        }</p>
                                        <p>متن پشنهادی : {
                                            item.text
                                        }</p>
                                    </section>
                                    <section className="event-buttons">
                                        <Link to={
                                            `events/${
                                                item.event
                                            }`
                                        }>
                                            <button className="event-btn visit">مشاهده رویداد</button>
                                        </Link>
                                        <button onClick={
                                                () => removeSuggestionEventHandler(item.id)
                                            }
                                            className="event-btn delete">
                                            حذف رویداد از لیست
                                        </button>
                                    </section>
                                </div>
                            ))) : (
                                  <div>
                                    
                                    <p className="noDataFount"><span><TbMoodSad />   </span>لیست پیشنهاد شده به شما خالی است</p>
                                  </div>
                            )
                        } </div>
                    )
                } </section>

            </Dialog>
        </div>
    );
}

export default RecieveSuggestionModal;
