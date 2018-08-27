module.exports ={

    RGET: function (app) {
        app.get("/", function (req, res) {
            res.send("views/index.html")
        })       
    },
    //POST
    RPOST: function (app) {
        app.post("/", function (req, res) {
            res.send("123123")
        })
    }
}