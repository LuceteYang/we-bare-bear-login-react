import React, { Component } from 'react';
import BrownBear from './BrownBear';
import PandaBear from './PandaBear';
import WhiteBear from './WhiteBear';
import '../styles/bear-style.css';


class BearComponent extends Component {
    constructor() {
        super();
        this.focus = this.focus.bind(this);
        this.reset = this.reset.bind(this);
        this.look = this.look.bind(this);
        this.rotate3d = this.rotate3d.bind(this);
        this.lookAway = this.lookAway.bind(this);
        this.copyStyles = this.copyStyles.bind(this);
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.fauxInput = document.createElement('div');
        this.span = document.createElement('span');
        this.timer = null;
    }
    focus = event => {
        event.target.classList.add('focused');
        this.copyStyles(event.target);
        event.target.type === 'password' ? this.lookAway(event) : this.look(event);
    }
    reset = event => {
        event.target.classList.remove('focused');
        this.bear.classList.remove('playing');

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.bear.classList.remove('look-away', 'down', 'up');
            this.rotate3d(0, 0, 0, 0);
        }, 1);
    }
    look = event => {
        const el = event.target;
        console.log(el);
        const text = el.value.substr(0, el.selectionStart);

        this.span.innerText = text || '.';

        const bearRect = this.bear.getBoundingClientRect();
        const inputRect = el.getBoundingClientRect();
        const caretRect = this.span.getBoundingClientRect();
        const caretPos = caretRect.left + Math.min(caretRect.width, inputRect.width) * !!text;
        const distCaret = bearRect.left + bearRect.width / 2 - inputRect.left - caretPos;
        const distInput = bearRect.top + bearRect.height / 2 - inputRect.top;
        const y = Math.atan2(-distCaret, Math.abs(distInput) * 3);
        const x = Math.atan2(distInput, Math.abs(distInput) * 3 / Math.cos(y));
        const angle = Math.max(Math.abs(x), Math.abs(y));

        this.rotate3d(x / angle, y / angle, y / angle / 2, angle);
    }
    lookAway = event => {
        const el = event.target;
        const bearRect = this.bear.getBoundingClientRect();
        const inputRect = el.getBoundingClientRect();
        const distInput = bearRect.top + bearRect.height / 2 - inputRect.top;

        this.bear.classList.add('look-away', distInput < 0 ? 'up' : 'down');

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.bear.classList.add('playing');
        }, 300);
    }
    rotate3d = (x, y, z, rad) => {
        const value = `rotate3d(${x}, ${y}, ${z}, ${rad}rad)`;
        for (let i = 0; i < this.face.length; i++) {
            this.face[i].style.transform = value;
        }
    }
    copyStyles = (el) => {
        const props = window.getComputedStyle(el, null);
        if (this.fauxInput.parentNode === document.body) {
            document.body.removeChild(this.fauxInput);
        }
        this.fauxInput.style.visibility = 'hidden';
        this.fauxInput.style.position = 'absolute';
        this.fauxInput.style.top = Math.min(el.offsetHeight * -2, -999) + 'px';
        for (let i = 0; i < props.length; i++) {
            if (['visibility', 'display', 'opacity', 'position', 'top', 'left', 'right', 'bottom'].indexOf(props[i]) !== -1) {
                continue;
            }
            this.fauxInput.style[props[i]] = props.getPropertyValue(props[i]);
        }
        document.body.appendChild(this.fauxInput);
    }

    componentDidMount() {
        this.bear = document.querySelector('#bear');
        this.face = document.querySelectorAll('.ears, .eyes, .muzzle');
        const email = this.emailInput.current;
        const password = this.passwordInput.current;
        email.addEventListener('focus', this.focus, false);
        email.addEventListener('keyup', this.look, false);
        email.addEventListener('click', this.look, false);
        email.addEventListener('blur', this.reset, false);
        password.addEventListener('focus', this.lookAway, false);
        password.addEventListener('blur', this.reset, false);
    }
    componentWillUnmount() {
        const email = this.emailInput.current;
        const password = this.passwordInput.current;
        email.removeEventListener('focus', this.focus, false);
        email.removeEventListener('keyup', this.look, false);
        email.removeEventListener('click', this.look, false);
        email.removeEventListener('blur', this.reset, false);
        password.removeEventListener('focus', this.lookAway, false);
        password.removeEventListener('blur', this.reset, false);
    }

    render() {
        const BearArray = [<BrownBear />, <PandaBear />, <WhiteBear />];
        const randomBear = BearArray[Math.floor(Math.random() * BearArray.length)];

        const contentStyle = {
            display: 'flex',
            flexDirection: 'column'
        }

        this.fauxInput.appendChild(this.span);
        return (
            <div id="content" style={contentStyle}>
                {randomBear}
                <input ref={this.emailInput} type="text" placeholder="email@domain.com" />
                <input ref={this.passwordInput} type="password" placeholder="Password" />
            </div>
        )
    }
}

export default BearComponent;