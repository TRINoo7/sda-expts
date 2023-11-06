const http=require("http")
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors=require("cors");
const { error } = require("console");

const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri,  {
        family:4,
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
async function connectMongo(){
await client.connect()
console.log("Mongo Connected")
await client.db("Node").command({ping:1})
console.log("Deployment pinged. Connection tested. Approved")
}

const server=http.createServer((req,res)=>{
    cors()(req,res,()=>{
        if(req.url=='/c')
        {
            let body=''
            req.on('data',(chunk)=>{
                body+=chunk
            });
            req.on('end',()=>{
                body=JSON.parse(body)
                console.log(body)
                client.db("Node").collection("Trial").insertOne(body)
            })
            res.writeHead(200,{'content-type':'plain/text'})
            res.end("Data uploaded successfully")
        }
        else if(req.url=='/g')
        {
            let cur=''
            let body={}
            client.db("Node").collection("Trial").find().toArray().then((result)=>{
                console.log(result)
                res.writeHead(200,{'content-type':'text/plain'})
                res.end(JSON.stringify({result}))
            }).catch((err)=>console.error("error",err));
        }
        else if(req.url=='/u')
        {
            let body=''
            req.on('data',(chunk)=>{
                body+=chunk
            });
            req.on('end',()=>{
                body=JSON.parse(body)
                console.log(body)
                client.db("Node").collection("Trial").updateMany({SensorID:body.SensorID},{$set:{SensorName:body.SensorName,Description:body.Description}})
            })
            res.writeHead(200,{'content-type':'plain/text'})
            res.end("Data updates successfully")
        }
        else if(req.url=='/d')
        {
            let body=''
            req.on('data',(chunk)=>{
                body+=chunk
            });
            req.on('end',()=>{
                body=JSON.parse(body)
                console.log(body)
                client.db("Node").collection("Trial").deleteMany({SensorID:body.SensorID})
            })
            res.writeHead(200,{'content-type':'plain/text'})
            res.end("Data deleted successfully")
        }
    })
});
connectMongo();
server.listen(3001)
