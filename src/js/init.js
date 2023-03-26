async function init() {
  try {
    /* You need to run register() once to register */
    // await register();
    const token = await login();
    await getTodayMatches(token);
    await getAllMatches(token);
    await getStandings(token);
  } catch (error) {
    console.log(error);
  }
}
init();
