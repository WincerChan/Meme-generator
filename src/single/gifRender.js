import omggif from 'omggif';
import GIF from 'gif.js';

const Vendors = 'https://cdn.jsdelivr.net/gh/wincerchan/Meme-generator@0.1/public'


var gifRender = async function (gifInfo) {
    var progressBar = document.querySelector('#progress'),
        notificationMessage = document.querySelector('#success-notification');
    progressBar.style.display = 'block';
    notificationMessage.style.display = 'none';

    var createCanvasContext = function (width, height) {
        let canvas = document.createElement('canvas');
        [canvas.width, canvas.height] = [width, height]
        let ctx = canvas.getContext('2d');
        ctx.font = "16px 'Microsoft YaHei', sans-serif"
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 3
        ctx.lineJoin = 'round'
        return [canvas, ctx]
    }
    var tmp = await fetch(Vendors + gifInfo.gif),
        response = await tmp.arrayBuffer(),
        arrayBufferView = new Uint8Array(response),
        gifReader = new omggif.GifReader(arrayBufferView),
        frame0info = gifReader.frameInfo(0),
        [width, height] = [frame0info.width, frame0info.height],
        [, ctx] = createCanvasContext(width, height),
        pixelBuffer = new Uint8ClampedArray(width * height * 4),
        textIndex = 0,
        time = 0,
        captions = document.querySelectorAll('.input.is-info.sentence');

    var tmpWorker = await fetch(Vendors + '/gif.worker.js'),
        workerSrcBlob = new Blob([await tmpWorker.text()], { type: 'text/javascript' }),
        workerBlobURL = window.URL.createObjectURL(workerSrcBlob),
        gif = new GIF({
            workerScript: workerBlobURL,
            workers: 3,
            quality: 16,
            width: width,
            height: height
        });

    for (let i = 0; i < gifReader.numFrames(); i++) {
        gifReader.decodeAndBlitFrameRGBA(i, pixelBuffer);
        let imageData = new window.ImageData(pixelBuffer, width, height)
        ctx.putImageData(imageData, 0, 0);

        let frameInfo = gifReader.frameInfo(i);
        if (textIndex < gifInfo.config.length) {
            var textInfo = gifInfo.config[textIndex];
            if (textInfo.startTime <= time && time <= textInfo.endTime) {
                var text = undefined;
                if (captions[textIndex])
                    text = captions[textIndex].value || textInfo.default;
                else
                    text = textInfo.default;
                ctx.strokeText(text, width / 2, height - 5, width);
                ctx.fillText(text, width / 2, height - 5, width);
            }
            time += frameInfo.delay / 100;
            if (time > textInfo.endTime) {
                textIndex++;
            }
        }
        gif.addFrame(ctx, {
            copy: true,
            delay: frameInfo.delay * 10,
            dispose: frameInfo.dispose
        })
    }
    gif.render()
    gif.on('progress', progress => {
        progressBar.value = 100 * progress;
    })
    gif.on('finished', blob => {
        var img = document.querySelector('#gifMeme');
        window.gifUrl = window.URL.createObjectURL(blob);
        img.src = window.gifUrl;
        progressBar.style.display = 'none';
        progressBar.value = 0;
        document.querySelector('#success-notification').style.display = 'block';
    })
}

var download = function (gifInfo) {
    if (!window.gifUrl)
        gifRender(gifInfo)
    let a = document.createElement('a');
    a.href = window.gifUrl;
    console.log(window.gifUrl)
    a.download = 'meme.gif';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export { gifRender, download, Vendors };