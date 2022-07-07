import React from 'react'

function Instructions(props) {
    const onKeyDown = e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            props.inputRef.current.children[1].children[1].focus()
        }
    }

    return (
        <div className='instruction-container'>
            <div
                className={props.className} onKeyDown={onKeyDown}
            >   
                <h3 className='question'>{props.question}</h3>
                <p className='instruction'>{props.instruction}</p>               
            </div>
            <div className='instruction-image-container'>
                <img 
                    src={`../assets/img/${props.image[0]}`}
                    alt={props.image[1]}
                    className='instruction-image'
                /> 
            </div>
        </div>
    )
}

export default Instructions;