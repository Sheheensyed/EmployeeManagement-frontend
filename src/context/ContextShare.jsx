import React, { createContext, useState } from 'react'

export const productContext = createContext();

function ContextShare({ children }) {
    const [product, setProduct] = useState([])
    return (

        <>
            <productContext.Provider value={{ product, setProduct }}>
                {children}
            </productContext.Provider>

        </>
    )
}

export default ContextShare
