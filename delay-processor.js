// Game Request Delayer - Main Script
(async () => {
    'use strict';
    
    const DELAY_MS = 200; // Delay amount
    
    // Initialize stats
    let stats = JSON.parse($persistentStore.read('game_delayer_stats') || '{"gamesDetected":0,"requestsDelayed":0,"totalDelayTime":0}');
    
    // Game domains to detect
    const GAME_PATTERNS = [
        /\.pubg\./i, /\.tencentgames\./i,
        /\.activision\./i, /\.codmobile\./i,
        /\.garena\./i, /\.freefire\./i,
        /mobilelegends/i, /\.moonton\./i,
        /\.supercell\./i, /clashofclans/i,
        /clashroyale/i, /\.mihoyo\./i,
        /\.hoyoverse\./i, /\.roblox\./i,
        /\.epicgames\./i, /fortnite/i,
        /\.steam\./i, /steampowered/i,
        /\.xbox\./i, /playstation/i
    ];
    
    // Check if URL is a game request
    function isGameRequest(url) {
        if (!url) return false;
        return GAME_PATTERNS.some(pattern => pattern.test(url));
    }
    
    // Handle request
    if (typeof $request !== 'undefined') {
        const url = $request.url || '';
        
        if (isGameRequest(url)) {
            // Update statistics
            stats.gamesDetected++;
            stats.requestsDelayed++;
            stats.totalDelayTime += DELAY_MS;
            
            // Save stats
            $persistentStore.write(JSON.stringify(stats), 'game_delayer_stats');
            
            // Log (for debugging)
            console.log(`🎮 Game request detected: ${url.substring(0, 50)}...`);
            console.log(`⏳ Delaying by ${DELAY_MS}ms`);
            
            // Apply delay
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        }
        
        $done({ request: $request });
    }
    
    // Handle panel request
    if (typeof $response !== 'undefined') {
        $done({});
    }
})();
