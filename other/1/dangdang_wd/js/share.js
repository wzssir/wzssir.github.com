window.shareData = {
		imgUrl: "img/share.jpg",
		timeLineLink: window.location.href,
        tTitle: "青春与职场，敢做敢当当！",
		tContent: "测测你现在做的是你最爱的工作吗？快来看看你最适合什么工作！"
	};
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "img_url": window.shareData.imgUrl,
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        }, function(e) {
        	switch (e.err_msg) {
                        case "send_app_msg:cancel":
                            break;
                        case "send_app_msg:fail":
                            break;
						case "send_app_msg:confirm":
						case "send_app_msg:ok":
							radar(items);
						}
        })
    });
    WeixinJSBridge.on('menu:share:timeline', function(argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": window.shareData.imgUrl,
            "img_width": "120",
            "img_height": "120",
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        }, function(e) {
        	switch (e.err_msg) {
                        case "share_timeline:cancel":
                            break;
                        case "share_timeline:fail":
                            break;
						case "share_timeline:confirm":
						case "share_timeline:ok":
							radar(items);
						}
        });
    });
}, false);

