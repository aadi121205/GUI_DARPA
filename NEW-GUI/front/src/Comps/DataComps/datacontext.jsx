import React, { useContext } from 'react';
import { DataSocketContext } from '../../context/socketContext';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const NeonPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1a1a1a',
    color: '#00ff00',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: '0 0 8px #00ff00',
}));

const Title = styled(Typography)(({ theme }) => ({
    color: '#00ff00',
    textShadow: '0 0 4px #00ff00',
}));

const DataDisplay = () => {
    const { dataRover1, dataRover2, dataRover3 } = useContext(DataSocketContext);

    return (
        <Box sx={{ backgroundColor: 'black', minHeight: '100vh', padding: 3 }}>
            <Title variant="h3" gutterBottom>
                Data from Rovers
            </Title>
            <NeonPaper elevation={3}>
                <Title variant="h5">Rover 1</Title>
                <pre>{JSON.stringify(dataRover1, null, 2)}</pre>
            </NeonPaper>
            <NeonPaper elevation={3}>
                <Title variant="h5">Rover 2</Title>
                <pre>{JSON.stringify(dataRover2, null, 2)}</pre>
            </NeonPaper>
            <NeonPaper elevation={3}>
                <Title variant="h5">Rover 3</Title>
                <pre>{JSON.stringify(dataRover3, null, 2)}</pre>
            </NeonPaper>
        </Box>
    );
};

export default DataDisplay;


// import React, { useContext } from 'react';
// import { DataSocketContext } from '../../context/socketContext';

// const DataDisplay = () => {
//     const { dataRover1, dataRover2, dataRover3 } = useContext(DataSocketContext);
//     // console.log(dataRover1)
//     return (
//         <div>
//             <h1>Data from Rovers</h1>
//             <div>
//                 <h2>Rover 1</h2>
//                 <pre>{JSON.stringify(dataRover1, null, 2)}</pre>
//             </div>
//             <div>
//                 <h2>Rover 2</h2>
//                 <pre>{JSON.stringify(dataRover2, null, 2)}</pre>
//             </div>
//             <div>
//                 <h2>Rover 3</h2>
//                 <pre>{JSON.stringify(dataRover3, null, 2)}</pre>
//             </div>
//         </div>
//     );
// };

// export default DataDisplay;
