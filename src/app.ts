import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const utils = require('./util');
const cutoffDate = '2022-01-01T00:00:00.000Z';
const site = process.env.SITE_INFO;

utils.get('/outages', (response) => {
    utils.get('/site-info/' + site, (siteInfo) => {
        utils.filter(response, siteInfo, cutoffDate, (outages) => {
            utils.post('/site-outages/' + site, outages, (res) => {
                console.log('Successfully posted outages');
            });
        });
    });
});
