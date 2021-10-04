const express = require('express');
const app = express();
const path = require('path');
const firebase = require('./firebase');
const db = firebase.firestore();
const port = process.env.PORT || 5002;

require('firebase')
require('firebase/firestore')
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function SendChep(data, docname, is_protected, password = "none") {
    console.log(`triggered with data "${data}", name "${docname}", protected = ${is_protected} and password = ${password}`)
    const docRef = db.collection('cheps').doc(docname);
    await docRef.set({
        chep: data.toString(),
        created: Date.now(),
        is_protected: is_protected,
        password: password
    });
}

async function GetChep(docname, password = 0) {
    /* custom internal server error code's
    1 = doc doesn't exist, inavlid document 
    2 = password doesn't match
    3 = the document is password protected but no password was given
    */
    console.log(`triggered with docname "${docname.toString()}" and password = ${password}`)
    const doc = await db.collection('cheps').doc(docname).get();
    let docData = doc.data();
    //chep is chep exists, and has its own property of chep
    if (doc.exists && docData.hasOwnProperty('chep')) {
        //check if the document is protected
        if (docData.is_protected === true) {
            if (password != 0) {
                //check if password matches
                if (docData.password.toString() === password.toString()) {
                    return docData;
                }
                else {
                    return 2;
                }
            }
            else {
                return 3;
            }
        }
        // if the document is not protected then just server the chep
        else {
            return docData;
        }
    }
    //chep doesn't exist
    else {
        console.log("error triggered error number 1")
        return 1;
    }
}

async function isPasswordProtected(docname) {
    console.log(`triggered with docname "${docname.toString()}"`)
    const doc = await db.collection('cheps').doc(docname).get();
    let docData = doc.data();
    //chep is chep exists, and has its own property of chep
    if (doc.exists && docData.hasOwnProperty('chep') && docData.hasOwnProperty('is_protected')) {
        if (docData.is_protected == true) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return "doc doesn't exist"
    }

}
async function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_=';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    const doc = await db.collection('cheps').doc(result).get();
    if (!doc.exists) {
        return result;
    }
    else {
        await db.collection('cheps').doc(result).set({ "error": "generated the same random string again. Running out of strings are we?" });
        return makeid(10);
    }
}

//get the chep and save it in firebase firestore
app.post('/api/sendchep', async (req, res) => {
    let chep_id = await makeid(10);
    console.log(req.body);
    if (req.body.hasOwnProperty('chep') && req.body.hasOwnProperty('is_protected')) {
        if (req.body.is_protected === true && req.body.hasOwnProperty('chep_password')) {
            SendChep(req.body.chep.toString(), chep_id.toString(), req.body.is_protected, req.body.chep_password.toString())
            res.send({ "chep_id": chep_id.toString() })
            console.log("save with password complete")
        }
        else {
            SendChep(req.body.chep.toString(), chep_id.toString(), false)
            res.send({ "chep_id": chep_id.toString() })
            console.log("save without password complete")
        }
    }
    else {
        res.status(400).send({ "error": "bad request, malformed api use, please see documentation at github to learn more" });
    }
});

//tell user about their wrong usage of sendchep. get is not supported on sendchep only post.
app.get('/api/sendchep', (req, res) => {
    res.send({
        "error": "post only area.",
        "documentation": 'post data in the format of {"chep":"somechep", "is_protected":false} or if you wanna add password {"chep":"somechep", "is_protected":true, "chep_password":"123456"} expect a response in {"chep_id":"your chep id"}'
    })
});

//send the chep to the user after retrieving from firebase firestore (post method for chep with passwords)
app.post('/api/getchep', async (req, res) => {
    let chep_id = req.query.chep_id || null;
    console.log(chep_id);
    let getResponse;
    let getResponseTriggered = false;

    if (req.body.hasOwnProperty('chep_id')) {
        if (req.body.hasOwnProperty('chep_password')) {
            getResponse = await GetChep(req.body.chep_id, req.body.chep_password)
            getResponseTriggered = true;
        }
    }
    else if (req.body.hasOwnProperty('chep_password') && chep_id !== null) {
        getResponse = await GetChep(chep_id, req.body.chep_password)
        getResponseTriggered = true;
    }
    else if (chep_id !== null) {
        getResponse = await GetChep(chep_id);
        getResponseTriggered = true;
    }
    else {
        res.status(400).send({ "error": "bad chep id" })
    }
    if (getResponseTriggered !== false) {
        if (getResponse === 1) {
            res.status(400).send({ "error": "the chep doesn't exist. please check your chep id" })
        }
        else if (getResponse === 2) {
            res.status(400).send({ "error": "password doesn't match" })
        }
        else if (getResponse === 3) {
            res.status(400).send({
                "error": 'the chep is password protected but no password was given.',
                "documentation": 'please use post and send body {"chep_id":"your_id", "chep_password":"your password"} or have url as /getchep?chep_id="yourid" and have request as {"chep_password": "your password"}'
            })
        }
        else {
            res.send({ "chep": getResponse.chep })
        }
    }
});

//send the chep to the user after retrieving from firebase firestore (Get method for chep without passwords)
app.get('/api/getchep', async (req, res) => {
    let chep_id = req.query.chep_id || "no id"

    if (chep_id !== "no id") {
        let getResponse = await GetChep(chep_id);
        if (getResponse === 1) {
            res.status(400).send({ "error": "the chep doesn't exist. please check your chep id" })
        }
        else if (getResponse === 2) {
            res.status(400).send({ "error": "password doesn't match" })
        }
        else if (getResponse === 3) {
            res.status(400).send({
                "error": 'the chep is password protected but no password was given, and none can be given in a get request.',
                "documentation": 'please use post and send body {"chep_id":"your_id", "chep_password":"your password"} or have url as /getchep?chep_id="yourid" and have request as {"chep_password": "your password"}'
            })
        }
        else {
            res.send({ "chep": getResponse.chep })
        }
    }
    else {
        res.send({ "chepid ": chep_id })
    }
})

app.get('/api/ispasswordprotected', async (req, res) => {
    let chep_id = req.query.chep_id || "no id"

    if (chep_id !== "no id") {
        let response = await isPasswordProtected(chep_id);
        if (response == true) {
            res.send({ "is_protected": true })
        }
        else if (response == false) {
            res.send({ "is_protected": false })
        }
        else {
            res.status(400).send({ "error": response })
        }
    }
    else {
        res.status(400).send({ "error": "no chep_id given" })
    }
})
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () =>
    console.log(`Server is running on port ${port} likely on localhost, if not on localhost then you are in production but you already know that!`));
