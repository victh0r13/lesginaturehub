// Cloudflare Worker in front of the static export: redirects www to the apex domain, serves everything else from assets.
type Env = { ASSETS: { fetch: (request: Request) => Promise<Response> } };

const APEX = "lesignature.com.br";

const worker = {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.hostname === `www.${APEX}`) {
      url.hostname = APEX;
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
