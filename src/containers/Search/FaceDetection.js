import {USER_ID, APP_ID, MODEL_ID, PAT} from "./clarifaiVariables";

// Generate JSON string for request with api variables + image url
const renderString = imageURL => {
    return (
        JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": imageURL
                        }
                    }
                }
            ]
        })
    )
}

// Create requestOptions object with JSON body including image url
const renderRequestOptions = imageURL => {
    return ({
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
        },
        body: renderString(imageURL)}
    )
};

export default async function faceDetectionRequest(imageURL){
    const result = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", renderRequestOptions(imageURL))
    const toJsonResult = await result.json();
    return toJsonResult;
    // .then(response => response.json())
    // .then(result => console.log("Clarifai Result: ", result))
    // .catch(error => console.log('error', error));
}
