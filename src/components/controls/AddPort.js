import React from 'react';
import PropTypes from 'prop-types';

class AddPort extends React.Component {
    static propTypes = {
        addPort: PropTypes.func.isRequired,
    }

    constructor() {
        super();

        this.state = {
            name: '',
            type: 'inPorts',
        };
    }

    onChangeType = (e) => {
        this.setState({
            type: e.target.value,
        });
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    portChanged = () => {
        const { name, type } = this.state;
        const { addPort } = this.props;

        addPort(name, type);

        this.setState({
            name: '',
            type: 'inPorts',
        });
    }

    render() {
        const { name, type } = this.state;
        return (
            <div className="add-port">
                <div className="add-port__type">
                    <label htmlFor="inPorts">
                        inPorts
                        <input
                            type="radio"
                            id="inPorts"
                            name="type"
                            onChange={this.onChangeType}
                            checked={type === 'inPorts'}
                            value="inPorts"
                        />
                    </label>
                    <label htmlFor="outPorts">
                        outPorts
                        <input
                            type="radio"
                            id="outPorts"
                            name="type"
                            onChange={this.onChangeType}
                            checked={type === 'outPorts'}
                            value="outPorts"
                        />
                    </label>
                </div>
                <div className="add-port__input">
                    <input type="text" value={name} onChange={this.onChangeName} placeholder="Port name" />
                </div>
                <button type="button" onClick={this.portChanged}>Add New Port</button>
            </div>
        );
    }
}

export default AddPort;
