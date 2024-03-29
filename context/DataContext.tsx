'use client'

import { PropsWithChildren, createContext, useContext, useState } from 'react'

type contextType = {
    selection: Object;
    updateRowData: (e:any)=> void;
}

export const DataContext = createContext<any>(undefined);


export const useDataContext = () => {
    const context = useContext(DataContext);
    if(!context){
        throw new Error("context must be used with a context provider")
    } 
    return context;
}


export const DataContextProvider:React.FC<PropsWithChildren> = ({children}) => {
    const [selection, setSelection] = useState<any>();

    const updateRowData = (e:any) => {
        setSelection(e.value)
    }

    const value: contextType = {
        selection,
        updateRowData,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

