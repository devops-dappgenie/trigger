export default {
	async fetch(request) {
	  const GITHUB_REPO = 'devops-dappgenie/trigger'; // Your repository details
	  const GITHUB_TOKEN = GITHUB_TOKEN_SECRET; // Accessed securely from secrets

	  const url = `https://api.github.com/repos/${GITHUB_REPO}/dispatches`;

	  if (request.method === 'GET') {
		try {
		  const response = await fetch(url, {
			method: 'POST',
			headers: {
			  'Authorization': `Bearer ${GITHUB_TOKEN}`,
			  'Accept': 'application/vnd.github.v3+json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  event_type: 'run-action', // Matches your workflow trigger
			  client_payload: { triggeredBy: 'Cloudflare Worker' }, // Optional payload
			}),
		  });

		  if (response.ok) {
			return new Response('GitHub Action triggered successfully!', { status: 200 });
		  } else {
			const errorText = await response.text();
			return new Response(`Failed to trigger GitHub Action: ${errorText}`, { status: 500 });
		  }
		} catch (error) {
		  return new Response(`Error: ${error.message}`, { status: 500 });
		}
	  }

	  return new Response('Invalid request method', { status: 405 });
	},
  };
