const request = {
    location: new google.maps.LatLng(41.9102415, 12.395911),
    radius: 100000,
    type: ['restaurant']
};

const results = [];
const places = document.getElementById('places');
const service = new google.maps.places.PlacesService(places);

const callback = (response, status, pagination) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        results.push(...response);
    }
 
    if (pagination.hasNextPage) {
        setTimeout(() => pagination.nextPage(), 2000);
    } else {
        displayResults();
      
    }
}
const displayResults = () => {
    results.filter(result => result.rating)
            .sort((a, b) => a.rating > b.rating ? -1 : 1)
            .forEach(result => {
                 console.log(result)
                places.innerHTML += `<div class="div"><h1>name: ${result.name} - rating: ${result.rating}</h1>
                                     </div>`;
            });
}

service.nearbySearch(request, callback);