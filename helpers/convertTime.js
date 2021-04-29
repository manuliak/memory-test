export default function convertTime (millis) {
    const hours = Math.floor(millis / (1000 * 60 * 60));
    const minutes = Math.floor(millis / 60000);
    // var seconds = ((millis % 60000) / 1000).toFixed(0);
    const seconds = ((millis % 60000) / 1000);

    return `${hours > 0 ? `${hours} h  ` : ""}${
        minutes > 0 ? `${minutes} min  ` : ""
    }${seconds} sec`;
};
