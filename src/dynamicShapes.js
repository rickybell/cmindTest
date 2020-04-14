/**
 * @class
 * @classdesc This class brings together calculations of project business forms and rules.
 */
class DynamicShapes {
    /**
     * @constructs
     * @description Initialize the variables "dots".
     * @param {Array<Point>} dots
     */
    constructor(dots) {
        this.dots = dots;
    }

    /**
     * @name DynamicShapes#addCanvas
     * @description Public method that allows element canvas for application of class business rules.
     * @params {HtmlCanvas Element} canvas.
     */
    addCanvas = canvas => {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    };

    /**
     * @name DynamicShapes#reset
     * @description Public method, clean the Dots variable main shapes of class Parallelogram and Circle, return the clean Dots.
     * @returns {Array}
     */
    reset = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.parallelogram = undefined;
        this.circle = undefined;
        this.dots = [];
        return this.dots;
    };

    /**
     * @name DynamicShapes#addPoint
     * @description Public method, add a new point
     */
    addPoint = e => {
        if (this.dots.length < 3) {
            let rect = this.canvas.getBoundingClientRect();
            let x = e.clientX - rect.left,
                y = e.clientY - rect.top;
            const dot = new Shape.dot.draw({
                ctx: this.ctx,
                center: new Point({ x, y }),
                rad: 5.5,
                color: Colors.RED,
                order: this.dots.length + 1
            });
            this.dots.push(dot);
        }
        this.drawShapes();
    };

    /**
     * @name DynamicShapes#reDraw
     * @description Public method, it resets the position of a received point if its coordinates are changed, then redraws the existing shapes.
     */
    reDraw = dot => {
        const index = this.dots.filter(item => item.order === dot.order);
        const dotsTemp = this.dots;
        this.dots = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        dotsTemp.forEach((item, i) => {
            if (i < 3) {
                let center = i === index ? dot.conter : item.center;
                this.dots.push(
                    new Shape.dot.draw({
                        ctx: this.ctx,
                        center: center,
                        rad: 5.5,
                        color: Colors.RED,
                        order: this.dots.length
                    })
                );
            }
        });
        this.drawShapes();
    };

    /**
     * @name DynamicShapes#drawShapes
     * @description Public method, draws shapes whenever necessary and there are the necessary three points.
     */
    drawShapes = () => {
        if (this.dots.length === 3) {
            this.circle = this.drawCircle();
            this.dots.push(
                new Shape.dot.draw({
                    ctx: this.ctx,
                    center: DiscoverLastDot({
                        dots: this.dots,
                        center: this.circle.center
                    }).run(),
                    rad: 5.5,
                    color: Colors.RED,
                    order: this.dots.length + 1
                })
            );
            this.parallelogram = new Shape.parallelogram.draw({
                ctx: this.ctx,
                dots: this.dots,
                color: Colors.BLUE
            });
        }
    };

    /**
     * @name DynamicShapes#drawCircle
     * @description Public method, draw the circle.
     */
    drawCircle = () => {
        const CCpointAndRay = CircumCenter(this.dots).find();
        let x = new Shape.dot.draw({
            ctx: this.ctx,
            center: CCpointAndRay.center,
            rad: 5.5,
            color: Colors.RED,
            x: CCpointAndRay.center.x,
            y: CCpointAndRay.center.y
        });
        return new Shape.circle.draw({
            ctx: this.ctx,
            center: CCpointAndRay.center,
            rad: CCpointAndRay.rad,
            color: Colors.YELLOW,
            x: CCpointAndRay.center.x,
            y: CCpointAndRay.center.y
        });
    };

    /**
     * @name DynamicShapes#drawParallelogram
     * @description Public method, draw the parallelogram
     */
    drawParallelogram = () => {
        if (!this.circle) {
            this.circle;
        }
    };
}
