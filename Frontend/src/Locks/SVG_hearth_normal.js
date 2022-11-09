import * as React from "react";
const SVGHearthNormal = (props) => (

    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 420 420"
        xmlSpace="preserve"
        {...props}
    >
        <radialGradient
            id="a"
            cx={210}
            cy={210}
            r={210}
            gradientTransform="matrix(1 0 0 -1 0 420)"
            gradientUnits="userSpaceOnUse"
        >
            <stop
                offset={0.19}
                style={{
                    stopColor: props.bg1,
                }}
            />
            <stop
                offset={0.688}
                style={{
                    stopColor: props.bg2,
                }}
            />
            <stop
                offset={0.971}
                style={{
                    stopColor: props.bg3,
                }}
            />
        </radialGradient>
        <path fill="url(#a)" d="M0 0h420v420H0V0z" />
        <path
            fill="#666"
            d="M132 138.5V99.2c0-43 35-78 78-78s78 35 78 78v39.3h-.6V99.2c0-42.7-34.7-77.4-77.4-77.4s-77.4 34.7-77.4 77.4v39.3h-.6z"
        />
        <path
            fill="#333"
            d="M136.5 138.5s-.1-38.7-.1-39.3c0-40.5 33-73.5 73.5-73.5 40.9 0 73.6 33 73.6 73.5 0 .6-.1 39.3-.1 39.3h-3s.1-38.7.1-39.3c0-38.9-31.7-70.7-70.7-70.7-38.9 0-70.7 31.7-70.7 70.7 0 .6.1 39.3.1 39.3h-2.7z"
        />
        <path
            fill="#737373"
            d="M146.7 138.5V99.2c0-34.9 28.3-63.2 63.2-63.2s63.2 28.3 63.2 63.2c0 .6-.1 39.3-.1 39.3h-1.5s.1-38.7.1-39.3c0-34-27.7-61.7-61.7-61.7-33.7 0-61.6 27.7-61.6 61.7 0 .6.1 39.3.1 39.3h-1.7z"
        />
        <path
            fill="#F2F2F2"
            d="M141.2 138.5s-.1-38.7-.1-39.3c0-38 30.9-68.9 68.9-68.9s68.9 30.9 68.9 68.9c0 .6-.1 39.3-.1 39.3h-1.7s.1-38.7.1-39.3c0-37-30.1-67.2-67.2-67.2-37 0-67.2 30.1-67.2 67.2 0 .6.1 39.3.1 39.3h-1.7z"
        />
        <path
            fill="#BCBCBC"
            d="M132.6 138.5V99.2c0-42.7 34.7-77.4 77.4-77.4s77.4 34.7 77.4 77.4v39.3h-3.9s.1-38.7.1-39.3c0-40.5-33-73.5-73.5-73.5s-73.5 33-73.5 73.5c0 .6.1 39.3.1 39.3h-4.1z"
        />
        <path
            fill="#CCC"
            d="M150.9 138.5s-.1-38.7-.1-39.3c0-32.7 26.6-59.3 59.2-59.3s59.2 26.6 59.2 59.3c0 .6-.1 39.3-.1 39.3h-1.7s.1-38.7.1-39.3c0-31.7-25.8-57.5-57.5-57.5s-57.5 25.8-57.5 57.5c0 .6.1 39.3.1 39.3h-1.7z"
        />
        <path
            fill="#999"
            d="M154.3 138.5s-.1-38.7-.1-39.3c0-30.7 25.1-55.8 55.8-55.8s55.8 25.1 55.8 55.8c0 .6-.1 39.3-.1 39.3h-1.1V99.2c0-30.2-24.5-54.7-54.7-54.7S155.2 69 155.2 99.2v39.3h-.9z"
        />
        <path
            fill="#D0D0D0"
            d="M141.2 138.5s-.1-38.7-.1-39.3c0-38 30.9-68.9 68.9-68.9s68.9 30.9 68.9 68.9c0 .6-.1 39.3-.1 39.3h1.9s.1-38.7.1-39.3c0-38.9-31.7-70.7-70.7-70.7-38.9 0-71 31.7-71 70.7 0 .6.1 39.3.1 39.3h2z"
        />
        <path
            fill="#7F7F7F"
            d="M145.1 138.5s-.1-38.7-.1-39.3c0-35.9 29.1-65 65-65s65 29.1 65 65c0 .6-.1 39.3-.1 39.3H273s.1-38.7.1-39.3c0-34.9-28.5-63.2-63-63.2-34.9 0-63.2 28.3-63.2 63.2v39.3h-1.8z"
        />
        <path
            fill="#E2E2E2"
            d="m142.9 138.5-.1-39.3c0-37 30.1-67.2 67.2-67.2 37 0 67.2 30.1 67.2 67.2 0 .6-.1 39.3-.1 39.3h-2.2s.1-38.7.1-39.3c0-35.9-29.1-65-65-65s-65 29.1-65 65l.1 39.3h-2.2z"
        />
        <path
            fill="#ADADAD"
            d="M152.6 138.5s-.1-38.7-.1-39.3c0-31.7 25.8-57.5 57.5-57.5s57.5 25.8 57.5 57.5c0 .6-.1 39.3-.1 39.3h-1.8s.1-38.7.1-39.3c0-30.7-25.1-55.8-55.8-55.8s-55.8 25.1-55.8 55.8c0 .6.1 39.3.1 39.3h-1.6z"
        />
        <path
            fill="#848484"
            d="M150 138.5s-.1-38.7-.1-39.3c0-33.1 27-60.1 60.1-60.1s60.1 27 60.1 60.1c0 .6-.1 39.3-.1 39.3h1.6s.1-38.7.1-39.3c0-34-27.7-61.7-61.7-61.7s-61.7 27.7-61.7 61.7c0 .6.1 39.3.1 39.3h1.6z"
        />
        <path
            fill="#B5B5B5"
            d="M150 138.5s-.1-38.7-.1-39.4c0-33.1 27-60.1 60.1-60.1s60.1 27 60.1 60.1c0 .6-.1 39.4-.1 39.4h-.9s.1-38.7.1-39.4c0-32.7-26.6-59.2-59.2-59.2s-59.2 26.6-59.2 59.2c0 .6.1 39.4.1 39.4h-.9z"
        />
        <path
            fill={props.lock_color}
            d="M338.6 177.8c0-.6.1-1.2.1-1.7-.2-1.3-.1-2.5-.2-3.8-.6-32.7-23.9-52.8-41.5-58.1-27.7-8.3-58.9-4.3-77.8 11.6-7.1 6-6 6-9.3 8.6-3.3-2.6-2.3-2.6-9.3-8.6-18.9-15.9-50.1-19.9-77.8-11.6-17.7 5.3-40.9 25.4-41.5 58.1v11.2c.6 17.8 7.9 39.3 26.2 63.8 53.7 72.4 102.2 85.3 102.5 85.3.3-.1 48.8-12.9 102.5-85.3 18.3-24.6 25.6-46 26.2-63.8-.1-.9-.1-1.7-.1-2.5.1-.8.1-1.6.1-2.4 0-.2-.1-.5-.1-.8z"
        />
        <linearGradient
            id="b"
            gradientUnits="userSpaceOnUse"
            x1={210}
            y1={109.984}
            x2={210}
            y2={332.6}
        >
            <stop
                offset={0}
                style={{
                    stopColor: "#f2f2f2",
                    stopOpacity: 0.5,
                }}
            />
            <stop
                offset={0.639}
                style={{
                    stopColor: "#fff",
                    stopOpacity: 0,
                }}
            />
        </linearGradient>
        <path
            fill="url(#b)"
            d="M338.6 177.8c0-.6.1-1.2.1-1.7-.2-1.3-.1-2.5-.2-3.8-.6-32.7-23.9-52.8-41.5-58.1-27.7-8.3-58.9-4.3-77.8 11.6-7.1 6-6 6-9.3 8.6-3.3-2.6-2.3-2.6-9.3-8.6-18.9-15.9-50.1-19.9-77.8-11.6-17.7 5.3-40.9 25.4-41.5 58.1v11.2c.6 17.8 7.9 39.3 26.2 63.8 53.7 72.4 102.2 85.3 102.5 85.3.3-.1 48.8-12.9 102.5-85.3 18.3-24.6 25.6-46 26.2-63.8-.1-.9-.1-1.7-.1-2.5.1-.8.1-1.6.1-2.4 0-.2-.1-.5-.1-.8z"
        />
        <linearGradient
            id="c"
            gradientUnits="userSpaceOnUse"
            x1={210}
            y1={87.3}
            x2={210}
            y2={241.3}
            gradientTransform="matrix(1 0 0 -1 0 420)"
        >
            <stop
                offset={0.006}
                style={{
                    stopColor: "#000",
                }}
            />
            <stop
                offset={0.141}
                style={{
                    stopColor: "#040505",
                }}
            />
            <stop
                offset={0.294}
                style={{
                    stopColor: "#0f1212",
                }}
            />
            <stop
                offset={0.399}
                style={{
                    stopColor: "#1b1f20",
                }}
            />
            <stop
                offset={0.436}
                style={{
                    stopColor: "#56595a",
                }}
            />
            <stop
                offset={0.492}
                style={{
                    stopColor: "#a8aaaa",
                }}
            />
            <stop
                offset={0.531}
                style={{
                    stopColor: "#dcdcdd",
                }}
            />
            <stop
                offset={0.551}
                style={{
                    stopColor: "#f0f0f0",
                }}
            />
            <stop
                offset={0.685}
                style={{
                    stopColor: "#1b1f20",
                }}
            />
            <stop
                offset={1}
                style={{
                    stopColor: "#000",
                }}
            />
        </linearGradient>
        <path
            opacity={0.5}
            fill="url(#c)"
            d="M312.5 242.5c-53.7 72.4-102.2 85.3-102.5 85.3-.3-.1-48.8-12.9-102.5-85.3-18.3-24.6-25.6-46-26.2-63.8-.6 18.8 6.2 41.8 26.2 68.7 53.7 72.4 102.2 85.3 102.5 85.3.3-.1 48.8-12.9 102.5-85.3 20-26.8 26.8-49.9 26.2-68.7-.6 17.8-7.9 39.2-26.2 63.8z"
        />
        <linearGradient
            id="d"
            gradientUnits="userSpaceOnUse"
            x1={81.385}
            y1={277.558}
            x2={338.611}
            y2={277.558}
            gradientTransform="matrix(1 0 0 -1 0 420)"
        >
            <stop
                offset={0}
                style={{
                    stopColor: "#000",
                }}
            />
            <stop
                offset={0.35}
                style={{
                    stopColor: "#0f1212",
                }}
            />
            <stop
                offset={0.45}
                style={{
                    stopColor: "#a8aaaa",
                }}
            />
            <stop
                offset={0.5}
                style={{
                    stopColor: "#dcdcdd",
                }}
            />
            <stop
                offset={0.55}
                style={{
                    stopColor: "#f0f0f0",
                }}
            />
            <stop
                offset={0.65}
                style={{
                    stopColor: "#1b1f20",
                }}
            />
            <stop
                offset={1}
                style={{
                    stopColor: "#000",
                }}
            />
        </linearGradient>
        <path
            opacity={0.5}
            fill="url(#d)"
            d="M122.9 116.8c27.7-8.3 58.9-4.3 77.8 11.6 7.1 6 6 6 9.3 8.6 3.3-2.6 2.3-2.6 9.3-8.6 18.9-15.9 50.1-19.9 77.8-11.6 17.7 5.3 40.9 25.4 41.5 58.1.6-34.3-23.4-55.4-41.5-60.7-27.7-8.3-58.9-4.3-77.8 11.6-7.1 6-6 6-9.3 8.6-3.3-2.6-2.3-2.6-9.3-8.6-18.9-15.9-50.1-19.9-77.8-11.6-18.1 5.4-42.2 26.5-41.5 60.7.5-32.7 23.8-52.9 41.5-58.1z"
        />
        <path d="M210 252c-3.1 0-6.1-1.3-8.1-3.6s-3-5.4-2.6-8.4l1.8-16.2c.1-.8-.2-1.6-.8-2.2-2.6-2.6-4.1-6.2-4.1-9.8 0-7.6 6.2-13.8 13.8-13.8h.4c3.5.1 6.9 1.5 9.4 4s4 5.9 4 9.4c.1 3.8-1.4 7.6-4.1 10.2-.6.5-.9 1.3-.8 2.2l1.9 16.2c.4 3.1-.6 6.2-2.6 8.4-2.2 2.3-5.2 3.6-8.2 3.6z" />
        <path
            fill="#CCC"
            d="M209.9 251.6c-3 0-5.8-1.2-7.8-3.5-2-2.2-2.9-5.2-2.5-8.2l1.8-16.2c.1-.9-.2-1.8-.9-2.5-2.6-2.5-4-6-4-9.6 0-7.4 6.1-13.4 13.4-13.4h.4c3.4.1 6.7 1.5 9.1 4 2.5 2.5 3.9 5.7 4 9.1.1 3.7-1.4 7.4-4 9.9-.7.6-1 1.5-.9 2.5l1.9 16.2c.4 3-.6 6-2.5 8.2-2.2 2.2-5.1 3.5-8 3.5z"
        />
        <path d="M218.5 220.4c2.3-2.3 3.7-5.5 3.6-9-.2-6.4-5.4-11.6-11.8-11.8-6.8-.2-12.4 5.3-12.4 12 0 3.3 1.4 6.4 3.6 8.6 1 1 1.5 2.3 1.3 3.6L201 240c-.6 5.4 3.6 10.1 9.1 10.1s9.7-4.7 9.1-10.1l-1.9-16.2c-.2-1.2.2-2.6 1.2-3.4z" />
        <text
            x="50%"
            y="87%"
            dominantBaseline="middle"
            textAnchor="middle"
            style={{
                fontWeight: 900,
                fontFamily: "monospace",
                fill: props.text_color,
                fontSize: 24,
            }}
        >
            {props.name}
        </text>
        <text
            x="50%"
            y="94%"
            dominantBaseline="middle"
            textAnchor="middle"
            style={{
                fontWeight: 700,
                fontFamily: "monospace",
                fill: props.date_color,
                fontSize: 12,
                stroke: "none",
            }}
        >
            {props.date}
        </text>
    </svg>


);
export default SVGHearthNormal;
