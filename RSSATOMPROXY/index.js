module.exports = async function (context, req) {
    if (req.query.feedUrl || (req.body && req.body.feedUrl)) {
        const Parser = require('rss-parser');
        const feedUrl = req.query.feedUrl || req.body.feedUrl;
        
        let _parser = new Parser({headers: {'Content-type': 'charset=utf-8'}});
        let feed = await _parser.parseURL(feedUrl);
        
        let data = [];
        
        feed.items.forEach(item => {
            data.push(item);
        });

        context.res = {
            status: 200,
            body:  data
        };   
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a 'feedURL' on query string or in the request body"
        };
     }
     
     context.done();
};