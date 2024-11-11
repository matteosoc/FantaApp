import { Stack } from 'react-bootstrap';
import React from 'react';


const BonusCard = ({ bonus }) => {
    return (
        <div className='mb-3'>
            <h5>Dettaglio del Bonus</h5>
            <div className='myCard p-3 mb-4'>
                <Stack direction="horizontal">
                    <div>
                        <img
                            src={bonus.icon ? bonus.icon : "/bonus-default.png"}
                            className='thumbnail'
                        />
                    </div>
                    <div className='ps-4'>
                        <h1>{bonus.name}</h1>
                        <p>Valore: {bonus.value}</p>
                    </div>
                </Stack>
            </div>
        </div>
    )
};

export default BonusCard;