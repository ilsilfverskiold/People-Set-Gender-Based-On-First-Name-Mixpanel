# Set Gender in Mixpanel
Set gender based on first name in Mixpanel via /engage API from a csv file with nodejs. We are using nationalize API as well as genderize API to first look for nationality in name and then use that to call genderize to get the probability of gender. 

Note: won't work on special characters (ie. chinese characters).

# Needed 
- Mixpanel Account with access to
  -   Project Token
  -   Project API Key
  -   Already set users with first_name added
- Genderize.io account with api key (if you are setting gender for more than 500 users)

# First Steps
- Export users with first_name added as a csv file. 
- Get your keys and add them to the keys.js file
- Get genderize api key as well (if you have an account and you're updating up more than 500 users)

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

# Remember to add your own Resources.csv file 
