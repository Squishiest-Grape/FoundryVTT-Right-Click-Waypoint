

Hooks.once("init", () => {
    hookDragHandlers(Ruler);
});

function hookDragHandlers(entityType) {
	const entityName = entityType.name;
	libWrapper.register(
		"right_click_waypoint",
		`${entityName}.prototype._onDragLeftCancel`,
		forwardIfUnahndled(onEntityDragLeftCancel),
		"MIXED",
	);
}

function forwardIfUnahndled(newFn) {
	return function (oldFn, ...args) {
		const eventHandled = newFn(...args);
		if (!eventHandled) oldFn(...args);
	};
}

function onEntityDragLeftCancel(event) {
    if (ruler._state === Ruler.STATES.MEASURING) {
        const ruler = canvas.controls.ruler;
	    if (!ruler.draggedEntity || ruler._state === Ruler.STATES.MOVING) return false;
        const point = getMeasurePosition();
        ruler.push(new PIXI.Point(point.x, point.y));
        return true;
    }
}

function getMeasurePosition() {
	const mousePosition = getPointer().getLocalPosition(canvas.tokens);
	const rulerOffset = canvas.controls.ruler.rulerOffset;
	const measurePosition = {x: mousePosition.x + rulerOffset.x, y: mousePosition.y + rulerOffset.y};
	return measurePosition;
}