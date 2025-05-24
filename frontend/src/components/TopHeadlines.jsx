import React from 'react';
import { useState, useEffect } from 'react';
import Card from './Card';
import Loader from './Loader';
import { useParams } from 'react-router-dom';

function TopHeadlines() {
    const params = useParams();
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    function handlePrev() {
        setPage(page - 1)
    }
    function handleNext() {
        setPage(page + 1)
    }

    let pageSize = 12;
    useEffect(() => {
        setIsLoading(true);
        const categoryparam = params.category ? `&category=${params.category}` : "";
        fetch(`http://localhost:3001/top-headlines?language=en${categoryparam}&page=${page}&pageSize=${pageSize}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('error fetching the data')
                }
                return response.clone().json();

            })
            .then(myJson => {
                setTotalResults(myJson.data.totalResults)
                setData(myJson.data.articles)
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('could not fetch data', error);
                setIsLoading(false);
            })
    }, [page, params.category])
    return (
        <>
            <div className='mb-6 card grid lg:place-content-center md:grid-cols-2 lg:gird-cols-3 x1:grid-cols-3 xs:gird-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:px'>
                {
                    isLoading ? (
                        <Loader />
                    ) : (
                        data.length > 0 ? (data.map((element, index) => (
                            <Card
                                title={element.title}
                                description={element.description}
                                imgUrl={element.urlToImage}
                                publishedAt={element.publishedAt}
                                url={element.url}
                                source={element.source.name}
                                key={index}
                            />
                        ))
                        ) : (
                            <p>No articles found</p>
                        )
                    )
                }
            </div>
            {!isLoading && data.length > 0 && <div className='pagination flex justify-center gap-14 my-10 items-centeer'>
                <button disabled={page <= 1} className='pagination-btn text-center ' onClick={() => { handlePrev() }}>&larr; Back </button>
                <p className='opacity-80'>{page} of {Math.ceil(totalResults / pageSize)}</p>
                <button disabled={page >= Math.ceil(totalResults / pageSize)} className='pagination-btn text-center ' onClick={() => { handleNext() }}>Next &rarr;</button>
            </div>}
        </>
    );
}
export default TopHeadlines;