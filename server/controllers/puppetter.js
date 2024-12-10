import puppeteer from 'puppeteer';
import chromium from 'chromium';

export const getNetmedsResult = async (req, res) => {
    try {
        console.log('Starting Puppeteer...');
        const { uri } = req.query;

        if (!uri) {
            return res.status(400).json({ error: 'URI is required' });
        }

        console.log('URI:', uri);

        const browser = await puppeteer.launch({
            headless: true,
            executablePath: chromium.path,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--window-size=600,800'
            ],
        });
        const page = await browser.newPage();
        await page.emulate({
            viewport: {
                width: 375, // Width of iPhone X
                height: 812, // Height of iPhone X
                isMobile: true, // Indicates a mobile device
                hasTouch: true, // Enables touch capabilities
            },
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148', // iPhone X user agent
        });

        await page.goto(uri, { waitUntil: 'domcontentloaded' });

        await page.waitForSelector('.ais-InfiniteHits-item', { timeout: 30000 });

        console.log('Scraping data...');
        const medicines = await page.evaluate(() => {
            const data = [];
            const items = document.querySelectorAll('.ais-InfiniteHits-item');
            console.log('items', items);

            items.forEach(item => {
                const name = item.querySelector('.info')?.textContent?.trim() || 'No name';
                const description = item.querySelector('.cate_filter')?.textContent?.trim() || 'No description';
                const price = item.querySelector('.final-price')?.textContent?.trim() || 'No price';
                const image = item.querySelector('.product-link img')?.src || 'No image';

                data.push({ name, description, price, image });
                // console.log('data', data);
            });

            return data;
        });

        console.log('Scraped data: netmeds', medicines.slice(0, Math.min(medicines.length, 1)));

        await browser.close();

        return res.status(200).json(medicines.slice(0, Math.min(medicines.length, 1)));

    } catch (error) {
        console.error('Error scraping data:', error.message);

        return res.status(500).json({ error: error.message });
    }
};



export const getPharmeasyResult = async (req, res) => {
    try {
        const { uri } = req.query;
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: chromium.path,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        console.log('uri', uri, page);
        // const url = 'https://pharmeasy.in/search/all?name=dolo';

        await page.goto(uri, { waitUntil: 'domcontentloaded' });

        await page.waitForSelector('.Search_medicineLists__hM5Hk');

        const medicines = await page.evaluate(() => {
            const data = [];
            const items = document.querySelectorAll('.Search_medicineLists__hM5Hk');
            console.log('items', items);
            items.forEach(item => {
                const name = item.querySelector('.ProductCard_medicineName__8Ydfq')?.textContent?.trim() || 'No name';
                const description = item.querySelector('.ProductCard_measurementUnit__hsZ2o')?.textContent?.trim() || 'No description';
                const price = item.querySelector('.ProductCard_ourPrice__yDytt')?.textContent?.trim() || item.querySelector('.ProductCard_gcdDiscountContainer__CCi51')?.textContent?.trim().slice(0, item.querySelector('.ProductCard_gcdDiscountContainer__CCi51')?.textContent?.trim().length - 7) || 'No price';
                const image = item.querySelector('.ProductCard_productImage__dq5lq')?.src || 'No image';

                data.push({ name, description, price, image });
            });

            return data;
        });

        console.log('Scraped data: pharmeasy', medicines.slice(0, Math.min(medicines.length, 1)));

        await browser.close();

        return res.status(200).json(medicines.slice(0, Math.min(medicines.length, 1)));
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }

};


export const get1mgRes = async (req, res) => {
    try {
        const { uri } = req.query;
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: chromium.path,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1520, // Adjust based on your server's resolution
            height: 1080, // Adjust based on your server's resolution
            deviceScaleFactor: 1 // Default scale factor
        });
        // const url = 'https://pharmeasy.in/search/all?name=dolo';
        console.log('uri, page', uri, page);
        await page.goto(uri, { waitUntil: 'domcontentloaded' });

        await page.waitForSelector('.style__product-box___3oEU6');

        const medicines = await page.evaluate(() => {
            const data = [];
            const items = document.querySelectorAll('.style__product-box___3oEU6');
            console.log('items', items);
            items.forEach(item => {
                const name = item.querySelector('.style__pro-title___3G3rr')?.textContent?.trim() || 'No name';
                const description = item.querySelector('.style__pack-size___3jScl')?.textContent?.trim() || 'No description';
                const price = item.querySelector('.style__price-tag___KzOkY')?.textContent?.trim() || 'No price';
                const image = item.querySelector('.HorizontalSkuCard__imageContainer__LszD5')?.img?.src || 'No image';

                data.push({ name, description, price, image });
            });

            return data;
        });

        console.log('Scraped data: mg', medicines.slice(0, Math.min(medicines.length, 1)));

        await browser.close();

        return res.status(200).json(medicines.slice(0, Math.min(medicines.length, 1)));
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }

};