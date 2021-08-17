# Set Gender in Mixpanel
Set a gender based property on user profiles with first names in [Mixpanel](https://mixpanel.com/) via [Engage API](https://developer.mixpanel.com/reference/user-profiles) from a csv file with nodejs. We are using [nationalize API](https://nationalize.io/) as well as [genderize API](https://genderize.io/) to first look for nationality in first name and then use that to call genderize to get the probability of gender. 

Note: won't work on special characters (ie. chinese characters).

Read about Mixpanel's /engage endpoint to set properties on user profiles [here](https://developer.mixpanel.com/reference/user-profiles)

# Needed 
- Mixpanel Account with access to
  -   Project Token
  -   Project API Key
  -   Already set users with first_name added
- Genderize.io account with api key (if you are setting gender for more than 500 users). Get API Key [here.](https://store.genderize.io/) Will work for both Genderize API and Nationalize API.


# First Steps
- Export users with first_name added as a csv file (or export user data in other ways)
- Get your keys and add them to the keys.js file
- Get genderize api key as well (if you have an account and you're updating up more than 500 users). 
# Keys

Your key.js file should only contain this:

```
module.exports = {
    mixpanel_api_key: "XXXXXXXXXXXX",
    mixpanel_token: "XXXXXXXXXXXX",
	genderize_api_key: "XXXXXXXXXXXX"
};
```

(replace XXXXXXXXXXXX with your own values)

# Dependencies 
See package-lock.json file

# Notes
- Remember to add your Resource.csv file to read from
- May need to tweak the functions in users.js if you already have nationality. The Nationalize API doesn't always seem to do the job. Do a sanity check with a few users before and look over if the gender set is really correct. I ended up removing it and instead using their geolocation to look up their country code via country-code-lookup.
- Also, don't forget to import the gender probability number so you can filter out data that has a lower probability than .95
