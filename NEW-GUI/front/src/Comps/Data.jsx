import * as React from 'react';
// import Length from './DataComps/Charts';
import { DataSocketState } from "../context/socketContext";
// import {DataDisplay} from "./DataComps/datacontext";
import DataDisplay from "./DataComps/datacontext";
function Data() {
    return (
        <DataSocketState>
            <DataDisplay />
        </DataSocketState>
    );
//         <DataSocketContext/>
//         // <div>
//         //     <Length />
//         //     <Length />
//         //     <Length />
//         //     <Length />
//         //     <Length />
//         //     <Length />
//         //     <Length />
//         //     <Length />

//         // </div>
//     );
}

export default Data;
