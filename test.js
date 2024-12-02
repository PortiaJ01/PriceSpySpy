// Add target URLs here
const urls = [
    "https://pricespy.co.nz/product.php?p=5082120",
     "https://pricespy.co.nz/product.php?p=4290145",
     "https://pricespy.co.nz/product.php?p=13437587",
     "https://pricespy.co.nz/product.php?p=14002034",
     "https://pricespy.co.nz/product.php?p=6476846"
]

import puppeteer from "puppeteer";

// Funcion does webscaping
const getPrice = async (urls) => {
    // Launch puppeteer 
    const browser = await puppeteer.launch({
        headless: false, 
        defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();

    // Open price spy
    try {
        await page.goto(urls, { waitUntil: "domcontentloaded" });

    // Specify class
    const isItemSold = ".Text--q06h0j.gxjLMM.h4text";

    // Wait for element to show up
    await page.waitForSelector(isItemSold, { visible: true });

    // Get page data
    const data = await page.evaluate((selector) => {
        const element = document.querySelector(selector);
        return element ? element.innerText.trim() : null;
        }, isItemSold);

    // Check it contains "No shop sells this product."
        console.log(data);
    }
    catch (error) {
        console.error(`Error scraping ${urls}:`, error);  
    } 
    finally {
        await browser.close();
    }
}

getPrice(urls);