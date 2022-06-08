import {Airplane} from "./airplane";

export interface Flight {
  regular: boolean,
  iataCode: string,
  flightNumber: number,
  departure: Date,
  flightTime: number,
  passengersCount: number,
  productOrderId?: number,
  ticketPrice: number,
  icaoCodeDeparture: string,
  icaoCodeArrival: string,
  status?: string
}
