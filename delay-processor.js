// Delay game requests by 200ms
(async () => {
    const DELAY_MS = 200;
    let stats = {
        gamesDetected: 0,
        requestsDelayed: 0,
        totalDelayTime: 0
    };

    // Game domains list
    const GAME_DOMAINS = [
        '*.pubg.com', '*.tencentgames.com',
        '*.activision.com', '*.codmobile.com',
        '*.garena.com', '*.freefire.com',
        '*.mobilelegends.com', '*.moonton.com',
        '*.supercell.com', '*.clashofclans.com',
        '*.clashroyale.com', '*.mihoyo.com',
        '*.hoyoverse.com', '*.roblox.com',
        '*.epicgames.com', '*.fortnite.com',
        '*.steam.com', '*.steampowered.com',
        '*.xbox.com', '*.playstation.com',
        '*.unity3d.com', '*.unrealengine.com'
    ];

    function isGameRequest(url) {
        try {
            const hostname = new URL(url).hostname;
            return GAME_DOMAINS.some(pattern => {
                const regex = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
                return regex.test(hostname);
            });
        } catch {
            return false;
        }
    }

    if (typeof $request !== 'undefined') {
        if (isGameRequest($request.url)) {
            console.log(`Game delay: ${DELAY_MS}ms`);
            
            stats.gamesDetected++;
            stats.requestsDelayed++;
            stats.totalDelayTime += DELAY_MS;
            
            // Save stats
            $persistentStore.write(JSON.stringify(stats), 'game_delayer_stats');
            
            // Apply delay
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        }
        $done({ request: $request });
    } else if (typeof $response !== 'undefined') {
        // Return stats for panel
        const savedStats = $persistentStore.read('game_delayer_stats');
        $done({
            response: {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: savedStats || JSON.stringify(stats)
            }
        });
    }
})();
