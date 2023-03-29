import HomeIcon from '@mui/icons-material/Home';
import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import './faceMask.css';
import { boxDraw } from "./utilities.js";

const FaceMask = () => {

    const cam = useRef(null);
    const place = useRef(null);

    const compileModel = async () => {
        const net = await tf.loadGraphModel(`${process.env.PUBLIC_URL}/model/model.json`)
        setInterval(() => {
            detect(net);
        }, 17);
    };

    const detect = async (net) => {
        if (
            typeof cam.current !== "undefined" &&
            cam.current !== null &&
            cam.current.video.readyState === 4
        ) {
            const video = cam.current.video;
            const videoWidth = cam.current.video.videoWidth;
            const videoHeight = cam.current.video.videoHeight;
            cam.current.video.width = videoWidth;
            cam.current.video.height = videoHeight;
            place.current.width = videoWidth;
            place.current.height = videoHeight;
            const img = tf.browser.fromPixels(video)
            const resized = tf.image.resizeBilinear(img, [1040, 880])
            const casted = resized.cast('int32')
            const expanded = casted.expandDims(0)
            const obj = await net.executeAsync(expanded)
            console.log(obj)
            const boxes = await obj[6].array()
            const classes = await obj[0].array()
            const scores = await obj[4].array()
            const ctx = place.current.getContext("2d");
            requestAnimationFrame(() => { boxDraw(boxes[0], classes[0], scores[0], 0.6, videoWidth, videoHeight, ctx) });
            tf.dispose(img)
            tf.dispose(resized)
            tf.dispose(casted)
            tf.dispose(expanded)
            tf.dispose(obj)
        }
    };

    useEffect(() => {
        compileModel()
    }, [])
    

    return (
        <div className="FaceMask">
            <div className="title">
                <div className="titleIcon"><Link to = "/dashboard" ><HomeIcon style={{width:50, height:40}}/></Link></div>
                <div className="titleDescrp">Real Time Face Mask Detection Powered by MobileNet SSD v2</div>    
            </div>
            
            <header className="FaceMask-header">
                <Webcam
                    ref={cam}
                    muted={true}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 1040,
                        height: 880,
                    }}
                />
                <canvas
                    ref={place}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 8,
                        width: 1040,
                        height: 880,
                    }}
                />
            </header>
        </div>
    );
}

export default FaceMask