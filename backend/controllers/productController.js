const Product = require("../models/productModel");
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// create Product
const scrapeAndSave = async (req, res) => {
    try {
        const { email } = req.body;
        const browser = await puppeteer.launch({ headless: 'new', });
        const page = await browser.newPage();

        // Navigate to the Flipkart URL
        await page.goto(process.env.flipkart_url);

        // Extract static content using Cheerio
        const $ = cheerio.load(await page.content());

        const title = $("span.B_NuCI").text();
        const price = parseFloat($("div._30jeq3._16Jk6d").text().substring(1).replace(',', ''));
        const descriptionElement = $('div._1mXcCf.RmoJUa p');
        const description = descriptionElement.text().trim();
        const reviewsElement = await page.waitForSelector('div.gUuXy-._16VRIQ');
        const noOfReviews = await reviewsElement.evaluate(element => {
            const secondLevelSpans = element.querySelectorAll('span span span'); // Get all nested <span> elements
            let reviews;

            for (const span of secondLevelSpans) {
                if (span.textContent.includes('Reviews')) {
                    if (span.textContent.includes('Reviews')) {
                        reviews = span.textContent.trim().split(' ')[0]; // Extract reviews count
                        break; // Exit the loop once the reviews are found
                    }
                }
            }

            return reviews;
        });

        console.log(noOfReviews); // Output the extracted reviews count

        const ratingsElement = await page.waitForSelector('div._3LWZlK');
        const ratingsText = await ratingsElement.evaluate(element => element.textContent);
        const ratings = parseFloat(ratingsText.trim());
        console.log('Ratings:', ratings);
        const mediaCount = $('div.yjhgk+l').length || 7;

        // Use Mongoose's create() method to store data in the database
        await Product.create({
            email: email,
            title,
            price,
            description,
            ratings,
            noOfReviews,
            mediaCount
        });

        await browser.close();

        res.json({ success: true, message: 'Product data scraped and saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
};

module.exports = { scrapeAndSave };