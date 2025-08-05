import { ReactElement, useState } from 'react';

function MultiStepFrom (pages: ReactElement[]) {
    const [currentPageIndex, setCurrentPageIndex] = useState(3);

    function next() {
        setCurrentPageIndex(index => {
            if (index >= pages.length - 1) return index
            return index + 1
        })
    }

    function back() {
        setCurrentPageIndex(index => {
            if (index <= 0) return index
            return index - 1
        })
    }

    return {
        currentPageIndex,
        currentPage: pages[currentPageIndex],
        back,
        next,
        pages,
    }
}

export default MultiStepFrom;