import { Box, ButtonBase } from "@mui/material";
import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const mapStyle = {
  width: "100%",
  height: "80%",
}

interface mapProps {
  userId : string,
}
const Map = ({userId} : mapProps) => {
  const center = useMemo(() => ({lat: 36.2048, lng: 138.2529}), []);
  const [restaurant, setRestaurant] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState({
    id: '',
    name : '',
    image : '',
    lat: 0,
    lng: 0
  });

  const navigate = useNavigate();

  const restaurantPage = (id : string) => {
    navigate(`/store?id=${id}`);
  }

  useEffect(()=> {
    axios.get(`http://localhost:8000/api/map`, {
      headers : {
        Authorization : window.localStorage.getItem('access_token')
      },
      params: {
        user_id : userId,
      }   
    })
    .then(response => {
      setRestaurant(response.data);
    })
    .catch(error => {
      console.error(error);
    })
  }, [userId])

  return (
    // lat 위도 lng 경도
    <>
      <GoogleMap zoom={7} center={center} mapContainerStyle={mapStyle}>
        {restaurant.map((data, index) => (
          <MarkerF key={index} title={data['id']} position={{lat: data['lat'], lng: data['lng']}} onClick={() => {
            setSelectedMarker({
            id : data['id'],
            name : data['name'],
            image : data['logo_image'],
            lat : data['lat'],
            lng : data['lng'],
          });
          }} />
        ))};
        {/* 0이 아닐 때만 출력 */}
        {selectedMarker.lat !== 0 && selectedMarker.lng !== 0 && (
          <InfoWindowF
            position={selectedMarker}
            onCloseClick={() => {
              setSelectedMarker({id: '', name : '', image: '', lat: 0, lng: 0 });
            }}
          >
            <ButtonBase onClick={() => restaurantPage(selectedMarker.id)}>
              <Box sx={{ alignItems: "center", justifyContent: "space-evenly", display: "flex", flexDirection: "row", width : "300px"}}>
                <img style={{ maxWidth: "30%", paddingRight: "4px"}} src={selectedMarker['image']} alt="食堂イメージ" />
                <h5 style={{textAlign: "center"}}>{selectedMarker['name']}</h5>
              </Box>
            </ButtonBase>
          </InfoWindowF>
        )}
      </GoogleMap>

    </>
    
  )
}

export default Map;