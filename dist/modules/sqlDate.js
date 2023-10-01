/*
Function to get SQL Format date
and also to check if a time is eligible or not
*/

module.exports = {
    getSQLDate: () => {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        if (month.toString().length == 1) {
            month = "0" + month;
        }
        if (day.toString().length == 1) {
            day = "0" + day;
        }
        if (hours.toString().length == 1) {
            hours = "0" + hours;
        }
        if (minutes.toString().length == 1) {
            minutes = "0" + minutes;
        }
        if (seconds.toString().length == 1) {
            seconds = "0" + seconds;
        }
        let dateTime = year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + seconds;
        return dateTime;
    },
    getDateOnly: () => {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let today = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        return today;
    },
    eligibleTime: () => {
        let currentTime = new Date().getHours();
        const startTime = parseInt(process.env.START_TIME);
        const endTime = parseInt(process.env.END_TIME);

        if (currentTime >= startTime && currentTime < endTime){
            return true;
        }
        else{
            return false;
        }
    }
}