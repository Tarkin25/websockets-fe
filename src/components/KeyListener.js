import { Component } from 'react';
import PropTypes from 'prop-types';

export default class KeyListener extends Component {

    constructor(props) {
        super(props);

        let prevNode = null;

        for(let key of props.keys) {
            const keyNode = new KeyNode(key, prevNode);
            this[key.toLowerCase()] = keyNode;
            prevNode = keyNode;
        }

        this.lastKey = props.keys[props.keys.length - 1].toLowerCase();

        this.downListener = e => {
            const node = this[e.key.toLowerCase()];

            if(node && (node.prevNode === null || node.prevNode.keyDown === true)) {
                const newNode = node;
                newNode.keyDown = true;
                this[e.key.toLowerCase()] = newNode;

                if(this[this.lastKey].keyDown === true) {
                    this.props.action();
                }
            }
        }

        this.upListener = e => {
            const node = this[e.key.toLowerCase()];

            if(node) {
                const newNode = node;
                newNode.keyDown = false;
                this[e.key.toLowerCase()] = newNode;
            }
        }

        document.addEventListener("keydown", this.downListener);
        document.addEventListener("keyup", this.upListener);
    }  

    componentWillUnmount() {
        document.removeEventListener("keydown", this.downListener);
        document.removeEventListener("keyup", this.upListener);
    }

    render() {
        return null;
    }
}

KeyListener.propTypes = {
    action: PropTypes.func.isRequired,
    keys: PropTypes.arrayOf(PropTypes.string)
};

class KeyNode {

    constructor(key, prevNode) {
        this.key = key;
        this.keyDown = false;
        this.prevNode = prevNode;
    }

}

