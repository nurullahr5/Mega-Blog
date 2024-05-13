import React from 'react'

function Logo({width = "100px"}) {
    return (
        <div>
            <img width={width} src="https://images.pexels.com/photos/221159/pexels-photo-221159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
        </div>
    )
}

export default Logo