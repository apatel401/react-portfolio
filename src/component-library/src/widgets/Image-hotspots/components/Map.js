import React, { useContext, useRef, useState, useEffect } from "react";
import {
  InteractiveWrapperConfig,
  InteractiveWrapperContext,
} from "./Provider";

function Map() {
  const config = useContext(InteractiveWrapperConfig);
  const context = useContext(InteractiveWrapperContext);
  const isInitialMount = useRef(true);
  const mapClicked = useRef(false);
  const [map, setMap] = useState(config.areas);
  const [defaultMap, _] = useState(config.areas);
  const [clicked, setClicked] = useState(false);
  const [store, setStore] = useState();
  const [hovered, setHovered] = useState(false);
  const [storeHover, setStoreHover] = useState();
  const [hoverId, setHoverId] = useState()



  useEffect(() => {
    isInitialMount.current ? (isInitialMount.current = false) : updateMap();
  }, [map]);

  useEffect(() => {
    const handleResizeMap = () => {
      if (!context.canvasElementRef) {
        return;
      }
      reRenderCanvas();
    };
    window.addEventListener("resize", handleResizeMap);
    handleResizeMap();
    return () => {
      window.removeEventListener("resize", handleResizeMap);
    };
  }, [context.newDimensions]);

  useEffect(() => {
    if(storeHover === "" || storeHover === undefined) {return };
    reRenderCanvas();
    
  }, [hovered, store])

  useEffect(() => {
    if (!context.canvasElementRef) {
      return;
    }
    reRenderCanvas();
    
  }, [!hovered])
  
  const parseCoord = (coords) => {
    let splitCoords = coords.split(",");
    let coordsPercent = new Array(splitCoords.length);
    for (let i = 0; i < coordsPercent.length; ++i) {
      if (i % 2 === 0)
        coordsPercent[i] = parseInt(
          (splitCoords[i] / context.originalDimensions.width) *
          100 *
          (context.newDimensions.width / 100)
        );
      else
        coordsPercent[i] = parseInt(
          (splitCoords[i] / context.originalDimensions.height) *
          100 *
          (context.newDimensions.height / 100)
        );
    }
    return coordsPercent;
  };

  const updateMap = () => {
    reRenderCanvas();
    mapClicked.current = true;
  };

  function displayDetails(e, areaIndex) {
    e.preventDefault();
    context.updateContext({ areaId: areaIndex });
    // announcements is set to a in-between loading state in order to trigger
    // screen readers to re-read the aria-live sections related to InfoPanel
    config.updateAnnouncement("");
    setTimeout(() => {
      config.updateAnnouncement("displayDetails");
    }, 500);
    //Scroll only on responsive view
    if (window.innerWidth < 575) {
      // Y position of the infoPanel - offset (current header height)
      const scrollPosition =
        context.infoPanelRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        220;
      window.scrollTo({ top: scrollPosition, behavior: "smooth" }); // Scroll to the infoPanel
    }
  }
  const getCenter = (area) => {
    if (!area) return [0, 0];

    const scaledCoords = parseCoord(area.coords);

    switch (area.shape) {
      case "circle":
        return [scaledCoords[0], scaledCoords[1]];
    }
  };

  const drawPlus = (area) => {
    const [x, y] = getCenter(area);
    let height = 5;
    let width = 5;
    const coords = parseCoord(area.coords);
    context.canvasElementRef.current.beginPath();
    context.canvasElementRef.current.stroke();
    context.canvasElementRef.current.fill();
    context.canvasElementRef.current.arc(
      coords[0],
      coords[1],
      coords[2],
      0,
      2 * Math.PI
    );
    // context.canvasTagElementRef.current.fillStyle = "black";
    context.canvasTagElementRef.current.imageSmoothingEnabled = true;
    context.canvasTagElementRef.current.stroke();
    context.canvasTagElementRef.current.fill();
    clicked && store === area.areaIndex ?  
    context.canvasTagElementRef.current.fillStyle = config.highlightColor : 
    context.canvasTagElementRef.current.fillStyle = "#fff";
    window.innerWidth < 575 ? context.canvasTagElementRef.current.font = "15px Montserrat" : context.canvasTagElementRef.current.font = "22px \'Montserrat\', sans-serif";
    context.canvasTagElementRef.current.textAlign = "center";
    context.canvasTagElementRef.current.textBaseline = "middle";
    context.canvasTagElementRef.current.fillText(
      area.areaIndex,
      x,
      y + height / 2
    );
  }

  const reRenderCanvas = () => {
    if (!mapClicked.current && context.canvasElementRef.current) {
      context.canvasElementRef.current.clearRect(
        0,
        0,
        context.canvasRef.current.width,
        context.canvasRef.current.height
      );
      context.canvasElementRef.current.beginPath();
     
      context.canvasTagElementRef.current.clearRect(
        0,
        0,
        context.canvasTagRef.current.width,
        context.canvasTagRef.current.height
      );
      context.canvasTagElementRef.current.beginPath();
      context.canvasTagElementRef.current.imageSmoothingEnabled = true;
      context.canvasTagElementRef.current.font = "normal 22px Montserrat"
      map.map((area) => {
        // drawPlus(area);
        const coord = parseCoord(area.coords);

        // eslint-disable-next-line no-unused-expressions
        area.shape === "circle"
          ? drawCircle(area, coord) && drawPlus(area)
          : null;

        return true;
      });
    } else {
      mapClicked.current = false;
    }
  };



  const hoverOn = (area) => {
    setHovered(true);
    setStoreHover(area);
    setHoverId(area.areaIndex);
}

  const hoverOff = () => {
    setStoreHover();
    setHovered(false);
    setHoverId();
    // console.log("hoveroff function")
    // console.log(hoverId)
    
    reRenderCanvas();
  };



  const drawCircle = (area, coords) => {
    clicked && store === area.areaIndex ? context.canvasElementRef.current.fillStyle = "#ffffff" :
    hovered && hoverId === area.areaIndex ?  context.canvasElementRef.current.fillStyle = "#7B0F6C" :
    context.canvasElementRef.current.fillStyle = config.highlightColor
    context.canvasElementRef.current.imageSmoothingEnabled = true;
    context.canvasElementRef.current.font = "normal 22px Montserrat";
    hovered && hoverId === area.areaIndex ? context.canvasElementRef.current.lineWidth = "8" : context.canvasElementRef.current.lineWidth = "6"
    clicked && store === area.areaIndex ?  context.canvasElementRef.current.strokeStyle = config.highlightColor :
    hovered && hoverId === area.areaIndex ?  context.canvasElementRef.current.strokeStyle = "#F0B3E8" :
    context.canvasElementRef.current.strokeStyle = "white";
    context.canvasElementRef.current.beginPath();
    window.innerWidth < 575 ? context.canvasElementRef.current.arc(
      coords[0],
      coords[1],
      coords[2] + 5,
      0,
      2 * Math.PI 
    ) :
    context.canvasElementRef.current.arc(
      coords[0],
      coords[1],
      coords[2],
      0,
      2 * Math.PI
    );
    context.canvasElementRef.current.stroke();
    context.canvasElementRef.current.closePath();
    context.canvasElementRef.current.fill();
    drawPlus(area);
  };


  // const drawPolygon = (area, coords) => {
  //   const newCoords = coords.reduce(
  //     (a, v, i, s) => (i % 2 ? a : [...a, s.slice(i, i + 2)]),
  //     []
  //   );

  //   context.canvasElementRef.current.fillStyle = "transparent";
  //   context.canvasElementRef.current.lineWidth = "6";
  //   context.canvasElementRef.current.beginPath();
  //   context.canvasElementRef.current.strokeStyle = config.highlightColor;
  //   newCoords.forEach((c) =>
  //     context.canvasElementRef.current.lineTo(c[0], c[1])
  //   );

  //   context.canvasElementRef.current.closePath();
  //   context.canvasElementRef.current.stroke();
  //   context.canvasElementRef.current.fill();
  // };

  // const drawRect = (area, coords) => {
  //   context.canvasElementRef.current.fillStyle = "transparent";
  //   context.canvasElementRef.current.lineWidth = "6";
  //   context.canvasElementRef.current.strokeStyle = config.highlightColor;
  //   context.canvasElementRef.current.strokeRect(
  //     coords[0],
  //     coords[1],
  //     coords[2] - coords[0],
  //     coords[3] - coords[1]
  //   );
  //   context.canvasElementRef.current.fillRect(
  //     coords[0],
  //     coords[1],
  //     coords[2] - coords[0],
  //     coords[3] - coords[1]
  //   );
  // };

  const click = (area, isSelected, e) => {
    // const newArea = { ...area };
    // if (isSelected) {
    //   newArea.isSelected = false;
    // } else {
    //   newArea.isSelected = true;
    // }

    // const updateMap = defaultMap.map((cur) =>
    //   cur.id === area.id ? newArea : cur
    // );
    // setMap(updateMap);
    setStore(area.areaIndex);
    setClicked(true);
    e.preventDefault();
  };

  return (
    <map name={"interactive-images-map-" + config.id}>
      {config.areas.map((area, idx) => {
        const coords = parseCoord(area.coords);
        return (
          <area
            title={area.name}
            data-name={area.name}
            shape={area.shape}
            coords={coords.join(",")}
            alt={
              area.areaAlt + " Clickable Button " + (idx + 1) + " of " + config.areas.length
            }
            // onKeyPress={(e) => e.key === 'Enter' ? displayDetails(area, e) : null}

            // Keeping the href for mac safari users that without href the button is no longer focused into. Instead added word clickable to alt. 
            href=""
            style={{
              "--hover-color":
                config.highlightColor !== "" &&
                  config.highlightColor !== undefined
                  ? config.highlightColor
                  : "#111111",
              cursor: "pointer",
            }}
            onMouseEnter={() => hoverOn(area)}
            onMouseLeave={() => hoverOff()}
            onClick={(e) => (click(area, area.isSelected, e, area.idx), displayDetails(e, idx))}
            onFocus={() => hoverOn(area)}
            onBlur={() => hoverOff()}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") &&
              (click(area, area.isSelected, e, area.idx), displayDetails(e, idx))
            }
          />
        );
      })}
    </map>
  );
}

export default Map;
