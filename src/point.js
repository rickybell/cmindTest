/**
 * @class
 * @classdesc Class representing a point.
 */
class Point {
    /**
     * @constructs
     * @param {Object} {x:0,y:0} - The value x and y of point.
     */
    constructor(params) {
        this.x = params.x;
        this.y = params.y;
    }
    /**
     * @name Point#toString
     * @description Format the Point print.
     * @return string
     */
    toString() {
        return `x:${parseFloat(this.x).toFixed(2) || 0.0} y: ${parseFloat(
            this.y
        ).toFixed(2) || 0.0}`;
    }
}
