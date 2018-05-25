import omggif from 'omggif';
import GIF from 'gif.js';
import axios from 'axios';
import { Wangjingze } from './static/Wangjingze';

var gifRender = async function () {

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
    var response = await axios.get('/wjz.gif', {
        responseType: 'arraybuffer',
        onDownloadProgress: event => {
            // console.log([event.total, event.loaded])
        }
    })
    var arrayBufferView = new Uint8Array(response.data);
    var gifReader = new omggif.GifReader(arrayBufferView),
        frame0info = gifReader.frameInfo(0),
        [width, height] = [frame0info.width, frame0info.height],
        [, ctx] = createCanvasContext(width, height),
        gif = new GIF({
            workerScript: '/gif.worker.js',
            workers: 3,
            quality: 16,
            width: width,
            height: height
        }),
        pixelBuffer = new Uint8ClampedArray(width * height * 4),
        textIndex = 0,
        time = 0,
        captions = document.querySelectorAll('.input.is-info.sentence');

    for (let i = 0; i < gifReader.numFrames(); i++) {
        gifReader.decodeAndBlitFrameRGBA(i, pixelBuffer);
        let imageData = new window.ImageData(pixelBuffer, width, height)
        ctx.putImageData(imageData, 0, 0);

        let frameInfo = gifReader.frameInfo(i);

        if (textIndex < Wangjingze.config.length) {
            let textInfo = Wangjingze.config[textIndex]
            if (textInfo.startTime <= time && time < textInfo.endTime) {
                if (captions[textIndex])
                    var text = captions[textIndex].value || textInfo.default;
                else
                    var text = textInfo.default;
                // console.log(text)
                ctx.strokeText(text, width / 2, height - 5, width);
                ctx.fillText(text, width / 2, height - 5, width)
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
    gif.on('finished', blob => {
        alert('finded.')
        var img = document.querySelector('#gifMeme');
        window.gifUrl = window.URL.createObjectURL(blob);
        img.src = window.gifUrl;
    })
}

var download = function () {
    if (!window.gifUrl)
        gifRender()
    let a = document.createElement('a');
    a.href = window.gifUrl;
    console.log(window.gifUrl)
    a.download = 'meme.gif';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
export { gifRender, download };