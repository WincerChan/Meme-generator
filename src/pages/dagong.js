import React from 'react'
import { Template } from '../components/template';
const config = {
    "name": "打工是不可能打工的",
    "url": "/dagong/",
    "gif": "/template/dagong.gif",
    "config": [
        {
            "default": "没有钱啊，肯定要做的啊",
            "startTime": 0,
            "endTime": 1.8
        },
        {
            "default": "不做的话没有钱用",
            "startTime": 1.88,
            "endTime": 3.76
        },
        {
            "default": "那你不会去打工啊",
            "startTime": 3.81,
            "endTime": 4.66
        },
        {
            "default": "有手有脚的",
            "startTime": 4.66,
            "endTime": 5.90
        },
        {
            "default": "打工是不可能打工的",
            "startTime": 6.02,
            "endTime": 8.42
        },
        {
            "default": "这辈子都不可能打工的",
            "startTime": 8.42,
            "endTime": 10.75
        }
    ]
}
export { config };

export default () => (
    <Template element={config} />
)

