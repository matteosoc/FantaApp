import React from 'react';
import { Card, ListGroup, Stack } from 'react-bootstrap';

const LeagueLeaderboard = ({ leaderboard }) => {
    return (
        <Card className="mb-4">
            <Card.Body>
                <ListGroup variant="flush">
                    {leaderboard.map((team, index) => (
                        <ListGroup.Item key={index}>
                            <Stack direction="horizontal" gap={3}>
                                <div>{index + 1}. {team.teamName}</div>
                                <div className="ms-auto">{team.totalScore} punti</div>
                            </Stack>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default LeagueLeaderboard;