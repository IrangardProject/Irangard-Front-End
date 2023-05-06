import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Rating,
    Typography,
} from "@mui/material";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import { Link } from "react-router-dom";


const TourCard = ({tour}) => {

    return (
        <Card
            sx={{
                marginRight:'100px',
                m: 2,
                display: "flex",
                borderRadius: "10px",
                maxWidth: "80%",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                    boxShadow: "0px 0px 30px 0px rgba(0,0,0,0.2)",
                },

                
            }}
        >

            
            <Grid container>
                <Grid>
                    <Link to={`/tours/${tour.id}`} >
                        <CardMedia 
                            component="img"
                            // className={}
                            image={tour.image}
                            alt="tour image"
                        />
                    </Link>
                </Grid>
                <Grid item sm={12} xs={12} md={12} >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:"center",
                            flexDirection: "column",
                        }}
                        elevation={2}
                    >
                        <CardContent
                            sx={{
                                flex: "1 0 auto",
                            }}
                        >
                            <Box
                                sx={{
                                    marginBottom: "10px",
                                }}
                            >
                                <Link to={`/tours/${tour.id}`} >
                                    <Typography
                                        noWrap
                                        component="div"
                                        variant="h7"
                                        sx={{
                                            display:"inline",
                                            wordBreak: "break-word"
                                            // fontSize: "12px",
                                        }}
                                    >
                                        {tour.title}
                                    </Typography>
                                </Link>
                            </Box>
                            <Typography variant="body2" sx={{fontSize:"12px",marginBottom:"10px",display:"flex"}}>
                                <AirportShuttleOutlinedIcon color="primary" sx={{fontSize:"15px"}}/>
                                <span>   ظرفیت تور  </span>{tour.capacity} نفر
                            </Typography>
                            <Typography
                              component="div"
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                fontSize: "12px",
                                display:'-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 1,
                                overflow: "hidden",
                              }}
                              dangerouslySetInnerHTML={{__html: tour.description}}
                            />
                        </CardContent>
                    </Box>
                </Grid>
                <Grid item sm={12} xs={12} md={12} 
                    sx={{
                        display: "flex",
                        justifyContent:"center",
                        padding :'0px 10px 10px 10px'
                    }}>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<KeyboardArrowLeftIcon />}
                        sx={{
                            borderRadius:"10px",
                        }}
                    >
                        <Link to={`/tours/${tour.id}`} style={{textDecoration:"none",color:"white"}}>
                            مشاهده تور
                        </Link>
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
}
 
export default TourCard;