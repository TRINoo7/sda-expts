const http=require("http")
const cors=require("cors")
const fs=require("fs")
const { log } = require("console")
const server=http.createServer((req,res)=>{
    cors()(req,res,()=>{
        if(req.url=='/submit')
        {
            let body=''
            req.on('data',(chunk)=>{
                body+=chunk
            });
            req.on('end',()=>{
                body=JSON.parse(body)
                console.log(body);
                const jstr=JSON.stringify(body,null,2)
                fs.open('./data.json','a',(err,fd)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        fs.write(fd,jstr,(err)=>{
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {
                                console.log("Written successfully");
                            }
                        });
                    }
                });
            });
            res.writeHead(200,{'content-type':'plain/text'})
            res.end("Data recieved by server and successfully written")
        }
        else if(req.url=='/getdata')
        {
            const data=fs.readFileSync('./data.json','utf-8')
            console.log(data);
            res.writeHead(200,{'content-type':'application/json'})
            res.end(data)
        }
        else
        {
            res.writeHead(404,{'content-type':'text/plain'})
            res.end("Not Found")
        }
    });
});
const port=3001
server.listen(port,()=>{
    console.log("Server running...");
    console.log('Listening on ${port}');
})