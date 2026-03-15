export function middleware() {
  return new Response(
    "🚧 Site temporarily under maintenance. Please come back later.",
    { status: 503 }
  );
}
