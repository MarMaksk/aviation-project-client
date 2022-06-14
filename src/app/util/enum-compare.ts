import {DeliveryStatus} from "./enums/delivery-status";
import {enumValues} from "./enum-values";

export function enumCompare(val: string): string | any {
  switch (val) {
    case "CREATED":
      return "Создана";
    case "PROCESSED":
      return "Обрабатывается";
    case "IN_PROGRESS":
      return "В процессе";
    case "FINISHED":
      return "Завершена";
    case "CANCELLATION":
      return "Отменена";
    case "EXPIRED":
      return "Просрочена";
  }
}
