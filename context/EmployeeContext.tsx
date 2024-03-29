'use client'

import { PropsWithChildren, createContext, useContext, useState } from 'react'

type contextType = {
    empSelection: Object;
    updateEmployeeData: (e:any)=> void;
}

export const EmployeeContext = createContext<any>(undefined);


export const useEmployeeContext = () => {
    const context = useContext(EmployeeContext);
    if(!context){
        throw new Error("context must be used with a context provider")
    } 
    return context;
}



export const EmployeeContextProvider:React.FC<PropsWithChildren> = ({children}) => {
    const [empSelection, setEmpSelection] = useState<any>();

    const updateEmployeeData = (e:any) => {
        setEmpSelection(e.value)
    }

    const value: contextType = {
        empSelection,
        updateEmployeeData,
    };

    return (
        <EmployeeContext.Provider value={value}>
            {children}
        </EmployeeContext.Provider>
    )
}

