<script>
  window.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (e.target.id === "retrieve") {
      window.location.href = window.location.origin + "/get";
    }
    if (e.target.id === "add_chep") {
      window.location.href = window.location.origin + "/send";
    }
  });

  let resp = false;
  const screenWidth = screen.width;
  if (screenWidth < 768) {
    resp = true;
  }
  window.addEventListener("resize", () => {
    const screenWidth = screen.width;
    if (screenWidth < 768) {
      resp = true;
    } else {
      resp = false;
    }
  });
</script>

<svelte:head>
  <title>ChepBin</title>
</svelte:head>
<body>
  <div class="mainGet height-100">
    <div class="top-title">
      <h1>Chose From Below If you want to retrieve a chep or add a chep</h1>
    </div>
    <form id="retrieve">
      <button type="submit">Retrieve</button>
    </form>
    <form id="add_chep">
      <button type="submit">Add Chep</button>
    </form>
  </div>
</body>

<style>
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
