<script>
  import API from "./pages/Api.svelte";
  import Get from "./pages/Get.svelte";
  import Send from "./pages/Send.svelte";
  import Four_zero_four from "./pages/404.svelte";
  import { Router, Route, Link } from "svelte-navigator";
  import Home from "./pages/Home.svelte";
</script>

<svelte:head>
  <title>ChepBin</title>
</svelte:head>

<Router>
  <main>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/api">
      <API />
    </Route>
    <Route path="/get">
      <Get />
    </Route>
    <Route path="/send">
      <Send />
    </Route>
    <Route component={Four_zero_four} />
  </main>
</Router>
