/*
===========================================
PUBG MOBILE COMPLETE REQUEST DELAYER
Delay ALL PUBG requests by 200ms - HTTP REQUEST
Author: Mohamed2913h
Version: 2.0
===========================================
*/

const DELAY_MS = 200; // التأخير 200 مللي ثانية

if (typeof $request !== 'undefined') {
    const url = $request.url || '';
    const method = $request.method || 'GET';
    const headers = $request.headers || {};
    
    // قائمة جميع دومينات PUBG (شاملة)
    const PUBG_HOSTNAMES = [
        // الخوادم الأساسية
        'proximabeta.com',      // الخادم الرئيسي
        'pgimx.com',           // خوادم الأمريكيتين
        'pubg.com',            // الدومين الرسمي
        
        // منصات المطورين
        'tencentgames.com',    // منصة تنسنت
        'tencent.com',         // الشركة الأم
        'krafton.com',         | PUBG كورب
        
        // أسماء بديلة
        'battlegroundsmobile.com',
        'pubgmobile.com',
        'pubgmobile.in',
        'pubgmobileglobal.com',
        
        // مناطق جغرافية
        'pubgmx.com',          // المكسيك
        'pubgkr.com',          // كوريا
        'pubgjp.com',          | اليابان
        'pubgsea.com',         | جنوب شرق آسيا
        'pubgmea.com',         | الشرق الأوسط
        'pubgeu.com',          // أوروبا
        'pubgna.com',          // أمريكا الشمالية
        
        // واجهات برمجة التطبيقات
        'api-pubg.com',
        'game-pubg.com',
        'match-pubg.com',
        'lobby-pubg.com',
        'stats-pubg.com',
        'inventory-pubg.com',
        
        // مزودو خدمات CDN (يستخدمهم PUBG)
        'akamaiedge.net',
        'akamai.net',
        'cloudfront.net',
        'amazonaws.com'
    ];
    
    // الحصول على اسم النطاق من URL
    function extractHostname(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.toLowerCase();
        } catch (e) {
            // إذا كان URL غير صالح، حاول استخراج النطاق يدوياً
            const match = url.match(/^(?:https?:\/\/)?([^\/]+)/i);
            return match ? match[1].toLowerCase() : '';
        }
    }
    
    const hostname = extractHostname(url);
    
    // التحقق إذا كان الطلب لـ PUBG
    const isPUBGRequest = PUBG_HOSTNAMES.some(domain => {
        return hostname.includes(domain) || 
               hostname.endsWith('.' + domain) ||
               (domain.includes('.') && hostname === domain);
    });
    
    if (isPUBGRequest) {
        // تسجيل الطلب في الكونسول
        console.log(`🎮 [PUBG REQUEST DETECTED]`);
        console.log(`   URL: ${url.substring(0, 80)}...`);
        console.log(`   Method: ${method}`);
        console.log(`   Hostname: ${hostname}`);
        console.log(`   Applying ${DELAY_MS}ms delay...`);
        
        // تحديث الإحصائيات
        let stats = JSON.parse($persistentStore.read('pubg_delayer_stats') || '{"total":0,"last_domain":"","last_time":""}');
        stats.total++;
        stats.last_domain = hostname;
        stats.last_time = new Date().toLocaleTimeString();
        $persistentStore.write(JSON.stringify(stats), 'pubg_delayer_stats');
        
        // تطبيق التأخير باستخدام Promise
        const delayPromise = new Promise((resolve) => {
            setTimeout(() => {
                console.log(`✅ [DELAY COMPLETE] Request delayed by ${DELAY_MS}ms`);
                resolve();
            }, DELAY_MS);
        });
        
        // انتظار انتهاء التأخير
        await delayPromise;
        
        // إرجاع الطلب بعد التأخير
        $done({ request: $request });
        return;
    }
    
    // إذا لم يكن طلب PUBG، مرره بدون تأخير
    $done({ request: $request });
} else {
    // إذا لم يكن هناك طلب (للوحة التحكم)
    $done({});
}
