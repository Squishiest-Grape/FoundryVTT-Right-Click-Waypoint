Hooks.once('ready', ()=>{
	window.addEventListener('contextmenu',right_click_event);
});

function right_click_event (event) {
	console.log(event)
	const ruler = canvas.controls.ruler;
	if (!event.ctrlKey && ruler?._state===Ruler.STATES.MEASURING && ruler?.draggedEntity===null) {
		ruler.waypoints.push(get_point());
		ruler.labels.addChild(new PreciseText("", CONFIG.canvasTextStyle));
	}
	return true;
}

function get_point () {
	let pos = canvas.app.renderer.events.pointer.getLocalPosition(canvas.tokens);
	const [x, y] = canvas.grid.getCenter(pos.x, pos.y)
	return new PIXI.Point(x, y);
}
