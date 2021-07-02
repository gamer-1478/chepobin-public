<svelte:head>
  <title>ChepBin</title>
</svelte:head>

<body>
  <div>
    <h1>ChepBin API</h1>
    <h3>Documentation Of Post To Save Data in server</h3>
    <p>
      {'post data in the format of {"chep":"somechep", "is_protected":false} to url chepobin.tk/api/sendchep'}
    </p>
    <p>
      {'or if you wanna add password {"chep":"somechep", "is_protected":true, "chep_password":"123456"} expect a response in {"chep_id":"your chep id"}'}
    </p>
  </div>
  <div>
    <h3>Documentation Of Post And Get To Retrieve Data from the server</h3>
    <p>
      {`use url chepobin.tk/api/getchep?chep_id=<your chep id> if the chep id is correct and its not password protected then expect a response in {"chep":<the chep contents as string>}`}
    </p>
    <p>
      {`if you have a password protected chep, you need to use post method. and send body {"chep_id":"your_id", "chep_password":"your password"} `}
    </p>
    <p>
      {`or have url as chepobin.tk/api/getchep?chep_id="yourid" and have request as {"chep_password": "your password"}`}
    </p>
    <p>
      {`expect the same form of response as {"chep":<the chep contents as string>}`}
    </p>
  </div>
  <div>
    <h3>Documentation Of miscellaneous other functions on the server</h3>
    <p>
      {`use url chepobin.tk/api/ispasswordprotected?chep_id=<your chep id> if the chep id is correct and then expect a response in {"is_protected":true || false}`}
    </p>
    <p>
      {`this  function can be used to check beforehand if a chep is password protected or not.`}
    </p>
  </div>
</body>
