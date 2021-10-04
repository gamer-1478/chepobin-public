<script>
  let chep_password = "";
  let chep = "";
  let readonly = false;
  let resp = 100;

  if (screen.width < 768) {
    resp = 30;
  }

  window.addEventListener("resize", () => {
    if (screen.width < 768) {
      resp = 30;
    } else {
      resp = 100;
    }
  });

  const post = async (chep, password = "") => {
    let is_protected = password.length != 0 ? true : false;
    let formData = {
      chep: chep,
      is_protected: is_protected,
      chep_password: password,
    };

    try {
      const response = await await fetch(
        window.location.origin + "/api/sendchep",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return { success: true, message: await response.json() };
      } else {
        return { success: false, message: await response.text() };
      }
    } catch (err) {
      return { success: false, message: err };
    }
  };

  const handleChep = () => {
    if (document.getElementById("comments").value.trim().length !== 0) {
      chep = document.getElementById("comments").value;
    } else {
      chep == "";
    }
  };

  const handleChepPassword = () => {
    if (
      document.getElementsByClassName("chep_password")[0].value.trim()
        .length !== 0
    ) {
      chep_password = document.getElementsByClassName("chep_password")[0].value;
    } else {
      chep_password == "";
    }
  };

  window.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (e.target.id === "set_chep") {
      handleChep();
      handleChepPassword();
      if (chep.length != 0) {
        let dataRetrieved = await post(chep, chep_password);
        document.getElementById("comments").value =
          "chep id = " + dataRetrieved.message.chep_id ||
          dataRetrieved.message.error ||
          dataRetrieved.message;
        readonly = true;
      } else {
        document.getElementById("comments").value =
          "Hey... add Some Data in the Chep!";
      }
    }
  });
  
</script>

<svelte:head>
  <title>ChepoBin</title>
</svelte:head>

<body>
  <div class="mainGet height-100">
    <div class="top-title">
      <h1>Send Chep</h1>
    </div>
    <textarea
      {readonly}
      id="comments"
      style="font-size:1.2em;"
      cols={resp}
      rows="20"
    />
    <div class="searchbar">
      <input
        type="password"
        placeholder="Enter Chep Password"
        class="chep_password"
      />
    </div>
    <form id="set_chep">
      <button type="submit" disabled={readonly}>Send Chep</button>
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
    button {
      margin-top: 2vw;
      height: 10vw;
      width: 25vw;
      border: none;
      text-align: center;
      padding-left: 1vw;
      padding-right: 1vw;
      color: white;
      background-color: #000;
      font-size: 3.5vw;
      border-radius: 5px;
      margin-top: 3vh;
    }
  }
</style>
