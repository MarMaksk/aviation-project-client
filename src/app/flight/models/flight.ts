export interface Flight {
  regular?: boolean,
  icaoCode?: string,
  flightNumber: string,
  departure?: Date,
  flightTime?: number,
  passengersCount?: number,
  productOrderId?: number,
  ticketPrice?: number,
  iataCodeDeparture?: string,
  iataCodeArrival?: string,
  status?: string,
  flightNumberAltFlight?: string
}
