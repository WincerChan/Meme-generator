import React from 'react'
import { Template } from '../components/template';
const config = {
    "name": "星际还是魔兽",
    "url": "/lianliankan/",
    "gif": "/template/lianliankan.gif",
    "config": [
        {
            "default": "你平时打电子游戏吗",
            "startTime": 0.38,
            "endTime": 1.86
        },
        {
            "default": "偶尔",
            "startTime": 2.93,
            "endTime": 3.70
        },
        {
            "default": "星际还是魔兽",
            "startTime": 3.73,
            "endTime": 5.63
        },
        {
            "default": "连连看",
            "startTime": 6.97,
            "endTime": 7.79
        }
    ]
}


export { config };
export default () => (
    <Template element={config} />
)