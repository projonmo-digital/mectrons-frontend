export const useDateTime = () => {
  // Pretty much every browser;
  // 12:00 Am
  function formatHM(date){
    const dateToday = new Date(date);

    let hr = [dateToday.getHours()% 12 || 12];
    let min = [dateToday.getMinutes()];
    
    var amPm;
    if (hr > 12){
      amPm = "AM"
    } else {
      amPm = "PM"
    }
    
    return hr + ":" + min + " " + amPm;
  }

  function TimeFormat(date){
    const dateToday = new Date(date);

    let hr = [dateToday.getHours()% 12 || 12];
    let min = [dateToday.getMinutes()];
    let sec = [dateToday.getSeconds()];
    
    var amPm;
    if (hr > 12){
      amPm = "AM"
    } else {
      amPm = "PM"
    }
    
    return hr + ":" + min + ":" + sec + " " + amPm;
  }



  const DayTimeFormat = (date) => {
      const dateToday = new Date(date);
      const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
      
      let day = weekDay[dateToday.getDay()];
      let hr = [dateToday.getHours()% 12 || 12];
      let min = [dateToday.getMinutes()];
      let sec = [dateToday.getSeconds()];
      
      var amPm;
      if (hr > 12){
        amPm = "AM"
      } else {
        amPm = "PM"
      }
      
      return day + " " +hr + ":" + min + ":" + sec + " " + amPm;
  }

  


  // Pretty much every browser;
  // 2 Mar 2024
  function formatCompat(date) {
    const createdAt = new Date(date);
    var ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return createdAt.getDate() + ' ' + ms[createdAt.getMonth()] + ' ' + createdAt.getFullYear();
  }

  // Pretty much every browser;
  // March 2, 2024
  function formatMDY(date) {
    const createdAt = new Date(date);
    var ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return ms[createdAt.getMonth()] + ' ' +createdAt.getDate() + ', ' + createdAt.getFullYear();
  }


  function timeSincePosted(date){
    const createdAt = new Date(date);
    const now = new Date();
    const elapsedMilliseconds = now - createdAt;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);

    if (elapsedDays > 0) {
    return `${elapsedDays} day${elapsedDays > 1 ? 's' : ''} ago`;
    } else if (elapsedHours > 0) {
    return `${elapsedHours} hour${elapsedHours > 1 ? 's' : ''} ago`;
    } else if (elapsedMinutes > 0) {
    return `${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''} ago`;
    } else {
    return 'Just now';
    }    
  }



  return { formatHM, TimeFormat, DayTimeFormat, formatCompat, formatMDY, timeSincePosted }
}