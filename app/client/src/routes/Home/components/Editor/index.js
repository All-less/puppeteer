var React = require("react");
/**
 * @author Dylan Vorster
 */
module.exports = {
	Engine: require("./Engine"),
	CanvasWidget: require("./CanvasWidget").default,
	PortWidget: require("./PortWidget"),
	BasicNodeWidget: require("./BasicNodeWidget"),

	//convenience methods
	DOM: {
		Canvas: React.createFactory(require("./CanvasWidget")),
		Port: React.createFactory(require("./PortWidget")),
		BasicNode: React.createFactory(require("./BasicNodeWidget")),
	}
};
