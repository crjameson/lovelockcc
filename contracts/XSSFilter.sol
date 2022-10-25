// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*
whenever we work with user input which will be rendered in the browser later, 
we need to filter out javascript and other malicious things

might be useful fo others as well? so seperate lib here.
*/

library XSSFilter {
    /// @notice whenever there is an invalid sign, just return false to the user, so we save on gas
    /// @dev 9-0, A-Z, a-z, +,-. " " allowed, using internal the lib doesnt need to be deployed?!
    /// @param str string to filter
    /// @return Boolean if string is secure or not

    function validateString(string memory str) internal pure returns (bool) {
        bytes memory bytes_string = bytes(str);

        //uint256 is better than uint8 :o 
        //like in c++, ++i better ? :o
        for(uint256 i; i<bytes_string.length; ++i) {
            bytes1 c = bytes_string[i];
            if( !(c >= 0x61 && c <= 0x7A) && //a-z
                !(c >= 0x41 && c <= 0x5A) && //A-Z
                !(c >= 0x30 && c <= 0x39) && //9-0
                !(c >= 0x41 && c <= 0x5A) && //A-Z
                !(c >= 0x2B && c <= 0x2E) && //+ , - .
                !(c == 0x20)// " "
            )
            return false;
        }
        return true;
    }
}