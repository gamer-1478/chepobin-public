const firebase = require("../firebase");
require("firebase/firestore");

const db = firebase.firestore();

async function SendChep(data, docname, is_protected, password = "none") {
  console.log(
    `triggered with data "${data}", name "${docname}", protected = ${is_protected} and password = ${password}`
  );
  const docRef = db.collection("cheps").doc(docname);
  await docRef.set({
    chep: data.toString(),
    created: Date.now(),
    is_protected: is_protected,
    password: password,
  });
}

async function GetChep(docname, password = 0) {
  /* custom internal server error code's
  1 = doc doesn't exist, inavlid document 
  2 = password doesn't match
  3 = the document is password protected but no password was given
  */
  console.log(
    `triggered with docname "${docname.toString()}" and password = ${password}`
  );
  const doc = await db.collection("cheps").doc(docname).get();
  let docData = doc.data();
  //chep is chep exists, and has its own property of chep
  if (doc.exists && docData.hasOwnProperty("chep")) {
    //check if the document is protected
    if (docData.is_protected === true) {
      if (password != 0) {
        //check if password matches
        if (docData.password.toString() === password.toString()) {
          return docData;
        } else {
          return 2;
        }
      } else {
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
    console.log("error triggered error number 1");
    return 1;
  }
}

async function isPasswordProtected(docname) {
  console.log(`triggered with docname "${docname.toString()}"`);
  const doc = await db.collection("cheps").doc(docname).get();
  let docData = doc.data();
  //chep is chep exists, and has its own property of chep
  if (
    doc.exists &&
    docData.hasOwnProperty("chep") &&
    docData.hasOwnProperty("is_protected")
  ) {
    if (docData.is_protected == true) {
      return true;
    } else {
      return false;
    }
  } else {
    return "doc doesn't exist";
  }
}
async function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const doc = await db.collection("cheps").doc(result).get();
  if (!doc.exists) {
    return result;
  } else {
    await db
      .collection("cheps")
      .doc(result)
      .set({
        error:
          "generated the same random string again. Running out of strings are we?",
      });
    return makeid(10);
  }
}

module.exports = {
  SendChep,
  GetChep,
  isPasswordProtected,
  makeid,
};
