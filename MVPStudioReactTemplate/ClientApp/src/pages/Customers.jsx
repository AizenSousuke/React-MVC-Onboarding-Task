import React, { useState } from 'react';

export function Customers(props) {
    const [Customers, setCustomers] = useState(0);
    return (
        <div>
            
            {props.title}
        </div>
    )
}

export default Customers;