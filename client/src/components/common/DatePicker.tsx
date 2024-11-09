import { DatePicker as AntdDatePicker } from "antd";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

//DatePicker 사용시 끌어올 곳
const DatePicker = AntdDatePicker.generatePicker<Date>(dateFnsGenerateConfig);

export default DatePicker;
