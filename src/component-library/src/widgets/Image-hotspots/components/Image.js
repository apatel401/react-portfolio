import React, { useEffect, useRef, useContext } from "react";
import { InteractiveWrapperContext, InteractiveWrapperConfig } from './Provider';

function Image() {

  const config = useContext(InteractiveWrapperConfig);
  const context = useContext(InteractiveWrapperContext);
  const imageRef = useRef(null);
  const canvas = useRef(null);
  const canvasTag = useRef(null);
  const canvasElement = useRef(null);
  const canvasTagElement = useRef(null);


  useEffect(() => {
    context.updateContext({canvasRef: canvas});
  }, canvas)

  useEffect(() => {
    context.updateContext({canvasElementRef: canvasElement});
  }, canvasElement)

  useEffect(() => {
    context.updateContext({canvasTagElementRef: canvasTagElement});
  }, canvasTagElement)

  useEffect(() => {
    context.updateContext({canvasTagRef: canvasTag});
  }, canvasTag)

  useEffect(() => {
    const handleResize = () => {
      context.updateContext({
        newDimensions: {
        width: imageRef.current.width,
        height: imageRef.current.height}
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const initCanvas = (event) => {
    const getImg = event.target;
    context.updateContext({
      originalDimensions: {
        width: getImg.naturalWidth,
        height: getImg.naturalHeight
      },
      newDimensions:{
        width: getImg.width,
        height: getImg.height
      }
    });
    canvas.current.width = getImg.width;
    canvas.current.height = getImg.height;
    canvasElement.current = canvas.current.getContext("2d");
    canvasTag.current.width = getImg.width;
    canvasTag.current.height = getImg.height;
    canvasTagElement.current = canvasTag.current.getContext("2d");
  };

  const absPos = {
    position: "absolute",
    top: 0,
    left: 0,
    fontFamily: ' Montserrat, \'sans-serif\' ',
    fontStyle: 'normal'
  };

  const styles = {
    container: {
      position: "relative",
    },
    canvas: {
      ...absPos,
      pointerEvents: "none",
      zIndex: 20,
    },
    canvas2: {
      ...absPos,
      pointerEvents: "none",
      zIndex: 50,
    },
  };

  return (
    <div style={styles.container}>
      <canvas ref={canvasTag} style={styles.canvas2} aria-label={`canvasTag image-hotspot-${config.id}`}/>
      <canvas ref={canvas} style={styles.canvas} aria-label={`canvas image-hotspot-${config.id}`}/>
      <img
        src={config.imageSrc}
        alt={config.imageAlt}
        ref={imageRef}
        useMap={"#interactive-images-map-" + config.id }
        onLoad={(e) => initCanvas(e)}
        className="img-responsive"
        style={{}}
      />
    </div>
    )
}

export default Image;