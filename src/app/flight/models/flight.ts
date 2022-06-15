export interface Flight {
  regular?: boolean,
  iataCode?: string,
  flightNumber: string,
  departure?: Date,
  flightTime?: number,
  passengersCount?: number,
  productOrderId?: number,
  ticketPrice?: number,
  icaoCodeDeparture?: string,
  icaoCodeArrival?: string,
  status?: string,
  flightNumberAltFlight?: string
}
