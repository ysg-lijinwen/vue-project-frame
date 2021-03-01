const download = {};
download.downFromFdfs = function (data, strFileName, strMimeType) {

    var self = window, // this script is only for browsers anyway...
        defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
        mimeType = strMimeType || defaultMime,
        payload = data,
        anchor = document.createElement("a"),
        toString = function (a) {
            return String(a);
        },
        myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
        fileName = strFileName || "download",
        blob,
        reader;
    myBlob = myBlob.call ? myBlob.bind(self) : Blob;


    if (/([\x80-\xff])/.test(payload)) {
        var i = 0, tempUiArr = new Uint8Array(payload.length), mx = tempUiArr.length;
        for (i; i < mx; ++i) tempUiArr[i] = payload.charCodeAt(i);
        payload = new myBlob([tempUiArr], {type: mimeType});
    }

    blob = payload instanceof myBlob ?
        payload :
        new myBlob([payload], {type: mimeType});


    function saver(url, winMode) {

        if ('download' in anchor) { //html5 A[download]
            console.log(url);
            anchor.href = url;
            anchor.setAttribute("download", fileName);
            anchor.className = "download-js-link";
            anchor.innerHTML = "downloading...";
            anchor.style.display = "none";
            // anchor.addEventListener('click', function(e) {
            //     e.stopPropagation();
            //     this.removeEventListener('click', arguments.callee);
            // });
            function end(e) {
                e.stopPropagation();
                anchor.removeEventListener('click', end);
            };
            anchor.addEventListener('click', end.bind(this));
            document.body.appendChild(anchor);
            setTimeout(function () {
                anchor.click();
                document.body.removeChild(anchor);
                if (winMode === true) {
                    setTimeout(function () {
                        self.URL.revokeObjectURL(anchor.href);
                    }, 250);
                }
            }, 66);
            return true;
        }

        // handle non-a[download] safari as best we can:
        if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
            if (/^data:/.test(url)) url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
            if (!window.open(url)) { // popup blocked, offer direct download:
                if (confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")) {
                    location.href = url;
                }
            }
            return true;
        }

        //do iframe dataURL download (old ch+FF):
        var f = document.createElement("iframe");
        document.body.appendChild(f);

        if (!winMode && /^data:/.test(url)) { // force a mime that will download:
            url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
        }
        f.src = url;
        setTimeout(function () {
            document.body.removeChild(f);
        }, 333);

    }//end saver

    if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
        return navigator.msSaveBlob(blob, fileName);
    }

    if (self.URL) { // simple fast and modern way using Blob and URL:
        saver(self.URL.createObjectURL(blob), true);
    } else {
        // handle non-Blob()+non-URL browsers:
        if (typeof blob === "string" || blob.constructor === toString) {
            try {
                return saver("data:" + mimeType + ";base64," + self.btoa(blob));
            } catch (y) {
                return saver("data:" + mimeType + "," + encodeURIComponent(blob));
            }
        }

        // Blob but not URL support:
        reader = new FileReader();
        reader.onload = function (e) {
            saver(this.result);
        };
        reader.readAsDataURL(blob);
    }
    return true;
};

download.downFromNg = function (url, filename) {
    var anchor = document.createElement("a");
    if ('download' in anchor) { //html5 A[download]
        const _cUrl=url+"?down=1&name="+filename;
        console.log(_cUrl);
        anchor.href = _cUrl;
        anchor.download = filename;
        anchor.className = "download-js-link";
        anchor.innerHTML = "downloading...";
        anchor.style.display = "none";

        function end(e) {
            e.stopPropagation();
            anchor.removeEventListener('click', end);
        };
        anchor.addEventListener('click', end.bind(this));
        // anchor.addEventListener('click', function(e) {
        // 	e.stopPropagation();
        // this.removeEventListener('click', arguments.callee);
        // });
        document.body.appendChild(anchor);
        setTimeout(function () {
            anchor.click();
            document.body.removeChild(anchor);
        }, 66);
        return true;
    }

    // handle non-a[download] safari as best we can:
    if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
        if (/^data:/.test(url)) url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
        if (!window.open(url)) { // popup blocked, offer direct download:
            if (confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")) {
                location.href = url;
            }
        }
        return true;
    }

    //do iframe dataURL download (old ch+FF):
    var f = document.createElement("iframe");
    document.body.appendChild(f);

    if (!winMode && /^data:/.test(url)) { // force a mime that will download:
        url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
    }
    f.src = url;
    setTimeout(function () {
        document.body.removeChild(f);
    }, 333);
}

export default download;
