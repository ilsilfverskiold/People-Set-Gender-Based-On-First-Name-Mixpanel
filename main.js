const { default: fetch } = require("node-fetch");
const encodedParams = new URLSearchParams();

// Mixpanel Endpoint
const url = "https://api.mixpanel.com/engage#profile-set-once";

// Import users array
const users = require('./users.js');
// Import api keys file
const keys = require('./keys.js');

// Getting array with user data, picking up only distinct_id and gender 
(async function () {
    const userData = await users.getNewData();
    console.log(userData);
	
	// Iterate over users in array
	for(let i = 0; i < userData.length; i++) {
	
	// Pick up values
	const id = userData[i][0];
	const gender = userData[i][2];
	
		// Always set $ip to 0 to bypass any IP changes. Always send distinct_id and make sure the id exists otherwise Mixpanel will create another user. Don't worry though, you can delete it later if this happens. 
		encodedParams.set(
		  "data",
			`{
			"$token": "${keys.mixpanel_token}",
			"$distinct_id": "${id}",
			"$ip": "0",
				"$set": {
					 "Gender": "${gender}"
				}
			}`
		);
	
		// Send. Will spit out 1 if data was sent successfully. 
		fetch(url, options)
		  .then((res) => res.json())
		  .then((res) => console.log(res))
		  .catch((err) => console.log(err));
	}
})();


// Don't need to change anything here. Just remember to set your mixpanel_api_key in your keys.js file
const options = {
  method: "POST",
  headers: {
    Accept: "text/plain",
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " +
      Buffer.from(
        keys.mixpanel_api_key + ":\\ ",
        "utf-8"
      ).toString("base64"),
  },
  body: encodedParams,
};






