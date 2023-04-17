const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const filePath = path.resolve(__dirname, './out/resume.pdf.html');
const filePathJP = path.resolve(__dirname, './out-ja/resume.pdf.html');
const cssPath = path.resolve(__dirname, './out/positive-pdf.css');
(async () => {
    const htmlContent = fs.readFileSync(filePath);
    const htmlContentJP = fs.readFileSync(filePathJP);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent.toString(), { waitUntil: ["domcontentloaded", "networkidle0"]})
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
    await page.setContent(htmlContentJP.toString(), { waitUntil: ["domcontentloaded", "networkidle0"]})
    await page.pdf({
        path: "out-ja/resume-ja.pdf",
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
    await browser.close();
})();