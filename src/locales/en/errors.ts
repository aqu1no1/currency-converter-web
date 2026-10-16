export const errors = {
  network: 'No connection to the server. Check your internet and try again.',
  timeout: 'The server took too long to respond. Try again.',
  invalidResponse: 'We got an unexpected response from the server.',
  unexpected: 'Something went wrong. Try again.',
  states: {
    unavailable: {
      title: "Couldn't load the rates",
      description:
        "The server didn't respond. It may be quick: try again in a moment or check the sync status.",
    },
    notReady: {
      title: 'The rates are on their way',
      description:
        "The first update hasn't finished yet, so there are no rates to convert. Come back in a few minutes.",
    },
    refresh: 'Refresh',
    seeStatus: 'See status',
    syncFailed:
      '<strong>The last update failed.</strong> The rates below are from {{date}} and will be updated on the next sync.',
  },
  notFound: {
    label: 'Error 404',
    title: 'Page not found',
    description:
      'The address may have changed or been mistyped. How about going back home or straight to the converter?',
    goHome: 'Go to home',
    openConverter: 'Open the converter',
  },
};
