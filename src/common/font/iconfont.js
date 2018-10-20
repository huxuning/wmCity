(function(window){var svgSprite='<svg><symbol id="icon-star" viewBox="0 0 1024 1024"><path d="M945.666246 478.74607 780.331943 620.419376c-10.354309 10.140428-15.173289 24.755988-12.654811 39.082962l39.048168 227.537931c3.024015 18.03459 0 30.943194-14.811021 41.709915-8.345462 6.096127-18.341597 9.188707-28.265073 9.188707-7.62195 0-15.316559-1.833853-22.364406-5.537375L532.513157 819.910209c-12.800128-6.741865-28.190368-6.741865-41.062131 0l-199.922689 112.509727c-16.252929 8.521479-35.886 7.082642-50.700091-3.650308-14.741433-10.786165-26.607237-23.677371-23.515681-41.729359l47.823439-232.264809c2.516431-14.326974-2.300503-28.946628-12.657882-39.086032L78.373665 478.74607c-13.162396-12.76431-17.835036-31.874447-12.227049-49.277627 5.680645-17.402157 20.710664-30.078459 38.833263-32.704388l226.460338-39.750189c14.385305-2.085598 26.825212-11.128989 33.225276-24.144021L468.941303 112.865855c8.054829-16.433039 24.738591-26.807815 43.076094-26.807815 18.337503 0 35.023311 10.374776 43.149776 26.807815l100.105637 219.986592c6.473746 13.033453 18.914676 22.076844 33.296911 24.162442l230.487241 39.731769c18.124645 2.62593 33.152618 15.319629 38.762652 32.722809C963.501282 446.8706 958.753937 465.981759 945.666246 478.74607z"  ></path></symbol><symbol id="icon-location" viewBox="0 0 1024 1024"><path d="M512.103132 320.120979a106.221743 106.221743 0 1 1-75.507022 31.354611A106.221743 106.221743 0 0 1 512.103132 320.120979m0-63.989002a170.850635 170.850635 0 1 0 120.939214 49.911422A169.570855 169.570855 0 0 0 512.103132 256.131977z"  ></path><path d="M805.172761 124.314633a407.609942 407.609942 0 0 0-586.139257 0 431.285873 431.285873 0 0 0 0 599.576948L512.103132 1024l293.069629-300.108419a431.285873 431.285873 0 0 0 0-599.576948z m-44.152411 557.344207l-248.917218 255.956007-248.917217-255.956007a365.377201 365.377201 0 0 1 0-508.712565 346.82039 346.82039 0 0 1 497.834435 0 365.377201 365.377201 0 0 1 0 508.712565z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)