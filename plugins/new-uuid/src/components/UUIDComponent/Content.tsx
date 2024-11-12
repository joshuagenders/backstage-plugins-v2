import React, { useState } from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

export const Content = () => {
    const [uuid, setUuid] = useState(uuidv4());
    return (
        <Box display="flex" flexDirection="column" padding={2}>
            <Typography variant="h5" component="h2">
                {uuid}
            </Typography>
            <Button onClick={() => setUuid(uuidv4())}>Generate</Button>
        </Box>
    );
};
