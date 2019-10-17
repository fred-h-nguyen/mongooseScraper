const scrape = require('../scripts/scrape');

const controller = require('../controllers');

module.exports = router => {
    router.get('/', (req, res) => {
        res.render('home');
    });

    router.get('/saved', (req, res) => {
        res.render('saved');
    });

    router.get('/api/scrape', (req, res) => {
        controller.headlines.scrape((err, docs) => {
            if (!docs || docs.insertedCount === 0) {
                res.json({ message: 'No new articles today. Check back tomorrow!' });
            } else {
                res.json({
                    message: `added ${docs.insertedCount} new articles!`
                });
            }
        });
    });

    router.get('/api/headlines', (req, res) => {
        const query = {}
        if (req.query.saved) {
            query = req.query;
        }

        controller.headlines.get(query, result => {
            res.json(result);
        });
    });

    router.delete('/api/headlines/:id', (req, res) => {
        const query = {};
        query._id = req.params.id;
        controller.headlines.delete(query,result=>
        {
            res.json(result);
        });
    });

    router.patch('/api/headlines',(req,res)=>
    {
        controller.headlines.update(req.body,result=>{
            res.json(result);
        });
    });

    router.get('/api/notes/:headline_id',(req,res)=>{
        const query = {};
        query._id = req.params.headline_id;
        controller.notes.get(query,result=>{
            res.json(result);
        });
    });

    router.post('/api/notes/:headline_id',(req,res)=>{
        const query = {};
        query._id = req.params.headline_id
        controller.notes.save(req.body,query,result=>{
            res.json(result);
        });
    });

    router.delete('/api/notes/:id',(req,res)=>{
        const query= {};
        query._id = req.params.id;
        controller.notes.delete(query,result=>{
            res.json(result);
        });
    });
}