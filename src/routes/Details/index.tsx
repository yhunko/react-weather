import { Refresh } from "@mui/icons-material";
import AirIcon from "@mui/icons-material/Air";
import CompressIcon from "@mui/icons-material/Compress";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import fromUnixTime from "date-fns/fromUnixTime";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchWeatherDataByCityId } from "src/routes/Index/weatherThunks";
import { useAppDispatch, useAppSelector } from "src/store";

type StatInfoProps = {
  Icon: typeof SvgIcon;
  title: string;
  // eslint-disable-next-line react/require-default-props
  label?: React.ReactNode;
};

const StatInfo: React.FC<StatInfoProps> = ({ label, title, Icon }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      rowGap: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Tooltip title={title} placement="top">
      <div>
        <Icon sx={{ fontSize: 72, color: "primary.main" }} />
      </div>
    </Tooltip>
    <div>{label}</div>
  </Box>
);

const DetailsRoute: React.FC = () => {
  const dispatch = useAppDispatch();

  const { cityId } = useParams<{ cityId: string }>();
  const cityData = useAppSelector((state) =>
    state.weather.weatherData.find(({ id }) => id.toString() === cityId)
  );
  const cityImage = useAppSelector((state) =>
    cityId ? state.weather.citiesImages[parseInt(cityId, 10)] : undefined
  );

  return (
    <Card>
      <CardMedia
        component="img"
        height="340"
        image={cityImage}
        alt="city image"
      />

      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5" component="div">
              {cityData?.name}
            </Typography>
            {cityData?.dt && (
              <Typography variant="caption">
                last updated:{" "}
                {formatDistanceToNow(fromUnixTime(cityData.dt), {
                  addSuffix: true,
                })}
              </Typography>
            )}
          </Box>

          <IconButton
            size="large"
            onClick={() => {
              if (cityId) {
                dispatch(fetchWeatherDataByCityId(parseInt(cityId, 10)));
              }
            }}
          >
            <Refresh />
          </IconButton>
        </Box>

        <Box my={4} />

        <Grid container spacing={2}>
          <Grid item md={3}>
            <StatInfo
              title="Temperature"
              label={<>{cityData?.main?.temp}&deg;C</>}
              Icon={ThermostatIcon}
            />
          </Grid>
          <Grid item md={3}>
            <StatInfo
              title="Wind speed"
              Icon={AirIcon}
              label={`${cityData?.wind?.speed} meter/sec`}
            />
          </Grid>
          <Grid item md={3}>
            <StatInfo
              title="Visibility"
              Icon={VisibilityIcon}
              label={`${cityData?.visibility} meters`}
            />
          </Grid>
          <Grid item md={3}>
            <StatInfo
              title="Pressure"
              Icon={CompressIcon}
              label={`${cityData?.main?.pressure} hPa`}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailsRoute;
