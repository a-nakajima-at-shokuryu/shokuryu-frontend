import React, { useEffect } from 'react';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import ja from 'date-fns/locale/ja'; 
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import { blue, green, pink } from '@material-ui/core/colors';
import { getDay, isSameDay } from 'date-fns';

const useStyles = makeStyles(theme => ({
  root: {}, 
}));

const primaryColor = blue[700];
const sundayColor = pink[500];
const saturdayColor = green[700];

const getWeekColor = (day, fallbackColor) => {
  const colors = {
    0: sundayColor, 
    6: saturdayColor, 
  };
  return colors[day] || fallbackColor;
};

const useCalendarTheme = ({ date, weekStartsOn }) => {
  // 曜日ごとの色（平日はprimaryColor）
  const day = getDay(date);
  const toolbarColor = getWeekColor(day, primaryColor);
  // 日曜日と土曜日の位置
  const sundayPos = (0 - weekStartsOn + 7) % 7;
  const saturdayPos = (6 - weekStartsOn + 7) % 7;

  return createMuiTheme({
    typography: { fontSize: 12, }, 
    mixins: { toolbar: { minWidth: 36 }, }, 
    palette: { primary: { main: toolbarColor }, }, 
    overrides: {
      // 年月ツールバーの高さ
      MuiPickersToolbar: {
        toolbar: {
          height: 60, 
        }, 
      }, 
      // 年、月ツールバーのフォントサイズ
      MuiTypography: {
        h4: {
          fontSize: '1.5rem', 
        },  
      }, 
      // 曜日ラベルの色
      MuiPickersCalendarHeader: {
        dayLabel: {
          fontSize: 12, 
          fontWeight: 700, 
          [`&:nth-child(${sundayPos + 1})`]: { color: sundayColor }, 
          [`&:nth-child(${saturdayPos + 1})`]: { color: saturdayColor }, 
        }, 
      }, 
    }, 
  });
};

// 日付描画関数
const renderDay = (date, selectedDate, dayInCurrentMonth, dayComponent) => {
  const selected = isSameDay(date, selectedDate);
  return React.cloneElement(dayComponent, {
    style: {
      color: selected ? undefined : getWeekColor(getDay(date)), 
    }, 
  }); 
};

const DatePicker = ({
  className, 
  weekStartsOn = 0, // 何曜日始まり？
  ...other 
}) => {
  const classes = useStyles();

  const theme = useCalendarTheme({
    date: other.value, 
    weekStartsOn, 
  });

  // 何曜日始まりなのかを反映
  useEffect(() => {
    ja.options.weekStartsOn = weekStartsOn;
  }, [weekStartsOn]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}　locale={ja}>
      <MuiThemeProvider theme={theme}>
        <KeyboardDatePicker 
          margin="none"
          format="yyyy-MM-dd"
          variant="inline"
          autoOk

          renderDay={renderDay}

          className={clsx(classes.root, className)}
          {...other}
        />
      </MuiThemeProvider>
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker
