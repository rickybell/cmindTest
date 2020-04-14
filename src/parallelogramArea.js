/**
 * @class
 * @classdesc  It performs the calculation of the parallelogram area.
 * @param {*} points
 */
const ParallelogramArea = points => {
    /**
     * @name ParallelogramArea#determinant
     * @description Private method, it calculates the determining of the triangle.
     * @param {Point} pA
     * @param {Point} pB
     * @param {Point} pC
     */
    const determinant = (pA, pB, pC) => {
        pA.x = parseInt(pA.x);
        pA.y = parseInt(pA.y);
        pB.x = parseInt(pB.x);
        pB.y = parseInt(pB.y);
        pC.x = parseInt(pC.x);
        pC.y = parseInt(pC.y);
        return (
            pA.x * pB.y * 1 +
            pA.y * 1 * pC.x +
            1 * pB.x * pC.y -
            pA.y * 1 * pC.y -
            pA.x * 1 * pC.y -
            1 * pB.y * pC.x
        );
    };

    /**
     * @name ParallelogramArea#calculate
     * @description Public method to execute the calculation.
     * @return number
     */
    const calculate = () => {
        return parseFloat(
            0.5 * Math.abs(determinant(points[0], points[1], points[2])) +
                0.5 * Math.abs(determinant(points[2], points[3], points[0]))
        ).toFixed(2);
    };

    return {
        calculate: calculate
    };
};
