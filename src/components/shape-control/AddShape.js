import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AddShape extends PureComponent {
    render() {
        const { cloneShape } = this.props;
        return (
            <div className="clone-shape">
                <button
                    className="clone-shape__button btn"
                    type="button"
                    onClick={cloneShape}
                >
                    Clone Shape
                </button>
            </div>
        );
    }
}

AddShape.propTypes = {
    cloneShape: PropTypes.func.isRequired,
};

export default AddShape;
