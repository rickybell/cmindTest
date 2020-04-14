/**
 * @class
 * @classdesc It calculates the last point for the Parallelogram definition, the point is 180 degrees as opposed to the second set point.
 * @params {dots:[Point],center:Point} params
 */
const DiscoverLastDot = params => {
    const dots = params.dots;
    const center = params.center;

    /**
     * @name DiscoverLastDot#getLastXandY
     * @description Private method, it performs the calculation of the last point.
     * @return Point
     */
    const getLastXandY = () => {
        let chosenDot = dots[1];
        let newDot = new Point({
            x: (center.x - chosenDot.center.x + center.x).toFixed(2),
            y: (center.y - chosenDot.center.y + center.y).toFixed(2)
        });
        return newDot;
    };

    /**
     * @name DiscoverLastDot#run
     * @description Public method to execute the calculation.
     * @return Point
     */
    const run = () => {
        return getLastXandY();
    };

    return {
        run: run
    };
};
