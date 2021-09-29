const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const port = 8000;

const url = "https://www.theguardian.com/us";

axios(url)
  .then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const articles = [];

    $(".fc-item__title", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({ title, url });
    });

    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server running on PORT ${port}`));
