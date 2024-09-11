// Function to calculate the time difference and display the "last update" label
function displayLastUpdate(dateString) {
    // Split the date string into day, month, and year
    const [day, month, year] = dateString.split('/').map(Number);
    
    // Create a new Date object using the extracted values
    const lastUpdateDate = new Date(year, month - 1, day); 
    const currentDate = new Date(); 

    const timeDifference = currentDate - lastUpdateDate; // Difference in milliseconds
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(hoursDifference / 24);

    let label = '';

    if (hoursDifference < 24) {
        label = "Last update: few hours ago";
    } else if (daysDifference === 1) {
        label = "Last update: 1 day ago";
    } else if (daysDifference < 30) {
        label = `Last update: ${daysDifference} days ago`;
    } else {
        const monthsDifference = Math.floor(daysDifference / 30);
        if (monthsDifference > 11){
            label = 'Last update: +1 year ago'
        } else {
            label = `Last update: ${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`;
        }
    }

    document.getElementById('last-update').innerText = label;
}

// Call the function with the last update date in dd/mm/yyyy format
displayLastUpdate('11/9/2024'); // TODO: REPLACE