if (!Array.prototype.immutableDeleteAt) {
    // eslint-disable-next-line
    Array.prototype.immutableDeleteAt = function(index) {
        let newArray = this.slice();
        newArray.splice(index, 1);
        return newArray;
    };
}

export default Array.prototype.immutableDeleteAt;