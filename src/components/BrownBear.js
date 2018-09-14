import React from 'react';

const BrownBear = () => {
    return (
        <svg id="bear" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" >
            <path d="M0,150 C0,65 120,65 120,150" fill="#A56F49" stroke="#000" strokeWidth="2.5" />
            <g className="ears">
                <path d="M44,32 L44,30 C44,16 24,16 24,30 L24,32" fill="#A56F49" stroke="#000" strokeWidth="2.5" strokeLinecap="round" transform="rotate(-10,38,24)" />
                <path d="M75,32 L75,30 C75,16 95,16 95,30 L95,32" fill="#A56F49" stroke="#000" strokeWidth="2.5" strokeLinecap="round" transform="rotate(10,82,24)" />
            </g>
            <ellipse cx="60" cy="95" rx="50" ry="80" style={{ fill: '#A56F49' }} stroke="#000" strokeWidth="2.5" />
            <g className="eyes">
                {/* left eye and eyebrow */}
                <circle cx="44" cy="55" r="2" fill="#000" />
                {/* right eye and eyebrow */}
                <circle cx="76" cy="55" r="2" fill="#000" />
            </g>
            <g className="muzzle">
                <ellipse cx="60" cy="65" rx="10" ry="4" style={{ fill: 'black' }} />
                <path d="M56,80 C58.5,82.5 61,82.5 63.5,80" stroke="black" strokeWidth="2" fill="none" />
            </g>
        </svg>
    )
}

export default BrownBear;