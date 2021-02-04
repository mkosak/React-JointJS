import React from 'react';
import PropTypes from 'prop-types';

class AddPort extends React.Component {
    static propTypes = {
        addPort: PropTypes.func.isRequired,
    }

    constructor() {
        super();

        this.portTypes = ['inPorts', 'outPorts'];

        this.state = {
            name: '',
            type: 'inPorts',
        };
    }

    /**
     * Change port type
     * @method
     * @param {event} e - on change event
     */
    onChangeType = (e) => {
        this.setState({
            type: e.target.value,
        });
    }

    /**
     * Change port name
     * @method
     * @param {event} e - on change event
     */
    onChangeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    /**
     * Add new port
     * @method
     * @param {event} e - on change event
     */
    addNewPort = (e) => {
        e.preventDefault();

        const { name, type } = this.state;
        const { addPort } = this.props;

        if (name !== undefined) {
            // call prop
            addPort(name, type);

            // clear the name field
            this.setState({ ...this.state, name: '' });
        }
    }

    render() {
        const { name, type } = this.state;
        return (
            <form className="add-port">
                <div className="add-port__control">
                    {this.portTypes.map((port) => (
                        <label htmlFor={port} key={port}>
                            <input
                                type="radio"
                                id={port}
                                name="type"
                                onChange={this.onChangeType}
                                checked={type === port}
                                value={port}
                            />
                            {port}
                        </label>
                    ))}
                </div>
                <div className="add-port__control">
                    <input
                        type="text"
                        value={name}
                        onChange={this.onChangeName}
                        placeholder="Port name"
                    />
                </div>
                <button
                    className="add-port__button"
                    type="submit"
                    onClick={this.addNewPort}
                >
                    Add New Port
                </button>
            </form>
        );
    }
}

export default AddPort;
