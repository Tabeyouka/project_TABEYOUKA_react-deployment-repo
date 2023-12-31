  import { Container, Typography, Box, Button, useTheme, useMediaQuery } from "@mui/material";
  import ModalButton from "../components/common/button/ModalButton";
  import {
    LocationOnOutlined,
    DiningOutlined,
    Search
  } from "@mui/icons-material";
  import useToggle from "../hooks/useToggle";
  import {
    LocationModal,
    CategoryModal,
    RestaurantModal,
  } from "../components/ui/modal";
  import { useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  import {  useSnackbar } from "notistack";
  import InfoFooter from "../components/common/InfoFooter";
  function MainPage() {
    const theme = useTheme();
    const isDownMD = useMediaQuery(theme.breakpoints.down("md"));

    const { setTrue: locationModalOpen, ...locationModalProps } = useToggle();
    const { setTrue: restaurantModalOpen, ...restaurantModalProps } = useToggle();
    const { setTrue: categoryModalOpen, ...categoryModalProps } = useToggle();
    
    const navigate = useNavigate();
    
    const [locationCode, setLocationCode] = useState<string>("");
    const [categoryCode, setCategoryCode] = useState<string>("");
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);

    const [location, setLocation] = useState<string>("エリア");
    const [category, setCategory] = useState<string>("料理ジャンル");
    const [restaurant, setRestaurant] = useState<string>("レストラン名");

    const searchButtonHandler = () => {
      if (location === "エリア" && category === "料理ジャンル" && restaurant === "レストラン名") {
        return enqueueSnackbar("検索条件を入力してください", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
      let restaurantValue = restaurant;
      if (restaurantValue == "レストラン名") {
        restaurantValue = "";
      }
      let latValue : string = lat.toString();
      let lngValue : string = lng.toString();
      if (lat === 0) {
        latValue = "";
        lngValue = "";
      }
      const params = {
        genre: `${categoryCode}`,
        area: `${locationCode}`,
        name: `${restaurantValue}`,
        lat: `${latValue}`,
        lng: `${lngValue}`,
      };
      console.log(params);
      const queryString = new URLSearchParams(params).toString();
      navigate(`/search?${queryString}`);
    };

    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
      locationModalProps.setFalse();
      categoryModalProps.setFalse();
      restaurantModalProps.setFalse();
    }, [location, category, restaurant]);

    return (
      <>
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: "0 !important",
            backgroundImage: `url(${"https://www.exploretravel.com.au/images/transform/v1/crop/frm/130854433/1b6a6656-f316-4d72-ba10-2067288e49b7.jpg/r0_138_2700_1662_w1200_h678_fmax.jpg"})`,
            height: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
          }}
        >
          <Typography
            color={"white"}
            sx={{ fontWeight: "bold", textAlign: "center", my: 2, fontSize : isDownMD ? "27px" : "48px", textShadow: "1px 1px 1px black" }}
          >
            行きたいお店を見つけてみよう！
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "200px",
              display: "flex",
              p : 1,
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                width: isDownMD ? "90%" : "40%",
                height: isDownMD ? "80%" : "100%",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                borderRadius: "10px",
                display: "flex",
                p: 1,
              }}
            >
              <Box
                sx={{
                  width: isDownMD ? "60%" : "90%",
                  display: "flex",
                  justifyContent: "center",
                  ml: 1,
                  flexDirection: "column",
                }}
              >
                <Box sx={{ width: "100%", height: isDownMD ? "40%" : "inherit", display: "flex" }}>
                  {/* Location Modal Button*/}
                  <ModalButton
                    title={location}
                    Icon={LocationOnOutlined}
                    iconColor={"green"}
                    handleOpen={locationModalOpen}
                  />
                  <LocationModal
                    {...locationModalProps}
                    setLocation={setLocation}
                    setLocationCode={setLocationCode}
                    setLat={setLat}
                    setLng={setLng}
                  />
                  
                </Box>
                <Box
                  sx={{ width: "100%", height: isDownMD ? "40%" : "inherit", display: "flex" }}
                >
                  {/* Category Modal Button*/}
                  <ModalButton
                    title={category}
                    Icon={DiningOutlined}
                    iconColor={"orange"}
                    handleOpen={categoryModalOpen}
                  />
                  <CategoryModal
                    {...categoryModalProps}
                    setCategory={setCategory}
                    setCategoryCode={setCategoryCode}
                  />
                </Box>
                <Box
                  sx={{ width: "100%", height: isDownMD ? "40%" : "inherit", display: "flex" }}
                >
                  {/* Restaurant Modal Button */}
                  <ModalButton
                    title={restaurant}
                    Icon={Search}
                    iconColor={"#99DBF5"}
                    handleOpen={restaurantModalOpen}
                  />
                  <RestaurantModal
                    {...restaurantModalProps}
                    setRestaurant={setRestaurant}
                    purpose={"restaurant"}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  width: "30%",
                  display: "flex",
                  borderRadius: "5px",
                  my: 7,
                  mx: 2,
                  bgcolor: "#FFA41B",
                  color: "white",
                  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                  border: "0.5px solid #787A91",
                  "&:hover": {
                    bgcolor: "#FFC107",
                    transition: "all 0.4s ease-in-out",
                  },
                }}
              >
                <Button
                  onClick={searchButtonHandler}
                  sx={{
                    color: "black",
                    mx: 1,
                    flexGrow: 1,
                    py: 1.2,
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="caption" sx={{ fontSize: "18px" }}>
                    検索
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
        <InfoFooter />
      </>
    );
  }

  export default MainPage;
