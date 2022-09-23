const axios = require('axios');



exports.homeRoutes = (req, resp) => {
    axios.get("http://localhost:3000/api/users")
        .then(function (responce) {
            resp.render('index', { user: responce.data });
        })
        .catch((err) => {
            console.log(err);
        })
}


exports.add_user = (req, resp) => {
    resp.render('add_user');
}


exports.update_user = (req, resp) => {
    axios.get('http://localhost:3000/api/users',{params : { id:req.query.id }})
    .then(function(userData){
        resp.render('update_user',{user : userData.data});
    })
    .catch(err =>{
        resp.send(err);
    })
   
}                               