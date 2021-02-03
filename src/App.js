import React from 'react';
import * as joint from 'jointjs';

import './App.css';

import AddPort from './components/controls/AddPort';

class App extends React.Component {
    static options = {
        posts: {
            groups: {
                in: {
                    attrs: {
                        '.port-body': {
                            fill: '#16A085',
                        },
                    },
                },
                out: {
                    attrs: {
                        '.port-body': {
                            fill: '#E74C3C',
                        },
                    },
                },
            },
        },
        attrs: {
            '.label': { text: 'Model', 'ref-x': 0.5, 'ref-y': 0.2 },
            rect: { fill: '#2ECC71' },
        },
        position: { x: 50, y: 50 },
        size: { width: 90, height: 90 },
    };

    constructor() {
        super();

        // init graph
        this.graph = new joint.dia.Graph();

        // element reference for the canvas
        this.reference = null;

        const {
            inPorts,
            outPorts,
            ports,
            attrs,
            position,
            size,
        } = this.constructor.options;

        // initial cells to render
        this.state = {
            element: new joint.shapes.devs.Model({
                inPorts,
                outPorts,
                ports,
                attrs,
                position,
                size,
            }),
            inPorts: [],
            outPorts: [],
        };
    }

    componentDidMount() {
        // create Paper
        this.paper = new joint.dia.Paper({
            el: this.reference,
            height: this.reference.outerHeight,
            width: this.reference.outerWidth,
            gridSize: 1,
            model: this.graph,
        });

        const { element } = this.state;

        // render Model
        element.addTo(this.graph);
    }

    componentDidUpdate(prevProps, prevState) {
        const { element, inPorts, outPorts } = this.state;

        if (inPorts.length > prevState.inPorts.length) {
            element.set('inPorts', inPorts);
        }
        if (outPorts.length > prevState.outPorts.length) {
            element.set('outPorts', outPorts);
        }

        return null;
    }

    addPort = (name, type) => {
        if (type === 'inPorts') {
            let { inPorts } = this.state;

            inPorts = [...inPorts];
            inPorts.push(name);

            this.setState({ inPorts });
        }
        if (type === 'outPorts') {
            let { outPorts } = this.state;

            outPorts = [...outPorts];
            outPorts.push(name);

            this.setState({ outPorts });
        }
    }

    render() {
        return (
            <div className="app">
                <div className="app__side-panel">
                    <AddPort addPort={this.addPort} />
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
