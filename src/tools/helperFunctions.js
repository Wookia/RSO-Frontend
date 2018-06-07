if (!Array.prototype.immutableDeleteAt) {
    // eslint-disable-next-line
    Array.prototype.immutableDeleteAt = function(index) {
        let newArray = this.slice();
        newArray.splice(index, 1);
        return newArray;
    };
}

export default Array.prototype.immutableDeleteAt;

export function nextOrderState (state) {
    switch (state) {
        case "start":
            return "ordering";
        case "ordering":
            return "kitchen";
        case "kitchen":
            return "ready-to-deliver";
        case "ready-to-deliver":
            return "finished";
        default: 
            return state;
    }
}