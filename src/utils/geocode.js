import request from 'request';


export const geocode = (address, callback) => {
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidGhldnlhbnNoIiwiYSI6ImNrN2s2ajVoeDEzaHAzb2xpZjdseTgyaW0ifQ.hcRSw5uWlkpQGCCbFWkzZg&limit=1";

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to location services!")
        } else if (body.features.length === 0) {
            callback('Unable to find location, Try again with a different search term.');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};