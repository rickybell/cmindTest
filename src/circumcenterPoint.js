/**
 * @class
 * @classdesc This is class defines the center of CircumCenter and your features like Radius and Center.
 * @param {Array<Point>} params
 */
const CircumCenter = params => {
    // Points
    const P = params[0].center,
        Q = params[1].center,
        R = params[2].center;

    // Calculates references, all are numbers.
    let a, b, c, e, f, g;

    /**
     * @name CircumCenter#lineFromPoints
     * @description Private method, it calculates the size from point pP and point pQ, defines refenrences a, b, c
     * @param {Number} pP - First Point
     * @param {Number} pQ - Second Point
     * @return {Object} { a:nubmer, b:number, c:number}
     */
    const lineFromPoints = (pP, pQ) => {
        return {
            a: pQ.y - pP.y,
            b: pP.x - pQ.x,
            c: a * pP.x + b * pP.y
        };
    };

    /**
     * @name CircumCenter#perpendicularBisectorFromLine
     * @description Private method, it calculates the perpendicular Bisector From Line
     * @param {Point} pP - First point.
     * @param {Point} pQ - Second point.
     * @param {Number} pa - Reference a
     * @param {Number} pb - Reference b.
     * @return {Object} { a:nubmer, b:number, c:number}
     */
    const perpendicularBisectorFromLine = (pP, pQ, pa, pb) => {
        let mid_point = {
            x: (pP.x + pQ.x) / 2,
            y: (pP.y + pQ.y) / 2
        };
        let temp = pa;
        return {
            a: pb * -1,
            b: temp,
            c: pb * -1 * mid_point.x + pa * mid_point.y
        };
    };

    /**
     * @name CircumCenter#lineLineIntersection
     * @description Private method, to define when occurring line intersection.
     * @param {Number} a1 - reference of point a1
     * @param {Number} b1 - reference of point b1
     * @param {Number} c1 - reference of point c1
     * @param {Number} a2 - reference of point a2
     * @param {Number} b2 - reference of point b2
     * @param {Number} c2 - reference of point c2
     * @return {Object} { x:nubmer, b:number }
     */
    const lineLineIntersection = (a1, b1, c1, a2, b2, c2) => {
        const deter = a1 * b2 - a2 * b1;
        return deter === 0
            ? { x: 1000, y: 1000 }
            : {
                  x: (b2 * c1 - b1 * c2) / deter,
                  y: (a1 * c2 - a2 * c1) / deter
              };
    };

    /**
     * @name CircumCenter#find
     * @description Public method, it performs the full calculation of the Circumcircle
     * @return { Object } { center:Point, rad:number }
     */
    const find = () => {
        let tempPQ = lineFromPoints(P, Q);
        let tempQR = lineFromPoints(Q, R);
        a = tempPQ.a;
        b = tempPQ.b;
        c = tempPQ.c;
        e = tempQR.a;
        f = tempQR.b;
        g = tempQR.c;
        tempPQ = perpendicularBisectorFromLine(P, Q, a, b);
        tempQR = perpendicularBisectorFromLine(Q, R, e, f);
        a = tempPQ.a;
        b = tempPQ.b;
        c = tempPQ.c;
        e = tempQR.a;
        f = tempQR.b;
        g = tempQR.c;
        const center = new Point(lineLineIntersection(a, b, c, e, f, g));
        const rad = getRad(center, P);
        return { center, rad };
    };
    /**
     * @name CircumCenter#getRad
     * @description Private method, it calculates the radius of the circle
     * @param {Point} pCcp
     * @param {Point} pP
     * @return number
     */
    const getRad = (pCcp, pP) => {
        return Math.sqrt(
            Math.pow(pCcp.x - pP.x, 2) + Math.pow(pP.y - pCcp.y, 2)
        ).toFixed(2);
    };

    return {
        find: find
    };
};
