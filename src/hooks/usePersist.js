import {useState, useEffect} from 'react';

const UsePersist = () => {
    const [persist, setpersist] = useState(JSON.parse(localStorage.getItem('persist')) || false);

    useEffect(() => {
        localStorage.setItem('persist', JSON.stringify(persist))
        return () => {
            
        };
    }, [persist]);

    return [persist, setpersist]
}

export default UsePersist;
