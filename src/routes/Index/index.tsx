import SearchIcon from "@mui/icons-material/Search";
import { Masonry } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Container,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import fromUnixTime from "date-fns/fromUnixTime";
import React from "react";
import { Link } from "react-router-dom";
import CardHeaderActions from "src/routes/Index/components/CardHeaderActions";
import weatherSlice from "src/routes/Index/weatherSlice";
import {
  fetchWeatherDataByCityId,
  fetchWeatherDataByCityName,
} from "src/routes/Index/weatherThunks";
import { useAppDispatch, useAppSelector } from "src/store";

const IndexRoute: React.FC = () => {
  const searchCity = useAppSelector((state) => state.weather.searchCity);
  const weatherData = useAppSelector((state) => state.weather.weatherData);
  const citiesImages = useAppSelector((state) => state.weather.citiesImages);

  const dispatch = useAppDispatch();

  const handleAddCity = () => {
    dispatch(fetchWeatherDataByCityName(searchCity));
  };

  const handleCityWeatherDataRefresh = (id: number) => {
    dispatch(fetchWeatherDataByCityId(id));
  };

  const handleCityDelete = (id: number) => {
    dispatch(weatherSlice.actions.deleteCity(id));
  };

  return (
    <>
      <Container maxWidth="sm">
        <Stack direction="row" alignItems="center" spacing={1}>
          <TextField
            label="City name"
            placeholder="Input city name..."
            helperText="You can use Enter to submit"
            value={searchCity}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleAddCity();
              }
            }}
            onChange={({ target: { value } }) => {
              dispatch(weatherSlice.actions.setCitySearch(value));
            }}
            fullWidth
          />

          <IconButton edge="end" onClick={handleAddCity}>
            <SearchIcon />
          </IconButton>
        </Stack>
      </Container>

      <Box my={2} />

      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {weatherData.map((item) => (
          <Card key={item.id}>
            <CardHeader
              avatar={
                <Avatar
                  src={`https://openweathermap.org/img/wn/${item.weather?.[0]?.icon}@2x.png`}
                >
                  Weather Icon
                </Avatar>
              }
              title={item.name}
              subheader={`Updated ${formatDistanceToNow(fromUnixTime(item.dt), {
                addSuffix: true,
              })}`}
              action={
                <CardHeaderActions
                  id={item.id}
                  onRefresh={handleCityWeatherDataRefresh}
                  onDelete={handleCityDelete}
                />
              }
            />
            <CardMedia
              component="img"
              height="194"
              image={citiesImages[item.id]}
              alt="City image"
            />
            <CardActions>
              <Button size="small" component={Link} to={`/details/${item.id}`}>
                Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </Masonry>
    </>
  );
};

export default IndexRoute;
