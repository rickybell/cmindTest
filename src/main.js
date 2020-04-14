/**
 * @file
 * @description Manages the events, shapes, and information that are presented on the project front end. Here is declared the events from front-end as well.
 * @author Henrique Bock Belloube
 *
 */

// DM - Create and starts the DynamicShapes Class
// canvas - Element that allows the design of the shapes of the project
var DM = new DynamicShapes(Utils.dots),
    canvas = null;

/**
 *  Definições dos eventos e inicializações dos elementos que preenchem a interface.
 */
window.addEventListener("load", event => {
    document.body.setAttribute(
        "style",
        "font-family: Verdana,Geneva,sans-serif;"
    );
    createCanvas();

    // createButtonReset
    const divButtons = createElement("div", {
            id: "divButtons",
            style: "text-align:center;"
        }),
        buttonReset = createElement("input", {
            type: "button",
            value: "Reset",
            style:
                "width: 100px; height: 50px; font-weight: bold; font-size: 20px"
        });
    buttonReset.addEventListener("click", reset, false);
    addChildrenElements(divButtons, [buttonReset]);

    //DynamicShapes title
    createElement("h2", {
        innerHtml: "Dynamically Shapes"
    });

    // Shapes Infos
    const ShapeInfosTitle = createElement("h3", {
            innerHtml: "Shapes Infos"
        }),
        divContainer = createElement("div", {
            style: "width:100%;margin:auto;",
            id: "container"
        }),
        divShapeInfos = createElement("div", {
            style: "width:48%;padding:10px;float:left;",
            id: "infos"
        }),
        titleCircle = createElement("h4", { innerHtml: "Cicle" }),
        circleArea = createElement("p", {
            id: "circle_area"
        }),
        circleCenter = createElement("p", {
            id: "circle_center"
        }),
        circleRad = createElement("p", {
            id: "circle_rad"
        }),
        titleParallelogram = createElement("h4", {
            innerHtml: "Parallelogram"
        }),
        paraArea = createElement("p", {
            id: "para_area"
        }),
        paraSides = createElement("p", {
            id: "para_sides",
            innerHtml: "Sides:"
        }),
        sideA = createElement("p", {
            id: "para_side_ab"
        }),
        sideB = createElement("p", {
            id: "para_side_bc"
        }),
        sideC = createElement("p", {
            id: "para_side_cd"
        }),
        sideD = createElement("p", {
            id: "para_side_da"
        }),
        divTutorial = createElement("div", {
            style: "width:48%;padding:10px;float:left",
            id: "tutorial"
        }),
        authorAbout = createElement("h3", {
            innerHtml: "Author and About"
        }),
        author = createElement("h4", {
            innerHtml: "Author: Henrique Bock Belloube",
            style: "padding-bottom:5px"
        }),
        aboutP1 = createElement("p", {
            innerHtml: "<strong>How it works:</strong>"
        }),
        aboutP2 = createElement("p", {
            innerHtml:
                "You select three points in the space above, it will mark these points in red, when clicked, can be dragged by changing their placement."
        }),
        aboutP3 = createElement("p", {
            innerHtml:
                "After selection, two figures will be defined: yellow circle and a parallelogram in blue."
        }),
        aboutP4 = createElement("p", {
            innerHtml:
                "The 'reset' button, just below the selection space, resets the buttons, allowing new three buttons to be selected."
        }),
        aboutP5 = createElement("p", {
            innerHtml:
                "On the left we have the information of the coordinates of the points, plus the coordinates and areas of the circle and parallelogram figures."
        }),
        aboutP6 = createElement("p", {
            innerHtml: "<strong>Observation:</strong>"
        }),
        aboutP7 = createElement("p", {
            innerHtml:
                "The last point that is set after the selection of the first three cannot be dragged."
        });

    addChildrenElements(divContainer, [divShapeInfos, divTutorial]);
    addChildrenElements(divShapeInfos, [
        ShapeInfosTitle,
        titleCircle,
        circleCenter,
        circleRad,
        circleArea,
        titleParallelogram,
        paraArea,
        paraSides,
        sideA,
        sideB,
        sideC,
        sideD
    ]);
    addChildrenElements(divTutorial, [
        authorAbout,
        author,
        aboutP1,
        aboutP2,
        aboutP3,
        aboutP4,
        aboutP5,
        aboutP6,
        aboutP7
    ]);

    handleOrUpdateShapesInfos();
});

window.addEventListener("resize", event => {
    reset();
    canvas.width = window.innerWidth - 20;
    canvas.setAttribute("style", `border:1px solid #000000`);
});

