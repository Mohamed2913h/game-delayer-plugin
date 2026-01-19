// Game Delayer Control Panel
(() => {
    'use strict';
    
    // Get stats from storage
    const statsStr = $persistentStore.read('game_delayer_stats');
    const stats = statsStr ? JSON.parse(statsStr) : {
        gamesDetected: 0,
        requestsDelayed: 0,
        totalDelayTime: 0
    };
    
    // Create panel content
    const content = `
🎮 **Game Request Delayer v1.1**
━━━━━━━━━━━━━━━━━━━━
📊 **Statistics**
• Games Detected: ${stats.gamesDetected}
• Requests Delayed: ${stats.requestsDelayed}
• Total Delay Added: ${stats.totalDelayTime}ms
• Average Delay: ${stats.requestsDelayed > 0 ? (stats.totalDelayTime / stats.requestsDelayed).toFixed(0) : 0}ms

⚙️ **Settings**
• Status: ✅ ACTIVE
• Delay Amount: 200ms
• Detection: Automatic

🎯 **Supported Games**
• PUBG Mobile • Free Fire
• COD Mobile • Mobile Legends  
• Clash of Clans • Clash Royale
• Genshin Impact • Roblox
• Fortnite • +20 more games

📝 **How to Use**
1. Open any mobile game
2. Plugin auto-detects game traffic
3. Delays requests by 200ms
4. Statistics update in real-time

━━━━━━━━━━━━━━━━━━━━
🔄 Last Update: ${new Date().toLocaleTimeString()}
    `;
    
    // Return panel object
    $done({
        title: "🎮 Game Delayer",
        content: content,
        icon: "gamecontroller",
        "icon-color": "#FF6B6B"
    });
})();
