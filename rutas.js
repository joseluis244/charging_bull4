var Cliente = "";
function RGET (app) {
    app.get("/", function (req, res) {
        res.sendfile("html/main.html")
    })
    app.get("/dash", function (req, res) {
        
        res.sendfile("html/dash.html");
    })
}
function RPOST(app) {
    app.post("/dash", function (req, res) {
        switch(req.body.data){
            case "1": 
            res.send([1,2,3,4,5])
            break;
            case "2": 
            res.send([6,7,8,9,0])
            break;
            case "3": 
            res.send({lab:["a","b","c","d","e"],valor:[4,5,6,7,8]})
            break;
        }
        
    })
}
module.exports.RGET = RGET;
module.exports.RPOST = RPOST;