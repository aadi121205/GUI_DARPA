// const socket = require("socket.io")
const sio = io("http://localhost:8000")
sio.on("map_nd_casualities",(data)=>{
const map_id = document.getElementById('map')
map_id.src = `data:image/png;base64,${data['map']}`
});
sio.on("connect",()=>{
    console.log("Connect to backend")
});
const dictionaryContent = document.getElementById('global_dictionary');
// console.log(data[0]);
// console.log(typeof data);
const updateDictionary = (index) => {
    const term = Object.keys(global_data)[index];
    // console.log(`index is ${term}`)
    const definition = global_data[term];

    // Clear previous content
    dictionaryContent.innerHTML = '';
    // console.log(data[term])

    // Create term element
    const termElement = document.createElement('div');
    termElement.classList.add('term');

    // Create term title
    const termTitle = document.createElement('strong');
    termTitle.textContent = `${term}:`;
    termElement.appendChild(termTitle);

    // Function to handle nested dictionaries
    const createNestedElements = (obj) => {
        const container = document.createElement('div');
        container.classList.add('nested-dictionary');

        for (const [key, value] of Object.entries(obj)) {
            const itemElement = document.createElement('div');
            
            if (typeof value === 'object' && value !== null) {
                // Recursively handle nested objects
                const nestedTitle = document.createElement('strong');
                nestedTitle.textContent = `${key}:`;
                itemElement.appendChild(nestedTitle);
                itemElement.appendChild(createNestedElements(value));
            } else {
                // Handle simple key-value pairs
                itemElement.innerHTML = `<strong>${key}:</strong> ${value}`;
            }

            container.appendChild(itemElement);
        }

        return container;
    };

    // Append the nested elements for the definition
    termElement.appendChild(createNestedElements(definition));
    dictionaryContent.appendChild(termElement);
};
let global_data=[];
let last_click=0;
sio.on('global_dict',(data)=>{
    global_data=data;
    
    // Event listeners for each button
    const buttons = document.querySelectorAll('.Casuality_ID_buttons');
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            updateDictionary(index);
            last_click=index
        });
    });
    
    // Initialize with the first element
    updateDictionary(0);

});
sio.on('inference',(data)=>{
    // console.log(`data from Uxv:${Object.keys(data)}`)
    // console.log(global_data)
    for(let casuality in global_data){
        // console.log('gtest')
        // console.log(casuality)
        if(JSON.stringify(data['lat_long'])==JSON.stringify(global_data[casuality]['LatLong'])){
            global_data[casuality]['Data'][data['data']['type']]=('time' in data['data'])?{'time':data['data']['time'],'value':data['data']['value']}:data['data']['value'];
            // console.log(`updated global database, recieved data from ${data['UXV_id']}`);
            // count_data[data['UXV_id']]+=1;
            // console.log(count_data)
            if (last_click==casuality)
                updateDictionary(casuality);
    
          }

    }
    console.log('updated the global data');

});
// document.addEventListener('DOMContentLoaded', () => {
//     fetch('sample/GlobalJSON.json')
//         .then(response => response.json())
//         .then(data => {

//             // Function to update dictionary content based on button click
//         })
//         .catch(error => console.error('Error fetching the JSON file:', error));
// });
