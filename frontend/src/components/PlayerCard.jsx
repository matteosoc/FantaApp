import { Stack } from 'react-bootstrap';
import React from 'react';


const PlayerCard = ({ player }) => {
    return (
        <div className='myCard p-3 mb-4'>
            <Stack direction="horizontal">
                <div>
                    <img
                        src={player.playerImage ? player.playerImage : "/player-default.jpg"}
                        className='thumbnail'
                    />
                </div>
                <div className='ps-4'>
                    <h1>{player.name}</h1>
                    <p>Valore: {player.value}</p>
                </div>
            </Stack>
        </div>
    )
};

export default PlayerCard;