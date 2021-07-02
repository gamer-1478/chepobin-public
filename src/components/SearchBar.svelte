<script>
  export let placeholderText;
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const handleChange = () => {
    if (document.getElementById("searchBar").value.trim().length !== 0) {
      dispatch("message", {
        text: document.getElementById("searchBar").value,
      });
    } else {
      dispatch("message", {
        text: false,
      });
    }
  };
</script>

<div class="searchbar">
  <input
    type="text"
    placeholder={placeholderText.toString()}
    on:input={handleChange}
    id="searchBar"
  />
</div>

<style>
  .searchbar {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    border: none;
    border-bottom: 1px #000 solid;
    width: 13vw;
  }
  /*.searchbar svg {
    margin-bottom: 1.2vh;
    margin-right: 1vw;
    height: 0.9vw;
    width: 0.9vw;
  }*/
  .searchbar input {
    margin-bottom: 1.2vh;
    background-color: transparent;
    border: none;
    color: black;
    font-size: 1vw;
  }
  @media screen and (max-width: 768px) {
    .searchbar {
      width: 70vw;
      display: flex;
    }
    /*.searchbar svg {
      height: 2vh;
      width: 2vh;
      margin: 0;
      margin-right: 1vh;
      margin-bottom: 1vh;
    }*/
    .searchbar input {
      font-size: 2vh;
      margin-bottom: 1.2vh;
    }
  }
</style>
