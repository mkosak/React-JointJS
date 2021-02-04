import React from 'react';
import * as joint from 'jointjs';

import ShapeControl from './components/shape-control/ShapeControl';

import colors from './colors.module.scss';
import './App.scss';

class App extends React.Component {
    constructor() {
        super();

        // init graph
        this.graph = new joint.dia.Graph();

        // element reference for the canvas
        this.reference = null;

        // shape initial options
        this.initialShapeOptions = {
            posts: {
                groups: {
                    in: {
                        attrs: {
                            '.port-body': {
                                fill: colors.inPort,
                            },
                        },
                    },
                    out: {
                        attrs: {
                            '.port-body': {
                                fill: colors.outPort,
                            },
                        },
                    },
                },
            },
            attrs: {
                '.label': {
                    'ref-x': 0.5,
                    'ref-y': 0.2,
                    fill: colors.mainWhite,
                },
                rect: { fill: colors.mainAction },
            },
            position: { x: 50, y: 50 },
            size: { width: 90, height: 90 },
        };

        // init Model shape
        this.shape = new joint.shapes.devs.Model(this.initialShapeOptions);

        // initial state
        this.state = {
            shapes: [{ label: 'Model', obj: this.shape }],
        };
    }

    componentDidMount() {
        // init paper
        this.paper = new joint.dia.Paper({
            el: this.reference,
            height: this.reference.outerHeight,
            width: this.reference.outerWidth,
            gridSize: 1,
            model: this.graph,
        });
    }

    /**
     * Adds new shape by cloning existing
     * @method
     * @param {object} shape - jointjs shape object
     */
    cloneShape = (shape) => () => {
        const { shapes } = this.state;
        const newShape = shape.clone().translate(300, 0);

        this.setState({ shapes: [...shapes, { obj: newShape, label: `Model ${shapes.length + 1}` }] });
    }

    render() {
        const { shapes } = this.state;

        return (
            <div className="app">
                <div className="app__side-panel">
                    {shapes.map((shape) => (
                        <ShapeControl
                            key={shape.label}
                            label={shape.label}
                            shape={shape.obj}
                            graph={this.graph}
                            cloneShape={this.cloneShape}
                        />
                    ))}
                </div>
                <div
                    className="app__main-panel"
                    ref={(ref) => {
                        this.reference = ref;
                    }}
                />
            </div>
        );
    }
}

export default App;
