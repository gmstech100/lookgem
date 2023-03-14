import requests
from bs4 import BeautifulSoup
import mysql.connector
import time

def insertData(dataInsert):
    try:
    # Connect to MySQL server
        cnx = mysql.connector.connect(
            user='root',
            password='root',
            host='localhost',
            port='8080',
            database='abici'
        )

        # Create cursor
        cursor = cnx.cursor()

        # Define INSERT statement
        insert_query = "INSERT INTO coingecko_new_currency (token, symbol, token_address, twitter, telegram, website, chain, image, description) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"

        # Define data to be inserted
        data = (
            dataInsert["token"],
            dataInsert["symbol"],
            dataInsert["token_address"],
            dataInsert["twitter"],
            dataInsert["telegram"],
            dataInsert["website"],
            dataInsert["chain"],
            dataInsert["image"],
            dataInsert["description"]
        )

        # Execute INSERT statement with data
        print("insert execute")
        cursor.execute(insert_query, data)

        # Commit changes
        cnx.commit()
        cursor.close()
        cnx.close()

    except mysql.connector.Error as error:
        print("Failed to insert record into MySQL table {}".format(error))

    finally:
        # Close cursor and connection
        cursor = None
        if cursor is not None:
            cursor.close()
        cnx = None
        if cnx is not None:
            cnx.close()

def callApiCG():
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
            time.sleep(5)
            token = href.split("/")[-1]
            apiCg = "https://api.coingecko.com/api/v3/coins/" + token
            print(apiCg)
            responseApi = requests.get(apiCg)
            print(responseApi.status_code)
            if responseApi.status_code == 200:
                data = responseApi.json()
                dataInsert = {}
                dataInsert["token"] = data["name"]
                dataInsert["symbol"] = data["symbol"]
                if "contract_address" in data:
                    dataInsert["token_address"] = data["contract_address"]
                else:
                    dataInsert["token_address"] = ""
                dataInsert["chain"] = data["asset_platform_id"]
                dataInsert["website"] = data["links"]["homepage"][0]
                dataInsert["twitter"] = data["links"]["twitter_screen_name"]
                dataInsert["telegram"] = data["links"]["telegram_channel_identifier"]
                dataInsert["image"] = data["image"]["small"]
                dataInsert["description"] = data["description"]["en"]
                print("insert")
                insertData(dataInsert)

    else:
        print(f"Failed to retrieve page: {responseUrl.status_code}")

callApiCG()
