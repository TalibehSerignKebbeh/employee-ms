import { useEffect, useState } from "react";

const useDark = () => {
    const [dark, setdark] = useState(
       JSON.parse(localStorage.getItem('dark')) || false
    );

    useEffect(() => {
        // setdark(JSON.stringify(localStorage.getItem('dark')))
        localStorage.setItem('dark', JSON.stringify(dark))
       
    }, [dark]);


    return [dark, setdark]
}

export default useDark