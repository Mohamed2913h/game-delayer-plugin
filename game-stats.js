// Game Stats Panel
const stats = {
    delayed: 15,
    games: ["PUBG", "Free Fire", "COD"],
    active: true
};

const panel = {
    title: "Game Delayer",
    content: `Status: ACTIVE ✅

Requests Delayed: ${stats.delayed}
Active Games: ${stats.games.join(", ")}

Delay: 200ms per request
Last updated: ${new Date().toLocaleTimeString()}`
};

$done(panel);
