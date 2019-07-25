var express = require('express');
var promise = require('bluebird');
var bodyparser = require('body-parser');
var path = require('path');
var fs = require('fs');

var options = {
    promiseLib: promise,
    query(e) {
        console.log('QUERY:', e.query);
    }
};

var pgp = require('pg-promise')(options);
var app = new express();

var connectionString = 'postgres://postgres:root1@localhost:5432/srikanth';
var db = pgp(connectionString);

app.use(express.static(path.resolve(__dirname, "public")));
app.use(bodyparser.json({
    limit: '10mb',
    extended: true
}));
app.use(bodyparser.urlencoded({
    limit: '6mb',
    extended: true
}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/user/post', (req, res, next) => {
    console.log(req.body);
    var ei = req.body.empId;
    var empName = req.body.empName;
    var empRole = req.body.empRole;
    var empMail = req.body.empMail;
    var empDob = req.body.empDob;
    var empAddress = req.body.empAddress;
    var empPanNumber = req.body.empPanNumber;
    var empPfNumber = req.body.empPfNumber;
    var password = req.body.password;
    db.any('insert into users(emp_role,emp_name,emp_id,emp_mail,emp_dob,emp_address,emp_password,emp_pan_number,emp_pf_number) values($1,$2,$3,$4,$5,$6,$7,$8,$8)',
        [empRole, empName, ei, empMail, empDob, empAddress, password, empPanNumber, empPfNumber]).then((data) => {
            res.send(data)
        })
})
app.get('/user/get', (req, res, next) => {
    db.any('select * from users').then((data) => {
        // console.log(data);
        res.send(data)
    })
})
app.get('/user/employee', (req, res, next) => {
    db.any("select * from users where emp_role != 'admin'").then((data) => {
        // console.log(data);
        res.send(data)
    })
})
app.get('/user/employee/admin', (req, res, next) => {
    db.any("select * from users where emp_role = 'admin'").then((data) => {
        // console.log(data);
        res.send(data)
    })
})
app.get('/user/getById/:empId', (req, res, next) => {
    // console.log(req.params.empId);
    db.any("select * from users where emp_id = $1", [req.params.empId]).then((data) => {
        // console.log(data);
        res.send(data);
    })
})

// user/roleName/
// app.get('/user/roleName/:empId', (req, res, next) => {
//     console.log(req.params.empId);
//     db.any("select  from users where emp_id = $1", [req.params.empId]).then((data) => {
//         // console.log(data);
//         res.send(data);
//     })
// })
app.get('/user/getById/image/:empId', (req, res, next) => {
    // console.log(req.params.empId);
    db.any("select * from users where emp_id = $1", [req.params.empId]).then((data) => {
        // console.log(data);
        // res.send(data)
        // ---
        var images = [];
        userid = 1
        var i = 0;
        // console.log(data[0].emp_id);
        var fn = 'http://localhost:3400/pics/' + data[0].emp_id + '/';
        const directoryPath = path.resolve(__dirname, './public/pics/' + data[0].emp_id + "/");
        // console.log(directoryPath)
        // console.log("------")
        fs.readdir(directoryPath, 'utf8', (err, files) => {
            // console.log(files);

            if (err) {
                return console.log('Unable to scan directory: ' + err);
                // console.log(file)
            }
            files.forEach(element => {
                // console.log(element);

                images[i] = fn + element;
                i++;
            });
            // console.log(images);
            res.send(images);
        })

    })
})



app.post('/user/login', (req, res, next) => {
    // console.log(req.body);
    var empid = req.body.empId;
    var pass = req.body.password;
    db.any('select * from users where emp_id=$1 and emp_password=$2', [empid, pass]).then((data) => {
        // console.log(data);
        res.send(data)
    })
})


app.post('/user/emp/request', (req, res, next) => {
    // console.log(req.body);
    var f = req.body.from;
    var t = req.body.to;
    db.any('insert into request(reqfrom,reqto) values($1,$2)', [f, t]).then((data) => {
        // console.log(data);
        res.send(data)
    })
})
// user/link/workDone
app.put('/user/link/workDone', (req, res, next) => {
    console.log(req.body);
    var f = req.body.linkId;
    var t = req.body.workDone;
    db.any('update links set linkwork=$2 where linkid= $1', [f, t]).then((data) => {
        // console.log(data);
        res.send(data)
    })
})

app.get('/user/link/emp/workDone/:id', (req, res, next) => {
    
    db.any('select * from links where linkfrom=$1',[req.params.id]).then((data) => {
        res.send(data)
    })
})

app.get('/user/emp/request/get/:id', (req, res, next) => {
    
    db.any('select * from request where reqto=$1',[req.params.id]).then((data) => {
        // console.log(data);
        res.send(data)
    })
})
// user/emp/request/get/links

app.get('/user/emp/request/get/links/:id', (req, res, next) => {
    console.log(req.params.id);
    console.log("============");
    
    db.any('select * from links where linkto=$1',[req.params.id]).then((data) => {
        console.log(data);
        res.send(data)
    })
})

app.post('/user/links/post', (req, res, next) => {
    // console.log(req.body);
    // console.log(req.body.length);

    // console.log(req.body.data);
    // console.log(req.body.data.length);

    for (let i = 0; i < req.body.data.length; i++) {
        // console.log(req.body.data[i].col);

        db.any('insert into links(linkid,linkname,linkwork,linkfrom,linkto) values($1,$2,0,$3,$4)', [req.body.data[i].index, req.body.data[i].col, req.body.data[i].senderId,req.body.data[i].receiverId]).then((data) => {
            // console.log(data);
            // res.send(data)
        })

    }
    // var empid = req.body.empId;
    // var pass = req.body.password;
    // db.any('select * from users where emp_id=$1 and emp_password=$2', [empid, pass]).then((data) => {
    //     console.log(data);
    //     res.send(data)
    // })
})


// imageUpload
app.post('/user/imageUpload', (req, res, next) => {
    // console.log("------------");

    // console.log(req.body);
    // var empid = req.body.empId;
    // var pass = req.body.password;
    // db.any('select * from users where emp_id=$1 and emp_password=$2', [empid, pass]).then((data) => {
    //     console.log(data);
    //     res.send(data)
    // })

    var i = req.body.id;
    var vid = req.body.video;
    var ext = req.body.extension;
    var fn = ext;
    var dir = './public';
    var dirs = './public/pics';
    var dirrs = './public/pics/' + i;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    if (!fs.existsSync(dirs)) {
        fs.mkdirSync(dirs);
    }
    if (!fs.existsSync(dirrs)) {
        fs.mkdirSync(dirrs);
    }
    if (ext != "NoImg") {
        fs.writeFile('./public/pics/' + i + '/' + fn, vid, 'base64', (err) => {
            if (err) {
                res.status(200).send({
                    err
                })
            } else {
                res.status(200).send({
                    i
                })
            }
        })
    }
})
// ----------------------------------
app.listen(3400, (err) => {
    if (err) {
        console.log('Unable to start server ...')
    }
    else {
        console.log('server Started at : ' + 'http://localhost:3400/')
    }
})