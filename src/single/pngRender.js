import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import { Vendors } from './gifRender'

var toPng = (cnt) => {
    domtoimage.toPng(cnt)
        .then(function (dataUrl) {
            var result = document.querySelector('#result');
            result.src = dataUrl;
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        })
}

var toBlob = (cnt) => {
    domtoimage.toBlob(cnt)
        .then(function (blob) {
            FileSaver.saveAs(blob, 'meme.png')
        })
}

var bindClick = (cnt) => {
    var pre = document.querySelector('#preview');
    var dwn = document.querySelector('#download');
    pre.onclick = () => {
        toPng(cnt);
    }

    dwn.onclick = () => {
        toBlob(cnt);
    }

}

var drawImg = (sourceImg) => {
    var cvs = document.querySelector('#myCanvas');
    var ctx = cvs.getContext('2d');
    cvs.height = 250;
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
        url = Vendors + '/img/example.png',
        cnt = document.querySelector('#cntVengeful');
    if (cnt) {
        loadImg(sourceImg, url);
        bindClick(cnt);
    }
}

export { __main };