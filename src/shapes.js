/**
 * @module Shape
 * @description 1. Module that brings together the geometric shapes used in the project;
 * 2. All method has Draw and Area;
 * 3. Th name of shapes is self-description.
 * All method has the methods:
 * - "draw" - method that draw the shape, it returns the own object;
 * - "area" - it calculates the shape's area, it returns number.
 */
var Shape = {
    line: {
        params: {},
        draw: function(params) {
            this.params = params;
            this.params.ctx.beginPath();
            this.params.ctx.moveTo(this.params.start.x, this.params.start.y);
            this.params.ctx.lineTo(this.params.end.x, this.params.end.y);
            this.params.ctx.stroke();
            return this;
        },

        area: () => {
            return this.params;
        }
    },
    /*
     * // @method shape#square
     */
    square: {
        params: {},
        draw: function(params) {
            this.params = params;
            this.params.ctx.strokeStyle = this.params.color;
            this.params.ctx.strokeRect(
                this.params.start.x,
                this.params.start.y,
                this.params.width,
                this.params.height
            );
        },
        area: () => {
            return this.params;
        }
    },
    // @name Shape#triangle
    triangle: {
        params: {},
        draw: function(params) {
            this.params = params;
            this.params.ctx.beginPath();
            this.params.ctx.moveTo(this.params.a.x, this.params.a.y);
            this.params.ctx.lineTo(this.params.b.x, this.params.b.y);
            this.params.ctx.lineTo(this.params.c.x, this.params.c.y);
            this.params.ctx.closePath();
            this.params.ctx.strokeStyle = this.params.color;
            this.params.ctx.stroke();
            return this;
        },
        area: () => {
            return this.params;
        }
    },
    // @name Shape#circle
    circle: {
        center: null,
        rad: 0,
        params: {},
        description: {},
        x: 0,
        y: 0,
        draw: function(params) {
            this.params = params;
            this.params.ctx.beginPath();
            this.center = this.params.center;
            this.x = this.center.x;
            this.y = this.center.y;
            this.rad = this.params.rad;
            this.area = parseFloat(Math.PI * Math.pow(this.rad, 2)).toFixed(2);
            this.params.ctx.arc(
                this.params.center.x,
                this.params.center.y,
                this.params.rad,
                0,
                2 * Math.PI
            );
            this.params.ctx.strokeStyle = this.params.color;
            this.params.ctx.stroke();
            this.description = {
                center: `x:${parseFloat(this.center.x).toFixed(2) ||
                    0.0} y: ${parseFloat(this.center.y).toFixed(2) || 0.0}`,
                rad: `${this.rad}`,
                area: `${this.area}`
            };
            return this;
        },
        area: () => {
            return this.params;
        }
    },
    // @name Shape#dot
    dot: {
        center: null,
        params: {},
        rad: 0,
        order: 0,
        x: 0,
        y: 0,
        draw: function(params) {
            this.params = params;
            this.params.ctx.beginPath();
            this.center = this.params.center;
            this.x = this.center.x;
            this.y = this.center.y;
            this.order = this.params.order;
            this.rad = this.params.rad || 5.5;
            this.params.ctx.arc(
                this.params.center.x,
                this.params.center.y,
                this.params.rad,
                0,
                2 * Math.PI
            );
            this.params.ctx.strokeStyle = this.params.color || Colors.RED;
            this.params.ctx.fillStyle = this.params.color || Colors.RED;
            this.params.ctx.fill();
            return this;
        }
    },
    // @name Shape#parallelogram
    parallelogram: {
        params: {},
        draw: function(params) {
            this.params = params;
            this.params.ctx.beginPath();
            this.dots = params.dots;
            for (let i = 1; i < this.dots.length; i++) {
                this.params.ctx.moveTo(
                    this.dots[i - 1].center.x,
                    this.dots[i - 1].center.y
                );
                this.params.ctx.lineTo(
                    this.dots[i].center.x,
                    this.dots[i].center.y
                );
                this.params.ctx.stroke();
            }
            this.params.ctx.moveTo(
                this.dots[this.dots.length - 1].center.x,
                this.dots[this.dots.length - 1].center.y
            );
            this.params.ctx.lineTo(
                this.dots[0].center.x,
                this.dots[0].center.y
            );
            this.params.ctx.stroke();
            this.params.ctx.strokeStyle = this.params.color;
            this.params.ctx.stroke();
            this.buildDesc = (dot1, dot2) => {
                return `${dot1.name}-${dot2.name} => ${
                    dot1.name
                }:${dot1.value.center.toString()} - ${
                    dot2.name
                }: ${dot2.value.center.toString()} size: ${parseFloat(
                    Utils.distanceXY(
                        dot1.value.center.x,
                        dot1.value.center.y,
                        dot2.value.center.x,
                        dot2.value.center.y
                    )
                ).toFixed(2)}`;
            };
            this.pArea = ParallelogramArea(this.dots).calculate();
            this.description = {
                side_ab: this.buildDesc(
                    { name: "a", value: this.dots[0] },
                    { name: "b", value: this.dots[1] }
                ),
                side_bc: this.buildDesc(
                    { name: "b", value: this.dots[1] },
                    { name: "c", value: this.dots[2] }
                ),
                side_cd: this.buildDesc(
                    { name: "c", value: this.dots[2] },
                    { name: "d", value: this.dots[3] }
                ),
                side_da: this.buildDesc(
                    { name: "d", value: this.dots[3] },
                    { name: "a", value: this.dots[0] }
                ),
                area: `area: ${this.pArea}`
            };

            return this;
        },
        area: function() {
            return this.pArea;
        }
    }
};
