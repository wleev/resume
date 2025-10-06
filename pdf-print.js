const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const filePath = path.resolve(__dirname, './out/resume.pdf.html');
const filePathJP = path.resolve(__dirname, './out-ja/resume.pdf.html');
const cssPath = path.resolve(__dirname, './out/positive-pdf.css');
(async () => {
    const htmlContent = fs.readFileSync(filePath, { encoding: "utf8" });
    const htmlContentJP = fs.readFileSync(filePathJP, { encoding: "utf8" });
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--font-render-hinting=none',
            '--disable-font-subpixel-positioning'
        ]
    });
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
    
    await page.setContent(htmlContent, { waitUntil: ["domcontentloaded", "networkidle0"]})
    await page.pdf({
        path: "out/resume.pdf",
        format: "A4",
        printBackground: true,
        displayHeaderFooter: false,
        margin: {
            top: "10mm",
            left: "10mm",
            right: "10mm",
            bottom: "10mm"
        }
    });
    
    await page.setContent(htmlContentJP, { waitUntil: ["domcontentloaded", "networkidle0"]});
    
    await page.pdf({
        path: "out-ja/resume-ja.pdf",
        format: "A4",
        printBackground: true,
        displayHeaderFooter: false,
        waitForFonts: true,
        margin: {
            top: "10mm",
            left: "10mm",
            right: "10mm",
            bottom: "10mm"
        }
    });
    await browser.close();
})();