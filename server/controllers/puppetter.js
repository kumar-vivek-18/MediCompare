import puppeteer from 'puppeteer';
import chromium from 'chromium';

export const getNetmedsResult = async (req, res) => {
    try {
        console.log('Starting Puppeteer...');
        const { medicine } = req.query;

        if (!medicine) {
            return res.status(400).json({ error: 'URI is required' });
        }
        const uri = `https://m.netmeds.com/catalogsearch/result/${medicine}/all`

        console.log('URI:', uri);

        const browser = await puppeteer.launch({
            headless: true,
            executablePath: chromium.path,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
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

        // const htmlContent = await page.content();

        // console.log('Scraped data: netmeds', medicines.slice(0, Math.min(medicines.length, 1)));

        await browser.close();

        // const requiredMed = medicines.slice(0, Math.min(medicines.length, 1));

        return res.status(200).json(medicines.slice(0, Math.min(medicines.length, 1)));

    } catch (error) {
        console.error('Error scraping data:', error.message);

        return res.status(500).json({ error: error.message });
    }
};



export const getPharmeasyResult = async (req, res) => {
    try {
        const { medicine } = req.query;

        if (!medicine) {
            return res.status(400).json({ error: 'URI is required' });
        }
        const uri = `https://pharmeasy.in/search/all?name=${medicine}`
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
        const { medicine } = req.query;

        if (!medicine) {
            return res.status(400).json({ error: 'URI is required' });
        }
        const uri = `https://www.1mg.com/search/all?name=${medicine}`

        const browser = await puppeteer.launch({
            headless: true,
            executablePath: chromium.path,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        // Set the mobile emulation
        // await page.emulate({
        //     viewport: {
        //         width: 375,
        //         height: 812,
        //         isMobile: true,
        //         hasTouch: true,
        //     },
        //     userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        // });

        console.log('Navigating to URL:', uri);

        // Navigate to the page
        await page.goto(uri, { waitUntil: 'domcontentloaded' });

        // Wait for the content to load properly
        // await page.waitForTimeout(3000); // Add a delay for dynamic content to load (if necessary)
        await page.waitForSelector('.style__container___cTDz0');

        // Scrape the data
        const medicines = await page.evaluate(() => {
            const data = [];
            const items = document.querySelectorAll('.style__container___cTDz0');

            items.forEach(item => {
                const name = item.querySelector('.style__pro-title___3zxNC')?.textContent?.trim() || 'No name';
                const description = item.querySelector('.style__pack-size___254Cd')?.textContent?.trim() || 'No description';
                const price = item.querySelector('.style__price-tag___B2csA')?.textContent?.trim() || 'No price';
                const image = item.querySelector('.style__image___Ny-Sa')?.src || 'No image';

                data.push({ name, description, price, image });
            });

            return data;
        });

        console.log('Scraped data:', medicines.slice(0, Math.min(medicines.length, 1)));

        // Close the browser
        await browser.close();

        return res.status(200).json(medicines.slice(0, Math.min(medicines.length, 1)));
    } catch (error) {
        console.error('Error scraping data:', error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getApolloPharmacy = async (req, res) => {
    try {
        const { medicine } = req.query;

        if (!medicine) {
            return res.status(400).json({ error: 'URI is required' });
        }
        const uri = `https://www.apollopharmacy.in/search-medicines/${medicine}`;

        const browser = await puppeteer.launch({
            headless: true,
            executablePath: chromium.path,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        // Set the mobile emulation
        await page.emulate({
            viewport: {
                width: 375,
                height: 812,
                isMobile: true,
                hasTouch: true,
            },
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        });

        console.log('Navigating to URL:', uri);

        // Navigate to the page
        await page.goto(uri, { waitUntil: 'domcontentloaded' });

        // Wait for the content to load properly
        // await page.waitForTimeout(3000); // Add a delay for dynamic content to load (if necessary)
        await page.waitForSelector('.ProductCard_productCardGrid__NHfRH');

        // Scrape the data
        const medicines = await page.evaluate(() => {
            const data = [];
            const items = document.querySelectorAll('.ProductCard_productCardGrid__NHfRH');

            items.forEach(item => {
                const name = item.querySelector('.JD')?.textContent?.trim() || 'No name';
                const description = item.querySelector('.KD')?.textContent?.trim() || 'No description';
                const price = item.querySelector('.iF')?.textContent?.trim() || 'No price';
                const image = item.querySelector('.ED img')?.srcset || 'No image';

                data.push({ name, description, price, image });
            });

            return data;
        });

        console.log('Scraped data:', medicines.slice(0, Math.min(medicines.length, 1)));

        // Close the browser
        await browser.close();

        return res.status(200).json(medicines.slice(0, Math.min(medicines.length, 1)));
    } catch (error) {
        console.error('Error scraping data:', error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getDawaiBala = async (req, res) => {
    try {
        const { medicine } = req.query;

        if (!medicine) {
            return res.status(400).json({ error: 'URI is required' });
        }
        const uri = `https://www.dawaiwala.com/dw/categories?src=${medicine}`;

        const browser = await puppeteer.launch({
            headless: true,
            executablePath: chromium.path,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        // Set the mobile emulation
        await page.emulate({
            viewport: {
                width: 375,
                height: 812,
                isMobile: true,
                hasTouch: true,
            },
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        });

        console.log('Navigating to URL:', uri);

        // Navigate to the page
        await page.goto(uri, { waitUntil: 'domcontentloaded' });

        // Wait for the content to load properly
        // await page.waitForTimeout(3000); // Add a delay for dynamic content to load (if necessary)
        await page.waitForSelector('.card-product');

        // Scrape the data
        const medicines = await page.evaluate(() => {
            const data = [];
            const items = document.querySelectorAll('.card-product');

            items.forEach(item => {
                const name = item.querySelector('.text-inherit')?.textContent?.trim() || 'No name';
                const description = item.querySelector('.text-decoration-none')?.textContent?.trim() || 'No description';
                const price = item.querySelector('div > span.text-dark.text-truncate > strong')?.textContent?.trim() || 'No price';
                const image = item.querySelector('.img-fluid')?.src || 'No image';

                data.push({ name, description, price, image });
            });

            return data;
        });

        console.log('Scraped data:', medicines.slice(0, Math.min(medicines.length, 1)));

        // Close the browser
        await browser.close();

        return res.status(200).json(medicines.slice(0, Math.min(medicines.length, 1)));
    } catch (error) {
        console.error('Error scraping data:', error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
