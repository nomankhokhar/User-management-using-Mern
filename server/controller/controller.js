var Userdb = require('../model/model');

exports.create = (req, res) => {
    //   validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }


    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    user
        .save(user)
        .then(data => {
            // res.send(data);
            res.redirect('/add-user');
            
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a operation",
            })
        })


}

// retrive and return all users

exports.find = (req, res) => {

    if (req.query.id) {

        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id" + id });
                }
                else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retriveing user with id " + id })
            });
    }
    else {

        Userdb.find()
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occured while retriving data" })
            })
    }
}





// Update a new users

exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400).send({ message: "Data to update can not be empty" });
    }


    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFinAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found` });
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        })
}




// Delete a user 


exports.delete = (req, res) => {

    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe is wrong` });
            } else {
                res.send({
                    message: "User was deleted Successfully",
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            })
        })

}