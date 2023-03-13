import requests
from bs4 import BeautifulSoup

url = "https://www.coingecko.com/en/new-cryptocurrencies"
responseUrl = requests.get(url)

if responseUrl.status_code == 200:
    html_content = responseUrl.content
    # do something with the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')
    # find all 'a' tags with href starting with '/en/coins/'
    hrefs = [a['href'] for a in soup.find_all('a', href=lambda href: href and href.startswith('/en/coins/'))]
    hrefs = list(set(hrefs))
    for href in hrefs:
        token = href.split("/")[-1]
        apiCg = "https://api.coingecko.com/api/v3/coins/" + token
        responseApi = requests.get(apiCg)
        if responseApi.status_code == 200:
            data = responseApi.json()
            dataInsert = {}
            dataInsert["token"] = data["name"]
            dataInsert["symbol"] = data["symbol"]
            dataInsert["token_address"] = data["contract_address"]
            dataInsert["chain"] = data["asset_platform_id"]
            dataInsert["website"] = data["links"]["homepage"][0]
            dataInsert["twitter"] = data["links"]["twitter"]
            dataInsert["telegram"] = data["links"]["telegram"]
            dataInsert["image"] = data["image"]["small"]
            dataInsert["description"] = data["description"]["en"]
else:
    print(f"Failed to retrieve page: {responseUrl.status_code}")
