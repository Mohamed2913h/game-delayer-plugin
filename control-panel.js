const stats = JSON.parse($persistentStore.read('game_delayer_stats') || '{"gamesDetected":0,"requestsDelayed":0,"totalDelayTime":0}');

const panel = {
    title: "Game Delayer",
    content: `## Game Request Delayer v1.0
    
### Settings
- Delay: **200ms**
- Status: **Active**

### Statistics
| Metric | Value |
|--------|-------|
| Games Detected | ${stats.gamesDetected} |
| Requests Delayed | ${stats.requestsDelayed} |
| Total Delay Time | ${stats.totalDelayTime}ms |

### Supported Games
• PUBG Mobile
• Call of Duty Mobile  
• Free Fire
• Mobile Legends
• Clash of Clans
• Clash Royale
• Genshin Impact
• Roblox
• Fortnite

### Note
200ms delay doesn't affect gameplay, only slows network requests slightly.

---
*Last update: ${new Date().toLocaleTimeString()}*`
};

$done(panel);
