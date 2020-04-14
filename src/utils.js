/**
 * @module Utils
 * @description Module containing variables and methods that help the interface define the points and their movements.
 */
var Utils = {
    /** Global points */
    dots: [],

    /** Dot when it's dragged */
    dragHandle: {},
    /** A dot after calculating new coordinates. */
    offset: {},
    /**  @name Utils#distanceXY, @description - It calculates the distance between two points, @return number. */
    distanceXY: (x0, y0, x1, y1) => {
        const dx = x1 - x0,
            dy = y1 - y0;
        return Math.sqrt(dx * dx + dy * dy);
    },
    /** @name Utils#circlePointCollision, @description - It checks if one point collides with another point, @return boolean. */
    circlePointCollision: (x, y, circle) => {
        return (
            Utils.distanceXY(x, y, circle.center.x, circle.center.y) <
            circle.rad
        );
    }
};
