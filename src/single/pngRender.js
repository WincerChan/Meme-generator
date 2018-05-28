import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import { Vendors } from '../Section';

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

var __main = async () => {
    var sourceImg = new Image(),
        tmp = await fetch(Vendors + '/img/example.png'),
        imgSrcBlob = new Blob([new Uint8Array(await tmp.arrayBuffer())]),
        url = window.URL.createObjectURL(imgSrcBlob),
        cnt = document.querySelector('#cntVengeful');
    if (cnt) {
        loadImg(sourceImg, url);
        bindClick(cnt);
        readImg();
    }
}

var readImg = () => {
    var fileUpload = document.querySelector('#fileUpload');
    var canvas = document.querySelector('#myCanvas');
    var ctx = canvas.getContext('2d');
    canvas.addEventListener('click', () => {
        var readImage = function () {
            if (this.files && this.files[0]) {
                var FR = new FileReader();
                FR.onload = function (e) {
                    var img = new Image();
                    img.src = e.target.result;
                    img.onload = function () {
                        console.log(this.width, this.height)
                        canvas.height = 300 * (this.height / this.width)
                        ctx.drawImage(img, 0, 0, 300, canvas.height);
                    }
                }
                FR.readAsDataURL(this.files[0])
            }
        }
        fileUpload.click();
        fileUpload.onchange = readImage;
    })
}

export { __main };