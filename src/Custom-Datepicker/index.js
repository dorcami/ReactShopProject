import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import InputMask from "react-input-mask";

const CustomDatePicker = (props) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return (
    <>
      <DatePicker
        customInput={<InputMask type="text" mask="99/99/9999" />}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        }) => (
          <div className="input-group input-group-sm input-group-calender">
            <div className="input-group-prepend">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  decreaseMonth();
                }}
                disabled={prevMonthButtonDisabled}
                className="btn btn-outline-secondary"
                type="button"
              >
                {"<"}
              </button>
            </div>

            <input
              type="number"
              onChange={({ target: { value } }) => changeYear(value)}
              value={date.getFullYear()}
              className="form-control"
              placeholder=""
              aria-label=""
              aria-describedby="basic-addon1"
            />
            <select
              className="form-control"
              value={months[date.getMonth()]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="input-group-append">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  increaseMonth();
                }}
                className="btn btn-outline-secondary"
                disabled={nextMonthButtonDisabled}
              >
                {">"}
              </button>
            </div>
          </div>
        )}
        wrapperClassName={props.wrapperClassName}
        className="form-control"
        dateFormat="dd/MM/yyyy"
        minDate={false}
        selected={props.selected}
        onChange={props.onChange}
      />
    </>
  );
};

export default CustomDatePicker;
