import React from 'react';
import PropTypes from 'prop-types';

class AddPort extends React.Component {
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

        if (name !== '') {
            // call prop
            addPort(name, type);

            // clear the name field
            this.setState({ ...this.state, name: '' });
        } else {
            this.setState({ error: 'Please type port name' }, () => {
                setTimeout(() => {
                    this.setState({ error: '' });
                }, 1500);
            });
        }
    }

    render() {
        const { name, type, error } = this.state;
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
                    {error && (
                        <p className="error">{error}</p>
                    )}
                </div>
                <button
                    className="add-port__button btn"
                    type="submit"
                    onClick={this.addNewPort}
                >
                    Add New Port
                </button>
            </form>
        );
    }
}

AddPort.propTypes = {
    addPort: PropTypes.func.isRequired,
};

export default AddPort;
