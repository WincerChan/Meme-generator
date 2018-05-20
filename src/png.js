
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';

var doc = {
    pre: document.querySelector('#preview'),
    dwn: document.querySelector('#download'),
    cnt: document.querySelector('#content'),
    cvs: document.querySelector('#myCanvas'),
}

var toPng = () => {
    domtoimage.toPng(doc.cnt)
        .then(function (dataUrl) {
            var result = document.querySelector('#result');
            result.src = dataUrl;
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        })
}

var toBlob = () => {
    domtoimage.toBlob(doc.cnt)
        .then(function (blob) {
            FileSaver.saveAs(blob, 'meme.png')
        })
}

var bindClick = () => {
    doc.pre.onclick = () => {
        toPng();
    }

    doc.dwn.onclick = () => {
        toBlob();
    }

}

var drawImg = (sourceImg) => {
    var ctx = doc.cvs.getContext('2d');
    doc.cvs.height = 250;
    ctx.drawImage(sourceImg, 0, 0, 300, 250);
}

var loadImg = (sourceImg, url) => {
    sourceImg.src = url;
    if (sourceImg.complete) {
        drawImg(sourceImg);
    }
    else {
        sourceImg.onload = () => {
            drawImg(sourceImg);
        };
        sourceImg.onerror = () => {
            alert('图片加载失败，请稍后重试。')
        }
    }
}

var __main = () => {
    var sourceImg = new Image(),
        url = 'img/example.png';
    loadImg(sourceImg, url);
    bindClick();
}

__main()