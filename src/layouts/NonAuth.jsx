import React, { useEffect } from 'react';
import { capitalizeFirstLetter } from '../helpers/helper';

const NonAuthLayout = ({ location, children }) => {
    useEffect(() => {
        let currentPath = location;
        currentPath = capitalizeFirstLetter(currentPath).replaceAll('-', ' ');

        document.title =
            currentPath + ' | React Template';
    }, [location]);

    return <>{children}</>;
};

export default NonAuthLayout;
