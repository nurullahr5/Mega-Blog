import React from 'react'

export default function Button({
    children,
    type = '',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    classname = '',
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${classname}`} {...props}>
            {children}
        </button>
    )
}

