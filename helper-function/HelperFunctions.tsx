import { useState, useEffect } from 'react';



const useLocalStorage = (name:any) => {
    const [value, setValue] = useState<any>('')
  
    useEffect(() => {
      setValue(localStorage.getItem(name))
    }, [name])
  
    return value
  }

  export { useLocalStorage };