import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export const formatarData = (data: Date | string) => {
  return dayjs(data).locale("pt-br").format("DD/MM/YYYY");
};
