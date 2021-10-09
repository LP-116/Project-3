import os
from bs4 import BeautifulSoup as bs
import requests
import pandas as pd
import datetime as dt
from splinter import Browser
from webdriver_manager.chrome import ChromeDriverManager


def scrape_all():

    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)

    url = "https://www.imdb.com/"
    browser.visit(url)

    html = browser.html
    soup = bs(html, 'html.parser')

    try:
        movie_titles = soup.find_all('div', class_="TopBoxOfficeTitle__BoxOfficeTitleName-dujkoe-1 fpNAXa")

        movie_title_list = []

        for movie in movie_titles:
            
            title = movie.text.strip()
            movie_title_list.append(title)

        
        movie_profit = soup.find_all('div', class_="TopBoxOfficeTitle__BoxOfficeGrossAmount-dujkoe-5 bdjpKH")

        movie_profit_list = []

        for movie in movie_profit:
            
            profit = movie.text.strip()
            movie_profit_list.append(profit)

        
        movie_dict = {
            "Title": movie_title_list,
            "Profit": movie_profit_list}

        browser.quit()
    
    except AttributeError:
        return None


    return movie_dict

