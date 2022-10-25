// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";

/// @notice Helper to generate SVGs
library NFTGenerator {
    struct SVGParams {
        //background colors
        string bg1;
        string bg2;
        string bg3; 
        //lock colors
        string lc1;
        string lc2;
        string lc3;
        // text settings
        string text;
        string tc1;
        string tc2;
        string date;
        string dc1;
    }

    /// @notice generates the lovelock svg image from the given user params
    /// @dev takes th
    /// @param params SVGParams params already validated list of params for the image
    /// @return string the svg image as abi encoded string
    
    function generateSVGImage(SVGParams memory params) internal pure returns (string memory) {

        return
            string(
                abi.encodePacked(
                    generateHeader(),
                    generateBackground(params.bg1, params.bg2, params.bg3),
                    generateLock(params.lc1, params.lc2, params.lc3),
                    generateNamesText(params.text, params.tc1, params.tc2),
                    generateDateText(params.date, params.dc1),
                    "</svg>"
                )
            );
    }

    /// @dev generate SVG header
    function generateHeader() private pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"',
                    ' viewBox="0 0 400 400" style="enable-background:new 0 0 400 400;" xml:space="preserve">'
                )
            );
    }

        /// @dev generate SVG background
    function generateBackground(string memory bg1, string memory bg2, string memory bg3) private pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<g id="Background">',
                    '<radialGradient id="gradient" cx="210" cy="-134.05" r="210.025" gradientTransform="matrix(1 0 0 -1 0 76)" gradientUnits="userSpaceOnUse">',
                    "<style>",
                    ".color-anim {animation: col 6s infinite;animation-timing-function: ease-in-out;}",
                    "@keyframes col {0%,51% {stop-color:none} 52% {stop-color:#FFBAF7} 53%,100% {stop-color:none}}",
                    "</style>",
                    "<stop offset='0' class='color-anim' style='stop-color:#",
                    bg1,
                    "'/>",
                    "<stop offset='0.66' style='stop-color:#",
                    bg2,
                    "'><animate attributeName='offset' dur='18s' values='0.54;0.8;0.54' repeatCount='indefinite' keyTimes='0;.4;1'/></stop>",
                    "<stop offset='1' style='stop-color:#",
                    bg3,
                    "'><animate attributeName='offset' dur='18s' values='0.86;1;0.86' repeatCount='indefinite'/></stop>",
                    abi.encodePacked(
                        "</radialGradient>",
                        '<path fill="url(#gradient)" d="M390,420H30c-16.6,0-30-13.4-30-30V30C0,13.4,13.4,0,30,0h360c16.6,0,30,13.4,30,30v360C420,406.6,406.6,420,390,420z"/>',
                        '<path id="Border" opacity="0.4" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-miterlimit="10" d="M383.4,410H36.6C21.9,410,10,398.1,10,383.4V36.6C10,21.9,21.9,10,36.6,10h346.8c14.7,0,26.6,11.9,26.6,26.6v346.8 C410,398.1,398.1,410,383.4,410z"/>',
                        '<path id="Mask" opacity="0.1" fill="#48005E" d="M381.4,410H38.6C22.8,410,10,397.2,10,381.4V38.6 C10,22.8,22.8,10,38.6,10h342.9c15.8,0,28.6,12.8,28.6,28.6v342.9C410,397.2,397.2,410,381.4,410z"/>',
                        "</g>"
                    )
                )
            );
    }

            /// @dev generate lock
            // error: CompilerError: Stack too deep when compiling inline assembly: Variable pos is 5 slot(s) too deep inside the stack. -> abi call double
    function generateLock(string memory lc1, string memory lc2, string memory lc3) private pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<g fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.625" id="g87" transform="matrix(1.9067004,0,0,1.787007,125.20906,15.313436)">',
                    '<path d="M 42.801,0 C 22.729,0 6.57,16.159 6.57,36.231 V 76.487 H 16.634 V 36.231 c 0,-14.496 11.67,-26.167 26.167,-26.167 14.496,0 26.167,11.67 26.167,26.167 V 76.487 H 79.032 V 36.231 C 79.032,16.159 62.873,0 42.801,0 Z" id="path83" style="fill:#',
                    lc1,
                    ';fill-opacity:1" />',
                    '<rect x="1e-06" y="55.359001" width="85.602997" height="66.259003" rx="0.5" ry="0.5" id="rect85" style="fill:#',
                    lc2,
                    ';fill-opacity:1" />',
                    '</g>',
                    '<g fill="#ffffff" stroke-width="5" id="g93" transform="matrix(1.9067004,0,0,1.787007,125.20906,15.313436)">',
                    '<circle cx="43.276001" cy="80.962997" r="11.662" stroke="#000000" id="circle89" style="fill:#',
                    abi.encodePacked(
                    lc3,
                    ';fill-opacity:1;stroke:#',
                    lc2,
                    ';stroke-opacity:1" />',
                    '<path d="m 43.76,79.407 -4.786,21.618 9.7436,-0.431 z" stroke="#ffffff" stroke-dasharray="none" stroke-linecap="null" stroke-linejoin="null" id="path91" style="fill:#',
                    lc3,
                    ';fill-opacity:1;stroke:#',
                    lc3,
                    ';stroke-opacity:1" />',
                    '</g>'
                    )
                )
            );
    }

    /// @dev generate text
    function generateNamesText(string memory text, string memory tc1, string memory tc2) private pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" style="font-weight:bold;font-family:monospace; fill:#',
                    tc1,
                    ';stroke:#',
                    tc2,
                    '; font-size:20px;">',
                    text,
                    '</text>'
                )
            );
    }

    /// @dev generate text
    function generateDateText(string memory date, string memory dc1) private pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<text x="50%" y="80%" dominant-baseline="middle" text-anchor="middle" style="font-weight:bold;font-family:monospace; fill:#',
                    dc1,
                    ';stroke:#ffffff; font-size:12px; stroke:none">',
                    date,
                    '</text>' 
                )
            );
    }


    /// @dev generate Json Metadata attributes
    function generateAttributes(SVGParams memory params) internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "[",
                    getJsonAttribute("bg1", params.bg1, false),
                    getJsonAttribute("bg2", params.bg2, false),
                    getJsonAttribute("bg3", params.bg3, false),
                    getJsonAttribute("lc1", params.lc1, false),
                    getJsonAttribute("lc2", params.lc2, false),
                    abi.encodePacked(
                        getJsonAttribute("lc3", params.lc3, false),
                        getJsonAttribute("text", params.text, false),
                        getJsonAttribute("tc1", params.tc1, false),
                        getJsonAttribute("tc2", params.tc2, false),
                        getJsonAttribute("date", params.date, false),
                        getJsonAttribute("dc1", params.dc1, true),
                        "]"
                    )
                )
            );
    }

    /// @dev Get the json attribute as
    ///    {
    ///      "trait_type": "Skin",
    ///      "value": "Human"
    ///    }
    function getJsonAttribute(
        string memory trait,
        string memory value,
        bool end
    ) private pure returns (string memory json) {
        return string(abi.encodePacked('{ "trait_type" : "', trait, '", "value" : "', value, '" }', end ? "" : ","));
    }

}


