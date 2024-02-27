
export const timeSince = (date) => {
    //time convertion into seconds
    const second = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

    //time convertion into years
    let interval = second / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + "years";
    }
    //time convertion into months
    interval = second / 2592000;

    if (interval > 1) {
        return Math.floor(interval) + "months";
    }
    //time convertion into days
    interval = second / 86400;

    if (interval > 1) {
        return Math.floor(interval) + "days";
    }
    // time convertion into hours
    interval = second / 3600;

    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    //time convertion into minutes
    interval = (second / 60);

    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }

    return Math.floor(second) + " seconds";
}
