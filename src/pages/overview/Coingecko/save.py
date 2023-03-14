from TwitterAPI import TwitterAPI, TwitterPager
import tweepy

#consumer_key = 'cyXcjxUc1ZlLD2v1DjaJrLiVI' 
#consumer_secret = 'pD3mk041ROBiSSwt2C3kytR9eF1zYrX1vBD8whpDln5Zq4y1jX' 
#access_token = '1279253779540410373-8ODCqefNcIvSFXSrwKH7DPhtQTda3i' 
#access_token_secret = 'nVGU8WyEdGCQ2gU1qQ57NXxLpYQts4Emt1UPM6GVlYaav' 
#Get your Twitter API credentials and enter them here
consumer_key = "n3rmMdlMxTHxIuoa2eBwRlEDt"
consumer_secret = "2Zd2rqkOZboRzWRL4Y78b2rmoyaRboRjuDGP8fSwjNpdxAEUKk"
access_token = "840585628798582784-ps8EAVn7youITkj80sdEvarmezdDWFV"
access_token_secret = "Ejf7grmqnCrUrPPAKlUzojumf66M5iJ2iFlrLdp4V4zs6"

#1
client = TwitterAPI(consumer_key, consumer_secret, access_token, access_token_secret, api_version="2")
USER_ID = "Cogent_Crypto"
params = {
        "max_results": 1000,
        "user.fields": "id,name,username,created_at,description,profile_image_url,public_metrics,url,verified",
    }
followers = client.request(f"users/:{USER_ID}/followers", params)
print(followers)

#2
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret) 
api = tweepy.API(auth) 


for user in tweepy.Cursor(api.get_followers, screen_name="Cogent_Crypto").items():
    print(user.screen_name, user.followers_count)
