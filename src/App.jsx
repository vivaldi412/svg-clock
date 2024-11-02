import React from "react"
import { nanoid } from "nanoid";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(Flip, ScrollTrigger, Observer, ScrollToPlugin, Draggable, MotionPathPlugin, EaselPlugin, PixiPlugin, TextPlugin, RoughEase, ExpoScaleEase, SlowMo, CustomEase);
gsap.registerPlugin(useGSAP);




export default function App() {
  const [pSvg, setPSvg] = React.useState()

  const container = React.useRef();
  const clockRef = React.useRef(3);
  const SlineRef = React.useRef();
  const HlineRef = React.useRef();
  const MlineRef = React.useRef();
  const hNRef = React.useRef();


  const baseLineRef = React.useRef([])
  const width = 300
  const height = 300

  function printSvg() {
    setPSvg(
      <svg xmlns="http://www.w3.org/2000/svg" width={width + 9} height={height + 9} viewBox={`-3 -3 ${width + 6} ${height + 6}`}
        fill="none"
      >
        <path d="M0,0H300V300H0Z" stroke="black" strokeWidth="6" />

        <circle id="clock-circle" cx={width / 2} cy={height / 2} r={(width / 2) - 6} stroke="orange" strokeWidth="4" />
        <circle id="clock-center" cx={width / 2} cy={height / 2} r="1" stroke="orange" strokeWidth="1" />



        <path id="hour-hand" d="M150,150 v-150" opacity="1" stroke="lightGreen" strokeWidth={2} />
        <path id="minute-hand" d="M150,150 v-150" opacity="1" stroke="red" strokeWidth={2} />
        <path id="second-hand" d="m150,150 v-150" opacity="1" stroke="black" strokeWidth={2} />

        <circle id="clock-center-circle" cx={width / 2} cy={height / 2} r="30" fill="white" stroke="orange" strokeWidth="1" />

        <text className="digital-clock" id="second-d" x="150" y="150" >{0}</text>

        <text className="numbers" x="46%" y="10%">12</text>
        <text className="numbers" x="68%" y="15%" >1</text>
        <text className="numbers" x="83%" y="30.5%" >2</text>
        <text className="numbers" x="88.5%" y="51%" >3</text>
        <text className="numbers" x="83%" y="71%" >4</text>
        <text className="numbers" x="68%" y="86.5%" >5</text>
        <text className="numbers" x="47.5%" y="92%" >6</text>
        <text className="numbers" x="27%" y="86%" >7</text>
        <text className="numbers" x="12%" y="71%" >8</text>
        <text className="numbers" x="6%" y="50.5%" >9</text>
        <text className="numbers" x="10%" y="30.5%" >10</text>
        <text className="numbers" x="25.5%" y="15%" >11</text>






        {/* <circle cx={width / 2} cy={height / 2} r={(width / 2) - 24} stroke="orange" strokeWidth="1" /> */}
        {/* <line x1="150" y1="0" x2="150" y2="300" stroke="black" strokeWidth="4" /> */}
        {/* <line x1="0" y1="150" x2="300" y2="150" stroke="black" strokeWidth="4" /> */}
        {baseLineRef.current}
      </svg>
    )
  }


  baseLine()
  let hourTemp;
  let minTemp;
  let secTemp;



  useGSAP(
    () => {
      // printSvg()



      // gsap.ticker.fps(10)
      gsap.ticker.add(getTime, false, true)



      return () => {
        gsap.ticker.remove(getTime)
      }
    },
    {
      scope: container

    }
  )
  function baseLine() {
    // for (let i = 0; i < 30; i++) {
    //   baseLineRef.current.push(
    //     <line key={nanoid()} x1="0" y1={i * 10} y2={i * 10} x2="300" stroke="black" strokeWidth="1" />
    //   )
    // }
    // for (let i = 0; i < 30; i++) {
    //   baseLineRef.current.push(
    //     <line key={nanoid()} y1="0" x1={i * 10} x2={i * 10} y2="300" stroke="black" strokeWidth="1" />
    //   )
    // }
    for (let i = 1; i <= 60; i++) {
      if (i % 5 === 0) {
        continue;
      }
      else {
        baseLineRef.current.push(
          <line className="secondLines" id={`Sline${i - 1}`} key={nanoid()} y1="9.3" x1="150" x2="150" y2="6" stroke="#F5F5F5" strokeWidth="0.1" strokeLinecap="round" transform={`rotate(${i * 6},150 150)`} />
        )
      }
    }
    for (let i = 1; i <= 60; i++) {
      if (i % 5 === 0) {
        continue;
      }
      else {
        baseLineRef.current.push(
          <line id={`Mline${i - 1}`} key={nanoid()} y1="12" x1="150" x2="150" y2="8" stroke="#F5F5F5" strokeWidth="0" strokeLinecap="square" transform={`rotate(${i * 6},150 150)`} />
        )
      }
    }
    for (let i = 1; i <= 12; i++) {
      baseLineRef.current.push(
        <line id={`Hline${i}`} key={nanoid()} y1="15" x1="150" x2="150" y2="6" stroke="#F5F5F5" strokeWidth="0.4" strokeLinecap="round" transform={`rotate(${i * 30},150 150)`} />
      )
    }
  }

  let temp = clockRef.current
  function getTime(time, delta, frame) {
    let timeFixed = Math.floor(time)


    // if (new Date().getSeconds() - secTemp > 2 || secTemp - new Date().getSeconds() > 2 || gsap.ticker.deltaRatio() < 1) {
    //   clockRef.current = time + 3
    //   temp = time + 3
    // }

    if (gsap.ticker.deltaRatio() < 1 || secTemp === undefined || hourTemp === undefined || minTemp === undefined) {
      for (let i = 1; i <= 60; i++) {
        if (i % 5 === 0) {
          continue;
        }
        else {
          gsap.to(`#Sline${i - 1}`, { strokeWidth: "0.1", ease: "none", duration: 0.01 })
          gsap.to(`#Mline${i - 1}`, { strokeWidth: "0", ease: "none", duration: 0.01 })
        }
      }

      // for (let i = 1; i <= 12; i++) {
      //   gsap.to(`#hN${i}`, { fill: "#f5f5f5", ease: "none", duration: 0.01 })
      // }
      clockRef.current = time + 1
      temp = time + 1
      gsap.set("#second-d", {
        text: `${new Date().getSeconds().toString().padStart(2, 0)}`,
        ease: "none",
      });
      gsap.set("#minute-d", {
        text: `${new Date().getMinutes().toString().padStart(2, 0)}`,
        ease: "none",
      });
      gsap.set("#hour-d", {
        text: `${new Date().getHours().toString().padStart(2, 0)}`,
        ease: "none",
      });
    }

    if (time < clockRef.current) {
      gsap.set("#second-hand", { rotation: new Date().getSeconds() * 6, transformOrigin: "bottom", ease: "bounce.out" })
      gsap.to("#minute-hand", { rotation: new Date().getMinutes() * 6, transformOrigin: "bottom", ease: "bounce.out" })
      gsap.to("#hour-hand", { rotation: new Date().getHours() * 30, transformOrigin: "bottom", ease: "bounce.out" })
      secTemp = new Date().getSeconds()
      minTemp = new Date().getMinutes()
      hourTemp = new Date().getHours()


      if (new Date().getHours() === 0) {
        gsap.to(`#hN12`, {
          fill: "#ff5d00", duration: 0.3, ease: "none",
          onStart: function () {
            hNRef.current = "#" + this._pt?.t?.id
          }
        })
      }
      else if (new Date().getHours() <= 12 && new Date().getHours() !== 0) {
        gsap.to(`#hN${new Date().getHours()}`, {
          fill: "#ff5d00", duration: 0.3, ease: "none",
          onStart: function () {
            hNRef.current = "#" + this._pt?.t?.id
          }
        })
      }
      else if (new Date().getHours() > 12 && new Date().getHours() !== 0) {
        gsap.to(`#hN${new Date().getHours() - 12}`, {
          fill: "#ff5d00", duration: 0.3, ease: "none",
          onStart: function () {
            hNRef.current = "#" + this._pt?.t?.id
          }
        })
      }

      if (new Date().getHours() === 0) {
        gsap.to(`#Hline12`, {
          stroke: "#ff5d00", strokeWidth: 3, duration: 0.3, ease: "none",
          onStart: function () {
            HlineRef.current = "#" + this._pt?.t?.id
          }
        })
      }
      else if (new Date().getHours() <= 12 && new Date().getHours() !== 0) {
        gsap.to(`#Hline${new Date().getHours()}`, {
          stroke: "#ff5d00", strokeWidth: 3, duration: 0.01, ease: "none",
          onStart: function () {
            HlineRef.current = "#" + this._pt?.t?.id
          }
        })
      }
      else if (new Date().getHours() > 12 && new Date().getHours() !== 0) {
        gsap.to(`#Hline${new Date().getHours() - 12}`, {
          stroke: "#ff5d00", strokeWidth: 3, duration: 0.01, ease: "none",
          onStart: function () {
            HlineRef.current = "#" + this._pt?.t?.id
          }
        })
      }
      if (new Date().getMinutes() % 5 !== 0) {
        gsap.to(`#Mline${new Date().getMinutes() - 1}`, {
          strokeWidth: "1.5", stroke: "#00ff00", duration: 0.01, ease: "none",
          onStart: function () {
            MlineRef.current = "#" + this._pt?.t?.id
          }
        })
      }



    }



    if (time > clockRef.current - 1) {
      if (time > temp) {
        // if (secTemp === undefined || hourTemp === undefined || minTemp === undefined) {
        //   gsap.set("#second-hand", { rotation: new Date().getSeconds() * 6, transformOrigin: "bottom", ease: "bounce.out" })
        //   gsap.to("#minute-hand", { rotation: new Date().getMinutes() * 6, transformOrigin: "bottom", ease: "bounce.out" })
        //   gsap.to("#hour-hand", { rotation: new Date().getHours() * 30, transformOrigin: "bottom", ease: "bounce.out" })
        //   secTemp = new Date().getSeconds()
        //   minTemp = new Date().getMinutes()
        //   hourTemp = new Date().getHours()
        // }

        gsap.set("#second-d", {
          text: `${new Date().getSeconds().toString().padStart(2, 0)}`,
          ease: "none",
        });
        gsap.set("#minute-d", {
          text: `${new Date().getMinutes().toString().padStart(2, 0)}`,
          ease: "none",
        });
        gsap.set("#hour-d", {
          text: `${new Date().getHours().toString().padStart(2, 0)}`,
          ease: "none",
        });



        if (new Date().getSeconds() > secTemp) {

          gsap.to(SlineRef.current, { strokeWidth: "0.1", duration: 0.01 })

          gsap.to("#second-hand", {
            rotation: "+=6", transformOrigin: "bottom", ease: "bounce.out",
          })
          if (new Date().getSeconds() === 59) {
            secTemp = -1
          }
          else if (new Date().getSeconds() !== 59) {
            secTemp = new Date().getSeconds()
          }
          if (new Date().getSeconds() % 5 !== 0) {
            gsap.to(`#Sline${new Date().getSeconds() - 1}`, {
              strokeWidth: "2", duration: 0.01, ease: "none",
              onStart: function () {
                SlineRef.current = "#" + this._pt?.t?.id
              }
            })
          }
        }

        if (new Date().getMinutes() > minTemp) {
          gsap.to(MlineRef.current, { strokeWidth: "0", duration: 0.01 })

          gsap.to("#minute-hand", { rotation: "+=6", transformOrigin: "bottom" })
          // console.log("min>")
          if (new Date().getMinutes() === 59) {
            minTemp = -1
          }
          else if (new Date().getMinutes() !== 59) {
            minTemp = new Date().getMinutes()
          }
          if (new Date().getMinutes() % 5 !== 0) {
            gsap.to(`#Mline${new Date().getMinutes() - 1}`, {
              strokeWidth: "1.5", stroke: "#00ff00", duration: 0.01, ease: "none",
              onStart: function () {
                MlineRef.current = "#" + this._pt?.t?.id
              }
            })
          }
        }

        if (new Date().getHours() > hourTemp) {
          gsap.to(`${hNRef.current}`, {
            fill: "#f5f5f5", duration: 0.01, ease: "none",
          })
          gsap.to(`${HlineRef.current}`, {
            stroke: "#f5f5f5", strokeWidth: 0.4, duration: 0.01, ease: "none",
          })
          gsap.to("#hour-hand", { rotation: "+=30", transformOrigin: "bottom" })
          if (new Date().getHours() === 12) {
            hourTemp = -1
          }
          else if (new Date().getHours() !== 12) {
            hourTemp = new Date().getHours()
          }

          if (new Date().getHours() === 0) {
            gsap.to(`#Hline12`, {
              stroke: "#ff5d00", strokeWidth: 3, duration: 0.3, ease: "none",
              onStart: function () {
                HlineRef.current = "#" + this._pt?.t?.id
              }
            })
          }
          else if (new Date().getHours() <= 12 && new Date().getHours() !== 0) {
            gsap.to(`#Hline${new Date().getHours() - 1}`, {
              stroke: "#ff5d00", strokeWidth: 3, duration: 0.3, ease: "none",
              onStart: function () {
                HlineRef.current = "#" + this._pt?.t?.id
              }
            })
          }
          else if (new Date().getHours() > 12 && new Date().getHours() !== 0) {
            gsap.to(`#Hline${new Date().getHours() - 13}`, {
              stroke: "#ff5d00", strokeWidth: 3, duration: 0.3, ease: "none",
              onStart: function () {
                HlineRef.current = "#" + this._pt?.t?.id
              }
            })
          }
        }
        temp++
      }
      // console.log(time, delta, frame)
    }

    gsap.ticker.deltaRatio() < 1 && console.log(gsap.ticker.deltaRatio().toFixed(3))
  }


  console.log(hNRef.current)


  return (
    <div ref={container}>
      {/* <button onClick={arman}>go</button> */}
      {/* <button onClick={arman2}>run</button> */}
      {/* <button onClick={arman3}>res</button> */}
      {/* {pSvg} */}
      <svg xmlns="http://www.w3.org/2000/svg" width={width + 9} height={height + 9} viewBox={`-3 -3 ${width + 6} ${height + 6}`}
        fill="black"
      >


        {/* <path id="wrapper" d="M0,0H300V300H0Z" stroke="#2a9d8f" strokeWidth="6" /> */}






        <circle id="clock-circle" cx={width / 2} cy={height / 2} r={(width / 2) - 6} stroke="#8338ec" strokeWidth="6" />
        <circle id="clock-center" cx={width / 2} cy={height / 2} r="1" stroke="orange" strokeWidth="1" />



        <path id="hour-hand" d="M150,150 v-90" stroke="#ff5d00" strokeWidth={4} />
        <path id="minute-hand" d="M150,150 v-120" stroke="#00ff00" strokeWidth={3} />
        <path id="second-hand" d="M150,150 v-140" stroke="#3a86ff" strokeWidth={2} />

        <circle id="clock-center-circle" cx={width / 2} cy={height / 2} r="30" fill="black" stroke="#8338ec" strokeWidth="3" />

        <g transform="translate(2.5 -1.5)">
          <text className="digital-clock" id="second-d" x="160" y="156" >{new Date().getSeconds()}</text>
          <text className="digital-clock" x="156" y="155.7">:</text>
          <text className="digital-clock" id="minute-d" x="141" y="156" >{new Date().getMinutes()}</text>
          <text className="digital-clock" x="136.5" y="155.7">:</text>
          <text className="digital-clock" id="hour-d" x="122" y="156" >{new Date().getHours()}</text>
        </g>

        <text className="numbers" id="hN12" x="44%" y="15%">12</text>
        <text className="numbers" id="hN1" x="65%" y="20%" >1</text>
        <text className="numbers" id="hN2" x="78%" y="33.5%" >2</text>
        <text className="numbers" id="hN3" x="83%" y="52%" >3</text>
        <text className="numbers" id="hN4" x="78%" y="70%" >4</text>
        <text className="numbers" id="hN5" x="65%" y="83%" >5</text>
        <text className="numbers" id="hN6" x="47%" y="87.5%" >6</text>
        <text className="numbers" id="hN7" x="28%" y="83%" >7</text>
        <text className="numbers" id="hN8" x="15%" y="70%" >8</text>
        <text className="numbers" id="hN9" x="10%" y="51%" >9</text>
        <text className="numbers" id="hN10" x="13%" y="33.5%" >10</text>
        <text className="numbers" id="hN11" x="26%" y="20%" >11</text>






        {/* <circle cx={width / 2} cy={height / 2} r={(width / 2) - 38} stroke="orange" strokeWidth="1" fill="none" /> */}
        {/* <line x1="150" y1="0" x2="150" y2="300" stroke="black" strokeWidth="4" /> */}
        {/* <line x1="0" y1="150" x2="300" y2="150" stroke="white" strokeWidth="4" /> */}
        {baseLineRef.current}
      </svg>

    </div>
  )
}

