<script>
  import { onMount } from "svelte";
  export let chep_id = "";
  let chep_password = "";
  let resp = 100;

  const handleChepId = () => {
    if (
      document.getElementsByClassName("chep_id")[0].value.trim().length !== 0
    ) {
      chep_id = document.getElementsByClassName("chep_id")[0].value;
    } else {
      chep_id == "";
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

  onMount(async () => {
    if (screen.width < 768) {
      resp = 30;
    }

    if (chep_id != "") {
      //remove backslash, and change window url.
      chep_id = chep_id.replace(/\//g, "");
      window.history.pushState({}, "", window.location.origin + "/" + chep_id);
      document.getElementsByClassName("chep_id")[0].value = chep_id;
      updateTextBoxWithChep();
    } else {
      document.getElementById("myTextarea").value =
        "Hey there, enter a chep ID and press GetChep";
    }
    
  });

  window.addEventListener("resize", () => {
    const screenWidth = screen.width;
    if (screenWidth < 768) {
      resp = 30;
    } else {
      resp = 100;
    }
  });

  window.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (e.target.id === "get_chep") {
      updateTextBoxWithChep();
    }
  });

  const get = async (chep_id, password = "") => {
    let formData = { chep_id: chep_id, chep_password: password };
    try {
      const response = await await fetch(
        window.location.origin + `/api/getchep?chep_id=${chep_id}`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );
      const contentType = response.headers.get("content-type");
      console.log(contentType);
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return { success: true, message: await response.json() };
      } else {
        return { success: false, message: await response.text() };
      }
    } catch (err) {
      return { success: false, message: err };
    }
  };

  const updateTextBoxWithChep = async () => {
    await handleChepId();
    await handleChepPassword();
    if (chep_id != "") {
      let dataRetrieved = await get(chep_id, chep_password);
      console.log(dataRetrieved.message.chep, dataRetrieved.message);
      document.getElementById("myTextarea").value =
        dataRetrieved.message.chep || dataRetrieved.message;
    } else {
      document.getElementById("myTextarea").value =
        "No Chep ID Was Given. Please enter A ID To Get";
    }
  };

</script>

<svelte:head>
  <title>ChepBin</title>
</svelte:head>

<body>
  <div class="mainGet height-100">
    <div class="top-title">
      <h1>Get Chep</h1>
    </div>
    <div class="searchbar">
      <input type="text" placeholder="Enter Chep Id" class="chep_id" />
    </div>
    <div class="searchbar">
      <input
        type="password"
        placeholder="Enter Chep Password"
        class="chep_password"
      />
    </div>
    <textarea
      name="myTextarea"
      id="myTextarea"
      style="font-size:1.2em;"
      cols={resp}
      rows="20"
      >Loading Your Chep Data!
    </textarea>
    <form id="get_chep">
      <button type="submit">Get Chep</button>
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
  textarea {
    margin-top: 3vw;
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
      margin-top: 0vh;
    }
  }
</style>
