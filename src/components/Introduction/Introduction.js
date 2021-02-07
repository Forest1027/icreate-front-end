import React from "react";
import Box from '@material-ui/core/Box';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Introduction = () => {
    const matches = useMediaQuery('(min-width: 400px)')
    return (
        <Box>
            {matches ? <Box fontSize="h1.fontSize" fontWeight="fontWeightBold" m={5}>ICreate!</Box> :
                <Box fontSize="h3.fontSize" fontWeight="fontWeightBold" m={5}>ICreate!</Box>}
            {matches ? <Box fontSize="h4.fontSize" m={4}>A content management system for writing articles</Box> :
                <Box fontSize="h6.fontSize" m={4}>A content management system for writing articles</Box>}
            {matches ? <Box fontSize="h4.fontSize" fontStyle="oblique">Create with ICreate today!</Box> :
                <Box fontSize="h6.fontSize" fontStyle="oblique">Create with ICreate today!</Box>}
        </Box>
    );

};

export default Introduction;