export interface BikeStationsJson {
  features: [{
    geometry: {
      coordinates,
      type,
    },
    id,
    type,
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
