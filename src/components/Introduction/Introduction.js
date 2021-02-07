import React from "react";
import Box from '@material-ui/core/Box';

const Introduction = () => {
    return (
        <Box>
            <Box fontSize="h1.fontSize" fontWeight="fontWeightBold" m={5}>ICreate!</Box>
            <Box fontSize="h4.fontSize" m={4}>A content management system for writing articles</Box>
            <Box fontSize="h4.fontSize" fontStyle="oblique">Create with ICreate today!</Box>
        </Box>
    );

};

export default Introduction;