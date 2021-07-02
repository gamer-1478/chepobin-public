<script>
  let response1 = {};
  let chep_password = "";
  let chep = "";

  const post = async (chep, is_protected=false, password="") => {
    let formData = {
      chep: chep,
      is_protected: is_protected,
      chep_password: password,
    };
    try {
      const response = await (
        await fetch(window.location.origin+"/api/sendchep", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json; charset=utf-8" },
        })
      ).json();
      console.log(JSON.stringify(formData));
      console.log(response);
      response1 = response;
      return { success: true, message: response };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  const handleChep = () => {
    console.log(document.getElementById("comments").value)
    if (document.getElementById("comments").value.trim().length !== 0) {
      chep = document.getElementById("comments").value;
    } else {
      chep == "";

    }
  };

  const handleChepPassword = () => {
    if (document.getElementsByClassName("chep_password")[0].value.trim().length !== 0) {
      chep_password = document.getElementsByClassName("chep_password")[0].value;
    } else {
      chep_password == "";
    }
  };

  window.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (e.target.id === "set_chep") {
      await handleChep();
      await handleChepPassword();
      if (chep != "") {
        if (chep_password != "") {
          let dataRetrieved = await post(chep, true, chep_password);
          console.log(dataRetrieved);
          document.getElementById("comments").value =
            "chep id = "+ dataRetrieved.message.chep_id || dataRetrieved.message.error;
        } else {
          let dataRetrieved = await post(chep);
          console.log(dataRetrieved);
          document.getElementById("comments").value =
          "chep id = "+ dataRetrieved.message.chep_id || dataRetrieved.message.error;
        }
      } else {
        document.getElementById("comments").value =
          "Hey... add Some Data in the Chep!";
      }
    }
  });

</script>

<svelte:head>
  <title>ChepBin</title>
</svelte:head>

<body>
  <div class="mainGet height-100">
    <div class="top-title">
      <h1>Send Chep</h1>
    </div>
    <textarea id="comments" style="font-size:1.2em;" cols="100" rows="20"></textarea>
    <div class="searchbar">
      <input
        type="password"
        placeholder="Enter Chep Password"
        class="chep_password"
      />
    </div>
    <form id="set_chep">
    <button type="submit">Send Chep</button>
  </form>
  </div>
</body>

<style>
  .searchbar {
    margin-top: 1vw;
    height: auto;
    width: auto;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    border: none;
    border-bottom: 1px #000 solid;
    width: 13vw;
  }
  .searchbar input {
    margin-bottom: 1.2vh;
    background-color: transparent;
    border: none;
    color: black;
    font-size: 1vw;
  }
  @media screen and (max-width: 768px) {
    .searchbar {
      margin-top: 1vw;
      height: auto;
      width: auto;
      width: 70vw;
      display: flex;
    }
    .searchbar input {
      font-size: 2vh;
      margin-bottom: 1.2vh;
    }
  }
  .height-100 {
    height: 100%;
    width: 100%;
  }
  .mainGet {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .top-title {
    height: auto;
    width: auto;
  }
  button {
    height: 2.5vw;
    width: 8vw;
    border: none;
    text-align: center;
    padding-left: 1vw;
    padding-right: 1vw;
    color: white;
    background-color: #000;
    font-size: 1.2vw;
    border-radius: 5px;
    margin-top: 3vh;
  }
  button:hover {
    cursor: pointer;
  }
</style>
