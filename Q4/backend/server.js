const http=require("http")
const cors=require("cors")
const fs=require("fs")
const server=http.createServer((req,res)=>{
    cors()(req,res,()=>{
        if(req.url=='/HtmlIndex')
        {
            let data=fs.readFileSync('./index.html')
            res.writeHead(200,{'content-type':'text/html'})
            res.end(data)
        }
        else if(req.url=='/JsonIndex')
        {
            let data=fs.readFileSync('./data.json')
            res.writeHead(200,{'content-type':'application/json'})
            res.end(data)
        }
        else{
            res.writeHead(404,{'content-type':'plain/text'})
            res.end("404 Not Found")
        }
    });
});
server.listen(3001)