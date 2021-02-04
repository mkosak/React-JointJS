import React from 'react';
import * as joint from 'jointjs';
import AddPort from './components/AddPort';

import colors from './colors.module.scss';
import './App.scss';

class App extends React.Component {
    constructor() {
        super();

        // element reference for the canvas
        this.reference = null;

        // initial state
        this.state = {
            error: '',

            // shape options
            options: {
                inPorts: [],
                outPorts: [],
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
                        text: 'Model',
                        'ref-x': 0.5,
                        'ref-y': 0.2,
                        fill: colors.mainWhite,
                    },
                    rect: { fill: colors.mainAction },
                },
                position: { x: 50, y: 50 },
                size: { width: 90, height: 90 },
            },
        };

        const { options } = this.state;

        // init Model shape
        this.element = new joint.shapes.devs.Model(options);
    }

    componentDidMount() {
        // init graph
        this.graph = new joint.dia.Graph();

        // init paper
        this.paper = new joint.dia.Paper({
            el: this.reference,
            height: this.reference.outerHeight,
            width: this.reference.outerWidth,
            gridSize: 1,
            model: this.graph,
        });

        // render Model
        this.element.addTo(this.graph);
    }

    componentDidUpdate(prevProps, prevState) {
        const { options } = this.state;

        const { inPorts, outPorts } = options;
        const prevInPorts = prevState.options.inPorts;
        const prevOutPorts = prevState.options.outPorts;

        // setting ports
        if (inPorts.length > prevInPorts.length) {
            this.element.set('inPorts', inPorts);
        }
        if (outPorts.length > prevOutPorts.length) {
            this.element.set('outPorts', outPorts);
        }
    }

    /**
     * Adds new ports
     * @method
     * @param {string} name - New port name
     * @param {string} type - Type of the port (inPorts/outPorts)
     */
    addPort = (name, type) => {
        const { options } = this.state;
        const { inPorts, outPorts } = options;

        const ports = (type === 'inPorts') ? [...inPorts] : [...outPorts];

        if (!ports.includes(name)) {
            ports.push(name);
        } else {
            this.setState({ error: 'Port already exist' });
        }

        this.setState({ options: { ...options, [type]: ports } });
    }

    render() {
        const { error } = this.state;

        return (
            <div className="app">
                <div className="app__side-panel">
                    <AddPort addPort={this.addPort} />
                    {error && (
                        <p className="error">{error}</p>
                    )}
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
