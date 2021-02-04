import React from 'react';
import PropTypes from 'prop-types';

import AddPort from './AddPort';

class ShapeControl extends React.Component {
    constructor() {
        super();

        // initial state
        this.state = {
            error: '',
            inPorts: [],
            outPorts: [],
        };
    }

    componentDidMount() {
        const { graph, shape, label } = this.props;

        // give shape label
        shape.attr('.label/text', label);

        // render Model
        shape.addTo(graph);
    }

    componentDidUpdate(prevProps, prevState) {
        const { shape } = this.props;
        const { inPorts, outPorts } = this.state;
        const prevInPorts = prevState.inPorts;
        const prevOutPorts = prevState.outPorts;

        // setting ports
        if (inPorts.length > prevInPorts.length) {
            shape.set('inPorts', inPorts);
        }
        if (outPorts.length > prevOutPorts.length) {
            shape.set('outPorts', outPorts);
        }
    }

    /**
     * Adds new ports
     * @method
     * @param {string} name - New port name
     * @param {string} type - Type of the port (inPorts/outPorts)
     */
    addPort = (name, type) => {
        const { inPorts, outPorts } = this.state;

        const ports = (type === 'inPorts') ? [...inPorts] : [...outPorts];

        if (!ports.includes(name)) {
            ports.push(name);
        } else {
            this.setState({ error: 'Port already exist' }, () => {
                setTimeout(() => {
                    this.setState({ error: '' });
                }, 1500);
            });
        }

        this.setState({ [type]: ports });
    }

    render() {
        const { error } = this.state;
        const { cloneShape, shape, label } = this.props;

        return (
            <div className="shape-control">
                <div className="shape-control__name">
                    {label}
                </div>

                <AddPort addPort={this.addPort} />

                {error && (
                    <p className="error">{error}</p>
                )}

                <div className="clone-shape">
                    <button
                        className="clone-shape__button btn"
                        type="button"
                        onClick={cloneShape(shape)}
                    >
                        Clone Shape
                    </button>
                </div>
            </div>
        );
    }
}

ShapeControl.propTypes = {
    graph: PropTypes.object.isRequired,
    shape: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    cloneShape: PropTypes.func.isRequired,
};

export default ShapeControl;