document.body.addEventListener("mousedown", function(event) {
    for (let i = 0; i < Utils.dots.length; i += 1) {
        if (
            Utils.circlePointCollision(
                event.pageX - 8,
                event.pageY - 8,
                Utils.dots[i]
            )
        ) {
            Utils.circlePointCollision(event.pageX, event.pageY, Utils.dots[i]);
            document.body.addEventListener("mousemove", onMouseMove);
            document.body.addEventListener("mouseup", onMouseUp);
            Utils.dragHandle = Utils.dots[i];
            Utils.offset.x = event.pageX - Utils.dots[i].center.x;
            Utils.offset.y = event.pageY - Utils.dots[i].center.y;
        }
    }
});

/**
 * @method createCanvas
 * @description Starts the "canvas element" and sent to DynamicShapes instance.
 */
function createCanvas() {
    canvas = createElement("canvas", {
        width: window.innerWidth - 20,
        height: window.innerHeight / 2,
        style: "background-color:red;",
        id: "board",
        style: "border:1px solid #000000;"
    });
    canvas.addEventListener("click", addPoint, false);
    DM.addCanvas(canvas);
}
/**
 * @method onMouseMove
 * @description Method executed from the mouse move event of the screen.
 * @param {Object} event
 */
function onMouseMove(event) {
    Utils.dragHandle.center.x = event.layerX - Utils.offset.x + 8;
    Utils.dragHandle.center.y = event.layerY - Utils.offset.y + 8;
    reDraw();
}

/**
 * @method onMouseUp
 * @description Method executed from the mouse up event of the screen.
 * @param {Object} event
 */
function onMouseUp(event) {
    document.body.removeEventListener("mousemove", onMouseMove);
    document.body.removeEventListener("mouseup", onMouseUp);
    reDraw();
}

/**
 * @method addPoint
 * @description It sends coordinates of the new dot/point to the DM instance and updates the shapes Infos.
 * @param {Object} event
 */
function addPoint(event) {
    DM.addPoint(event);
    handleOrUpdateShapesInfos();
}

/**
 * @method reset
 * @description It call the reset DM method and updates the shapes Infos.
 */
function reset() {
    Utils.dots = DM.reset();
    handleOrUpdateShapesInfos();
}

/**
 * @method createElement
 * @description Automates the elements creation.
 * @param {string} name -> element name.
 * @param {Object} attributes -> {name:string,innerHtml:string}
 */
function createElement(name, attributes) {
    const element = document.createElement(name);
    Object.keys(attributes).forEach(attName => {
        if (attName === "innerHtml") {
            element.innerHTML = attributes[attName];
        } else {
            const attValue = attributes[attName];
            element.setAttribute(attName, attValue);
        }
    });
    appendChild(element);
    return element;
}

/**
 * @method appendChild
 * @description Automates to add elements to document body.
 * @param {htmlElement} elementChild -> element to append.
 */
function appendChild(elementChild) {
    document.body.appendChild(elementChild);
}

/**
 * @method addChildrenElements
 * @description Automates to add child elements.
 * @param {Object} fatherElement
 * @param {Array<htmlElement>} childrens
 */
function addChildrenElements(fatherElement, childrens) {
    childrens.forEach(child => fatherElement.appendChild(child));
}

/**
 * @method handleOrUpdateShapesInfos
 * @description Creates or updates the information shapes presented.
 */
function handleOrUpdateShapesInfos() {
    let desCircle = {
            area: 0,
            center: "x:0, y:0",
            rad: 0
        },
        desParallelogram = {
            area: "area: 0",
            side_ab: "a-b => a:x:0, y:0 - b:x:0, y:0 size: 0",
            side_bc: "b-c => b:x:0, y:0 - b:x:0, y:0 size: 0",
            side_cd: "c-d => c:x:0, y:0 - d:x:0, y:0 size: 0",
            side_da: "d-a => d:x:0, y:0 - a:x:0, y:0 size: 0"
        };
    if (DM.circle) {
        desCircle = DM.circle.description;
        desParallelogram = DM.parallelogram.description;
    }
    Object.keys(desCircle).forEach(key => {
        document.getElementById(
            `circle_${key}`
        ).innerHTML = `${key}: ${desCircle[key]}`;
    });
    Object.keys(desParallelogram).forEach(key => {
        document.getElementById(`para_${key}`).innerHTML =
            desParallelogram[key];
    });
}

/**
 * @method reDraw
 * @description Redraws the shapes and updates the information.
 */
function reDraw() {
    DM.reDraw(Utils.dragHandle);
    handleOrUpdateShapesInfos();
}
