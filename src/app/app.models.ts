export interface BikeStationsJson {
  features: [{
    geometry: {
      coordinates,
      type,
    },
    id,
    type,
    distance: 0,
    properties: {
      free_racks,
      bikes,
      label,
      bike_racks,
      updated
    }
  }];
  crs: {
    type,
    properties: {
      code
    }
  };
  type;
}
