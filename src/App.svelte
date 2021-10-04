<script>
  import API from "./pages/Api.svelte";
  import Get from "./pages/Get.svelte";
  import Send from "./pages/Send.svelte";
  import { Router, Route } from "svelte-navigator";
  import Home from "./pages/Home.svelte";
  import Header from "./layout/header.svelte";
  import Footer from "./layout/footer.svelte";
</script>

<svelte:head>
  <title>ChepoBin</title>
</svelte:head>

<Router>
  <header>
    <Header />
  </header>
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
    <Route>
      <Get chep_id={window.location.pathname} />
    </Route>
  </main>
  <footer>
    <Footer />
  </footer>
</Router>
