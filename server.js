const express = require('express');

const { nanoid } = require("nanoid");

const app = express();

const {pb,getAuth} = require('./dbConnect');

app.use(express.json());

getAuth();

// const getRecords = async () => {
//         console.log(pb.authStore.isValid)
//         const records = await pb.collection('shortenurls').getFullList({sort: 'id'});
//         console.log(records)
// }

// const checkRecords = async() => {
//     getAuth();
//     getRecords();
// }

// checkRecords();


// getRecords();


app.post('/shorten', async(req,res) => {

    const data = req.body;

    const shortUrl = `https://short.ly/${nanoid(6)}` ; 

    
    const record = await pb.collection('shortenurls').create({
        ...data,
         "shortUrl": shortUrl, 
    });

    console.log(record);

    res.send({message: "successfully shortened the url"});

} );


app.get('/stats/active',async (req,res) => {

    const today = new Date().toISOString();

    const activeRecords = await pb.collection('shortenurls').getFullList({
        filter: `expiration > "${today}"`, 
        sort: '-created',
    });

    const recordCounts = activeRecords.reduce((acc, record) => {
        const date = new Date(record.created).toISOString().split('T')[0];  
        acc[date] = (acc[date] || 0) + 1; 
        return acc;
    }, {});
    
    const formattedRecords = Object.entries(recordCounts).map(([date, count]) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        return `${count} made on ${formattedDate}`;
    });

    console.log(formattedRecords);

    res.send({activeUrls: formattedRecords, total: activeRecords.length })
})

app.post('/urls/batch', async(req,res) => {

    try {
        const listOfURLs = req.body.batch;

        console.log(listOfURLs)

        const createdRecords = await Promise.all(
            listOfURLs.map(async (data) => {
                const shortUrl = `https://short.ly/${nanoid(6)}` ; 
                return await pb.collection('shortenurls').create({...data, shortUrl});
            })
        );

        res.status(201).json({ message: "Batch URLs created", records: createdRecords.map((rec) => rec.shortUrl) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

app.get('/urls/recent', async (req,res)=> {
    try {

        const latestRecords = await pb.collection('shortenurls').getList(1, 5, {
            sort: '-created', 
        });

        console.log(latestRecords.items);

        const formattedRecords = latestRecords.items.map(({longUrl,shortUrl}) => ({  longUrl,shortUrl }))

        res.send(formattedRecords)
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})





const port = 4000;


app.listen(port,() => console.log("server running on ", port));